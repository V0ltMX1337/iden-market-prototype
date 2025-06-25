import Icon from "@/components/ui/icon";

const PartnerHeader = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 sticky top-0 z-10">
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <Icon name="Store" size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">POTIONSHOP</h1>
                <p className="text-sm text-slate-600">
                  Панель управления магазином
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <Icon name="Bell" size={20} className="text-slate-600" />
            </button>
            <button className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-200 shadow-md hover:shadow-lg">
              <Icon name="LogOut" size={16} />
              Выйти
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PartnerHeader;
