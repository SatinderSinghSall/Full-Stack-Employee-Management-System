import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ViewEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };

    fetchEmployee();
  }, [id]);

  if (!employee) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-600 text-lg animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-12">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white text-center">
          <h2 className="text-3xl font-semibold">Employee Details</h2>
          <p className="text-sm mt-5 opacity-80">Profile Information</p>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex justify-center">
            <img
              src={`${API_BASE_URL}/${employee.userId.profileImage}`}
              alt={employee.userId.name}
              className="w-40 h-40 rounded-full border-4 border-indigo-500 shadow-md object-cover"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/150?text=No+Image";
              }}
            />
          </div>

          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <p className="text-gray-700 font-semibold w-36">Name:</p>
              <p className="text-gray-900">{employee.userId.name}</p>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-gray-700 font-semibold w-36">Employee ID:</p>
              <p className="text-gray-900">{employee.employeeId}</p>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-gray-700 font-semibold w-36">Date of Birth:</p>
              <p className="text-gray-900">
                {new Date(employee.dob).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-gray-700 font-semibold w-36">Gender:</p>
              <p className="text-gray-900 capitalize">{employee.gender}</p>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-gray-700 font-semibold w-36">Department:</p>
              <p className="text-gray-900">
                {employee.department?.dep_name || "N/A"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-gray-700 font-semibold w-36">
                Marital Status:
              </p>
              <p className="text-gray-900 capitalize">
                {employee.maritalStatus}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEmployee;
