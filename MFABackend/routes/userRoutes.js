import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js"; // Import middleware
import { loginUser } from "../controllers/userController.js"; // Import login function

const router = express.Router();

router.post("/login", loginUser); // Define login route


// Protected Route (Only accessible with a valid token)
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Exclude password from response
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
