import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import AvitoHeader from "@/components/avitomarket/AvitoHeader";
import AvitoFooter from "@/components/avitomarket/AvitoFooter";
import { Helmet } from "react-helmet-async";

const AppDownloadPage = () => {
  const handleDownloadRustore = () => {
    window.open("https://rustore.ru/catalog/app/com.example.avitoapp", "_blank");
  };

  const handleDownloadDirect = () => {
    window.open("https://example.com/avito-app.apk", "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Helmet>
        <title>Скачать приложение - TRIVO</title>
        <meta name="description" content="Скачайте мобильное приложение TRIVO для удобного поиска и размещения объявлений" />
      </Helmet>

      <AvitoHeader />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <div className="mx-auto mb-6 p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-fit">
              <Icon name="Smartphone" className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Мобильное приложение TRIVO
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Скачайте наше приложение и получите доступ ко всем возможностям 
              TRIVO прямо с вашего смартфона
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 bg-orange-100 rounded-full w-fit">
                  <Icon name="Store" className="w-8 h-8 text-orange-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">
                  Скачать из RuStore
                </CardTitle>
                <p className="text-gray-600 text-sm">
                  Официальный российский магазин приложений
                </p>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-center space-x-3">
                    <Icon name="Shield" className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-700">Безопасная загрузка</span>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <Icon name="RefreshCw" className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-gray-700">Автоматические обновления</span>
                  </div>
                </div>
                <Button
                  onClick={handleDownloadRustore}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 text-base"
                >
                  <Icon name="Download" className="w-5 h-5 mr-2" />
                  Скачать с RuStore
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
                  <Icon name="Download" className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">
                  Прямая загрузка
                </CardTitle>
                <p className="text-gray-600 text-sm">
                  Скачать APK-файл напрямую с нашего сервера
                </p>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-center space-x-3">
                    <Icon name="Zap" className="w-5 h-5 text-purple-600" />
                    <span className="text-sm text-gray-700">Быстрая загрузка</span>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <Icon name="FileDown" className="w-5 h-5 text-indigo-600" />
                    <span className="text-sm text-gray-700">APK-файл</span>
                  </div>
                </div>
                <Button
                  onClick={handleDownloadDirect}
                  variant="outline"
                  className="w-full border-blue-500 text-blue-600 hover:bg-blue-50 font-semibold py-3 text-base"
                >
                  <Icon name="FileDown" className="w-5 h-5 mr-2" />
                  Скачать APK
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-gray-900 flex items-center justify-center space-x-2">
                <Icon name="Star" className="w-6 h-6 text-yellow-500" />
                <span>Преимущества приложения</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-green-100 rounded-full">
                      <Icon name="Zap" className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Быстрый доступ</h3>
                      <p className="text-gray-600 text-sm">
                        Мгновенный доступ к объявлениям одним касанием
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Icon name="Bell" className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Push-уведомления</h3>
                      <p className="text-gray-600 text-sm">
                        Моментальные уведомления о новых сообщениях и предложениях
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-purple-100 rounded-full">
                      <Icon name="Camera" className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Удобные фото</h3>
                      <p className="text-gray-600 text-sm">
                        Быстрая загрузка фотографий прямо с камеры
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-indigo-100 rounded-full">
                      <Icon name="MapPin" className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Геолокация</h3>
                      <p className="text-gray-600 text-sm">
                        Поиск товаров рядом с вами с помощью GPS
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-pink-100 rounded-full">
                      <Icon name="Heart" className="w-5 h-5 text-pink-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Избранное</h3>
                      <p className="text-gray-600 text-sm">
                        Сохраняйте понравившиеся объявления в избранное
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-orange-100 rounded-full">
                      <Icon name="MessageCircle" className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Быстрые чаты</h3>
                      <p className="text-gray-600 text-sm">
                        Общайтесь с продавцами через встроенный мессенджер
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
            <CardContent className="text-center p-8">
              <Icon name="Smartphone" className="w-16 h-16 mx-auto mb-4 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Присоединяйтесь к миллионам пользователей
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Более 50 миллионов человек уже пользуются нашим приложением для 
                покупки и продажи товаров. Станьте частью нашего сообщества!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleDownloadRustore}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-8"
                >
                  <Icon name="Download" className="w-5 h-5 mr-2" />
                  Скачать приложение
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <AvitoFooter />
    </div>
  );
};

export default AppDownloadPage;