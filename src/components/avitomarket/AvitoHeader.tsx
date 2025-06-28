import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ExpandableTabsAvito } from "@/lib/expandable-tabs-avito";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AvitoCategroyMenu } from "../customcomponent/AvitoCategroyMenu";

const AvitoHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  // Простые табы без навигации
  const tabs = [
    { title: "Главная", icon: "Home", path: "/avito/" },
    { title: "Избранное", icon: "Heart", path: "/avito/profile/favorites" },
    {
      title: "Сообщения",
      icon: "MessageCircle",
      path: "/avito/profile/messages",
    },
  ];

  const [activeTabIndex, setActiveTabIndex] = useState<number | null>(null);

  useEffect(() => {
    let bestMatchIndex: number | null = null;
    let bestMatchLength = -1;

    tabs.forEach((tab, index) => {
      if (
        location.pathname.startsWith(tab.path) &&
        tab.path.length > bestMatchLength
      ) {
        bestMatchIndex = index;
        bestMatchLength = tab.path.length;
      }
    });

    setActiveTabIndex(bestMatchIndex);
  }, [location.pathname]);

  const handleTabChange = (index: number | null) => {
    if (index === null) return;
    const tab = tabs[index];
    if (tab?.path) {
      navigate(tab.path);
    }
    setActiveTabIndex(index);
  };

  const avitoCategories = [
    {
      name: "Авто",
      icon: "Car",
      subcategories: [
        {
          name: "Легковые автомобили",
          items: [
            "С пробегом",
            "Новые",
            "BMW",
            "Mercedes",
            "Toyota",
            "Volkswagen",
          ],
        },
        {
          name: "Грузовики и спецтехника",
          items: ["Грузовики", "Автобусы", "Прицепы", "Спецтехника"],
        },
      ],
    },
    {
      name: "Недвижимость",
      icon: "Home",
      subcategories: [
        {
          name: "Квартиры",
          items: ["Продажа", "Аренда", "1-комнатные", "2-комнатные"],
        },
      ],
    },
    {
      name: "Работа",
      icon: "Briefcase",
      subcategories: [],
    },
    {
      name: "Электроника",
      icon: "Smartphone",
      subcategories: [],
    },
  ];

  return (
    <div className="h-[160px]">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        {/* Верхняя панель */}
        <div className="bg-gray-50 border-b border-gray-200 px-6 lg:px-10">
          <div className="flex items-center justify-between h-12 text-sm">
            <div className="flex items-center text-gray-600 space-x-6">
              <div className="flex items-center">
                <Icon name="MapPin" size={16} className="mr-2" />
                Россия
              </div>
            </div>
            <div className="flex items-center space-x-6 text-gray-600">
              <a href="#" className="hover:text-blue-600">
                Разместить объявление
              </a>
              <a href="#" className="hover:text-blue-600">
                Мой Avito
              </a>
              <a href="#" className="hover:text-blue-600">
                Для бизнеса
              </a>
              <a href="#" className="hover:text-blue-600">
                Помощь
              </a>
            </div>
          </div>
        </div>

        {/* Основная панель */}
        <div className="px-6 lg:px-10 py-3 flex items-center justify-between">
          {/* Лого и Категории */}
          <div className="flex items-center space-x-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                  <Icon name="Grid3X3" size={20} className="text-blue-600" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[20rem] p-0">
                <div className="px-4 py-3 text-sm font-semibold border-b">
                  Категории
                </div>
                <AvitoCategroyMenu categories={avitoCategories} />
              </DropdownMenuContent>
            </DropdownMenu>

            <h1
              className="text-2xl font-bold text-blue-600 cursor-pointer"
              onClick={() => navigate("/avito")}
            >
              Avito
            </h1>
          </div>

          {/* Поиск */}
          <div className="flex-1 px-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Поиск по объявлениям"
                className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <Icon name="Search" size={20} />
              </Button>
            </div>
          </div>

          {/* Правая часть */}
          <div className="flex items-center space-x-4">
            <ExpandableTabsAvito
              tabs={tabs}
              activeIndex={activeTabIndex}
              onChange={handleTabChange}
            />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700">
                  ИП
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => navigate("/avito/profile")}>
                  <Icon name="User" size={16} className="mr-2" />
                  Профиль
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigate("/avito/profile/ads")}
                >
                  <Icon name="Package" size={16} className="mr-2" />
                  Мои объявления
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  <Icon name="LogOut" size={16} className="mr-2" />
                  Выйти
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </div>
  );
};

export default AvitoHeader;
