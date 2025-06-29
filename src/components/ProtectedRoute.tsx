import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requireModerator?: boolean;
}

const ProtectedRoute = ({
  children,
  requireAdmin = false,
  requireModerator = false,
}: ProtectedRouteProps) => {
  const { user, isAdmin, isModerator } = useAuth();

  // Если пользователь не авторизован
  if (!user) {
    return <Navigate to="/avito/login" replace />;
  }

  // Если требуются права администратора
  if (requireAdmin && !isAdmin()) {
    return <Navigate to="/avito" replace />;
  }

  // Если требуются права модератора
  if (requireModerator && !isModerator()) {
    return <Navigate to="/avito" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
