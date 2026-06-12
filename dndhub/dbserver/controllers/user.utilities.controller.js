import { 
  UserInstance, 
  generateToken 
} from "../global.context.js";
import { DatabaseQueries } from "../database.queries.ts";
import { Database } from "../database.js";

let canSend = true;
function sendResponse(obj, res) {
  if(canSend) {
    res.status(obj.status_code).json(obj);
    canSend = false;
  } else throw new Error("Chiamata a sendResponse() gia effettuata");
}

export async function setUserInfo(req, res) {
  canSend = true;
  
  const oldEmail = UserInstance.USER.email;
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  const playerId = UserInstance.getPlayerId(email);
  const dmId = UserInstance.getDmId(email);
  
  const updateCampaign = campaign => {
    const name = campaign.split('@')[0];
    return `${name} @ ${dmId}`;
  };

  const updateCharacter = character => {
    const name = character.split('@')[0];
    return `${name} @ ${playerId}`;
  };

  const toCharacterUpdateQuery = oldCharacter => {
    const newCharacter = updateCharacter(oldCharacter);
    return `
    UPDATE Personaggio
    SET idx_personaggio = '${newCharacter}'
    WHERE idx_personaggio = '${oldCharacter}'
    `;
  };

  const toCampaignUpdateQuery = oldCampaign => {
    const newCampaign = updateCampaign(oldCampaign);
    return `
    UPDATE Campagna
    SET idx_campagna = '${newCampaign}'
    WHERE idx_campagna = '${oldCampaign}'
    `;
  };


  const charactersQueries = (await Database.queryAll(`
    SELECT idx_personaggio
    FROM Personaggio
    WHERE utente_generico = '${oldEmail}'
  `))
  .map(x => x.idx_personaggio)
  .map(toCharacterUpdateQuery)
  .join(';\n');

  const campaignsQueries = (await Database.queryAll(`
    SELECT idx_campagna
    FROM Campagna
    WHERE utente_generico = '${oldEmail}'
  `))
  .map(x => x.idx_campagna)
  .map(toCampaignUpdateQuery)
  .join(';\n');


  const query = `
    BEGIN TRANSACTION;
    
    UPDATE Account 
    SET email = '${email}', password = '${password}', username = '${username}' 
    WHERE email = '${oldEmail}';
    
    UPDATE UtenteGenerico
    SET utente_giocatore = '${playerId}',
        utente_dungeon_master = '${dmId}'
    WHERE account = '${email}';

    ${charactersQueries};

    ${campaignsQueries};

    COMMIT;
  `;


  try {
    await Database.execAll(query);

    const generic_token = generateToken({email: email});
    const player_token = generateToken({id: playerId});
    const dm_token = generateToken({id: dmId});

    UserInstance.USER = new UserInstance(generic_token, player_token, dm_token);

    sendResponse({
        message: "Credenziali modificate con successo",
        success: true,
        status_code: 200
      },
      res
    );
  } catch(err) {
    try {
      await Database.execOne('ROLLBACK;');
    } finally {
      sendResponse({
          success: false,
          status_code: 401,
          message: err.message
        },
        res
      );
    }
  }
}



export function getUserInfo(req, res) {
  canSend = true;

  const email = UserInstance.USER.email;

  DatabaseQueries.retrieve(
    `SELECT * FROM Account WHERE email = '${email}'`, 
    x => x
  ).catch(err => {
    sendResponse({
      status_code: 401,
      success: false,
      message: `Non è stato possibile ottenere le credenziali dell'utente registrato come ${email}`
    }, res)
  }).then(rows => {
    const credentials = rows[0];

    sendResponse({
      success: true,
      status_code: 200,
      message: "Credenziali ottenute con successo",
      email: credentials.email,
      password: credentials.password,
      username: credentials.username
    }, res);
  });

}

export default {
  getUserInfo,
  setUserInfo,
}