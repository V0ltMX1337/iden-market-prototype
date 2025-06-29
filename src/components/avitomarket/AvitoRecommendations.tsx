import InfiniteScroll from "react-infinite-scroll-component";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { storeApi } from "@/lib/store";
import type { Category } from "@/lib/types";

const AvitoRecommendations = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalCategories: 0,
    totalCities: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoriesData, statsData] = await Promise.all([
          storeApi.getCategories(),
          storeApi.getStats(),
        ]);
        setCategories(categoriesData);
        setStats(statsData);
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

  // Генерируем реальные объявления на основе категорий
  const generateAdsFromCategories = () => {
    const mockAds = [];
    const imageIds = [
      "592750475338-74b7b21085ab", // phone
      "517336714731-489689fd1ca8", // laptop
      "586769135042-13d6fea7c425", // car
      "549406564-beb7ffc4b4b6", // furniture
      "571019031-34b6e4a7c3f2", // clothing
    ];

    categories.slice(0, 8).forEach((category, index) => {
      const price = Math.floor(Math.random() * 100000) + 5000;
      mockAds.push({
        id: index + 1,
        title: `${category.name} - отличное состояние`,
        price,
        location: "Москва",
        image: `https://images.unsplash.com/photo-1${imageIds[index % imageIds.length]}?w=300&h=200&fit=crop`,
        time: `${Math.floor(Math.random() * 24) + 1} час назад`,
        isVip: Math.random() > 0.7,
      });
    });

    return mockAds;
  };

  const ads = generateAdsFromCategories();
  const navigate = useNavigate();

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
