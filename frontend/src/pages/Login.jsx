import { useState } from "react";
import axios from "axios";
import { HiExclamationCircle, HiCheckCircle } from "react-icons/hi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email,
        password,
      });
      if (response.data.success) {
        setSuccess("Login successful! Redirecting...");
        toast.success("Login Successful!");
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        if (response.data.user.role === "Admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        toast.error(error.response.data.error);
        setError(error.response.data.error);
      } else {
        toast.error("Internal Server Error: 500");
        setError("Internal Server Error.");
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col items-center h-screen justify-center 
      bg-gradient-to-b from-teal-700 via-teal-500 to-gray-100 space-y-8 px-4"
    >
      <h2 className="font-pacific text-3xl md:text-4xl text-white drop-shadow-lg">
        Employee Management System
      </h2>

      {/* Alerts */}
      {error && (
        <div
          className="flex items-center space-x-3 bg-red-50 border border-red-200 
          text-red-700 px-4 py-3 rounded-lg shadow-md w-full max-w-sm"
        >
          <HiExclamationCircle className="text-red-500 text-xl flex-shrink-0" />
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}

      {success && (
        <div
          className="flex items-center space-x-3 bg-green-50 border border-green-200 
          text-green-700 px-4 py-3 rounded-lg shadow-md w-full max-w-sm"
        >
          <HiCheckCircle className="text-green-500 text-xl flex-shrink-0" />
          <span className="text-sm font-medium">{success}</span>
        </div>
      )}

      {/* Login Card */}
      <div
        className="border shadow-xl hover:shadow-2xl transition-shadow duration-200 
        rounded-2xl p-8 w-full max-w-sm bg-white"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          EmployeeMS Login
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-gray-700 mb-1 font-medium"
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="youremail@gmail.com"
              required
            />
          </div>

          {/* Password with Toggle */}
          <div className="mb-5 relative">
            <label
              htmlFor="password"
              className="block text-gray-700 mb-1 font-medium"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent pr-10"
              placeholder="*****"
              required
            />
            <div
              className="absolute right-3 top-[38px] text-gray-500 cursor-pointer hover:text-teal-600 transition-colors"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </div>
          </div>

          {/* Remember Me + Forgot */}
          <div className="mb-5 flex items-center justify-between text-sm">
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" className="form-checkbox text-teal-600" />
              <span className="ml-2 text-gray-700">Remember me</span>
            </label>
            <a href="#" className="text-teal-600 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={loading} // ⬅ disable when loading
              className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 
              transition-all duration-200 text-white py-2 rounded-lg shadow-md 
              hover:shadow-lg font-medium disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading && (
                <svg
                  className="animate-spin h-5 w-5 text-white"
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
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                  ></path>
                </svg>
              )}
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
