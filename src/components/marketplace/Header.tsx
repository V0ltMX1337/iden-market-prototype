import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm">
      {/* Top navigation bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10 text-sm">
            <div className="flex items-center space-x-1">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-3 py-1 h-7 rounded">
                Акции и предложения
              </Button>
            </div>
            <div className="flex items-center space-x-6 text-gray-600 text-xs">
              <span className="hover:text-indigo-600 cursor-pointer">
                Оплата и доставка
              </span>
              <span className="hover:text-indigo-600 cursor-pointer">
                Гарантии и возврат
              </span>
              <span className="hover:text-indigo-600 cursor-pointer">
                Контакты
              </span>
              <span className="hover:text-indigo-600 cursor-pointer">
                О компании
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1
              className="text-3xl font-bold text-gray-900 cursor-pointer mr-8"
              onClick={() => navigate("/")}
            >
              Krypton
            </h1>
          </div>

          {/* Center section with catalog button and search */}
          <div className="flex items-center space-x-4 flex-1 max-w-2xl">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg flex items-center">
              <Icon name="Grid3X3" size={16} className="mr-2" />
              Каталог
            </Button>

            <div className="flex-1 relative">
              <div className="relative flex">
                <input
                  type="text"
                  placeholder="iPhone 12 Pro Max"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <Button className="px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-r-lg border-l-0 py-3">
                  Найти
                </Button>
              </div>
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-8 ml-8">
            <div className="flex flex-col items-center text-gray-600 hover:text-indigo-600 cursor-pointer">
              <div className="relative">
                <Icon name="Heart" size={24} />
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  12
                </Badge>
              </div>
              <span className="text-xs mt-1">Избранное</span>
            </div>

            <div className="flex flex-col items-center text-gray-600 hover:text-indigo-600 cursor-pointer">
              <div className="relative">
                <Icon name="ShoppingCart" size={24} />
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  15
                </Badge>
              </div>
              <span className="text-xs mt-1">Корзина</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
