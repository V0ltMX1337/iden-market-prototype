import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Icon from "@/components/ui/icon";
import AvitoHeader from "@/components/avitomarket/AvitoHeader";
import AvitoFooter from "@/components/avitomarket/AvitoFooter";
import { storeApi } from "@/lib/store";
import { useAuth } from "@/hooks/useAuth";
import type { User, Ad, Review } from "@/lib/types";

interface UserDisplayData {
  user: User;
  averageRating: number;
  reviewCount: number;
  joinDate: string;
  responseTime: string;
  deliveryCount: number;
  salesCount: number;
}

interface AdWithStatus extends Ad {
  status: "active" | "sold" | "archived";
  isDeliveryAvailable: boolean;
  isFavorite: boolean;
  formattedPrice: string;
  location: string;
  date: string;
  image: string;
}

const AvitoUser = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const [userDisplayData, setUserDisplayData] =
    useState<UserDisplayData | null>(null);
  const [ads, setAds] = useState<AdWithStatus[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeTab, setActiveTab] = useState("active");
  const [searchQuery, setSearchQuery] = useState("");
  const [reviewSortOrder, setReviewSortOrder] = useState("new");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const scrollToReviews = () => {
    const reviewsSection = document.getElementById("reviews-section");
    if (reviewsSection) {
      reviewsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navigateToAddReview = () => {
    navigate(`/avito/user/${userId}/addReview`);
  };

  useEffect(() => {
    const loadUserData = async () => {
      if (!userId) return;

      try {
        setLoading(true);
        setError(null);

        // Параллельная загрузка данных
        const [user, userAds, userReviews] = await Promise.all([
          storeApi.getUserById(userId),
          storeApi.getUserAds(userId),
          storeApi.getReviewsByUserId(userId),
        ]);

        // Обрабатываем данные пользователя
        const averageRating =
          userReviews.length > 0
            ? userReviews.reduce((sum, review) => sum + review.rating, 0) /
              userReviews.length
            : 0;

        const joinDate = new Date(user.registrationDate).toLocaleDateString(
          "ru-RU",
          {
            year: "numeric",
            month: "long",
          },
        );

        const displayData: UserDisplayData = {
          user,
          averageRating: Math.round(averageRating * 10) / 10,
          reviewCount: userReviews.length,
          joinDate,
          responseTime: "30 минут", // Можно добавить в User модель
          deliveryCount: Math.floor(Math.random() * 10) + 1,
          salesCount: userAds.length,
        };

        setUserDisplayData(displayData);

        // Обрабатываем объявления
        const adsWithStatus: AdWithStatus[] = userAds.map((ad) => ({
          ...ad,
          status: ad.active ? "active" : "sold",
          isDeliveryAvailable: Math.random() > 0.5,
          isFavorite: false,
          formattedPrice: `${ad.price.toLocaleString()} ₽`,
          location: `${ad.city.region}, ${ad.city.name}`,
          date: new Date(ad.publishedAt).toLocaleDateString("ru-RU"),
          image:
            ad.links[0] ||
            "https://cdn.poehali.dev/files/98f4d8d2-6b87-48e8-abce-7aee57e534ab.png",
        }));

        setAds(adsWithStatus);
        setReviews(userReviews);
      } catch (err) {
        console.error("Ошибка загрузки данных пользователя:", err);
        setError("Ошибка загрузки данных пользователя");
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [userId]);

  const filteredAds = ads.filter((ad) => {
    const matchesTab =
      activeTab === "active" ? ad.status === "active" : ad.status === "sold";
    const matchesSearch = ad.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const activeCount = ads.filter((ad) => ad.status === "active").length;
  const soldCount = ads.filter((ad) => ad.status === "sold").length;

  // Вычисляем распределение оценок
  const ratingDistribution = reviews.reduce(
    (acc, review) => {
      acc[review.rating] = (acc[review.rating] || 0) + 1;
      return acc;
    },
    { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } as Record<number, number>,
  );

  const sortedReviews = [...reviews].sort((a, b) => {
    if (reviewSortOrder === "new") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Загрузка...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  if (!userDisplayData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Пользователь не найден</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AvitoHeader />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Профиль пользователя */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                  {userDisplayData.user.photoUrl ? (
                    <img
                      src={userDisplayData.user.photoUrl}
                      alt={`${userDisplayData.user.firstName} ${userDisplayData.user.lastName}`}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-white font-bold text-xl">
                      {userDisplayData.user.firstName.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <h1 className="text-xl font-bold">
                    {userDisplayData.user.firstName}{" "}
                    {userDisplayData.user.lastName}
                  </h1>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      <span className="text-lg font-semibold">
                        {userDisplayData.averageRating || 0}
                      </span>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            className={`w-4 h-4 ${
                              i < Math.floor(userDisplayData.averageRating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span
                      className="text-blue-600 underline cursor-pointer hover:text-blue-800"
                      onClick={scrollToReviews}
                    >
                      {userDisplayData.reviewCount} отзывов
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="text-sm text-gray-600">
                  {userDisplayData.user.email}
                </div>
                <div className="text-sm text-gray-600">
                  На Авито с {userDisplayData.joinDate}
                </div>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <Icon name="CheckCircle" className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium">Надёжный продавец</span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <Icon name="ShoppingCart" className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">
                    {userProfile.deliveryCount} покупок с Авито Доставкой
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Package" className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">
                    {userProfile.salesCount} продажа с Авито Доставкой
                  </span>
                </div>
              </div>

              <div className="text-sm text-gray-600 mb-6">
                Отвечает около {userProfile.responseTime}
              </div>

              <div className="space-y-3">
                <Button className="w-full bg-blue-500 hover:bg-blue-600">
                  Написать
                </Button>
                <Button variant="outline" className="w-full">
                  Подписаться
                </Button>
              </div>
            </Card>
          </div>

          {/* Объявления */}
          <div className="lg:col-span-2">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <TabsList className="grid w-auto grid-cols-2">
                  <TabsTrigger
                    value="active"
                    className="flex items-center gap-2"
                  >
                    Активные
                    <Badge variant="secondary" className="ml-2">
                      {activeCount}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="sold" className="flex items-center gap-2">
                    Завершённые
                    <Badge variant="secondary" className="ml-2">
                      {soldCount}
                    </Badge>
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="mb-6">
                <div className="relative">
                  <Icon
                    name="Search"
                    className="absolute left-3 top-3 w-4 h-4 text-gray-400"
                  />
                  <Input
                    placeholder="Поиск в профиле"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                  <Button size="sm" className="absolute right-2 top-2">
                    Найти
                  </Button>
                </div>
              </div>

              <TabsContent value="active" className="space-y-4">
                {filteredAds.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    Активные объявления не найдены
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredAds.map((ad) => (
                      <Card
                        key={ad.id}
                        className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                      >
                        <div className="relative">
                          <img
                            src={ad.image}
                            alt={ad.title}
                            className="w-full h-48 object-cover"
                          />
                          {ad.isDeliveryAvailable && (
                            <Badge className="absolute top-2 left-2 bg-green-600">
                              <Icon name="Package" className="w-3 h-3 mr-1" />
                              Доставка
                            </Badge>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                          >
                            <Icon
                              name="Heart"
                              className={`w-4 h-4 ${
                                ad.isFavorite
                                  ? "text-red-500 fill-current"
                                  : "text-gray-600"
                              }`}
                            />
                          </Button>
                        </div>
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <h3 className="font-semibold text-lg leading-tight line-clamp-2">
                              {ad.title}
                            </h3>
                            <div className="text-xl font-bold text-blue-600">
                              {ad.price}
                            </div>
                            <div className="text-sm text-gray-600">
                              {ad.location}
                            </div>
                            <div className="text-sm text-gray-500">
                              {ad.date}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="sold" className="space-y-4">
                {filteredAds.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    Завершённые объявления не найдены
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredAds.map((ad) => (
                      <Card key={ad.id} className="overflow-hidden opacity-75">
                        <div className="relative">
                          <img
                            src={ad.image}
                            alt={ad.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute top-2 left-2">
                            <Badge className="bg-green-600">
                              Цена ниже рыночной
                            </Badge>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <h3 className="font-semibold text-lg leading-tight line-clamp-2">
                              {ad.title}
                            </h3>
                            <div className="text-xl font-bold text-gray-600">
                              {ad.price}
                            </div>
                            <div className="text-sm text-gray-600">
                              {ad.location}
                            </div>
                            <div className="text-sm text-gray-500">
                              {ad.date}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Блок отзывов */}
        <div className="mt-12" id="reviews-section">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">
              Отзывы о {userProfile.name}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Рейтинг и статистика */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-5xl font-bold">{userProfile.rating}</div>
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          className={`w-5 h-5 ${
                            i < Math.floor(userProfile.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-600">
                      на основании {userProfile.reviewCount} оценок
                    </div>
                  </div>
                </div>

                {/* Детализация по звёздам */}
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <div key={stars} className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        {[...Array(stars)].map((_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            className="w-3 h-3 text-yellow-400 fill-current"
                          />
                        ))}
                        {[...Array(5 - stars)].map((_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            className="w-3 h-3 text-gray-300"
                          />
                        ))}
                      </div>
                      <div className="flex-1 mx-2">
                        <Progress
                          value={
                            (ratingDistribution[
                              stars as keyof typeof ratingDistribution
                            ] /
                              userProfile.reviewCount) *
                            100
                          }
                          className="h-2"
                        />
                      </div>
                      <div className="text-sm text-gray-600 w-8 text-right">
                        {
                          ratingDistribution[
                            stars as keyof typeof ratingDistribution
                          ]
                        }
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Описание рейтинга */}
              <div className="flex flex-col justify-center">
                <div className="text-sm text-gray-600 mb-4">
                  Рейтинг — это среднее арифметическое оценок пользователей.
                  Подробнее
                </div>
                <Button className="w-fit" onClick={navigateToAddReview}>
                  Написать отзыв
                </Button>
              </div>
            </div>

            {/* Сортировка отзывов */}
            <div className="flex items-center gap-2 mb-6">
              <Icon name="ArrowUpDown" className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">Сначала новые</span>
              <Select
                value={reviewSortOrder}
                onValueChange={setReviewSortOrder}
              >
                <SelectTrigger className="w-32 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">Новые</SelectItem>
                  <SelectItem value="old">Старые</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Список отзывов */}
            <div className="space-y-6">
              {sortedReviews.map((review) => (
                <div
                  key={review.id}
                  className="border-b border-gray-200 pb-6 last:border-b-0"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      {review.userAvatar.startsWith("http") ? (
                        <img
                          src={review.userAvatar}
                          alt={review.userName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-white font-medium">
                          {review.userAvatar}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium">{review.userName}</span>
                        <span className="text-sm text-gray-500">
                          {review.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-gray-600 mb-3">
                        {review.dealInfo}
                      </div>
                      <div className="text-gray-900">{review.comment}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <AvitoFooter />
    </div>
  );
};

export default AvitoUser;
