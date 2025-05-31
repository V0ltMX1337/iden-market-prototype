import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const Header = () => {
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
            <a href="#" className="hover:text-primary">
              Войти
            </a>
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary">IdenMarket</h1>
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
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-2"
            >
              <Icon name="ShoppingCart" size={20} />
              <span className="hidden sm:inline">Корзина</span>
              <Badge variant="destructive" className="ml-1">
                3
              </Badge>
            </Button>
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
