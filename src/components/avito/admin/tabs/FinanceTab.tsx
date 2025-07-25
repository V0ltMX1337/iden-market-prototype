// FinanceTab.tsx
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { storeApi } from "@/lib/store";

type Stats = Awaited<ReturnType<typeof storeApi.getStats>>;

const FinanceTab = () => {
  const [settings, setSettings] = useState<{commission: number}>({commission: 0});
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const s = await storeApi.getSystemSettings();
      setSettings(s);
      const st = await storeApi.getStats();
      setStats(st);
    } catch {
      setError("Ошибка загрузки статистики");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!stats) return null;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle>Финансы</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[
            ["Общий доход", stats.totalIncome],
            ["Доход за месяц", stats.monthlyIncome],
            ["Средний чек", stats.averageCheck],
            ["Комиссия системы", settings.commission + "%"],
            ["Всего пользователей", stats.totalUsers],
            ["Новых за 30 дней", stats.newUsersThisMonth],
            ["Средний баланс", stats.averageBalance.toFixed(2)],
            ["Всего объявлений", stats.totalAds],
            ["Активных объявлений", stats.activeAds],
            ["Средняя жизнь (дн.)", stats.avgAdLifetimeDays.toFixed(1)],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between border-b pb-1">
              <span>{label}:</span>
              <span className="font-semibold">{value}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Топ‑5 дорогих объявлений */}
        <Card>
          <CardHeader><CardTitle>Топ‑5 по цене</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {stats.top5ExpensiveAds.map(ad => (
              <div key={ad.id} className="flex justify-between">
                <span>{ad.title}</span>
                <span className="font-bold">{ad.price.toLocaleString()} ₽</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Топ‑5 пользователей по количеству объявлений */}
        <Card>
          <CardHeader><CardTitle>Топ‑5 пользователей</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {stats.top5UsersByAds.map(u => (
              <div key={u.userId} className="flex justify-between">
                <span>{u.userId}</span>
                <span className="font-semibold">{u.count}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Распределение пользователей по городам */}
        <Card>
          <CardHeader><CardTitle>Пользователи по городам</CardTitle></CardHeader>
          <CardContent className="space-y-1">
            {Object.entries(stats.usersByCity).map(([city, count]) => (
              <div key={city} className="flex justify-between">
                <span>{city}</span>
                <span>{count}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Растущие пользователи */}
        <Card>
          <CardHeader><CardTitle>Рост за 30 дн.</CardTitle></CardHeader>
          <CardContent className="space-y-1">
            {Object.entries(stats.userGrowthLast30Days).map(([date, cnt]) => (
              <div key={date} className="flex justify-between">
                <span>{date}</span>
                <span>{cnt}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Объявления по категориям */}
        <Card>
          <CardHeader><CardTitle>Объявления по категориям</CardTitle></CardHeader>
          <CardContent className="space-y-1">
            {Object.entries(stats.adsByCategory).map(([cat, count]) => (
              <div key={cat} className="flex justify-between">
                <span>{cat}</span>
                <span>{count}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FinanceTab;
