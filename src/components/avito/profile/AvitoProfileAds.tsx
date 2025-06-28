import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useState } from "react";

const AvitoProfileAds = () => {
  const myAds = [
    {
      id: 1,
      title: "iPhone 14 Pro 128GB",
      price: 85000,
      status: "active",
      views: 247,
      favorites: 12,
      image:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=200&fit=crop",
      createdAt: "2 дня назад",
    },
    {
      id: 2,
      title: "MacBook Air M2",
      price: 95000,
      status: "sold",
      views: 156,
      favorites: 8,
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=200&fit=crop",
      createdAt: "1 неделю назад",
    },
    {
      id: 3,
      title: "Диван угловой",
      price: 25000,
      status: "active",
      views: 89,
      favorites: 3,
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
      createdAt: "3 дня назад",
    },
  ];

  const [activeTab, setActiveTab] = useState<"sold" | "active">("active");
  const [editingAd, setEditingAd] = useState<number | null>(null);
  const [adsList, setAdsList] = useState(myAds);

  const handleRemoveFromSale = (adId: number) => {
    setAdsList((prev) =>
      prev.map((ad) => (ad.id === adId ? { ...ad, status: "inactive" } : ad)),
    );
  };

  const handleEditAd = (adId: number) => {
    setEditingAd(adId);
  };

  const getStatusColor = (status: string) => {
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
  };

  const getStatusText = (status: string) => {
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
  };

  // Фильтруем объявления по выбранной вкладке
  const filteredAds = adsList.filter((ad) =>
    activeTab === "active" ? ad.status === "active" : ad.status === "sold",
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Мои объявления</h1>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
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
                    <span>{ad.createdAt}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditAd(ad.id)}
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
};

export default AvitoProfileAds;
