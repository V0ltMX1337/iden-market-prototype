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
          <Route path="/product/:productId" element={<ProductPage />} />
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
