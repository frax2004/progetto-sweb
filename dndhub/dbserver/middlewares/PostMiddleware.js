import { Database } from "../database.js";
import { PostsQueries } from "./PostsQueries.js";
import { PostsResponses } from "./posts.responses.js";
import { PostsValidators } from "./post.validator.js";

export function checkCampagnaExists(req, res, next) { 

  const idx_campagna = req.params.idx_campagna; // prendo idx campagna dalla richiesta http e le assegno valore
  console.log("idx_campagna: " + idx_campagna) 
  const ok = PostsValidators.assertIdxCampagna(idx_campagna,() => { // uso il validator per vederese l'indice della campagna è valida
    res.status(PostsResponses.IDX_CAMPAGNA_INVALID.status_code).json(PostsResponses.IDX_CAMPAGNA_INVALID);
    }
  );    

  if (!ok) return; // se non è valida si ferma

  const db = Database.INSTANCE; // runno il db 

  const postMiddlewarecallback = (err, row) => { // callback 

    if (err) { //errore generico del db
      console.log("Non trovato111")
      return res.status(PostsResponses.GENERIC_DB_ERROR.status_code).json(PostsResponses.GENERIC_DB_ERROR);
    }

    if (row === undefined) { // se non quando runno il db non trova corrispondenza della campagna termina
      console.log("Non trovato pippo")
      return res.status(PostsResponses.CAMPAGNA_NOT_FOUND.status_code).json(PostsResponses.CAMPAGNA_NOT_FOUND);
    }

    req.campagna=row; // una volta che tutto è andato bene posso 
    // passare al controller che si occuperà di mettere le cose nel db
    next();
  };

  db.get(PostsQueries.GetIdxCampagna(idx_campagna),postMiddlewarecallback);
  // funzione che prende l'idx campagna per vedere se esiste gli passo il 
  // callback così che nel mentre viene eseguita runna il db 
};
