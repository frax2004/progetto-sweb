import jwt from "jsonwebtoken";
import { Database } from "../database.js";
import { UserInstance, JWT_SECRET } from "../global.context.js";


let canSend = true;

function sendResponse(obj, res) {
  if(canSend) {
    res.status(obj.status_code).json(obj);
    canSend = false;
  } else throw new Error("Chiamata a sendResponse() gia effettuata");
}

class Validators {
  static assertPassword(res, pass) {
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
  
  static assertUsername(res, username) {
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

  static assertEmail(res, email) {

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
}




function generateToken(body) {
  // il primo parametro di sign vuole il payload da firmare
  // nel token, dallo in questa forma json
  // il secondo parametro SECRET è una stringa che serve a firmare il token
  // NON generarlo casualmente.

  //possiamo mettere altri parametri come data di scadenza MA NON LO FAREMO
  // non trova ctx.JWT_TOKEN
  // ctx.USER.generic_token 
  return jwt.sign(body, JWT_SECRET, { expiresIn: '24h' });
}


function login(req, res) {
  canSend = true;
  // ricorda che req la tua richiesta http, per accedere ai dati mandati devi prima accedere a body 

  const email = req.body.email;
  const password = req.body.password;

  const ok = Validators.assertEmail(res, email)
  && Validators.assertPassword(res, password);

  if(!ok) {
    return;
  }

  Database
  .get()
  .get(
    `SELECT * FROM Account WHERE email = '${email}'`, 
    (err, row) => {
    if(row === undefined || err) {
      sendResponse({
        status_code: 401,
        success: false,
        message: "Email invalida."
      }, res);
    } else if(row["password"] === password) {
      Database.get().get(
        `SELECT * FROM UtenteGenerico WHERE account = '${email}'`,
        (err, generic_user) => {
          if(generic_user === undefined) {
            console.log(err);
            sendResponse({
              status_code: 401,
              success: false,
              message: `Non è stato possibile ottenere le informazioni circa l'account desiderato (${email})`
            }, res);
          } else {
            const generic_token = generateToken({ email: email });
            const player_token = generateToken({ id: generic_user.utente_giocatore });
            const dm_token = generateToken({ id: generic_user.utente_dungeon_master });

            UserInstance.USER = new UserInstance(generic_token, player_token, dm_token);

            sendResponse({
              status_code: 200,
              message: 'Login effettuato con successo.',
              success: true,
              generic_token: generic_token,
              player_token: player_token, 
              dm_token: dm_token, 
            }, res);
          }
        }
      );
    } else {
      sendResponse({
        success: false,
        status_code: 401,
        message: "La password inserita non è valida."
      }, res);
    }
  });
}


function register(req, res) {
  canSend = true;

  //console.log("Voglio piangere");

  // const { email, password, username } = req.body;
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;

  const ok = Validators.assertEmail(res, email)
  && Validators.assertPassword(res, password)
  && Validators.assertUsername(res, username);

  if(!ok) {
    return;
  }
  
  //sto cambiando la logica del codice perché ci sono troppi problemi,
  // a prescindere dai return cerchiamo fare status.send una sola volta
  
  // creo qua tutte le variabili di cui fare send, le modifico SOLO se va TUTTO bene

  Database
  .get()
  .get(
    `SELECT * FROM Account WHERE email = '${email}'`, 
    (err,row) => {
    // piuttosto che inserire su errore, inserisci su row non definita
    if (row===undefined) {
      //log ai semplici fini di testing
      const registerQuery = `INSERT OR IGNORE INTO Account (email, password, username) VALUES (
        '${email}', 
        '${password}', 
        '${username}'
      )`;

      // faccio run della seconda query
      Database
      .get()
      .run(
        registerQuery, 
        (err) => {
        if (err) {
          sendResponse({
            success: false,
            status_code: 401,
            message: 'Impossibile registrare l\'utente'
          },
          res);
        } else {
          // se la query è andata a buon fine, aggiungo l'utente generico
          const playerId = UserInstance.getPlayerId(email);
          const dmId = UserInstance.getDmId(email);

          const genericUserQuery = `INSERT OR IGNORE INTO UtenteGenerico (account, utente_giocatore, utente_dungeon_master) VALUES ('${email}','${playerId}','${dmId}')`;

          //ho cambiato leggermente il db levando due tabelle praticamente inutili che avrebbero solo
          // complicato le query e i get del database, evitando così altre due lambda annidate
          Database
          .get()
          .run(
            genericUserQuery, 
            (err) => {
            if (err) {
              sendResponse({
                success: false,
                status_code: 401,
                message: 'Impossibile registrare l\'utente'
              },
              res);
            } else {
              // se è andato tutto a buon fine, ho aggiunto l'utente generico e posso mandare segnali si successo

              // posso generare i token
              const generic_token = generateToken({email: email});
              const player_token = generateToken({utente_giocatore: playerId});
              const dm_token = generateToken({utente_giocatore: dmId});

              UserInstance.USER = new UserInstance(generic_token, player_token, dm_token);
              console.log(JSON.stringify(UserInstance.USER));

              sendResponse({
                success: false,
                status_code: 200,
                message: 'Registrazione avvenuta',
                generic_token: generic_token,
                player_token: player_token,
                dm_token: dm_token
              },
              res);
            }
          });
        }
      });
    } else if (err) {
      sendResponse({
        success: false,
        status_code: 401,
        message: 'Impossibile registrare l\'utente'
      },
      res);
    } else {
      sendResponse({
        success: false,
        status_code: 401,
        message: 'Sei già registrato, fai login'
      }, res);
      // generic_token = generateToken(req,res,email);
      // player_token = jwt.sign({utente_giocatore: playerId},'filafiabeelamagamago');
      // dm_token = jwt.sign({utente_giocatore: dmId},'filafiabeelamagamago');
    }
  });

}


export default {
  login,
  register,
}