import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import FancyText from "@carefully-coded/react-text-gradient";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ExpandableTabsAvito } from "@/lib/expandable-tabs-avito";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  User,
  Package,
  Heart,
  MessageCircle,
  ShoppingBag,
  ShoppingCart,
  HelpCircle,
  Info,
  LogIn,
  UserPlus,
  Home,
  UserCircle,
} from "lucide-react";
import { AvitoCategroyMenu } from "../customcomponent/AvitoCategroyMenu";

const AvitoHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  // Храним индекс активного таба, синхронизируем с URL
  const [activeTabIndex, setActiveTabIndex] = useState<number | null>(null);

  const user = location.pathname.startsWith("/avito/")
    ? { firstName: "Иван", lastName: "Петров" }
    : null;

  const authorizedTabs = [
    {
      title: "Главная",
      icon: Home,
      path: "/avito/",
    },
    {
      title: "Профиль",
      icon: UserCircle,
      path: "/avito/profile",
    },
    {
      title: "Мои объявления",
      icon: Package,
      path: "/avito/profile/ads",
    },
    {
      title: "Сообщения",
      icon: MessageCircle,
      path: "/avito/profile/messages",
    },
    {
      title: "Избранное",
      icon: Heart,
      path: "/avito/profile/favorites",
    },
    { type: "separator" },
    {
      title: "Заказы",
      icon: ShoppingBag,
      path: "/avito/profile/orders",
    },
    {
      title: "Корзина",
      icon: ShoppingCart,
      path: "/avito/profile/cart",
    },
    { type: "separator" },
    {
      title: "Поддержка",
      icon: HelpCircle,
      path: "/avito/support",
    },
    {
      title: "О нас",
      icon: Info,
      path: "/avito/about",
    },
  ];

  const guestTabs = [
    {
      title: "Войти",
      icon: LogIn,
      path: "/avito/login",
    },
    {
      title: "Регистрация",
      icon: UserPlus,
      path: "/avito/register",
    },
  ];

  // Синхронизируем activeTabIndex с URL при смене location.pathname
  useEffect(() => {
    const tabs = authorizedTabs;

    let bestMatchIndex: number | null = null;
    let bestMatchLength = -1;

    tabs.forEach((tab, index) => {
      if (!("path" in tab) || !tab.path) return;

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

  // Обработчик изменения таба
  const handleTabChange = (index: number | null) => {
    if (index === null) return;
    const tabs = authorizedTabs;
    const tab = tabs[index];
    if ("path" in tab && tab.path) {
      navigate(tab.path);
    }
    setActiveTabIndex(index);
  };

  const tabs = authorizedTabs;

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
        {
          name: "Мотоциклы и мототехника",
          items: ["Мотоциклы", "Скутеры", "Квадроциклы", "Снегоходы"],
        },
      ],
    },
    {
      name: "Недвижимость",
      icon: "Home",
      subcategories: [
        {
          name: "Квартиры",
          items: [
            "Продажа",
            "Аренда",
            "1-комнатные",
            "2-комнатные",
            "3-комнатные",
          ],
        },
        {
          name: "Дома, дачи, коттеджи",
          items: ["Дома", "Дачи", "Коттеджи", "Таунхаусы"],
        },
        {
          name: "Земельные участки",
          items: ["ИЖС", "СНТ", "Коммерческие", "Сельхозназначения"],
        },
      ],
    },
    {
      name: "Работа",
      icon: "Briefcase",
      subcategories: [
        {
          name: "IT, интернет, телеком",
          items: ["Программисты", "Дизайнеры", "Тестировщики", "Аналитики"],
        },
        {
          name: "Продажи",
          items: ["Менеджеры", "Консультанты", "Торговые представители"],
        },
      ],
    },
    {
      name: "Электроника",
      icon: "Smartphone",
      subcategories: [
        {
          name: "Телефоны",
          items: ["iPhone", "Samsung", "Xiaomi", "Huawei"],
        },
        {
          name: "Компьютеры",
          items: ["Ноутбуки", "ПК", "Планшеты", "Мониторы"],
        },
      ],
    },
    {
      name: "Одежда и обувь",
      icon: "Shirt",
      subcategories: [],
    },
    {
      name: "Хобби и отдых",
      icon: "Gamepad2",
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
                <a href="#" className="hover:text-blue-600">
                  Поддержка
                </a>
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
                      <Icon
                        name="Grid3X3"
                        size={25}
                        className="text-blue-600"
                      />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="w-[20rem] bg-white/95 backdrop-blur-sm border border-gray-200 shadow-2xl rounded-xl p-0 overflow-visible"
                    sideOffset={12}
                  >
                    <div className="px-4 py-3 text-base font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent border-b border-gray-100">
                      ✨ Каталог объявлений
                    </div>
                    <AvitoCategroyMenu categories={avitoCategories} />
                  </DropdownMenuContent>
                </DropdownMenu>

                <h1
                  className="text-3xl text-blue-600 cursor-pointer px-[1px] my-1 py-0 mx-0 font-extrabold text-center ml-4"
                  onClick={() => navigate("/avito")}
                >
                  <FancyText
                    gradient={{
                      from: "#7589C2",
                      to: "#8BC2FC",
                      type: "linear",
                    }}
                    animateTo={{ from: "#0045FF", to: "#7580C2" }}
                    animateDuration={2000}
                  >
                    TRIVO
                  </FancyText>
                </h1>

                <Badge variant="secondary" className="ml-3 text-sm px-3 py-1">
                  объявления
                </Badge>
              </div>
            </div>

            {/* Центр: Поиск */}
            <div className="flex-1 px-10">
              <div className="relative w-full">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  <Icon name="Search" size={20} />
                </Button>

                <input
                  type="text"
                  placeholder="Поиск по объявлениям..."
                  className="w-full pl-4 pr-6 py-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Правая часть: Иконки */}
            <div className="flex items-center space-x-2">
              <div className="flex flex-col gap-4">
                <ExpandableTabsAvito
                  tabs={tabs}
                  activeIndex={activeTabIndex}
                  onChange={handleTabChange}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="p-2 rounded-full cursor-pointer hover:bg-gray-100 transition">
                    <div className="flex items-center justify-center bg-blue-600 text-white w-11 h-11 rounded-full text-lg font-medium hover:bg-blue-700 transition-colors">
                      ИП
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem
                    onClick={() => navigate("/avito/profile")}
                    className="cursor-pointer"
                  >
                    <Icon name="User" size={16} className="mr-2" />
                    Профиль
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => navigate("/avito/profile/ads")}
                    className="cursor-pointer"
                  >
                    <Icon name="Package" size={16} className="mr-2" />
                    Мои объявления
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => navigate("/avito/profile/messages")}
                    className="cursor-pointer"
                  >
                    <Icon name="MessageCircle" size={16} className="mr-2" />
                    Сообщения
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

export default AvitoHeader;
