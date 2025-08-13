import Department from "../models/Department.js";

// Get all departments
const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    return res.status(200).json({ success: true, departments });
  } catch (error) {
    console.error("Error while getting departments:", error);
    return res.status(500).json({
      success: false,
      error: "Server Error: 500 - Get Departments Error.",
    });
  }
};

// Add a department
const addDepartment = async (req, res) => {
  try {
    const { department_name, description } = req.body;

    if (!department_name?.trim()) {
      return res.status(400).json({
        success: false,
        error: "Department name is required.",
      });
    }

    const existingDepartment = await Department.findOne({
      Department_Name: department_name.trim(),
    });

    if (existingDepartment) {
      return res.status(400).json({
        success: false,
        error: "A department with this name already exists.",
      });
    }

    const newDepartment = new Department({
      Department_Name: department_name.trim(),
      Description: description,
    });

    await newDepartment.save();

    return res.status(200).json({
      success: true,
      department: newDepartment,
    });
  } catch (error) {
    console.error("Error while adding a department:", error);
    return res.status(500).json({
      success: false,
      error: "Server Error: 500 - Add Department Error.",
    });
  }
};

// Get a single department by ID
const getDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findById(id);

    if (!department) {
      return res.status(404).json({
        success: false,
        error: "Department not found.",
      });
    }

    return res.status(200).json({ success: true, department });
  } catch (error) {
    console.error("Error while getting a department:", error);
    return res.status(500).json({
      success: false,
      error: "Server Error: 500 - Get Department Error.",
    });
  }
};

// Update a department
const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { department_name, description } = req.body;

    if (!department_name?.trim()) {
      return res.status(400).json({
        success: false,
        error: "Department name is required.",
      });
    }

    const updatedDepartment = await Department.findByIdAndUpdate(
      id,
      {
        Department_Name: department_name.trim(),
        Description: description,
      },
      { new: true }
    );

    if (!updatedDepartment) {
      return res.status(404).json({
        success: false,
        error: "Department not found.",
      });
    }

    return res
      .status(200)
      .json({ success: true, department: updatedDepartment });
  } catch (error) {
    console.error("Error while updating a department:", error);
    return res.status(500).json({
      success: false,
      error: "Server Error: 500 - Update Department Error.",
    });
  }
};

// Delete a department
const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDepartment = await Department.findById(id);

    if (!deletedDepartment) {
      return res.status(404).json({
        success: false,
        error: "Department not found.",
      });
    }

    await deletedDepartment.deleteOne();

    return res
      .status(200)
      .json({ success: true, department: deletedDepartment });
  } catch (error) {
    console.error("Error while deleting a department:", error);
    return res.status(500).json({
      success: false,
      error: "Server Error: 500 - Delete Department Error.",
    });
  }
};

export {
  getDepartments,
  addDepartment,
  getDepartment,
  updateDepartment,
  deleteDepartment,
};
