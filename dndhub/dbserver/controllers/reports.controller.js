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
  const queryFilter = req.body.queryFilter;

  const query = `
  SELECT *
  FROM Segnalazione
  ${queryFilter}
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

export async function closeReport(req, res) {
  canSend = true;

  const account = req.body.account;
  const when = req.body.when;

  const query = `
  DELETE 
  FROM Segnalazione
  WHERE account = '${account}' AND quando = '${when}'
  `;

  try {
    await Database.execOne(query);
    sendResponse({
        message: 'Segnalazione chiusa con successo!',
        status_code: 200,
        success: true
      },
      res
    );
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
  loadReports,
  closeReport,
}