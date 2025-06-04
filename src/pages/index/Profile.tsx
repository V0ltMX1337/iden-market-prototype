import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Header from "@/components/marketplace/Header";
import Footer from "@/components/marketplace/Footer";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

  const isActive = (path: string) => {
    if (path === "/profile") {
      return location.pathname === "/profile";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-roboto">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Menu */}
          <aside className="lg:w-64 flex-shrink-0">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <nav className="space-y-2">
                  {menuItems.map((item) => (
                    <div key={item.id}>
                      {item.id === "orders" ? (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
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
                                <span className="font-medium">
                                  {item.label}
                                </span>
                              </div>
                              <Icon
                                name="ChevronDown"
                                size={16}
                                className={`transition-transform ${
                                  isActive(item.path)
                                    ? "text-blue-600"
                                    : "text-gray-400"
                                }`}
                              />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start" className="w-48">
                            <DropdownMenuItem
                              onClick={() => navigate("/profile/orders")}
                            >
                              <div className="flex items-center justify-between w-full">
                                <span>Все</span>
                                <span className="text-xs text-gray-400">2</span>
                              </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <span>Ожидают</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <span>В пути</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <div className="flex items-center justify-between w-full">
                                <span>Доставлен</span>
                                <span className="text-xs text-gray-400">1</span>
                              </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <span>Ждут оценки</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <div className="flex items-center justify-between w-full">
                                <span>Отменен</span>
                                <span className="text-xs text-gray-400">1</span>
                              </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <div className="flex items-center justify-between w-full">
                                <span>Завершен</span>
                                <span className="text-xs text-gray-400">1</span>
                              </div>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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
