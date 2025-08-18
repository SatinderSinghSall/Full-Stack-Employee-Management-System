const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import axios from "axios";

export const fetchDepartments = async () => {
  let departments;

  try {
    const response = await axios.get(`${API_BASE_URL}/api/department`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.data.success) {
      departments = response.data.departments;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }

  return departments;
};
