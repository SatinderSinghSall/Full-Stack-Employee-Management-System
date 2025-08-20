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
                    : "/default-avatar.png" // ✅ fallback
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

  if (empLoading) {
    return <div className="p-6">Loading...</div>;
  }

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
          to="/admin-dashboard/add-employee"
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
        />
      </div>
    </div>
  );
};

export default EmployeeList;
