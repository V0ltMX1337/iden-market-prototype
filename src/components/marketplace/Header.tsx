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
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-12">
            <div className="text-3xl font-bold">
              <FancyText
                gradient={{ from: "#8B5CF6", to: "#06B6D4" }}
                className="text-3xl font-bold"
              >
                PotionMarket
              </FancyText>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-lg px-6 h-12">
                  <Icon name="Menu" className="w-6 h-6 mr-3" />
                  Каталог
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
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex-1 max-w-2xl mx-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Найти товары..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
              />
              <Button size="sm" className="absolute right-2 top-2 h-12 px-6">
                <Icon name="Search" className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <Button variant="ghost" className="text-lg h-12 px-6">
              <Icon name="Heart" className="w-6 h-6 mr-2" />
              Избранное
            </Button>
            <Button variant="ghost" className="relative text-lg h-12 px-6">
              <Icon name="ShoppingCart" className="w-6 h-6 mr-2" />
              Корзина
              <Badge className="absolute -top-2 -right-2 bg-red-500 text-white min-w-6 h-6 flex items-center justify-center text-sm">
                3
              </Badge>
            </Button>
            <Button className="text-lg h-12 px-8">Войти</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
