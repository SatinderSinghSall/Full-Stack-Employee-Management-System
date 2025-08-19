import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Pencil, Loader2 } from "lucide-react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const EditDepartment = () => {
  const { id } = useParams();
  const [department, setDepartment] = useState({
    department_name: "",
    description: "",
  });
  const [depLoading, setDepLoading] = useState(false); // page loading
  const [saving, setSaving] = useState(false); // ⬅️ button loading
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartment = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          const dep = response.data.department;
          setDepartment({
            department_name: dep.Department_Name || "",
            description: dep.Description || "",
          });
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          toast.error(error.response.data.error);
        }
      } finally {
        setDepLoading(false);
      }
    };

    fetchDepartment();
  }, [id]);

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

    setSaving(true);
    try {
      const payload = {
        department_name: department.department_name,
        description: department.description,
      };

      const response = await axios.put(
        `${API_BASE_URL}/api/department/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Department updated successfully!");
        navigate("/admin-dashboard/departments");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        toast.error(error.response.data.error);
      } else {
        toast.error(
          error.message || "An error occurred while updating the department."
        );
      }
    } finally {
      setSaving(false);
    }
  };

  if (depLoading) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 text-gray-600">
        <Loader2 className="animate-spin h-10 w-10 text-teal-500 mb-3" />
        <p className="text-base font-medium">Fetching department data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Edit Department</h2>
        <p className="text-gray-500 mt-1">
          Update the details below and save your changes.
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
            value={department.department_name}
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
            value={department.description}
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
          disabled={saving}
          className={`w-full flex items-center justify-center gap-2 ${
            saving
              ? "bg-teal-400 cursor-not-allowed"
              : "bg-teal-600 hover:bg-teal-700"
          } text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5`}
        >
          {saving ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Saving...
            </>
          ) : (
            <>
              <Pencil size={20} />
              Save Changes
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default EditDepartment;
