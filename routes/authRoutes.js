import express from 'express';
import authController from '../controllers/authController.js';
import validate from '../middleware/validateMiddleware.js';
import { registerSchema, loginSchema } from '../validation/authValidation.js';

const router = express.Router();

router.post('/register', validate(registerSchema), authController.register);

router.post('/login', validate(loginSchema), authController.login);

export default router;