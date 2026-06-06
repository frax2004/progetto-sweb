import { UserInstance } from "../global.context.js";


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

export default {
  isLogged,
}