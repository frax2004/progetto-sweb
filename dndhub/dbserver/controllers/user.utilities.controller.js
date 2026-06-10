import { UserInstance } from "../global.context.js";
import { DatabaseQueries } from "../database.queries.ts";
import { Database } from "../database.js";

let canSend = true;
function sendResponse(obj, res) {
  if(canSend) {
    res.status(obj.status_code).json(obj);
    canSend = false;
  } else throw new Error("Chiamata a sendResponse() gia effettuata");
}

function isLogged(req, res) {
  canSend = true;

  if(UserInstance.USER === null || UserInstance.USER === undefined) {
    sendResponse({
        success: true,
        status_code: 200,
        message: "Nessun utente loggato al momento",
        isLogged: false,
      },
      res
    );
  } else if(UserInstance.USER !== null && UserInstance.USER !== undefined) {
    sendResponse({
        success: true,
        status_code: 200,
        message: "Utente al momento loggato",
        isLogged: true,
      },
      res
    );
  } else {
    sendResponse({
        success: false,
        status_code: 400,
        message: "C'è stato qualche tipo di errore",
      },
      res
    );
  }
}

export function setUserInfo(req, res) {
  canSend = true;
  
  const oldEmail = UserInstance.USER.email;

  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;

  // Database
  // .execOne(`UPDATE Account SET email = '${email}', password = '${password}', username = ${username} WHERE email = '${oldEmail}'`)
  // .catch();


}

export function getUserInfo(req, res) {
  canSend = true;

  const email = UserInstance.USER.email;

  DatabaseQueries.retrieve(
    `SELECT * FROM Account WHERE email = '${email}'`, 
    x => x
  ).catch(err => {
    sendResponse({
      status_code: 401,
      success: false,
      message: `Non è stato possibile ottenere le credenziali dell'utente registrato come ${email}`
    }, res)
  }).then(rows => {
    const credentials = rows[0];

    sendResponse({
      success: true,
      status_code: 200,
      message: "Credenziali ottenute con successo",
      email: credentials.email,
      password: credentials.password,
      username: credentials.username
    }, res);
  });

}

export default {
  isLogged,
  getUserInfo,
  setUserInfo,
}