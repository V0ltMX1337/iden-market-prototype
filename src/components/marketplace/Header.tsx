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
import { HelpCircle, Shield, Heart, MessagesSquareIcon, Package, ShoppingCart } from "lucide-react";
import DropdownCartContent from "../customcomponent/DropdownCartContent";
import { CategoryMenu } from "../customcomponent/CategoryMenu";
import { ExpandableTabs } from "@/lib/expandable-tabs";

const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [clickedCategory, setClickedCategory] = useState<number | null>(null);

  const tabs = [
    { title: "Избранное", icon: Heart},
    { title: "Сообщения", icon: MessagesSquareIcon, action: () => navigate("/profile/messages") },
    { title: "Заказы", icon: Package, action: () => navigate("/profile/orders") },
    { title: "Корзина", icon: ShoppingCart, content: <DropdownCartContent /> },
    { type: "separator" },
    { title: "Поддержка", icon: HelpCircle, action: () => navigate("/profile/messages") },
    { title: "О нас", icon: Shield, action: () => navigate("/help") },
  ];

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
    <div className="h-[160px]">
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center bg-transparent">
        <div className="bg-white w-full max-w-[1440px] rounded-b-2xl shadow-lg border border-gray-200">
          {/* Верхняя панель */}
          <div className="bg-gray-50 border-b border-gray-200 px-6 lg:px-10">
            <div className="flex items-center justify-between h-12 text-base">
              <div className="flex items-center text-gray-600 space-x-8">
                <div className="flex items-center">
                  <Icon name="MapPin" size={18} className="mr-2" />
                  Россия
                </div>
              </div>
              <div className="flex items-center space-x-8 text-gray-600">
                <a className="hover:text-blue-600" onClick={() => navigate("/admin/register")}>Создать магазин</a>
                <a className="hover:text-blue-600" onClick={() => navigate("/admin")}>Управление магазином</a>
                <a href="#" className="hover:text-blue-600">Новинки</a>
                <a href="#" className="hover:text-blue-600">Для поставщиков</a>
                <a className="hover:text-blue-600" onClick={() => navigate("/help")}>Помощь</a>
                <a href="#" className="hover:text-blue-600">Поддержка</a>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-1" />
                  <span>Светлая</span>
                </div>
              </div>
            </div>
          </div>

          {/* Нижняя панель */}
          <div className="px-6 lg:px-10 py-4 flex items-center justify-between">
            {/* Левая часть: Лого и Категории */}
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="p-1 hover:bg-gray-100 rounded-lg cursor-pointer transition">
                      <Icon name="Grid3X3" size={25} className="text-blue-600" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="w-[20rem] bg-white/95 backdrop-blur-sm border border-gray-200 shadow-2xl rounded-xl p-0 overflow-visible"
                    sideOffset={12}
                  >
                    <div className="px-4 py-3 text-base font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent border-b border-gray-100">
                      ✨ Каталог товаров
                    </div>
                    <CategoryMenu categories={categories} />
                  </DropdownMenuContent>
                </DropdownMenu>

                <h1
                  className="text-3xl text-blue-600 cursor-pointer px-[1px] my-1 py-0 mx-0 font-extrabold text-center ml-4"
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

                <Badge variant="secondary" className="ml-3 text-sm px-3 py-1">beta</Badge>
              </div>
            </div>

            {/* Центр: Поиск */}
            <div className="flex-1 px-10">
              <div className="relative w-full">
                <Button variant="ghost" size="icon" className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Icon
                    name="Search"
                    size={20}
                  />
                </Button>

                <input
                  type="text"
                  placeholder="Искать на TRIVOMARKET..."
                  className="w-full pl-4 pr-6 py-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Правая часть: Иконки */}
            <div className="flex items-center space-x-2">
              <div className="flex flex-col gap-4">
                <ExpandableTabs tabs={tabs} />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="p-2 rounded-full cursor-pointer hover:bg-gray-100 transition">
                    <div className="flex items-center justify-center bg-blue-600 text-white w-11 h-11 rounded-full text-lg font-medium hover:bg-blue-700 transition-colors">
                      АП
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer">
                    <Icon name="User" size={16} className="mr-2" />
                    Профиль
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/profile?tab=orders")} className="cursor-pointer">
                    <Icon name="Package" size={16} className="mr-2" />
                    Заказы
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/profile?tab=reviews")} className="cursor-pointer">
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
    </div>
  );
};

export default Header;
