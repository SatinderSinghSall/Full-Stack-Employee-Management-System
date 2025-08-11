import mongoose from "mongoose";

const departmentSchema = mongoose.Schema({
  Department_Name: { required: true, type: String },
  Description: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Department = mongoose.model("Department", departmentSchema);

export default Department;
