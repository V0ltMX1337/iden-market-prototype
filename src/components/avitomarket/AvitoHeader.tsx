import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import FancyText from "@carefully-coded/react-text-gradient";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ExpandableTabsAvito } from "@/lib/expandable-tabs-avito";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { storeApi } from "@/lib/store";
import { useAuth } from "@/hooks/useAuth";

const AvitoHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const { user, isLoading } = useAuth();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await storeApi.getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Ошибка загрузки категорий:", error);
      }
    };
    loadCategories();
  }, []);

  const avitoCategories = categories;

  // Храним индекс активного таба, синхронизируем с URL
  const [activeTabIndex, setActiveTabIndex] = useState<number | null>(null);

  const authorizedTabs = [
    {
      title: "Главная",
      icon: Home,
      path: "/avito",
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
    const tabs = user ? authorizedTabs : guestTabs;

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
  }, [location.pathname, user]);

  // Обработчик изменения таба
  const handleTabChange = (index: number | null) => {
    if (index === null) return;
    const tabs = user ? authorizedTabs : guestTabs;
    const tab = tabs[index];
    if ("path" in tab && tab.path) {
      navigate(tab.path);
    }
    setActiveTabIndex(index);
  };

  const tabs = user ? authorizedTabs : guestTabs;

  if (isLoading) {
    return (
      <div className="h-[80px] bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600"></div>
    );
  }

  return (
    <div className="h-[80px]">
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 shadow-lg">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-20">
            {/* Левая часть: Лого */}
            <div className="flex items-center space-x-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="p-2 hover:bg-white/10 rounded-lg cursor-pointer">
                    <Icon name="Grid3X3" size={20} className="text-white" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="w-[20rem] p-0 overflow-visible z-[999]"
                >
                  <div className="px-4 py-3 text-sm font-semibold border-b">
                    Категории
                  </div>
                  <AvitoCategroyMenu categories={avitoCategories} />
                </DropdownMenuContent>
              </DropdownMenu>
              <h1
                className="text-3xl text-white cursor-pointer font-extrabold"
                onClick={() => navigate("/avito")}
              >
                <FancyText
                  gradient={{ from: "#ffffff", to: "#f0f9ff", type: "linear" }}
                  animateTo={{ from: "#dbeafe", to: "#ffffff" }}
                  animateDuration={2000}
                >
                  TRIVO
                </FancyText>
              </h1>
              <Badge
                variant="secondary"
                className="ml-3 text-sm px-3 py-1 bg-white/20 text-white border-0"
              >
                объявления
              </Badge>
            </div>

            {/* Центр: Поиск */}
            <div className="flex-1 px-10 max-w-2xl">
              <div className="relative w-full">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <Icon name="Search" size={20} />
                </Button>

                <input
                  type="text"
                  placeholder="Поиск по объявлениям..."
                  className="w-full pl-4 pr-12 py-3 text-base border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Правая часть */}
            <div className="flex flex-col gap-4">
              <ExpandableTabsAvito
                tabs={tabs}
                className="text-white"
                activeColor="#ffffff"
                activeIndex={activeTabIndex}
                onChange={handleTabChange}
              />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default AvitoHeader;
