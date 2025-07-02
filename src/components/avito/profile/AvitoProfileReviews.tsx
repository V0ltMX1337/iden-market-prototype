import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { storeApi } from "@/lib/store";
import { Review } from "@/lib/types";
import { useAuth } from "@/hooks/useAuth";

const AvitoProfileReviews = () => {
  const { user, isLoading: authLoading } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && user) {
      const fetchReviews = async () => {
        try {
          setLoading(true);
          // Получаем объявления пользователя
          const ads = await storeApi.getUserAds(user.id);
          // Получаем отзывы по каждому объявлению
          const reviewsArrays = await Promise.all(
            ads.map((ad) => storeApi.getReviewsByAdId(ad.id))
          );
          // Объединяем все отзывы в один массив
          const allReviews = reviewsArrays.flat();
          setReviews(allReviews);
        } catch (err: any) {
          setError(err.message || "Ошибка загрузки отзывов");
        } finally {
          setLoading(false);
        }
      };
      fetchReviews();
    } else if (!authLoading && !user) {
      setReviews([]);
      setLoading(false);
    }
  }, [user, authLoading]);

  if (authLoading || loading) return <div>Загрузка отзывов...</div>;
  if (error) return <div className="text-red-600">Ошибка: {error}</div>;
  if (reviews.length === 0) return <div>Нет отзывов для отображения.</div>;

  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Отзывы</h1>
        <div className="flex items-center gap-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Icon
                key={i}
                name="Star"
                size={20}
                className={i < Math.floor(averageRating) ? "fill-current" : ""}
              />
            ))}
          </div>
          <span className="font-semibold">{averageRating.toFixed(1)}</span>
          <span className="text-gray-600">({reviews.length} отзывов)</span>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Статистика отзывов</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = reviews.filter((r) => r.rating === rating).length;
              const percentage = (count / reviews.length) * 100;
              return (
                <div key={rating} className="flex items-center gap-4">
                  <div className="flex items-center gap-1 w-16">
                    <span>{rating}</span>
                    <Icon
                      name="Star"
                      size={14}
                      className="text-yellow-400 fill-current"
                    />
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-8">{count}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <img
                  src={review.fromUser.photoUrl}
                  alt={`${review.fromUser.firstName} ${review.fromUser.lastName}`}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold">
                        {review.fromUser.firstName} {review.fromUser.lastName}
                      </h3>
                      <p className="text-sm text-gray-600">{review.ad.title}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex text-yellow-400 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            size={14}
                            className={i < review.rating ? "fill-current" : ""}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString("ru-RU")}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AvitoProfileReviews;
