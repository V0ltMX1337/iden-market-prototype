import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

interface Product {
  id: number;
  name: string;
  image: string;
}

interface CategorySwipperProps {
  products: Product[];
}

const CategorySwiper: React.FC<CategorySwipperProps> = ({ products }) => {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
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
      `}} />
      <div className="w-full max-w-[1440px] mx-auto px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-left">
          Новинки
        </h2>
        <div className="relative group overflow-hidden px-8">
      <Swiper
        modules={[Navigation, Autoplay]}
        slidesPerView={1}
        spaceBetween={16}
        loop={true}
        loopAdditionalSlides={2}
        centeredSlides={false}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 4,
          },
          1280: {
            slidesPerView: 6,
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

export default CategorySwiper;
