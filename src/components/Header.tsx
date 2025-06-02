import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const user = {
    firstName: "Potion",
    lastName: "Market",
    avatar: "",
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main header */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1
              className="text-2xl font-bold text-gray-900 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => navigate("/")}
            >
              PotionMarket
            </h1>
            <Badge
              variant="secondary"
              className="ml-2 text-xs bg-blue-100 text-blue-700"
            >
              beta
            </Badge>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <Input
                placeholder="Поиск товаров..."
                className="w-full h-10 pl-4 pr-10 bg-gray-50 border-0 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <Button
                size="sm"
                variant="ghost"
                className="absolute right-1 top-1 h-8 w-8 p-0 hover:bg-transparent"
              >
                <Icon name="Search" size={16} className="text-gray-400" />
              </Button>
            </div>
          </div>

          {/* User actions */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 h-10"
            >
              <Icon name="Heart" size={20} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 h-10 relative"
            >
              <Icon name="ShoppingCart" size={20} />
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 text-xs"
              >
                3
              </Badge>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/buyer/profile")}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 h-10 px-3"
            >
              <Avatar className="w-6 h-6">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="text-xs bg-blue-100 text-blue-700">
                  {user.firstName[0]}
                  {user.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{user.firstName}</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
