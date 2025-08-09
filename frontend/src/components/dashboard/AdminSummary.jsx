import React, { useEffect, useState } from "react";
import SummaryCard from "./SummaryCard";
import {
  FaBuilding,
  FaCheckCircle,
  FaFileAlt,
  FaHourglassHalf,
  FaMoneyBillWave,
  FaTimesCircle,
  FaUsers,
} from "react-icons/fa";
import axios from "axios";

const AdminSummary = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const API_BASE_URL = "http://localhost:5000";

        const { data } = await axios.get(
          `${API_BASE_URL}/api/dashboard/summary`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setSummary(data);
      } catch (error) {
        console.error(error.message);
        setSummary({
          totalEmployees: 0,
          totalDepartments: 0,
          totalSalary: 0,
          leaveSummary: { appliedFor: 0, approved: 0, pending: 0, rejected: 0 },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-lg font-semibold animate-pulse">
        Loading...
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500 font-semibold">
        Failed to load dashboard data.
      </div>
    );
  }

  const { leaveSummary = {} } = summary;

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold text-gray-800">Dashboard Overview</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <SummaryCard
          icon={<FaUsers />}
          text="Total Employees"
          number={summary.totalEmployees || 0}
          color="bg-gradient-to-r from-teal-500 to-teal-700"
        />
        <SummaryCard
          icon={<FaBuilding />}
          text="Total Departments"
          number={summary.totalDepartments || 0}
          color="bg-gradient-to-r from-yellow-500 to-yellow-700"
        />
        <SummaryCard
          icon={<FaMoneyBillWave />}
          text="Monthly Salary"
          number={`₹${(summary.totalSalary || 0).toLocaleString("en-IN")}`}
          color="bg-gradient-to-r from-red-500 to-red-700"
        />
      </div>

      <div className="mt-12">
        <h4 className="text-center text-2xl font-bold text-gray-800">
          Leave Details
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          <SummaryCard
            icon={<FaFileAlt />}
            text="Leave Applied"
            number={leaveSummary.appliedFor || 0}
            color="bg-gradient-to-r from-teal-500 to-teal-700"
          />
          <SummaryCard
            icon={<FaCheckCircle />}
            text="Leave Approved"
            number={leaveSummary.approved || 0}
            color="bg-gradient-to-r from-green-500 to-green-700"
          />
          <SummaryCard
            icon={<FaHourglassHalf />}
            text="Leave Pending"
            number={leaveSummary.pending || 0}
            color="bg-gradient-to-r from-yellow-500 to-yellow-700"
          />
          <SummaryCard
            icon={<FaTimesCircle />}
            text="Leave Rejected"
            number={leaveSummary.rejected || 0}
            color="bg-gradient-to-r from-red-500 to-red-700"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
