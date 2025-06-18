import PvzNotificationToast from "@/components/pvzturbo/PvzNotificationToast";
import PvzSidebar from "@/components/pvzturbo/PvzSiderbar";
import { Outlet } from "react-router-dom";

const PvzDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <PvzSidebar />
      <div className="flex-1">
        <div className="bg-white shadow-sm border-b">
          <div className="px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Панель управления
                </h1>
                <p className="text-gray-600">
                  Управляйте вашим пунктом выдачи
                </p>
              </div>
              <button className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-400 transition-colors">
                Выйти
              </button>
            </div>
          </div>
        </div>

        <div className="p-8">
          <Outlet />
        </div>
      </div>

      {/* Всплывающие уведомления */}
      <PvzNotificationToast />
    </div>
  );
};

export default PvzDashboard;
