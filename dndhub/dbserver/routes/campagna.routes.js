import express from "express";
import { creaCampagnaMiddleware } from "../middlewares/campagna.Middleware.js";
import { creaCampagnaController } from "../controllers/campagna.controller.js";
import { CampagnaResponses } from "../controllers/campagna.responses.js";


export const campagnaRouter = express.Router();

campagnaRouter.post(
  "/",
  creaCampagnaMiddleware,
  creaCampagnaController,

);