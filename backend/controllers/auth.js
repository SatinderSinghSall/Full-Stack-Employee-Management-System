import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ success: false, error: "User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(404).json({ success: false, error: "Invalid Password." });
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      token,
      user: { _id: user._id, name: user.name, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
    console.log(error);
    console.log(error.message);
  }
};

export const verify = (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
};
