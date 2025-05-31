import { useState } from "react";
import Icon from "@/components/ui/icon";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AdminFinance = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  const balanceData = {
    available: 245680,
    pending: 89420,
    lastPayout: 156700,
    payoutDate: "2025-05-25",
  };

  const transactions = [
    {
      id: 1,
      type: "sale",
      amount: 12500,
      date: "2025-05-30",
      description: "Заказ #1047",
    },
    {
      id: 2,
      type: "payout",
      amount: -156700,
      date: "2025-05-25",
      description: "Выплата на карту",
    },
    {
      id: 3,
      type: "sale",
      amount: 8900,
      date: "2025-05-29",
      description: "Заказ #1046",
    },
    {
      id: 4,
      type: "sale",
      amount: 15600,
      date: "2025-05-28",
      description: "Заказ #1045",
    },
    {
      id: 5,
      type: "commission",
      amount: -1250,
      date: "2025-05-27",
      description: "Комиссия платформы",
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "sale":
        return "TrendingUp";
      case "payout":
        return "ArrowDownLeft";
      case "commission":
        return "Percent";
      default:
        return "Circle";
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "sale":
        return "text-green-600";
      case "payout":
        return "text-blue-600";
      case "commission":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Финансы</h2>
        <p className="text-gray-600">Управление балансом и движением средств</p>
      </div>

      {/* Баланс кабинета */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Доступно к выплате
            </CardTitle>
            <Icon name="Wallet" className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(balanceData.available)}
            </div>
            <p className="text-xs text-muted-foreground">Готово к выводу</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">В обработке</CardTitle>
            <Icon name="Clock" className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {formatCurrency(balanceData.pending)}
            </div>
            <p className="text-xs text-muted-foreground">
              Ожидает подтверждения
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Последняя выплата
            </CardTitle>
            <Icon
              name="ArrowDownLeft"
              className="h-4 w-4 text-muted-foreground"
            />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(balanceData.lastPayout)}
            </div>
            <p className="text-xs text-muted-foreground">
              {balanceData.payoutDate}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Кнопка вывода средств */}
      <div className="flex justify-end">
        <button className="bg-yellow-500 text-black px-6 py-2 rounded-lg font-medium hover:bg-yellow-400 transition-colors flex items-center gap-2">
          <Icon name="Download" size={16} />
          Вывести средства
        </button>
      </div>

      {/* Движение денег */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Движение средств</CardTitle>
              <CardDescription>
                История операций за выбранный период
              </CardDescription>
            </div>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
            >
              <option value="week">Неделя</option>
              <option value="month">Месяц</option>
              <option value="quarter">Квартал</option>
              <option value="year">Год</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full bg-gray-100 ${getTransactionColor(transaction.type)}`}
                  >
                    <Icon
                      name={getTransactionIcon(transaction.type) as any}
                      size={16}
                    />
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                </div>
                <div
                  className={`font-bold ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}
                >
                  {transaction.amount > 0 ? "+" : ""}
                  {formatCurrency(transaction.amount)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminFinance;
