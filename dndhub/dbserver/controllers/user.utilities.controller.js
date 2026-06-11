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

function isLogged(req, res) {
  canSend = true;

  if(UserInstance.USER === null || UserInstance.USER === undefined) {
    sendResponse({
        success: true,
        status_code: 200,
        message: "Nessun utente loggato al momento",
        isLogged: false,
      },
      res
    );
  } else if(UserInstance.USER !== null && UserInstance.USER !== undefined) {
    sendResponse({
        success: true,
        status_code: 200,
        message: "Utente al momento loggato",
        isLogged: true,
      },
      res
    );
  } else {
    sendResponse({
        success: false,
        status_code: 400,
        message: "C'è stato qualche tipo di errore",
      },
      res
    );
  }
}

export function setUserInfo(req, res) {
  canSend = true;
  
  const oldEmail = UserInstance.USER.email;
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;

  const fail = err => sendResponse({
      success: false,
      status_code: 401,
      message: err.message
    },
    res
  );
  
  const success = () => {
    console.log("Campaigns updated");

    sendResponse({
        message: "Credenziali modificate con successo",
        success: true,
        status_code: 200
      },
      res
    );
  }

  const updateCampaigns = async () => {
    console.log("Characters updated");

    const query = `
    SELECT idx_campagna
    FROM Campagna
    WHERE utente_generico = '${email}'
    `;
    console.log(`Executing ${query}`);

    const updateCampaign = campaign => {
      const name = campaign.split('@')[0];
      return `${name} @ ${UserInstance.USER.dm_id}`;
    };

    const oldCampaigns = await Database.queryAll(query);

    const queries = oldCampaigns
    .map(x => x.idx_campagna)
    .map(oldCampaign => {
      const newCampaign = updateCampaign(oldCampaign);
      return `
      UPDATE Campagna
      SET idx_campagna = '${newCampaign}'
      WHERE idx_campagna = '${oldCampaign}'
      `
    })
    .join(';\n');
    console.log(`Executing ${queries}`);
    
    Database
    .execAll(queries)
    .catch(fail)
    .then(success);
  };

  const updateCharacters = async () => {
    console.log("Generic user updated");

    const query = `
      SELECT idx_personaggio
      FROM Personaggio
      WHERE utente_generico = '${email}'
    `;
    console.log(`Executing ${query}`);


    const updateCharacter = character => {
      const name = character.split('@')[0];
      return `${name} @ ${UserInstance.USER.player_id}`;
    };

    const oldCharacters = await Database.queryAll(query);

    const queries = oldCharacters
    .map(x => x.idx_personaggio)
    .map(oldCharacter => {
      const newCharacter = updateCharacter(oldCharacter);
      return `
      UPDATE Personaggio
      SET idx_personaggio = '${newCharacter}'
      WHERE idx_personaggio = '${oldCharacter}'
      `
    })
    .join(';\n');
    console.log(`Executing ${queries}`);

    Database
    .execAll(queries)
    .catch(fail)
    .then(updateCampaigns);
  };
  
  const updateGenericUser = () => {
    const query = `
    UPDATE UtenteGenerico
    SET utente_giocatore = '${UserInstance.USER.player_id}',
    utente_dungeon_master = '${UserInstance.USER.dm_id}'
    WHERE account = '${UserInstance.USER.email}'
    `;
    console.log(`Executing ${query}`);
    
    Database
    .execAll(query)
    .catch(fail)
    .then(updateCharacters);
  };
  
  const updateUser = _ => {
    const playerId = UserInstance.getPlayerId(email);
    const dmId = UserInstance.getDmId(email);
    const generic_token = generateToken({email: email});
    const player_token = generateToken({id: playerId});
    const dm_token = generateToken({id: dmId});

    UserInstance.USER = new UserInstance(generic_token, player_token, dm_token);
    console.log("Account updated");
    updateGenericUser();
  }

  const query = `
    UPDATE Account 
    SET email = '${email}', password = '${password}', username = '${username}' 
    WHERE email = '${oldEmail}'
  `;
  console.log(`Executing ${query}`);

  Database
  .execAll(query)
  .catch(fail)
  .then(updateUser);
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
  isLogged,
  getUserInfo,
  setUserInfo,
}