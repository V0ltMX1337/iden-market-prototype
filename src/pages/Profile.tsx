import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate, Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("orders");

  // Мок данные пользователя
  const user = {
    firstName: "Иван",
    lastName: "Иванов",
    email: "ivan@example.com",
    avatar: "",
  };

  // Мок данные заказов
  const orders = [
    {
      id: "ORD-001",
      date: "2024-05-20",
      total: 2500,
      status: "delivered",
      items: [{ name: "iPhone 14 Pro", quantity: 1, price: 2500 }],
    },
    {
      id: "ORD-002",
      date: "2024-05-15",
      total: 850,
      status: "shipping",
      items: [{ name: "AirPods Pro", quantity: 1, price: 850 }],
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusMap = {
      delivered: { label: "Доставлен", variant: "default" as const },
      shipping: { label: "В пути", variant: "secondary" as const },
      processing: { label: "Обрабатывается", variant: "outline" as const },
    };
    return (
      statusMap[status as keyof typeof statusMap] || {
        label: status,
        variant: "outline" as const,
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <Link to="/" className="text-2xl font-bold text-primary">
              IdenMarket
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                to="/marketplace"
                className="text-gray-600 hover:text-primary"
              >
                Каталог
              </Link>
              <Button variant="outline" onClick={() => navigate("/")}>
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Профиль пользователя */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="w-20 h-20 mx-auto">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>
                    {user.firstName[0]}
                    {user.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <CardTitle>
                  {user.firstName} {user.lastName}
                </CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  <Icon name="Settings" size={16} className="mr-2" />
                  Настройки
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Основной контент */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="orders">Заказы</TabsTrigger>
                <TabsTrigger value="returns">Возвраты</TabsTrigger>
                <TabsTrigger value="payments">Способы оплаты</TabsTrigger>
              </TabsList>

              <TabsContent value="orders" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Мои заказы</h3>
                  <Button variant="outline" size="sm">
                    <Icon name="Filter" size={16} className="mr-2" />
                    Фильтр
                  </Button>
                </div>

                <div className="space-y-4">
                  {orders.map((order) => (
                    <Card key={order.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-base">
                              Заказ #{order.id}
                            </CardTitle>
                            <CardDescription>{order.date}</CardDescription>
                          </div>
                          <Badge {...getStatusBadge(order.status)}>
                            {getStatusBadge(order.status).label}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between">
                              <span>
                                {item.name} × {item.quantity}
                              </span>
                              <span>{item.price} ₽</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center justify-between mt-4 pt-4 border-t">
                          <span className="font-semibold">
                            Итого: {order.total} ₽
                          </span>
                          <Button variant="outline" size="sm">
                            Подробнее
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="returns" className="space-y-4">
                <div className="text-center py-12">
                  <Icon
                    name="RotateCcw"
                    size={48}
                    className="mx-auto text-gray-400 mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    У вас пока нет возвратов
                  </h3>
                  <p className="text-gray-600">
                    Здесь будут отображаться ваши запросы на возврат товаров
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="payments" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Способы оплаты</h3>
                  <Button>
                    <Icon name="Plus" size={16} className="mr-2" />
                    Добавить карту
                  </Button>
                </div>

                <div className="text-center py-12">
                  <Icon
                    name="CreditCard"
                    size={48}
                    className="mx-auto text-gray-400 mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Добавьте способ оплаты
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Сохраните карту для быстрых покупок
                  </p>
                  <Button>Добавить карту</Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
