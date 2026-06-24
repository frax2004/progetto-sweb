import { UserInstance } from "../global.context.js";
import { CampagnaResponses } from "../controllers/campagna.responses.js";
import { Database } from "../database.js";
import { decodeCampaign } from "../global.context.js";
import { DatabaseQueries } from "../database.queries.ts";

let canSend = true;
function sendResponse(obj, res) {
  if(canSend) {
    res.status(obj.status_code).json(obj);
    canSend = false;
  } else throw new Error("Chiamata a sendResponse() gia effettuata");
}

export function assertValidCampaignInfo(req, res, next) {
  canSend = true;

  const name = req.body.name;

  if (!name || name.trim().length === 0 || /["'`]+/.test(name)) {
    const response = CampagnaResponses.CAMPAIGN_NAME_REQUIRED_OR_INVALID;
    return sendResponse(response, res);
  } else next();

}

export async function assertPlayersExists(req, res, next) {
  canSend = true;

  // console.log(`campagna.middleware.assertPlayersExists(req.body = ${JSON.stringify(req.body, null, 2)})`);
  const players = req.body.players;

  const query = `SELECT * FROM Personaggio WHERE idx_personaggio in (${players.map(x => `'${x}'`).join(', ')})`;

  try {
    const idxs_players = await Database.queryAll(query);
    if(idxs_players.length !== players.length) {
      return sendResponse(
        CampagnaResponses.USER_DOES_NOT_EXIST,
        res
      );
    } else {
      req.body.players = idxs_players.map(x => x.idx_personaggio);
      next();
    }
  } catch(err) {
    sendResponse(CampagnaResponses.DATABASE_ERROR, res);
  }
}

export async function assertCampaignNotExists(req, res, next) {
  canSend = true;

  const name = req.body.name;
  const campaign_idx = `${name} @ ${UserInstance.USER.dm_id}`;

  const query = `SELECT idx_campagna FROM Campagna WHERE idx_campagna = '${campaign_idx}'`;

  try {
    const campaign = await Database.queryOne(query);
    if(campaign !== undefined) {
      return sendResponse(CampagnaResponses.CAMPAIGN_ALREADY_EXISTS, res);
    } else {
      req.body.campaign_idx = campaign_idx;
      next();
    }
  } catch(err) {
    sendResponse(CampagnaResponses.DATABASE_ERROR, res);
  }
}

export async function doesCampaignCodeExist(req,res,next) {
  canSend = true;

  const idx = decodeCampaign(req.body.idx);

  const campaign = await DatabaseQueries.retrieve(`SELECT * FROM Campagna WHERE idx_campagna = '${idx}'`, el => el);

  if (campaign[0] === undefined || campaign[0] === null) {    
    sendResponse({
      status_code: 400,
      message: 'Specified code does not correspond to an existing campaign',
      success: false
    }, res);
  }
  else {
    console.log('campaign code ok\n');
    req.body.idx = idx;
    next();
  }
}

export async function checkIfCharacterAlreadyInCampaign(req, res, next) {
  canSend = true;

  const name = req.body.name;
  const idx_personaggio = `${name} @ ${UserInstance?.USER?.player_id}`;
  
  const character = await DatabaseQueries.retrieve(`SELECT * FROM ArrayCampagnaPersonaggiItem WHERE idx_personaggio = '${idx_personaggio}' AND stato_personaggio = 'accepted'`, (el => el));
  
  if (character[0] === null || character[0] === undefined) {
    req.body.idx_personaggio = idx_personaggio;
    next();
  }
  else {
      sendResponse({
          status_code: 400,
          success: false,
          message: 'Character already is in a campaign, they can\'t participate in another one',
      }, res);
  }
}

export async function  doesRequestAlreadyExist(req,res,next) {
  canSend = true;

  const name = req.body.name;
  const idx_personaggio = `${name} @ ${UserInstance?.USER?.player_id}`;
  const idx_campagna = req.body.idx;

  const character = await DatabaseQueries.retrieve(`SELECT * FROM ArrayCampagnaPersonaggiItem WHERE idx_personaggio = '${idx_personaggio}' AND idx_campagna = '${idx_campagna}'`, (el => el));

  if (character[0] === undefined || character[0] === null) next();
  else {
    sendResponse({
          status_code: 400,
          success: false,
          message: 'Character is already waiting for response by this campaign',
      }, res);
  }
}
      
      
      
export async function assertCampaignExists(req, res, next) {
  canSend = true;

  let campaign_idx = '';
  if (req.body.campaign_idx !== undefined && req.body.campaign_idx !== null) campaign_idx = req.body.campaign_idx;
  else campaign_idx = req.body.idx_campagna;
  
  const query = `SELECT * FROM Campagna WHERE idx_campagna = '${campaign_idx}'`;

  try {
    const rows = await Database.queryAll(query);

    if(rows !== undefined && rows !== null && rows.length > 0) {
      next();
    } else {
      sendResponse({
          message: "La campagna specificata non esiste.",
          status_code: 401,
          success: false
        },
        res
      );
    }
  } catch(err) {
    sendResponse({
        message: err,
        status_code: 401,
        success: false
      },
      res
    );
  }
}

export async function assertValidRequest(req, res, next) {
  canSend = true;
  
  const player_idx = req.body.player_idx;
  const campaign_idx = req.body.campaign_idx;
  
  const query = `
  SELECT * 
  FROM ArrayCampagnaPersonaggiItem
  WHERE idx_campagna = '${campaign_idx}'
  AND idx_personaggio = '${player_idx}'
  AND stato_personaggio = 'pending'
  `;

  try {
    const row = await Database.queryOne(query);
    if(row !== undefined && row !== null) {
      next();
    } else {
      sendResponse({
          message: "Richiesta di accettazione invalida.",
          status_code: 401,
          success: false
        },
        res
      );
    }
  } catch(err) {
    sendResponse({
        message: err,
        status_code: 401,
        success: false
      },
      res
    );
  }
}

export async function assertPlayerExists(req, res, next) {
  canSend = true;
  
  const player_idx = req.body.player_idx;
  const query = `SELECT * FROM Personaggio WHERE idx_personaggio = '${player_idx}'`;
  
  try {
    const row = await Database.queryOne(query);
    if(row === undefined || row === null) {
      return sendResponse(
        CampagnaResponses.USER_DOES_NOT_EXIST,
        res
      );
    } else next();
  } catch(err) {
    sendResponse(CampagnaResponses.DATABASE_ERROR, res);
  }
}

export async function assertCanRemove(req, res, next) {
  canSend = true;
  
  const player_idx = req.body.player_idx;
  const campaign_idx = req.body.campaign_idx;
  
  const query = `
  SELECT * FROM ArrayCampagnaPersonaggiItem 
  WHERE idx_campagna = '${campaign_idx}'
  AND idx_personaggio = '${player_idx}'
  `;
  
  try {
    const row = await Database.queryOne(query);
    
    if(row !== null && row !== undefined) {
      next();
    } else sendResponse(CampagnaResponses.USER_DOES_NOT_EXIST, res);
  } catch(err) {
    sendResponse({
        message: "Impossibile ottenere informazioni circa il giocatore specificato: " + err,
        status_code: 401,
        success: false
      },
      res
    );
  }
}

export async function checkIfCharacterIsInSpecifiedCampaign(req,res,next) {
  canSend = true;
  const idx_personaggio = UserInstance.USER.player_id;
  const idx_campagna = req.body.idx_campagna;

  const query = `SELECT * FROM ArrayCampagnaPersonaggiItem WHERE idx_campagna = '${idx_campagna}' AND idx_personaggio LIKE '%${idx_personaggio}%'`;


  const row = await DatabaseQueries.retrieve(`SELECT * FROM ArrayCampagnaPersonaggiItem WHERE idx_campagna = '${idx_campagna}' AND idx_personaggio LIKE '%${idx_personaggio}%'`, el => el);


  if (row[0] === undefined || row[0] === null) {
    sendResponse({
        message: 'Specified row does not exist',
        status_code: 401,
        success: false
      },
      res
    );
  }
  else {
    next();
  }
}
      
export default {
  assertCampaignNotExists,
  assertPlayersExists,
  assertValidCampaignInfo,
  checkIfCharacterAlreadyInCampaign,
  doesCampaignCodeExist,
  doesRequestAlreadyExist,
  assertCampaignExists,
  assertValidRequest,
  assertPlayerExists,
  assertCanRemove,
  checkIfCharacterIsInSpecifiedCampaign,
}