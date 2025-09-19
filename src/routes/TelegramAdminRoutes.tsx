import { Routes, Route } from "react-router-dom";
import TelegramAdminLogin from "@/pages/admin/TelegramAdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";

const TelegramAdminRoutes = () => {
  return (
    <Routes>
      <Route path="/tgadmin" element={<TelegramAdminLogin />} />
      <Route path="/tgadmin/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
};

export default TelegramAdminRoutes;