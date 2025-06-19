import Icon from "@/components/ui/icon";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const PvzOwnerAnalytics = () => {
  const [period, setPeriod] = useState("month");

  const pvzList = [
    {
      id: "pvz-1",
      name: "ПВЗ Центральный",
      status: "Открыт",
      revenue: 120000,
      parcels: 210,
      claims: 2,
      rating: 4.7,
      balance: 60000,
      debt: 10000,
      growth: "+12%",
    },
    {
      id: "pvz-2",
      name: "ПВЗ Южный",
      status: "Закрыт",
      revenue: 98000,
      parcels: 180,
      claims: 3,
      rating: 4.5,
      balance: 48000,
      debt: 15000,
      growth: "-3%",
    },
  ];

  const totalRevenue = pvzList.reduce((sum, p) => sum + p.revenue, 0);
  const totalParcels = pvzList.reduce((sum, p) => sum + p.parcels, 0);
  const totalClaims = pvzList.reduce((sum, p) => sum + p.claims, 0);
  const avgRating =
    pvzList.reduce((sum, p) => sum + p.rating, 0) / pvzList.length;
  const totalBalance = pvzList.reduce((sum, p) => sum + p.balance, 0);
  const totalDebt = pvzList.reduce((sum, p) => sum + p.debt, 0);

  const formatCurrency = (val: number) =>
    `₽${val.toLocaleString("ru-RU")}`;

  const metrics = [
    {
      title: "Общая выручка",
      value: formatCurrency(totalRevenue),
      icon: "TrendingUp",
    },
    {
      title: "Всего посылок",
      value: `${totalParcels}`,
      icon: "Package",
    },
    {
      title: "Претензии",
      value: `${totalClaims}`,
      icon: "AlertTriangle",
    },
    {
      title: "Средний рейтинг",
      value: avgRating.toFixed(1),
      icon: "Star",
    },
    {
      title: "Баланс ПВЗ",
      value: formatCurrency(totalBalance),
      icon: "Wallet",
    },
    {
      title: "Задолженность",
      value: formatCurrency(totalDebt),
      icon: "CreditCard",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Главная / Дашборд</h2>
        <p className="text-muted-foreground">Аналитика и управление ПВЗ</p>
      </div>

      {/* Общие метрики */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {metric.title}
                  </p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                </div>
                <Icon name={metric.icon as any} size={24} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Общая статистика компании с фильтром */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <div>
            <CardTitle>График выручки</CardTitle>
            <CardDescription>Фильтр: период компании</CardDescription>
          </div>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Сегодня</SelectItem>
              <SelectItem value="week">Неделя</SelectItem>
              <SelectItem value="month">Месяц</SelectItem>
              <SelectItem value="year">Год</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="h-64 bg-gray-100 flex items-center justify-center text-gray-500 text-sm rounded-xl">
          📊 График выручки (заглушка)
        </CardContent>
      </Card>

      {/* Список ПВЗ */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Список всех ПВЗ</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pvzList.map((pvz) => (
            <Card key={pvz.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{pvz.name}</span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      pvz.status === "Открыт"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {pvz.status}
                  </span>
                </CardTitle>
                <CardDescription>Управление и статистика</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Выручка</p>
                    <p className="font-medium">{formatCurrency(pvz.revenue)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Посылки</p>
                    <p className="font-medium">{pvz.parcels}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Претензии</p>
                    <p className="font-medium">{pvz.claims}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Рейтинг</p>
                    <p className="font-medium">{pvz.rating}★</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Баланс</p>
                    <p className="font-medium">{formatCurrency(pvz.balance)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Задолженность</p>
                    <p className="font-medium">{formatCurrency(pvz.debt)}</p>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Рост: {pvz.growth}
                  </span>
                  <Button variant="outline" size="sm">
                    Перейти
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PvzOwnerAnalytics;
