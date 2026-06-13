import { UserInstance } from "../global.context.js";
import { Database } from "../database.js";


let canSend = true;
function sendResponse(obj, res) {
  if(canSend) {
    res.status(obj.status_code).json(obj);
    canSend = false;
  } else throw new Error("Chiamata a sendResponse() gia effettuata");
}


export async function isLogged(req, res, next) {
  canSend = true;

  const ok = UserInstance.USER !== undefined 
  && UserInstance.USER !== null;

  if(ok) {
    next();
  } else {
    sendResponse({
        status_code: 401,
        success: false,
        message: "L'utente non è attualmente autenticato",
      },
      res
    );
  }
}

export async function isAdmin(req, res, next) {
  canSend = true;

  const email = UserInstance.USER.email;
  const query = `SELECT * FROM Amministratore WHERE account = '${email}'`;

  try {
    const ok = (await Database.queryOne(query)) !== undefined;
    if(ok) next();
    else sendResponse({
        message: "L'utente non è un amministratore",
        status_code: 401,
        success: false
      },
      res
    );
  } catch(err) {
    sendResponse({
        message: err.message,
        status_code: 401,
        success: false
      },
      res
    );
  }
} 

export async function isValidReport(req, res, next) {
  canSend = true;

  const account = req.body.account;
  const when = req.body.when;

  const query = `
  SELECT * 
  FROM Segnalazione
  WHERE account = '${account}' AND quando = '${when}'
  `;

  try {
    const ok = (await Database.queryOne(query)) !== undefined;
    if(ok) next();
  } catch(err) {
    sendResponse({
        status_code: 401,
        success: false,
        message: err.message
      },
      res
    );
  }
}


export default {
  isLogged,
  isAdmin,
  isValidReport,
}