import { AuthValidators } from "../controllers/auth.controllers.validators.js";
import { UserInstance } from "../global.context.js";
import { AuthResponses } from "../controllers/auth.controller.responses.js";


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
}