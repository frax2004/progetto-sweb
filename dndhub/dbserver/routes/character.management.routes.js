import express from 'express';
import controller from '../controllers/character.management.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import characterMiddleware from '../middlewares/character.middleware.js' 

export const characterManagementRouter = express.Router();

characterManagementRouter.post("/class-display", controller.displayClasses);
characterManagementRouter.post("/level-display-specific", controller.displayLevelByNameAndLevel);
characterManagementRouter.post("/species-display", controller.displaySpecies);
characterManagementRouter.post("/background-display", controller.displayBackgrounds);
characterManagementRouter.post("/level-display-by-class-and-level", controller.displayLevelRowByClassAndLevel);
characterManagementRouter.post("/spell-display-by-class", controller.displaySpellsByClass);
characterManagementRouter.post("/class-display-by-name", controller.displayClassByName);
characterManagementRouter.post("/species-display-by-name", controller.displaySpeciesByName);
characterManagementRouter.post("/background-display-by-name", controller.displayBackgroundByName);
characterManagementRouter.post("/insert-character",
    authMiddleware.isLogged,
    characterMiddleware.validateCharacter,
    characterMiddleware.doesCharacterAlreadyExist,
    controller.insertCharacter
);
// characterManagementRouter