import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const Orders = () => {
  const navigate = useNavigate();

  const orders = [
    {
      id: "ORD-001",
      date: "15.12.2024",
      total: "2 450 ₽",
      status: "Доставлен",
      items: ["Органический мёд", "Домашний хлеб"],
    },
    {
      id: "ORD-002",
      date: "10.12.2024",
      total: "1 800 ₽",
      status: "В пути",
      items: ["Фермерский сыр", "Молоко"],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate("/")} className="p-2">
            <Icon name="ArrowLeft" className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">Мои заказы</h1>
        </div>

        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">Заказ {order.id}</CardTitle>
                    <p className="text-muted-foreground">{order.date}</p>
                  </div>
                  <Badge
                    variant={
                      order.status === "Доставлен" ? "default" : "secondary"
                    }
                  >
                    {order.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <p key={index} className="text-sm text-muted-foreground">
                      • {item}
                    </p>
                  ))}
                  <p className="font-semibold text-lg mt-4">
                    Итого: {order.total}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
