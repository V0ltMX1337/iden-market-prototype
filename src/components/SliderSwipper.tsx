import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface Slider {
  id: number;
  name: string;
  image: string;
}

interface SliderSwipperProps {
  slideres: Slider[];
}

const SliderSwiper: React.FC<SliderSwipperProps> = ({ slideres }) => {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .swiper-button-next,
        .swiper-button-prev {
          width: 36px !important;
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
      <div className="relative group overflow-hidden">

      <Swiper
        modules={[Navigation]}
        slidesPerView={1}
        spaceBetween={8}
        loop={true}
        loopAdditionalSlides={2}
        centeredSlides={false}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 1,
          },
          1280: {
            slidesPerView: 1,
          },
        }}
        className="!overflow-hidden !mx-0 !px-0"
        style={{ margin: 0, padding: 0 }}
        slidesOffsetBefore={0}
        slidesOffsetAfter={0}
      >
        {slideres.map((product) => (
          <SwiperSlide key={product.id} className="!h-auto">
            <div className="w-full flex justify-center">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-w-full h-auto"
                  style={{ maxWidth: "1410px" }}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      </div>
    </>
  );
};

export default SliderSwiper;
