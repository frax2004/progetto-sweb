import express from "express";
import { checkCampagnaExists } from "../middlewares/PostMiddleware.js";
import postsController from "../controllers/posts.controller.js";

export const postRoutes = express.Router();


postRoutes.get("/campagne/:idx_campagna/posts", checkCampagnaExists, postsController.getPosts);
postRoutes.post("/campagne/:idx_campagna/posts", checkCampagnaExists, postsController.createPost);
postRoutes.delete("/campagne/:idx_campagna/posts",checkCampagnaExists, postsController.deletePost);
