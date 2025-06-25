import PvzNotificationToast from "@/components/pvzturbo/pvz/PvzNotificationToast";
import PvzSidebar from "@/components/pvzturbo/pvz/PvzSiderbar";
import PvzHeader from "@/components/pvzturbo/pvz/PvzHeader";
import { Outlet } from "react-router-dom";

const PvzDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <PvzSidebar />
      <div className="flex-1 flex flex-col">
        <PvzHeader />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
      <PvzNotificationToast />
    </div>
  );
};

export default PvzDashboard;
