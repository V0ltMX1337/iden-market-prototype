import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";

const AvitoAdmin = lazy(() => import("../pages/avito/AvitoAdmin"));

const ProfileRoutes = () => (
  <Suspense fallback={<div>Загрузка профиля...</div>}>
    <Routes>
      <Route
       path="admin/*"
       element={
         <ProtectedRoute requireAdmin>
           <AvitoAdmin />
         </ProtectedRoute>
       }
     />
    </Routes>
  </Suspense>
);

export default ProfileRoutes;
