import { createContext, useContext, useState } from "react";
import api from "../api"; // Axios instance

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage?.getItem("token"));

  const login = async ({ email, password }) => {
    try {
      const res = await api.post("/auth/login", { email, password });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        setIsLoggedIn(true);
        return { success: true };
      } else {
        return { success: false, error: "Invalid response from server" };
      }
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || "Login failed",
      };
    }
  };

  const register = async (formData) => {
    try {
      const res = await api.post("/auth/register", formData);
      if (res.status === 201 || res.status === 200) {
        return { success: true };
      } else {
        return { success: false, error: "Registration failed" };
      }
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || "Registration failed",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}