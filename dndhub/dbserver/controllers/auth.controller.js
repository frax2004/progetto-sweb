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
      ctx.USER.player_token = jwt.sign(
        { id: id },
        ctx.JWT_SECRET,
        { expiresIn: '24h' }
      );
    }
  });

  return ok;
}



function insertDM(req, res, id) {

  const query = `INSERT OR IGNORE INTO UtenteDungeonMaster (utente_dungeon_master, utente_generico) values (
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
        message: "Non è stato possibile registrare il dungeon master."
      });
    } else {
      ctx.USER.dm_token = jwt.sign(
        { id: id },
        ctx.JWT_SECRET,
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
  const token = jwt.sign(
    { email: email },
    ctx.JWT_SECRET,
    { expiresIn: '24h' }
  );

  ctx.USER.generic_token = token;
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

  const { email, password, username } = req.body;

  const query = `SELECT * FROM Account WHERE email = ${email}`;

  Database
  .get()
  .get(query, (err, row) => {
    if(err) {
      // register
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
          const assertInsertPlayer = insertPlayer(req, res, ctx.UserInstance.getPlayerId(email));
          const assertInsertDm = insertDM(req, res, ctx.UserInstance.getDmId(email));

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