import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

interface Category {
  id: number;
  name: string;
  image: string;
}

interface AvitoCategorySwiperProps {
  products: Category[];
}

const AvitoCategorySwiper: React.FC<AvitoCategorySwiperProps> = ({
  products,
}) => {
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
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5x rgba(0, 0, 0, 0.04) !important;
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
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-left">
          Популярные категории
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
          >
            {products.map((category) => (
              <SwiperSlide key={category.id} className="!h-auto">
                <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 overflow-hidden flex flex-col h-full cursor-pointer group/card">
                  <div className="relative p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden shadow-md">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {category.name}
                    </h3>
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

export default AvitoCategorySwiper;
