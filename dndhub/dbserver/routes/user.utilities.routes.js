import express from 'express';
import user_controller from '../controllers/user.utilities.controller.js';
import user_middleware from '../middlewares/user.utilities.middleware.js';

export const userUtilitiesRouter = express.Router();

userUtilitiesRouter.post("/isLogged", user_controller.isLogged);
userUtilitiesRouter.post("/getUserInfo", user_middleware.isLogged, user_controller.getUserInfo);
userUtilitiesRouter.post(
  '/setUserInfo', 
  user_middleware.isLogged, 
  user_middleware.validateInfo, 
  user_middleware.canChangeEmail,
  user_controller.setUserInfo
);