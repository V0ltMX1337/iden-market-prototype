import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface OrderItem {
  id: string;
  name: string;
  description: string;
  image: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  date: string;
  status: "delivered" | "shipping" | "processing" | "cancelled" | "pending";
  seller: {
    name: string;
    logo: string;
  };
  items: OrderItem[];
  total: number;
}

const ProfileOrders = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const orders: Order[] = [
    {
      id: "ORD-001",
      date: "2024-05-25",
      status: "delivered",
      seller: {
        name: "TV SHOP",
        logo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=40&h=40&fit=crop&crop=center",
      },
      items: [
        {
          id: "1",
          name: "Брелок стич на ключи",
          description: "Брелок стич на ключи - Брелок стич на ключи",
          image:
            "https://images.unsplash.com/photo-1558618047-3c8c4d1916d4?w=80&h=80&fit=crop&crop=center",
          quantity: 24,
          price: 30,
        },
        {
          id: "2",
          name: "Брелок Nike на ключи",
          description: "Брелок - микс",
          image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&h=80&fit=crop&crop=center",
          quantity: 60,
          price: 30,
        },
        {
          id: "3",
          name: "Брелок космонавт",
          description: "космонавт - микс",
          image:
            "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=80&h=80&fit=crop&crop=center",
          quantity: 72,
          price: 30,
        },
      ],
      total: 4680,
    },
    {
      id: "ORD-002",
      date: "2024-05-22",
      status: "cancelled",
      seller: {
        name: "OnShop",
        logo: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=40&h=40&fit=crop&crop=center",
      },
      items: [
        {
          id: "4",
          name: "Магнитола Pioneer GB MVH-Y8059MBT",
          description: "Автомагнитола Pioneer - GB MVH-Y8059MBT",
          image:
            "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=80&h=80&fit=crop&crop=center",
          quantity: 4,
          price: 1040,
        },
      ],
      total: 4160,
    },
  ];

  const getFilteredOrders = () => {
    if (!searchQuery) return orders;
    return orders.filter(
      (order) =>
        order.items.some((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()),
        ) ||
        order.seller.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  };

  const getStatusLabel = (status: string) => {
    const statusMap = {
      delivered: "Нет связи",
      shipping: "В пути",
      processing: "Обрабатывается",
      cancelled: "Завершен",
      pending: "Ожидает",
    };
    return statusMap[status as keyof typeof statusMap] || "Неизвестно";
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Все</h1>
        <div className="relative w-80">
          <Input
            placeholder="Поиск по заказам"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-50 border-gray-200"
          />
          <Icon
            name="Search"
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>

      {/* Orders */}
      <div className="space-y-6">
        {getFilteredOrders().map((order) => (
          <Card key={order.id} className="border border-gray-100 shadow-sm">
            <CardContent className="p-6">
              {/* Order Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center">
                    <span className="text-sm font-bold text-white">
                      {order.seller.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">
                      {order.seller.name}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {getStatusLabel(order.status)}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-semibold text-gray-900">
                    Итого: {order.total.toLocaleString()} ₽
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-50">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-500">
                        {item.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">× {item.quantity}</p>
                      <p className="font-medium text-gray-900">
                        {item.price} ₽
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Actions */}
              <div className="flex gap-3">
                {order.status === "delivered" ? (
                  <>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Статус доставки
                    </Button>
                    <Button variant="link" className="text-blue-600 p-0">
                      Написать
                    </Button>
                  </>
                ) : (
                  <Button variant="link" className="text-blue-600 p-0">
                    Написать
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProfileOrders;
