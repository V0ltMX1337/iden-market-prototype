import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const AvitoProfileReviews = () => {
  const reviews = [
    {
      id: 1,
      userName: "Анна Смирнова",
      rating: 5,
      comment:
        "Отличный продавец! Товар в точности как описано, быстрая доставка.",
      productTitle: "iPhone 14 Pro 128GB",
      date: "2 дня назад",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b9fcf7cf?w=50&h=50&fit=crop&crop=face",
    },
    {
      id: 2,
      userName: "Дмитрий Козлов",
      rating: 5,
      comment: "Всё супер! Рекомендую этого продавца.",
      productTitle: "MacBook Air M2",
      date: "1 неделю назад",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
    },
    {
      id: 3,
      userName: "Елена Петрова",
      rating: 4,
      comment:
        "Хороший товар, небольшие потертости были не указаны, но в целом доволен покупкой.",
      productTitle: "Диван угловой",
      date: "2 недели назад",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
    },
    {
      id: 4,
      userName: "Михаил Васильев",
      rating: 5,
      comment: "Быстро ответил, встретились в удобном месте. Товар отличный!",
      productTitle: "Samsung Galaxy S22",
      date: "3 недели назад",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    },
  ];

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
                    ></div>
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
                  src={review.avatar}
                  alt={review.userName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold">{review.userName}</h3>
                      <p className="text-sm text-gray-600">
                        {review.productTitle}
                      </p>
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
                        {review.date}
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
