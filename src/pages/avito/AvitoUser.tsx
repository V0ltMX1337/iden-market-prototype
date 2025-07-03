import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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

interface UserProfile {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  subscribersCount: number;
  subscriptionsCount: number;
  joinDate: string;
  isVerified: boolean;
  avatar: string;
  responseTime: string;
  deliveryCount: number;
  salesCount: number;
}

interface Ad {
  id: string;
  title: string;
  price: string;
  location: string;
  date: string;
  image: string;
  isDeliveryAvailable: boolean;
  isFavorite: boolean;
  status: "active" | "sold" | "archived";
}

interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  dealInfo: string;
  comment: string;
  isVerifiedPurchase: boolean;
}

const AvitoUser = () => {
  const { userId } = useParams<{ userId: string }>();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [ads, setAds] = useState<Ad[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeTab, setActiveTab] = useState("active");
  const [searchQuery, setSearchQuery] = useState("");
  const [reviewSortOrder, setReviewSortOrder] = useState("new");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Симуляция загрузки данных
    setTimeout(() => {
      setUserProfile({
        id: userId || "1",
        name: "UPGRADE(Dzerzhinsk)",
        rating: 4.9,
        reviewCount: 298,
        subscribersCount: 512,
        subscriptionsCount: 6,
        joinDate: "март 2012",
        isVerified: true,
        avatar:
          "https://cdn.poehali.dev/files/98f4d8d2-6b87-48e8-abce-7aee57e534ab.png",
        responseTime: "30 минут",
        deliveryCount: 8,
        salesCount: 321,
      });

      setAds([
        {
          id: "1",
          title: "Игровой пк Ryzen 5 5600/B450/32 gb/RTX 3060/12gb/1tb ssd",
          price: "35 000 ₽",
          location: "Нижегородская обл., Дзержинск",
          date: "21 час назад",
          image:
            "https://cdn.poehali.dev/files/98f4d8d2-6b87-48e8-abce-7aee57e534ab.png",
          isDeliveryAvailable: true,
          isFavorite: false,
          status: "active",
        },
        {
          id: "2",
          title: "Блок питания hspd 500w",
          price: "2 750 ₽",
          location: "Нижегородская обл., Дзержинск",
          date: "13 февраля 13:11",
          image:
            "https://cdn.poehali.dev/files/98f4d8d2-6b87-48e8-abce-7aee57e534ab.png",
          isDeliveryAvailable: true,
          isFavorite: true,
          status: "active",
        },
        {
          id: "3",
          title: "Компьютер Скупка/Сборка/Обмен",
          price: "100 ₽",
          location: "Нижегородская обл., Дзержинск",
          date: "9 сентября 2022",
          image:
            "https://cdn.poehali.dev/files/98f4d8d2-6b87-48e8-abce-7aee57e534ab.png",
          isDeliveryAvailable: false,
          isFavorite: false,
          status: "active",
        },
        {
          id: "4",
          title: "Оперативная память DDR4 adata 8Gb",
          price: "1 250 ₽",
          location: "Нижегородская обл., Дзержинск",
          date: "13 февраля 13:17",
          image:
            "https://cdn.poehali.dev/files/98f4d8d2-6b87-48e8-abce-7aee57e534ab.png",
          isDeliveryAvailable: true,
          isFavorite: false,
          status: "active",
        },
        {
          id: "5",
          title: "Thermaltake Litepower 550w/Новый",
          price: "1 000 ₽",
          location: "Нижегородская обл., Дзержинск",
          date: "вчера",
          image:
            "https://cdn.poehali.dev/files/98f4d8d2-6b87-48e8-abce-7aee57e534ab.png",
          isDeliveryAvailable: true,
          isFavorite: true,
          status: "sold",
        },
        {
          id: "6",
          title: "Ноутбук Digma Eve C4801/Гарантия 1 год",
          price: "15 000 ₽",
          location: "Нижегородская обл., Дзержинск",
          date: "2 дня назад",
          image:
            "https://cdn.poehali.dev/files/98f4d8d2-6b87-48e8-abce-7aee57e534ab.png",
          isDeliveryAvailable: true,
          isFavorite: false,
          status: "sold",
        },
      ]);

      setReviews([
        {
          id: "1",
          userName: "Алексей",
          userAvatar: "A",
          rating: 5,
          date: "20 июня · Покупатель",
          dealInfo: "Сделка состоялась · DDR3 Corsair 8 gb 1600 Mhz",
          comment: "Всё прошло гладко.",
          isVerifiedPurchase: true,
        },
        {
          id: "2",
          userName: "Посев",
          userAvatar:
            "https://cdn.poehali.dev/files/9715c0de-f1a2-4e90-beca-86851d19bfa7.png",
          rating: 5,
          date: "19 июня · Покупатель",
          dealInfo: "Сделка состоялась · Msi Rtx 4060 Ventus 2X White 8 gb",
          comment: "Всё отлично, рекомендую",
          isVerifiedPurchase: true,
        },
      ]);
      setLoading(false);
    }, 1000);
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

  const ratingDistribution = {
    5: 287,
    4: 7,
    3: 1,
    2: 0,
    1: 3,
  };

  const sortedReviews = [...reviews].sort((a, b) => {
    if (reviewSortOrder === "new") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Загрузка...</div>
      </div>
    );
  }

  if (!userProfile) {
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
                  <span className="text-white font-bold text-xl">U</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold">{userProfile.name}</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      <span className="text-lg font-semibold">
                        {userProfile.rating}
                      </span>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            className={`w-4 h-4 ${
                              i < Math.floor(userProfile.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-blue-600 underline cursor-pointer">
                      {userProfile.reviewCount} отзывов
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="text-sm text-gray-600">
                  {userProfile.subscribersCount} подписчиков,{" "}
                  {userProfile.subscriptionsCount} подписок
                </div>
                <div className="text-sm text-gray-600">
                  На Авито с {userProfile.joinDate}
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
        <div className="mt-12">
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
                <Button className="w-fit">Написать отзыв</Button>
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
