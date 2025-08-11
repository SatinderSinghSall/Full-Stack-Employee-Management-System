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
        <DataTable columns={columns} data={filteredDepartments} pagination />
      </div>
    </div>
  );
};

export default Department;
