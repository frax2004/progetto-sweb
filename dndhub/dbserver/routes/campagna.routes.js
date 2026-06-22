import express from "express";
import middleware from '../middlewares/campagna.Middleware.js'
import controller from "../controllers/campagna.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

export const campagnaRouter = express.Router();

campagnaRouter.post(
  "/create_campaign",
  authMiddleware.isLogged,
  middleware.assertValidCampaignInfo,
  middleware.assertPlayersExists,
  middleware.assertCampaignNotExists,
  controller.createCampaign,
);

campagnaRouter.post(
  "/load_players",
  controller.loadPlayers
);

campagnaRouter.post(
  "/load_campaigns",
  authMiddleware.isLogged,
  controller.loadCampaigns
);

campagnaRouter.post(
  "/load_accepted_players",
  authMiddleware.isLogged,
  middleware.assertCampaignExists,
  controller.loadAcceptedPlayers,
);


campagnaRouter.post(
  "/load_campaign_players",
  authMiddleware.isLogged,
  middleware.assertCampaignExists,
  controller.loadCampaignPlayers,
);