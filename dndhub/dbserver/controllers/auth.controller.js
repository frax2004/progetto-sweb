

import { Database } from "../database.js";
import { UserInstance, generateToken } from "../global.context.js";
import { AuthResponses } from "./auth.controller.responses.js";
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

export async function login(req, res) {
  canSend = true;

  const email = req.body.email;

  const query = `
  SELECT * 
  FROM UtenteGenerico
  WHERE account = '${email}'
  `;

  try {
    const account = await Database.queryOne(query);
    
    const generic_token = generateToken({ email: email });
    const player_token = generateToken({ id: account.utente_giocatore });
    const dm_token = generateToken({ id: account.utente_dungeon_master });

    const x = {
      generic_token: generic_token,
      player_token: player_token,
      dm_token: dm_token,
      email: email,
      player_id: account.utente_giocatore,
      dm_id: account.utente_dungeon_master
    };

  
    UserInstance.USER = new UserInstance(generic_token, player_token, dm_token);
    sendResponse(AuthResponses.loginResponse(generic_token, player_token, dm_token), res);
  } catch(err) {
    sendResponse(AuthResponses.UNABLE_TO_GET_USER_INFOS, res);
  }
}


export async function register(req, res) {
  canSend = true;

  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  const playerId = UserInstance.getPlayerId(email);
  const dmId = UserInstance.getDmId(email);

  const query = `
    BEGIN TRANSACTION;

    ${AuthQueries.signIn(email, password, username)};

    ${AuthQueries.insertGenericUser(email, playerId, dmId)};

    COMMIT;
  `;

  try {
    await Database.execAll(query);

    const generic_token = generateToken({email: email});
    const player_token = generateToken({id: playerId});
    const dm_token = generateToken({id: dmId});

    UserInstance.USER = new UserInstance(generic_token, player_token, dm_token);

    sendResponse(AuthResponses.signinResponse(generic_token, player_token, dm_token), res);
  } catch(err) {
    try {
      await Database.execOne("ROLLBACK;");
    } finally {
      sendResponse(AuthResponses.USER_SIGNIN_FAILURE, res);
    }
  }
}



export async function deleteAccount(req, res) {
  canSend = true;

  const email = UserInstance.USER.email;

  const query = `
  DELETE FROM Account
  WHERE email = '${email}';
  `;

  try {
    await Database.execAll(query);
    
    UserInstance.USER = undefined;
    sendResponse({
        message: "Eliminazione dell'account effettuata con successo.",
        success: true,
        status_code: 200
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

export default {
  login,
  register,
  logout,
  deleteAccount,
}