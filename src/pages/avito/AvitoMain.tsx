import AvitoHeader from "@/components/avitomarket/AvitoHeader";
import AvitoFooter from "@/components/avitomarket/AvitoFooter";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AvitoRecommendations from "@/components/avitomarket/AvitoRecommendations";
import AvitoCategorySwiper from "@/components/avitomarket/AvitoCategorySwiper";
import { storeApi } from "@/lib/store";
import type { Category } from "@/lib/types";

const AvitoMain = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await storeApi.getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Ошибка загрузки категорий:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AvitoHeader />

      {/* Категории */}
      <section className="pt-8">
        <AvitoCategorySwiper
          products={categories.map((cat) => ({
            id: cat.id,
            name: cat.name,
            image: `https://images.unsplash.com/photo-1${Math.random().toString().slice(2, 15)}?w=80&h=80&fit=crop`,
          }))}
        />
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Рекомендации */}
        <section className="pt-8 pb-8">
          <AvitoRecommendations />
        </section>
      </div>

      <AvitoFooter />
    </div>
  );
};

export default AvitoMain;
