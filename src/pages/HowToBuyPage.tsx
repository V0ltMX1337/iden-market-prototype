import { useNavigate } from "react-router-dom";
import AvitoHeader from "@/components/avitomarket/AvitoHeader";
import AvitoFooter from "@/components/avitomarket/AvitoFooter";
import Icon from "@/components/ui/icon";
import { Helmet } from "react-helmet-async";
import { usePageTitle } from "@/hooks/usePageTitle";

const HowToBuyPage = () => {
  const navigate = useNavigate();

  const pageTitle = "Как покупать - TRIVO";

  const steps = [
    {
      number: 1,
      title: "Найдите товар",
      description: "Используйте поиск или просматривайте категории для поиска нужного товара",
      icon: "Search",
      tips: [
        "Используйте фильтры для уточнения поиска",
        "Сохраняйте понравившиеся объявления в избранное",
        "Подписывайтесь на уведомления о новых товарах"
      ]
    },
    {
      number: 2,
      title: "Изучите объявление",
      description: "Внимательно прочитайте описание, посмотрите фотографии и проверьте цену",
      icon: "Eye",
      tips: [
        "Обращайте внимание на состояние товара",
        "Проверяйте рейтинг и отзывы продавца",
        "Уточняйте все важные детали до встречи"
      ]
    },
    {
      number: 3,
      title: "Свяжитесь с продавцом",
      description: "Напишите продавцу или позвоните, чтобы уточнить детали и договориться о встрече",
      icon: "MessageCircle",
      tips: [
        "Задавайте конкретные вопросы о товаре",
        "Договаривайтесь о встрече в людном месте",
        "Уточните время работы и способы связи"
      ]
    },
    {
      number: 4,
      title: "Встретьтесь и проверьте",
      description: "Встретьтесь с продавцом, внимательно осмотрите товар перед покупкой",
      icon: "CheckCircle",
      tips: [
        "Проверьте товар на работоспособность",
        "Сверьте товар с описанием и фотографиями",
        "При необходимости торгуйтесь"
      ]
    },
    {
      number: 5,
      title: "Совершите покупку",
      description: "Если товар вас устраивает, произведите оплату и заберите покупку",
      icon: "CreditCard",
      tips: [
        "Расплачивайтесь только после проверки товара",
        "Требуйте чек или расписку при крупных покупках",
        "Сохраняйте контакты продавца"
      ]
    }
  ];

  const safetyTips = [
    {
      icon: "Shield",
      title: "Безопасность",
      tips: [
        "Встречайтесь только в людных местах",
        "Берите с собой друга на важные покупки",
        "Не передавайте деньги заранее",
        "Доверяйте своей интуиции"
      ]
    },
    {
      icon: "AlertTriangle",
      title: "Осторожно",
      tips: [
        "Подозрительно низкие цены могут быть обманом",
        "Проверяйте документы на дорогие товары",
        "Не покупайте товары сомнительного происхождения",
        "Остерегайтесь предоплат и переводов"
      ]
    },
    {
      icon: "Phone",
      title: "Связь",
      tips: [
        "Сохраняйте всю переписку с продавцом",
        "Звоните перед встречей для подтверждения",
        "Используйте встроенный чат TRIVO",
        "Сообщайте близким о месте встречи"
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content="Как покупать на TRIVO - пошаговое руководство. Советы по безопасным покупкам и проверке товаров." />
      </Helmet>

      <AvitoHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-8 md:py-16">
          <div className="text-center mb-12 md:mb-16">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="ShoppingBag" size={32} className="text-white" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              Как покупать на TRIVO
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Пошаговое руководство для безопасных и выгодных покупок на нашей платформе
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
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl md:text-2xl flex-shrink-0">
                      {step.number}
                    </div>
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center md:mt-4">
                      <Icon name={step.icon as any} size={24} className="text-blue-600 md:w-8 md:h-8" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                      {step.title}
                    </h2>
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                      {step.description}
                    </p>
                    
                    <div className="bg-blue-50 rounded-xl p-4 md:p-6">
                      <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                        <Icon name="Lightbulb" size={16} />
                        Полезные советы:
                      </h3>
                      <ul className="space-y-2">
                        {step.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="flex items-start gap-2 text-blue-800">
                            <Icon name="Check" size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
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

        {/* Safety Section */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pb-8 md:pb-16">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Советы по безопасности
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Следуйте этим рекомендациям для безопасных покупок
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {safetyTips.map((section, index) => (
              <div key={index} className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg border border-gray-100">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={section.icon as any} size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {section.title}
                  </h3>
                </div>
                
                <ul className="space-y-3">
                  {section.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start gap-3">
                      <Icon name="AlertCircle" size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600 leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pb-8 md:pb-16">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl md:rounded-3xl p-8 md:p-12 text-center text-white">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="ShoppingCart" size={32} className="text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Готовы начать покупки?
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Найдите нужный товар среди тысяч объявлений на TRIVO
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/')}
                className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-full shadow hover:bg-blue-50 transition"
              >
                Начать покупки
              </button>
              <button
                onClick={() => navigate('/how-to-sell')}
                className="bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-blue-600 transition"
              >
                Как продавать
              </button>
            </div>
          </div>
        </section>
      </main>

      <AvitoFooter />
    </div>
  );
};

export default HowToBuyPage;