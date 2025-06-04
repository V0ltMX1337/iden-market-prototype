import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MarketplaceCategory from "./pages/marketplace/MarketplaceCategory";
import ProductPage from "./pages/marketplace/ProductPage";
import Login from "./pages/index/Login";
import Register from "./pages/index/Register";
import Profile from "./pages/index/Profile";
import NotFound from "./pages/NotFound";
import SellerPage from "@/pages/seller/SellerPage";
import SellerProfile from "@/pages/seller/SellerProfile";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminRegister from "@/pages/admin/AdminRegister";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminOverview from "@/components/admin/AdminOverview";
import AdminProducts from "@/components/admin/AdminProducts";
import AdminOrders from "@/components/admin/AdminOrders";
import AdminAnalytics from "@/components/admin/AdminAnalytics";
import AdminFinance from "@/components/admin/AdminFinance";
import Cart from "@/pages/Cart";
import AdminGPT from "@/components/admin/AdminGPT";
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
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<AdminOverview />} />
            <Route path="/admin/overview" element={<AdminOverview />} />
            <Route path="/admin/profile" element={<SellerProfile />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/gpt" element={<AdminGPT />} />
            <Route path="/admin/analytics" element={<AdminAnalytics />} />
            <Route path="/admin/finance" element={<AdminFinance />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
