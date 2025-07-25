import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { storeApi } from "@/lib/store";
import { AdStatus, type Ad } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const AvitoRecommendations = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const adsData = await storeApi.getAds();
        // Фильтруем только активные объявления
        const activeAds = adsData.filter((ad) => ad.adStatus === AdStatus.ACTIVE);
        setAds(activeAds);
      } catch (error) {
        console.error("Ошибка при загрузке объявлений:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAds();
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
      {ads.length === 0 ? (
        <p className="text-center text-gray-500">Объявления не найдены</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {ads.map((ad) => (
            <Card
              key={ad.id}
              className="overflow-hidden cursor-pointer group relative"
              onClick={() => navigate(`/product/${ad.id}`)}
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
                src={ad.links?.[0] || "/placeholder.png"}
                alt={ad.title}
                className="w-full h-40 object-cover"
              />

              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-1">{ad.title}</h3>
                <p className="text-gray-600 text-sm">{ad.city?.name}</p>
                <p className="text-blue-600 font-bold mt-2">
                  {ad.price.toLocaleString()} ₽
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
};

export default AvitoRecommendations;
