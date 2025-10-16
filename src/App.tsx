import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AlertProvider } from "@/contexts/AlertContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import CookieBanner from "@/components/ui/CookieBanner";
import ReferralTracker from "@/components/ReferralTracker";
import { Suspense, lazy } from "react";
import { AuthProvider } from "@/hooks/useAuth";

const HomeRoutes = lazy(() => import("./routes/HomeRoutes"));
const AuthRoutes = lazy(() => import("./routes/AuthRoutes"));
const ServiceRoutes = lazy(() => import("./routes/ServiceRoutes"));
const OtherRoutes = lazy(() => import("./routes/OtherRoutes"));
const ProfileRoutes = lazy(() => import("./routes/ProfileRoutes"));
const AdminRoutes = lazy(() => import("./routes/AdminRoutes"));
const TaxiRoutes = lazy(() => import("./routes/TaxiRoutes"));
const TelegramAdminRoutes = lazy(() => import("./routes/TelegramAdminRoutes"));
const MigvpnRoutes = lazy(() => import("./routes/MigvpnRoutes"));
const MfoRoutes = lazy(() => import("./routes/MfoRoutes"));
const GruzRoutes = lazy(() => import("./routes/GruzRoutes"));
const NewRoutes = lazy(() => import("./routes/NewRoutes"));
// const MessengerRoutes = lazy(() => import("./routes/MessengerRoutes"));

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
            <ReferralTracker />
            <AuthProvider>
              <Suspense fallback={<div>Загрузка...</div>}>
                <HomeRoutes />
                <AuthRoutes />
                <ServiceRoutes />
                <OtherRoutes />
                <ProfileRoutes />
                <AdminRoutes />
                <TaxiRoutes />
                <TelegramAdminRoutes />
                <MigvpnRoutes />
                <MfoRoutes />
                <GruzRoutes />
                <NewRoutes />
                {/* <MessengerRoutes /> */}
                
              </Suspense>
            </AuthProvider>
          </Router>
        </TooltipProvider>
      </AlertProvider>
    </QueryClientProvider>
  );
};

export default App;