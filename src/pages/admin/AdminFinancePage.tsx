import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminFinance from "@/components/admin/AdminFinance";

const AdminFinancePage = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-1">
        <div className="bg-white shadow-sm border-b">
          <div className="px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Финансы</h1>
                <p className="text-gray-600">Доходы и расходы магазина</p>
              </div>
              <button className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-400 transition-colors">
                Вывести средства
              </button>
            </div>
          </div>
        </div>

        <div className="p-8">
          <AdminFinance />
        </div>
      </div>
    </div>
  );
};

export default AdminFinancePage;
