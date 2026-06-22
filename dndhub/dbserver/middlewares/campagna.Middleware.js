import { UserInstance } from "../global.context.js";
import { CampagnaResponses } from "../controllers/campagna.responses.js";
import { Database } from "../database.js";
import { decodeCampaign } from "src/app/core/core.js";
import { DatabaseQueries } from "dbserver/database.queries.js";

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

export default {
  assertCampaignNotExists,
  assertPlayersExists,
  assertValidCampaignInfo,
}