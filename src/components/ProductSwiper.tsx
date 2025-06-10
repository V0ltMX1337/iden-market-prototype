import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
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
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 768px)": { slidesToScroll: 2 },
      "(min-width: 1024px)": { slidesToScroll: 3 },
    },
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

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
      {/* Navigation Buttons */}
      <Button
        onClick={scrollPrev}
        size="sm"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-14 w-14 rounded-full bg-white shadow-lg hover:shadow-xl border border-gray-200 text-gray-600 hover:text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <Icon name="ChevronLeft" size={48} className="stroke-2" />
      </Button>

      <Button
        onClick={scrollNext}
        size="sm"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-14 w-14 rounded-full bg-white shadow-lg hover:shadow-xl border border-gray-200 text-gray-600 hover:text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <Icon name="ChevronRight" size={48} className="stroke-2" />
      </Button>

      {/* Swiper Container */}
      <div className="overflow-hidden mx-8" ref={emblaRef}>
        <div className="flex gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-none w-56 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-56 h-56 object-cover hover:scale-105 transition-transform duration-300"
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
                <div className="flex items-center justify-between mb-3">
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSwiper;
