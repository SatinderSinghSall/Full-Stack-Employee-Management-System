import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/* =================================================
   TABLE COLUMNS
   (added padding + more width for breathing space)
================================================= */

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
    grow: 2,
    sortable: true,
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable: true,
    width: "130px",
  },

  /* ✅ Action column spacing fix */
  {
    name: "Action",
    cell: (row) => row.action,
    minWidth: "460px", // more breathing room
    style: {
      justifyContent: "center",
      paddingLeft: "16px",
      paddingRight: "16px",
    },
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

/* =================================================
   FETCH HELPERS
================================================= */

export const fetchDepartments = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/department`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data.departments;
  } catch (error) {
    alert(error.response?.data?.error);
  }
};

export const getEmployees = async (id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/employee/department/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );

    return response.data.employees;
  } catch (error) {
    alert(error.response?.data?.error);
  }
};

/* =================================================
   ACTION BUTTONS (clean spacing only)
================================================= */

export const EmployeeButtons = ({ Id }) => {
  const navigate = useNavigate();

  const btn =
    "inline-flex items-center justify-center " +
    "px-4 py-1.5 rounded-lg text-white text-sm shadow " +
    "transition hover:shadow-md";

  const handleDelete = async () => {
    if (!window.confirm("Delete this employee?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/employee/${Id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      window.location.reload();
    } catch (error) {
      alert(error.response?.data?.error || "Delete failed");
    }
  };

  return (
    /* ✅ more gap + padding */
    <div className="flex items-center gap-3 px-2 py-1">
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
        className={`${btn} bg-purple-600 hover:bg-purple-700`}
        onClick={() => navigate(`/admin-dashboard/employees/leaves/${Id}`)}
      >
        Leave
      </button>

      <button
        className={`${btn} bg-red-600 hover:bg-red-700`}
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};
