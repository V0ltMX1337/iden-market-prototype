import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { storeApi } from "@/lib/store";

interface Ad {
  id: string;
  title: string;
  price: number;
  status: "active" | "sold" | "inactive";
  views: number;
  favorites: number;
  image: string;
  createdAt: string;
}

const AvitoProfileAds = () => {
  const { user } = useAuth();
  const [ads, setAds] = useState<Ad[]>([]);
  const [activeTab, setActiveTab] = useState<"sold" | "active">("active");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserAds = async () => {
      if (!user) return;

      try {
        // Здесь будет запрос объявлений пользователя
        // Пока используем моковые данные, структурированные под API
        const mockAds: Ad[] = [
          {
            id: "1",
            title: "iPhone 14 Pro 128GB",
            price: 85000,
            status: "active",
            views: 247,
            favorites: 12,
            image:
              "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=200&fit=crop",
            createdAt: new Date(
              Date.now() - 2 * 24 * 60 * 60 * 1000,
            ).toISOString(),
          },
          {
            id: "2",
            title: "MacBook Air M2",
            price: 95000,
            status: "sold",
            views: 156,
            favorites: 8,
            image:
              "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=200&fit=crop",
            createdAt: new Date(
              Date.now() - 7 * 24 * 60 * 60 * 1000,
            ).toISOString(),
          },
        ];
        setAds(mockAds);
      } catch (error) {
        console.error("Ошибка загрузки объявлений:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserAds();
  }, [user]);

  const handleRemoveFromSale = async (adId: string) => {
    try {
      // Здесь будет API запрос на обновление статуса
      setAds((prev) =>
        prev.map((ad) =>
          ad.id === adId ? { ...ad, status: "inactive" as const } : ad,
        ),
      );
    } catch (error) {
      console.error("Ошибка при снятии с продажи:", error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "сегодня";
    if (diffDays === 2) return "вчера";
    if (diffDays <= 7) return `${diffDays} дня назад`;
    return `${Math.floor(diffDays / 7)} недель назад`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Фильтруем объявления по выбранной вкладке
  const filteredAds = ads.filter((ad) =>
    activeTab === "active" ? ad.status === "active" : ad.status === "sold",
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Мои объявления</h1>
        <Button
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
          onClick={() => (window.location.href = "/avito/profile/sell")}
        >
          <Icon name="Plus" size={16} className="mr-2" />
          Подать объявление
        </Button>
      </div>

      {/* Табы */}
      <div className="flex space-x-4 border-b border-gray-200 mb-4">
        <button
          className={`py-2 px-4 font-semibold ${
            activeTab === "active"
              ? "border-b-2 border-blue-600"
              : "text-gray-600 hover:text-blue-600"
          }`}
          onClick={() => setActiveTab("active")}
        >
          Активные
        </button>
        <button
          className={`py-2 px-4 font-semibold ${
            activeTab === "sold"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600 hover:text-blue-600"
          }`}
          onClick={() => setActiveTab("sold")}
        >
          Проданные
        </button>
      </div>

      {/* Объявления */}
      <div className="grid gap-6">
        {filteredAds.length === 0 && (
          <p className="text-center text-gray-500">
            Объявлений в этой категории пока нет.
          </p>
        )}
        {filteredAds.map((ad) => (
          <Card key={ad.id}>
            <CardContent className="p-6">
              <div className="flex gap-6">
                <div className="w-32 h-24 flex-shrink-0">
                  <img
                    src={ad.image}
                    alt={ad.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold">{ad.title}</h3>
                    <Badge className={getStatusColor(ad.status)}>
                      {getStatusText(ad.status)}
                    </Badge>
                  </div>
                  <p className="text-2xl font-bold text-green-600 mb-3">
                    {ad.price.toLocaleString()} ₽
                  </p>
                  <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                    <span className="flex items-center">
                      <Icon name="Eye" size={14} className="mr-1" />
                      {ad.views} просмотров
                    </span>
                    <span className="flex items-center">
                      <Icon name="Heart" size={14} className="mr-1" />
                      {ad.favorites} в избранном
                    </span>
                    <span>{formatDate(ad.createdAt)}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-blue-200 text-blue-600 hover:bg-blue-50"
                    >
                      Редактировать
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-purple-200 text-purple-600 hover:bg-purple-50"
                    >
                      Статистика
                    </Button>
                    {ad.status === "active" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveFromSale(ad.id)}
                        className="border-red-200 text-red-600 hover:bg-red-50"
                      >
                        Снять с продажи
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  function getStatusColor(status: string) {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "sold":
        return "bg-blue-100 text-blue-700";
      case "inactive":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  }

  function getStatusText(status: string) {
    switch (status) {
      case "active":
        return "Активно";
      case "sold":
        return "Продано";
      case "inactive":
        return "Неактивно";
      default:
        return "Неизвестно";
    }
  }
};

export default AvitoProfileAds;
