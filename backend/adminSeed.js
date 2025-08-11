import dotenv from "dotenv";
import connectDatabase from "./db/db.js";
import User from "./models/User.js";
import bcrypt from "bcrypt";

if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: ".env.production" });
} else {
  dotenv.config({ path: ".env.development" });
}

const AdminRegister = async () => {
  try {
    await connectDatabase(); // make sure to await DB connection
    const hashedPassword = await bcrypt.hash("Satinder@123", 10);

    const newAdmin = new User({
      name: "Satinder Singh Sall",
      email: "satindersinghsall111@gmail.com",
      password: hashedPassword,
      role: "Admin",
    });

    await newAdmin.save();
    console.log("✅ Admin registered successfully!");
    process.exit(0); // exit script when done
  } catch (error) {
    console.log("Error while registering an Admin.");
    console.error(error);
    process.exit(1);
  }
};

AdminRegister();
