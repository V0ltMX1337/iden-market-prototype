import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
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
            <Card>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => navigate(item.path)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors ${
                        isActive(item.path)
                          ? "bg-primary text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Icon name={item.icon as any} size={20} />
                      <span>{item.label}</span>
                    </button>
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
