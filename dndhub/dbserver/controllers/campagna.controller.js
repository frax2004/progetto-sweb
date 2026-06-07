import { CampagnaResponses } from "../controllers/campagna.responses.js";

export function creaCampagnaController(req, res) {

  const {
    nome,
    descrizione,
    banner,
    utente_dungeon_master,
    idx,
    db
  } = req.campagnaData;

  const query = `INSERT INTO Campagna (utente_dungeon_master, nome, idx_campagna, banner, descrizione)
    VALUES (?, ?, ?, ?, ?)`;

  db.run(
    query,[utente_dungeon_master, nome, idx, banner, descrizione],
    function (err) 
    {
      if (err) 
        {
        const responde=CampagnaResponses.DATABASE_ERROR; 
        return res.status(response.status_code).json(response);
        }

    const response=CampagnaResponses.CAMPAIGN_CREATED(idx,nome);
    return res.status(response.status_code).json(response);

    }
  );
}