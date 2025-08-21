import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { storeApi } from "@/lib/store";
import { Ad as AdType, AdStatus } from "@/lib/types";
import { useNavigate } from "react-router-dom";

const AvitoProfileAds = () => {
  const { user, isLoading: authLoading } = useAuth();
  const [ads, setAds] = useState<AdType[]>([]);
  const [activeTab, setActiveTab] = useState<"active" | "sold" | "needs_action">("active");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserAds = async () => {
      if (!user) return setIsLoading(false);

      try {
        setIsLoading(true);
        const userAds = await storeApi.getUserAds(user.id);
        setAds(userAds);
      } catch (err: any) {
        setError(err.message || "Ошибка загрузки объявлений");
      } finally {
        setIsLoading(false);
      }
    };

    if (!authLoading) {
      loadUserAds();
    }
  }, [user, authLoading]);

  const handleRemoveFromSale = async (adId: string) => {
    try {
      const currentAd = ads.find((ad) => ad.id === adId);
      if (!currentAd) return;

      const updatedAd = { ...currentAd, adStatus: AdStatus.SOLD };
      await storeApi.updateAd(adId, updatedAd);

      setAds((prev) =>
        prev.map((ad) =>
          ad.id === adId ? { ...ad, adStatus: AdStatus.SOLD } : ad
        )
      );
    } catch (error) {
      console.error("Ошибка при снятии с продажи:", error);
    }
  };

  const handleExtendAd = async (adId: string) => {
    try {
      const ad = ads.find((ad) => ad.id === adId);
      if (!ad) return;

      const updatedAd = {
        ...ad,
        publishedAt: new Date().toISOString(),
        adStatus: AdStatus.ACTIVE,
      };

      await storeApi.updateAd(adId, updatedAd);

      setAds((prev) =>
        prev.map((item) => (item.id === adId ? updatedAd : item))
      );
    } catch (error) {
      console.error("Ошибка при продлении:", error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "сегодня";
    if (diffDays === 1) return "вчера";
    if (diffDays <= 7) return `${diffDays} дня назад`;
    return `${Math.floor(diffDays / 7)} недель назад`;
  };

  const filteredAds = ads.filter((ad) => {
    switch (activeTab) {
      case "active":
        return ad.adStatus === AdStatus.ACTIVE;
      case "sold":
        return ad.adStatus === AdStatus.SOLD;
      case "needs_action":
        return (
          ad.adStatus === AdStatus.BLOCKED ||
          ad.adStatus === AdStatus.TIME_OUT ||
          (ad.adStatus !== AdStatus.ACTIVE && ad.adStatus !== AdStatus.SOLD)
        );
      default:
        return false;
    }
  });

  if (authLoading || isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600 text-center py-8">Ошибка: {error}</div>;
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-3 md:space-y-0">
        <h1 className="text-lg md:text-2xl font-bold">Мои объявления</h1>
        <Button
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white w-full md:w-auto"
          onClick={() => (window.location.href = "/profile/sell")}
          size="sm"
        >
          <Icon name="Plus" size={14} className="mr-2" />
          <span className="md:hidden">Подать</span>
          <span className="hidden md:inline">Подать объявление</span>
        </Button>
      </div>

      <div className="flex space-x-2 md:space-x-4 border-b border-gray-200 mb-4 overflow-x-auto">
        <button
          className={`py-2 px-3 md:px-4 font-semibold text-sm md:text-base whitespace-nowrap ${
            activeTab === "active"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600 hover:text-blue-600"
          }`}
          onClick={() => setActiveTab("active")}
        >
          Активные
        </button>
        <button
          className={`py-2 px-3 md:px-4 font-semibold text-sm md:text-base whitespace-nowrap ${
            activeTab === "sold"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600 hover:text-blue-600"
          }`}
          onClick={() => setActiveTab("sold")}
        >
          Проданные
        </button>
        <button
          className={`py-2 px-3 md:px-4 font-semibold text-sm md:text-base whitespace-nowrap ${
            activeTab === "needs_action"
              ? "border-b-2 border-red-600 text-red-600"
              : "text-gray-600 hover:text-red-600"
          }`}
          onClick={() => setActiveTab("needs_action")}
        >
          Требует действий
        </button>
      </div>

      <div className="grid gap-3 md:gap-6">
        {filteredAds.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <Icon name="Package" size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-sm md:text-base">
              Объявлений в этой категории пока нет.
            </p>
          </div>
        )}
        {filteredAds.map((ad) => (
          <Card key={ad.id}>
            <CardContent className="p-3 md:p-6">
              <div className="flex flex-col md:flex-row gap-3 md:gap-6">
                <div
                  className="w-full h-32 md:w-32 md:h-24 flex-shrink-0 cursor-pointer"
                  onClick={() => navigate(`/product/${ad.slug}/${ad.id}`)}
                >
                  <img
                    src={ad.links[0] || "/placeholder.png"}
                    alt={ad.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-start justify-between mb-2 space-y-2 md:space-y-0">
                    <h3
                      className="text-base md:text-lg font-semibold cursor-pointer hover:underline line-clamp-2"
                      onClick={() => navigate(`/product/${ad.slug}/${ad.id}`)}
                    >
                      {ad.title}
                    </h3>
                    <Badge className={`${getStatusColor(ad.adStatus)} text-xs md:text-sm w-fit`}>
                      {getStatusText(ad.adStatus)}
                    </Badge>
                  </div>
                  <p className="text-lg md:text-2xl font-bold text-green-600 mb-2 md:mb-3">
                    {ad.price.toLocaleString()} ₽
                  </p>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-xs md:text-sm text-gray-600 mb-3 md:mb-4">
                    <span className="flex items-center">
                      <Icon name="Eye" size={12} className="mr-1" />
                      {ad.views} просмотров
                    </span>
                    <span className="flex items-center">
                      <Icon name="Heart" size={12} className="mr-1" />
                      {ad.favoritesCount} в избранном
                    </span>
                    <span>{formatDate(ad.publishedAt)}</span>
                  </div>
                  <div className="grid grid-cols-2 md:flex gap-2 md:flex-wrap">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-blue-200 text-blue-600 hover:bg-blue-50 text-xs md:text-sm"
                      onClick={() => navigate(`/profile/${ad.id}/edit`)}
                    >
                      Редактировать
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/profile/${ad.id}/statistic`)}
                      className="border-purple-200 text-purple-600 hover:bg-purple-50 text-xs md:text-sm"
                    >
                      Статистика
                    </Button>
                    {ad.adStatus === AdStatus.ACTIVE && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveFromSale(ad.id)}
                        className="border-red-200 text-red-600 hover:bg-red-50 text-xs md:text-sm col-span-2 md:col-span-1"
                      >
                        Снять с продажи
                      </Button>
                    )}
                    {ad.adStatus === AdStatus.TIME_OUT && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleExtendAd(ad.id)}
                        className="border-green-200 text-green-600 hover:bg-green-50 text-xs md:text-sm col-span-2 md:col-span-1"
                      >
                        Продлить
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

  function getStatusColor(status: AdStatus) {
    switch (status) {
      case AdStatus.ACTIVE:
        return "bg-green-100 text-green-700";
      case AdStatus.SOLD:
        return "bg-blue-100 text-blue-700";
      case AdStatus.TIME_OUT:
      case AdStatus.BLOCKED:
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  }

  function getStatusText(status: AdStatus) {
    switch (status) {
      case AdStatus.ACTIVE:
        return "Активно";
      case AdStatus.SOLD:
        return "Продано";
      case AdStatus.TIME_OUT:
        return "Истёк срок размещения";
      case AdStatus.BLOCKED:
        return "Заблокировано";
      default:
        return "Неизвестно";
    }
  }
};

export default AvitoProfileAds;