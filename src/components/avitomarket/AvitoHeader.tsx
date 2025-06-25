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
import { useNavigate, useLocation } from "react-router-dom";
import { ExpandableTabs } from "@/lib/expandable-tabs";
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
} from "lucide-react";

const AvitoHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  // Симулируем авторизованного пользователя для профиля
  const isProfilePage = location.pathname.startsWith("/avito/profile");
  const user = isProfilePage ? { firstName: "Иван", lastName: "Петров" } : null;

  const authorizedTabs = [
    {
      title: "Главная профиля",
      icon: User,
      action: () => navigate("/avito/profile"),
    },
    {
      title: "Мои объявления",
      icon: Package,
      action: () => navigate("/avito/profile/ads"),
    },
    {
      title: "Избранное",
      icon: Heart,
      action: () => navigate("/avito/profile/favorites"),
    },
    {
      title: "Сообщения",
      icon: MessageCircle,
      action: () => navigate("/avito/profile/messages"),
    },
    { type: "separator" },
    {
      title: "Заказы",
      icon: ShoppingBag,
      action: () => navigate("/avito/profile/orders"),
    },
    {
      title: "Корзина",
      icon: ShoppingCart,
      action: () => navigate("/avito/profile/cart"),
    },
    { type: "separator" },
    {
      title: "Поддержка",
      icon: HelpCircle,
      action: () => navigate("/avito/support"),
    },
    {
      title: "О нас",
      icon: Info,
      action: () => navigate("/avito/about"),
    },
  ];

  const guestTabs = [
    {
      title: "Войти",
      icon: LogIn,
      action: () => navigate("/avito/login"),
    },
    {
      title: "Регистрация",
      icon: UserPlus,
      action: () => navigate("/avito/register"),
    },
  ];

  return (
    <div className="h-[80px]">
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 shadow-lg">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-20">
            {/* Левая часть: Лого */}
            <div className="flex items-center">
              <h1
                className="text-3xl text-white cursor-pointer font-extrabold"
                onClick={() => navigate("/avito")}
              >
                <FancyText
                  gradient={{ from: "#ffffff", to: "#f0f9ff", type: "linear" }}
                  animateTo={{ from: "#dbeafe", to: "#ffffff" }}
                  animateDuration={2000}
                >
                  AVITO
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
            <div className="flex items-center space-x-4">
              <ExpandableTabs
                tabs={user ? authorizedTabs : guestTabs}
                className="text-white"
                activeColor="#ffffff"
              />

              {user && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="p-1 rounded-full cursor-pointer hover:bg-white/10 transition">
                      <div className="flex items-center justify-center bg-white text-blue-600 w-10 h-10 rounded-full text-sm font-bold hover:bg-gray-100 transition-colors">
                        {user.firstName?.charAt(0) || "U"}
                        {user.lastName?.charAt(0) || ""}
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
                      onClick={() => navigate("/avito/sell")}
                      className="cursor-pointer"
                    >
                      <Icon name="Package" size={16} className="mr-2" />
                      Подать объявление
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer text-red-600 hover:text-red-700">
                      <Icon name="LogOut" size={16} className="mr-2" />
                      Выйти
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              <Button
                onClick={() => navigate("/avito/sell")}
                className="bg-white text-blue-600 hover:bg-gray-100 font-medium"
              >
                <Icon name="Plus" size={16} className="mr-2" />
                Подать объявление
              </Button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default AvitoHeader;
