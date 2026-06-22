import { UserInstance } from "../global.context.js";
import { CampagnaResponses } from "../controllers/campagna.responses.js";
import { Database } from "../database.js";
import { decodeCampaign } from "../../src/app/core/core.ts"
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

export async function doesCampaignExist(req,res,next) {
  canSend = true;

  const idx = decodeCampaign(req.body.idx);

  const campaign = await DatabaseQueries.retrieve(`SELECT * FROM Campagna WHERE idx_campagna = '${idx}'`, el => el);

  if (campaign[0] === undefined || campaign[0] === null) {
    sendResponse({
      status_code: 200,
      message: 'Specified code does not correspond to an existing campaign',
      success: false
    }, res);
  }
  else {
    req.body.idx = idx;
    next();
  }
}

export async function checkIfCharacterAlreadyInCampaign(req, res, next) {
  canSend = true;
  
  const name = req.body.name;
  const idx_personaggio = `${name} @ ${UserInstance?.USER?.player_id}`;
  
  const character = await DatabaseQueries.retrieve(`SELECT * FROM ArrayCampagnaPersonaggiItem WHERE idx_personaggio = '${idx_personaggio}' AND stato_personaggio = 'accepted'`, (el => el));
  
  if (character[0] === null || character[0] === undefined) next();
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

export default {
  assertCampaignNotExists,
  assertPlayersExists,
  assertValidCampaignInfo,
  checkIfCharacterAlreadyInCampaign,
  doesCampaignExist,
}