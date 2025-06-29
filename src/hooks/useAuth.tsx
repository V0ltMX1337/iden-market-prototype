import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import type { User } from "../lib/types";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAdmin: () => boolean;
  isModerator: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE = "http://94.156.112.180:7000"; // тот же, что и в storeApi

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/auth/me`, {
        withCredentials: true,
      });
      setUser(res.data);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await axios.post(
        `${API_BASE}/api/auth/login`,
        { email, password },
        { withCredentials: true },
      );
      setUser(res.data);
      return true;
    } catch {
      return false;
    }
  };

  const logout = async () => {
    await axios.post(
      `${API_BASE}/api/auth/logout`,
      {},
      { withCredentials: true },
    );
    setUser(null);
  };

  const isAdmin = () => user?.role === "Администратор";
  const isModerator = () =>
    user?.role === "Модератор" || user?.role === "Администратор";

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, logout, isAdmin, isModerator }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { useAuth };
