import express from "express";
import { register, login, verifyOTP } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register); // ✅ Add this for user registration
router.post("/login", login);
router.post("/verify-otp", verifyOTP);

export default router;
