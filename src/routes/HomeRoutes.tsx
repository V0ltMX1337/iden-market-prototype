import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const AvitoMain = lazy(() => import("../pages/avito/AvitoMain"));

const HomeRoutes = () => (
  <Suspense fallback={<div>Загрузка...</div>}>
    <Routes>
      <Route path="/" element={<AvitoMain />} />
    </Routes>
  </Suspense>
);

export default HomeRoutes;
