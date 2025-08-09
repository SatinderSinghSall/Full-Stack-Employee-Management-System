import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Hello, Admin {user && user.name}</p>
    </div>
  );
};

export default AdminDashboard;
