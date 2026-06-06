import { UserInstance, generateToken } from "../global.context.js";
import { Database } from "../database.js";

let canSend = true;
function sendResponse(obj, res) {
  if(canSend) {
    res.status(obj.status_code).json(obj);
    canSend = false;
  } else throw new Error("Chiamata a sendResponse() gia effettuata");
}


function getClass(classRow) {
    const query = `SELECT * FROM Levels WHERE character_class = '${classRow.idx}'`;

    Database.INSTANCE
    .all(query, (err, levels) =>{
        if (levels === undefined) {
            console.log('Errore :[ --> ', err.message);
            sendResponse({
                status_code: 404,
                message: 'Non ho trovato i livelli sul db',
                success: false,
            }, res);
        } 
        else if (err) {
            console.log('Errore :[ --> ', err.message);
            sendResponse({
                status_code: 404,
                message: err.message,
                success: false,
            }, res);
        }
        else {
            console.log('Ho trovato i livelli relativi a ', classRow.idx);
            retValue = {
                idx: classRow.idx,
                name: classRow.name,
                hit_die: classRow.hit_die,
                
            }
        }
    });
} 

function displayClasses(req, res) {
    const query = `SELECT * FROM Class`;

    const db = Database.INSTANCE;

    db.all(query, (err, classes) => {
        if (classes === undefined) {
            console.log('Errore :[ --> ', err.message);
            sendResponse({
                status_code: 404,
                message: 'Non ho trovato le classi sul db',
                success: false,
            }, res);
        }
        else if (err) {
            console.log('Errore :[ --> ', err.message);
            sendResponse({
                status_code: 404,
                message: err.message,
                success: false,
            }, res);
        }
        else {
            console.log("Ho trovato le classi");
            classArray = classes.map(getClass);
        }
    });
}

export default {
    displayClasses,
}