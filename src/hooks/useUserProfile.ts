import { useState, useEffect } from "react";
import { storeApi } from "@/lib/store";
import { type User, type AdWithStatus, type Review, type UserDisplayData, AdStatus } from "@/lib/types.tsx";

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

      // Загружаем данные пользователя
      const userData = await storeApi.getUserById(userId);
      if (!userData) {
        setError("Пользователь не найден");
        return;
      }

      // Загружаем объявления пользователя
      const userAds = await storeApi.getAdsByUserId(userId);
      
      // Загружаем отзывы о пользователе
      const userReviews = await storeApi.getReviewsByUserId(userId);

      // Формируем UserDisplayData
      const displayData: UserDisplayData = {
        user: userData,
        averageRating: userReviews.length > 0 
          ? userReviews.reduce((sum, review) => sum + review.rating, 0) / userReviews.length 
          : 0,
        reviewCount: userReviews.length,
        joinDate: userData.registrationDate,
        responseTime: "обычно отвечает быстро", // можно добавить логику расчета
        deliveryCount: userAds.filter(ad => ad.isDeliveryAvailable).length,
        salesCount: userAds.filter(ad => ad.adStatus === AdStatus.SOLD).length,
      };

      setUserDisplayData(displayData);
      setAds(userAds);
      setReviews(userReviews);
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