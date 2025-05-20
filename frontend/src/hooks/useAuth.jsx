import { createContext, useContext, useState } from "react";
import api from "../api"; // Axios instance

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  const login = async ({ email, password }) => {
    try {
      const res = await api.post("/auth/login", { email, password });

      if (res.data.token) {
        console.log("✅ Token received:", res.data.token);
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);

        api.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;

        try {
          const profileRes = await api.get("/profile/details");
          console.log("✅ Profile response:", profileRes.data);

          localStorage.setItem("user", JSON.stringify(profileRes.data));
          setUser(profileRes.data);
          setIsLoggedIn(true);

          return { success: true };
        } catch (profileError) {
          console.error("❌ Failed to fetch profile:", profileError);
          return { success: false, error: "Failed to fetch profile data" };
        }
      } else {
        console.warn("⚠️ No token in response");
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
    localStorage.removeItem("user");
    setToken("");
    setUser(null);
    setIsLoggedIn(false);
    delete api.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}