import AvitoHeader from "@/components/avitomarket/AvitoHeader";
import AvitoFooter from "@/components/avitomarket/AvitoFooter";
import AvitoProductSwiper from "@/components/avitomarket/AvitoProductSwiper";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AvitoMain = () => {
  const navigate = useNavigate();

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
      title: "iPhone 14 Pro 128GB Space Black",
      price: 85000,
      location: "Москва",
      image:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=200&fit=crop",
      time: "2 часа назад",
      isVip: true,
    },
    {
      id: 2,
      title: "Volkswagen Golf 2019 года",
      price: 1850000,
      location: "Санкт-Петербург",
      image:
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=300&h=200&fit=crop",
      time: "5 часов назад",
    },
    {
      id: 3,
      title: "Диван угловой раскладной",
      price: 25000,
      location: "Екатеринбург",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
      time: "1 день назад",
    },
    {
      id: 4,
      title: "MacBook Air M2 256GB",
      price: 95000,
      location: "Новосибирск",
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=200&fit=crop",
      time: "2 дня назад",
    },
    {
      id: 5,
      title: "Samsung Galaxy S23 Ultra",
      price: 75000,
      location: "Казань",
      image:
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300&h=200&fit=crop",
      time: "3 дня назад",
      isVip: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AvitoHeader />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 text-white py-20 pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Найдите всё, что нужно
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Покупайте и продавайте на крупнейшей площадке объявлений России
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/avito/sell")}
            className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4 h-auto"
          >
            <Icon name="Plus" size={20} className="mr-2" />
            Подать объявление бесплатно
          </Button>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Categories */}
        <section>
          <h2 className="text-3xl font-bold mb-12 text-center">
            Популярные категории
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {categories.map((category) => (
              <Card
                key={category.name}
                className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-32"
              >
                <CardContent className="p-6 text-center h-full flex flex-col justify-center">
                  <div
                    className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <Icon
                      name={category.icon as any}
                      size={28}
                      className="text-white"
                    />
                  </div>
                  <h3 className="font-medium text-sm">{category.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Product Swiper */}
        <AvitoProductSwiper ads={recentAds} title="🔥 Горячие предложения" />
      </div>

      <AvitoFooter />
    </div>
  );
};

export default AvitoMain;
