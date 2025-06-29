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

  // Проверяем авторизацию из cookies при загрузке
  useEffect(() => {
    const userCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("trivo_user="));

    if (userCookie) {
      try {
        const userData = JSON.parse(
          decodeURIComponent(userCookie.split("=")[1]),
        );
        // Проверяем пользователя в store
        const storeUser = store.getUserByEmail(userData.email);
        if (storeUser && storeUser.status === "active") {
          setUser(storeUser);
        } else {
          // Если пользователь не найден или заблокирован, очищаем cookie
          logout();
        }
      } catch {
        logout();
      }
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    const foundUser = store.getUserByEmail(email);

    if (
      foundUser &&
      foundUser.password === password &&
      foundUser.status === "active"
    ) {
      setUser(foundUser);
      // Сохраняем в cookies
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

  const isAdmin = (): boolean => {
    return user?.role === "Администратор";
  };

  const isModerator = (): boolean => {
    return user?.role === "Модератор" || user?.role === "Администратор";
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAdmin,
    isModerator,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
