

import { Database } from "../database.js";
import { UserInstance, generateToken } from "../global.context.js";
import { AuthResponses } from "./auth.controller.responses.js";
import { AuthValidators } from "./auth.controllers.validators.js";
import { AuthQueries } from "./auth.queries.js";


let canSend = true;
function sendResponse(obj, res) {
  if(canSend) {
    res.status(obj.status_code).json(obj);
    canSend = false;
  } else throw new Error("Chiamata a sendResponse() gia effettuata");
}

export function logout(req, res) {
  canSend = true;

  UserInstance.USER = undefined;

  sendResponse({
      status_code: 200,
      message: "Logout effettuato con successo.",
      success: true,
    },
    res,
  )
}

function login(req, res) {
  canSend = true;

  const email = req.body.email;
  const password = req.body.password;

  const ok = AuthValidators.assertEmail(email, () => sendResponse(AuthResponses.ILLEGAL_EMAIL, res)) 
  && AuthValidators.assertPassword(password, () => sendResponse(AuthResponses.ILLEGAL_PASSWORD, res));

  if(!ok) return;

  const db = Database.INSTANCE;

  const generic_user_callback = (err, user) => {
    if(user === undefined) {
      console.log(err);
      sendResponse(AuthResponses.UNABLE_TO_GET_USER_INFOS, res);
    } else {
      const generic_token = generateToken({ email: email });
      const player_token = generateToken({ id: user.utente_giocatore });
      const dm_token = generateToken({ id: user.utente_dungeon_master });

      UserInstance.USER = new UserInstance(generic_token, player_token, dm_token);
      sendResponse(AuthResponses.loginResponse(generic_token, player_token, dm_token), res);
    }
  };

  const login_callback = (err, row) => {
    if(row === undefined || err) {
      sendResponse(AuthResponses.EMAIL_NOT_PRESENT, res);
    } else if(row["password"] === password) {
      db.get(AuthQueries.getGenericUser(email), generic_user_callback);
    } else sendResponse(AuthResponses.INCORRECT_PASSWORD, res);
  };

  db.get(AuthQueries.isSignedIn(email), login_callback);
}

function register(req, res) {
  canSend = true;

  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;

  const ok = AuthValidators.assertEmail(email, () => sendResponse(AuthResponses.ILLEGAL_EMAIL, res))
  && AuthValidators.assertPassword(password, () => sendResponse(AuthResponses.ILLEGAL_PASSWORD, res))
  && AuthValidators.assertUsername(username, () => sendResponse(AuthResponses.ILLEGAL_USERNAME, res));

  if(!ok) return;

  const db = Database.INSTANCE;

  const signin_callback = (err) => {
    if (err) {
      sendResponse(AuthResponses.USER_SIGNIN_FAILURE, res);
    } else {
      const playerId = UserInstance.getPlayerId(email);
      const dmId = UserInstance.getDmId(email);

      const insert_user_callback = (err) => {
        if (err) {
          sendResponse(AuthResponses.USER_SIGNIN_FAILURE, res);
        } else {
          const generic_token = generateToken({email: email});
          const player_token = generateToken({id: playerId});
          const dm_token = generateToken({id: dmId});

          UserInstance.USER = new UserInstance(generic_token, player_token, dm_token);
          sendResponse(AuthResponses.signinResponse(generic_token, player_token, dm_token), res);
        }
      };

      db.run(AuthQueries.insertGenericUser(email, playerId, dmId), insert_user_callback);
    }
  };

  const is_signedin_callback = (err, row) => {
    if (row === undefined) {
      db.run(AuthQueries.signIn(email, password, username), signin_callback);
    } else if (err) {
      sendResponse(AuthResponses.USER_SIGNIN_FAILURE, res);
    } else {
      sendResponse(AuthResponses.USER_ALREADY_SIGNEDIN, res);
    }
  };

  db.get(AuthQueries.isSignedIn(email), is_signedin_callback);
}

export default {
  login,
  register,
  logout,
}