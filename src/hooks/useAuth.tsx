import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserRole, type User } from "../lib/types";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: () => boolean;
  isModerator: () => boolean;
}

axios.defaults.baseURL = "https://api.trivoads.ru";
axios.defaults.headers.post["Content-Type"] = "application/json";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE = "https://api.trivoads.ru";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Сохраняем токен в localStorage
  const saveToken = (token: string) => {
    localStorage.setItem("accessToken", token);
  };

  const getToken = () => {
    return localStorage.getItem("accessToken");
  };

  const removeToken = () => {
    localStorage.removeItem("accessToken");
  };

  // Настраиваем axios interceptor для подстановки токена в каждый запрос
  useEffect(() => {
    const interceptor = axios.interceptors.request.use((config) => {
      const token = getToken();
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return () => {
      axios.interceptors.request.eject(interceptor);
    };
  }, []);

  const fetchUser = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/api/auth/me`);
      setUser(res.data);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      fetchUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await axios.post(`${API_BASE}/api/auth/login`, { email, password }, {
        headers: { "Content-Type": "application/json" },
      });
      const { accessToken, user } = res.data;
      saveToken(accessToken);
      setUser(user);
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

const isAdmin = () => user?.role === UserRole.ADMINISTRATOR;
const isModerator = () =>
  user?.role === UserRole.MODERATOR || user?.role === UserRole.ADMINISTRATOR;

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, isAdmin, isModerator }}>
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
