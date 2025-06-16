import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/grid";
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

const ProductSales: React.FC<ProductSwiperProps> = ({ products }) => {
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
      <div className="max-w-[1440px] mx-auto px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-left">
          Распродажа
        </h2>
        <div className="relative group overflow-hidden px-8">
          <Swiper
            modules={[Grid, Pagination]}
            slidesPerView={1}
            spaceBetween={20}
            loop={false}
            loopAdditionalSlides={1}
            centeredSlides={false}
            pagination = {{
             enabled: true,
             el: '.swiper-pagination',
             type: 'bullets',
            }}
            grid={{
              fill: "row",
              rows: 20,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
              1410: {
                slidesPerView: 5,
                spaceBetween: 40,
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
                      className="w-full flex justify-center"
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

export default ProductSales;
