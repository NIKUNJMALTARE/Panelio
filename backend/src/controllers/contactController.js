import Contact from "../models/Contact.js";

export const createContact = async (req, res, next) => {
  try {
    const { fullName, email, mobile, city } = req.body;
    if (!fullName || !email || !mobile || !city) {
      res.status(400);
      throw new Error("All fields are required");
    }
    const contact = await Contact.create({ fullName, email, mobile, city });
    res.status(201).json(contact);
  } catch (err) {
    next(err);
  }
};

export const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    next(err);
  }
};