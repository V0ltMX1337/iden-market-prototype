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

const AvitoMain = () => {
  const navigate = useNavigate();

  const categories = [
  { name: "Авто", iconClass: "i-car" },
  { name: "Недвижимость", iconClass: "i-home" },
  { name: "Работа", iconClass: "i-briefcase" },
  { name: "Одежда", iconClass: "i-shirt" },
  { name: "Хобби", iconClass: "i-palette" },
  { name: "Электроника", iconClass: "i-smartphone" },
];

  const initialAds = [
    {
      id: 1,
      title: "iPhone 14 Pro 128GB Space Black",
      price: 85000,
      location: "Москва",
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300",
    },
    {
      id: 2,
      title: "Volkswagen Golf 2019 года",
      price: 1850000,
      location: "Санкт-Петербург",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=300",
    },
    {
      id: 3,
      title: "Диван угловой раскладной",
      price: 25000,
      location: "Екатеринбург",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300",
    },
    {
      id: 4,
      title: "MacBook Air M2 256GB",
      price: 95000,
      location: "Новосибирск",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300",
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
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600">
      <AvitoHeader />

      {/* Hero */}
      <section className="text-white py-20 pt-32 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-6">Найдите всё, что нужно</h1>
          <p className="text-xl mb-8">Покупайте и продавайте легко по всей России</p>
          <Button
            onClick={() => navigate("/avito/sell")}
            className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-6 py-4"
          >
            <Icon name="Plus" className="mr-2" />
            Подать объявление
          </Button>
        </div>
      </section>

      {/* Main content */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">

          {/* Категории */}
          <section className="py-8">
  <h2 className="text-3xl font-bold mb-6 text-center">Популярные категории</h2>
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
    {categories.map((cat) => (
      <div
        key={cat.name}
        className="rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center py-6 hover:shadow-lg transition"
      >
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow mb-3">
          <i className={`${cat.iconClass} text-2xl`} />
        </div>
        <span className="text-sm font-medium text-center">{cat.name}</span>
      </div>
    ))}
  </div>
</section>

          {/* Сторис */}
          <AvitoStories />

          {/* Горячие предложения */}
          <AvitoProductSwiper ads={initialAds} title="🔥 Горячие предложения" />

          {/* Рекомендации */}
          <AvitoRecommendations />

        </div>
      </div>

      <AvitoFooter />
    </div>
  );
};

export default AvitoMain;
