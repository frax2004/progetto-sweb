import { Database } from "../database.js";
import { PostsQueries } from "./PostsQueries.js";
import { PostsResponses } from "./post.controller.response.js";
import { PostsValidators } from "./post.validator.js";


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
  canSend = true;
  console.log("get prova ")
  const idx_campagna = req.params.idx_campagna;
  const db = Database.INSTANCE;

  const postCallback = (err, rows) => {
    if (err) {

      sendResponse(PostsResponses.POSTS_FETCH_ERROR, res); 
    } else {
      sendResponse(
        {...PostsResponses.POSTS_FETCH_SUCCESS, data: rows,},res); 
        
    }
  };

  db.all(PostsQueries.getPostsCampaign(idx_campagna), postCallback); 
  
}


function createPost(req, res) {
  canSend = true;

  const idx_campagna = req.params.idx_campagna;
  const contenuto = req.body.contenuto;
  const time_stamp = req.body.time_stamp;

  const db = Database.INSTANCE;

  const ok = PostsValidators.assertContenuto(contenuto, () => sendResponse(PostsResponses.CONTENT_NOT_VALID, res)
  ) &&

    PostsValidators.assertTimestamp(time_stamp, () => sendResponse(PostsResponses.TIMESTAMP_NOT_VALID, res)
    )

  if (!ok) return;

  const creaPostCallback = (err) => {

    if (err) {
      sendResponse(PostsResponses.POST_CREATE_ERROR, res);
    }
    else {
      sendResponse(
        PostsResponses.POST_CREATE_SUCCESS, res);
    }
  };

  db.run(
    PostsQueries.SetPostCampaign(idx_campagna, contenuto, time_stamp), creaPostCallback);
}

function deletePost(req, res) {
  canSend = true;

  const idx_campagna = req.params.idx_campagna;
  const time_stamp = req.body.time_stamp;

  const ok = PostsValidators.assertTimestamp(time_stamp, () => sendResponse(PostsResponses.TIMESTAMP_NOT_VALID, res)
  )

  if (!ok) return;

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