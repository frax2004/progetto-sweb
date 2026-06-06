import express from 'express';
import controller from '../controllers/character.management.controller.js';

export const characterManagementRouter = express.Router();

characterManagementRouter.post("/class-selection", controller.displayClasses);
// characterManagementRouter