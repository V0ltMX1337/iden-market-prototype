import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import PvzDashboard from "./pages/pvzturbo/PvzDashboard";
import PvzOrders from "./components/pvzturbo/PvzOrders";
import PvzOrderIssuance from "./components/pvzturbo/PvzOrderIssuance";
import PvzOrderIssuanceDetails from "./components/pvzturbo/PvzOrderIssuanceDetails";
import PvzReturnsPackagingPage from "./components/pvzturbo/PvzReturnsPackagingPage";
import PvzShipmentReceipt from "./components/pvzturbo/PvzShipmentReceipt";
import PvzWarehouseManagement from "./components/pvzturbo/PvzWarehouseManagement";
import PvzPlaceOrders from "./components/pvzturbo/PvzPlaceOrders";
import PvzSupportChat from "./components/pvzturbo/PvzSupportChat";
import PvzTrainingPage from "./components/pvzturbo/PvzTrainingPage";
import PvzTrainingCoursePage from "./components/pvzturbo/PvzTrainingCoursePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
          <Route path="/marketplace/product/:productId" element={<ProductPage />} />
          <Route path="/marketplace/product/ar/:productId" element={<ProductPageAR />} />
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
            <Route path="/partner/analytics" element={<PartnerAnalytics />} />
            <Route path="/partner/finance" element={<PartnerFinance />} />
          </Route>
          <Route path="/pvzturbo" element={<PvzDashboard />}>
            <Route index element={<PvzOrders />} />
            <Route path="/pvzturbo/overview" element={<PvzOrders />} />
            <Route path="/pvzturbo/order-issuance" element={<PvzOrderIssuance />} />
            <Route path="/pvzturbo/order-issuance/:barcode" element={<PvzOrderIssuanceDetails  />} />
            <Route path="/pvzturbo/order-issuance/returns-packaging/:barcode" element={<PvzReturnsPackagingPage  />} />
            <Route path="/pvzturbo/shipment-receipt" element={<PvzShipmentReceipt />} />
            <Route path="/pvzturbo/returns-from-client" element={<PvzOrders />} />
            <Route path="/pvzturbo/returns-from-seller" element={<PvzOrders />} />
            <Route path="/pvzturbo/sklad" element={<PvzWarehouseManagement />} />
            <Route path="/pvzturbo/order-place" element={<PvzPlaceOrders />} />
            <Route path="/pvzturbo/training" element={<PvzTrainingPage />} />
            <Route path="/pvzturbo/training/:courseId" element={<PvzTrainingCoursePage />} />
            <Route path="/pvzturbo/support" element={<PvzSupportChat />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
