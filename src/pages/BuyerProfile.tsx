import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const BuyerProfile = () => {
  const user = {
    firstName: "Анна",
    lastName: "Покупатель",
    email: "anna@example.com",
    avatar: "",
  };

  const orders = [
    {
      id: "ORD-003",
      date: "2024-05-25",
      total: 1200,
      status: "delivered",
      items: [{ name: "Смартфон Samsung", quantity: 1, price: 1200 }],
    },
    {
      id: "ORD-004",
      date: "2024-05-22",
      total: 450,
      status: "shipping",
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            to="/marketplace"
            className="inline-flex items-center text-primary hover:text-primary/80"
          >
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Вернуться в магазин
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Профиль покупателя</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>
                    {user.firstName[0]}
                    {user.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">
                    {user.firstName} {user.lastName}
                  </h3>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Редактировать профиль
              </Button>
            </CardContent>
          </Card>

          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Мои заказы</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border rounded-lg p-4 space-y-3"
                    >
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerProfile;
