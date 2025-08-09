import { useAuth } from "../../context/AuthContext.jsx";
import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex items-center justify-between h-16 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 shadow">
      {/* Welcome Text */}
      <p className="text-white text-lg font-semibold">
        Welcome, <span className="font-bold">{user.name}</span>
      </p>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
      >
        <FiLogOut className="text-lg" />
        <span className="font-medium">Logout</span>
      </button>
    </div>
  );
};

export default Navbar;
