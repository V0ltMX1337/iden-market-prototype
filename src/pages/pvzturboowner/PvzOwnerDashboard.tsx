import PvzOwnerSidebar from "@/components/pvzturbo/pvzowner/PvzOwnerSiderbar";
import PvzOwnerHeader from "@/components/pvzturbo/pvzowner/PvzOwnerHeader";
import { Outlet } from "react-router-dom";

const PvzOwnerDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-purple-50/30">
      <PvzOwnerSidebar />
      <div className="flex-1 flex flex-col">
        <PvzOwnerHeader />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default PvzOwnerDashboard;
