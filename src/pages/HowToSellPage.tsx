import { useNavigate } from "react-router-dom";
import AvitoHeader from "@/components/avitomarket/AvitoHeader";
import AvitoFooter from "@/components/avitomarket/AvitoFooter";
import Icon from "@/components/ui/icon";
import { Helmet } from "react-helmet-async";
import { usePageTitle } from "@/hooks/usePageTitle";

const HowToSellPage = () => {
  const navigate = useNavigate();
  const { getPageTitle, settings: systemSettings } = usePageTitle();

  const pageTitle = systemSettings
    ? getPageTitle("howToSellPageTitle", {})
    : "Как продавать - TRIVO";

  const steps = [
    {
      number: 1,
      title: "Зарегистрируйтесь",
      description: "Создайте аккаунт на TRIVO и заполните профиль для повышения доверия покупателей",
      icon: "UserPlus",
      tips: [
        "Используйте реальные данные для регистрации",
        "Добавьте фотографию профиля",
        "Укажите номер телефона для верификации",
        "Заполните описание о себе"
      ]
    },
    {
      number: 2,
      title: "Подготовьте товар",
      description: "Приведите товар в порядок и подготовьте качественные фотографии",
      icon: "Camera",
      tips: [
        "Очистите товар перед съемкой",
        "Сфотографируйте со всех сторон",
        "Используйте хорошее освещение",
        "Покажите все дефекты и особенности"
      ]
    },
    {
      number: 3,
      title: "Создайте объявление",
      description: "Напишите подробное описание товара с честной информацией о состоянии",
      icon: "Edit",
      tips: [
        "Используйте четкий и понятный заголовок",
        "Опишите все характеристики товара",
        "Укажите причину продажи",
        "Добавьте ключевые слова для поиска"
      ]
    },
    {
      number: 4,
      title: "Установите цену",
      description: "Исследуйте рынок и установите конкурентоспособную цену за ваш товар",
      icon: "DollarSign",
      tips: [
        "Изучите цены на аналогичные товары",
        "Учитывайте состояние вашего товара",
        "Оставьте место для торга",
        "Будьте готовы к переговорам"
      ]
    },
    {
      number: 5,
      title: "Общайтесь с покупателями",
      description: "Отвечайте на вопросы быстро и честно, договаривайтесь о встрече",
      icon: "MessageCircle",
      tips: [
        "Отвечайте на сообщения в течение часа",
        "Будьте вежливы и терпеливы",
        "Предлагайте удобное время встречи",
        "Подтверждайте встречу заранее"
      ]
    },
    {
      number: 6,
      title: "Совершите продажу",
      description: "Встретьтесь с покупателем, покажите товар и завершите сделку",
      icon: "HandHeart",
      tips: [
        "Встречайтесь в безопасных местах",
        "Возьмите с собой документы на товар",
        "Проверьте деньги перед передачей товара",
        "Дайте гарантийный срок если возможно"
      ]
    }
  ];

  const successTips = [
    {
      icon: "Star",
      title: "Качество объявления",
      description: "Хорошие фото и описание увеличивают продажи на 300%"
    },
    {
      icon: "Clock",
      title: "Быстрый ответ",
      description: "Продавцы, отвечающие в течение часа, продают в 2 раза быстрее"
    },
    {
      icon: "TrendingUp",
      title: "Правильная цена",
      description: "Товары по рыночной цене продаются в среднем за 3 дня"
    },
    {
      icon: "Shield",
      title: "Честность",
      description: "Честные продавцы получают больше положительных отзывов"
    }
  ];

  const categories = [
    "Автомобили",
    "Недвижимость", 
    "Электроника",
    "Одежда и обувь",
    "Дом и сад",
    "Спорт и отдых"
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content="Как продавать на TRIVO - полное руководство. Советы по созданию объявлений, фотографиям и успешным продажам." />
      </Helmet>

      <AvitoHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-8 md:py-16">
          <div className="text-center mb-12 md:mb-16">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="TrendingUp" size={32} className="text-white" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              Как продавать на TRIVO
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Полное руководство для успешных продаж. От создания объявления до завершения сделки
            </p>
          </div>
        </section>

        {/* Steps Section */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pb-8 md:pb-16">
          <div className="space-y-8 md:space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-lg border border-gray-100">
                <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                  <div className="flex items-center gap-4 md:gap-6 md:flex-col md:items-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl md:text-2xl flex-shrink-0">
                      {step.number}
                    </div>
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center md:mt-4">
                      <Icon name={step.icon as any} size={24} className="text-green-600 md:w-8 md:h-8" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                      {step.title}
                    </h2>
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                      {step.description}
                    </p>
                    
                    <div className="bg-green-50 rounded-xl p-4 md:p-6">
                      <h3 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                        <Icon name="Lightbulb" size={16} />
                        Полезные советы:
                      </h3>
                      <ul className="space-y-2">
                        {step.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="flex items-start gap-2 text-green-800">
                            <Icon name="Check" size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Success Tips */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pb-8 md:pb-16">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Секреты успешных продаж
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Статистика и советы от лучших продавцов TRIVO
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {successTips.map((tip, index) => (
              <div key={index} className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg border border-gray-100 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name={tip.icon as any} size={32} className="text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                  {tip.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {tip.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pb-8 md:pb-16">
          <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-12 shadow-lg border border-gray-100">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Популярные категории для продажи
              </h2>
              <p className="text-lg text-gray-600">
                Выберите подходящую категорию для вашего товара
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {categories.map((category, index) => (
                <div
                  key={index}
                  onClick={() => navigate(`/category/${category.toLowerCase()}`)}
                  className="p-4 md:p-6 bg-gray-50 rounded-xl hover:bg-green-50 hover:border-green-200 border border-transparent cursor-pointer transition group text-center"
                >
                  <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition">
                    {category}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pb-8 md:pb-16">
          <div className="bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl md:rounded-3xl p-8 md:p-12 text-center text-white">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="Plus" size={32} className="text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Готовы начать продавать?
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Разместите первое объявление и начните зарабатывать уже сегодня
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/register')}
                className="bg-white text-green-600 font-semibold px-8 py-3 rounded-full shadow hover:bg-green-50 transition"
              >
                Разместить объявление
              </button>
              <button
                onClick={() => navigate('/pricing')}
                className="bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-green-600 transition"
              >
                Посмотреть тарифы
              </button>
            </div>
          </div>
        </section>
      </main>

      <AvitoFooter />
    </div>
  );
};

export default HowToSellPage;