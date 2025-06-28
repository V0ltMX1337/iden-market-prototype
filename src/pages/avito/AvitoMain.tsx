import AvitoHeader from "@/components/avitomarket/AvitoHeader";
import AvitoFooter from "@/components/avitomarket/AvitoFooter";
import AvitoProductSwiper from "@/components/avitomarket/AvitoProductSwiper";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import AvitoStories from "@/components/avitomarket/AvitoStories";
import AvitoRecommendations from "@/components/avitomarket/AvitoRecommendations";
import AvitoSliderSwiper from "@/components/avitomarket/AvitoSliderSwiper";
import AvitoCategorySwiper from "@/components/avitomarket/AvitoCategorySwiper";

const AvitoMain = () => {
  const navigate = useNavigate();

  const sliders = [
    {
      id: 1,
      name: "Слайдер 1",
      image:
        "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1410&h=400&fit=crop",
    },
    {
      id: 2,
      name: "Слайдер 2",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1410&h=400&fit=crop",
    },
  ];

  const categories = [
    {
      id: 1,
      name: "Авто",
      image:
        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=80&h=80&fit=crop&crop=center",
    },
    {
      id: 2,
      name: "Недвижимость",
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=80&h=80&fit=crop&crop=center",
    },
    {
      id: 3,
      name: "Работа",
      image:
        "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=80&h=80&fit=crop&crop=center",
    },
    {
      id: 4,
      name: "Одежда",
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=80&h=80&fit=crop&crop=center",
    },
    {
      id: 5,
      name: "Хобби",
      image:
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=80&h=80&fit=crop&crop=center",
    },
    {
      id: 6,
      name: "Электроника",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=80&h=80&fit=crop&crop=center",
    },
  ];

  const initialAds = [
    {
      id: 1,
      title: "iPhone 14 Pro 128GB Space Black",
      price: 85000,
      location: "Москва",
      image:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300",
      time: "сегодня",
      isVip: true,
    },
    {
      id: 2,
      title: "Volkswagen Golf 2019 года",
      price: 1850000,
      location: "Санкт-Петербург",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=300",
      time: "вчера",
    },
    {
      id: 3,
      title: "Диван угловой раскладной",
      price: 25000,
      location: "Екатеринбург",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300",
      time: "2 дня назад",
    },
    {
      id: 4,
      title: "MacBook Air M2 256GB",
      price: 95000,
      location: "Новосибирск",
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300",
      time: "3 дня назад",
    },
    {
      id: 5,
      title: "Samsung Galaxy S23 Ultra",
      price: 75000,
      location: "Казань",
      image:
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300",
      time: "неделю назад",
    },
  ];

  const [ads, setAds] = useState(initialAds);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreAds = () => {
    setTimeout(() => {
      setAds((prev) => [
        ...prev,
        ...prev.map((ad, index) => ({ ...ad, id: prev.length + index + 1 })),
      ]);
      if (ads.length > 20) setHasMore(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white">
      <AvitoHeader />

      {/* Слайдер */}
      <section style={{ paddingTop: "1.563rem" }}>
        <AvitoSliderSwiper slideres={sliders} />
      </section>

      {/* Горячие предложения */}
      <section style={{ paddingTop: "1.563rem" }}>
        <AvitoProductSwiper ads={initialAds} title="🔥 Горячие предложения" />
      </section>

      {/* Баннер */}
      <section style={{ paddingTop: "1.563rem" }}>
        <div className="w-full max-w-[1440px] mx-auto px-8">
          <img
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1410&h=200&fit=crop"
            alt="Баннер"
            className="w-full h-[200px] object-cover rounded-2xl"
          />
        </div>
      </section>

      {/* Категории */}
      <section style={{ paddingTop: "1.563rem" }}>
        <AvitoCategorySwiper products={categories} />
      </section>

      {/* Сторис */}
      <section style={{ paddingTop: "1.563rem" }}>
        <AvitoStories />
      </section>

      {/* Рекомендации */}
      <section style={{ paddingTop: "1.563rem" }}>
        <AvitoRecommendations />
      </section>

      <AvitoFooter />
    </div>
  );
};

export default AvitoMain;
