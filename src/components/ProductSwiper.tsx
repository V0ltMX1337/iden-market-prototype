import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  badge?: string;
  badgeColor?: string;
}

interface ProductSwiperProps {
  products: Product[];
}

const ProductSwiper: React.FC<ProductSwiperProps> = ({ products }) => {
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Icon
        key={i}
        name="Star"
        size={14}
        className={
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }
      />
    ));
  };

  return (
    <div className="relative group">
      <Swiper
        modules={[Navigation, Autoplay]}
        slidesPerView={1}
        spaceBetween={16}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
          1280: {
            slidesPerView: 5,
          },
        }}
        className="!overflow-visible"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 overflow-hidden flex flex-col">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
                />
                {product.badge && (
                  <Badge
                    className={`absolute top-2 left-2 ${product.badgeColor} text-white text-xs`}
                  >
                    {product.badge}
                  </Badge>
                )}
                <Button
                  size="sm"
                  className="absolute top-2 right-2 opacity-0 hover:opacity-100 transition-opacity p-2 h-8 w-8"
                >
                  <Icon name="Heart" size={12} />
                </Button>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <div className="text-xl font-bold text-gray-900">
                    {product.price.toLocaleString()} ₽
                  </div>
                  {product.originalPrice && (
                    <div className="text-sm text-gray-400 line-through">
                      {product.originalPrice.toLocaleString()} ₽
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  {product.name}
                </h3>
                <div className="mt-auto space-y-3">
                  <div className="flex items-center gap-1">
                    <div className="flex">{renderStars(product.rating)}</div>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    В корзину
                  </Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <Button
        className="swiper-button-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 h-14 w-14 rounded-full bg-white shadow-lg hover:shadow-xl border border-gray-200 text-gray-600 hover:text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        size="sm"
      >
        <Icon name="ChevronLeft" size={20} className="stroke-2" />
      </Button>

      <Button
        className="swiper-button-next absolute right-4 top-1/2 -translate-y-1/2 z-10 h-14 w-14 rounded-full bg-white shadow-lg hover:shadow-xl border border-gray-200 text-gray-600 hover:text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        size="sm"
      >
        <Icon name="ChevronRight" size={20} className="stroke-2" />
      </Button>
    </div>
  );
};

export default ProductSwiper;
