import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import AvitoHeader from "@/components/avitomarket/AvitoHeader";
import AvitoFooter from "@/components/avitomarket/AvitoFooter";

interface Ad {
  id: string;
  title: string;
  price: string;
  image: string;
}

interface UserProfile {
  id: string;
  name: string;
}

const AvitoAddReview = () => {
  const { userId } = useParams<{ userId: string }>();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [ads, setAds] = useState<Ad[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAd, setSelectedAd] = useState<Ad | null>(null);
  const [purchaseStatus, setPurchaseStatus] = useState<string>("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [step, setStep] = useState(1); // 1: выбор объявления, 2: покупка, 3: форма отзыва

  useEffect(() => {
    // Симуляция загрузки данных
    setTimeout(() => {
      setUserProfile({
        id: userId || "1",
        name: "UPGRADE(Dzerzhinsk)",
      });

      setAds([
        {
          id: "1",
          title: "ID-Cooling Frozn A410 Black",
          price: "1 500 ₽",
          image:
            "https://cdn.poehali.dev/files/98f4d8d2-6b87-48e8-abce-7aee57e534ab.png",
        },
        {
          id: "2",
          title: "Монитор Samsung 2K/ 144 HZ/ VA",
          price: "14 999 ₽",
          image:
            "https://cdn.poehali.dev/files/98f4d8d2-6b87-48e8-abce-7aee57e534ab.png",
        },
        {
          id: "3",
          title: "Игровой пк Ryzen 5 5600/B450/32 gb/RTX 2060",
          price: "35 000 ₽",
          image:
            "https://cdn.poehali.dev/files/98f4d8d2-6b87-48e8-abce-7aee57e534ab.png",
        },
        {
          id: "4",
          title: "Блок питания hspd 500w",
          price: "2 750 ₽",
          image:
            "https://cdn.poehali.dev/files/98f4d8d2-6b87-48e8-abce-7aee57e534ab.png",
        },
        {
          id: "5",
          title: "Компьютер Скупка/Сборка/Обмен",
          price: "100 ₽",
          image:
            "https://cdn.poehali.dev/files/98f4d8d2-6b87-48e8-abce-7aee57e534ab.png",
        },
        {
          id: "6",
          title: "Оперативная память DDR4 adata 8Gb 3200Mhz",
          price: "1 250 ₽",
          image:
            "https://cdn.poehali.dev/files/98f4d8d2-6b87-48e8-abce-7aee57e534ab.png",
        },
        {
          id: "7",
          title: "Thermaltake Litepower 550w/Новый",
          price: "3 850 ₽",
          image:
            "https://cdn.poehali.dev/files/98f4d8d2-6b87-48e8-abce-7aee57e534ab.png",
        },
        {
          id: "8",
          title: "Ноутбук Digma Eve C4801/Гарантия Ситилинк",
          price: "13 500 ₽",
          image:
            "https://cdn.poehali.dev/files/98f4d8d2-6b87-48e8-abce-7aee57e534ab.png",
        },
        {
          id: "9",
          title: "Ryzen 3 1200",
          price: "1 000 ₽",
          image:
            "https://cdn.poehali.dev/files/98f4d8d2-6b87-48e8-abce-7aee57e534ab.png",
        },
      ]);
    }, 500);
  }, [userId]);

  const filteredAds = ads.filter((ad) =>
    ad.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleAdSelect = (ad: Ad) => {
    setSelectedAd(ad);
    setStep(2);
  };

  const handlePurchaseStatusChange = (value: string) => {
    setPurchaseStatus(value);
    if (value) {
      setStep(3);
    }
  };

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const handleSubmit = () => {
    // Логика отправки отзыва
    console.log({
      userId,
      selectedAd,
      purchaseStatus,
      rating,
      comment,
    });
  };

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AvitoHeader />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="p-8">
          <h1 className="text-3xl font-bold text-center mb-8">
            Отзыв о пользователе
          </h1>

          {/* Шаг 1: Выбор объявления */}
          {step >= 1 && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg font-medium">Что вы обсуждали?</span>
                <div className="relative flex-1">
                  <Icon
                    name="Search"
                    className="absolute left-3 top-3 w-4 h-4 text-gray-400"
                  />
                  <Input
                    placeholder="Объявление"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {step === 1 && (
                <div className="space-y-3">
                  {filteredAds.map((ad) => (
                    <div
                      key={ad.id}
                      className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleAdSelect(ad)}
                    >
                      <img
                        src={ad.image}
                        alt={ad.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{ad.title}</h3>
                        <p className="text-lg font-bold text-blue-600">
                          {ad.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {step >= 2 && selectedAd && (
                <div className="flex items-center gap-4 p-4 border rounded-lg bg-gray-50">
                  <img
                    src={selectedAd.image}
                    alt={selectedAd.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{selectedAd.title}</h3>
                    <p className="text-lg font-bold text-blue-600">
                      {selectedAd.price}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setStep(1);
                      setSelectedAd(null);
                      setPurchaseStatus("");
                      setRating(0);
                      setComment("");
                    }}
                  >
                    <Icon name="Edit" className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Шаг 2: Покупка товара */}
          {step >= 2 && (
            <div className="mb-8">
              <div className="mb-4">
                <Label className="text-lg font-medium">
                  {step === 2 ? (
                    "Вы купили товар?"
                  ) : (
                    <Badge variant="outline" className="text-sm">
                      Вы купили товар?
                    </Badge>
                  )}
                </Label>
              </div>

              <RadioGroup
                value={purchaseStatus}
                onValueChange={handlePurchaseStatusChange}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="yes" />
                  <Label htmlFor="yes">Да</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="no" />
                  <Label htmlFor="no">Нет</Label>
                </div>
              </RadioGroup>

              {step === 2 && purchaseStatus && (
                <div className="mt-4">
                  <Button onClick={() => setStep(3)}>Продолжить</Button>
                </div>
              )}
            </div>
          )}

          {/* Шаг 3: Форма отзыва */}
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
                          star <= rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Комментарий */}
              <div>
                <Label className="text-lg font-medium mb-4 block">
                  Комментарий
                </Label>
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
                  disabled={!rating || !comment.trim()}
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
