import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import Cart from "@/components/Cart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Icon from "@/components/ui/icon";

const Header = () => {
  const navigate = useNavigate();

  const categories = [
    { name: "📱 Электроника", href: "/category/electronics" },
    { name: "👔 Одежда", href: "/category/clothing" },
    { name: "🏠 Дом и сад", href: "/category/home" },
    { name: "🚗 Автотовары", href: "/category/auto" },
    { name: "⚽ Спорт", href: "/category/sport" },
    { name: "📚 Книги", href: "/category/books" },
    { name: "🎮 Игры", href: "/category/games" },
  ];

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary">PotionMarket</h1>
              <Badge variant="secondary" className="ml-2 text-xs">
                beta
              </Badge>
            </div>

            {/* Categories Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <Icon name="Grid3X3" size={16} />
                  <span>Категории</span>
                  <Icon name="ChevronDown" size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category.name}
                    className="cursor-pointer"
                  >
                    {category.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-primary">
              О платформе
            </a>
            <a href="#categories" className="text-gray-600 hover:text-primary">
              Категории
            </a>
            <a href="#sellers" className="text-gray-600 hover:text-primary">
              Продавцам
            </a>
            <div className="flex items-center space-x-2">
              <Cart />

              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-10 h-10 rounded-full p-0 bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    АП
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48" align="end">
                  <DropdownMenuItem className="cursor-pointer">
                    <Icon name="User" className="mr-2 h-4 w-4" />
                    Профиль
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Icon name="Package" className="mr-2 h-4 w-4" />
                    Заказы
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Icon name="MessageSquare" className="mr-2 h-4 w-4" />
                    Мои отзывы
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => navigate("/login")}
                  >
                    <Icon name="LogIn" className="mr-2 h-4 w-4" />
                    Войти
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="outline" onClick={() => navigate("/register")}>
                Регистрация
              </Button>
              <Button onClick={() => navigate("/login")}>Войти</Button>
              <Button variant="ghost" onClick={() => navigate("/marketplace")}>
                Каталог
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
