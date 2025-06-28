import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

interface Slider {
  id: number;
  name: string;
  image: string;
}

interface AvitoSliderSwiperProps {
  slideres: Slider[];
}

const AvitoSliderSwiper: React.FC<AvitoSliderSwiperProps> = ({ slideres }) => {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .swiper-button-next,
        .swiper-button-prev {
          width: 36px !important;
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
      `,
        }}
      />
      <div className="w-full max-w-[1440px] mx-auto px-8">
        <div className="relative group overflow-hidden">
          <Swiper
            modules={[Navigation]}
            slidesPerView={1}
            spaceBetween={8}
            loop={true}
            loopAdditionalSlides={2}
            centeredSlides={false}
            navigation={true}
            className="!overflow-hidden !mx-0 !px-0"
            style={{ margin: 0, padding: 0 }}
          >
            {slideres.map((slider) => (
              <SwiperSlide key={slider.id} className="!h-auto">
                <div className="relative">
                  <img
                    src={slider.image}
                    alt={slider.name}
                    className="w-full h-[300px] object-cover rounded-2xl"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default AvitoSliderSwiper;
