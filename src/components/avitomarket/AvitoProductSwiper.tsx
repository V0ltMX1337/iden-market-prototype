import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface AvitoAd {
  id: number;
  title: string;
  price: number;
  location: string;
  image: string;
  time: string;
  isVip?: boolean;
}

interface AvitoProductSwiperProps {
  ads: AvitoAd[];
  title: string;
}

const AvitoProductSwiper: React.FC<AvitoProductSwiperProps> = ({
  ads,
  title,
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
          color: #16a34a !important;
          opacity: 0 !important;
          transition: all 0.3s ease !important;
        }

        .group:hover .swiper-button-next,
        .group:hover .swiper-button-prev {
          opacity: 1 !important;
        }

        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          color: #15803d !important;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
        }

        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 18px !important;
          font-weight: bold !important;
        }
      `,
        }}
      />
      <div className="group bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <Button
            variant="outline"
            className="text-green-600 border-green-600 hover:bg-green-50"
          >
            Все объявления
            <Icon name="ArrowRight" size={16} className="ml-2" />
          </Button>
        </div>

        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={24}
          slidesPerView={1}
          navigation={true}
          loop={ads.length > 3}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          className="!pb-2"
        >
          {ads.map((ad) => (
            <SwiperSlide key={ad.id}>
              <div className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group/card">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={ad.image}
                    alt={ad.title}
                    className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                  />
                  {ad.isVip && (
                    <Badge className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                      VIP
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 right-3 bg-white/80 hover:bg-white text-gray-600 hover:text-red-500"
                  >
                    <Icon name="Heart" size={16} />
                  </Button>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm">
                    {ad.title}
                  </h3>
                  <p className="text-xl font-bold text-green-600 mb-2">
                    {ad.price.toLocaleString()} ₽
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center">
                      <Icon name="MapPin" size={12} className="mr-1" />
                      {ad.location}
                    </span>
                    <span>{ad.time}</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default AvitoProductSwiper;
