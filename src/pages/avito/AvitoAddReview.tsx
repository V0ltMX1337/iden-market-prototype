import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import AvitoHeader from "@/components/avitomarket/AvitoHeader";
import AvitoFooter from "@/components/avitomarket/AvitoFooter";
import { storeApi } from "@/lib/store";
import { useAuth } from "@/hooks/useAuth";
import { type User, type Ad, type Review, AdStatus } from "@/lib/types";

type UserProfile = User;

type AdWithStatus = Ad & {
  isDeliveryAvailable: boolean;
  isFavorite: boolean;
  formattedPrice: string;
  location: string;
  date: string;
  image: string;
};

type UserDisplayData = {
  user: User;
  averageRating: number;
  reviewCount: number;
  joinDate: string;
  responseTime: string;
  deliveryCount: number;
  salesCount: number;
};

const AvitoAddReview = () => {
  const { userId } = useParams<{ userId: string }>();
  const { user: currentUser } = useAuth();

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userDisplayData, setUserDisplayData] = useState<UserDisplayData | null>(null);
  const [ads, setAds] = useState<AdWithStatus[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAd, setSelectedAd] = useState<AdWithStatus | null>(null);
  const [purchaseStatus, setPurchaseStatus] = useState<string>("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
      if (!userId) return;

      try {
        setLoading(true);
        setError(null);

        const [user, userAds, userReviews] = await Promise.all([
          storeApi.getUserById(userId),
          storeApi.getUserAds(userId),
          storeApi.getReviewsByUserId(userId),
        ]);

        const averageRating =
          userReviews.length > 0
            ? userReviews.reduce((sum, review) => sum + review.rating, 0) /
              userReviews.length
            : 0;

        const joinDate = new Date(user.registrationDate).toLocaleDateString("ru-RU", {
          year: "numeric",
          month: "long",
        });

        const displayData: UserDisplayData = {
          user,
          averageRating: Math.round(averageRating * 10) / 10,
          reviewCount: userReviews.length,
          joinDate,
          responseTime: "30 минут",
          deliveryCount: Math.floor(Math.random() * 10) + 1,
          salesCount: userAds.length,
        };

        const adsWithStatus: AdWithStatus[] = userAds.map((ad) => ({
          ...ad,
          isDeliveryAvailable: Math.random() > 0.5,
          isFavorite: false,
          formattedPrice: `${ad.price.toLocaleString()} ₽`,
          location: `${ad.city.region}, ${ad.city.name}`,
          date: new Date(ad.publishedAt).toLocaleDateString("ru-RU"),
          image:
            ad.links[0] ||
            "https://cdn.poehali.dev/files/98f4d8d2-6b87-48e8-abce-7aee57e534ab.png",
        }));

        setUserProfile(user);
        setUserDisplayData(displayData);
        setAds(adsWithStatus);
      } catch (err) {
        console.error("Ошибка загрузки данных пользователя:", err);
        setError("Ошибка загрузки данных");
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [userId]);

  const filteredAds = ads.filter((ad) =>
    ad.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdSelect = (ad: AdWithStatus) => {
    setSelectedAd(ad);
    setStep(2);
  };

  const handlePurchaseStatusChange = (value: string) => {
    setPurchaseStatus(value);
    if (value) setStep(3);
  };

  const handleRatingClick = (value: number) => setRating(value);

  const handleSubmit = async () => {
    if (!selectedAd || !currentUser || !userId) return;

    const newReview: Omit<Review, "id"> = {
      fromUser: currentUser,
      ad: selectedAd,
      rating,
      comment,
      createdAt: new Date().toISOString(),
    };

    try {
      await storeApi.addReview(newReview);
      alert("Отзыв успешно отправлен!");
      setStep(1);
      setSelectedAd(null);
      setPurchaseStatus("");
      setRating(0);
      setComment("");
    } catch (err) {
      console.error("Ошибка отправки отзыва:", err);
      alert("Не удалось отправить отзыв.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Загрузка...</div>
      </div>
    );
  }

  if (error || !userDisplayData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error || "Пользователь не найден"}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AvitoHeader />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="p-8">
          <h1 className="text-3xl font-bold text-center mb-8">Отзыв о пользователе</h1>

          {step === 1 && (
            <>
              <Label className="mb-2 block text-sm font-medium">Выберите товар</Label>
              <Input
                type="text"
                placeholder="Поиск по товарам"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-4"
              />
              <div className="grid gap-4">
                {filteredAds.map((ad) => (
                  <Card
                    key={ad.id}
                    className="p-4 cursor-pointer hover:shadow-lg transition"
                    onClick={() => handleAdSelect(ad)}
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={ad.image}
                        alt={ad.title}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{ad.title}</h3>
                        <p className="text-sm text-muted-foreground">{ad.formattedPrice}</p>
                      </div>
                      <Badge>{ad.adStatus === AdStatus.SOLD ? "Продано" : "В наличии"}</Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </>
          )}

          {step === 2 && selectedAd && (
            <>
              <h2 className="text-xl font-semibold mb-4">Покупка товара</h2>
              <RadioGroup value={purchaseStatus} onValueChange={handlePurchaseStatusChange}>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="bought" id="bought" />
                  <Label htmlFor="bought">Я купил(а) этот товар</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="notBought" id="notBought" />
                  <Label htmlFor="notBought">Не купил(а), просто общались</Label>
                </div>
              </RadioGroup>
            </>
          )}

          {step >= 3 && (
  <div className="space-y-6">
    {/* Оценка */}
    <div>
      <Label className="text-lg font-medium mb-4 block">Оценка</Label>
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRatingClick(star)}
            className="focus:outline-none"
          >
            <Icon
              name="Star"
              className={`w-8 h-8 ${
                star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
    </div>

    {/* Комментарий */}
    <div>
      <Label className="text-lg font-medium mb-4 block">Комментарий</Label>
      <Textarea
        placeholder="В тексте не должно быть оскорблений, мата и чужих персональных данных, например фамилии, контактов и адреса"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="min-h-[120px]"
      />
      <div className="text-sm text-gray-500 mt-2">
        От 5 до 2 000 символов
      </div>
    </div>

    {/* Добавить фотографии */}
    <div>
      <Label className="text-lg font-medium mb-4 block">
        Добавьте фотографии, если есть
      </Label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <Icon
          name="Camera"
          className="w-12 h-12 text-gray-400 mx-auto mb-4"
        />
        <p className="text-gray-600 mb-2">Добавить фото</p>
        <p className="text-sm text-gray-500">
          Это необязательно, но с ними отзыв станет более наглядным.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Не загружайте скриншоты переписки — они не пройдут проверку.
        </p>
      </div>
    </div>

    {/* Кнопка отправки */}
    <div className="pt-4">
      <Button
        onClick={handleSubmit}
        className="w-full"
        disabled={!rating || comment.trim().length < 5}
      >
        Отправить
      </Button>
    </div>
  </div>
)}
        </Card>
      </div>
      <AvitoFooter />
    </div>
  );
};

export default AvitoAddReview;
