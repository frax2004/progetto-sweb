import { CampagnaResponses } from "../controllers/campagna.responses.js";
import { Database } from "../database.js";

export function creaCampagnaMiddleware(req, res, next) {
  const db = Database.INSTANCE;

  const 
  {
    nome,
    descrizione,
    banner,
    utente_dungeon_master
  } = req.body;

  if (!nome || nome.trim().length === 0) 
    {
        const response=CampagnaResponses.CAMPAIGN_NAME_REQUIRED;
        return res.status(response.status_code).json(response);    
    }

  const idx = `${utente_dungeon_master}-${nome}`;

  req.campagnaData = 
  {
    nome,
    descrizione,
    banner,
    utente_dungeon_master,
    idx, // fare un controller per le query 
    db
  };

                      
  db.get(
    "SELECT idx_campagna FROM Campagna WHERE idx_campagna = ?",
    [idx],// vedo se è doppione se no basta cosi freezer
    (err, row) => {

      if (err) {
        return res.status(500).json(err);
      }

      if (row) 
        {
        const response = CampagnaResponses.CAMPAIGN_ALREADY_EXISTS;
        return res.status(response.status_code).json(response);
        }

      next(); 
    }
  );
}