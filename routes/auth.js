import express from 'express';
import { loginUser, registerUser, createResetPasswordHash, resetPassword } from '../controllers/authController.js';
import defaultHandler from '../controllers/defaultHandler.js';

const router = express.Router();

router.post('/register', defaultHandler(registerUser));

router.post('/login', defaultHandler(loginUser));

router.post('/reset/password', defaultHandler(resetPassword));

router.get('/reset/password', defaultHandler(createResetPasswordHash));

export default router;
