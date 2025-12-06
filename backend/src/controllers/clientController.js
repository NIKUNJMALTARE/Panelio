import Client from "../models/Client.js";

export const getClients = async (req, res, next) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json(clients);
  } catch (err) {
    next(err);
  }
};

export const createClient = async (req, res, next) => {
  try {
    const { name, description, designation } = req.body;
    const file = req.file;

    if (!name || !description || !designation || !file) {
      res.status(400);
      throw new Error("Please provide name, description, designation and image");
    }

    const imageUrl = `/uploads/${file.filename}`;

    const client = await Client.create({
      name,
      description,
      designation,
      imageUrl
    });

    res.status(201).json(client);
  } catch (err) {
    next(err);
  }
};
