import { NavLink } from "react-router-dom";
import {
  BarChart3,
  Truck,
  Inbox,
  LayoutGrid,
  Undo2,
  RotateCcw,
  Boxes,
  BookOpenCheck,
  MessageCircleQuestion,
} from "lucide-react";

const PvzSidebar = () => {
  const menuItems = [
    { path: "/pvzturbo/overview", icon: BarChart3, label: "Сводка" },
    { path: "/pvzturbo/order-issuance", icon: Truck, label: "Выдача заказов" },
    { path: "/pvzturbo/shipment-receipt", icon: Inbox, label: "Прием отправлений" },
    { path: "/pvzturbo/order-place", icon: LayoutGrid, label: "Размещение заказов" },
    { path: "/pvzturbo/returns-from-client", icon: Undo2, label: "Возвраты от клиента" },
    { path: "/pvzturbo/returns-from-seller", icon: RotateCcw, label: "Возвраты от продавца" },
    { path: "/pvzturbo/sklad", icon: Boxes, label: "Склад" },
    { path: "/pvzturbo/training", icon: BookOpenCheck, label: "Обучение" },
    { path: "/pvzturbo/support", icon: MessageCircleQuestion, label: "Поддержка" },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen relative">
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-xl font-bold">г. Дзержинск, Гайдара 35</h1>
        <p className="text-sm text-gray-400">Панель управления ПВЗ</p>
      </div>

      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 text-sm hover:bg-gray-800 transition-colors ${
                  isActive ? "bg-yellow-500 text-black" : ""
                }`
              }
            >
              <Icon size={20} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="absolute bottom-0 left-0 w-64 p-6 border-t border-gray-700">
        <NavLink
          to="/pvzturbo/profile"
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

export default PvzSidebar;