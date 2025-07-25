import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AvitoHeader from "@/components/avitomarket/AvitoHeader";
import AvitoFooter from "@/components/avitomarket/AvitoFooter";
import AvitoCategorySwiper from "@/components/avitomarket/AvitoCategorySwiper";
import { storeApi } from "@/lib/store";
import type { Ad, Category, User } from "@/lib/types";
import Icon from "@/components/ui/icon";
import AvitoRecommendations from "@/components/avitomarket/AvitoRecommendations";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Engine } from "tsparticles-engine";
import { Helmet } from "react-helmet-async";
import { usePageTitle } from "@/hooks/usePageTitle";

const AvitoMain = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [ads, setAds] = useState<Ad[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [storyModalIndex, setStoryModalIndex] = useState<number | null>(null);

  const { getPageTitle, settings: systemSettings } = usePageTitle();


  const stories = [
    {
      id: 1,
      title: "Новый дизайн сайта",
      image: "https://api.trivoads.ru/uploads/files/art_1.png",
      description: "Теперь сайт стал ещё удобнее и приятнее для пользования!",
    },
    {
      id: 2,
      title: "Привет, Вейперы!",
      image: "https://api.trivoads.ru/uploads/files/art_2.png",
      description:
        "Теперь больше прозрачности, честности и безопасности в сделках на нашей платформе.",
    },
    {
      id: 3,
      title: "Cherry Tiggo Pro",
      image: "https://api.trivoads.ru/uploads/files/art_3.png",
      description:
        "Это просторный 7-местный кроссовер с адаптивным круиз-контролем и усиленным каркасом кузова в 6 цветах. Уже доступен на Авито!",
    },
  ];

  useEffect(() => {
    (async () => {
      try {
        const [cats, ads, users] = await Promise.all([
          storeApi.getCategories(),
          storeApi.getAds(),
          storeApi.getUsers(),
        ]);
        setCategories(cats);
        setAds(ads);
        setUsers(users);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const today = new Date().toISOString().split("T")[0];
  const newTodayAds = ads.filter(
    (ad) => ad.adStatus === "ACTIVE" && ad.publishedAt.startsWith(today)
  );

  const topUsers = users
    .map((user) => ({
      ...user,
      adCount: ads.filter((ad) => ad.userId === user.id).length,
    }))
    .sort((a, b) => b.adCount - a.adCount)
    .slice(0, 5);

  // Формируем заголовок
  const pageTitle =
   systemSettings
      ? getPageTitle("mainPageTitle", {})
      : "Главная страница Trivo";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 relative overflow-hidden">
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>

      {/* Background particles */}
      <Particles
        id="tsparticles"
        init={async (engine: Engine) => await loadFull(engine)}
        options={{
          fullScreen: { enable: false },
          background: { color: { value: "#f9fafb" } },
          particles: {
            number: { value: 30 },
            color: { value: "#6366f1" },
            size: { value: { min: 1, max: 4 } },
            move: { enable: true, speed: 1 },
            links: {
              enable: true,
              distance: 120,
              color: "#3b82f6",
              opacity: 0.4,
            },
          },
        }}
        className="absolute inset-0 -z-10"
      />

      <AvitoHeader />

      {/* Stories */}
      <section className="w-full max-w-[1440px] mx-auto px-8 pt-8">
        <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 animate-fadeIn">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📢 Истории</h2>
          <div className="flex gap-4 overflow-x-auto">
            {stories.map((story, index) => (
              <div
                key={story.id}
                className="min-w-[100px] text-center cursor-pointer hover:opacity-80 transition"
                onClick={() => setStoryModalIndex(index)}
              >
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-20 h-20 rounded-full border-2 border-blue-500 mx-auto object-cover"
                />
                <p className="text-sm mt-2 text-gray-700">{story.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className="flex-grow">
        <section className="pt-8">
          <AvitoCategorySwiper products={categories} />
        </section>

        {/* Recommendations */}
        <section className="w-full max-w-[1440px] mx-auto px-8 pt-8">
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🏆 Рекомендации для вас</h2>
            <AvitoRecommendations />
          </div>
        </section>

        {/* New Ads Today */}
        <section className="w-full max-w-[1440px] mx-auto px-8 pt-8">
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🆕 Новые объявления за сегодня</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {newTodayAds.length > 0 ? (
                newTodayAds.map((ad) => (
                  <div
                    key={ad.id}
                    className="bg-gray-50 rounded-2xl p-4 hover:shadow-md cursor-pointer transition"
                    onClick={() => navigate(`/product/${ad.id}`)}
                  >
                    <img
                      src={ad.links?.[0] || "/placeholder.png"}
                      alt={ad.title}
                      className="w-full h-40 object-cover rounded-md"
                    />
                    <div className="text-sm font-semibold truncate">{ad.title}</div>
                    <div className="text-gray-600 text-sm">
                      {ad.price.toLocaleString()} ₽
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">
                  Нет новых активных объявлений на сегодня.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Top Users */}
        <section className="w-full max-w-[1440px] mx-auto px-8 pt-8">
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🏆 Топ продавцов</h2>
            <ul className="space-y-4">
              {topUsers.map((user) => (
                <li
                  key={user.id}
                  className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl hover:shadow cursor-pointer transition"
                  onClick={() => navigate(`/user/${user.id}`)}
                >
                  <div className="flex items-center gap-4">
                    {user.photoUrl ? (
                      <img
                        src={user.photoUrl}
                        alt={user.firstName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <Icon name="User" size={20} className="text-white" />
                      </div>
                    )}
                    <div>
                      <div className="font-medium">
                        {user.firstName || user.email}
                      </div>
                      <div className="text-sm text-gray-500">
                        {user.city?.name || "—"}
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-purple-600 font-semibold">
                    {user.adCount} объявл.
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Security Tips */}
        <section className="w-full max-w-[1440px] mx-auto px-8 pt-8 pb-12">
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🛡 Советы по безопасности</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
              <li>Никогда не переводите деньги заранее.</li>
              <li>Встречайтесь только в безопасных и людных местах.</li>
              <li>Проверяйте товар перед покупкой.</li>
              <li>Сохраняйте переписку в чате — это ваша защита.</li>
            </ul>
          </div>
        </section>
      </main>

      <AvitoFooter />

      {/* Story Modal */}
      {storyModalIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
          <div
            className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 max-w-md w-full relative text-white shadow-xl"
            style={{ animation: "fadeIn 0.4s ease" }}
          >
            <button
              onClick={() => setStoryModalIndex(null)}
              className="absolute top-2 right-2 text-white hover:text-gray-200"
            >
              <Icon name="X" size={20} />
            </button>

            {/* Arrows */}
            <div className="flex justify-between absolute top-1/2 left-0 right-0 px-4 -translate-y-1/2">
              {storyModalIndex > 0 && (
                <button
                  onClick={() => setStoryModalIndex((prev) => prev! - 1)}
                  className="text-white hover:text-gray-200 bg-black/30 rounded-full w-8 h-8 flex items-center justify-center"
                >
                  <Icon name="ChevronLeft" size={20} />
                </button>
              )}
              {storyModalIndex < stories.length - 1 && (
                <button
                  onClick={() => setStoryModalIndex((prev) => prev! + 1)}
                  className="text-white hover:text-gray-200 bg-black/30 rounded-full w-8 h-8 flex items-center justify-center"
                >
                  <Icon name="ChevronRight" size={20} />
                </button>
              )}
            </div>

            <h3 className="text-2xl font-bold text-center mb-4">
              {stories[storyModalIndex].title}
            </h3>
            <img
              src={stories[storyModalIndex].image}
              alt={stories[storyModalIndex].title}
              className="w-full h-48 object-cover rounded-md border border-white mb-4"
            />
            <p className="text-sm text-center mb-4">{stories[storyModalIndex].description}</p>
            <div className="text-center">
              <button className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-full shadow hover:bg-blue-50 transition">
                Подробнее
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom animation */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AvitoMain;
