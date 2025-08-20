import { Link } from "react-router-dom";
import { Search, PlusCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { columns, EmployeeButtons } from "../../utils/EmployeeHelper";
import DataTable from "react-data-table-component";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [filteredEmployee, setFilteredEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/api/employee`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          let sno = 1;
          const data = response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            dep_name: emp.department.Department_Name,
            name: emp.userId.name,
            dob: new Date(emp.dob).toLocaleDateString(),
            profileImage: (
              <img
                width={40}
                className="rounded-full object-cover"
                src={
                  emp.userId.profileImage
                    ? `${API_BASE_URL}/${emp.userId.profileImage}`
                    : "/default-avatar.png"
                }
                alt={emp.userId.name}
              />
            ),
            action: <EmployeeButtons Id={emp._id} />,
          }));

          setEmployees(data);
          setFilteredEmployees(data);
        }
      } catch (error) {
        console.log(error.message);
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setEmpLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleFilter = (e) => {
    const value = e.target.value.toLowerCase();
    const records = employees.filter((emp) =>
      emp.name.toLowerCase().includes(value)
    );
    setFilteredEmployees(records);
  };

  const customStyles = {
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "14px",
        backgroundColor: "#f9fafb",
      },
    },
    rows: {
      style: {
        fontSize: "14px",
        minHeight: "60px",
      },
    },
  };

  return (
    <div className="p-6 max-w-9xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-3xl font-bold text-gray-800">Manage Employee</h3>
        <p className="text-gray-500 mt-1">
          Search, add, and manage all company employees here.
        </p>
      </div>

      {/* Search + Add */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-lg shadow">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by employee name"
            className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
            onChange={handleFilter}
          />
        </div>

        <Link
          to="/admin-dashboard/employees/add-employee"
          className="flex items-center gap-2 px-5 py-2 bg-teal-600 rounded-lg text-white font-medium hover:bg-teal-700 transition"
        >
          <PlusCircle size={18} />
          Add an Employee
        </Link>
      </div>

      {/* Table */}
      <div className="mt-5 bg-white p-4 rounded-lg shadow">
        <DataTable
          columns={columns}
          data={filteredEmployee}
          pagination
          customStyles={customStyles}
          progressPending={empLoading}
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
                Fetching employee data...
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

export default EmployeeList;
