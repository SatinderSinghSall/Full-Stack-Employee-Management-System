import { NavLink, useNavigate } from "react-router-dom";
import {
  FaBuilding,
  FaCalendarAlt,
  FaCogs,
  FaMoneyBillWave,
  FaRegCalendarAlt,
  FaTachometerAlt,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";
import { AiOutlineFileText } from "react-icons/ai";
import { useAuth } from "../../context/AuthContext.jsx";
import { toast } from "react-toastify";

const menuItems = [
  {
    to: "/admin-dashboard",
    label: "Dashboard",
    icon: <FaTachometerAlt />,
    exact: true,
  },
  { to: "/admin-dashboard/employees", label: "Employee", icon: <FaUsers /> },
  {
    to: "/admin-dashboard/departments",
    label: "Department",
    icon: <FaBuilding />,
  },
  { to: "/admin-dashboard/leaves", label: "Leave", icon: <FaCalendarAlt /> },
  {
    to: "/admin-dashboard/salary/add",
    label: "Salary",
    icon: <FaMoneyBillWave />,
  },
  {
    to: "/admin-dashboard/attendance",
    label: "Attendance",
    icon: <FaRegCalendarAlt />,
  },
  {
    to: "/admin-dashboard/attendance-report",
    label: "Attendance Report",
    icon: <AiOutlineFileText />,
  },
  { to: "/admin-dashboard/setting", label: "Settings", icon: <FaCogs /> },
];

const AdminSidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logout Successful!");
    navigate("/login");
  };

  return (
    <div className="bg-gray-950/95 backdrop-blur-md text-white h-screen fixed left-0 top-0 w-64 shadow-2xl flex flex-col justify-between border-r border-gray-800">
      {/* Top Section */}
      <div>
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 to-green-400 h-16 flex items-center justify-center shadow-md">
          <h3 className="text-2xl font-bold tracking-wide">Employee MS</h3>
        </div>

        {/* Menu */}
        <div className="px-3 py-4 space-y-1 overflow-y-auto custom-scroll">
          {menuItems.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.to}
              end={item.exact || false}
              className={({ isActive }) =>
                `flex items-center gap-4 py-3 px-4 rounded-lg transition-all duration-300 ease-in-out
                ${
                  isActive
                    ? "bg-gradient-to-r from-teal-600 to-green-500 text-white shadow-lg border-l-4 border-white scale-[1.02]"
                    : "text-gray-300 hover:bg-gray-800/80 hover:scale-[1.02] hover:text-white"
                }`
              }
            >
              <span className="text-lg transition-transform duration-300 group-hover:scale-110">
                {item.icon}
              </span>
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>

      {/* Logout Button */}
      <div className="px-3 py-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 flex items-center gap-4 py-3 px-4 rounded-lg text-gray-300 hover:bg-red-700/90 hover:text-white transition-all duration-300 ease-in-out hover:scale-[1.02]"
        >
          <FaSignOutAlt className="text-lg" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
