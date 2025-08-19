import axios from "axios";
import { PlusCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AddDepartment = () => {
  const navigate = useNavigate();

  const [department, setDepartment] = useState({
    department_name: "",
    description: "",
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false); // ⬅️ loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
    setValidationErrors({ ...validationErrors, [name]: "" });
  };

  const validateForm = () => {
    let errors = {};

    if (!department.department_name.trim()) {
      errors.department_name = "Department name is required.";
    } else if (department.department_name.trim().length < 3) {
      errors.department_name = "Department name must be at least 3 characters.";
    }

    if (
      department.description.trim() &&
      department.description.trim().length < 10
    ) {
      errors.description =
        "Description must be at least 10 characters if provided.";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_BASE_URL}/api/department/add`,
        department,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Department Added Successfully!");
        navigate("/admin-dashboard/departments");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        toast.error(error.response.data.error);
      } else {
        toast.error(
          error.message || "An error occurred while adding the department."
        );
      }
      console.error("Error while adding a department:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Add New Department</h2>
        <p className="text-gray-500 mt-1">
          Fill in the details below to create a new department.
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="department_name"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Department Name
          </label>
          <input
            type="text"
            id="department_name"
            name="department_name"
            placeholder="Enter the department name"
            className={`w-full px-4 py-3 border ${
              validationErrors.department_name
                ? "border-red-500"
                : "border-gray-200"
            } rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition shadow-sm`}
            onChange={handleChange}
          />
          {validationErrors.department_name && (
            <p className="text-red-500 text-sm mt-1">
              {validationErrors.department_name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Write a brief description..."
            rows="4"
            className={`w-full px-4 py-3 border ${
              validationErrors.description
                ? "border-red-500"
                : "border-gray-200"
            } rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition shadow-sm resize-none`}
            onChange={handleChange}
          />
          {validationErrors.description && (
            <p className="text-red-500 text-sm mt-1">
              {validationErrors.description}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 ${
            loading
              ? "bg-teal-400 cursor-not-allowed"
              : "bg-teal-600 hover:bg-teal-700"
          } text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5`}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Adding...
            </>
          ) : (
            <>
              <PlusCircle size={20} />
              Add Department
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddDepartment;
