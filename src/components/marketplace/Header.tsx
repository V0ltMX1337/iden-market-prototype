import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import FancyText from "@carefully-coded/react-text-gradient";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [clickedCategory, setClickedCategory] = useState<number | null>(null);

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
    <header className="bg-white border-b border-gray-200 w-[1440px] h-[140px] mx-auto">
      {/* Top navigation bar */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-full mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-12 text-base">
            <div className="flex items-center space-x-8">
              <div className="flex items-center text-gray-600">
                <Icon name="MapPin" size={18} className="mr-2" />
                Россия
              </div>
            </div>
            <div className="flex items-center space-x-8 text-gray-600">
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
              <a
                className="hover:text-blue-600"
                onClick={() => navigate("/help")}
              >
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
      <div className="max-w-full mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo and breadcrumb */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="p-1 hover:bg-gray-100"
                  >
                    <Icon name="Grid3X3" size={64} className="text-blue-600" />
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
                className="text-4xl text-blue-600 cursor-pointer px-[1px] my-1 py-0 mx-0 font-extrabold text-center ml-4"
                onClick={() => navigate("/")}
              >
                <FancyText
                  gradient={{ from: "#7589C2", to: "#8BC2FC", type: "linear" }}
                  animateTo={{ from: "#0045FF", to: "#7580C2" }}
                  animateDuration={2000}
                >
                  TRIVOMARKET
                </FancyText>
              </h1>
              <Badge variant="secondary" className="ml-3 text-sm px-3 py-1">
                beta
              </Badge>
            </div>
          </div>

          {/* Search section - full width */}
          <div className="flex-1 px-10">
            <div className="relative w-full">
              <Icon
                name="Search"
                size={24}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Искать на TRIVOMARKET..."
                className="w-full pl-12 pr-6 py-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-6">
            <Button variant="ghost" size="lg" className="p-4 h-14 w-14">
              <Icon name="Search" size={32} />
            </Button>
            <Button variant="ghost" size="lg" className="p-4 h-14 w-14">
              <Icon name="Heart" size={32} />
            </Button>
            <Button variant="ghost" size="lg" className="p-4 h-14 w-14">
              <Icon name="Package" size={32} />
            </Button>
            <Button variant="ghost" size="lg" className="p-4 h-14 w-14">
              <Icon name="MessageCircle" size={32} />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="lg"
                  className="p-4 h-14 w-14 relative"
                >
                  <Icon name="ShoppingCart" size={28} />
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-sm rounded-full w-6 h-6 flex items-center justify-center">
                    1
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 p-0">
                <div className="p-4 border-b">
                  <h3 className="font-semibold text-lg">Корзина</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <div className="p-4 space-y-4">
                    {/* Cart Item */}
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <img
                          src="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=100&h=100&fit=crop"
                          alt="Твитеры пищалки Alpine DDT-S30"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">
                          Твитеры пищалки Alpine DDT-S30
                        </h4>
                        <p className="text-xs text-gray-500">
                          Пищалки DDT-S30 - TWEETER DDT-S30
                        </p>
                        <p className="font-semibold text-blue-600">1 000 ₽</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Icon name="Minus" size={12} />
                        </Button>
                        <span className="text-sm font-medium w-8 text-center">
                          1
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Icon name="Plus" size={12} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-t space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Товары (1)</span>
                    <span className="font-semibold">1 000 ₽</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Итого:</span>
                    <span className="font-semibold">1 000 ₽</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Общая стоимость</span>
                    <span className="font-semibold text-lg">1 000 ₽</span>
                  </div>
                  <p className="text-xs text-gray-500">Без учёта Доставки</p>
                  <Button
                    onClick={() => navigate("/cart")}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Перейти к оформлению
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0 rounded-full">
                  <div className="flex items-center justify-center bg-blue-600 text-white w-12 h-12 rounded-full text-lg font-medium hover:bg-blue-700 transition-colors">
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
