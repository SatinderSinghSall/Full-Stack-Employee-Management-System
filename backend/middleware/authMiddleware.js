import jwt from "jsonwebtoken";
import User from "../models/User.js";

const verifyUser = async (req, res, next) => {
  try {
    const token = await req.headers.authorization.split("")[1];

    if (!token) {
      return res
        .status(404)
        .json({ success: false, error: "Authorization token not provided." });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return res
        .status(404)
        .json({ success: false, error: "Authorization token not valid." });
    }

    const user = await User.findById({ _id: decoded._id }).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found." });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Internal Server Error: 500");
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error: 500" });
  }
};

export default verifyUser;
