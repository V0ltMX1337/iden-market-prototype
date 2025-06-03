import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-200">
      {/* Top navigation bar */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10 text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center text-gray-600">
                <Icon name="MapPin" size={14} className="mr-1" />
                Россия
              </div>
            </div>
            <div className="flex items-center space-x-6 text-gray-600">
              <a href="#" className="hover:text-blue-600">
                Создать магазин
              </a>
              <a href="#" className="hover:text-blue-600">
                Управление магазином
              </a>
              <a href="#" className="hover:text-blue-600">
                Новинки
              </a>
              <a href="#" className="hover:text-blue-600">
                Для поставщиков
              </a>
              <a href="#" className="hover:text-blue-600">
                Помощь
              </a>
              <a href="#" className="hover:text-blue-600">
                Поддержка
              </a>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-yellow-400 rounded-full mr-1 text-sm font-normal"></span>
                <span>Светлая</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and breadcrumb */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <Icon name="Grid3X3" size={24} className="text-blue-600 mr-2" />
              <h1
                className="text-2xl text-blue-600 cursor-pointer px-[1px] my-1 py-0 mx-0 font-extrabold text-center"
                onClick={() => navigate("/")}
              >
                POTIONMARKETS
              </h1>
              <Badge variant="secondary" className="ml-2 text-xs">
                beta
              </Badge>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Icon name="Globe" size={16} className="text-yellow-500 mr-1" />
              <span>Везде</span>
              <Icon name="ChevronRight" size={16} className="mx-1" />
              <span>Искать на PotionMarket...</span>
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="p-2">
              <Icon name="Search" size={20} />
            </Button>
            <Button variant="ghost" size="sm" className="p-2">
              <Icon name="Heart" size={20} />
            </Button>
            <Button variant="ghost" size="sm" className="p-2">
              <Icon name="Package" size={20} />
            </Button>
            <Button variant="ghost" size="sm" className="p-2">
              <Icon name="MessageCircle" size={20} />
            </Button>
            <Button variant="ghost" size="sm" className="p-2 relative">
              <Icon name="ShoppingCart" size={20} />
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                1
              </span>
            </Button>
            <div className="flex items-center bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
              <span>АП</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
