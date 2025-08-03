import connectDatabase from "./db/db.js";
import User from "./models/User.js";
import bcrypt from "bcrypt";

const AdminRegister = async () => {
  try {
    connectDatabase();
    const hashedPassword = await bcrypt.hash("Satinder@123", 10);
    const newAdmin = new User({
      name: "Satinder Singh Sall",
      email: "satindersinghsall111@gmail.com",
      password: hashedPassword,
      role: "Admin",
    });

    await newAdmin.save();
  } catch (error) {
    console.log("Error while registering an Admin.");
    console.error(error);
  }
};

AdminRegister();
