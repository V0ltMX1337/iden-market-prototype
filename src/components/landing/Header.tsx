import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import Cart from "@/components/Cart";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary">PotionMarket</h1>
            <Badge variant="secondary" className="ml-2 text-xs">
              beta
            </Badge>
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
