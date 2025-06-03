import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const ProfileReviews = () => {
  const reviews = [
    {
      id: 1,
      productName: "Магнитола Pionneer GB MVH-Y8059MBT",
      orderNumber: "WKO-297137250523",
      rating: 5,
      date: "1 месяц назад",
      comment:
        "Заказал 4 шт и реально пришло) Боялся заказывать на авито, но данный продавец полностью оправдал себя.",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=150&h=150&fit=crop",
      status: "published",
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={16}
        className={
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }
      />
    ));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Мои отзывы 1</CardTitle>
          <select className="text-sm border border-gray-300 rounded-md px-3 py-1">
            <option>Все отзывы</option>
            <option>Опубликованные</option>
            <option>Ожидают модерации</option>
          </select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-start">
                <Badge
                  variant="outline"
                  className="text-green-600 border-green-600"
                >
                  <Icon name="CheckCircle" size={12} className="mr-1" />
                  Опубликован
                </Badge>
                <Button variant="outline" size="sm">
                  Редактировать
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                {renderStars(review.rating)}
                <span className="text-sm text-gray-600">{review.date}</span>
              </div>

              <div className="flex space-x-4">
                <img
                  src={review.image}
                  alt={review.productName}
                  className="w-16 h-16 rounded object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium">{review.productName}</h4>
                  <p className="text-sm text-gray-600">
                    Номер заказа: {review.orderNumber}
                  </p>
                </div>
              </div>

              <div>
                <h5 className="font-medium mb-2">Комментарий</h5>
                <p className="text-gray-700">{review.comment}</p>
              </div>

              <div className="flex items-center text-sm text-gray-600">
                <Icon name="MessageCircle" size={16} className="mr-1" />0
                Ответов
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileReviews;
