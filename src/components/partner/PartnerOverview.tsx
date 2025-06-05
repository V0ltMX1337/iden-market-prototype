import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const PartnerOverview = () => {
  const metrics = [
    {
      title: "Показы товаров",
      value: "12,847",
      change: "+15.3%",
      changeType: "positive",
      icon: "Eye",
    },
    {
      title: "Заказы",
      value: "324",
      change: "+8.2%",
      changeType: "positive",
      icon: "ShoppingCart",
    },
    {
      title: "Сумма заказов",
      value: "2,847,500 ₽",
      change: "+23.1%",
      changeType: "positive",
      icon: "Banknote",
    },
    {
      title: "Конверсия",
      value: "2.52%",
      change: "-0.3%",
      changeType: "negative",
      icon: "Target",
    },
  ];

  const recentOrders = [
    {
      id: "#12847",
      customer: "Анна Петрова",
      product: "Системный блок AMD Ryzen",
      amount: 58800,
      status: "new",
    },
    {
      id: "#12846",
      customer: "Иван Сидоров",
      product: "Чернитель резины GRASS",
      amount: 560,
      status: "processing",
    },
    {
      id: "#12845",
      customer: "Мария Козлова",
      product: "Светильник USB",
      amount: 549,
      status: "shipped",
    },
  ];

  const topProducts = [
    {
      name: "Системный блок AMD Ryzen 3 1200",
      sales: 88,
      revenue: "5,174,400 ₽",
      trend: "+10%",
    },
    {
      name: "Чернитель резины GRASS",
      sales: 100,
      revenue: "56,000 ₽",
      trend: "+5%",
    },
    {
      name: "Зарядное USB-устройство",
      sales: 72,
      revenue: "40,320 ₽",
      trend: "-3%",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {metric.title}
                  </p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <p
                    className={`text-xs ${
                      metric.changeType === "positive"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {metric.change}
                  </p>
                </div>
                <Icon
                  name={metric.icon as any}
                  size={24}
                  className="text-muted-foreground"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Последние заказы</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-gray-600">{order.customer}</p>
                    <p className="text-sm text-gray-500">{order.product}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">
                      {order.amount.toLocaleString()} ₽
                    </p>
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs ${
                        order.status === "new"
                          ? "bg-blue-100 text-blue-800"
                          : order.status === "processing"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {order.status === "new"
                        ? "Новый"
                        : order.status === "processing"
                          ? "Обработка"
                          : "Отправлен"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Топ товаров</CardTitle>
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
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-600">
                        {product.sales} продаж
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">
                      {product.revenue}
                    </p>
                    <p
                      className={`text-sm ${
                        product.trend.startsWith("+")
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {product.trend}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PartnerOverview;
