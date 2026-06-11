import express from 'express';
import authController from '../controllers/auth.controller.js';
import user_middleware from '../middlewares/user.utilities.middleware.js';

export const authRouter = express.Router();

authRouter.post("/login", authController.login);
authRouter.post("/register", authController.register);
authRouter.post("/logout", 
  user_middleware.isLogged,
  authController.logout
);

// curl -X POST http://localhost:10000/api/auth/login -H "Content-Type: application/json" -d '{"email":"castoromalefico99@outlook.it","password":"castoromaleficodelmale99"}'