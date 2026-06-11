import { AuthValidators } from "../controllers/auth.controllers.validators.js";
import { UserInstance } from "../global.context.js";
import { AuthResponses } from "../controllers/auth.controller.responses.js";
import { Database } from "../database.js";

let canSend = true;
function sendResponse(obj, res) {
  if(canSend) {
    res.status(obj.status_code).json(obj);
    canSend = false;
  } else throw new Error("Chiamata a sendResponse() gia effettuata");
}

export function validateInfo(req, res, next) {
  canSend = true;

  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;

  const ok = AuthValidators.assertEmail(email, () => sendResponse(AuthResponses.ILLEGAL_EMAIL, res))
  && AuthValidators.assertPassword(password, () => sendResponse(AuthResponses.ILLEGAL_PASSWORD, res))
  && AuthValidators.assertUsername(username, () => sendResponse(AuthResponses.ILLEGAL_USERNAME, res));

  if(ok) next();

}

export function canChangeEmail(req, res, next) {

  const oldEmail = UserInstance.USER.email;
  const email = req.body.email;

  Database.queryOne(`SELECT email FROM Account WHERE email = '${email}'`)
  .then(row => {
    const ok = oldEmail === email || row === undefined;
    if(ok) next();
    else sendResponse({
        status_code: 401,
        message: `L'indirizzo email ${email} risulta già registrato`,
        success: false
      },
      res
    );
  })
  .catch(
    err => sendResponse({
        status_code: 401,
        message: err.message,
        success: false
      },
      res
    )
  );
}

export function isLogged(req, res, next) {
  if(UserInstance.USER !== undefined && UserInstance.USER !== null) {
    next();
  } else {
    res.status(401).json({
      status_code: 401,
      success: false,
      message: "L'utente non è attualmente autenticato",
    });
  }
}

export default {
  validateInfo,
  isLogged,
  canChangeEmail,
}