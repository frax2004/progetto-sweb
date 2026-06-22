import express from "express";
import middleware from "../middlewares/PostMiddleware.js";
import postsController from "../controllers/posts.controller.js";

export const postRoutes = express.Router();


postRoutes.get(
  "/campagne/:idx_campagna/posts", 
  middleware.checkCampagnaExists, 
  postsController.getPosts
);

postRoutes.post(
  "/campagne/:idx_campagna/posts", 
  middleware.checkCampagnaExists, 
  postsController.createPost
);

postRoutes.delete(
  "/campagne/:idx_campagna/posts", 
  middleware.checkCampagnaExists, 
  postsController.deletePost
);

