import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Marketplace from "./pages/marketplace/Marketplace";
import ProductPage from "./pages/ProductPage";
import Login from "./pages/index/Login";
import Register from "./pages/index/Register";
import BuyerProfile from "./pages/BuyerProfile";
import NotFound from "./pages/index/NotFound";
import SellerPage from "@/pages/SellerPage";
import SellerProfile from "@/pages/SellerProfile";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminRegister from "@/pages/admin/AdminRegister";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminOverview from "@/components/admin/AdminOverview";
import AdminProducts from "@/components/admin/AdminProducts";
import AdminOrders from "@/components/admin/AdminOrders";
import AdminAnalytics from "@/components/admin/AdminAnalytics";
import AdminFinance from "@/components/admin/AdminFinance";
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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/*" element={<BuyerProfile />} />
          <Route
            path="/marketplace/category/:category"
            element={<Marketplace />}
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
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="finance" element={<AdminFinance />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
