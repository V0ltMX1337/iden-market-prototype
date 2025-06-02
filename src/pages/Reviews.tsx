import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const Reviews = () => {
  const navigate = useNavigate();

  const reviews = [
    {
      id: 1,
      product: "Органический мёд",
      seller: "Пасека Иванова",
      rating: 5,
      date: "12.12.2024",
      text: "Отличный мёд! Очень качественный и вкусный. Рекомендую!",
    },
    {
      id: 2,
      product: "Домашний хлеб",
      seller: "Пекарня У Марии",
      rating: 4,
      date: "08.12.2024",
      text: "Хороший хлеб, но хотелось бы чуть больше корочки.",
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate("/")} className="p-2">
            <Icon name="ArrowLeft" className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">Мои отзывы</h1>
        </div>

        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>АП</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{review.product}</CardTitle>
                    <p className="text-muted-foreground">{review.seller}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex">{renderStars(review.rating)}</div>
                      <span className="text-sm text-muted-foreground">
                        {review.date}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{review.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
