import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

const SitemapPage = () => {
  const navigate = useNavigate();

  const siteStructure = [
    {
      title: "Главная страница",
      path: "/",
      icon: "Home",
      color: "blue",
      description: "Поиск товаров и услуг"
    },
    {
      title: "Каталог",
      path: "/",
      icon: "Grid3X3",
      color: "green",
      description: "Все объявления по категориям"
    },
    {
      title: "Личный кабинет",
      icon: "User",
      color: "purple",
      description: "Управление профилем и объявлениями",
      children: [
        { title: "Профиль", path: "/profile", icon: "UserCircle" },
        { title: "Мои объявления", path: "/profile/ads", icon: "Package" },
        { title: "Сообщения", path: "/profile/messages", icon: "MessageCircle" },
        { title: "Настройки", path: "/profile/settings", icon: "Settings" },
        { title: "Избранное", path: "/profile/favorites", icon: "Heart" }
      ]
    },
    {
      title: "Размещение объявлений",
      icon: "Plus",
      color: "orange",
      description: "Продажа товаров и услуг",
      children: [
        { title: "Разместить объявление", path: "/sell", icon: "PlusCircle" },
        { title: "Редактировать объявление", path: "/edit-ad/:id", icon: "Edit" }
      ]
    },
    {
      title: "Аутентификация",
      icon: "Key",
      color: "indigo",
      description: "Вход и регистрация",
      children: [
        { title: "Вход", path: "/login", icon: "LogIn" },
        { title: "Регистрация", path: "/register", icon: "UserPlus" },
        { title: "Восстановление пароля", path: "/reset-password", icon: "RefreshCw" }
      ]
    },
    {
      title: "Информационные страницы",
      icon: "FileText",
      color: "gray",
      description: "Документы и справочная информация",
      children: [
        { title: "О нас", path: "/about", icon: "Info" },
        { title: "Контакты", path: "/contacts", icon: "Phone" },
        { title: "Политика конфиденциальности", path: "/privacy-policy", icon: "Shield" },
        { title: "Условия использования", path: "/terms", icon: "FileCheck" },
        { title: "Как покупать", path: "/how-to-buy", icon: "ShoppingCart" },
        { title: "Карта сайта", path: "/sitemap", icon: "Map" }
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: "bg-blue-50 border-blue-200 text-blue-600",
      green: "bg-green-50 border-green-200 text-green-600",
      purple: "bg-purple-50 border-purple-200 text-purple-600",
      orange: "bg-orange-50 border-orange-200 text-orange-600",
      indigo: "bg-indigo-50 border-indigo-200 text-indigo-600",
      gray: "bg-gray-50 border-gray-200 text-gray-600"
    };
    return colors[color] || colors.gray;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Карта сайта
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Полная структура нашего сайта для удобной навигации
          </p>
        </div>

        {/* Quick Navigation */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <Icon name="Zap" className="w-6 h-6 text-yellow-600" />
              <span>Быстрая навигация</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/")}
                className="justify-start"
              >
                <Icon name="Home" className="w-4 h-4 mr-2" />
                Главная
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/")}
                className="justify-start"
              >
                <Icon name="Grid3X3" className="w-4 h-4 mr-2" />
                Каталог
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/profile/sell")}
                className="justify-start"
              >
                <Icon name="Plus" className="w-4 h-4 mr-2" />
                Продать
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/profile")}
                className="justify-start"
              >
                <Icon name="User" className="w-4 h-4 mr-2" />
                Профиль
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/about")}
                className="justify-start"
              >
                <Icon name="Info" className="w-4 h-4 mr-2" />
                О нас
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/contacts")}
                className="justify-start"
              >
                <Icon name="Phone" className="w-4 h-4 mr-2" />
                Контакты
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Site Structure */}
        <div className="space-y-8">
          {siteStructure.map((section, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getColorClasses(section.color)}`}>
                    <Icon name={section.icon as any} className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xl">{section.title}</span>
                    {section.path && (
                      <p className="text-sm text-gray-500 font-normal mt-1">
                        {section.path}
                      </p>
                    )}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{section.description}</p>
                
                {section.children && (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {section.children.map((child, childIndex) => (
                      <div
                        key={childIndex}
                        onClick={() => child.path && navigate(child.path)}
                        className={`p-3 rounded-lg border transition-colors ${
                          child.path 
                            ? 'cursor-pointer hover:bg-gray-50 border-gray-200' 
                            : 'border-gray-100'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon 
                            name={child.icon as any} 
                            className="w-4 h-4 text-gray-500" 
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 text-sm">
                              {child.title}
                            </h4>
                            {child.path && (
                              <p className="text-xs text-gray-500 mt-1">
                                {child.path}
                              </p>
                            )}
                          </div>
                          {child.path && (
                            <Icon 
                              name="ExternalLink" 
                              className="w-3 h-3 text-gray-400" 
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {section.path && !section.children && (
                  <Button
                    variant="outline"
                    onClick={() => navigate(section.path)}
                    className="mt-4"
                  >
                    <Icon name="ExternalLink" className="w-4 h-4 mr-2" />
                    Перейти к {section.title.toLowerCase()}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Statistics */}
        <Card className="border-0 shadow-lg mt-12">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <Icon name="BarChart" className="w-6 h-6 text-blue-600" />
              <span>Статистика сайта</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-2xl font-bold text-blue-600 mb-1">25+</div>
                <div className="text-sm text-blue-800">Страниц</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="text-2xl font-bold text-green-600 mb-1">6</div>
                <div className="text-sm text-green-800">Основных разделов</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="text-2xl font-bold text-purple-600 mb-1">15+</div>
                <div className="text-sm text-purple-800">Функций</div>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="text-2xl font-bold text-orange-600 mb-1">50%</div>
                <div className="text-sm text-orange-800">Мобильная адаптация</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card className="border-0 shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <Icon name="HelpCircle" className="w-6 h-6 text-green-600" />
              <span>Нужна помощь?</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <Icon name="MessageCircle" className="w-6 h-6 text-green-600 mb-3" />
                <h4 className="font-semibold text-green-900 mb-2">Не можете найти нужную страницу?</h4>
                <p className="text-green-800 text-sm mb-3">
                  Воспользуйтесь поиском на сайте или обратитесь в службу поддержки
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/contacts")}
                  className="border-green-300 text-green-700 hover:bg-green-100"
                >
                  Связаться с нами
                </Button>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <Icon name="Book" className="w-6 h-6 text-blue-600 mb-3" />
                <h4 className="font-semibold text-blue-900 mb-2">Нужна инструкция?</h4>
                <p className="text-blue-800 text-sm mb-3">
                  Узнайте, как пользоваться нашим сервисом максимально эффективно
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/how-to-buy")}
                  className="border-blue-300 text-blue-700 hover:bg-blue-100"
                >
                  Как покупать
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SitemapPage;