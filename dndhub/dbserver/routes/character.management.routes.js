import express from 'express';
import controller from '../controllers/character.management.controller.js';

export const characterManagementRouter = express.Router();

characterManagementRouter.post("/class-display", controller.displayClasses);
characterManagementRouter.post("/level-display-specific", controller.displayLevelByNameAndLevel);
characterManagementRouter.post("/species-display", controller.displaySpecies);
characterManagementRouter.post("/background-display", controller.displayBackgrounds);
characterManagementRouter.post("/level-display-by-class-and-level", controller.displayLevelRowByClassAndLevel);
characterManagementRouter.post("/spell-display-by-class", controller.displaySpellsByClass);
// characterManagementRouter