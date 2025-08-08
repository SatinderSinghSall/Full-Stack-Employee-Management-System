import jwt from "jsonwebtoken";
import User from "../models/User.js";

const verifyUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, error: "Authorization token not provided." });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decoded._id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found." });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return res
      .status(401)
      .json({ success: false, error: "Invalid or expired token" });
  }
};

export default verifyUser;
