import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminAnalytics from "@/components/admin/AdminAnalytics";

const AdminAnalyticsPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-1">
        <div className="bg-white shadow-sm border-b">
          <div className="px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Аналитика</h1>
                <p className="text-gray-600">
                  Статистика продаж и эффективности
                </p>
              </div>
              <button className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-400 transition-colors">
                Экспорт данных
              </button>
            </div>
          </div>
        </div>

        <div className="p-8">
          <AdminAnalytics />
        </div>
      </div>
    </div>
  );
};

export default AdminAnalyticsPage;
