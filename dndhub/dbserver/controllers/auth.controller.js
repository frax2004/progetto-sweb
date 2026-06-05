import jwt from "jsonwebtoken";
import { Database } from "../database.js";
import * as ctx from "../global.context.js";
import { response } from "express";
import { json } from "node:stream/consumers";

let canSend = true;

function insertPlayer(req, res, id) {

  const query = `INSERT OR IGNORE INTO UtenteGiocatore (utente_giocatore, utente_generico) values (
    '${id}', 
    '${req.body.email}'
  )`;

  let ok = true;

  Database
  .get()
  .run(query, (err) => {
    if(err) {
      console.log(err);
      ok = false;
      return res
      .status(401)
      .json({
        success: false,
        message: "Non è stato possibile registrare il giocatore."
      });
    } else {
      // ctx.USER.player_token 
      const token = jwt.sign(
        { id: id },
        'filafiabeelamagamago',
        { expiresIn: '24h' }
      );
    }
  });

  return ok;
}



function insertDM(req, res, id) {

  const query = `INSERT OR IGNORE INTO UtenteDungeonMaster (utente_dungeon_master, utente_generico) VALUES (
    '${id}', 
    '${req.body.email}'
  )`;

  let ok = true;

  // TODO: togliere tutti questi minchia di send
  Database
  .get()
  .run(query, (err) => {
    if(err) {
      console.log(err);
      ok = false;
      return res
      .status(401)
      .json({
        success: false,
        message: "Non è stato possibile registrare il dungeon master."
      });
    } else {
      // ctx.USER.dm_token
      const token = jwt.sign(
        { id: id },
        'filafiabeelamagamago',
        { expiresIn: '24h' }
      );
    }
  });

  return ok;
}


function generateToken(req, res, email) {
  // il primo parametro di sign vuole il payload da firmare
  // nel token, dallo in questa forma json
  // il secondo parametro SECRET è una stringa che serve a firmare il token
  // NON generarlo casualmente.

  //possiamo mettere altri parametri come data di scadenza MA NON LO FAREMO
  // non trova ctx.JWT_TOKEN
  // ctx.USER.generic_token 
  const token = jwt.sign(
    { email: email },
    'filafiabeelamagamago',
    { expiresIn: '24h' }
  );

  return token;
}


function sendResponde(obj, res) {
  if (canSend) {
    res.status(obj.status_code).json(obj);
    canSend = false;
  }
  else {
    throw new Error(`Risposta già inviata, provando ad inviare: ${obj}`);
  }
}

function login(req, res) {
  // ricorda che req la tua richiesta http, per accedere ai dati mandati devi prima accedere a body 

  const { email, password } = req.body;

  const query = `SELECT * FROM Account WHERE email = ${email}`;

  Database
  .get()
  .get(query, (err, row) => {
    if(err) {
      console.log(err);
      return res
      .status(401)
      .json({
        success: false,
        message: "Email invalida."
      });
    } else if(row["password"] === password) {
      generateToken(req, res, email);
      return res.status(200).json({
        token: token,
        message: 'Login effettuato con successo.',
        success: true
      })
    } else {
      return res
      .status(401)
      .json({
        success: false,
        message: "La password inserita non è valida."
      });
    }
  });
}

function register(req, res) {

  //console.log("Voglio piangere");

  // const { email, password, username } = req.body;
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;

  const query = `SELECT * FROM Account WHERE email = '${email}'`; 


  //sto cambiando la logica del codice perché ci sono troppi problemi,
  // a prescindere dai return cerchiamo fare status.send una sola volta

  // creo qua tutte le variabili di cui fare send, le modifico SOLO se va TUTTO bene

  Database
  .get()
  .get(query, (err,row) => {
    // piuttosto che inserire su errore, inserisci su row non definita
    if (row===undefined) {
      //log ai semplici fini di testing
      console.log('\n\nEntrato in row===undefined\n\nRow: ', row, '\n\nErr: ', err, '\n');
      const registerQuery = `INSERT OR IGNORE INTO Account (email, password, username) VALUES (
        '${email}', 
        '${password}', 
        '${username}'
      )`;

      // faccio run della seconda query
      Database
      .get()
      .run(registerQuery, (err) => {
        if (err) {
          console.log('\n\nEntrato nel secondo if(err)\n\nErr: ', err, '\n');
          sendResponde({
            success: false,
            status_code: 401,
            message: 'Impossibile registrare l\'utente'
          },
          res);
        }
        else {
          // se la query è andata a buon fine, aggiungo l'utente generico
          const playerId = `(giocatore): ${email}`;
          const dmId = `(dungeon_master): ${email}`;

          const genericUserQuery = `INSERT OR IGNORE INTO UtenteGenerico (account, utente_giocatore, utente_dungeon_master)
          VALUES ('${email}','${playerId}','${dmId}')`;

          //ho cambiato leggermente il db levando due tabelle praticamente inutili che avrebbero solo
          // complicato le query e i get del database, evitando così altre due lambda annidate
          Database
          .get()
          .run(genericUserQuery, (err) => {
            if (err) {
              console.log('\n\nEntrato nel terzo if(err)\n\nErr: ', err, '\n');
              sendResponde({
                success: false,
                status_code: 401,
                message: 'Impossibile registrare l\'utente'
              },
              res);
            } 
            else {
              console.log("\nDovrebbe essere tutto andato a buon fine, DOVREBBE\n");
              // se è andato tutto a buon fine, ho aggiunto l'utente generico e posso mandare segnali si successo
              
              // posso generare i token
              let generic_token = generateToken(req,res,email);
              sendResponde({
                generic_token: generic_token,
                success: false,
                status_code: 200,
                message: 'Registrazione avvenuta',
                player_token: jwt.sign({utente_giocatore: playerId},'filafiabeelamagamago'),
                dm_token: jwt.sign({utente_giocatore: dmId},'filafiabeelamagamago'),
              },
              res);
            }
          });
        }
      });
    }
    else if (err) {
      console.log('\n\nEntrato nel primo if(err)\n\nRow: ', row, '\n\nErr: ', err, '\n');
      sendResponde({
        success: false,
        status_code: 401,
        message: 'Impossibile registrare l\'utente'
      },
      res);
    }
    else {
      console.log('\n\nSei già registrato, obj: ');
      sendResponde({
        success: false,
        status_code: 401,
        message: 'Sei già registrato, fai login'
      },
      res);
      // generic_token = generateToken(req,res,email);
      // player_token = jwt.sign({utente_giocatore: playerId},'filafiabeelamagamago');
      // dm_token = jwt.sign({utente_giocatore: dmId},'filafiabeelamagamago');
    }
  });

  // console.log("Status: ", status_code);
  // console.log({
  //     success: success,
  //     message: message,
  //     generic_token: generic_token,
  //     player_token: player_token,
  //     dm_token: dm_token,
  //   });
  //   res.status(status_code).json({
  //     success: success,
  //     message: message,
  //     generic_token: generic_token,
  //     player_token: player_token,
  //     dm_token: dm_token,
  //   });


  // Database
  // .get()
  // .get(query, (err, row) => {
  //   console.log('\n\nRow: ', row);
  //   console.log('\n\nErr: ', err, '\n\n');
  //   if(err) {
  //     // register
  //     console.log("Sono qui");
  //     const registerQuery = `INSERT OR IGNORE INTO Account (email, password, username) VALUES (
  //       '${email}', 
  //       '${password}', 
  //       '${username}'
  //     )`;

  //     Database.get().run(registerQuery, (err, row) => {
  //       if(err) {
  //         console.log(err);
  //         return res.status(401).json({
  //           success: false,
  //           message: "Non è stato possibile effettuare la registrazione."
  //         });
  //       } else {
  //         // ctx.UserInstance.getPlayerId(email) --> non funziona
  //         // ctx.UserInstance.getDmId(email) --> non funziona
  //         const playerId = `(giocatore): '${email}'`;
  //         const dmId = `(dungeon_master): '${email}'`;
          
  //         // aggiungo prima l'utente generico
  //         const genericUserQuery = `INSERT OR IGNORE INTO UtenteGenerico (account, utente_giocatore, utente_dungeon_master)
  //         VALUES (
  //           '${email}',
  //           '${playerId}',
  //           '${dmId}'
  //         )`;

  //         // runno la query e vedo se c'è errore

  //         Database.get()
  //         .run(query, (err,row) => {
  //           if (err) {
  //             console.log(err);
  //             return res.status(401).json({
  //               success: false,
  //               message: "Non è stato possibile effettuare la registrazione."
  //             });
  //           }
  //           else {
  //             const assertInsertDm = insertDM(req, res, dmId);
  //             const assertInsertPlayer = insertPlayer(req, res, playerId);
              

  //             if(assertInsertPlayer && assertInsertDm) {
  //               generateToken(req, res, email);
  //               return res.status(200).json({
  //                 success: true,
  //                 message: "Registrazione effettuata con successo.",
  //               });
  //             }
  //           }
  //         });
  //       }
  //     });
  //   } else {
  //     return res
  //     .status(401)
  //     .json({
  //       success: false,
  //       message: "Account già registrato, prova ad accedere."
  //     });
  //   }
  // });
}


export default {
  login,
  register,
}