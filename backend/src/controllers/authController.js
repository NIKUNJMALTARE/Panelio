import AdminUser from "../models/AdminUser.js";
import generateToken from "../utils/generateToken.js";

export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const admin = await AdminUser.findOne({ email });
    if (!admin) {
      res.status(401);
      throw new Error("Invalid email or password");
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      res.status(401);
      throw new Error("Invalid email or password");
    }

    res.json({
      _id: admin._id,
      email: admin.email,
      token: generateToken(admin._id)
    });
  } catch (err) {
    next(err);
  }
};

export const registerAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const exists = await AdminUser.findOne({ email });
    if (exists) {
      res.status(400);
      throw new Error("Admin already exists");
    }

    const admin = await AdminUser.create({ email, password });
    res.status(201).json({ _id: admin._id, email: admin.email });
  } catch (err) {
    next(err);
  }
};