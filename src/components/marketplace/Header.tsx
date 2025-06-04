import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import FancyText from "@carefully-coded/react-text-gradient";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";
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
  const { state } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [clickedCategory, setClickedCategory] = useState<number | null>(null);

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

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
        {
          name: "Смартфоны",
          items: [
            "Apple iPhone",
            "Samsung Galaxy",
            "Huawei",
            "HONOR",
            "Xiaomi",
            "Ещё▼",
          ],
        },
        {
          name: "Мобильные телефоны",
          items: ["Кнопочные телефоны", "Домашние телефоны"],
        },
        {
          name: "Аксессуары",
          items: [
            "Наушники",
            "Чехлы",
            "Защитные стёкла",
            "Зарядные устройства",
            "Кабели",
          ],
        },
        {
          name: "Умные часы и браслеты",
          items: ["Смарт-часы", "Фитнес-браслеты", "Детские часы"],
        },
      ],
    },
    {
      name: "Умные часы и браслеты",
      icon: "Watch",
      subcategories: [
        {
          name: "Смарт-часы",
          items: ["Apple Watch", "Samsung Galaxy Watch", "Huawei Watch"],
        },
        {
          name: "Фитнес-браслеты",
          items: ["Xiaomi Mi Band", "Honor Band", "Fitbit"],
        },
      ],
    },
    {
      name: "Аксессуары",
      icon: "Cable",
      subcategories: [
        {
          name: "Наушники",
          items: [
            "Беспроводные наушники",
            "Проводные наушники",
            "Игровые гарнитуры",
          ],
        },
        {
          name: "Чехлы",
          items: ["Чехлы для телефонов", "Чехлы для планшетов"],
        },
        { name: "Защитные стёкла", items: ["Для смартфонов", "Для планшетов"] },
        {
          name: "Зарядные устройства",
          items: ["Беспроводные зарядки", "Power bank", "Автозарядки"],
        },
        { name: "Кабели", items: ["USB-C", "Lightning", "Micro USB"] },
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
                  className="w-80 bg-white/95 backdrop-blur-sm border border-gray-200 shadow-2xl rounded-xl p-0"
                  sideOffset={12}
                >
                  <div className="px-4 py-3 text-base font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent border-b border-gray-100">
                    ✨ Каталог товаров
                  </div>
                  <div className="relative overflow-visible">
                    {/* Main categories list */}
                    <div className="w-full">
                      {categories.map((category, index) => (
                        <div key={index} className="group relative">
                          <div
                            className="px-4 py-3 cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 flex items-center"
                            onClick={() => {
                              if (category.subcategories.length > 0) {
                                setClickedCategory(
                                  clickedCategory === index ? null : index,
                                );
                              }
                            }}
                          >
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
                        </div>
                      ))}
                    </div>

                    {/* Subcategories panel - positioned outside the scroll container */}
                    {clickedCategory !== null &&
                      categories[clickedCategory]?.subcategories.length > 0 && (
                        <div
                          className="absolute left-full top-0 w-[500px] bg-white border border-gray-200 rounded-lg shadow-2xl ml-2 z-[60]"
                          style={{
                            top: `${clickedCategory * 48 + 48}px`,
                          }}
                          onMouseLeave={() => setClickedCategory(null)}
                        >
                          <div className="p-6">
                            <div className="flex items-center mb-4 pb-3 border-b border-gray-100">
                              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 mr-3">
                                <Icon
                                  name={categories[clickedCategory].icon}
                                  size={16}
                                  className="text-blue-600"
                                />
                              </div>
                              <span className="text-lg font-bold text-gray-800">
                                {categories[clickedCategory].name}
                              </span>
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                              {categories[clickedCategory].subcategories.map(
                                (subcat, subcatIndex) => (
                                  <div key={subcatIndex} className="space-y-3">
                                    <h4 className="font-semibold text-gray-800 text-base mb-3 border-b border-gray-100 pb-2">
                                      {subcat.name}
                                    </h4>
                                    <div className="space-y-2">
                                      {subcat.items.map((item, itemIndex) => (
                                        <div
                                          key={itemIndex}
                                          className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer py-1.5 px-2 rounded hover:bg-blue-50 transition-all duration-150"
                                        >
                                          {item}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                        </div>
                      )}
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
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-gray-100 relative"
            >
              <Icon name="ShoppingCart" size={20} />
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs h-5 w-5 flex items-center justify-center p-0 rounded-full">
                  {totalItems}
                </Badge>
              )}
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-gray-100">
              <Icon name="Heart" size={20} />
              {state.favorites.length > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs h-5 w-5 flex items-center justify-center p-0 rounded-full">
                  {state.favorites.length}
                </Badge>
              )}
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
