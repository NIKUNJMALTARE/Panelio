// backend/src/routes/projectRoutes.js
import express from "express";
import { getProjects, createProject } from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js";
import { uploadSingleImage } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getProjects)
  .post(protect, uploadSingleImage, createProject);

export default router;
