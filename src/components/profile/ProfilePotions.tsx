import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const ProfilePotions = () => {
  const balance = 1250;

  const transactions = [
    {
      id: 1,
      type: "credit",
      amount: 100,
      description: "Кешбек за заказ ORD-003",
      date: "2024-05-25",
      orderId: "ORD-003",
    },
    {
      id: 2,
      type: "debit",
      amount: 50,
      description: "Скидка на заказ ORD-004",
      date: "2024-05-22",
      orderId: "ORD-004",
    },
    {
      id: 3,
      type: "credit",
      amount: 200,
      description: "Бонус за регистрацию",
      date: "2024-05-15",
      orderId: null,
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Icon name="Coins" size={24} className="text-yellow-500" />
            <span>Мой баланс Зелек</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="text-4xl font-bold text-primary flex items-center justify-center space-x-2">
              <Icon name="Coins" size={40} className="text-yellow-500" />
              <span>{balance}</span>
            </div>
            <p className="text-gray-600">зелек на вашем счету</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Что такое Зельки?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 space-y-3">
            <div className="flex items-center space-x-2">
              <Icon name="Sparkles" size={20} className="text-purple-500" />
              <h3 className="font-semibold text-purple-800">
                Волшебная валюта магазина
              </h3>
            </div>
            <p className="text-gray-700">
              Зельки — это наша уникальная валюта, которую вы получаете за
              каждую покупку! Используйте их для получения скидок на будущие
              заказы. Чем больше покупаете, тем больше зелек накапливаете.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Icon name="Gift" size={16} />
                <span>5% с каждой покупки</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Percent" size={16} />
                <span>1 зелька = 1 рубль скидки</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>История операций</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between border-b pb-3"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-full ${
                      transaction.type === "credit"
                        ? "bg-green-100"
                        : "bg-red-100"
                    }`}
                  >
                    <Icon
                      name={transaction.type === "credit" ? "Plus" : "Minus"}
                      size={16}
                      className={
                        transaction.type === "credit"
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    />
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-gray-600">{transaction.date}</p>
                    {transaction.orderId && (
                      <Badge variant="outline" className="text-xs mt-1">
                        {transaction.orderId}
                      </Badge>
                    )}
                  </div>
                </div>
                <div
                  className={`font-semibold flex items-center space-x-1 ${
                    transaction.type === "credit"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  <span>
                    {transaction.type === "credit" ? "+" : "-"}
                    {transaction.amount}
                  </span>
                  <Icon name="Coins" size={16} className="text-yellow-500" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePotions;
