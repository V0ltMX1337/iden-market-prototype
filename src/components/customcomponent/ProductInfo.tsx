import { useState, useMemo, useCallback, memo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AdSold, City } from "@/lib/types";

interface ProductInfoProps {
  title: string;
  price: number;
  city: City;
  views: number;
  favorites: number;
  publishedAt: string;
  onDeliveryClick: () => void;
  onChatClick: () => void;
  isFavorite: boolean;
  inCart: boolean;
  onToggleFavorite: () => void;
  onToggleCart: () => void;
  phone: string;
  latitude: number;
  longitude: number;
  fullAdress: string;
  adSold: AdSold;
}

const PhoneModal = memo(({ open, onClose, phone }: { open: boolean; onClose: () => void; phone: string }) => (
  <Dialog open={open} onOpenChange={onClose}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Телефон продавца</DialogTitle>
      </DialogHeader>
      <div className="text-center my-4 space-y-3">
        <p className="text-xl font-semibold">{phone}</p>
        <a
          href={`tel:${phone}`}
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Позвонить
        </a>
      </div>
      <div className="mt-4 text-sm text-gray-600 space-y-2">
        <p className="font-medium text-gray-800">Правила безопасных сделок:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Общайтесь на Trivo, не уходите в мессенджеры</li>
          <li>Не сообщайте почту, паспорт и карту</li>
          <li>Игнорируйте ссылки на оплату от собеседников</li>
          <li>Никому не говорите коды из SMS и пушей</li>
        </ul>
      </div>
    </DialogContent>
  </Dialog>
));

const MapModal = memo(
  ({
    open,
    onClose,
    latitude,
    longitude,
    fullAdress,
  }: {
    open: boolean;
    onClose: () => void;
    latitude: number;
    longitude: number;
    fullAdress: string;
  }) => (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[600px] p-0 overflow-hidden">
        <DialogHeader>
          <DialogTitle className="px-6 pt-6">Расположение на карте</DialogTitle>
        </DialogHeader>
        <div className="px-6 pb-4">
          <p className="mb-4 text-gray-700">{fullAdress}</p>
        </div>
        <div className="h-[520px] px-6 pb-6">
          <YMaps
            query={{
              lang: "ru_RU",
              apikey: "254a1844-cf4b-49db-836c-c5aa61915d75",
              load: "package.full",
            }}
          >
            <Map
              defaultState={{ center: [latitude, longitude], zoom: 14 }}
              width="100%"
              height="100%"
            >
              <Placemark geometry={[latitude, longitude]} />
            </Map>
          </YMaps>
        </div>
      </DialogContent>
    </Dialog>
  )
);

const ProductInfo = ({
  title,
  price,
  city,
  views,
  publishedAt,
  onDeliveryClick,
  onChatClick,
  isFavorite,
  inCart,
  onToggleFavorite,
  onToggleCart,
  phone,
  latitude,
  longitude,
  fullAdress,
  adSold,
}: ProductInfoProps) => {
  const [isPhoneModalOpen, setPhoneModalOpen] = useState(false);
  const [isMapModalOpen, setMapModalOpen] = useState(false);

  const formattedDate = useMemo(() => {
    return new Date(publishedAt).toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [publishedAt]);

  const adSoldLabel = useMemo(() => {
    switch (adSold) {
      case AdSold.NEW:
        return "Новое";
      case AdSold.OTLICHNOE:
        return "Отличное";
      case AdSold.XOROSHEE:
        return "Хорошее";
      case AdSold.YDVORITEL:
        return "Удовлетворительное";
      default:
        return "Новое";
    }
  }, [adSold]);

  const fakeOldPrice = useMemo(() => price + 2000, [price]);

  const handleToggleFavorite = useCallback(() => {
    onToggleFavorite();
  }, [onToggleFavorite]);

  const handleToggleCart = useCallback(() => {
    onToggleCart();
  }, [onToggleCart]);

  const handleDeliveryClick = useCallback(() => {
    onDeliveryClick();
  }, [onDeliveryClick]);

  const handleChatClick = useCallback(() => {
    onChatClick();
  }, [onChatClick]);

  const openPhoneModal = useCallback(() => {
    setPhoneModalOpen(true);
  }, []);

  const openMapModal = useCallback(() => {
    setMapModalOpen(true);
  }, []);

  const closePhoneModal = useCallback(() => {
    setPhoneModalOpen(false);
  }, []);

  const closeMapModal = useCallback(() => {
    setMapModalOpen(false);
  }, []);

  return (
    <TooltipProvider>
      <Card className="bg-gradient-to-br from-white to-blue-50/50 border-purple-200 h-fit">
        <CardContent className="p-4 scrollbar-none">
          <div className="flex items-start justify-between mb-3">
            <div>
              <Badge className="bg-green-100 text-green-800 mb-2">{adSoldLabel}</Badge>
              <h1 className="text-xl font-bold mb-2">{title}</h1>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className={`transition-colors ${
                isFavorite ? "text-red-500 hover:text-red-700" : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={handleToggleFavorite}
              aria-label={isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
            >
              <Icon name="Heart" size={20} />
            </Button>
          </div>

          <div className="mb-4">
            <div className="flex items-baseline space-x-3">
              <p className="text-3xl font-bold text-gray-900">{price.toLocaleString()} ₽</p>
              <p className="text-lg text-gray-500 line-through">{fakeOldPrice.toLocaleString()} ₽</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="flex items-center cursor-pointer hover:text-blue-600" onClick={openMapModal}>
                  <Icon name="MapPin" size={16} className="mr-1" />
                  {city.name}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                {city.name} &gt; {city.region}
              </TooltipContent>
            </Tooltip>

            <span className="flex items-center">
              <Icon name="Eye" size={16} className="mr-1" />
              {views} просмотров
            </span>
          </div>

          <div className="space-y-3">
            <Button
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 h-12 text-white font-semibold"
              onClick={handleDeliveryClick}
            >
              Запросить доставку
            </Button>

            <div className="text-sm text-gray-600 space-y-1 px-2">
              <p>Trivo Доставка.</p>
              <p>Гарантия возврата денег, если товар не подойдёт</p>
              <button className="text-blue-600 hover:underline transition-colors">Об Trivo Доставке</button>
            </div>

            <Button className="w-full bg-green-600 hover:bg-green-700 h-12" onClick={handleChatClick}>
              <Icon name="MessageCircle" size={18} className="mr-2" />
              Написать продавцу
            </Button>

            <Button
              variant="outline"
              className="w-full h-12 border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors"
              onClick={openPhoneModal}
            >
              <Icon name="Phone" size={18} className="mr-2" />
              Показать телефон
            </Button>

            <Button
              className={`w-full h-12 font-semibold ${
                inCart ? "bg-red-600 hover:bg-red-700 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
              onClick={handleToggleCart}
            >
              {inCart ? "Удалить из корзины" : "Добавить в корзину"}
            </Button>
          </div>

          <p className="text-sm text-gray-500 mt-4">Размещено {formattedDate}</p>
        </CardContent>
      </Card>

      <PhoneModal open={isPhoneModalOpen} onClose={closePhoneModal} phone={phone} />
      <MapModal
        open={isMapModalOpen}
        onClose={closeMapModal}
        latitude={latitude}
        longitude={longitude}
        fullAdress={fullAdress}
      />
    </TooltipProvider>
  );
};

export default memo(ProductInfo);
