import express from "express";
import middleware from '../middlewares/campagna.Middleware.js'
import controller from "../controllers/campagna.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import characterMiddleware from "../middlewares/character.middleware.js";

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
  "/load-accepted-character-campaigns",
  authMiddleware.isLogged,
  controller.loadAcceptedCharacterCampaigns
);

campagnaRouter.post(
  "/create-campaign-participation-request",
  authMiddleware.isLogged,
  middleware.doesCampaignCodeExist,
  middleware.checkIfCharacterAlreadyInCampaign,
  characterMiddleware.doesCharacterExist,
  middleware.doesRequestAlreadyExist,
  controller.createCampaignParticipationRequest
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

campagnaRouter.post(
  "/get-dungeon-master-name",
  authMiddleware.isLogged,
  middleware.assertCampaignExists,
  controller.getDungeonMasterName
);

campagnaRouter.post(
  "/accept-request",
  authMiddleware.isLogged,
  middleware.assertCampaignExists,
  middleware.assertPlayerExists,
  middleware.assertValidRequest,
  controller.acceptPlayerRequest
);

campagnaRouter.post(
  "/remove-player",
  authMiddleware.isLogged,
  middleware.assertCampaignExists,
  middleware.assertPlayerExists,
  middleware.assertCanRemove,
  controller.removePlayer
);

campagnaRouter.post(
  "/delete-campaign",
  authMiddleware.isLogged,
  middleware.assertCampaignExists,
  controller.deleteCampaign
)