import Project from "../models/Project.js";
import cloudinary from "../utils/cloudinary.js";
import fs from "fs";

export const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    next(err);
  }
};

export const createProject = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const file = req.file;

    if (!name || !description || !file) {
      res.status(400);
      throw new Error("Please provide name, description and image");
    }


    const result = await cloudinary.uploader.upload(file.path, {
      folder: "realtrust/projects",
      use_filename: true,
      unique_filename: false,
      resource_type: "image"
    });

    fs.unlink(file.path, (err) => {
      if (err) console.warn("Failed to delete temp file:", err);
    });

    const imageUrl = result.secure_url;

    const project = await Project.create({ name, description, imageUrl });
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
};
