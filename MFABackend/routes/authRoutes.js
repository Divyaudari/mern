import express from 'express';
import { login, verifyOTP } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', login);        // Login and send OTP if MFA enabled
router.post('/verify-otp', verifyOTP); // Verify OTP and complete login

export default router;
