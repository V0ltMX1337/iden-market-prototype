import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserRole, type User } from "../lib/types";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<"success" | "waiting" | "error">;
  logout: () => void;
  isAdmin: () => boolean;
  isModerator: () => boolean;
  checkPendingLoginStatus: (userId?: string) => Promise<boolean>;
}

axios.defaults.baseURL = "https://api.trivoads.ru";

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const API_BASE = "https://api.trivoads.ru";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const saveToken = (token: string) => localStorage.setItem("accessToken", token);
  const getToken = () => localStorage.getItem("accessToken");
  const removeToken = () => localStorage.removeItem("accessToken");

  useEffect(() => {
    const interceptor = axios.interceptors.request.use((config) => {
      const token = getToken();
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
    return () => axios.interceptors.request.eject(interceptor);
  }, []);

  const fetchUser = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/api/auth/me`);
      setUser(res.data);
    } catch {
      setUser(null);
      removeToken();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = getToken();
    if (token) fetchUser();
    else setIsLoading(false);
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<"success" | "waiting" | "error"> => {
    try {
      const res = await axios.post(
        `${API_BASE}/api/auth/login`,
        { email, password },
        {
          validateStatus: (status) => [200, 202, 401].includes(status),
        }
      );

      if (
        res.status === 202 &&
        res.data.status === "waiting_for_telegram_approval" &&
        res.data.userId
      ) {
        localStorage.setItem("loginUserId", res.data.userId);
        return "waiting";
      }

      if (res.status === 200 && res.data.accessToken && res.data.user) {
        saveToken(res.data.accessToken);
        setUser(res.data.user);
        return "success";
      }

      return "error";
    } catch {
      return "error";
    }
  };

  const checkPendingLoginStatus = async (userId?: string): Promise<boolean> => {
  if (!userId) {
    userId = localStorage.getItem("loginUserId") || "";
    if (!userId) return false;
  }
    try {
      const res = await axios.get(`${API_BASE}/api/auth/login/status`, {
        params: { userId },
        validateStatus: (status) => [200, 204, 404].includes(status),
      });

      if (res.status === 200 && res.data.accessToken && res.data.user) {
        saveToken(res.data.accessToken);
        setUser(res.data.user);
        localStorage.removeItem("loginUserId");
        return true;
      }

      return false;
    } catch {
      return false;
    }
  };

  const logout = () => {
    removeToken();
    localStorage.removeItem("loginUserId");
    setUser(null);
  };

  const isAdmin = () => user?.role === UserRole.ADMINISTRATOR;
  const isModerator = () =>
    user?.role === UserRole.MODERATOR || user?.role === UserRole.ADMINISTRATOR;

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAdmin,
        isModerator,
        checkPendingLoginStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
