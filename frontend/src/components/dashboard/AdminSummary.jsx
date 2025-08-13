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
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SkeletonCard = () => (
  <div className="bg-white rounded-xl shadow p-6 animate-pulse">
    <div className="h-10 w-10 bg-gray-300 rounded-full mb-4"></div>
    <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
    <div className="h-6 bg-gray-300 rounded w-1/2"></div>
  </div>
);

const AdminSummary = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
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
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          Dashboard Overview
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>

        <h4 className="text-center text-2xl font-bold text-gray-800 mt-12 mb-6">
          Leave Details
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
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
