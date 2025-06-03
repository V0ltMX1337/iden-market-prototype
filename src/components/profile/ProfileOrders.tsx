import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ProfileOrders = () => {
  const [selectedOrderFilter, setSelectedOrderFilter] = useState("all");

  const orders = [
    {
      id: "ORD-003",
      date: "2024-05-25",
      total: 1200,
      status: "delivered",
      seller: "TechStore",
      items: [{ name: "Смартфон Samsung", quantity: 1, price: 1200 }],
    },
    {
      id: "ORD-004",
      date: "2024-05-22",
      total: 450,
      status: "shipping",
      seller: "AudioWorld",
      items: [{ name: "Беспроводные наушники", quantity: 1, price: 450 }],
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusMap = {
      delivered: { label: "Доставлен", variant: "default" as const },
      shipping: { label: "В пути", variant: "secondary" as const },
      processing: { label: "Обрабатывается", variant: "outline" as const },
    };
    return statusMap[status as keyof typeof statusMap] || statusMap.processing;
  };

  const getFilteredOrders = () => {
    if (selectedOrderFilter === "all") return orders;
    return orders.filter((order) => order.status === selectedOrderFilter);
  };

  const filteredOrdersByStatus = getFilteredOrders();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Мои заказы</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredOrdersByStatus.map((order) => (
            <div key={order.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">Заказ {order.id}</p>
                  <p className="text-sm text-gray-600">{order.date}</p>
                </div>
                <Badge variant={getStatusBadge(order.status).variant}>
                  {getStatusBadge(order.status).label}
                </Badge>
              </div>
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{item.name}</span>
                    <span>{item.price} ₽</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between font-semibold pt-2 border-t">
                <span>Итого:</span>
                <span>{order.total} ₽</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileOrders;
