import { useState, useEffect } from "react";
import { storeApi } from "@/lib/store";
import { type User, type AdWithStatus, type Review, type UserDisplayData, AdStatus, Ad } from "@/lib/types.tsx";

interface UseUserProfileProps {
  userId?: string;
}

interface UseUserProfileReturn {
  userDisplayData: UserDisplayData | null;
  ads: AdWithStatus[];
  reviews: Review[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  reviewSortOrder: string;
  setReviewSortOrder: (sortOrder: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  filteredAds: AdWithStatus[];
  sortedReviews: Review[];
  refreshData: () => void;
}

export const useUserProfile = ({ userId }: UseUserProfileProps): UseUserProfileReturn => {
  const [userDisplayData, setUserDisplayData] = useState<UserDisplayData | null>(null);
  const [ads, setAds] = useState<AdWithStatus[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [reviewSortOrder, setReviewSortOrder] = useState("new");
  const [activeTab, setActiveTab] = useState("active");

  const loadUserData = async () => {
    if (!userId) {
      setError("ID пользователя не указан");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

     const [user, userAds] = await Promise.all([
          storeApi.getUserById(userId),
          storeApi.getUserAds(userId),
        ]);

      // Получаем отзывы по каждому объявлению
        const reviewsArrays = await Promise.all(
          userAds.map((ad) => storeApi.getReviewsByAdId(ad.id))
        );
        const allReviews = reviewsArrays.flat();
      
        const averageRating =
          allReviews.reduce((sum, review) => sum + review.rating, 0) /
          (allReviews.length || 1); // на случай деления на 0
      
        const joinDate = new Date(user.registrationDate).toLocaleDateString(
          "ru-RU",
          {
            year: "numeric",
            month: "long",
          }
        );
      
        const displayData: UserDisplayData = {
          user,
          averageRating: Math.round(averageRating * 10) / 10,
          reviewCount: allReviews.length,
          joinDate,
          responseTime: "15-30 минут",
          deliveryCount: Math.floor(Math.random() * 10) + 1,
          salesCount: userAds.length,
        };
      
        const adsWithStatus: AdWithStatus[] = userAds.map((ad) => ({
          ...ad,
          isDeliveryAvailable: false,
          isFavorite: false,
          formattedPrice: `${ad.price.toLocaleString()} ₽`,
          location: `${ad.city.region}, ${ad.city.name}`,
          date: new Date(ad.publishedAt).toLocaleDateString("ru-RU"),
          image:
            ad.links[0] ||
            "https://cdn.poehali.dev/files/98f4d8d2-6b87-48e8-abce-7aee57e534ab.png",
        }));

      setUserDisplayData(displayData);
      setAds(adsWithStatus);
      setReviews(allReviews);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Произошла ошибка при загрузке данных");
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => {
    loadUserData();
  };

  useEffect(() => {
    loadUserData();
  }, [userId]);

  // Фильтрация объявлений по поисковому запросу
  const filteredAds = ads.filter(ad => {
    const matchesSearch = searchQuery === "" || 
      ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ad.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = (() => {
      switch (activeTab) {
        case "active":
          return ad.adStatus === AdStatus.ACTIVE;
        case "sold":
          return ad.adStatus === AdStatus.SOLD;
        case "blocked":
          return ad.adStatus === AdStatus.BLOCKED;
        case "timeout":
          return ad.adStatus === AdStatus.TIME_OUT;
        default:
          return true;
      }
    })();

    return matchesSearch && matchesTab;
  });

  // Сортировка отзывов
  const sortedReviews = [...reviews].sort((a, b) => {
    switch (reviewSortOrder) {
      case "new":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "old":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return {
    userDisplayData,
    ads,
    reviews,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    reviewSortOrder,
    setReviewSortOrder,
    activeTab,
    setActiveTab,
    filteredAds,
    sortedReviews,
    refreshData,
  };
};