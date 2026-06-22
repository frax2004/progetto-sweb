import { UserInstance } from "../global.context.js";
import { CampagnaResponses } from "../controllers/campagna.responses.js";
import { Database } from "../database.js";

let canSend = true;
function sendResponse(obj, res) {
  if(canSend) {
    res.status(obj.status_code).json(obj);
    canSend = false;
  } else throw new Error("Chiamata a sendResponse() gia effettuata");
}


export async function createCampaign(req, res) {
  canSend = true;

  const name = req.body.name;
  const campaign_idx = req.body.campaign_idx;
  const banner = req.body.banner;
  const desc = req.body.desc;

  const arrayEntriesQuery = req
  .body
  .players
  .map(character_idx => `
    INSERT INTO ArrayCampagnaPersonaggiItem (idx_campagna, idx_personaggio, stato_personaggio) VALUES (
      '${campaign_idx}', '${character_idx}', 'pending'
    );
  `);

  const query = `
    BEGIN TRANSACTION;

    INSERT INTO Campagna (utente_generico, nome, idx_campagna, banner, descrizione) VALUES (
      '${UserInstance.USER.email}',
      '${name}',
      '${campaign_idx}',
      '${banner}',
      '${desc}'
    );

    ${ arrayEntriesQuery.join("\n") }

    COMMIT;
  `;


  try {
    await Database.execAll(query);
    sendResponse(CampagnaResponses.CAMPAIGN_CREATED(campaign_idx, name), res);
  } catch(err) {
    try {
      await Database.execOne("ROLLBACK;"); 
    } finally {
      sendResponse({
          message: "Creazione della campagna fallita. Motivo: " + err.message,
          success: false,
          status_code: 401
        },
        res
      );
    }
  }
}

export async function loadPlayers(req, res) {
  canSend = true;

  const limit = req.body.limit;
  const offset = req.body.offset;
  const regex = req.body.regex;
  const excludes = req.body.excludes;
  const filters = [];
  const quotify = s => `'${s}'`;

  if(regex !== '') {
    filters.push(`idx_personaggio LIKE ${quotify(regex)}`)
  }

  if(excludes.length > 0) {
    filters.push(`idx_personaggio NOT IN (${excludes.map(quotify).join(", ")})`);
  }
  
  const filter = filters.length > 0 ? `WHERE ${filters.join(" AND ")}` : "";

  const query = `
  SELECT * FROM Personaggio 
  ${filter} 
  LIMIT ${limit} 
  OFFSET ${offset}
  `;

  try {
    const players = await Database.queryAll(query);
    sendResponse({
        message: "Personaggi ottenuti con successo",
        success: true,
        status_code: 200,
        players: players
      }, 
      res
    );
  } catch(err) {
    sendResponse({
        message: "Impossibile ottenere i personaggi",
        success: false,
        status_code: 401
      }, 
      res
    );
  }
}

export default {
  createCampaign,
  loadPlayers
}