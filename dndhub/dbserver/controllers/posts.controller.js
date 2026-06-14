import { Database } from "../database.js";
import { PostsQueries } from "./PostsQueries.js";
import { PostsResponses } from "./posts.responses.js";

let canSend = true;

function sendResponse(obj, res) {
  if (canSend) {
    res.status(obj.status_code).json(obj);
    canSend = false;
  } else {
    throw new Error("sendResponse() già chiamata");
  }
}

function getPosts(req, res) {
  canSend = true; // imposta il server per potere mandare una risposta

  const idx_campagna = req.params.idx_campagna;  // questo grazie alla routes che gli ho detto di prendere idx campagna dalla richiesta http assegna il valore
  const db = Database.INSTANCE; // runna l'interprete del db

  const postCallback = (err, rows) => { // serve per capire se è partito un'errore durante l'avvio del db
    if (err) {
      sendResponse(PostsResponses.POSTS_FETCH_ERROR, res); // utilizza il file response per rispondere senza generare sempre l'errore 
    } else {
      sendResponse(
        {
          ...PostsResponses.POSTS_FETCH_SUCCESS, // manda il successo
          data: rows,
        },
        res
      );
    }
  };

  db.all(
    PostsQueries.getPostsCampaign(idx_campagna), postCallback); // una volta che tutto è andato bene 
  // carico dal db i post della campagna
}



function createPost(req, res) {
  canSend = true;

  const idx_campagna = req.params.idx_campagna;
  const contenuto = req.body.contenuto;
  const time_stamp = req.body.time_stamp;

  const db = Database.INSTANCE;

  const creaPostCallBack = (err) => {
    if (err) {
      sendResponse(PostsResponses.POST_CREATE_ERROR, res);
    }
    else {
      sendResponse({
        ...PostsResponses.POST_CREATE_SUCCESS,
        data: { idx_campagna, contenuto, time_stamp }
      },
        res
      );
    }
  }

  db.run(PostsQueries.SetPostCampaign(idx_campagna, contenuto, time_stamp), creaPostCallBack);

}

function deletePost(req, res) {
  canSend = true;

  const idx_campagna = req.params.idx_campagna;
  const time_stamp = req.body.time_stamp;

  const db = Database.INSTANCE;

  const deletePostCallback = (err) => {
    if (err) {
      sendResponse(PostsResponses.POST_DELETE_ERROR, res);
    }
    else {
      sendResponse(PostsResponses.POST_DELETE_SUCCESS, res);
    }
  }
  db.run(PostsQueries.DeletePostsCampaign(idx_campagna, time_stamp), deletePostCallback);

}

export default {
  getPosts,
  createPost,
  deletePost,
};