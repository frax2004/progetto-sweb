import jwt from "jsonwebtoken";
import { Database } from "../database.js";
import * as ctx from "../global.context.js";
import { response } from "express";
import { json } from "node:stream/consumers";

let canSend = true;

function sendResponse(obj, res) {
  if (canSend) {
    res.status(obj.status_code).json(obj);
    canSend = false;
  }
  else {
    throw new Error(`Risposta già inviata, provando ad inviare: ${JSON.stringify(obj)}`);
  }
}

function validatePassword(res, pass) {
  
  const ok = pass !== undefined
  && pass !== null
  && pass.length >= 8
  && /[a-zA-Z_0-9@#$!?'\-]+/.test(pass)
  && /[A-Z]+/.test(pass)
  && /[a-z]+/.test(pass)
  && /[0-9]+/.test(pass);

  if(!ok) {
    sendResponse({
      status_code: 401,
      message: `La password ('${pass}') inserita non è valida`,
      success: false,
    }, res);
  }

  return ok;
}

function validateUsername(res, username) {
  const ok = username !== undefined
  && username !== null
  && username.length !== 0;

  if(!ok) {
    sendResponse({
      status_code: 401,
      message: `Il nome utente ('${username}') inserito non è valido`,
      success: false,
    }, res);
  }

  return ok;

}


function validateEmail(res, email) {

  const ok = email !== undefined 
  && email !== null 
  && email.length !== 0 
  && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  if(!ok) {
    sendResponse({
      status_code: 401,
      message: `L'email ('${email}') inserita non è valida`,
      success: false,
    }, res);
  }

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

  canSend = true;
}

function register(req, res) {

  //console.log("Voglio piangere");

  // const { email, password, username } = req.body;
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;

  const ok = validateEmail(res, email)
  && validatePassword(res, password)
  && validateUsername(res, username);

  if(ok) {
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
            sendResponse({
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
                sendResponse({
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
                sendResponse({
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
        sendResponse({
          success: false,
          status_code: 401,
          message: 'Impossibile registrare l\'utente'
        },
        res);
      }
      else {
        let obj = {
          success: false,
          status_code: 401,
          message: 'Sei già registrato, fai login'
        };
        console.log(`\n\nSei già registrato, obj: ${JSON.stringify(obj)}`);
        sendResponse(obj, res);
        // generic_token = generateToken(req,res,email);
        // player_token = jwt.sign({utente_giocatore: playerId},'filafiabeelamagamago');
        // dm_token = jwt.sign({utente_giocatore: dmId},'filafiabeelamagamago');
      }
    });
  }

  canSend = true;

  console.log("cansend? ", canSend);
}


export default {
  login,
  register,
}