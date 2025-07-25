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
      <div className="text-center p-6 md:p-8 text-gray-600">
        <Icon name="User" size={48} className="mx-auto mb-4 text-gray-300" />
        <p className="text-sm md:text-base">
          Пожалуйста, войдите в аккаунт, чтобы просмотреть избранное.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center p-6 md:p-8 text-gray-600">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-sm md:text-base">Загрузка избранного...</p>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center p-6 md:p-8 text-gray-600">
        <Icon name="Heart" size={48} className="mx-auto mb-4 text-gray-300" />
        <p className="text-sm md:text-base">
          У вас пока нет избранных товаров.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg md:text-2xl font-bold">Избранное</h1>
        <span className="text-sm md:text-base text-gray-600">{favorites.length} товаров</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
        {favorites.map((item) => (
          <Card
            key={item.id}
            className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden border-0 shadow-md"
            onClick={() => (window.location.href = `/product/${item.id}`)}
          >
            <div className="aspect-square md:aspect-[4/3] overflow-hidden relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
              <Button
                size="sm"
                variant="secondary"
                className="absolute top-1 md:top-2 right-1 md:right-2 p-1 md:p-2 h-auto bg-white/90 hover:bg-white z-10"
                onClick={(e) => handleRemoveFromFavorites(item.id, e)}
              >
                <Icon
                  name="Heart"
                  size={12}
                  className="text-red-500 hover:text-red-500 md:w-4 md:h-4"
                />
              </Button>
            </div>
            <CardContent className="p-2 md:p-4">
              <h3 className="font-semibold mb-1 md:mb-2 text-xs md:text-sm leading-tight" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.title}</h3>
              <p className="text-sm md:text-xl lg:text-2xl font-bold text-green-600 mb-1 md:mb-2">
                {item.price.toLocaleString()} ₽
              </p>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between text-xs md:text-sm text-gray-500 space-y-1 md:space-y-0">
                <span className="flex items-center truncate">
                  <Icon name="MapPin" size={10} className="mr-1 md:w-3.5 md:h-3.5" />
                  <span className="truncate">{item.location}</span>
                </span>
                <span className="hidden md:block">{item.publishedAt}</span>
              </div>
              <div className="flex gap-1 md:gap-2 mt-2 md:mt-4">
                <Button
                  size="sm"
                  className="flex-1 text-xs md:text-sm h-6 md:h-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.location.href = `/product/${item.id}`;
                  }}
                >
                  <span className="md:hidden">Открыть</span>
                  <span className="hidden md:inline">Посмотреть</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 md:h-8 px-2 md:px-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Icon name="MessageCircle" size={10} className="md:w-3.5 md:h-3.5" />
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