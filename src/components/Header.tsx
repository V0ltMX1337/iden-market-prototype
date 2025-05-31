import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import Cart from "@/components/Cart";

const Header = () => {
  const navigate = useNavigate();

  // Mock user data - in real app would come from context/store
  const user = {
    firstName: "Анна",
    lastName: "Покупатель",
    avatar: "",
  };

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex items-center justify-between py-2 text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <span>📍 Москва</span>
            <span>•</span>
            <a href="#" className="hover:text-primary">
              Доставка и оплата
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-primary">
              Помощь
            </a>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/buyer/profile")}
              className="flex items-center space-x-2 hover:text-primary"
            >
              <Avatar className="w-6 h-6">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="text-xs">
                  {user.firstName[0]}
                  {user.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <span>
                {user.firstName} {user.lastName}
              </span>
            </Button>
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <h1
              className="text-2xl font-bold text-primary cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => navigate("/")}
            >
              IdenMarket
            </h1>
            <Badge variant="secondary" className="ml-2 text-xs">
              beta
            </Badge>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Input
                placeholder="Найти товары, бренды и магазины"
                className="pr-12 h-12 text-base"
              />
              <Button size="sm" className="absolute right-1 top-1 h-10">
                <Icon name="Search" size={16} />
              </Button>
            </div>
          </div>

          {/* User actions */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-2"
            >
              <Icon name="Heart" size={20} />
              <span className="hidden sm:inline">Избранное</span>
            </Button>
            <Cart />
          </div>
        </div>

        {/* Navigation */}
        <nav className="py-3">
          <div className="flex items-center space-x-8 text-sm">
            <a
              href="#"
              className="flex items-center space-x-1 text-primary font-medium"
            >
              <Icon name="Menu" size={16} />
              <span>Каталог</span>
            </a>
            <a href="#" className="hover:text-primary">
              Электроника
            </a>
            <a href="#" className="hover:text-primary">
              Одежда
            </a>
            <a href="#" className="hover:text-primary">
              Дом и сад
            </a>
            <a href="#" className="hover:text-primary">
              Спорт
            </a>
            <a href="#" className="hover:text-primary">
              Красота
            </a>
            <a href="#" className="hover:text-primary">
              Авто
            </a>
            <a href="#" className="hover:text-primary text-orange-500">
              🔥 Акции
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
