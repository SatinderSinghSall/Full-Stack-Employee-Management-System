import Employee from "../models/Employee.js";
import User from "../models/User.js";

import multer from "multer";
import bcrypt from "bcrypt";
import path from "path";

// Storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Get all employee
const getEmployees = async (req, res) => {};

// Add a employee
const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      password,
      role,
    } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, error: "User already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      profileImage: req.file ? req.file.filename : "",
    });
    const savedUser = await newUser.save();

    const newEmployee = new Employee({
      userId: savedUser._id,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
    });
    const saveEmployee = await newEmployee.save();

    return res
      .status(200)
      .json({ success: true, message: "User registered successfully!" });
  } catch (error) {
    console.error("Error while saving an User details.");
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Server Error: Error while saving an User details.",
    });
  }
};

// Get a single employee by ID
const getEmployee = async (req, res) => {};

// Update a employee
const updateEmployee = async (req, res) => {};

// Delete a employee
const deleteEmployee = async (req, res) => {};

export {
  getEmployees,
  upload,
  addEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
};
