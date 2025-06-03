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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TransactionHistory />
        </div>
        <div>
          <BalanceCard />
        </div>
      </div>
    </div>
  );
};

const BalanceCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="Wallet" size={20} />
          Баланс кабинета
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <p className="text-sm text-gray-600">Доступно к выводу</p>
          <p className="text-3xl font-bold text-green-600">₽462,869</p>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">В обработке</span>
            <span className="font-medium">₽45,230</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Зарезервировано</span>
            <span className="font-medium">₽12,400</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Комиссия платформы</span>
            <span className="font-medium text-red-600">-₽24,361</span>
          </div>
        </div>

        <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors">
          Вывести средства
        </button>
      </CardContent>
    </Card>
  );
};

const TransactionHistory = () => {
  const transactions = [
    {
      id: "1",
      type: "sale",
      description: "Продажа: Наушники Buds3 Pro",
      amount: "+₽890",
      date: "Сегодня, 14:32",
      status: "completed",
    },
    {
      id: "2",
      type: "commission",
      description: "Комиссия платформы",
      amount: "-₽53",
      date: "Сегодня, 14:32",
      status: "completed",
    },
    {
      id: "3",
      type: "sale",
      description: "Продажа: Смартфон Galaxy S24",
      amount: "+₽45,900",
      date: "Вчера, 16:20",
      status: "processing",
    },
    {
      id: "4",
      type: "withdrawal",
      description: "Вывод средств на карту",
      amount: "-₽25,000",
      date: "2 дня назад",
      status: "completed",
    },
    {
      id: "5",
      type: "sale",
      description: "Продажа: Планшет iPad Air",
      amount: "+₽32,990",
      date: "3 дня назад",
      status: "completed",
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "sale":
        return "ShoppingBag";
      case "commission":
        return "CreditCard";
      case "withdrawal":
        return "ArrowDownLeft";
      default:
        return "Circle";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600";
      case "processing":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="Activity" size={20} />
          Движение денег
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <Icon
                    name={getIcon(transaction.type) as any}
                    size={16}
                    className="text-gray-600"
                  />
                </div>
                <div>
                  <p className="font-medium text-sm">
                    {transaction.description}
                  </p>
                  <p className="text-xs text-gray-500">{transaction.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`font-medium ${transaction.amount.startsWith("+") ? "text-green-600" : "text-red-600"}`}
                >
                  {transaction.amount}
                </p>
                <p className={`text-xs ${getStatusColor(transaction.status)}`}>
                  {transaction.status === "completed"
                    ? "Завершено"
                    : "В обработке"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminFinance;
