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
  const { user, isAdmin, isModerator, isLoading } = useAuth();

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!user) {
    return <Navigate to="/avito/login" replace />;
  }

  if (requireAdmin && !isAdmin()) {
    return <Navigate to="/avito" replace />;
  }

  if (requireModerator && !isModerator()) {
    return <Navigate to="/avito" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
