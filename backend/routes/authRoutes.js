import express from "express";
import passport from "passport";
import { registerUser, loginUser, refreshTokenHandler } from "../controllers/authController.js";
import rateLimit from "express-rate-limit"
import { configurePassport, generateToken } from "../controllers/passportStrategies.js";

const router = express.Router();

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later',
})

//Social Routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email']}))
router.get('/github', passport.authenticate('github', { scope: ['user:email']}))
router.get('.google/callback',
    passport.authenticate('google', {session: false}),
    (req, res) => {
    res.redirect(`${process.env.CLIENT_URL}/auth/callback?token=${token}`);
    }
);

router.get('/github/callback',
    passport.authenticate('github', { session: false }),
    (req, res) => {
      const token = generateToken(req.user.id);
      res.redirect(`${process.env.CLIENT_URL}/auth/callback?token=${token}`);
    }
);

router.post("/register", authLimiter ,registerUser);
router.post("/login", authLimiter, loginUser);
router.post("/refresh", refreshTokenHandler);

export default router;