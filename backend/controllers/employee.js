import Employee from "../models/Employee.js";
import User from "../models/User.js";
import Department from "../models/Department.js";

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

// File filter for images only
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = fileTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Images only!");
    }
  },
});

// ================================
// Get all employees
// ================================
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("userId", { password: 0 })
      .populate("department"); // <-- add this
    return res.status(200).json({ success: true, employees });
  } catch (error) {
    console.error("Error while fetching employees:", error);
    return res.status(500).json({
      success: false,
      error: "Server Error: Error while fetching employees.",
    });
  }
};

// ================================
// Add an employee
// ================================
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

    const userExists = await User.findOne({ email });
    if (userExists) {
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
    await newEmployee.save();

    return res
      .status(201)
      .json({ success: true, message: "Employee registered successfully!" });
  } catch (error) {
    console.error("Error while saving a User and Employee:", error);
    return res.status(500).json({
      success: false,
      error: "Server Error: Error while saving an Employee.",
    });
  }
};

// ================================
// Get a single employee by ID
// ================================
const getEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    let employee = await Employee.findById(id)
      .populate("userId", { password: 0 })
      .populate("department");

    if (!employee) {
      employee = await Employee.findOne({ userId: id })
        .populate("userId", { password: 0 })
        .populate("department");
    }

    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: "Employee not found." });
    }

    return res.status(200).json({ success: true, employee });
  } catch (error) {
    console.error("Error while getting Employee details:", error);
    return res.status(500).json({
      success: false,
      error: "Server Error: Error while getting Employee details.",
    });
  }
};

// ================================
// Update an employee
// ================================
//FIXME : Loading + Data Fetching of Departments.
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, maritalStatus, designation, department, salary } = req.body;

    const employee = await Employee.findById(id);
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: "Employee not found." });
    }

    const user = await User.findById(employee.userId);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found." });
    }

    const updatedUser = await User.findByIdAndUpdate(
      employee.userId,
      {
        name,
        ...(req.file && { profileImage: req.file.filename }),
      },
      { new: true }
    );

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { maritalStatus, designation, salary, department },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Employee updated successfully.",
      employee: updatedEmployee,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error while updating Employee details:", error);
    return res.status(500).json({
      success: false,
      error: "Server Error: Error while updating Employee details.",
    });
  }
};

// ================================
// Delete an employee
// ================================
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: "Employee not found." });
    }

    await User.findByIdAndDelete(employee.userId);
    await Employee.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ success: true, message: "Employee deleted successfully." });
  } catch (error) {
    console.error("Error while deleting Employee:", error);
    return res.status(500).json({
      success: false,
      error: "Server Error: Error while deleting Employee.",
    });
  }
};

// ================================
// Fetch employees by department ID
// ================================
const fetchEmployeesByDepId = async (req, res) => {
  const { id } = req.params;
  try {
    const employees = await Employee.find({ department: id })
      .populate("userId", { password: 0 })
      .populate("department"); // <-- add this
    return res.status(200).json({ success: true, employees });
  } catch (error) {
    console.error("Error while fetching Employees by Department:", error);
    return res.status(500).json({
      success: false,
      error: "Server Error: Error while fetching Employees by Department.",
    });
  }
};

export {
  getEmployees,
  upload,
  addEmployee,
  getEmployee,
  updateEmployee,
  fetchEmployeesByDepId,
  deleteEmployee,
};
