import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import AvitoMain from "./pages/avito/AvitoMain";
import AvitoLogin from "./pages/avito/AvitoLogin";
import AvitoRegister from "./pages/avito/AvitoRegister";
import AvitoProfile from "./pages/avito/AvitoProfile";
import AvitoProduct from "./pages/avito/AvitoProduct";
import AvitoAdmin from "./pages/avito/AvitoAdmin";
import AvitoUser from "./pages/avito/AvitoUser";
import AvitoAddReview from "./pages/avito/AvitoAddReview";
import AvitoCategoryPage from "./pages/avito/AvitoCategoryPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
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
                    <Route
                      path="user/:userId/addReview"
                      element={<AvitoAddReview />}
                    />
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
    </QueryClientProvider>
  );
};

export default App;
