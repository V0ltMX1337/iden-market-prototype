import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
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
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .swiper-button-next,
        .swiper-button-prev {
          width: 48px !important;
          height: 48px !important;
          background: white !important;
          border-radius: 50% !important;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
          border: 1px solid #e5e7eb !important;
          color: #6b7280 !important;
          opacity: 0 !important;
          transition: all 0.3s ease !important;
        }

        .group:hover .swiper-button-next,
        .group:hover .swiper-button-prev {
          opacity: 1 !important;
        }

        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          color: #111827 !important;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
        }

        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 18px !important;
          font-weight: bold !important;
        }

        .swiper-button-next {
          right: 16px !important;
        }

        .swiper-button-prev {
          left: 16px !important;
        }

        .swiper-slide {
          height: auto !important;
          display: flex !important;
        }

        .swiper-wrapper {
          align-items: stretch !important;
        }
      `,
        }}
      />
      <div className="w-full max-w-[1440px] mx-auto px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-left">
          Новинки
        </h2>
        <div className="relative group overflow-hidden">
          <Swiper
            modules={[Navigation]}
            slidesPerView={1}
            spaceBetween={24}
            loop={true}
            loopAdditionalSlides={2}
            centeredSlides={false}
            navigation={true}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 32,
              },
            }}
            className="!overflow-hidden !mx-0 !px-0"
            style={{ margin: 0, padding: 0 }}
            slidesOffsetBefore={0}
            slidesOffsetAfter={0}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id} className="!h-auto">
                <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 overflow-hidden flex flex-col h-full">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-72 object-cover hover:scale-105 transition-transform duration-300"
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
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="text-2xl font-bold text-gray-900">
                        {product.price.toLocaleString()} ₽
                      </div>
                      {product.originalPrice && (
                        <div className="text-base text-gray-400 line-through">
                          {product.originalPrice.toLocaleString()} ₽
                        </div>
                      )}
                    </div>
                    <h3 className="font-semibold text-xl text-gray-900 mb-3">
                      {product.name}
                    </h3>
                    <div className="mt-auto space-y-4">
                      <div className="flex items-center gap-1">
                        <div className="flex">
                          {renderStars(product.rating)}
                        </div>
                      </div>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 py-3 text-base">
                        В корзину
                      </Button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default ProductSwiper;
