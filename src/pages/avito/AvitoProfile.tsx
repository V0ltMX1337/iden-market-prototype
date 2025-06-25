import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import AvitoProfileMain from "@/components/avito/profile/AvitoProfileMain";
import AvitoProfileAds from "@/components/avito/profile/AvitoProfileAds";
import AvitoProfileMessages from "@/components/avito/profile/AvitoProfileMessages";
import AvitoProfileFavorites from "@/components/avito/profile/AvitoProfileFavorites";
import AvitoProfileReviews from "@/components/avito/profile/AvitoProfileReviews";
import AvitoProfileSettings from "@/components/avito/profile/AvitoProfileSettings";

const AvitoProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: "", label: "Профиль", icon: "User", path: "/avito/profile" },
    {
      id: "ads",
      label: "Мои объявления",
      icon: "Package",
      path: "/avito/profile/ads",
      count: 3,
    },
    {
      id: "messages",
      label: "Сообщения",
      icon: "MessageCircle",
      path: "/avito/profile/messages",
      count: 2,
    },
    {
      id: "favorites",
      label: "Избранное",
      icon: "Heart",
      path: "/avito/profile/favorites",
      count: 5,
    },
    {
      id: "reviews",
      label: "Отзывы",
      icon: "Star",
      path: "/avito/profile/reviews",
    },
    {
      id: "settings",
      label: "Настройки",
      icon: "Settings",
      path: "/avito/profile/settings",
    },
  ];

  const isActive = (path: string) => {
    if (path === "/avito/profile") {
      return location.pathname === "/avito/profile";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button
              variant="ghost"
              onClick={() => navigate("/avito")}
              className="flex items-center space-x-2"
            >
              <Icon name="ArrowLeft" size={20} />
              <span className="text-2xl font-bold text-blue-600">AVITO</span>
            </Button>

            <Button
              onClick={() => navigate("/avito/sell")}
              className="bg-green-600 hover:bg-green-700"
            >
              <Icon name="Plus" size={16} className="mr-2" />
              Подать объявление
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <nav className="space-y-2">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
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
                      {item.count && (
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                          {item.count}
                        </span>
                      )}
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <Routes>
              <Route index element={<AvitoProfileMain />} />
              <Route path="ads" element={<AvitoProfileAds />} />
              <Route path="messages" element={<AvitoProfileMessages />} />
              <Route path="favorites" element={<AvitoProfileFavorites />} />
              <Route path="reviews" element={<AvitoProfileReviews />} />
              <Route path="settings" element={<AvitoProfileSettings />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AvitoProfile;
