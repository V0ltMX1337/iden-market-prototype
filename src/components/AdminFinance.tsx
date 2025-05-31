import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const AdminFinance = () => {
  const stats = [
    {
      title: "Общий доход",
      value: "₽487,230",
      change: "+12%",
      icon: "TrendingUp",
    },
    {
      title: "Продажи за месяц",
      value: "₽89,400",
      change: "+8%",
      icon: "ShoppingBag",
    },
    {
      title: "Комиссия платформы",
      value: "₽24,361",
      change: "-",
      icon: "CreditCard",
    },
    { title: "К выводу", value: "₽462,869", change: "+15%", icon: "Wallet" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Финансы</h2>
        <p className="text-gray-600">Доходы и расходы магазина</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-green-600">{stat.change}</p>
                </div>
                <Icon
                  name={stat.icon as any}
                  size={24}
                  className="text-gray-400"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminFinance;
