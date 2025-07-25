import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { storeApi } from "@/lib/store";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface FavoriteAd {
  id: string;
  title: string;
  price: number;
  location: string;
  image: string;
  publishedAt: string;
}

const AvitoProfileFavorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<FavoriteAd[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    const fetchFavorites = async () => {
      try {
        setLoading(true);

        const favoriteIds: string[] = await storeApi.getFavorites(user.id);
        const favoriteAdsPromises = favoriteIds.map((adId) =>
          storeApi.getAdById(adId)
        );
        const favoriteAds = await Promise.all(favoriteAdsPromises);

        const formattedFavorites: FavoriteAd[] = favoriteAds.map((ad) => ({
          id: ad.id,
          title: ad.title,
          price: ad.price,
          location: ad.city?.name || "Не указано",
          image: ad.links?.[0] || "/images/placeholder.png",
          publishedAt: new Date(ad.publishedAt).toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
        }));

        setFavorites(formattedFavorites);
      } catch (error) {
        console.error("Ошибка при загрузке избранного:", error);
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  const handleRemoveFromFavorites = async (
    adId: string,
    e: React.MouseEvent
  ) => {
    e.stopPropagation(); // предотвращает переход по карточке
  
    try {
      await storeApi.removeFavorite(user!.id, adId);
      setFavorites((prev) => prev.filter((item) => item.id !== adId));
    } catch (err) {
      console.error("Не удалось удалить из избранного:", err);
    }
  };

  if (!user) {
    return (
      <div className="text-center p-6 text-gray-600">
        Пожалуйста, войдите в аккаунт, чтобы просмотреть избранное.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center p-6 text-gray-600">
        Загрузка избранного...
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center p-6 text-gray-600">
        У вас пока нет избранных товаров.
      </div>
    );
  }

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
            onClick={() => (window.location.href = `/product/${item.id}`)}
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
                className="absolute top-2 right-2 p-2 h-auto bg-white/90 hover:bg-white z-10"
                onClick={(e) => handleRemoveFromFavorites(item.id, e)}
              >
                <Icon
                  name="Heart"
                  size={16}
                  className="text-red-500 hover:text-red-500"
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
                <span>{item.publishedAt}</span>
              </div>
              <div className="flex gap-2 mt-4">
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.location.href = `/product/${item.id}`;
                  }}
                >
                  Посмотреть
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => e.stopPropagation()}
                >
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
