import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";

const AvitoProfile = lazy(() => import("../pages/avito/AvitoProfile"));

const ProfileRoutes = () => (
  <Suspense fallback={<div>Загрузка профиля...</div>}>
    <Routes>
      <Route
        path="/profile/*"
        element={
          <ProtectedRoute>
            <AvitoProfile />
          </ProtectedRoute>
        }
      />
    </Routes>
  </Suspense>
);

export default ProfileRoutes;
