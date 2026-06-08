import { DatabaseQueries } from "../database.queries.ts";


let canSend = true;
function sendResponse(obj, res) {
  if(canSend) {
    res.status(obj.status_code).json(obj);
    canSend = false;
    canSend=true;
    //da togliere
  } else throw new Error("Chiamata a sendResponse() gia effettuata");
}




export function displayClasses(req, res) {
  canSend=true;

  DatabaseQueries.retrieve("SELECT * FROM Class", DatabaseQueries.unwrapClass)
  .catch(err => {
    sendResponse({
        status_code: 404,
        message: 'Non è stato possibile caricare le classi dal database',
        success: false,
      }, 
      res
    );
  }).then(classes => {
    sendResponse({
        classes: classes,
        status_code: 200,
        success: true,
        message: 'Classi caricate con successo'
      },
      res
    );
  });

  canSend = true;
}

export default {
  displayClasses,
}