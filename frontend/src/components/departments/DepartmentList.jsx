import { Link } from "react-router-dom";
import { Search, PlusCircle } from "lucide-react";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  const onDepartmentDelete = () => {
    fetchDepartments();
  };

  const fetchDepartments = async () => {
    setDepLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/department`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        let sno = 1;
        const data = response.data.departments.map((dep, index) => ({
          _id: dep._id,
          sno: index + 1,
          department_name: dep.Department_Name,
          action: (
            <DepartmentButtons
              Id={dep._id}
              onDepartmentDelete={onDepartmentDelete}
            />
          ),
        }));
        setDepartments(data);
        setFilteredDepartments(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setDepLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const filterDepartments = (e) => {
    const records = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredDepartments(records);
  };

  return (
    <div className="p-6 max-w-9xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-3xl font-bold text-gray-800">Manage Departments</h3>
        <p className="text-gray-500 mt-1">
          Search, add, and manage all company departments here.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-lg shadow">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by department name"
            className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
          />
        </div>

        <Link
          to="/admin-dashboard/add-department"
          className="flex items-center gap-2 px-5 py-2 bg-teal-600 rounded-lg text-white font-medium hover:bg-teal-700 transition"
        >
          <PlusCircle size={18} />
          Add Department
        </Link>
      </div>

      <div className="mt-5">
        <DataTable
          columns={columns}
          data={filteredDepartments}
          pagination
          progressPending={depLoading}
          progressComponent={
            <div className="flex flex-col items-center justify-center py-16 text-gray-700">
              <svg
                className="animate-spin h-15 w-15 text-teal-500 mb-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              <p className="text-lg font-semibold tracking-wide">
                Fetching department data...
              </p>
              <p className="text-md text-gray-400 mt-1">
                Please wait a moment, loading.
              </p>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default Department;
