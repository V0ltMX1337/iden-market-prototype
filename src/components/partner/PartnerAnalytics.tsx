import Icon from "@/components/ui/icon";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const PartnerAnalytics = () => {
  const analyticsData = {
    totalSales: 1245600,
    salesGrowth: 12.5,
    totalOrders: 342,
    ordersGrowth: 8.2,
    avgOrderValue: 3640,
    avgGrowth: 4.1,
    conversionRate: 3.8,
  };

  const topProducts = [
    { name: "Магическое зелье силы", sales: 45, revenue: 135000 },
    { name: "Эликсир молодости", sales: 32, revenue: 96000 },
    { name: "Зелье невидимости", sales: 28, revenue: 84000 },
    { name: "Любовный напиток", sales: 21, revenue: 63000 },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Аналитика</h2>
        <p className="text-gray-600">Статистика продаж и эффективности</p>
      </div>

      {/* Основные метрики */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Общие продажи</CardTitle>
            <Icon name="TrendingUp" className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(analyticsData.totalSales)}
            </div>
            <p className="text-xs text-green-600">
              +{analyticsData.salesGrowth}% к прошлому месяцу
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Заказы</CardTitle>
            <Icon
              name="ShoppingCart"
              className="h-4 w-4 text-muted-foreground"
            />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analyticsData.totalOrders}
            </div>
            <p className="text-xs text-green-600">
              +{analyticsData.ordersGrowth}% к прошлому месяцу
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Средний чек</CardTitle>
            <Icon name="Calculator" className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(analyticsData.avgOrderValue)}
            </div>
            <p className="text-xs text-green-600">
              +{analyticsData.avgGrowth}% к прошлому месяцу
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Конверсия</CardTitle>
            <Icon name="Target" className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analyticsData.conversionRate}%
            </div>
            <p className="text-xs text-muted-foreground">
              Посетители → Покупатели
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Топ товары */}
      <Card>
        <CardHeader>
          <CardTitle>Топ товары</CardTitle>
          <CardDescription>
            Самые популярные товары за последний месяц
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-500">
                      {product.sales} продаж
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">{formatCurrency(product.revenue)}</p>
                  <p className="text-sm text-gray-500">выручка</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* График продаж (заглушка) */}
      <Card>
        <CardHeader>
          <CardTitle>График продаж</CardTitle>
          <CardDescription>
            Динамика продаж за последние 30 дней
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <Icon name="BarChart3" size={48} className="mx-auto mb-2" />
              <p>График будет добавлен в следующем обновлении</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PartnerAnalytics;
