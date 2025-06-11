import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/marketplace/Header";
import Footer from "@/components/marketplace/Footer";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import ProfileMain from "@/components/profile/ProfileMain";
import ProfileOrders from "@/components/profile/ProfileOrders";
import ProfileMessages from "@/components/profile/ProfileMessages";
import ProfilePotions from "@/components/profile/ProfilePotions";
import ProfileReviews from "@/components/profile/ProfileReviews";
import ProfileReturns from "@/components/profile/ProfileReturns";
import ProfileDelivery from "@/components/profile/ProfileDelivery";
import ProfileSettings from "@/components/profile/ProfileSettings";

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOrdersExpanded, setIsOrdersExpanded] = useState(false);

  const menuItems = [
    { id: "", label: "Профиль", icon: "User", path: "/profile" },
    { id: "orders", label: "Заказы", icon: "Package", path: "/profile/orders" },
    {
      id: "messages",
      label: "Сообщения",
      icon: "MessageCircle",
      path: "/profile/messages",
    },
    { id: "potions", label: "Зельки", icon: "Coins", path: "/profile/potions" },
    {
      id: "reviews",
      label: "Мои отзывы",
      icon: "Star",
      path: "/profile/reviews",
    },
    {
      id: "order_returns",
      label: "Возвраты",
      icon: "RotateCcw",
      path: "/profile/order_returns",
    },
    {
      id: "deliveryProfiles",
      label: "Профили доставки",
      icon: "MapPin",
      path: "/profile/deliveryProfiles",
    },
    {
      id: "settings",
      label: "Настройки",
      icon: "Settings",
      path: "/profile/settings",
    },
  ];

  const orderSubItems = [
    { label: "Все", path: "/profile/orders", count: 2 },
    { label: "Ожидают", path: "/profile/orders/pending" },
    { label: "В пути", path: "/profile/orders/shipping" },
    { label: "Доставлен", path: "/profile/orders/delivered", count: 1 },
    { label: "Ждут оценки", path: "/profile/orders/rating" },
    { label: "Отменен", path: "/profile/orders/cancelled", count: 1 },
    { label: "Завершен", path: "/profile/orders/completed", count: 1 },
  ];

  const isActive = (path: string) => {
    if (path === "/profile") {
      return location.pathname === "/profile";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-roboto">
      <Header />

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Menu */}
          <aside className="lg:w-64 flex-shrink-0">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <nav className="space-y-2">
                  {menuItems.map((item) => (
                    <div key={item.id}>
                      {item.id === "orders" ? (
                        <>
                          <button
                            onClick={() =>
                              setIsOrdersExpanded(!isOrdersExpanded)
                            }
                            className={`w-full flex items-center justify-between px-0 py-3 text-left transition-colors group ${
                              isActive(item.path)
                                ? "text-blue-600"
                                : "text-gray-700 hover:text-blue-600"
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <Icon
                                name={item.icon as any}
                                size={20}
                                className={`${
                                  isActive(item.path)
                                    ? "text-blue-600"
                                    : "text-blue-500"
                                }`}
                              />
                              <span className="font-medium">{item.label}</span>
                            </div>
                            <Icon
                              name="ChevronDown"
                              size={16}
                              className={`transition-transform ${
                                isOrdersExpanded ? "rotate-180" : ""
                              } ${
                                isActive(item.path)
                                  ? "text-blue-600"
                                  : "text-gray-400"
                              }`}
                            />
                          </button>
                          {isOrdersExpanded && (
                            <div className="ml-8 space-y-1 pb-2">
                              {orderSubItems.map((subItem) => (
                                <button
                                  key={subItem.path}
                                  onClick={() => navigate(subItem.path)}
                                  className={`w-full flex items-center justify-between px-0 py-2 text-left transition-colors ${
                                    location.pathname === subItem.path
                                      ? "text-blue-600"
                                      : "text-gray-600 hover:text-blue-600"
                                  }`}
                                >
                                  <span className="text-sm">
                                    {subItem.label}
                                  </span>
                                  {subItem.count && (
                                    <span className="text-xs text-gray-400">
                                      {subItem.count}
                                    </span>
                                  )}
                                </button>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <button
                          onClick={() => navigate(item.path)}
                          className={`w-full flex items-center justify-between px-0 py-3 text-left transition-colors group ${
                            isActive(item.path)
                              ? "text-blue-600"
                              : "text-gray-700 hover:text-blue-600"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <Icon
                              name={item.icon as any}
                              size={20}
                              className={`${
                                isActive(item.path)
                                  ? "text-blue-600"
                                  : "text-blue-500"
                              }`}
                            />
                            <span className="font-medium">{item.label}</span>
                          </div>
                          {item.id === "settings" && (
                            <Icon
                              name="ChevronDown"
                              size={16}
                              className={`transition-transform ${
                                isActive(item.path)
                                  ? "text-blue-600"
                                  : "text-gray-400"
                              }`}
                            />
                          )}
                        </button>
                      )}
                    </div>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <Routes>
              <Route index element={<ProfileMain />} />
              <Route path="orders" element={<ProfileOrders />} />
              <Route path="messages" element={<ProfileMessages />} />
              <Route path="potions" element={<ProfilePotions />} />
              <Route path="reviews" element={<ProfileReviews />} />
              <Route path="order_returns" element={<ProfileReturns />} />
              <Route path="deliveryProfiles" element={<ProfileDelivery />} />
              <Route path="settings" element={<ProfileSettings />} />
            </Routes>
          </main>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Profile;
