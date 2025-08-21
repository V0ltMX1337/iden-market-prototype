import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const AboutPage = lazy(() => import("../pages/AboutPage"));
const AppDownloadPage = lazy(() => import("../pages/AppDownloadPage"));
const ContactsPage = lazy(() => import("../pages/ContactsPage"));
const PrivacyPolicyPage = lazy(() => import("../pages/PrivacyPolicyPage"));
const TermsPage = lazy(() => import("../pages/TermsPage"));
const SitemapPage = lazy(() => import("../pages/SitemapPage"));
const HowToBuyPage = lazy(() => import("../pages/HowToBuyPage"));
const HowToSellPage = lazy(() => import("../pages/HowToSellPage"));
const PricingPage = lazy(() => import("../pages/PricingPage"));
const AdvertisingPage = lazy(() => import("../pages/AdvertisingPage"));
const HelpPage = lazy(() => import("../pages/HelpPage"));
const UnderDevelopmentPage = lazy(() => import("../pages/UnderDevelopmentPage"));

const HomeRoutes = () => (
  <Suspense fallback={<div>Загрузка...</div>}>
    <Routes>
     {/* Информационные страницы */}
      <Route path="about" element={<AboutPage />} />
      <Route path="app-download" element={<AppDownloadPage />} />
      <Route path="contacts" element={<ContactsPage />} />
      <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="terms" element={<TermsPage />} />
      <Route path="sitemap" element={<SitemapPage />} />
      <Route path="how-to-buy" element={<HowToBuyPage />} />
      <Route path="how-to-sell" element={<HowToSellPage />} />
      <Route path="pricing" element={<PricingPage />} />
      <Route path="advertising" element={<AdvertisingPage />} />
      <Route path="help" element={<HelpPage />} />
      <Route path="under-development" element={<UnderDevelopmentPage />} />
    </Routes>
  </Suspense>
);

export default HomeRoutes;