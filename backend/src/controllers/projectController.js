import Project from "../models/Project.js";

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

    const imageUrl = `/uploads/${file.filename}`;

    const project = await Project.create({ name, description, imageUrl });
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
};
