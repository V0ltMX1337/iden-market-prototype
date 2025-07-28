import { useNavigate } from "react-router-dom";
import AvitoHeader from "@/components/avitomarket/AvitoHeader";
import AvitoFooter from "@/components/avitomarket/AvitoFooter";
import Icon from "@/components/ui/icon";
import { Helmet } from "react-helmet-async";
import { usePageTitle } from "@/hooks/usePageTitle";

const SitemapPage = () => {
  const navigate = useNavigate();
  const { getPageTitle, settings: systemSettings } = usePageTitle();

  const pageTitle = systemSettings
    ? getPageTitle("sitemapPageTitle", {})
    : "Карта сайта - TRIVO";

  const siteMap = [
    {
      title: "Главные страницы",
      icon: "Home",
      links: [
        { name: "Главная", url: "/", description: "Основная страница с объявлениями" },
        { name: "Категории", url: "/categories", description: "Все категории товаров" },
        { name: "Поиск", url: "/search", description: "Расширенный поиск товаров" }
      ]
    },
    {
      title: "Пользователь",
      icon: "User",
      links: [
        { name: "Регистрация", url: "/register", description: "Создание нового аккаунта" },
        { name: "Вход", url: "/login", description: "Авторизация пользователя" },
        { name: "Профиль", url: "/profile", description: "Личный профиль пользователя" },
        { name: "Мои объявления", url: "/my-ads", description: "Управление объявлениями" }
      ]
    },
    {
      title: "Информация",
      icon: "Info",
      links: [
        { name: "О нас", url: "/about", description: "О компании TRIVO" },
        { name: "Контакты", url: "/contacts", description: "Связаться с нами" },
        { name: "Как купить", url: "/how-to-buy", description: "Руководство по покупке" },
        { name: "Как продавать", url: "/how-to-sell", description: "Руководство по продаже" }
      ]
    },
    {
      title: "Документы",
      icon: "FileText",
      links: [
        { name: "Условия использования", url: "/terms", description: "Правила пользования сайтом" },
        { name: "Политика конфиденциальности", url: "/privacy-policy", description: "Обработка персональных данных" }
      ]
    },
    {
      title: "Услуги",
      icon: "Settings",
      links: [
        { name: "Тарифы", url: "/pricing", description: "Тарифные планы и цены" },
        { name: "Реклама на TRIVO", url: "/advertising", description: "Рекламные возможности" },
        { name: "Помощь", url: "/help", description: "Центр помощи и FAQ" }
      ]
    }
  ];

  const handleLinkClick = (url: string) => {
    navigate(url);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content="Карта сайта TRIVO. Полная структура навигации по всем разделам и страницам платформы." />
      </Helmet>

      <AvitoHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-8 md:py-16">
          <div className="text-center mb-12 md:mb-16">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="Map" size={32} className="text-white" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              Карта сайта
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Все разделы и страницы TRIVO в удобной структуре для быстрой навигации
            </p>
          </div>
        </section>

        {/* Search Section */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pb-8">
          <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              <Icon name="Search" size={24} className="text-blue-600" />
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                Быстрый поиск страницы
              </h2>
            </div>
            <p className="text-gray-600 mb-6">
              Воспользуйтесь поиском браузера (Ctrl+F / Cmd+F) для быстрого поиска нужной страницы
            </p>
          </div>
        </section>

        {/* Sitemap Sections */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pb-8 md:pb-16">
          <div className="grid gap-6 md:gap-8">
            {siteMap.map((section, index) => (
              <div key={index} className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-lg border border-gray-100">
                <div className="flex items-center gap-4 mb-6 md:mb-8">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Icon name={section.icon as any} size={24} className="text-white md:w-8 md:h-8" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                    {section.title}
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                  {section.links.map((link, linkIndex) => (
                    <div
                      key={linkIndex}
                      onClick={() => handleLinkClick(link.url)}
                      className="p-4 md:p-6 bg-gray-50 rounded-xl hover:bg-blue-50 hover:border-blue-200 border border-transparent cursor-pointer transition group"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition">
                              {link.name}
                            </h3>
                            <Icon name="ExternalLink" size={16} className="text-gray-400 group-hover:text-blue-600 transition" />
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {link.description}
                          </p>
                          <div className="text-xs text-blue-600 font-medium mt-2 opacity-70">
                            {link.url}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Statistics */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pb-8 md:pb-16">
          <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-lg border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Статистика сайта
              </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">25+</div>
                <div className="text-sm text-gray-600">Страниц сайта</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-purple-600 mb-2">50+</div>
                <div className="text-sm text-gray-600">Категорий товаров</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-green-600 mb-2">100+</div>
                <div className="text-sm text-gray-600">Функций сервиса</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-orange-600 mb-2">24/7</div>
                <div className="text-sm text-gray-600">Работа поддержки</div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pb-8 md:pb-16">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl md:rounded-3xl p-8 md:p-12 text-center text-white">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="Navigation" size={32} className="text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Не нашли нужную страницу?
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Свяжитесь с нами, и мы поможем найти то, что вы ищете
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/contacts')}
                className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-full shadow hover:bg-blue-50 transition"
              >
                Связаться с нами
              </button>
              <button
                onClick={() => navigate('/help')}
                className="bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-blue-600 transition"
              >
                Центр помощи
              </button>
            </div>
          </div>
        </section>
      </main>

      <AvitoFooter />
    </div>
  );
};

export default SitemapPage;