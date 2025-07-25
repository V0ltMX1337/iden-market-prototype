import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { storeApi } from "@/lib/store";
import { useAuth } from "@/hooks/useAuth";
import { AvitoCategoryMenu } from "../customcomponent/AvitoCategoryMenu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ExpandableTabsAvito } from "@/lib/expandable-tabs-avito";
import {
  Home,
  UserCircle,
  Package,
  MessageCircle,
  Heart,
  ShoppingBag,
  ShoppingCart,
  HelpCircle,
  Info,
  LogIn,
  UserPlus,
} from "lucide-react";
import FancyText from "@carefully-coded/react-text-gradient";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Category } from "@/lib/types";
import AvitoHeaderMobile from "./AvitoHeaderMobile";

const AvitoHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, isLoading } = useAuth();
  const [activeTabIndex, setActiveTabIndex] = useState<number | null>(null);

  const authorizedTabs = [
    { title: "Главная", icon: Home, path: "/" },
    { title: "Профиль", icon: UserCircle, path: "/profile" },
    { title: "Мои объявления", icon: Package, path: "/profile/ads" },
    { title: "Сообщения", icon: MessageCircle, path: "/profile/messages" },
    { title: "Избранное", icon: Heart, path: "/profile/favorites" },
    { type: "separator" },
    { title: "Заказы", icon: ShoppingBag, path: "/profile/orders" },
    { title: "Корзина", icon: ShoppingCart, path: "/profile/cart" },
    { type: "separator" },
    { title: "Поддержка", icon: HelpCircle, path: "/support" },
    { title: "О нас", icon: Info, path: "/about" },
  ];

  const guestTabs = [
    { title: "Войти", icon: LogIn, path: "/login" },
    { title: "Регистрация", icon: UserPlus, path: "/register" },
  ];

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

  useEffect(() => {
    const tabs = user ? authorizedTabs : guestTabs;
    let bestMatchIndex: number | null = null;
    let bestMatchLength = -1;

    tabs.forEach((tab, index) => {
      if ("path" in tab && typeof tab.path === "string") {
        if (
          location.pathname.startsWith(tab.path) &&
          tab.path.length > bestMatchLength
        ) {
          bestMatchIndex = index;
          bestMatchLength = tab.path.length;
        }
      }
    });

    setActiveTabIndex(bestMatchIndex);
  }, [location.pathname, user]);

  const handleTabChange = (index: number | null) => {
    if (index === null) return;
    const tabs = user ? authorizedTabs : guestTabs;
    const tab = tabs[index];
    if ("path" in tab && tab.path) {
      navigate(tab.path);
    }
    setActiveTabIndex(index);
  };

  if (isLoading) {
    return (
      <div className="h-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600" />
    );
  }

  return (
    <>
      {/* Мобильный хедер */}
      <div className="block sm:hidden">
        <AvitoHeaderMobile />
      </div>

      {/* Десктопный хедер */}
      <div className="hidden sm:block">
        <div className="h-auto">
          <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 shadow-lg">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
              <div className="flex flex-wrap items-center justify-between h-20 gap-y-4 sm:gap-y-0">
                {/* Левая часть */}
                <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="p-2 hover:bg-white/10 rounded-lg cursor-pointer">
                        <Icon name="Grid3X3" size={20} className="text-white" />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="start"
                      className="w-full max-w-xs sm:w-[18rem] bg-white/95 backdrop-blur-sm border border-gray-200 shadow-2xl rounded-xl p-0"
                      sideOffset={12}
                    >
                      <div className="px-4 py-3 text-base font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent border-b border-gray-100 whitespace-nowrap">
                        ✨ Категории
                      </div>
                      <AvitoCategoryMenu categories={categories} />
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <h1
                    className="text-xl sm:text-3xl text-white font-extrabold cursor-pointer whitespace-nowrap"
                    onClick={() => navigate("/")}
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
                    className="text-xs sm:text-sm px-2 sm:px-3 py-1 bg-white/20 text-white border-0 whitespace-nowrap"
                  >
                    объявления
                  </Badge>
                </div>

                {/* Центр: Поиск */}
                <div className="w-full sm:flex-1 sm:px-8">
                  <div className="relative w-full max-w-full">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      aria-label="Поиск"
                    >
                      <Icon name="Search" size={20} />
                    </Button>

                    <input
                      type="text"
                      placeholder="Поиск по объявлениям..."
                      className="w-full pl-4 pr-12 py-3 text-base rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 border-0"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {/* Правая часть: Вкладки */}
                <div className="w-full sm:w-auto mt-2 sm:mt-0">
                  <ExpandableTabsAvito
                    tabs={user ? authorizedTabs : guestTabs}
                    className="text-white"
                    activeColor="#ffffff"
                    activeIndex={user ? activeTabIndex : null}
                    onChange={handleTabChange}
                    isGuest={!user}
                  />
                </div>
              </div>
            </div>
          </header>
        </div>
      </div>
      <div className="block sm:block h-16 sm:h-20" />
    </>
  );
};

export default AvitoHeader;
