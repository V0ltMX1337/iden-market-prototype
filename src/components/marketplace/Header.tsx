import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import FancyText from "@carefully-coded/react-text-gradient";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const categories = [
    {
      name: "Умный дом",
      icon: "Wifi",
      subcategories: [],
    },
    {
      name: "Бытовая техника",
      icon: "Zap",
      subcategories: [],
    },
    {
      name: "Смартфоны",
      icon: "Smartphone",
      subcategories: [
        { name: "Apple iPhone", brand: true },
        { name: "Samsung Galaxy", brand: true },
        { name: "Huawei", brand: true },
        { name: "HONOR", brand: true },
        { name: "Xiaomi", brand: true },
      ],
    },
    {
      name: "Умные часы и браслеты",
      icon: "Watch",
      subcategories: [{ name: "Смарт-часы" }, { name: "Фитнес-браслеты" }],
    },
    {
      name: "Аксессуары",
      icon: "Cable",
      subcategories: [
        { name: "Наушники" },
        { name: "Чехлы" },
        { name: "Защитные стёкла" },
        { name: "Зарядные устройства" },
        { name: "Кабели" },
      ],
    },
    {
      name: "Планшеты",
      icon: "Tablet",
      subcategories: [],
    },
    {
      name: "Электросамокаты",
      icon: "Zap",
      subcategories: [],
    },
    {
      name: "Телевизоры",
      icon: "Monitor",
      subcategories: [],
    },
    {
      name: "Развлечение",
      icon: "Gamepad2",
      subcategories: [],
    },
    {
      name: "Модемы и ТВ",
      icon: "Router",
      subcategories: [],
    },
  ];

  return (
    <header className="bg-white border-b border-gray-200">
      {/* Top navigation bar */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10 text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center text-gray-600">
                <Icon name="MapPin" size={14} className="mr-1" />
                Россия
              </div>
            </div>
            <div className="flex items-center space-x-6 text-gray-600">
              <a
                className="hover:text-blue-600"
                onClick={() => navigate("/admin/register")}
              >
                Создать магазин
              </a>
              <a
                className="hover:text-blue-600"
                onClick={() => navigate("/admin")}
              >
                Управление магазином
              </a>
              <a href="#" className="hover:text-blue-600">
                Новинки
              </a>
              <a href="#" className="hover:text-blue-600">
                Для поставщиков
              </a>
              <a href="#" className="hover:text-blue-600">
                Помощь
              </a>
              <a href="#" className="hover:text-blue-600">
                Поддержка
              </a>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-yellow-400 rounded-full mr-1 text-sm font-normal"></span>
                <span>Светлая</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and breadcrumb */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1 hover:bg-gray-100"
                  >
                    <Icon name="Grid3X3" size={24} className="text-blue-600" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="w-96 bg-white/95 backdrop-blur-sm border border-gray-200 shadow-2xl rounded-xl p-0"
                  sideOffset={12}
                >
                  <div className="px-4 py-3 text-base font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent border-b border-gray-100">
                    ✨ Каталог товаров
                  </div>
                  <div className="flex">
                    {/* Left panel - Main categories */}
                    <div className="w-48 border-r border-gray-100">
                      {categories.map((category, index) => (
                        <div key={index} className="group relative">
                          <div className="px-4 py-3 cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 flex items-center">
                            <div className="flex items-center justify-center w-6 h-6 rounded-md bg-gradient-to-br from-blue-100 to-purple-100 mr-3 group-hover:from-blue-200 group-hover:to-purple-200 transition-all duration-200">
                              <Icon
                                name={category.icon}
                                size={14}
                                className="text-blue-600 group-hover:text-purple-600 transition-colors duration-200"
                              />
                            </div>
                            <span className="font-medium text-gray-700 group-hover:text-gray-900 text-sm">
                              {category.name}
                            </span>
                            {category.subcategories.length > 0 && (
                              <Icon
                                name="ChevronRight"
                                size={14}
                                className="ml-auto text-gray-400 group-hover:text-gray-600"
                              />
                            )}
                          </div>

                          {/* Right panel - Subcategories (shown on hover) */}
                          {category.subcategories.length > 0 && (
                            <div className="absolute left-full top-0 w-64 bg-white border border-gray-200 rounded-lg shadow-xl ml-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                              <div className="p-2">
                                <div className="px-3 py-2 text-sm font-semibold text-gray-800 border-b border-gray-100 mb-2">
                                  {category.name}
                                </div>
                                {category.subcategories.map((sub, subIndex) => (
                                  <div
                                    key={subIndex}
                                    className="px-3 py-2 cursor-pointer rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 group/sub flex items-center justify-between"
                                  >
                                    <div className="flex items-center">
                                      {sub.brand && (
                                        <div className="w-4 h-4 bg-gradient-to-br from-gray-200 to-gray-300 rounded-sm mr-3 flex-shrink-0 group-hover/sub:from-blue-200 group-hover/sub:to-indigo-200 transition-all duration-200"></div>
                                      )}
                                      <span className="text-sm text-gray-600 group-hover/sub:text-gray-900 font-medium">
                                        {sub.name}
                                      </span>
                                    </div>
                                    {sub.brand && (
                                      <div className="text-xs text-gray-400 font-normal">
                                        {sub.name === "Apple iPhone" && "🍎"}
                                        {sub.name === "Samsung Galaxy" && "📱"}
                                        {sub.name === "Huawei" && "🔥"}
                                        {sub.name === "HONOR" && "⭐"}
                                        {sub.name === "Xiaomi" && "🚀"}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Right panel - Featured content */}
                    <div className="w-48 p-4 bg-gradient-to-br from-gray-50 to-blue-50">
                      <div className="text-sm font-semibold text-gray-800 mb-3">
                        🔥 Популярные бренды
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                          <span className="text-xs font-medium text-gray-700">
                            Apple
                          </span>
                          <span className="text-lg">🍎</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                          <span className="text-xs font-medium text-gray-700">
                            Samsung
                          </span>
                          <span className="text-lg">📱</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                          <span className="text-xs font-medium text-gray-700">
                            Xiaomi
                          </span>
                          <span className="text-lg">🚀</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              <h1
                className="text-2xl text-blue-600 cursor-pointer px-[1px] my-1 py-0 mx-0 font-extrabold text-center ml-2"
                onClick={() => navigate("/")}
              >
                <FancyText
                  gradient={{ from: "#7589C2", to: "#8BC2FC", type: "linear" }}
                  animateTo={{ from: "#0045FF", to: "#7580C2" }}
                  animateDuration={2000}
                >
                  POTIONMARKET
                </FancyText>
              </h1>
              <Badge variant="secondary" className="ml-2 text-xs">
                beta
              </Badge>
            </div>
          </div>

          {/* Search section - full width */}
          <div className="flex-1 px-6">
            <div className="relative w-full">
              <Icon
                name="Search"
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Искать на PotionMarket..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="p-2">
              <Icon name="Search" size={20} />
            </Button>
            <Button variant="ghost" size="sm" className="p-2">
              <Icon name="Heart" size={20} />
            </Button>
            <Button variant="ghost" size="sm" className="p-2">
              <Icon name="Package" size={20} />
            </Button>
            <Button variant="ghost" size="sm" className="p-2">
              <Icon name="MessageCircle" size={20} />
            </Button>
            <Button variant="ghost" size="sm" className="p-2 relative">
              <Icon name="ShoppingCart" size={20} />
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                1
              </span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0 rounded-full">
                  <div className="flex items-center justify-center bg-blue-600 text-white w-8 h-8 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">
                    АП
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                  onClick={() => navigate("/profile")}
                  className="cursor-pointer"
                >
                  <Icon name="User" size={16} className="mr-2" />
                  Профиль
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigate("/profile?tab=orders")}
                  className="cursor-pointer"
                >
                  <Icon name="Package" size={16} className="mr-2" />
                  Заказы
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigate("/profile?tab=reviews")}
                  className="cursor-pointer"
                >
                  <Icon name="MessageCircle" size={16} className="mr-2" />
                  Мои отзывы
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-red-600 hover:text-red-700">
                  <Icon name="LogOut" size={16} className="mr-2" />
                  Выйти
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
