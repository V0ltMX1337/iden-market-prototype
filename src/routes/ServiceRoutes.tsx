import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const AvitoProduct = lazy(() => import("../pages/avito/AvitoProduct"));
const AvitoUser = lazy(() => import("../pages/avito/AvitoUser"));
const AvitoCategoryPage = lazy(() => import("../pages/avito/AvitoCategoryPage"));
const AvitoCategoryWithCity = lazy(() => import("../pages/avito/AvitoCategoryWithCity"));
const AvitoAddReview = lazy(() => import("../pages/avito/AvitoAddReview"));

const ServiceRoutes = () => (
  <Suspense fallback={<div>Загрузка...</div>}>
    <Routes>
      <Route path="product/:slug/:id" element={<AvitoProduct />} />
      <Route path="user/:userId" element={<AvitoUser />} />
      <Route path="category/:categoryid/*" element={<AvitoCategoryPage />} />
      <Route path="catalog" element={<AvitoCategoryPage />} />
      <Route path="user/:userId/addReview" element={<AvitoAddReview />} />
    </Routes>
  </Suspense>
);

export default ServiceRoutes;