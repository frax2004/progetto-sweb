import express from "express";
import { PostsController } from "../controller/posts.controller.js";

export const postRoutes = express.Router();


router.get("/campagne/:id/posts", PostsController.getPosts);
router.post("/campagne/:id/posts", PostsController.createPost);
