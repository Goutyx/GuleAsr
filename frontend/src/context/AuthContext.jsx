import { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { authApi } from "../services/api";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const MOCK_USERS_KEY = "guleasr_mock_users";
const MOCK_SESSION_KEY = "guleasr_mock_session";

const readMockUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(MOCK_USERS_KEY) || "[]");
  } catch {
    return [];
  }
};

const writeMockUsers = (users) => {
  localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = async () => {
    try {
      const { data } = await authApi.me();
      setUser(data);
    } catch {
      const mockSession = localStorage.getItem(MOCK_SESSION_KEY);
      if (mockSession) {
        setUser(JSON.parse(mockSession));
      } else {
        localStorage.removeItem("guleasr_token");
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  const login = async (payload) => {
    try {
      const { data } = await authApi.login(payload);
      localStorage.setItem("guleasr_token", data.token);
      localStorage.removeItem(MOCK_SESSION_KEY);
      setUser(data.user);
    } catch {
      // Local fallback for mock mode when backend DB/auth is unavailable.
      const users = readMockUsers();
      const existing = users.find((item) => item.email.toLowerCase() === payload.email.toLowerCase());
      if (!existing || existing.password !== payload.password) {
        throw new Error("Invalid email or password");
      }
      const sessionUser = { id: existing.id, name: existing.name, email: existing.email, role: existing.role || "user" };
      localStorage.setItem(MOCK_SESSION_KEY, JSON.stringify(sessionUser));
      localStorage.removeItem("guleasr_token");
      setUser(sessionUser);
    }
    toast.success("Welcome back");
  };

  const register = async (payload) => {
    try {
      const { data } = await authApi.register(payload);
      localStorage.setItem("guleasr_token", data.token);
      localStorage.removeItem(MOCK_SESSION_KEY);
      setUser(data.user);
    } catch {
      const users = readMockUsers();
      const emailExists = users.some((item) => item.email.toLowerCase() === payload.email.toLowerCase());
      if (emailExists) {
        throw new Error("Email already in use");
      }
      const newUser = {
        id: `local_${Date.now()}`,
        name: payload.name,
        email: payload.email,
        password: payload.password,
        role: "user",
      };
      const updated = [...users, newUser];
      writeMockUsers(updated);
      const sessionUser = { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role };
      localStorage.setItem(MOCK_SESSION_KEY, JSON.stringify(sessionUser));
      localStorage.removeItem("guleasr_token");
      setUser(sessionUser);
    }
    toast.success("Account created");
  };

  const logout = () => {
    localStorage.removeItem("guleasr_token");
    localStorage.removeItem(MOCK_SESSION_KEY);
    setUser(null);
    toast.success("Signed out");
  };

  const value = useMemo(
    () => ({ user, loading, login, register, logout, isAuthenticated: Boolean(user), isAdmin: user?.role === "admin" }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
