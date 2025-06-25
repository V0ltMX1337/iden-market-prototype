import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const AvitoMain = () => {
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

  const categories = [
    { name: "Транспорт", icon: "Car", color: "bg-blue-500" },
    { name: "Недвижимость", icon: "Home", color: "bg-green-500" },
    { name: "Работа", icon: "Briefcase", color: "bg-purple-500" },
    { name: "Услуги", icon: "Wrench", color: "bg-orange-500" },
    { name: "Личные вещи", icon: "Shirt", color: "bg-pink-500" },
    { name: "Для дома", icon: "Sofa", color: "bg-indigo-500" },
    { name: "Электроника", icon: "Smartphone", color: "bg-red-500" },
    { name: "Хобби", icon: "Palette", color: "bg-yellow-500" },
  ];

  const recentAds = [
    {
      id: 1,
      title: "iPhone 14 Pro 128GB",
      price: 85000,
      location: "Москва",
      image:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=200&fit=crop",
      time: "2 часа назад",
    },
    {
      id: 2,
      title: "Volkswagen Golf 2019",
      price: 1850000,
      location: "Санкт-Петербург",
      image:
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=300&h=200&fit=crop",
      time: "5 часов назад",
    },
    {
      id: 3,
      title: "Диван угловой",
      price: 25000,
      location: "Екатеринбург",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
      time: "1 день назад",
    },
    {
      id: 4,
      title: "MacBook Air M2",
      price: 95000,
      location: "Новосибирск",
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=200&fit=crop",
      time: "2 дня назад",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="text-2xl font-bold text-blue-600">AVITO</div>
              <div className="hidden md:flex items-center space-x-1">
                <Icon name="MapPin" size={16} className="text-gray-500" />
                <span className="text-sm text-gray-700">Вся Россия</span>
                <Icon name="ChevronDown" size={16} className="text-gray-500" />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/avito/profile")}
                    className="hidden sm:flex items-center space-x-2"
                  >
                    <Icon name="User" size={16} />
                    <span>
                      {user.firstName} {user.lastName}
                    </span>
                  </Button>
                  <Button
                    onClick={() => navigate("/avito/sell")}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Icon name="Plus" size={16} className="mr-2" />
                    Подать объявление
                  </Button>
                </>
              ) : (
                <>
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
                    Подать объявление
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Найдите всё, что нужно
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Покупайте и продавайте на крупнейшей площадке объявлений
          </p>

          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Input
                  placeholder="Что вы ищете?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12 pr-12 text-gray-900"
                />
                <Icon
                  name="Search"
                  size={20}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                />
              </div>
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 h-12 px-8"
              >
                Найти
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Популярные категории
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.map((category) => (
              <Card
                key={category.name}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center mx-auto mb-3`}
                  >
                    <Icon
                      name={category.icon as any}
                      size={24}
                      className="text-white"
                    />
                  </div>
                  <h3 className="font-medium text-sm">{category.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Recent Ads */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Свежие объявления</h2>
            <Button variant="outline">Показать все</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentAds.map((ad) => (
              <Card
                key={ad.id}
                className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={ad.image}
                    alt={ad.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 line-clamp-2">
                    {ad.title}
                  </h3>
                  <p className="text-2xl font-bold text-green-600 mb-2">
                    {ad.price.toLocaleString()} ₽
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center">
                      <Icon name="MapPin" size={14} className="mr-1" />
                      {ad.location}
                    </span>
                    <span>{ad.time}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4">AVITO</div>
              <p className="text-gray-400">
                Крупнейшая площадка объявлений в России
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Покупателям</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Как покупать</li>
                <li>Безопасность</li>
                <li>Правила</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Продавцам</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Как продавать</li>
                <li>Тарифы</li>
                <li>Помощь</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Компания</h3>
              <ul className="space-y-2 text-gray-400">
                <li>О нас</li>
                <li>Контакты</li>
                <li>Вакансии</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AvitoMain;
