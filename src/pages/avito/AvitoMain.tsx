import AvitoHeader from "@/components/avitomarket/AvitoHeader";
import AvitoFooter from "@/components/avitomarket/AvitoFooter";
import AvitoProductSwiper from "@/components/avitomarket/AvitoProductSwiper";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AvitoStories from "@/components/avitomarket/AvitoStories";
import AvitoRecommendations from "@/components/avitomarket/AvitoRecommendations";
import AvitoCategorySwiper from "@/components/avitomarket/AvitoCategorySwiper";

const AvitoMain = () => {
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen bg-gray-50">
      <AvitoHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         {/* Сторис */}
        <section className="pt-8">
          <AvitoStories />
        </section>
      </div>

      {/* Категории */}
      <section className="pt-8">
        <AvitoCategorySwiper products={categories} />
      </section>
      
      {/* Горячие предложения */}
      <section className="pt-8">
        <AvitoProductSwiper ads={initialAds} title="🔥 Горячие предложения" />
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Рекомендации */}
        <section className="pt-8 pb-8">
          <AvitoRecommendations />
        </section>
      </div>

      <AvitoFooter />
    </div>
  );
};

export default AvitoMain;