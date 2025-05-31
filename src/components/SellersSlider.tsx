import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

interface Seller {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  products: number;
}

const SellersSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const sellers: Seller[] = [
    {
      id: 1,
      name: "OnShop",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
      rating: 4.8,
      products: 127,
    },
    {
      id: 2,
      name: "ReVolt",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop&crop=face",
      rating: 4.9,
      products: 89,
    },
    {
      id: 3,
      name: "GG17",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b332c796?w=64&h=64&fit=crop&crop=face",
      rating: 4.7,
      products: 234,
    },
    {
      id: 4,
      name: "ATALANT",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
      rating: 4.6,
      products: 156,
    },
    {
      id: 5,
      name: "AKIRA",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
      rating: 5.0,
      products: 78,
    },
    {
      id: 6,
      name: "TechPro",
      avatar:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=64&h=64&fit=crop&crop=face",
      rating: 4.5,
      products: 203,
    },
  ];

  const itemsPerView = 4;
  const maxIndex = Math.max(0, sellers.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Популярные продавцы
      </h2>

      <div className="relative">
        {/* Navigation buttons */}
        <Button
          variant="outline"
          size="sm"
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 rounded-full w-10 h-10 p-0"
        >
          <Icon name="ChevronLeft" size={16} />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={nextSlide}
          disabled={currentIndex >= maxIndex}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 rounded-full w-10 h-10 p-0"
        >
          <Icon name="ChevronRight" size={16} />
        </Button>

        {/* Slider container */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            }}
          >
            {sellers.map((seller) => (
              <div key={seller.id} className="flex-shrink-0 w-1/4 px-2">
                <a
                  href={`/seller/${seller.id}`}
                  className="group flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
                >
                  <img
                    src={seller.avatar}
                    alt={seller.name}
                    className="w-16 h-16 rounded-full mb-3 group-hover:scale-110 transition-transform"
                  />
                  <span className="font-medium text-gray-900 text-sm mb-1">
                    {seller.name}
                  </span>
                  <div className="flex items-center text-xs text-gray-600 mb-1">
                    <Icon
                      name="Star"
                      size={12}
                      className="text-yellow-500 mr-1"
                    />
                    <span>{seller.rating}</span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {seller.products} товаров
                  </span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellersSlider;
