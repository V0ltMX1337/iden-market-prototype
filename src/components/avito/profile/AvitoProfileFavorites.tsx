import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const AvitoProfileFavorites = () => {
  const favorites = [
    {
      id: 1,
      title: "Volkswagen Golf 2019",
      price: 1850000,
      location: "Санкт-Петербург",
      image:
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=300&h=200&fit=crop",
      time: "5 часов назад",
    },
    {
      id: 2,
      title: "Квартира 2-к",
      price: 8500000,
      location: "Москва",
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&h=200&fit=crop",
      time: "1 день назад",
    },
    {
      id: 3,
      title: "Samsung Galaxy S23",
      price: 55000,
      location: "Екатеринбург",
      image:
        "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=300&h=200&fit=crop",
      time: "2 дня назад",
    },
    {
      id: 4,
      title: "Кресло офисное",
      price: 12000,
      location: "Новосибирск",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
      time: "3 дня назад",
    },
    {
      id: 5,
      title: "Электросамокат",
      price: 35000,
      location: "Казань",
      image:
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop",
      time: "1 неделю назад",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Избранное</h1>
        <span className="text-gray-600">{favorites.length} товаров</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((item) => (
          <Card
            key={item.id}
            className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden"
          >
            <div className="aspect-[4/3] overflow-hidden relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
              <Button
                size="sm"
                variant="secondary"
                className="absolute top-2 right-2 p-2 h-auto bg-white/90 hover:bg-white"
              >
                <Icon
                  name="Heart"
                  size={16}
                  className="text-red-500 fill-current"
                />
              </Button>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2 line-clamp-2">{item.title}</h3>
              <p className="text-2xl font-bold text-green-600 mb-2">
                {item.price.toLocaleString()} ₽
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span className="flex items-center">
                  <Icon name="MapPin" size={14} className="mr-1" />
                  {item.location}
                </span>
                <span>{item.time}</span>
              </div>
              <div className="flex gap-2 mt-4">
                <Button size="sm" className="flex-1">
                  Посмотреть
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="MessageCircle" size={14} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AvitoProfileFavorites;
