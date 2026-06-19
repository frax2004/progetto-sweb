import express from 'express';

import auth_controller from '../controllers/auth.controller.js';
import auth_middleware from '../middlewares/auth.middleware.js';

export const authRouter = express.Router();

authRouter.post(
  "/login", 
  auth_middleware.validateEmail,
  auth_middleware.validatePassword,
  auth_middleware.isSignedIn,
  auth_middleware.checkPassword,
  auth_controller.login
);

authRouter.post(
  "/register", 
  auth_middleware.validateEmail,
  auth_middleware.validatePassword,
  auth_middleware.validateUsername,
  auth_middleware.isSigninAvailable,
  auth_controller.register
);

authRouter.post(
  "/logout", 
  auth_middleware.isLogged,
  auth_controller.logout
);

authRouter.post(
  "/delete_account",
  auth_middleware.isLogged,
  auth_controller.deleteAccount
);
