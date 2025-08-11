import { useAuth } from "../context/AuthContext.jsx";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-100 animate-fadeIn">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-teal-500 border-t-transparent rounded-full animate-spin drop-shadow-lg"></div>
          <div className="absolute inset-1 border-4 border-teal-300 border-b-transparent rounded-full animate-[spin_1.5s_linear_infinite_reverse]"></div>
        </div>

        <p className="mt-5 text-lg font-semibold text-teal-700 animate-pulse">
          Loading your experience...
        </p>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoutes;
