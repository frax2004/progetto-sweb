import { Database } from "../database.js";
import { PostsQueries } from "../controllers/PostsQueries.js";
import { PostsResponses } from "../controllers/post.controller.response.js";
import { PostsValidators } from "../controllers/post.validator.js";

export function checkCampagnaExists(req, res, next) { 
  console.log("verifica Middleware");
  const idx_campagna = req.params.idx_campagna; 
  console.log("idx_campagna: " + idx_campagna) 
  const ok = PostsValidators.assertIdxCampagna(idx_campagna,() => { 
    res.status(PostsResponses.IDX_CAMPAGNA_INVALID.status_code).json(PostsResponses.IDX_CAMPAGNA_INVALID);
    }
  );    

  if (!ok) return; 

  const db = Database.INSTANCE; 

  const postMiddlewarecallback = (err, row) => { 

    if (err) { 
      return res.status(PostsResponses.GENERIC_DB_ERROR.status_code).json(PostsResponses.GENERIC_DB_ERROR);
    }

    if (row === undefined) { 
      return res.status(PostsResponses.CAMPAGNA_NOT_FOUND.status_code).json(PostsResponses.CAMPAGNA_NOT_FOUND);
    }

    req.campagna=row; 
    
    next();
  };

  db.get(PostsQueries.GetIdxCampagna(idx_campagna),postMiddlewarecallback);
  
  
};


export default {
  checkCampagnaExists,
}