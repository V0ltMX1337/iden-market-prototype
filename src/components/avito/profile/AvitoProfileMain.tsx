import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/hooks/useAuth";
import { storeApi } from "@/lib/store";
import type { Review, Ad } from "@/lib/types";

const AvitoProfileMain = () => {
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [adsCount, setAdsCount] = useState({ active: 0, inactive: 0 });
  const [reviews, setReviews] = useState<Review[]>([]);
  const [recentAds, setRecentAds] = useState<Ad[]>([]);

  useEffect(() => {
    if (!authLoading && user) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const [ads, adsCountRes] = await Promise.all([
            storeApi.getUserAds(user.id),
            storeApi.countUserAds(user.id),
          ]);

          const reviewsArrays = await Promise.all(
            ads.map((ad) => storeApi.getReviewsByAdId(ad.id))
          );
          const allReviews = reviewsArrays.flat();

          setReviews(allReviews);
          setAdsCount({
            active: adsCountRes.active,
            inactive: adsCountRes.blocked + adsCountRes.sold + adsCountRes.time_out,
          });

          const sortedAds = [...ads].sort(
            (a, b) =>
              new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
          );
          setRecentAds(sortedAds.slice(0, 3));
        } catch (err: any) {
          setError(err.message || "Ошибка загрузки данных");
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    } else if (!authLoading && !user) {
      setReviews([]);
      setLoading(false);
    }
  }, [user, authLoading]);

  if (authLoading || loading) return <div>Загрузка...</div>;
  if (error) return <div className="text-red-600">Ошибка: {error}</div>;

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : "—";

  const userStats = [
    {
      label: "Баланс",
      value: `${user?.balance ?? 0} ₽`,
      icon: "Banknote",
      color: "text-green-600",
    },
    {
      label: "Активных объявлений",
      value: adsCount.active,
      icon: "Package",
      color: "text-blue-600",
    },
    {
      label: "Неактивных",
      value: adsCount.inactive,
      icon: "Package",
      color: "text-gray-600",
    },
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Профиль */}
      <Card>
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="flex items-center space-x-4 md:block md:space-x-0">
              {user?.photoUrl ? (
                <img
                  src={user.photoUrl}
                  alt="Аватар пользователя"
                  className="w-16 h-16 md:w-24 md:h-24 rounded-full object-cover border border-gray-300"
                />
              ) : (
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Icon name="User" size={24} className="text-white md:hidden" />
                  <Icon name="User" size={32} className="text-white hidden md:block" />
                </div>
              )}
              
              {/* Mobile: Name next to avatar */}
              <div className="md:hidden">
                <h1 className="text-lg font-bold text-gray-900">
                  {user?.firstName} {user?.lastName}
                </h1>
              </div>
            </div>

            <div className="flex-1 w-full">
              {/* Desktop: Name */}
              <h1 className="hidden md:block text-xl md:text-2xl font-bold text-gray-900 mb-2">
                {user?.firstName} {user?.lastName}
              </h1>
              
              <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:items-center md:space-x-4 text-xs md:text-sm text-gray-600 mb-3 md:mb-4">
                <span className="flex items-center">
                  <Icon name="Mail" size={14} className="mr-1" />
                  <span className="truncate">{user?.email}</span>
                </span>
                {user?.status === "ACTIVE" && (
                  <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs w-fit">
                    <Icon name="Shield" size={10} className="mr-1" />
                    Проверен
                  </Badge>
                )}
              </div>
              
              <div
                className="flex items-center space-x-2 cursor-pointer hover:opacity-80"
                onClick={() => navigate("/profile/reviews")}
              >
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={14}
                      className={i < Math.round(Number(averageRating)) ? "fill-current" : ""}
                    />
                  ))}
                </div>
                <span className="text-xs md:text-sm text-gray-600">
                  {averageRating} ({reviews.length} отзывов)
                </span>
              </div>
            </div>

            <Button
              onClick={() => navigate("/profile/settings")}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 w-full md:w-auto text-sm md:text-base"
              size="sm"
            >
              <span className="md:hidden">Редактировать</span>
              <span className="hidden md:inline">Редактировать профиль</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
        {userStats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-3 md:p-6">
              <div className="flex items-center space-x-2 md:space-x-3">
                <div className="p-1.5 md:p-2 rounded-lg bg-gray-50">
                  <Icon name={stat.icon as any} size={18} className={`${stat.color} md:w-6 md:h-6`} />
                </div>
                <div>
                  <p className="text-lg md:text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs md:text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Быстрые действия */}
      <Card>
        <CardHeader className="pb-3 md:pb-6">
          <CardTitle className="text-base md:text-lg">Быстрые действия</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            <Button
              variant="outline"
              className="h-12 md:h-16 flex-col space-y-1 md:space-y-2 border-blue-200 text-blue-600 hover:bg-blue-50"
              onClick={() => navigate("/profile/sell")}
            >
              <Icon name="Plus" size={18} className="md:w-6 md:h-6" />
              <span className="text-xs md:text-sm">Подать объявление</span>
            </Button>
            <Button
              variant="outline"
              className="h-12 md:h-16 flex-col space-y-1 md:space-y-2 border-purple-200 text-purple-600 hover:bg-purple-50"
              onClick={() => navigate("/profile/ads")}
            >
              <Icon name="Package" size={18} className="md:w-6 md:h-6" />
              <span className="text-xs md:text-sm">Мои объявления</span>
            </Button>
            <Button
              variant="outline"
              className="h-12 md:h-16 flex-col space-y-1 md:space-y-2 border-blue-200 text-blue-600 hover:bg-blue-50"
              onClick={() => navigate("/profile/messages")}
            >
              <Icon name="MessageCircle" size={18} className="md:w-6 md:h-6" />
              <span className="text-xs md:text-sm">Сообщения</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Последние объявления */}
      <Card>
        <CardHeader className="pb-3 md:pb-6">
          <CardTitle className="text-base md:text-lg">Последняя активность</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3 md:space-y-4">
            {recentAds.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Icon name="Package" size={48} className="mx-auto mb-2 text-gray-300" />
                <p className="text-sm">Нет объявлений</p>
              </div>
            ) : (
              recentAds.map((ad) => (
                <div
                  key={ad.id}
                  className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 bg-gray-50 rounded-lg"
                >
                  <div className="p-1.5 md:p-2 rounded-full bg-green-100">
                    <Icon name="Package" size={16} className="text-green-600 md:w-5 md:h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm md:text-base truncate">{ad.title}</p>
                    <p className="text-xs md:text-sm text-gray-600">
                      {new Date(ad.publishedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600 text-sm md:text-base">{ad.price.toLocaleString()} ₽</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AvitoProfileMain;