import express from 'express';
import controller from '../controllers/user.utilities.controller.js';

export const userUtilitiesRouter = express.Router();

userUtilitiesRouter.post("/isLogged", controller.isLogged);