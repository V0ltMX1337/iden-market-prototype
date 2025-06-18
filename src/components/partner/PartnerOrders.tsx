import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const PartnerOrders = () => {
  const [orders] = useState([
    {
      id: "#12345",
      customer: "Анна Петрова",
      product: "iPhone 14",
      amount: 89999,
      status: "new",
      date: "2024-01-15",
    },
    {
      id: "#12346",
      customer: "Иван Иванов",
      product: "MacBook Air",
      amount: 149999,
      status: "shipping",
      date: "2024-01-14",
    },
    {
      id: "#12347",
      customer: "Мария Сидорова",
      product: "AirPods Pro",
      amount: 29999,
      status: "delivered",
      date: "2024-01-13",
    },
    {
      id: "#12348",
      customer: "Петр Козлов",
      product: "iPad Pro",
      amount: 119999,
      status: "cancelled",
      date: "2024-01-12",
    },
  ]);

  const getStatusText = (status: string) => {
    const statusMap = {
      new: "Новый заказ",
      shipping: "В доставке",
      delivered: "Получен",
      cancelled: "Отказ",
    };
    return statusMap[status as keyof typeof statusMap] || status;
  };

  const getStatusColor = (status: string) => {
    const colorMap = {
      new: "bg-blue-100 text-blue-800",
      shipping: "bg-yellow-100 text-yellow-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return (
      colorMap[status as keyof typeof colorMap] || "bg-gray-100 text-gray-800"
    );
  };

  const filterOrdersByStatus = (status: string) => {
    if (status === "all") return orders;
    return orders.filter((order) => order.status === status);
  };

  const OrderCard = ({ order }: { order: any }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-lg">{order.id}</h3>
            <p className="text-gray-600">{order.customer}</p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}
          >
            {getStatusText(order.status)}
          </span>
        </div>

        <div className="space-y-2 mb-4">
          <p className="font-medium">{order.product}</p>
          <p className="text-2xl font-bold text-green-600">
            {order.amount.toLocaleString()} ₽
          </p>
          <p className="text-sm text-gray-500">Дата: {order.date}</p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Icon name="Eye" size={14} />
            Детали
          </Button>
          {order.status === "new" && (
            <Button size="sm" className="flex-1">
              Обработать
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">Все заказы</TabsTrigger>
          <TabsTrigger value="new">Новые</TabsTrigger>
          <TabsTrigger value="shipping">В доставке</TabsTrigger>
          <TabsTrigger value="delivered">Получены</TabsTrigger>
          <TabsTrigger value="cancelled">Отказы</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filterOrdersByStatus("all").map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="new" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filterOrdersByStatus("new").map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="shipping" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filterOrdersByStatus("shipping").map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="delivered" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filterOrdersByStatus("delivered").map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filterOrdersByStatus("cancelled").map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PartnerOrders;
