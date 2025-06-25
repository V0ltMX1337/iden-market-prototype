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
import {
  HelpCircle,
  Shield,
  Heart,
  MessagesSquareIcon,
  Package,
  ShoppingCart,
  User,
  Settings,
  Star,
} from "lucide-react";
import { ExpandableTabs } from "@/lib/expandable-tabs";

const AvitoHeader = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Проверяем авторизацию из куков
  const getUserFromCookies = () => {
    const userCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("trivo_user="));

    if (userCookie) {
      try {
        return JSON.parse(decodeURIComponent(userCookie.split("=")[1]));
      } catch {
        return null;
      }
    }
    return null;
  };

  const user = getUserFromCookies();

  const tabs = [
    {
      title: "Избранное",
      icon: Heart,
      action: () => navigate("/avito/profile/favorites"),
    },
    {
      title: "Сообщения",
      icon: MessagesSquareIcon,
      action: () => navigate("/avito/profile/messages"),
    },
    {
      title: "Объявления",
      icon: Package,
      action: () => navigate("/avito/profile/ads"),
    },
    { type: "separator" },
    {
      title: "Отзывы",
      icon: Star,
      action: () => navigate("/avito/profile/reviews"),
    },
    {
      title: "Настройки",
      icon: Settings,
      action: () => navigate("/avito/profile/settings"),
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
                  Вся Россия
                </div>
              </div>
              <div className="flex items-center space-x-8 text-gray-600">
                <a href="#" className="hover:text-green-600">
                  Бизнес
                </a>
                <a href="#" className="hover:text-green-600">
                  Безопасность
                </a>
                <a href="#" className="hover:text-green-600">
                  Помощь
                </a>
                <a href="#" className="hover:text-green-600">
                  Реклама
                </a>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-1" />
                  <span>Светлая</span>
                </div>
              </div>
            </div>
          </div>

          {/* Нижняя панель */}
          <div className="px-6 lg:px-10 py-4 flex items-center justify-between">
            {/* Левая часть: Лого */}
            <div className="flex items-center">
              <h1
                className="text-3xl text-green-600 cursor-pointer px-[1px] my-1 py-0 mx-0 font-extrabold text-center"
                onClick={() => navigate("/avito")}
              >
                <FancyText
                  gradient={{ from: "#059669", to: "#10b981", type: "linear" }}
                  animateTo={{ from: "#047857", to: "#059669" }}
                  animateDuration={2000}
                >
                  AVITO
                </FancyText>
              </h1>
              <Badge variant="secondary" className="ml-3 text-sm px-3 py-1">
                объявления
              </Badge>
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
                  className="w-full pl-4 pr-6 py-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Правая часть: Иконки */}
            <div className="flex items-center space-x-2">
              {user ? (
                <>
                  <div className="flex flex-col gap-4">
                    <ExpandableTabs tabs={tabs} />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="p-2 rounded-full cursor-pointer hover:bg-gray-100 transition">
                        <div className="flex items-center justify-center bg-green-600 text-white w-11 h-11 rounded-full text-lg font-medium hover:bg-green-700 transition-colors">
                          {user.firstName?.charAt(0)}
                          {user.lastName?.charAt(0)}
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
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    onClick={() => navigate("/avito/login")}
                  >
                    Войти
                  </Button>
                  <Button
                    onClick={() => navigate("/avito/sell")}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Icon name="Plus" size={16} className="mr-2" />
                    Подать объявление
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default AvitoHeader;
