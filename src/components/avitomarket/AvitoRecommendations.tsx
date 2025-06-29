import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Примерная заглушка API
const fetchAdsFromServer = async (page: number): Promise<{ ads: any[]; hasMore: boolean }> => {
  const pageSize = 10;
  await new Promise((res) => setTimeout(res, 1000));
  const newAds = Array.from({ length: pageSize }, (_, i) => {
    const id = page * pageSize + i;
    return {
      id,
      title: `Объявление №${id}`,
      price: 5000 + id * 10,
      image: `https://placehold.co/300x200?text=Item+${id}`,
      location: "Москва",
    };
  });

  return {
    ads: newAds,
    hasMore: page < 5,
  };
};

// Опциональный баннер
const bannerImage = "https://placehold.co/1000x200?text=Рекламный+баннер"; // null если не нужно

const AvitoRecommendations = () => {
  const navigate = useNavigate();
  const [ads, setAds] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreAds = async () => {
    const { ads: newAds, hasMore } = await fetchAdsFromServer(page + 1);
    setAds((prev) => [...prev, ...newAds]);
    setPage((prev) => prev + 1);
    setHasMore(hasMore);
  };

  useEffect(() => {
    fetchMoreAds();
  }, []);

  // Вставим баннер после первых 10 объявлений, если он есть
  const adsWithBanner = (() => {
    if (!bannerImage || ads.length <= 10) return ads;
    const before = ads.slice(0, 10);
    const after = ads.slice(10);
    return [...before, { isBanner: true, id: "banner" }, ...after];
  })();

  return (
    <section className="py-10 px-4">
      <h2 className="text-2xl font-bold mb-6">Рекомендации для вас</h2>
      <InfiniteScroll
        dataLength={ads.length}
        next={fetchMoreAds}
        hasMore={hasMore}
        loader={<p className="text-center py-4">Загрузка...</p>}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {adsWithBanner.map((ad, index) =>
            ad.isBanner ? (
              <div
                key="banner"
                className="col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-5 h-48 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center"
              >
                <img
                  src={bannerImage}
                  alt="Рекламный баннер"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <Card
                key={ad.id}
                className="overflow-hidden cursor-pointer group relative"
                onClick={() => navigate(`/avito/product/${ad.id}`)}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 z-10 bg-white/70 hover:bg-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Добавлено в избранное:", ad.id);
                  }}
                >
                  <Heart className="w-5 h-5 text-red-500" />
                </Button>

                <img
                  src={ad.image}
                  alt={ad.title}
                  className="w-full h-40 object-cover"
                />
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{ad.title}</h3>
                  <p className="text-gray-600 text-sm">{ad.location}</p>
                  <p className="text-blue-600 font-bold mt-2">{ad.price.toLocaleString()} ₽</p>
                </CardContent>
              </Card>
            )
          )}
        </div>
      </InfiniteScroll>
    </section>
  );
};

export default AvitoRecommendations;
