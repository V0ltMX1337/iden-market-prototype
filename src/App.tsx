import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { AlertProvider } from "@/contexts/AlertContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import CookieBanner from "@/components/ui/CookieBanner";
import AvitoMain from "./pages/avito/AvitoMain";
import AvitoLogin from "./pages/avito/AvitoLogin";
import AvitoRegister from "./pages/avito/AvitoRegister";
import AvitoProfile from "./pages/avito/AvitoProfile";
import AvitoProduct from "./pages/avito/AvitoProduct";
import AvitoAdmin from "./pages/avito/AvitoAdmin";
import AvitoUser from "./pages/avito/AvitoUser";
import AvitoAddReview from "./pages/avito/AvitoAddReview";
import AvitoCategoryPage from "./pages/avito/AvitoCategoryPage";
import AboutPage from "./pages/AboutPage";
import ContactsPage from "./pages/ContactsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsPage from "./pages/TermsPage";
import SitemapPage from "./pages/SitemapPage";
import HowToBuyPage from "./pages/HowToBuyPage";
import HowToSellPage from "./pages/HowToSellPage";
import PricingPage from "./pages/PricingPage";
import AdvertisingPage from "./pages/AdvertisingPage";
import HelpPage from "./pages/HelpPage";
import UnderDevelopmentPage from "./pages/UnderDevelopmentPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AlertProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
        <Router>
          <CookieBanner />
          <Routes>
            {/* Все маршруты /avito/* с AuthProvider */}
            <Route
              path="/*"
              element={
                <AuthProvider>
                  <Routes>
                    <Route path="/" element={<AvitoMain />} />
                    <Route path="login" element={<AvitoLogin />} />
                    <Route path="register" element={<AvitoRegister />} />
                    <Route path="product/:id" element={<AvitoProduct />} />
                    <Route path="user/:userId" element={<AvitoUser />} />
                    <Route path="category/:categoryid/*" element={<AvitoCategoryPage />} />
                    <Route path="catalog" element={<AvitoCategoryPage />} />
                    <Route
                      path="user/:userId/addReview"
                      element={<AvitoAddReview />}
                    />
                    {/* Информационные страницы */}
                    <Route path="about" element={<AboutPage />} />
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
                    <Route
                      path="profile/*"
                      element={
                        <ProtectedRoute>
                          <AvitoProfile />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="admin/*"
                      element={
                        <ProtectedRoute requireAdmin>
                          <AvitoAdmin />
                        </ProtectedRoute>
                      }
                    />
                  </Routes>
                </AuthProvider>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        </TooltipProvider>
      </AlertProvider>
    </QueryClientProvider>
  );
};

export default App;