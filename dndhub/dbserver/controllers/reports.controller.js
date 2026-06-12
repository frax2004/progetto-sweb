import { Database } from "../database.js";


let canSend = true;
function sendResponse(obj, res) {
  if(canSend) {
    res.status(obj.status_code).json(obj);
    canSend = false;
  } else throw new Error("Chiamata a sendResponse() gia effettuata");
}

export async function loadReports(req, res) {
  canSend = true;

  const quantity = req.body.quantity;
  const offset = req.body.offset;

  const query = `
  SELECT *
  FROM Segnalazione
  ORDER BY quando ASC
  LIMIT ${quantity}
  OFFSET ${offset}
  `;

  try {
    const reports = await Database.queryAll(query);

    sendResponse({
        message: "Carimento delle segnalazioni effettuato con successo",
        status_code: 200,
        success: true,
        reports: reports
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
  loadReports,
}