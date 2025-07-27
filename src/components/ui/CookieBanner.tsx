import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Проверяем, принял ли пользователь куки
    const cookieConsent = localStorage.getItem("cookie-consent");
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    // Сохраняем согласие в localStorage
    localStorage.setItem("cookie-consent", "accepted");
    localStorage.setItem("cookie-consent-date", new Date().toISOString());
    setIsVisible(false);
  };

  const rejectCookies = () => {
    // Сохраняем отказ в localStorage
    localStorage.setItem("cookie-consent", "rejected");
    localStorage.setItem("cookie-consent-date", new Date().toISOString());
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 pointer-events-none">
      <div className="max-w-6xl mx-auto pointer-events-auto">
        <Card className="bg-white border shadow-lg">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex items-start gap-3 flex-1">
                <Icon name="Cookie" className="w-6 h-6 text-orange-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Мы используем куки-файлы
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Мы используем куки для улучшения работы сайта, анализа трафика и персонализации контента. 
                    Продолжая использовать сайт, вы соглашаетесь с использованием куки-файлов.
                  </p>
                  <div className="mt-2">
                    <a 
                      href="/privacy-policy" 
                      className="text-sm text-blue-600 hover:text-blue-800 underline"
                    >
                      Подробнее о политике конфиденциальности
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <Button
                  variant="outline"
                  onClick={rejectCookies}
                  className="text-sm px-4 py-2 w-full sm:w-auto"
                >
                  Отклонить
                </Button>
                <Button
                  onClick={acceptCookies}
                  className="text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
                >
                  Принять все
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CookieBanner;