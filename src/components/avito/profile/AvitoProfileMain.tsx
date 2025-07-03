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
  const { user } = useAuth();

  const [adsCount, setAdsCount] = useState({ active: 0, inactive: 0 });
  const [reviews, setReviews] = useState<Review[]>([]);
  const [recentAds, setRecentAds] = useState<Ad[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!user) return;

      try {
        const [userReviews, userAds, adsCountRes] = await Promise.all([
          storeApi.getReviewsByUserId(user.id),
          storeApi.getUserAds(user.id),
          storeApi.countUserAds(user.id),
        ]);

        setAdsCount(adsCountRes);
        setReviews(userReviews);
        setRecentAds(userAds.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()).slice(0, 3));
      } catch (e) {
        console.error("Ошибка загрузки данных профиля", e);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [user]);

  if (!user || isLoading) return null;

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : "—";

  const userStats = [
    {
      label: "Баланс",
      value: `${user.balance} ₽`,
      icon: "Money",
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
    <div className="space-y-6">
      {/* Профиль */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start space-x-6">
            {user.photoUrl ? (
            <img
              src={user.photoUrl}
              alt="Аватар пользователя"
              className="w-24 h-24 rounded-full object-cover mb-4 border border-gray-300"
            />
          ) : (
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Icon name="User" size={32} className="text-white" />
            </div>
          )}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {user.firstName} {user.lastName}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <span className="flex items-center">
                  <Icon name="Mail" size={16} className="mr-1" />
                  {user.email}
                </span>
                {user.status === "ACTIVE" && (
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    <Icon name="Shield" size={12} className="mr-1" />
                    Проверен
                  </Badge>
                )}
              </div>
              <div
                className="flex items-center space-x-2 cursor-pointer hover:opacity-80"
                onClick={() => navigate("/avito/profile/reviews")}
              >
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={16}
                      className={i < Math.round(Number(averageRating)) ? "fill-current" : ""}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {averageRating} ({reviews.length} отзывов)
                </span>
              </div>
            </div>
            <Button
              onClick={() => navigate("/avito/profile/settings")}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              Редактировать профиль
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {userStats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-gray-50">
                  <Icon name={stat.icon as any} size={24} className={stat.color} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Быстрые действия */}
      <Card>
        <CardHeader>
          <CardTitle>Быстрые действия</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="h-16 flex-col space-y-2 border-blue-200 text-blue-600 hover:bg-blue-50"
              onClick={() => navigate("/avito/sell")}
            >
              <Icon name="Plus" size={24} />
              <span>Подать объявление</span>
            </Button>
            <Button
              variant="outline"
              className="h-16 flex-col space-y-2 border-purple-200 text-purple-600 hover:bg-purple-50"
              onClick={() => navigate("/avito/profile/ads")}
            >
              <Icon name="Package" size={24} />
              <span>Мои объявления</span>
            </Button>
            <Button
              variant="outline"
              className="h-16 flex-col space-y-2 border-blue-200 text-blue-600 hover:bg-blue-50"
              onClick={() => navigate("/avito/profile/messages")}
            >
              <Icon name="MessageCircle" size={24} />
              <span>Сообщения</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Последние объявления */}
      <Card>
        <CardHeader>
          <CardTitle>Последняя активность</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAds.map((ad) => (
              <div
                key={ad.id}
                className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
              >
                <div className="p-2 rounded-full bg-green-100">
                  <Icon name="Package" size={20} className="text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{ad.title}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(ad.publishedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">{ad.price} ₽</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AvitoProfileMain;
