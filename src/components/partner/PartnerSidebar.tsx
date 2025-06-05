import { NavLink } from "react-router-dom";
import Icon from "@/components/ui/icon";

const PartnerSidebar = () => {
  const menuItems = [
    { path: "/partner/overview", icon: "BarChart3", label: "Сводка" },
    { path: "/partner/products", icon: "Package", label: "Товары" },
    { path: "/partner/orders", icon: "ShoppingCart", label: "Заказы" },
    { path: "/partner/finance", icon: "CreditCard", label: "Финансы" },
    { path: "/partner/analytics", icon: "TrendingUp", label: "Аналитика" },
    { path: "/partner/gpt", icon: "Sparkles", label: "Генерация AI" },
    { path: "/partner/support", icon: "MessageCircle", label: "Поддержка" },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen">
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-xl font-bold">POTIONSHOP</h1>
        <p className="text-sm text-gray-400">Панель управления</p>
      </div>

      <nav className="mt-6">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 text-sm hover:bg-gray-800 transition-colors ${
                isActive ? "bg-yellow-500 text-black" : ""
              }`
            }
          >
            <Icon name={item.icon as any} size={20} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="absolute bottom-0 left-0 w-64 p-6 border-t border-gray-700">
        <NavLink
          to="/admin/profile"
          className="flex items-center gap-3 hover:bg-gray-800 transition-colors p-2 rounded-lg w-fit"
        >
          <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
            <span className="text-black text-sm font-bold">А</span>
          </div>
          <div>
            <p className="text-sm font-medium">Александр Волков</p>
            <p className="text-xs text-gray-400">admin@potionshop.ru</p>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default PartnerSidebar;
