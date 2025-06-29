// hooks/useAuth.ts
import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { store, User } from "@/lib/store";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAdmin: () => boolean;
  isModerator: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // 🔧 добавлено

  useEffect(() => {
    const userCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("trivo_user="));

    if (userCookie) {
      try {
        const userData = JSON.parse(decodeURIComponent(userCookie.split("=")[1]));
        const storeUser = store.getUserByEmail(userData.email);
        if (storeUser && storeUser.status === "active") {
          setUser(storeUser);
        } else {
          logout();
        }
      } catch {
        logout();
      }
    }
    setIsLoading(false); // 🔧 обязательно после всех проверок
  }, []);

  const login = (email: string, password: string): boolean => {
    const foundUser = store.getUserByEmail(email);

    if (
      foundUser &&
      foundUser.password === password &&
      foundUser.status === "active"
    ) {
      setUser(foundUser);
      const userData = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role,
      };
      document.cookie = `trivo_user=${encodeURIComponent(JSON.stringify(userData))}; path=/; max-age=86400`;
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    document.cookie =
      "trivo_user=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  };

  const isAdmin = (): boolean => user?.role === "Администратор";
  const isModerator = (): boolean => user?.role === "Модератор" || user?.role === "Администратор";

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    isAdmin,
    isModerator,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
