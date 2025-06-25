import { Outlet } from "react-router-dom";
import PartnerSidebar from "@/components/partner/PartnerSidebar";
import PartnerHeader from "@/components/partner/PartnerHeader";

const PartnerDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50/30">
      <PartnerSidebar />
      <div className="flex-1 flex flex-col">
        <PartnerHeader />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default PartnerDashboard;
