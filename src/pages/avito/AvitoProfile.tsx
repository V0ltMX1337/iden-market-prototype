import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import AvitoHeader from "@/components/avitomarket/AvitoHeader";
import AvitoFooter from "@/components/avitomarket/AvitoFooter";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import AvitoProfileMain from "@/components/avito/profile/AvitoProfileMain";
import AvitoProfileAds from "@/components/avito/profile/AvitoProfileAds";
import AvitoProfileMessages from "@/components/avito/profile/AvitoProfileMessages";
import AvitoProfileFavorites from "@/components/avito/profile/AvitoProfileFavorites";
import AvitoProfileReviews from "@/components/avito/profile/AvitoProfileReviews";
import AvitoProfileSettings from "@/components/avito/profile/AvitoProfileSettings";
import AvitoSell from "@/components/avito/profile/AvitoSell";
import AvitoProfileGamePage from "@/components/avito/profile/AvitoProfileGamePage";
import AdStatistics from "@/components/avito/profile/AdStatistics";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/hooks/useAuth";
import { TemplateKeys, usePageTitle } from "@/hooks/usePageTitle";
import AdEdit from "@/components/avito/profile/AdEdit";

const AvitoProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { getPageTitle, settings } = usePageTitle();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const menuItems = [
    { id: "", label: "Профиль", icon: "User", path: "/profile" },
    { id: "ads", label: "Мои объявления", icon: "Package", path: "/profile/ads", count: 3 },
    { id: "messages", label: "Сообщения", icon: "MessageCircle", path: "/profile/messages", count: 2 },
    { id: "favorites", label: "Избранное", icon: "Heart", path: "/profile/favorites", count: 5 },
    { id: "settings", label: "Настройки", icon: "Settings", path: "/profile/settings" },
  ];

  const isActive = (path: string) =>
    path === "/profile"
      ? location.pathname === "/profile"
      : location.pathname.startsWith(path);

  const getTitleTemplateKey = (): TemplateKeys | null => {
    const path = location.pathname;
  
    if (path === "/profile") return "profileMain";
    if (path.startsWith("/profile/ads")) return "profileAds";
    if (path.startsWith("/profile/messages")) return "profileMessages";
    if (path.startsWith("/profile/favorites")) return "profileFavorites";
    if (path.startsWith("/profile/game")) return "profileGame";
    if (path.startsWith("/profile/settings")) return "profileSettings";
    if (path.startsWith("/profile/sell")) return "profileNewAd";
    return null;
  };

  const titleKey = getTitleTemplateKey();
  const title =
    titleKey && settings
      ? getPageTitle(titleKey, {
          profilename: user?.firstName || user?.lastName || "Пользователь",
        })
      : "Личный кабинет";

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600">
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <AvitoHeader />

      <main className="flex-grow bg-white">
        <div className="max-w-[94rem] mx-auto px-3 md:px-6 lg:px-12 pt-4 md:pt-10 pb-6">
          <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
            {/* Mobile Menu Button */}
            <div className="lg:hidden mb-4">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                    <Menu className="w-4 h-4" />
                    Меню профиля
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle className="flex items-center justify-between text-left">
                      Меню профиля
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </SheetTitle>
                  </SheetHeader>
                  <nav className="space-y-2 mt-6">
                    {menuItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          navigate(item.path);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-3 text-left transition-colors group rounded-lg ${
                          isActive(item.path)
                            ? "text-blue-600 bg-blue-50"
                            : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon
                            name={item.icon as any}
                            size={18}
                            className={`${
                              isActive(item.path)
                                ? "text-blue-600"
                                : "text-purple-500"
                            }`}
                          />
                          <span className="font-medium text-sm">{item.label}</span>
                        </div>
                        {item.count && (
                          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                            {item.count}
                          </span>
                        )}
                      </button>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>

            {/* Desktop Sidebar */}
            <aside className="hidden lg:block lg:w-64 flex-shrink-0">
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
            <section className="flex-1">
              <Routes>
                <Route index element={<AvitoProfileMain />} />
                <Route path="sell" element={<AvitoSell />} />
                <Route path="ads" element={<AvitoProfileAds />} />
                <Route path="game" element={<AvitoProfileGamePage />} />
                <Route path="messages" element={<AvitoProfileMessages />} />
                <Route path="favorites" element={<AvitoProfileFavorites />} />
                <Route path="reviews" element={<AvitoProfileReviews />} />
                <Route path="settings" element={<AvitoProfileSettings />} />
                <Route path=":adId/statistic" element={<AdStatistics />} />
                <Route path=":adId/edit" element={<AdEdit />} />
              </Routes>
            </section>
          </div>
        </div>
      </main>

      <AvitoFooter />
    </div>
  );
};

export default AvitoProfile;