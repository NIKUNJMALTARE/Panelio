import Subscriber from "../models/Subscriber.js";

export const createSubscriber = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400);
      throw new Error("Email is required");
    }

    const exists = await Subscriber.findOne({ email });
    if (exists) {
      return res.status(200).json({ message: "Already subscribed" });
    }

    const sub = await Subscriber.create({ email });
    res.status(201).json(sub);
  } catch (err) {
    next(err);
  }
};

export const getSubscribers = async (req, res, next) => {
  try {
    const subs = await Subscriber.find().sort({ createdAt: -1 });
    res.json(subs);
  } catch (err) {
    next(err);
  }
};