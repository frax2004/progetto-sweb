import express from "express";
import { PostsController } from "../controller/posts.controller.js";
import { checkCampagnaExists } from "../middlewares/PostMiddleware.js";

export const postRoutes = express.Router();


postRoutes.get("/campagne/:idx_campagna/posts", checkCampagnaExists, PostsController.getPosts);
postRoutes.post("/campagne/:idx_campagna/posts", checkCampagnaExists, PostsController.createPost);
postRoutes.delete("/campagne/:idx_campagna/posts",checkCampagnaExists, PostsController.deletePost);
