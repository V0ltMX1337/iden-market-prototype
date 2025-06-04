import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm">
      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1
              className="text-2xl font-bold cursor-pointer flex items-center"
              onClick={() => navigate("/")}
            >
              <span className="text-purple-600">T</span>
              <span className="text-gray-900">zarmarket</span>
            </h1>
          </div>

          {/* Center section with catalog button and search */}
          <div className="flex items-center space-x-3 flex-1 max-w-2xl mx-8">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
              Каталог
            </Button>

            <div className="flex-1 relative">
              <div className="relative flex">
                <input
                  type="text"
                  placeholder="Поиск"
                  className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <Button className="px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-r-lg border-l-0">
                  <Icon name="Search" size={16} />
                </Button>
              </div>
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-6">
            <div className="flex flex-col items-center text-gray-500 hover:text-blue-600 cursor-pointer">
              <Icon name="User" size={20} />
              <span className="text-xs mt-1">Войти</span>
            </div>

            <div className="flex flex-col items-center text-gray-500 hover:text-blue-600 cursor-pointer">
              <Icon name="Heart" size={20} />
              <span className="text-xs mt-1">Избранное</span>
            </div>

            <div className="flex flex-col items-center text-gray-500 hover:text-blue-600 cursor-pointer">
              <div className="relative">
                <Icon name="ShoppingCart" size={20} />
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center p-0 text-xs"
                >
                  1
                </Badge>
              </div>
              <span className="text-xs mt-1">Заказы</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-8 h-12">
            <a
              href="#"
              className="flex items-center text-gray-600 hover:text-blue-600 text-sm"
            >
              <Icon name="Gamepad2" size={16} className="mr-2" />
              Игры
            </a>
            <a
              href="#"
              className="flex items-center text-gray-600 hover:text-blue-600 text-sm"
            >
              <Icon name="Laptop" size={16} className="mr-2" />
              Программы
            </a>
            <a
              href="#"
              className="flex items-center text-gray-600 hover:text-blue-600 text-sm"
            >
              <Icon name="Shield" size={16} className="mr-2" />
              Сервисы и подписки
            </a>
            <a
              href="#"
              className="flex items-center text-gray-600 hover:text-blue-600 text-sm"
            >
              <Icon name="Globe" size={16} className="mr-2" />
              Цифровые товары
            </a>
            <a
              href="#"
              className="flex items-center text-gray-600 hover:text-blue-600 text-sm"
            >
              <Icon name="Book" size={16} className="mr-2" />
              Электронные книги
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
