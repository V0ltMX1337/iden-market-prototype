import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const AvitoLogin = lazy(() => import("../pages/avito/AvitoLogin"));
const AvitoRegister = lazy(() => import("../pages/avito/AvitoRegister"));

const AuthRoutes = () => (
  <Suspense fallback={<div>Загрузка...</div>}>
    <Routes>
      <Route path="/login" element={<AvitoLogin />} />
      <Route path="/register" element={<AvitoRegister />} />
    </Routes>
  </Suspense>
);

export default AuthRoutes;
