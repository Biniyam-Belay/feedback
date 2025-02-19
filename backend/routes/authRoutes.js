import express from "express";
import { registerUser, loginUser, refreshTokenHandler } from "../controllers/authController.js";
import rateLimit from "express-rate-limit"

const router = express.Router();

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later',
})

router.post("/register", authLimiter ,registerUser);
router.post("/login", authLimiter, loginUser);
router.post("/refresh", refreshTokenHandler);

export default router;