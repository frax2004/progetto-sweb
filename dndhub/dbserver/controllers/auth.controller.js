import jwt from "jsonwebtoken";
import { Database } from "../database.js";
import * as ctx from "../global.context.js";


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

  console.log("Voglio piangere");

  // const { email, password, username } = req.body;
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;

  const query = `SELECT * FROM Account WHERE email = ${email}`; 

  Database
  .get()
  .get(query, (err, row) => {
    if(err) {
      // register
      console.log("Sono qui");
      const registerQuery = `INSERT OR IGNORE INTO Account (email, password, username) VALUES (
        '${email}', 
        '${password}', 
        '${username}'
      )`;

      Database.get().run(registerQuery, (err, row) => {
        if(err) {
          console.log(err);
          return res.status(401).json({
            success: false,
            message: "Non è stato possibile effettuare la registrazione."
          });
        } else {
          // ctx.UserInstance.getPlayerId(email) --> non funziona
          // ctx.UserInstance.getDmId(email) --> non funziona
          const playerId = `(giocatore): '${email}'`;
          const dmId = `(dungeon_master): '${email}'`;
          
          // creare prima l'utente generico

          const assertInsertDm = insertDM(req, res, dmId);
          const assertInsertPlayer = insertPlayer(req, res, playerId);
          

          if(assertInsertPlayer && assertInsertDm) {
            generateToken(req, res, email);
            return res.status(200).json({
              success: true,
              message: "Registrazione effettuata con successo.",
            });
          }
        }
      });
    } else {
      return res
      .status(401)
      .json({
        success: false,
        message: "Account già registrato, prova ad accedere."
      });
    }
  });
}


export default {
  login,
  register,  
}