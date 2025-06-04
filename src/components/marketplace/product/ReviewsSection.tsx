import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  product: {
    name: string;
    price: number;
    soldCount: number;
    image: string;
  };
  photos: string[];
}

interface ReviewsSectionProps {
  totalReviews: number;
  averageRating: number;
  ratingDistribution: { stars: number; count: number }[];
}

const ReviewsSection = ({
  totalReviews,
  averageRating,
  ratingDistribution,
}: ReviewsSectionProps) => {
  const [sortBy, setSortBy] = useState("date");
  const [filterBy, setFilterBy] = useState("all");
  const [showPhotosOnly, setShowPhotosOnly] = useState(false);

  const reviews: Review[] = [
    {
      id: "1",
      author: "Артем Б.",
      avatar: "A",
      rating: 5,
      date: "19 часов назад",
      comment: "Все отлично как всегда!",
      product: {
        name: "Автомагнитола Pioneer 212",
        price: 580,
        soldCount: 9,
        image:
          "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=100",
      },
      photos: [
        "https://cdn.poehali.dev/files/cb82f638-ced9-4ec4-a5e0-6fa1bc9585b3.png",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=200",
      ],
    },
    {
      id: "2",
      author: "Никита .",
      avatar: "Н",
      rating: 2,
      date: "1 месяц назад",
      comment:
        "В описании пионер 1101, а по факту приехали 1102 и 1201, продавец не предупредил о таком сюрпризе",
      product: {
        name: "Автомагнитола Pioneer 1101",
        price: 630,
        soldCount: 917,
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100",
      },
      photos: [],
    },
  ];

  const filters = [
    { id: "all", label: "Все", count: totalReviews },
    {
      id: "5",
      label: "5 звезд",
      count: ratingDistribution.find((r) => r.stars === 5)?.count || 0,
    },
    {
      id: "4",
      label: "4 звезды",
      count: ratingDistribution.find((r) => r.stars === 4)?.count || 0,
    },
    {
      id: "3",
      label: "3 звезды",
      count: ratingDistribution.find((r) => r.stars === 3)?.count || 0,
    },
    {
      id: "2",
      label: "2 звезды",
      count: ratingDistribution.find((r) => r.stars === 2)?.count || 0,
    },
    {
      id: "1",
      label: "1 звезда",
      count: ratingDistribution.find((r) => r.stars === 1)?.count || 0,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold">Отзывы {totalReviews}</h2>
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Icon
                  key={i}
                  name="Star"
                  size={16}
                  className={
                    i < Math.floor(averageRating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
            <span className="text-lg font-semibold">{averageRating}</span>
            <span className="text-gray-500">из 5</span>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-2">
          {ratingDistribution.map((item) => (
            <div key={item.stars} className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                {[...Array(item.stars)].map((_, i) => (
                  <Icon
                    key={i}
                    name="Star"
                    size={12}
                    className="text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 rounded-full"
                  style={{
                    width: `${(item.count / totalReviews) * 100}%`,
                  }}
                />
              </div>
              <span className="text-sm text-gray-600 w-8">{item.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Photo Gallery */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex-shrink-0 relative">
            <img
              src={`https://images.unsplash.com/photo-${1507003211169 + i}-0a1dd7228f2d?w=80&h=80&fit=crop`}
              alt=""
              className="w-16 h-16 rounded-lg object-cover"
            />
            {i === 5 && (
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-medium">+ 298</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Сортировать по:</span>
          <Button
            variant={sortBy === "date" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("date")}
            className="text-sm"
          >
            Дата
          </Button>
          <Button
            variant={sortBy === "rating" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("rating")}
            className="text-sm"
          >
            Оценка
          </Button>
        </div>

        <Button
          variant={showPhotosOnly ? "default" : "outline"}
          size="sm"
          onClick={() => setShowPhotosOnly(!showPhotosOnly)}
          className="text-sm"
        >
          Только с фото 228
        </Button>

        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={filterBy === filter.id ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterBy(filter.id)}
              className="text-sm"
            >
              {filter.label} ({filter.count})
            </Button>
          ))}
        </div>
      </div>

      {/* Review Tags */}
      <div className="flex flex-wrap gap-2">
        {[
          "Быстрая доставка (36)",
          "Хорошее качество (33)",
          "Хорошая упаковка (33)",
          "Быстрый ответ (33)",
          "Отсутствие брака (25)",
        ].map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-3 py-1 rounded-full cursor-pointer"
          >
            {tag}
          </Badge>
        ))}
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <Card key={review.id} className="p-6">
            <CardContent className="p-0">
              <div className="flex items-start space-x-4">
                {/* Avatar */}
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-medium">
                  {review.avatar}
                </div>

                <div className="flex-1 space-y-3">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="font-medium">{review.author}</span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            size={14}
                            className={
                              i < review.rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>

                  {/* Comment */}
                  <p className="text-gray-700">{review.comment}</p>

                  {/* Product Info */}
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <img
                      src={review.product.image}
                      alt=""
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">
                        {review.product.name}
                      </h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <span className="font-semibold">
                          {review.product.price} ₽
                        </span>
                        <span>Продано {review.product.soldCount} шт.</span>
                      </div>
                    </div>
                    <Icon
                      name="ChevronRight"
                      size={16}
                      className="text-gray-400"
                    />
                  </div>

                  {/* Photos */}
                  {review.photos.length > 0 && (
                    <div className="flex space-x-2">
                      {review.photos.slice(0, 6).map((photo, index) => (
                        <img
                          key={index}
                          src={photo}
                          alt=""
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-end">
                    <Button variant="ghost" size="sm" className="text-gray-500">
                      <Icon name="ThumbsUp" size={16} className="mr-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Write Review Button */}
      <div className="text-center py-6">
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
          <Icon name="PenTool" size={16} className="mr-2" />
          Написать отзыв
        </Button>
      </div>
    </div>
  );
};

export default ReviewsSection;
