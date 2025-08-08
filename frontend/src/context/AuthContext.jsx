import axios from "axios";
import { useContext, useEffect, createContext, useState } from "react";

const UserContext = createContext();

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          const response = await axios.get(
            "http://localhost:5173/api/auth/verify",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        } else {
          setUser(null);
        }
        if (response.data.success) {
          setUser(response.data.user);
        }
      } catch (error) {
        if (error.response && !error.response.data.error) {
          setUser(null);
        }
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, []);

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(UserContext);
};

export default AuthContext;
