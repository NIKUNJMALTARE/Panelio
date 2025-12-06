import express from "express";
import { getClients, createClient } from "../controllers/clientController.js";
import { protect } from "../middleware/authMiddleware.js";
import { uploadSingleImage } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.route("/")
  .get(getClients)
  .post(protect, uploadSingleImage, createClient);

export default router;
