import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";
import type { Category } from "@/lib/types";

interface AvitoCategorySwiperProps {
  products: Category[];
}

const AvitoCategorySwiper: React.FC<AvitoCategorySwiperProps> = ({
  products,
}) => {
  const navigate = useNavigate();

  const swiperStyles = `
    .swiper-button-next,
    .swiper-button-prev {
      width: 48px !important;
      height: 48px !important;
      background: white !important;
      border-radius: 50% !important;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
      border: 1px solid #e5e7eb !important;
      color: #3b82f6 !important;
      opacity: 0 !important;
      transition: all 0.3s ease !important;
    }

    .group:hover .swiper-button-next,
    .group:hover .swiper-button-prev {
      opacity: 1 !important;
    }

    .swiper-button-next:hover,
    .swiper-button-prev:hover {
      color: #2563eb !important;
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
  `;

  const handleCategoryClick = (category: Category) => {
    // Навигация по slug с выбором города
    navigate(`/category/all/${category.slug}`);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: swiperStyles }} />
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="group bg-white rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4 md:mb-8">
            <h2 className="text-lg md:text-2xl font-bold text-gray-900">🛍️ Категории</h2>
          </div>

          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={16}
            slidesPerView={2}
            navigation={true}
            loop={products.length > 6}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              320: { slidesPerView: 2, spaceBetween: 12 },
              480: { slidesPerView: 3, spaceBetween: 16 },
              640: { slidesPerView: 4, spaceBetween: 20 },
              768: { slidesPerView: 5, spaceBetween: 24 },
              1024: { slidesPerView: 6, spaceBetween: 24 },
              1200: { slidesPerView: 8, spaceBetween: 24 },
            }}
            className="!pb-2"
          >
            {products.map((category) => (
              <SwiperSlide key={category.id}>
                <div
                  className="bg-gray-50 rounded-xl md:rounded-2xl p-3 md:p-4 hover:shadow-lg transition-all duration-300 cursor-pointer group/card h-24 md:h-32 flex flex-col items-center justify-center"
                  onClick={() => handleCategoryClick(category)}
                >
                  <div className="w-8 h-8 md:w-12 md:h-12 mb-2 md:mb-3 overflow-hidden rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    {category.icon.startsWith('http') ? (
                      <img
                        src={category.icon}
                        alt={category.name}
                        className="w-5 h-5 md:w-8 md:h-8 object-cover rounded-full"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          target.nextElementSibling!.className =
                            "text-white text-xs md:text-sm";
                        }}
                      />
                    ) : (
                      <span className="text-lg md:text-2xl">
                        {category.icon}
                      </span>
                    )}
                    <span className="text-white text-xs md:text-xs font-medium hidden">
                      {category.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-xs md:text-sm font-medium text-gray-900 text-center leading-tight" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {category.name}
                  </h3>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default AvitoCategorySwiper;