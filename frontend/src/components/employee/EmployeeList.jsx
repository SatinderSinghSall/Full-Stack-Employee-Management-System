import { Link } from "react-router-dom";
import { Search, PlusCircle } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { columns, EmployeeButtons } from "../../utils/EmployeeHelper";
import DataTable from "react-data-table-component";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  /** Fetch employees **/
  const fetchEmployees = useCallback(async () => {
    setLoading(true);

    try {
      const res = await axios.get(`${API_BASE_URL}/api/employee`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.data.success) throw new Error(res.data.error);

      let counter = 1;

      const mapped = res.data.employees.map((emp) => ({
        _id: emp._id,
        sno: counter++,
        dep_name: emp?.department?.Department_Name || "N/A",
        name: emp?.userId?.name || "Unknown",
        dob: emp?.dob ? new Date(emp.dob).toLocaleDateString() : "N/A",
        profileImage: (
          <img
            width={40}
            height={40}
            className="rounded-full object-cover"
            src={
              emp?.userId?.profileImage
                ? `${API_BASE_URL}/${emp.userId.profileImage}`
                : "/default-avatar.png"
            }
            alt={emp?.userId?.name || "Employee"}
          />
        ),
        action: <EmployeeButtons Id={emp._id} />,
      }));

      setEmployees(mapped);
      setFilteredEmployees(mapped);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  }, []);

  /** Initial fetch */
  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  /** Debounced search */
  useEffect(() => {
    const delay = setTimeout(() => {
      if (!searchTerm.trim()) {
        setFilteredEmployees(employees);
        return;
      }

      const filtered = employees.filter((emp) =>
        emp?.name?.toLowerCase().includes(searchTerm.toLowerCase()),
      );

      setFilteredEmployees(filtered);
    }, 300);

    return () => clearTimeout(delay);
  }, [searchTerm, employees]);

  const customStyles = {
    headCells: {
      style: { fontWeight: "bold", fontSize: "14px", background: "#f9fafb" },
    },
    rows: {
      style: { fontSize: "14px", minHeight: "60px" },
    },
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-3xl font-extrabold text-gray-800">
          Manage Employees
        </h3>
        <p className="text-gray-500">Search, add, and manage staff members.</p>
      </div>

      {/* Search + Add Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-lg shadow gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search employee name"
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Add button */}
        <Link
          to="/admin-dashboard/employees/add-employee"
          className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-lg font-semibold transition"
        >
          <PlusCircle size={18} />
          Add Employee
        </Link>
      </div>

      {/* Table */}
      <div className="mt-5 bg-white p-4 rounded-lg shadow">
        <DataTable
          columns={columns}
          data={filteredEmployees}
          pagination
          customStyles={customStyles}
          progressPending={loading}
          highlightOnHover
          persistTableHead
          progressComponent={
            <div className="flex flex-col items-center justify-center py-12 text-gray-600">
              <div className="animate-pulse w-12 h-12 rounded-full bg-teal-300"></div>
              <p className="font-medium mt-3">Loading employees...</p>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default EmployeeList;
