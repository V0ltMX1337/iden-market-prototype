import { useParams, useNavigate, Link } from "react-router-dom";
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
import { useAuth } from "@/hooks/useAuth";
import { useUserProfile } from "@/hooks/useUserProfile";
import { AdStatus } from "@/lib/types.tsx";
import { Helmet } from "react-helmet-async";
import { usePageTitle } from "@/hooks/usePageTitle";

const AvitoUser = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const { getPageTitle, settings: systemSettings } = usePageTitle();
  
  const {
    userDisplayData,
    ads,
    reviews,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    reviewSortOrder,
    setReviewSortOrder,
    activeTab,
    setActiveTab,
    filteredAds,
    sortedReviews,
  } = useUserProfile({ userId });

  const scrollToReviews = () => {
    const reviewsSection = document.getElementById("reviews-section");
    if (reviewsSection) {
      reviewsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navigateToAddReview = () => {
    navigate(`/user/${userId}/addReview`);
  };

  const activeCount = ads.filter((ad) => ad.adStatus === AdStatus.ACTIVE).length;
  const soldCount = ads.filter((ad) => ad.adStatus === AdStatus.SOLD || ad.adStatus === AdStatus.TIME_OUT).length;

  // Вычисляем распределение оценок
  const ratingDistribution = reviews.reduce(
    (acc, review) => {
      acc[review.rating] = (acc[review.rating] || 0) + 1;
      return acc;
    },
    { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } as Record<number, number>,
  );



  // Формируем заголовок
  const pageTitle =
    userDisplayData && systemSettings
      ? getPageTitle("userProfile", {
          profilename: `${userDisplayData.user.firstName} ${userDisplayData.user.lastName}`,
        })
      : "";

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
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <AvitoHeader />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Баннер пользователя */}
        <div className="mb-8 relative">
          {userDisplayData.user.bannerUrl ? (
            <div className="h-64 rounded-2xl overflow-hidden shadow-lg">
              <img
                src={userDisplayData.user.bannerUrl}
                alt="Баннер профиля"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          ) : (
            <div className="h-64 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center text-gray-400">
                <Icon name="Image" size={64} className="mx-auto mb-3" />
                <p className="text-lg font-medium">Баннер не установлен</p>
                <p className="text-sm">Рекомендуемый размер: 1200x320 пикселей</p>
              </div>
            </div>
          )}
        </div>
        
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
                  На Trivo с {userDisplayData.joinDate}
                </div>
                {userDisplayData.user.description && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">О продавце</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {userDisplayData.user.description}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 mb-6">
                <Icon name="CheckCircle" className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium">Надёжный продавец</span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <Icon name="ShoppingCart" className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">
                    0 покупок с Trivo Доставкой
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Package" className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">
                    0 продажа с Trivo Доставкой
                  </span>
                </div>
              </div>

              <div className="text-sm text-gray-600 mb-6">
                Отвечает около 30 минут
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
                      <Link to={`/product/${ad.id}`}>
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
                      </Link>
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
              Отзывы о {userDisplayData.user.firstName} {userDisplayData.user.lastName}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Рейтинг и статистика */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-5xl font-bold">{userDisplayData.averageRating}</div>
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          className={`w-5 h-5 ${
                            i < Math.floor(userDisplayData.averageRating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-600">
                      на основании {userDisplayData.reviewCount} оценок
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
                              userDisplayData.reviewCount) *
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
                    {review.fromUser.photoUrl ? (
                        <img
                          src={review.fromUser.photoUrl}
                          alt={`${review.fromUser.firstName} ${review.fromUser.lastName}`}
                          className="w-12 h-12 rounded-full object-cover mb-4 border border-gray-300"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <Icon name="User" size={32} className="text-white" />
                        </div>
                      )}
                    <div className="flex-1">
                      <Link to={`/user/${review.fromUser.id}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium">{review.fromUser.firstName} {review.fromUser.lastName} </span>
                        <span className="text-sm text-gray-500">
                          {review.createdAt}
                        </span>
                      </div>
                      </Link>
                      {review.ad && (
                        <Link
                          to={`/product/${review.ad.id}`}
                          className="flex items-center gap-3 mb-3 group"
                        >
                          <img
                            src={review.ad.links[0]}
                            alt={review.ad.title}
                            className="w-12 h-12 rounded-md object-cover"
                          />
                          <span className="text-sm font-medium text-blue-600 group-hover:underline line-clamp-2">
                            {review.ad.title}
                          </span>
                        </Link>
                      )}
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