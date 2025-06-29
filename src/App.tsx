import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import MarketplaceCategory from "./pages/marketplace/MarketplaceCategory";
import ProductPage from "./pages/marketplace/ProductPage";
import Login from "./pages/index/Login";
import Help from "./pages/index/Help";
import Register from "./pages/index/Register";
import Profile from "./pages/index/Profile";
import NotFound from "./pages/NotFound";
import SellerPage from "@/pages/seller/SellerPage";
import SellerProfile from "@/pages/seller/SellerProfile";
import PartnerLogin from "@/pages/partner/PartnerLogin";
import PartnerRegister from "@/pages/partner/PartnerRegister";
import PartnerDashboard from "@/pages/partner/PartnerDashboard";
import PartnerOverview from "@/components/partner/PartnerOverview";
import PartnerProducts from "@/components/partner/PartnerProducts";
import PartnerOrders from "@/components/partner/PartnerOrders";
import PartnerAnalytics from "@/components/partner/PartnerAnalytics";
import PartnerFinance from "@/components/partner/PartnerFinance";
import Cart from "@/pages/index/Cart";
import PartnerGPT from "@/components/partner/PartnerGPT";
import Index from "./pages/index/Index";
import ProductPageAR from "./pages/marketplace/ProductPageAR";
import AvitoMain from "./pages/avito/AvitoMain";
import AvitoLogin from "./pages/avito/AvitoLogin";
import AvitoRegister from "./pages/avito/AvitoRegister";
import AvitoProfile from "./pages/avito/AvitoProfile";
import AvitoProduct from "./pages/avito/AvitoProduct";
import AvitoSell from "./components/avito/profile/AvitoSell";
import AvitoAdmin from "./pages/avito/AvitoAdmin";
import PvzDashboard from "./pages/pvzturbo/PvzDashboard";
import PvzOrders from "./components/pvzturbo/pvz/PvzOrders";
import PvzOrderIssuance from "./components/pvzturbo/pvz/PvzOrderIssuance";
import PvzOrderIssuanceDetails from "./components/pvzturbo/pvz/PvzOrderIssuanceDetails";
import PvzReturnsPackagingPage from "./components/pvzturbo/pvz/PvzReturnsPackagingPage";
import PvzShipmentReceipt from "./components/pvzturbo/pvz/PvzShipmentReceipt";
import PvzWarehouseManagement from "./components/pvzturbo/pvz/PvzWarehouseManagement";
import PvzPlaceOrders from "./components/pvzturbo/pvz/PvzPlaceOrders";
import PvzSupportChat from "./components/pvzturbo/pvz/PvzSupportChat";
import PvzTrainingPage from "./components/pvzturbo/pvz/PvzTrainingPage";
import PvzTrainingCoursePage from "./components/pvzturbo/pvz/PvzTrainingCoursePage";
import PvzOwnerDashboard from "./pages/pvzturboowner/PvzOwnerDashboard";
import PvzOwnerTrainingCoursePage from "./components/pvzturbo/pvzowner/PvzOwnerTrainingCoursePage";
import PvzOwnerTrainingPage from "./components/pvzturbo/pvzowner/PvzOwnerTrainingPage";
import PvzOwnerSupportChat from "./components/pvzturbo/pvzowner/PvzOwnerSupportChat";
import PvzOwnerAnalytics from "./components/pvzturbo/pvzowner/PvzOwnerAnalytics";
import PvzOwnerListPvz from "./components/pvzturbo/pvzowner/PvzOwnerListPvz";
import PvzOwnerManagementPage from "./components/pvzturbo/pvzowner/PvzOwnerManagementPage";
import PvzOwnerCreateStaff from "./components/pvzturbo/pvzowner/PvzOwnerCreateStaff";
import PvzOwnerEditStaff from "./components/pvzturbo/pvzowner/PvzOwnerEditStaff";
import PvzAdminCreateWizard from "./components/pvzturbo/pvzowner/PvzAdminCreateWizard";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/help" element={<Help />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile/*" element={<Profile />} />
              <Route
                path="/marketplace/category/:category"
                element={<MarketplaceCategory />}
              />
              <Route
                path="/marketplace/product/:productId"
                element={<ProductPage />}
              />
              <Route
                path="/marketplace/product/ar/:productId"
                element={<ProductPageAR />}
              />
              <Route path="/seller/:sellerId" element={<SellerPage />} />
              <Route path="/partner/login" element={<PartnerLogin />} />
              <Route path="/partner/register" element={<PartnerRegister />} />

              <Route path="/partner" element={<PartnerDashboard />}>
                <Route index element={<PartnerOverview />} />
                <Route path="/partner/overview" element={<PartnerOverview />} />
                <Route path="/partner/profile" element={<SellerProfile />} />
                <Route path="/partner/products" element={<PartnerProducts />} />
                <Route path="/partner/orders" element={<PartnerOrders />} />
                <Route path="/partner/gpt" element={<PartnerGPT />} />
                <Route
                  path="/partner/analytics"
                  element={<PartnerAnalytics />}
                />
                <Route path="/partner/finance" element={<PartnerFinance />} />
              </Route>

              <Route path="/avito" element={<AvitoMain />} />
              <Route path="/avito/login" element={<AvitoLogin />} />
              <Route path="/avito/register" element={<AvitoRegister />} />

              {/* Защищенные маршруты профиля */}
              <Route
                path="/avito/profile"
                element={
                  <ProtectedRoute>
                    <AvitoProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/avito/profile/*"
                element={
                  <ProtectedRoute>
                    <AvitoProfile />
                  </ProtectedRoute>
                }
              />

              {/* Защищенные админ маршруты */}
              <Route
                path="/avito/admin"
                element={
                  <ProtectedRoute requireAdmin>
                    <AvitoAdmin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/avito/admin/*"
                element={
                  <ProtectedRoute requireAdmin>
                    <AvitoAdmin />
                  </ProtectedRoute>
                }
              />

              <Route path="/pvzturbo" element={<PvzDashboard />}>
                <Route index element={<PvzOrders />} />
                <Route path="/pvzturbo/overview" element={<PvzOrders />} />
                <Route
                  path="/pvzturbo/order-issuance"
                  element={<PvzOrderIssuance />}
                />
                <Route
                  path="/pvzturbo/order-issuance/:barcode"
                  element={<PvzOrderIssuanceDetails />}
                />
                <Route
                  path="/pvzturbo/order-issuance/returns-packaging/:barcode"
                  element={<PvzReturnsPackagingPage />}
                />
                <Route
                  path="/pvzturbo/shipment-receipt"
                  element={<PvzShipmentReceipt />}
                />
                <Route
                  path="/pvzturbo/returns-from-client"
                  element={<PvzOrders />}
                />
                <Route
                  path="/pvzturbo/returns-from-seller"
                  element={<PvzOrders />}
                />
                <Route
                  path="/pvzturbo/sklad"
                  element={<PvzWarehouseManagement />}
                />
                <Route
                  path="/pvzturbo/order-place"
                  element={<PvzPlaceOrders />}
                />
                <Route
                  path="/pvzturbo/training"
                  element={<PvzTrainingPage />}
                />
                <Route
                  path="/pvzturbo/training/:courseId"
                  element={<PvzTrainingCoursePage />}
                />
                <Route path="/pvzturbo/support" element={<PvzSupportChat />} />
              </Route>

              <Route path="/pvzturboowner" element={<PvzOwnerDashboard />}>
                <Route index element={<PvzOwnerAnalytics />} />
                <Route
                  path="/pvzturboowner/overview"
                  element={<PvzOwnerAnalytics />}
                />
                <Route
                  path="/pvzturboowner/overview/:pvz"
                  element={<PvzOwnerManagementPage />}
                />
                <Route
                  path="/pvzturboowner/staff/overview/:id"
                  element={<PvzOwnerEditStaff />}
                />
                <Route
                  path="/pvzturboowner/staff/create/"
                  element={<PvzOwnerCreateStaff />}
                />
                <Route
                  path="/pvzturboowner/points"
                  element={<PvzOwnerListPvz />}
                />
                <Route
                  path="/pvzturboowner/point/create"
                  element={<PvzAdminCreateWizard />}
                />
                <Route
                  path="/pvzturboowner/sklad"
                  element={<PvzWarehouseManagement />}
                />
                <Route
                  path="/pvzturboowner/training"
                  element={<PvzOwnerTrainingCoursePage />}
                />
                <Route
                  path="/pvzturboowner/training/:courseId"
                  element={<PvzOwnerTrainingPage />}
                />
                <Route
                  path="/pvzturboowner/support"
                  element={<PvzOwnerSupportChat />}
                />
              </Route>

              {/* Avito Routes */}
              <Route path="/avito" element={<AvitoMain />} />
              <Route path="/avito/login" element={<AvitoLogin />} />
              <Route path="/avito/register" element={<AvitoRegister />} />
              <Route path="/avito/product/:id" element={<AvitoProduct />} />
              <Route
                path="/avito/profile/*"
                element={
                  <ProtectedRoute>
                    <AvitoProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/avito/admin"
                element={
                  <ProtectedRoute requireAdmin>
                    <AvitoAdmin />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
