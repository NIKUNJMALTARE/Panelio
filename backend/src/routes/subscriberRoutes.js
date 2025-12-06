import express from "express";
import {
  createSubscriber,
  getSubscribers
} from "../controllers/subscriberController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createSubscriber);
router.get("/", protect, getSubscribers);

export default router;