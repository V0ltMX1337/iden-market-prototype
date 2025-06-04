import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  const [selectedFilter, setSelectedFilter] = useState("all");
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
      status: "delivered",
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

  const statusFilters = [
    { key: "all", label: "Все", count: 2 },
    { key: "pending", label: "Ожидают", count: 0 },
    { key: "processing", label: "В пути", count: 0 },
    { key: "delivered", label: "Доставлен", count: 1 },
    { key: "cancelled", label: "Отменен", count: 1 },
    { key: "completed", label: "Завершен", count: 1 },
  ];

  const getStatusBadge = (status: string) => {
    const statusMap = {
      delivered: {
        label: "Доставлен",
        variant: "default" as const,
        color: "bg-green-100 text-green-700",
      },
      shipping: {
        label: "В пути",
        variant: "secondary" as const,
        color: "bg-blue-100 text-blue-700",
      },
      processing: {
        label: "Обрабатывается",
        variant: "outline" as const,
        color: "bg-yellow-100 text-yellow-700",
      },
      cancelled: {
        label: "Отменен",
        variant: "destructive" as const,
        color: "bg-red-100 text-red-700",
      },
      pending: {
        label: "Ожидает",
        variant: "outline" as const,
        color: "bg-gray-100 text-gray-700",
      },
    };
    return statusMap[status as keyof typeof statusMap] || statusMap.pending;
  };

  const getFilteredOrders = () => {
    let filtered = orders;
    if (selectedFilter !== "all") {
      filtered = orders.filter((order) => order.status === selectedFilter);
    }
    if (searchQuery) {
      filtered = filtered.filter(
        (order) =>
          order.items.some((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()),
          ) ||
          order.seller.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }
    return filtered;
  };

  return (
    <div className="flex gap-6">
      {/* Sidebar */}
      <div className="w-64 space-y-6">
        {/* Profile Link */}
        <div className="flex items-center gap-3 text-blue-600 cursor-pointer">
          <Icon name="User" size={20} />
          <span className="font-medium">Профиль</span>
        </div>

        {/* Orders Section */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <Icon name="Package" size={20} className="text-blue-600" />
            <span className="font-medium">Заказы</span>
            <Icon name="ChevronUp" size={16} className="ml-auto" />
          </div>

          <div className="space-y-1 ml-8">
            {statusFilters.map((filter) => (
              <div
                key={filter.key}
                className={`flex items-center justify-between py-2 px-3 rounded cursor-pointer hover:bg-gray-50 ${
                  selectedFilter === filter.key
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700"
                }`}
                onClick={() => setSelectedFilter(filter.key)}
              >
                <span className="text-sm">{filter.label}</span>
                {filter.count > 0 && (
                  <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                    {filter.count}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Other Menu Items */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-gray-700 cursor-pointer hover:text-blue-600">
            <Icon name="MessageSquare" size={20} />
            <span>Сообщения</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700 cursor-pointer hover:text-blue-600">
            <Icon name="Star" size={20} />
            <span>Мои отзывы</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700 cursor-pointer hover:text-blue-600">
            <Icon name="RotateCcw" size={20} />
            <span>Возвраты</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700 cursor-pointer hover:text-blue-600">
            <Icon name="MapPin" size={20} />
            <span>Профили доставки</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700 cursor-pointer hover:text-blue-600">
            <Icon name="Settings" size={20} />
            <span>Настройки</span>
            <Icon name="ChevronDown" size={16} className="ml-auto" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Все</h1>
          <div className="relative w-80">
            <Input
              placeholder="Поиск по заказам"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
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
            <Card key={order.id} className="p-6">
              <CardContent className="p-0">
                {/* Order Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-yellow-400 flex items-center justify-center">
                      <span className="text-sm font-bold text-white">
                        {order.seller.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">
                        {order.seller.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 rounded text-xs ${getStatusBadge(order.status).color}`}
                        >
                          {order.status === "delivered"
                            ? "Нет связи"
                            : getStatusBadge(order.status).label}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-semibold">
                      Итого: {order.total.toLocaleString()} ₽
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-600">
                          {item.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">
                          × {item.quantity}
                        </p>
                        <p className="font-medium">{item.price} ₽</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Actions */}
                <div className="flex gap-3 mt-6 pt-4 border-t">
                  {order.status === "delivered" ? (
                    <>
                      <Button
                        variant="default"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Статус доставки
                      </Button>
                      <Button variant="outline" className="text-blue-600">
                        Написать
                      </Button>
                    </>
                  ) : (
                    <Button variant="outline" className="text-blue-600">
                      Написать
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Show More */}
        <div className="text-center">
          <Button variant="link" className="text-blue-600">
            Показать ещё
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileOrders;
