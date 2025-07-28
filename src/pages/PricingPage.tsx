import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AvitoHeader from "@/components/avitomarket/AvitoHeader";
import AvitoFooter from "@/components/avitomarket/AvitoFooter";
import Icon from "@/components/ui/icon";
import { Helmet } from "react-helmet-async";
import { usePageTitle } from "@/hooks/usePageTitle";

const PricingPage = () => {
  const navigate = useNavigate();
  const { getPageTitle, settings: systemSettings } = usePageTitle();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const pageTitle = systemSettings
    ? getPageTitle("pricingPageTitle", {})
    : "Тарифы - TRIVO";

  const plans = [
    {
      name: "Базовый",
      description: "Для начинающих продавцов",
      price: { monthly: 0, yearly: 0 },
      features: [
        "До 3 объявлений одновременно",
        "Стандартные фотографии (до 5 шт)",
        "Базовая поддержка",
        "Статистика просмотров",
        "Обычное размещение"
      ],
      recommended: false,
      color: "from-gray-500 to-gray-600"
    },
    {
      name: "Стандарт",
      description: "Оптимальный выбор",
      price: { monthly: 299, yearly: 2990 },
      features: [
        "До 15 объявлений одновременно",
        "HD фотографии (до 20 шт)",
        "Приоритетная поддержка",
        "Подробная аналитика",
        "Поднятие в поиске 1 раз в день",
        "Выделение объявлений цветом"
      ],
      recommended: true,
      color: "from-blue-500 to-purple-600"
    },
    {
      name: "Профи",
      description: "Для активных продавцов",
      price: { monthly: 599, yearly: 5990 },
      features: [
        "Неограниченное количество объявлений",
        "Профессиональные фотографии",
        "VIP поддержка 24/7",
        "Расширенная аналитика и отчеты",
        "Поднятие в поиске 3 раза в день",
        "Премиум размещение",
        "Персональный менеджер"
      ],
      recommended: false,
      color: "from-purple-500 to-pink-600"
    }
  ];

  const additionalServices = [
    {
      name: "Автоподнятие",
      price: 99,
      description: "Автоматическое поднятие объявлений каждые 4 часа",
      icon: "ArrowUp"
    },
    {
      name: "Премиум фото",
      price: 199,
      description: "Professional фотосъемка товаров на дому",
      icon: "Camera"
    },
    {
      name: "Турбо размещение",
      price: 49,
      description: "Размещение в топе результатов поиска на 24 часа",
      icon: "Zap"
    },
    {
      name: "Проверка товара",
      price: 299,
      description: "Официальная проверка и сертификация товара",
      icon: "Shield"
    }
  ];

  const getSavings = (plan: any) => {
    const yearlyPrice = plan.price.yearly;
    const monthlyYearPrice = plan.price.monthly * 12;
    return monthlyYearPrice - yearlyPrice;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content="Тарифы TRIVO - выберите подходящий план. Базовый, Стандарт и Профи тарифы с различными возможностями для продавцов." />
      </Helmet>

      <AvitoHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-8 md:py-16">
          <div className="text-center mb-12 md:mb-16">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="CreditCard" size={32} className="text-white" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              Тарифные планы
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Выберите тариф, который подходит для ваших потребностей в продажах
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex justify-center mb-12 md:mb-16">
            <div className="bg-white rounded-full p-2 shadow-lg border border-gray-100">
              <div className="flex">
                <button
                  onClick={() => setBillingPeriod('monthly')}
                  className={`px-6 py-2 rounded-full font-medium transition ${
                    billingPeriod === 'monthly'
                      ? 'bg-blue-600 text-white shadow'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  Ежемесячно
                </button>
                <button
                  onClick={() => setBillingPeriod('yearly')}
                  className={`px-6 py-2 rounded-full font-medium transition relative ${
                    billingPeriod === 'yearly'
                      ? 'bg-blue-600 text-white shadow'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  Ежегодно
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    -20%
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pb-8 md:pb-16">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {plans.map((plan, index) => (
              <div key={index} className={`bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-lg border-2 ${plan.recommended ? 'border-blue-500 transform scale-105' : 'border-gray-100'} relative`}>
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                      Рекомендуем
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 bg-gradient-to-br ${plan.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <Icon name={plan.name === 'Базовый' ? 'User' : plan.name === 'Стандарт' ? 'Users' : 'Crown'} size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {plan.description}
                  </p>
                  
                  <div className="mb-6">
                    <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                      {plan.price[billingPeriod] === 0 ? 'Бесплатно' : `₽${plan.price[billingPeriod]}`}
                    </div>
                    {plan.price[billingPeriod] > 0 && (
                      <div className="text-gray-600">
                        за {billingPeriod === 'monthly' ? 'месяц' : 'год'}
                        {billingPeriod === 'yearly' && (
                          <div className="text-green-600 text-sm font-medium">
                            Экономия ₽{getSavings(plan)} в год
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Icon name="Check" size={16} className="text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-600 text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => navigate('/register')}
                  className={`w-full py-3 px-6 rounded-full font-semibold transition ${
                    plan.recommended
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.price[billingPeriod] === 0 ? 'Начать бесплатно' : 'Выбрать тариф'}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Additional Services */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pb-8 md:pb-16">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Дополнительные услуги
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Усильте эффект от ваших объявлений
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {additionalServices.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg border border-gray-100">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={service.icon as any} size={32} className="text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                    {service.name}
                  </h3>
                  <div className="text-2xl font-bold text-orange-600 mb-3">
                    ₽{service.price}
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-6 text-center">
                  {service.description}
                </p>

                <button className="w-full py-2 px-4 bg-orange-100 text-orange-700 rounded-full font-medium hover:bg-orange-200 transition">
                  Подключить
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pb-8 md:pb-16">
          <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-12 shadow-lg border border-gray-100">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Часто задаваемые вопросы
              </h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Можно ли изменить тариф в любое время?
                </h3>
                <p className="text-gray-600">
                  Да, вы можете повысить или понизить тариф в любое время. При повышении доплачиваете разницу, при понижении остаток переносится на следующий период.
                </p>
              </div>

              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Есть ли скидки для долгосрочных планов?
                </h3>
                <p className="text-gray-600">
                  Да, при выборе годовой оплаты вы получаете скидку 20% от стоимости месячных платежей.
                </p>
              </div>

              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Что происходит с объявлениями при окончании тарифа?
                </h3>
                <p className="text-gray-600">
                  Ваши объявления остаются активными, но теряют премиум-функции. Вы можете продлить тариф или перейти на базовый план.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pb-8 md:pb-16">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl md:rounded-3xl p-8 md:p-12 text-center text-white">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="Rocket" size={32} className="text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Начните продавать эффективнее
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Выберите подходящий тариф и увеличьте продажи уже сегодня
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/register')}
                className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-full shadow hover:bg-blue-50 transition"
              >
                Начать бесплатно
              </button>
              <button
                onClick={() => navigate('/contacts')}
                className="bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-blue-600 transition"
              >
                Связаться с нами
              </button>
            </div>
          </div>
        </section>
      </main>

      <AvitoFooter />
    </div>
  );
};

export default PricingPage;