import { useNavigate } from "react-router-dom";
import AvitoHeader from "@/components/avitomarket/AvitoHeader";
import AvitoFooter from "@/components/avitomarket/AvitoFooter";
import Icon from "@/components/ui/icon";
import { Helmet } from "react-helmet-async";
import { usePageTitle } from "@/hooks/usePageTitle";

const AdvertisingPage = () => {
  const navigate = useNavigate();

  const pageTitle = "Реклама на TRIVO";

  const advantages = [
    {
      icon: "Users",
      title: "Миллионы пользователей",
      description: "Более 50 млн активных пользователей ежемесячно",
      stat: "50M+"
    },
    {
      icon: "Target",
      title: "Точное таргетирование",
      description: "Показывайте рекламу только целевой аудитории",
      stat: "97%"
    },
    {
      icon: "TrendingUp",
      title: "Высокая конверсия",
      description: "Средняя конверсия рекламных кампаний",
      stat: "12%"
    },
    {
      icon: "Clock",
      title: "Быстрый запуск",
      description: "Запуск кампании за 15 минут",
      stat: "15 мин"
    }
  ];

  const adFormats = [
    {
      name: "Баннеры на главной",
      description: "Размещение рекламных баннеров на главной странице сайта",
      price: "от ₽50,000/месяц",
      reach: "До 10M показов",
      icon: "Monitor",
      features: [
        "Премиум размещение",
        "Высокая видимость",
        "Гарантированные показы",
        "Подробная аналитика"
      ]
    },
    {
      name: "Продвижение в поиске",
      description: "Ваши объявления появляются в топе результатов поиска",
      price: "от ₽5/клик",
      reach: "По ключевым словам",
      icon: "Search",
      features: [
        "Оплата за результат",
        "Гибкое таргетирование",
        "Контроль бюджета",
        "A/B тестирование"
      ]
    },
    {
      name: "Нативная реклама",
      description: "Интеграция рекламы в ленту объявлений",
      price: "от ₽20,000/месяц",
      reach: "До 5M показов",
      icon: "Layers",
      features: [
        "Естественная интеграция",
        "Высокий CTR",
        "Мобильная оптимизация",
        "Региональное таргетирование"
      ]
    },
    {
      name: "Email рассылки",
      description: "Рассылка рекламных сообщений подписчикам",
      price: "от ₽15,000/рассылка",
      reach: "До 2M подписчиков",
      icon: "Mail",
      features: [
        "Сегментированная база",
        "Персонализация",
        "Высокая доставляемость",
        "Детальная отчетность"
      ]
    }
  ];

  const industries = [
    { name: "Автомобили", icon: "Car", color: "bg-blue-500" },
    { name: "Недвижимость", icon: "Home", color: "bg-green-500" },
    { name: "Электроника", icon: "Smartphone", color: "bg-purple-500" },
    { name: "Мода", icon: "Shirt", color: "bg-pink-500" },
    { name: "Услуги", icon: "Settings", color: "bg-orange-500" },
    { name: "Работа", icon: "Briefcase", color: "bg-indigo-500" }
  ];

  const steps = [
    {
      number: 1,
      title: "Заявка",
      description: "Оставьте заявку на размещение рекламы"
    },
    {
      number: 2,
      title: "Консультация",
      description: "Наш менеджер свяжется с вами в течение часа"
    },
    {
      number: 3,
      title: "Стратегия",
      description: "Разработаем оптимальную рекламную стратегию"
    },
    {
      number: 4,
      title: "Запуск",
      description: "Запустим кампанию и начнем отслеживать результаты"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content="Реклама на TRIVO - эффективное продвижение для вашего бизнеса. Баннеры, поисковая реклама, нативная реклама и email рассылки." />
      </Helmet>

      <AvitoHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-8 md:py-16">
          <div className="text-center mb-12 md:mb-16">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="Megaphone" size={32} className="text-white" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              Реклама на TRIVO
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Эффективное продвижение вашего бизнеса на крупнейшей платформе объявлений России
            </p>
          </div>
        </section>

        {/* Advantages */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pb-8 md:pb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {advantages.map((advantage, index) => (
              <div key={index} className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg border border-gray-100 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name={advantage.icon as any} size={32} className="text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">
                  {advantage.stat}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                  {advantage.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {advantage.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Ad Formats */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pb-8 md:pb-16">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Рекламные форматы
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Выберите оптимальный формат для достижения ваших целей
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {adFormats.map((format, index) => (
              <div key={index} className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-lg border border-gray-100">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name={format.icon as any} size={32} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                      {format.name}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {format.description}
                    </p>
                    
                    <div className="flex items-center gap-6 mb-6">
                      <div>
                        <div className="text-lg font-bold text-orange-600">{format.price}</div>
                        <div className="text-sm text-gray-500">Стоимость</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-blue-600">{format.reach}</div>
                        <div className="text-sm text-gray-500">Охват</div>
                      </div>
                    </div>

                    <ul className="space-y-2 mb-6">
                      {format.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2">
                          <Icon name="Check" size={16} className="text-green-600 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button className="w-full py-3 px-6 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full hover:shadow-lg transform hover:scale-105 transition">
                      Заказать
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Industries */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pb-8 md:pb-16">
          <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-12 shadow-lg border border-gray-100">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Популярные категории для рекламы
              </h2>
              <p className="text-lg text-gray-600">
                Мы работаем с брендами во всех сферах
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
              {industries.map((industry, index) => (
                <div key={index} className="text-center p-4 md:p-6 bg-gray-50 rounded-xl hover:bg-orange-50 hover:border-orange-200 border border-transparent cursor-pointer transition group">
                  <div className={`w-12 h-12 md:w-16 md:h-16 ${industry.color} rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition`}>
                    <Icon name={industry.icon as any} size={24} className="text-white md:w-8 md:h-8" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm group-hover:text-orange-600 transition">
                    {industry.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pb-8 md:pb-16">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Как начать рекламировать
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Простой процесс запуска рекламной кампании
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 md:gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl md:text-2xl">
                  {step.number}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Statistics */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pb-8 md:pb-16">
          <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-12 shadow-lg border border-gray-100">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                TRIVO в цифрах
              </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">50M+</div>
                <div className="text-gray-600">Активных пользователей</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">200K+</div>
                <div className="text-gray-600">Объявлений в день</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">85%</div>
                <div className="text-gray-600">Мобильный трафик</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">2.5B</div>
                <div className="text-gray-600">Просмотров в месяц</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pb-8 md:pb-16">
          <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl md:rounded-3xl p-8 md:p-12 text-center text-white">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="Rocket" size={32} className="text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Готовы начать рекламную кампанию?
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Получите персональную консультацию и расчет стоимости
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/contacts')}
                className="bg-white text-orange-600 font-semibold px-8 py-3 rounded-full shadow hover:bg-orange-50 transition"
              >
                Получить консультацию
              </button>
              <a
                href="mailto:advertising@trivo.ru"
                className="bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-orange-600 transition"
              >
                advertising@trivo.ru
              </a>
            </div>
          </div>
        </section>
      </main>

      <AvitoFooter />
    </div>
  );
};

export default AdvertisingPage;