import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { storeApi } from "@/lib/store";
import { AdStatus, type Ad } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import AdBanner from "../ui/AdBanner";

const AvitoRecommendations = () => {
  const [allAds, setAllAds] = useState<Ad[]>([]);
  const [displayedAds, setDisplayedAds] = useState<Ad[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const ITEMS_PER_PAGE = 20;

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const adsData = await storeApi.getAds();
        const activeAds = adsData.filter((ad) => ad.adStatus === AdStatus.ACTIVE);
        setAllAds(activeAds);
        setDisplayedAds(activeAds.slice(0, ITEMS_PER_PAGE));
      } catch (error) {
        console.error("Ошибка при загрузке объявлений:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAds();
  }, []);

  const loadMoreAds = useCallback(() => {
    if (isLoadingMore) return;

    const nextPage = currentPage + 1;
    const startIndex = currentPage * ITEMS_PER_PAGE;
    const endIndex = nextPage * ITEMS_PER_PAGE;
    const newAds = allAds.slice(startIndex, endIndex);

    if (newAds.length === 0) return;

    setIsLoadingMore(true);

    setTimeout(() => {
      setDisplayedAds((prev) => [...prev, ...newAds]);
      setCurrentPage(nextPage);
      setIsLoadingMore(false);
    }, 500);
  }, [allAds, currentPage, isLoadingMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreAds();
        }
      },
      { threshold: 1 }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [loadMoreAds]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <section className="py-0">
      {displayedAds.length === 0 && !isLoading ? (
        <p className="text-center text-gray-500 py-8">Объявления не найдены</p>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {displayedAds.map((ad, index) => (
              <div key={`${ad.id}-${index}`}>
                <Card
                  className="overflow-hidden cursor-pointer group relative border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 animate-slideUp"
                  style={{ animationDelay: `${(index % 20) * 50}ms` }}
                  onClick={() => navigate(`/product/${ad.slug}/${ad.id}`)}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white h-7 w-7 md:h-8 md:w-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("Добавлено в избранное:", ad.id);
                    }}
                  >
                    <Heart className="w-3 h-3 md:w-4 md:h-4 text-red-500" />
                  </Button>

                  <img
                    src={ad.links?.[0] || "/placeholder.png"}
                    alt={ad.title}
                    className="w-full h-32 md:h-40 object-cover"
                  />

                  <CardContent className="p-3 md:p-4">
                    <h3
                      className="font-semibold text-sm md:text-base mb-1 leading-tight"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {ad.title}
                    </h3>
                    <p className="text-gray-600 text-xs md:text-sm truncate">
                      {ad.city?.name}
                    </p>
                    <p className="text-blue-600 font-bold mt-1 md:mt-2 text-sm md:text-base">
                      {ad.price.toLocaleString()} ₽
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {isLoadingMore && (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}

          {displayedAds.length >= allAds.length && allAds.length > 0 && (
            <p className="text-center text-gray-500 py-8">
              Все объявления загружены
            </p>
          )}

          {/* Сентинел для IntersectionObserver */}
          <div ref={sentinelRef} className="h-10" />
        </>
      )}
    </section>
  );
};

export default AvitoRecommendations;
