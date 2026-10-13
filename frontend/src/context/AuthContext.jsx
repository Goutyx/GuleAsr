import { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { authApi } from "../services/api";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = async () => {
    try {
      const { data } = await authApi.me();
      setUser(data);
    } catch {
      localStorage.removeItem("guleasr_token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  const login = async (payload) => {
    const { data } = await authApi.login(payload);
    localStorage.setItem("guleasr_token", data.token);
    setUser(data.user);
    toast.success("Welcome back");
    return data.user;
  };

  const register = async (payload) => {
    const { data } = await authApi.register(payload);
    localStorage.setItem("guleasr_token", data.token);
    setUser(data.user);
    toast.success("Account created");
  };

  const logout = () => {
    localStorage.removeItem("guleasr_token");
    setUser(null);
    toast.success("Signed out");
  };

  // Listen for external logout events (e.g., from API error interceptor on 401)
  useEffect(() => {
    const handleLogout = (event) => {
      logout();
    };
    window.addEventListener("logout", handleLogout);
    return () => window.removeEventListener("logout", handleLogout);
  }, []);

  const value = useMemo(
    () => ({ user, loading, login, register, logout, isAuthenticated: Boolean(user), isAdmin: user?.role === "admin" }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
