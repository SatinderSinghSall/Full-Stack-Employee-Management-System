import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div>
        <h1>Loading...Please Wait...</h1>
      </div>
    );
  }

  if (!user) {
    navigate("/login");
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Hello, Admin {user && user.name}</p>
    </div>
  );
};

export default AdminDashboard;
