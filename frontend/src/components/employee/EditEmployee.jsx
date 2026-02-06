import { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Pencil, Loader2, Eye, EyeOff } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    employeeId: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    designation: "",
    department: "",
    salary: "",
    password: "",
    image: null,
  });

  /* ================= FETCH DEPARTMENTS ================= */
  useEffect(() => {
    fetchDepartments().then(setDepartments);
  }, []);

  /* ================= FETCH EMPLOYEE ================= */
  useEffect(() => {
    const fetchEmployee = async () => {
      const res = await axios.get(`${API_BASE_URL}/api/employee/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const emp = res.data.employee;

      setFormData((prev) => ({
        ...prev,
        name: emp.userId.name || "",
        email: emp.userId.email || "",
        role: emp.userId.role || "",
        employeeId: emp.employeeId || "",
        dob: emp.dob?.split("T")[0] || "",
        gender: emp.gender || "",
        maritalStatus: emp.maritalStatus || "",
        designation: emp.designation || "",
        department: emp.department?._id || "",
        salary: emp.salary || "",
      }));
    };

    fetchEmployee();
  }, [id]);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData((p) => ({ ...p, image: files[0] }));
    } else {
      setFormData((p) => ({ ...p, [name]: value }));
    }
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();

    Object.entries(formData).forEach(([k, v]) => {
      if (k === "password" && !v) return;
      if (k === "image" && !v) return;

      data.append(k, v);
    });

    try {
      await axios.put(`${API_BASE_URL}/api/employee/${id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast.success("Employee updated successfully!");
      navigate("/admin-dashboard/employees");
    } catch (err) {
      toast.error(err.response?.data?.error || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const input =
    "mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500";

  return (
    <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-3xl font-bold text-gray-800">Edit Employee</h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            label="Employee ID"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
          />
          <Input
            label="Designation"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
          />
          <Input
            label="Salary"
            name="salary"
            type="number"
            value={formData.salary}
            onChange={handleChange}
          />
          <Input
            label="Date of Birth"
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
          />

          <Select
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            options={["male", "female", "other"]}
          />
          <Select
            label="Marital Status"
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleChange}
            options={["single", "married"]}
          />
          <Select
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            options={["Admin", "Employee"]}
          />

          {/* Password optional */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              New Password (optional)
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={handleChange}
                className={`${input} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Image optional */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Update Image (optional)
            </label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className={input}
            />
          </div>
        </div>

        <button
          disabled={loading}
          className="w-full mt-6 flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-lg"
        >
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Pencil size={18} />
          )}
          Update Employee
        </button>
      </form>
    </div>
  );
};

const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-600">{label}</label>
    <input {...props} className="mt-1 p-3 w-full border rounded-lg" required />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-600">{label}</label>
    <select {...props} className="mt-1 p-3 w-full border rounded-lg">
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  </div>
);

export default EditEmployee;
