import express from "express";
import { PostsController } from "../controller/posts.controller.js";

export const postRoutes = express.Router();


postRoutes.get("/campagne/:idx_campagna/posts", PostsController.getPosts);
postRoutes.post("/campagne/:idx_campagna/posts", PostsController.createPost);
