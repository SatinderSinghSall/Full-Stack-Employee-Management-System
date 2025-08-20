import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Trash2, Edit } from "lucide-react";
import { ConfirmModal } from "../components/ConfirmModal.jsx";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const columns = [
  { name: "S.No", selector: (row) => row.sno },
  {
    name: "Department Name",
    selector: (row) => row.department_name,
    sortable: true,
  },
  { name: "Action", selector: (row) => row.action },
];

export const DepartmentButtons = ({ Id, onDepartmentDelete }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const { data } = await axios.delete(
        `${API_BASE_URL}/api/department/${Id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (data.success) {
        onDepartmentDelete(Id);
      } else {
        alert(data.error || "Failed to delete");
      }
    } catch (error) {
      alert(error.response?.data?.error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex gap-2">
        <button
          onClick={() => navigate(`/admin-dashboard/departments/edit/${Id}`)}
          className="flex items-center gap-1 px-3 py-1 bg-teal-600 text-white rounded hover:bg-teal-700 transition"
        >
          <Edit size={16} /> Edit
        </button>
        <button
          onClick={() => setModalOpen(true)}
          disabled={loading}
          className={`flex items-center gap-1 px-3 py-1 rounded text-white transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          <Trash2 size={16} /> {loading ? "Deleting..." : "Delete"}
        </button>
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Department"
        message="Are you sure you want to delete this department? This action cannot be undone."
      />
    </>
  );
};
