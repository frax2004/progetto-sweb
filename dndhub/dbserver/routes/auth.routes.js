import express from 'express';
import controller from '../controllers/auth.controller.js';

export const authRouter = express.Router();

authRouter.post("/login", controller.login);
authRouter.post("/register", controller.register);

// curl -X POST http://localhost:10000/api/auth/login -H "Content-Type: application/json" -d '{"email":"castoromalefico99@outlook.it","password":"castoromaleficodelmale99"}'