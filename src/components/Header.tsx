import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
                POTIONMARKET
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
            {/* Categories Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <Icon name="Menu" size={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-96 p-0">
                <div className="flex">
                  {/* Categories List */}
                  <div className="w-48 border-r border-gray-100">
                    <div className="p-3 border-b border-gray-100">
                      <h3 className="font-semibold text-sm text-gray-900">
                        Все категории
                      </h3>
                    </div>
                    <div className="py-1">
                      <div className="px-3 py-2 text-sm text-blue-600 bg-blue-50 border-l-2 border-blue-600 flex items-center">
                        <Icon name="Smartphone" size={16} className="mr-2" />
                        Электроника
                      </div>
                      <div className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center cursor-pointer">
                        <Icon name="Shirt" size={16} className="mr-2" />
                        Одежда
                      </div>
                      <div className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center cursor-pointer">
                        <Icon name="Home" size={16} className="mr-2" />
                        Дом и сад
                      </div>
                      <div className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center cursor-pointer">
                        <Icon name="Baby" size={16} className="mr-2" />
                        Детские товары
                      </div>
                      <div className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center cursor-pointer">
                        <Icon name="Heart" size={16} className="mr-2" />
                        Красота и здоровье
                      </div>
                      <div className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center cursor-pointer">
                        <Icon name="Laptop" size={16} className="mr-2" />
                        Бытовая техника
                      </div>
                      <div className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center cursor-pointer">
                        <Icon name="Dumbbell" size={16} className="mr-2" />
                        Спорт и отдых
                      </div>
                      <div className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center cursor-pointer">
                        <Icon name="Wrench" size={16} className="mr-2" />
                        Строительство и ремонт
                      </div>
                      <div className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center cursor-pointer">
                        <Icon name="Apple" size={16} className="mr-2" />
                        Продукты питания
                      </div>
                      <div className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center cursor-pointer">
                        <Icon name="Fish" size={16} className="mr-2" />
                        Товары для животных
                      </div>
                      <div className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center cursor-pointer">
                        <Icon name="Palmtree" size={16} className="mr-2" />
                        Туризм, рыбалка, охота
                      </div>
                      <div className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center cursor-pointer">
                        <Icon name="Car" size={16} className="mr-2" />
                        Автотовары
                      </div>
                      <div className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center cursor-pointer">
                        <Icon name="Sofa" size={16} className="mr-2" />
                        Мебель
                      </div>
                    </div>
                  </div>

                  {/* Subcategories */}
                  <div className="w-48 bg-gray-50">
                    <div className="p-3 border-b border-gray-200">
                      <h3 className="font-semibold text-lg text-gray-900">
                        Электроника
                      </h3>
                    </div>
                    <div className="p-3 space-y-4">
                      <div>
                        <h4 className="font-medium text-sm text-gray-900 mb-2">
                          Моноблоки и системные блоки
                        </h4>
                        <div className="space-y-1">
                          <div className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">
                            Моноблоки
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-sm text-gray-900 mb-2">
                          Компьютеры и комплектующие
                        </h4>
                        <div className="space-y-1">
                          <div className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">
                            Моноблоки
                          </div>
                          <div className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">
                            Периферия для компьютеров
                          </div>
                          <div className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">
                            Мониторы и аксессуары
                          </div>
                          <div className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">
                            Сетевое оборудование
                          </div>
                          <div className="text-sm text-blue-600 cursor-pointer">
                            Еще ↓
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-sm text-gray-900 mb-2">
                          Навигаторы
                        </h4>
                        <div className="space-y-1">
                          <div className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">
                            Автомобильные навигаторы
                          </div>
                          <div className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">
                            Туристические навигаторы
                          </div>
                          <div className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">
                            Аксессуары
                          </div>
                          <div className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">
                            Электронные компасы
                          </div>
                          <div className="text-sm text-blue-600 cursor-pointer">
                            Еще ↓
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0 rounded-full">
                  <div className="flex items-center justify-center bg-blue-600 text-white w-8 h-8 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">
                    АП
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                  onClick={() => navigate("/profile")}
                  className="cursor-pointer"
                >
                  <Icon name="User" size={16} className="mr-2" />
                  Профиль
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigate("/profile?tab=orders")}
                  className="cursor-pointer"
                >
                  <Icon name="Package" size={16} className="mr-2" />
                  Заказы
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigate("/profile?tab=reviews")}
                  className="cursor-pointer"
                >
                  <Icon name="MessageCircle" size={16} className="mr-2" />
                  Мои отзывы
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
  );
};

export default Header;
