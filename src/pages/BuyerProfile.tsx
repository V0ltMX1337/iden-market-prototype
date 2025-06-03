import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/marketplace/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";

const BuyerProfile = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("profile");
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [searchOrders, setSearchOrders] = useState("");
  const [selectedOrderFilter, setSelectedOrderFilter] = useState("all");

  const user = {
    firstName: "Анна",
    lastName: "Покупатель",
    email: "anna@example.com",
    avatar: "",
    birthDate: "15.03.1990",
    gender: "Женский",
    phone: "+7 912 345-67-89",
    phoneVerified: true,
    username: "anna_buyer",
  };

  const orders = [
    {
      id: "ORD-003",
      date: "2024-05-25",
      total: 1200,
      status: "delivered",
      seller: "TechStore",
      productImage:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=80&h=80&fit=crop",
      items: [{ name: "Смартфон Samsung", quantity: 1, price: 1200 }],
    },
    {
      id: "ORD-004",
      date: "2024-05-22",
      total: 450,
      status: "shipping",
      seller: "AudioWorld",
      productImage:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop",
      items: [{ name: "Беспроводные наушники", quantity: 1, price: 450 }],
    },
  ];

  const reviews = [
    {
      id: 1,
      productName: "Магнитола Pionneer GB MVH-Y8059MBT",
      orderNumber: "WKO-297137250523",
      rating: 5,
      date: "1 месяц назад",
      comment:
        "Заказал 4 шт и реально пришло) Боялся заказывать на авито, но данный продавец полностью оправдал себя. Одна только упаковка, моё почтение... Буду заказывать ещё",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=150&h=150&fit=crop",
      status: "published",
    },
  ];

  const menuItems = [
    { id: "profile", label: "Профиль", icon: "User" },
    {
      id: "orders",
      label: "Заказы",
      icon: "Package",
      hasSubmenu: true,
      submenu: [
        { id: "all", label: "Все" },
        { id: "delivered", label: "Доставлен" },
        { id: "shipping", label: "В пути" },
        { id: "processing", label: "Обрабатывается" },
        { id: "cancelled", label: "Отменен" },
      ],
    },
    { id: "messages", label: "Сообщения", icon: "MessageCircle" },
    { id: "reviews", label: "Мои отзывы", icon: "Star" },
    { id: "returns", label: "Возвраты", icon: "RotateCcw" },
    { id: "addresses", label: "Профили доставки", icon: "MapPin" },
    {
      id: "settings",
      label: "Настройки",
      icon: "Settings",
      hasSubmenu: true,
      submenu: [
        { id: "notifications", label: "Уведомления" },
        { id: "telegram", label: "Telegram" },
      ],
    },
  ];

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchOrders.toLowerCase()) ||
      order.seller.toLowerCase().includes(searchOrders.toLowerCase()) ||
      order.items.some((item) =>
        item.name.toLowerCase().includes(searchOrders.toLowerCase()),
      ),
  );

  const renderEditableField = (
    label: string,
    value: string,
    fieldKey: string,
    isPhone = false,
  ) => {
    const isEditing = editingField === fieldKey;

    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <>
              <Input type="text" defaultValue={value} className="flex-1" />
              <Button size="sm" onClick={() => setEditingField(null)}>
                Сохранить
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditingField(null)}
              >
                Отмена
              </Button>
            </>
          ) : (
            <>
              <div className="flex-1 flex items-center space-x-2">
                <span className="border border-gray-300 rounded-md px-3 py-2 bg-gray-50 flex-1">
                  {value}
                </span>
                {isPhone && user.phoneVerified && (
                  <Badge
                    variant="default"
                    className="bg-green-100 text-green-800"
                  >
                    <Icon name="CheckCircle" size={12} className="mr-1" />
                    Подтвержден
                  </Badge>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditingField(fieldKey)}
              >
                <Icon name="Edit2" size={14} />
              </Button>
            </>
          )}
        </div>
      </div>
    );
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      delivered: { label: "Доставлен", variant: "default" as const },
      shipping: { label: "В пути", variant: "secondary" as const },
      processing: { label: "Обрабатывается", variant: "outline" as const },
    };
    return statusMap[status as keyof typeof statusMap] || statusMap.processing;
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId],
    );
  };

  const handleSubmenuClick = (parentId: string, submenuId: string) => {
    if (parentId === "orders") {
      setSelectedOrderFilter(submenuId);
      setActiveSection("orders");
    } else if (parentId === "settings") {
      setActiveSection(`${parentId}-${submenuId}`);
    }
  };

  const getFilteredOrders = () => {
    if (selectedOrderFilter === "all") return orders;
    return orders.filter((order) => order.status === selectedOrderFilter);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={16}
        className={
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }
      />
    ));
  };

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Личная информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-6">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="text-lg">
                    {user.firstName[0]}
                    {user.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold">
                    {user.firstName} {user.lastName}
                  </h3>
                  <p className="text-gray-600">{user.email}</p>
                  <Button variant="outline" size="sm">
                    Изменить фото
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderEditableField("Имя", user.firstName, "firstName")}
                {renderEditableField("Фамилия", user.lastName, "lastName")}
                {renderEditableField(
                  "Имя пользователя",
                  user.username,
                  "username",
                )}
                {renderEditableField(
                  "Дата рождения",
                  user.birthDate,
                  "birthDate",
                )}
                {renderEditableField("Пол", user.gender, "gender")}
                {renderEditableField(
                  "Номер телефона",
                  user.phone,
                  "phone",
                  true,
                )}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email адрес
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50"
                    readOnly
                  />
                </div>
              </div>
              <Button>Сохранить изменения</Button>
            </CardContent>
          </Card>
        );

      case "orders":
        const filteredOrdersByStatus = getFilteredOrders();
        return (
          <Card>
            <CardHeader>
              <CardTitle>
                Мои заказы
                {selectedOrderFilter !== "all" && (
                  <Badge variant="secondary" className="ml-2">
                    {
                      menuItems
                        .find((item) => item.id === "orders")
                        ?.submenu?.find((sub) => sub.id === selectedOrderFilter)
                        ?.label
                    }
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredOrdersByStatus.map((order) => (
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
        );

      case "reviews":
        return (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Мои отзывы 1</CardTitle>
                <select className="text-sm border border-gray-300 rounded-md px-3 py-1">
                  <option>Все отзывы</option>
                  <option>Опубликованные</option>
                  <option>Ожидают модерации</option>
                </select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border rounded-lg p-4 space-y-4"
                  >
                    <div className="flex justify-between items-start">
                      <Badge
                        variant="outline"
                        className="text-green-600 border-green-600"
                      >
                        <Icon name="CheckCircle" size={12} className="mr-1" />
                        Опубликован
                      </Badge>
                      <Button variant="outline" size="sm">
                        Редактировать
                      </Button>
                    </div>

                    <div className="flex items-center space-x-2">
                      {renderStars(review.rating)}
                      <span className="text-sm text-gray-600">
                        {review.date}
                      </span>
                    </div>

                    <div className="flex space-x-4">
                      <img
                        src={review.image}
                        alt={review.productName}
                        className="w-16 h-16 rounded object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{review.productName}</h4>
                        <p className="text-sm text-gray-600">
                          Номер заказа: {review.orderNumber}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h5 className="font-medium mb-2">Комментарий</h5>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <Icon name="MessageCircle" size={16} className="mr-1" />0
                      Ответов
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      default:
        return (
          <Card>
            <CardContent className="flex items-center justify-center h-64">
              <div className="text-center space-y-2">
                <Icon
                  name="Construction"
                  size={48}
                  className="mx-auto text-gray-400"
                />
                <p className="text-gray-600">Раздел в разработке</p>
              </div>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-roboto">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Menu */}
          <aside className="lg:w-64 flex-shrink-0">
            <Card>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors ${
                        activeSection === item.id
                          ? "bg-primary text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Icon name={item.icon as any} size={20} />
                      <span>{item.label}</span>
                      {item.id === "orders" && (
                        <Icon
                          name="ChevronDown"
                          size={16}
                          className="ml-auto"
                        />
                      )}
                      {item.id === "settings" && (
                        <Icon
                          name="ChevronDown"
                          size={16}
                          className="ml-auto"
                        />
                      )}
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1">{renderContent()}</main>
        </div>
      </div>
    </div>
  );
};

export default BuyerProfile;
