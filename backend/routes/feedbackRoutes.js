import express from "express";
import { getFeedbacks, createFeedback, updateFeedbackStatus } from "../controllers/feedbackController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getFeedbacks);
router.post("/", protect, createFeedback);
router.put("/:id", protect, updateFeedbackStatus);

export default router;