import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const AdminAnalytics = () => {
  const stats = [
    { title: "Всего просмотров", value: "12,450", change: "+15%", icon: "Eye" },
    {
      title: "Просмотры за неделю",
      value: "2,340",
      change: "+8%",
      icon: "TrendingUp",
    },
    {
      title: "Заказы за месяц",
      value: "89",
      change: "+23%",
      icon: "ShoppingCart",
    },
    { title: "Конверсия", value: "3.2%", change: "+0.5%", icon: "Target" },
  ];

  const topProducts = [
    { name: "iPhone 14", views: 1250, orders: 12, conversion: "0.96%" },
    { name: "MacBook Air", views: 890, orders: 8, conversion: "0.90%" },
    { name: "AirPods Pro", views: 650, orders: 15, conversion: "2.31%" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-green-600">{stat.change}</p>
                </div>
                <Icon
                  name={stat.icon as any}
                  size={24}
                  className="text-muted-foreground"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Топ товаров по просмотрам</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div
                key={product.name}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <span className="text-lg font-bold text-gray-400">
                    #{index + 1}
                  </span>
                  <div>
                    <h4 className="font-semibold">{product.name}</h4>
                    <p className="text-sm text-gray-600">
                      {product.views} просмотров • {product.orders} заказов
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">Конверсия</p>
                  <p className="text-lg font-bold text-green-600">
                    {product.conversion}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAnalytics;
