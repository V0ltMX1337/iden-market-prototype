import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { storeApi } from "@/lib/store";

type Transaction = {
  id: string;
  description: string;
  amount: number;
  date?: string;
};

const FinanceTab = () => {
  const [systemSettings, setSystemSettings] = useState<{ commission: number }>({ commission: 0 });
  const [stats, setStats] = useState<{
    totalRevenue: number;
    monthlyRevenue: number;
    averageCheck: number;
  }>({
    totalRevenue: 0,
    monthlyRevenue: 0,
    averageCheck: 0,
  });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Загрузка системных настроек и финансовой статистики
  const fetchFinanceData = async () => {
    setLoading(true);
    setError(null);
    try {
      const settings = await storeApi.getSystemSettings();
      setSystemSettings(settings);

      const statsData = await storeApi.getStats();
      // Вычислим средний чек: допустим, monthlyRevenue / условное кол-во транзакций (например 10)
      const avgCheck = statsData.monthlyRevenue / (transactions.length || 10);

      setStats({
        totalRevenue: statsData.totalRevenue,
        monthlyRevenue: statsData.monthlyRevenue,
        averageCheck: Math.round(avgCheck),
      });

      // Пока что транзакции жёстко закодированы, их нужно получать с API, если есть
      setTransactions([
        { id: "1234", description: "Комиссия с продажи #1234", amount: 245 },
        { id: "1233", description: "Комиссия с продажи #1233", amount: 180 },
        { id: "1232", description: "Комиссия с продажи #1232", amount: 320 },
      ]);
    } catch {
      setError("Ошибка загрузки финансовых данных");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFinanceData();
  }, []);

  return (
    <div className="grid gap-6">
      {error && (
        <div className="text-red-600 font-bold mb-2">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Финансовая статистика</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Общий доход:</span>
              <span className="font-bold">
                {loading ? "..." : stats.totalRevenue.toLocaleString()} ₽
              </span>
            </div>
            <div className="flex justify-between">
              <span>Доход за месяц:</span>
              <span className="font-bold">
                {loading ? "..." : stats.monthlyRevenue.toLocaleString()} ₽
              </span>
            </div>
            <div className="flex justify-between">
              <span>Средний чек:</span>
              <span className="font-bold">
                {loading ? "..." : stats.averageCheck.toLocaleString()} ₽
              </span>
            </div>
            <div className="flex justify-between">
              <span>Комиссия системы:</span>
              <span className="font-bold">
                {loading ? "..." : systemSettings.commission}%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Последние транзакции</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {loading
                ? "Загрузка..."
                : transactions.map((t) => (
                    <div
                      key={t.id}
                      className="flex justify-between items-center p-2 bg-gray-50 rounded"
                    >
                      <span className="text-sm">{t.description}</span>
                      <span className="font-bold text-green-600">
                        +{t.amount.toLocaleString()} ₽
                      </span>
                    </div>
                  ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FinanceTab;
