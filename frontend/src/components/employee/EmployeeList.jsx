import { Link } from "react-router-dom";
import { Search, PlusCircle } from "lucide-react";

const EmployeeList = () => {
  return (
    <div className="p-6 max-w-9xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-3xl font-bold text-gray-800">Manage Employee</h3>
        <p className="text-gray-500 mt-1">
          Search, add, and manage all company employees here.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-lg shadow">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by employee name"
            className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
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

      <div className="mt-5"></div>
    </div>
  );
};

export default EmployeeList;
