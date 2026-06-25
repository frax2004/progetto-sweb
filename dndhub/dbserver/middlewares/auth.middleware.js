import { AuthValidators } from "../controllers/auth.controllers.validators.js";
import { AuthResponses } from "../controllers/auth.controller.responses.js";
import { Database } from "../database.js";
import { JWT_SECRET, UserInstance } from "../global.context.js";
import jwt from 'jsonwebtoken';

let canSend = true;
function sendResponse(obj, res) {
  if(canSend) {
    res.status(obj.status_code).json(obj);
    canSend = false;
  } else throw new Error("Chiamata a sendResponse() gia effettuata");
}

export function isLogged(req, res, next) {
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

export function validateEmail(req, res, next) {
  canSend = true;

  const email = req.body.email;
  const ok = AuthValidators.assertEmail(email, () => sendResponse(AuthResponses.ILLEGAL_EMAIL, res));

  if(ok) next();
}

export function validatePassword(req, res, next) {
  canSend = true;

  const password = req.body.password;
  const ok = AuthValidators.assertPassword(password, () => sendResponse(AuthResponses.ILLEGAL_PASSWORD, res));

  if(ok) next();
}

export function validateUsername(req, res, next) {
  canSend = true;

  const username = req.body.username;
  const ok = AuthValidators.assertUsername(username, () => sendResponse(AuthResponses.ILLEGAL_USERNAME, res));

  if(ok) next();
}

export async function isSignedIn(req, res, next) {
  canSend = true;

  const email = req.body.email;
  const account = await Database.queryOne(`SELECT * FROM Account WHERE email = '${email}'`);

  if(account !== undefined) 
    next();
  else sendResponse(AuthResponses.EMAIL_NOT_PRESENT, res);
}

export async function checkPassword(req, res, next) {
  canSend = true;

  const email = req.body.email;
  const password = req.body.password;
  const account = await Database.queryOne(`SELECT * FROM Account WHERE email = '${email}'`);

  if(account.password === password) 
    next();
  else sendResponse(AuthResponses.INCORRECT_PASSWORD, res);
}

export async function isSigninAvailable(req, res, next) {
  canSend = true;

  const email = req.body.email;
  const account = await Database.queryOne(`SELECT * FROM Account WHERE email = '${email}'`);

  if(account === undefined) 
    next();
  else sendResponse(AuthResponses.USER_ALREADY_SIGNEDIN, res);
}

function validateTokens(req,res,next) {
  canSend = true;

  let ok = jwt.verify(req.body.generic_token,JWT_SECRET);

  if (!ok) {
    sendResponse({
      status_code: 401,
      message: 'Generic token not valid or expired',
      success: false
    }, res);
  }
  else {
    ok = jwt.verify(req.body.player_token,JWT_SECRET);

    if (!ok) {
      sendResponse({
        status_code: 401,
        message: 'Player token not valid or expired',
        success: false
      }, res);
    }
    else {
      ok = jwt.verify(req.body.dm_token,JWT_SECRET);
    
      if (ok) {
        next();
      }
      else {
        sendResponse({
          status_code: 401,
          message: 'DM token not valid or expired',
          success: false
        }, res);
      }
    }
  }
}

export default {
  validateEmail,
  validatePassword,
  validateUsername,
  isSigninAvailable,
  checkPassword,
  isLogged,
  isSignedIn,
  validateTokens,
}