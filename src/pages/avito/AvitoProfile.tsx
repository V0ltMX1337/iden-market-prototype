import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import AvitoHeader from "@/components/avitomarket/AvitoHeader";
import AvitoFooter from "@/components/avitomarket/AvitoFooter";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import AvitoProfileMain from "@/components/avito/profile/AvitoProfileMain";
import AvitoProfileAds from "@/components/avito/profile/AvitoProfileAds";
import AvitoProfileMessages from "@/components/avito/profile/AvitoProfileMessages";
import AvitoProfileFavorites from "@/components/avito/profile/AvitoProfileFavorites";
import AvitoProfileReviews from "@/components/avito/profile/AvitoProfileReviews";
import AvitoProfileSettings from "@/components/avito/profile/AvitoProfileSettings";
import AvitoSell from "@/components/avito/profile/AvitoSell";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600">
      <AvitoHeader />

      <div className="bg-white">
        <div className="max-w-[94rem] mx-auto px-6 sm:px-8 lg:px-12 pt-10 pb-6">
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
                                : "text-purple-500"
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
                <Route path="sell" element={<AvitoSell />} />
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

      <AvitoFooter />
    </div>
  );
};

export default AvitoProfile;
