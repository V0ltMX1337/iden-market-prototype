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
                  className="w-80 max-h-96 overflow-y-auto bg-white/95 backdrop-blur-sm border border-gray-200 shadow-2xl rounded-xl p-2"
                  sideOffset={12}
                >
                  <div className="px-4 py-3 text-base font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent border-b border-gray-100 mb-2">
                    ✨ Каталог товаров
                  </div>
                  {categories.map((category, index) =>
                    category.subcategories.length > 0 ? (
                      <DropdownMenuSub key={index}>
                        <DropdownMenuSubTrigger className="px-4 py-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 group">
                          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 mr-3 group-hover:from-blue-200 group-hover:to-purple-200 transition-all duration-200">
                            <Icon
                              name={category.icon}
                              size={16}
                              className="text-blue-600 group-hover:text-purple-600 transition-colors duration-200"
                            />
                          </div>
                          <span className="font-medium text-gray-700 group-hover:text-gray-900">
                            {category.name}
                          </span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent className="w-64 bg-white/95 backdrop-blur-sm border border-gray-200 shadow-xl rounded-xl p-2 ml-2">
                          {category.subcategories.map((sub, subIndex) => (
                            <DropdownMenuItem
                              key={subIndex}
                              className="px-4 py-2.5 cursor-pointer rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 group"
                            >
                              {sub.brand && (
                                <div className="w-5 h-5 bg-gradient-to-br from-gray-200 to-gray-300 rounded-md mr-3 flex-shrink-0 group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-200"></div>
                              )}
                              <span className="text-gray-600 group-hover:text-gray-900 font-medium">
                                {sub.name}
                              </span>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuSubContent>
                      </DropdownMenuSub>
                    ) : (
                      <DropdownMenuItem
                        key={index}
                        className="px-4 py-3 cursor-pointer rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 group"
                      >
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 mr-3 group-hover:from-blue-200 group-hover:to-purple-200 transition-all duration-200">
                          <Icon
                            name={category.icon}
                            size={16}
                            className="text-blue-600 group-hover:text-purple-600 transition-colors duration-200"
                          />
                        </div>
                        <span className="font-medium text-gray-700 group-hover:text-gray-900">
                          {category.name}
                        </span>
                      </DropdownMenuItem>
                    ),
                  )}
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
            <div className="flex items-center bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-blue-300 rounded-lg transition-all duration-200 flex-1 max-w-2xl mr-4">
              <div className="flex items-center px-3 py-2 flex-1">
                <Icon
                  name="Globe"
                  size={16}
                  className="text-yellow-500 mr-2 flex-shrink-0"
                />
                <Icon
                  name="ChevronRight"
                  size={16}
                  className="mx-1 text-gray-400 flex-shrink-0"
                />
                <Input
                  placeholder="Искать на PotionMarket..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className={`border-0 bg-transparent placeholder:text-gray-500 text-sm focus-visible:ring-0 px-0 flex-1 transition-all duration-200 ${
                    isSearchFocused ? "placeholder:text-gray-400" : ""
                  }`}
                />
              </div>
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
