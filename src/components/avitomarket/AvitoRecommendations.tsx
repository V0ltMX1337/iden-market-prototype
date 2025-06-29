import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { storeApi } from "@/lib/store";
import type { Category } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

type Ad = {
  id: number;
  title: string;
  price: number;
  location: string;
  image: string;
  time: string;
  isVip: boolean;
};

const AvitoRecommendations = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [ads, setAds] = useState<Ad[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalCategories: 0,
    totalCities: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        // Получаем категории
        const categoriesData = await storeApi.getCategories();
        setCategories(categoriesData);

        // Получаем статистику с бэка, если есть такой эндпоинт (иначе можно убрать)
        const statsData = await storeApi.getStats?.(); // пример, если есть
        if (statsData) {
          setStats(statsData);
        } else {
          setStats({
            totalUsers: 100, // можно убрать или заменить реальными данными
            activeUsers: 50,
            totalCategories: categoriesData.length,
            totalCities: 10,
          });
        }

        // Получаем объявления с бэка
        const adsData = await storeApi.getAds({ limit: 8 }); // предположим, есть такой метод с лимитом
        setAds(adsData);

      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <section className="py-10 px-4">
      <h2 className="text-2xl font-bold mb-6">Рекомендации для вас</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {ads.map((ad) => (
          <Card
            key={ad.id}
            className="overflow-hidden cursor-pointer group relative"
            onClick={() => navigate(`/avito/product/${ad.id}`)}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10 bg-white/70 hover:bg-white"
              onClick={(e) => {
                e.stopPropagation();
                console.log("Добавлено в избранное:", ad.id);
                // Здесь можешь добавить вызов API для избранного
              }}
            >
              <Heart className="w-5 h-5 text-red-500" />
            </Button>

            <img
              src={ad.image}
              alt={ad.title}
              className="w-full h-40 object-cover"
            />
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-1">{ad.title}</h3>
              <p className="text-gray-600 text-sm">{ad.location}</p>
              <p className="text-blue-600 font-bold mt-2">
                {ad.price.toLocaleString()} ₽
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default AvitoRecommendations;
