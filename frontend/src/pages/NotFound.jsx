import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-[110px] font-extrabold text-gray-800 leading-none">
        404
      </h1>

      <p className="text-xl text-gray-600 mt-2 font-medium">
        Oops! Page not found.
      </p>

      <p className="text-gray-500 mt-1">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition-all duration-200"
      >
        Go Home
      </Link>

      <div className="absolute bottom-4 text-sm text-gray-400">
        Employee Management System
      </div>
    </div>
  );
};

export default NotFound;
