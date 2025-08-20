import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "70px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    grow: 1,
  },
  {
    name: "Image",
    selector: (row) => row.profileImage,
    width: "80px",
  },
  {
    name: "Department",
    selector: (row) => (
      <span className="truncate block max-w-xs">{row.dep_name}</span>
    ),
    grow: 2, // ✅ flexible width
    sortable: true,
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable: true,
    width: "130px",
  },
  {
    name: "Action",
    cell: (row) => row.action,
    style: { justifyContent: "center" },
    minWidth: "280px",
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

export const fetchDepartments = async () => {
  let departments;
  try {
    const response = await axios.get(`${API_BASE_URL}/api/department`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.data.success) {
      departments = response.data.departments;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return departments;
};

export const getEmployees = async (id) => {
  let employees;
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/employee/department/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.data.success) {
      employees = response.data.employees;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return employees;
};

export const EmployeeButtons = ({ Id }) => {
  const navigate = useNavigate();
  const btn =
    "inline-flex items-center justify-center whitespace-nowrap " +
    "px-3 py-1 rounded-lg text-white text-sm shadow transition";

  return (
    <div className="flex items-center gap-2 whitespace-nowrap">
      <button
        className={`${btn} bg-teal-600 hover:bg-teal-700`}
        onClick={() => navigate(`/admin-dashboard/employees/${Id}`)}
      >
        View
      </button>
      <button
        className={`${btn} bg-blue-600 hover:bg-blue-700`}
        onClick={() => navigate(`/admin-dashboard/employees/edit/${Id}`)}
      >
        Edit
      </button>
      <button
        className={`${btn} bg-yellow-600 hover:bg-yellow-700`}
        onClick={() => navigate(`/admin-dashboard/employees/salary/${Id}`)}
      >
        Salary
      </button>
      <button
        className={`${btn} bg-red-600 hover:bg-red-700`}
        onClick={() => navigate(`/admin-dashboard/employees/leaves/${Id}`)}
      >
        Leave
      </button>
    </div>
  );
};
