import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

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

  // Fallback если нет товаров
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Товары не найдены</p>
      </div>
    );
  }

  return (
    <div className="relative group">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={24}
        slidesPerView="auto"
        loop={products.length > 1}
        autoplay={
          products.length > 1
            ? {
                delay: 3000,
                disableOnInteraction: false,
              }
            : false
        }
        navigation={{
          prevEl: ".swiper-button-prev-custom",
          nextEl: ".swiper-button-next-custom",
        }}
        className="px-8"
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 16,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: "auto",
            spaceBetween: 24,
          },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="!w-56 max-w-56">
            <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 overflow-hidden flex flex-col h-full">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                {product.badge && (
                  <Badge
                    className={`absolute top-2 left-2 ${product.badgeColor || "bg-red-500"} text-white text-xs`}
                  >
                    {product.badge}
                  </Badge>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2 opacity-0 hover:opacity-100 transition-opacity p-2 h-8 w-8 bg-white"
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
                <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
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

      {/* Custom Navigation Buttons - только если товаров больше 1 */}
      {products.length > 1 && (
        <>
          <Button
            className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 h-14 w-14 rounded-full bg-white shadow-lg hover:shadow-xl border border-gray-200 text-gray-600 hover:text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            size="sm"
            variant="outline"
          >
            <Icon name="ChevronLeft" size={24} className="stroke-2" />
          </Button>

          <Button
            className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 h-14 w-14 rounded-full bg-white shadow-lg hover:shadow-xl border border-gray-200 text-gray-600 hover:text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            size="sm"
            variant="outline"
          >
            <Icon name="ChevronRight" size={24} className="stroke-2" />
          </Button>
        </>
      )}
    </div>
  );
};

export default ProductSwiper;
