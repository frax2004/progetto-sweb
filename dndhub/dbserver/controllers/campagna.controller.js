import { UserInstance } from "../global.context.js";
import { CampagnaResponses } from "../controllers/campagna.responses.js";
import { Database } from "../database.js";
import { DatabaseQueries } from "../database.queries.ts";

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
  const links = req.body.documents;

  const quotify = s => s !== null && s !== undefined ? `'${s}'` : null;

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

    INSERT INTO Campagna (utente_generico, nome, idx_campagna, banner, descrizione, links_documenti) VALUES (
      '${UserInstance.USER.email}',
      ${quotify(name)},
      '${campaign_idx}',
      ${quotify(banner)},
      ${quotify(desc)},
      ${quotify(links.length > 0 ? links.join('\n') : null)}
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

export async function loadCampaigns(req, res) {
  canSend = true;

  const email = UserInstance.USER.email;
  const query = `SELECT * FROM Campagna WHERE utente_generico = '${email}'`;

  try {
    let campaigns = await Database.queryAll(query);

    for(const campaign of campaigns) {
      campaign.playersCount = (await Database.queryOne(`
        SELECT count(*) AS playersCount
        FROM ArrayCampagnaPersonaggiItem
        WHERE idx_campagna = '${campaign.idx_campagna}'
        AND stato_personaggio = 'accepted'
      `)).playersCount;
    }

    sendResponse({
        status_code: 200,
        success: true,
        message: "Campagne ottenute con successo",
        campaigns: campaigns
      },
      res
    )
  } catch(err) {
    sendResponse(CampagnaResponses.CANNOT_OBTAIN_CAMPAIGNS, res);
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

async function loadAcceptedCharacterCampaigns(req, res) {
  canSend = true;

  const idx = UserInstance.USER.player_id;
  try {
    const campaigns = await DatabaseQueries.retrieve(`SELECT idx_campagna FROM ArrayCampagnaPersonaggiItem WHERE idx_personaggio LIKE '%${idx}%' AND stato_personaggio = 'accepted'`, el => el)

    let retArray = [];
      for (const campaign of campaigns) {
        let campInfo = await DatabaseQueries.retrieve(`SELECT * FROM Campagna WHERE idx_campagna = '${campaign.idx_campagna}'`, el => el);
  
        campInfo = campInfo[0];
        
        campInfo.playersCount = (await Database.queryOne(`
          SELECT count(*) AS playersCount
          FROM ArrayCampagnaPersonaggiItem
          WHERE idx_campagna = '${campInfo.idx_campagna}'
          AND stato_personaggio = 'accepted'
        `)).playersCount;

        retArray.push(campInfo);
      }

      sendResponse({
        status_code: 200,
        message: 'Campagne caricate con successo',
        success: true,
        campaigns: retArray,
      }, res);

  }catch (err) {
    sendResponse({
      status_code: 404,
      message: 'Non è stato possibile caricare le campagne dal database ' + err,
      success: false,
    }, res);
  }

}

function createCampaignParticipationRequest(req,res) {
  canSend = true;

  const idx_campagna = req.body.idx;
  const name = req.body.name;
  const idx_personaggio = `${name} @ ${UserInstance?.USER?.player_id}`;

  try {
    Database.execOne(`INSERT OR IGNORE INTO ArrayCampagnaPersonaggiItem (idx_campagna,idx_personaggio,stato_personaggio) VALUES ('${idx_campagna}','${idx_personaggio}','pending')`);
    sendResponse({
      status_code: 200,
      message: 'Request has been sent',
      success: true,
    }, res);
  } catch (err) {
    sendResponse({
      status_code: 400,
      message: 'There was some kind of error in the databse',
      success: false,
    }, res);
  }
}

export async function loadAcceptedPlayers(req, res) {
  canSend = true;

  const campaign_idx = req.body.campaign_idx;
  const query = `
  SELECT * FROM ArrayCampagnaPersonaggiItem
  WHERE idx_campagna = '${campaign_idx}'
  AND stato_personaggio = 'accepted'
  `;

  try {
    const players_idx_rows = await Database.queryAll(query);

    let players = [];
    for(const row of players_idx_rows) {
      const player_query = `SELECT * FROM Personaggio WHERE idx_personaggio = '${row.idx_personaggio}'`;
      const player = await Database.queryOne(player_query);
      players.push(player);
    }

    sendResponse({
        message: "Giocatori ottenuti con successo",
        status_code: 200,
        success: true,
        players: players
      },
      res
    );
  } catch(err) {
    sendResponse({
        status_code: 401,
        success: false,
        message: "Impossibile ottenere i personaggi: " + err
      },
      res
    );
  }
}


export async function loadCampaignPlayers(req, res) {
  canSend = true;

  const campaign_idx = req.body.campaign_idx;
  const query = `
  SELECT * FROM ArrayCampagnaPersonaggiItem
  WHERE idx_campagna = '${campaign_idx}'
  `;

  try {
    const players_idx_rows = await Database.queryAll(query);

    let players = [];
    for(const row of players_idx_rows) {
      const player_query = `SELECT * FROM Personaggio WHERE idx_personaggio = '${row.idx_personaggio}'`;
      const player = await Database.queryOne(player_query);
      player.stato = row.stato_personaggio;
      players.push(player);
    }

    sendResponse({
        message: "Giocatori ottenuti con successo",
        status_code: 200,
        success: true,
        players: players
      },
      res
    );
  } catch(err) {
    sendResponse({
        status_code: 401,
        success: false,
        message: "Impossibile ottenere i personaggi: " + err
      },
      res
    );
  }
}


export async function exitCampaign(req,res) {
  canSend = true;

  const idx_personaggio = UserInstance.USER.player_id;
  const idx_campagna = req.body.idx_campagna;

  try {
    Database.execOne(`DELETE FROM ArrayCampagnaPersonaggiItem WHERE idx_campagna = '${idx_campagna}' AND idx_personaggio LIKE '%${idx_personaggio}%'`);

    sendResponse({
        status_code: 200,
        success: true,
        message: 'Personaggio rimosso da campagna con successo'
      },
      res
    );
  }
  catch (err) {
    sendResponse({
        status_code: 401,
        success: false,
        message: "Problema col database: " + err
      },
      res
    );
  }

}

export default {
  createCampaign,
  loadPlayers,
  loadCampaigns,
  loadAcceptedCharacterCampaigns,
  createCampaignParticipationRequest,
  loadAcceptedPlayers,
  loadCampaignPlayers,
  exitCampaign,
}