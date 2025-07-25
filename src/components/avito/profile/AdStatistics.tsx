import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { storeApi } from "@/lib/store";
import { Ad, AdStatus, AdSold, User, UserRole, UserDisplayData, UserStatus } from "@/lib/types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface FavoriteUser extends UserDisplayData {
  user: User;
}

const AdStatistics = () => {
  const { adId } = useParams<{ adId: string }>();
  const [ad, setAd] = useState<Ad | null>(null);
  const [favoriteUsers, setFavoriteUsers] = useState<FavoriteUser[]>([]);
  const [viewsByDate, setViewsByDate] = useState<{ date: string; views: number }[]>([]);
  const [competitors, setCompetitors] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        if (!adId) throw new Error("ID объявления не указан");

        // Получаем объявление
        const adData = await storeApi.getAdById(adId);
        setAd(adData);

        // Получаем пользователей, которые добавили в избранное (фейковые данные)
        // Здесь можно подгрузить через API, но пока пример с моками
        const favUsersMock: FavoriteUser[] = [
          {
            user: {
              id: "u1",
              email: "ivan@example.com",
              phone: "+79991234567",
              password: "",
              registrationDate: "2022-01-10",
              firstName: "Иван",
              lastName: "Иванов",
              city: { id: "1", name: "Дзержинск", region: "Нижегородская область" },
              role: UserRole.USER,
              status: UserStatus.ACTIVE,
              photoUrl: "https://avatars.mds.yandex.net/i?id=05be9231c6e2736aec2a131cb664059b_l-5232882-images-thumbs&n=13",
              balance: 1000,
              reservedBalance: 0,
            },
            averageRating: 4.5,
            reviewCount: 10,
            joinDate: "2022-01-10",
            responseTime: "1 ч",
            deliveryCount: 5,
            salesCount: 12,
          },
          {
            user: {
              id: "u2",
              email: "anna@example.com",
              phone: "+79999887766",
              password: "",
              registrationDate: "2023-03-05",
              firstName: "Анна",
              lastName: "Петрова",
              city: { id: "2", name: "Дзержинск", region: "Нижегородская область" },
              role: UserRole.USER,
              status: UserStatus.ACTIVE,
              photoUrl: "https://fanfics.me/images/member_foto/full/814089-1673527016.jpg",
              balance: 1500,
              reservedBalance: 0,
            },
            averageRating: 4.8,
            reviewCount: 5,
            joinDate: "2023-03-05",
            responseTime: "30 мин",
            deliveryCount: 3,
            salesCount: 7,
          },
        ];
        setFavoriteUsers(favUsersMock);

        // График просмотров (за последние 7 дней) - фейковые данные
        const now = new Date();
        const viewsData = [];
        for (let i = 6; i >= 0; i--) {
          const d = new Date(now);
          d.setDate(now.getDate() - i);
          viewsData.push({
            date: d.toLocaleDateString("ru-RU", { day: "numeric", month: "short" }),
            views: Math.floor(Math.random() * 50) + 5,
          });
        }
        setViewsByDate(viewsData);

        // Конкуренты — похожие объявления (фейковые)
        const competitorsMock: Ad[] = [
          {
            id: "ad1001",
            title: "Похожее объявление 1",
            description: "Описание похожего объявления 1",
            price: adData.price - 500,
            city: adData.city,
            links: ["/placeholder.png"],
            views: 120,
            favoritesCount: 15,
            publishedAt: new Date().toISOString(),
            userId: "u100",
            adStatus: AdStatus.ACTIVE,
            adSold: AdSold.NEW,
            categoryId: adData.categoryId,
            subcategoryId: adData.subcategoryId,
          },
          {
            id: "ad1002",
            title: "Похожее объявление 2",
            description: "Описание похожего объявления 2",
            price: adData.price + 1000,
            city: adData.city,
            links: ["/placeholder.png"],
            views: 80,
            favoritesCount: 8,
            publishedAt: new Date().toISOString(),
            userId: "u101",
            adStatus: AdStatus.ACTIVE,
            adSold: AdSold.NEW,
            categoryId: adData.categoryId,
            subcategoryId: adData.subcategoryId,
          },
        ];
        setCompetitors(competitorsMock);
      } catch (e: any) {
        setError(e.message || "Ошибка загрузки статистики");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [adId]);

  const handleMessageUser = (user: User) => {
    alert(`Открыть чат или отправить сообщение пользователю ${user.firstName} ${user.lastName}`);
  };

  const improvementSuggestions = [
    "Добавьте больше фото для привлечения покупателей",
    "Уточните описание товара для повышения доверия",
    "Проверьте цену — она выше средней по категории",
  ];

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600 text-center py-8">Ошибка: {error}</div>;
  }

  if (!ad) return null;

  return (
    <div className="space-y-8 max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Статистика объявления</h1>

      {/* Общее */}
      <Card>
        <CardContent className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">Общее</h2>
            <p>Просмотры: <b>{ad.views}</b></p>
            <p>Добавлено в избранное: <b>{ad.favoritesCount}</b></p>
          </div>
        </CardContent>
      </Card>

      {/* График просмотров */}
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">График просмотров за последнюю неделю</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={viewsByDate}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Пользователи, добавившие в избранное */}
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Пользователи, добавившие в избранное</h2>
          {favoriteUsers.length === 0 && <p>Пока никто не добавил объявление в избранное.</p>}
          <ul className="space-y-4">
            {favoriteUsers.map(({ user }) => (
              <li key={user.id} className="flex items-center space-x-4 border-b pb-4">
                <img
                  src={user.photoUrl || "/placeholder.png"}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="font-semibold">{user.firstName} {user.lastName}</p>
                  <p className="text-sm text-gray-600">{user.city.name}</p>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleMessageUser(user)}
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  Написать
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Конкуренты */}
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Похожие объявления конкурентов</h2>
          {competitors.length === 0 && <p>Похожих объявлений не найдено.</p>}
          <ul className="space-y-4">
            {competitors.map((comp) => (
              <li key={comp.id} className="flex items-center space-x-4 border-b pb-4 cursor-pointer hover:bg-gray-100 rounded p-2">
                <img
                  src={comp.links[0] || "/placeholder.png"}
                  alt={comp.title}
                  className="w-16 h-12 object-cover rounded"
                  onClick={() => window.open(`/ad/${comp.id}`, "_blank")}
                />
                <div>
                  <p className="font-semibold">{comp.title}</p>
                  <p className="text-green-600 font-bold">{comp.price.toLocaleString()} ₽</p>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Рекомендации по улучшению */}
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Рекомендации по улучшению объявления</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {improvementSuggestions.map((suggestion, idx) => (
              <li key={idx}>{suggestion}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdStatistics;
