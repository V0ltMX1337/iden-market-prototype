import { useNavigate } from "react-router-dom";
import AvitoHeader from "@/components/avitomarket/AvitoHeader";
import AvitoFooter from "@/components/avitomarket/AvitoFooter";
import Icon from "@/components/ui/icon";
import { Helmet } from "react-helmet-async";
import { usePageTitle } from "@/hooks/usePageTitle";

const AboutPage = () => {
  const navigate = useNavigate();

  const pageTitle = "О нас - TRIVO";

  const stats = [
    { icon: "Users", label: "Активных пользователей", value: "19+" },
    { icon: "Package", label: "Объявлений размещено", value: "15+" },
    { icon: "ShoppingBag", label: "Успешных сделок", value: "..." },
    { icon: "Star", label: "Средний рейтинг", value: "4.8/5" },
  ];

  const values = [
    {
      icon: "Shield",
      title: "Безопасность",
      description: "Проверенные пользователи, безопасные сделки и защита от мошенничества"
    },
    {
      icon: "Clock",
      title: "Скорость",
      description: "Быстрый поиск нужных товаров и мгновенная связь с продавцами"
    },
    {
      icon: "Heart",
      title: "Доверие",
      description: "Честные отзывы, прозрачные рейтинги и открытая система оценок"
    },
    {
      icon: "Zap",
      title: "Удобство",
      description: "Интуитивный интерфейс и простота использования на всех устройствах"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content="О компании TRIVO - ведущей платформе объявлений. Наша миссия, ценности и достижения." />
      </Helmet>

      <AvitoHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-8 md:py-16">
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              О нас
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              TRIVO — это современная платформа объявлений, которая объединяет миллионы людей 
              для покупки и продажи товаров по всей России
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pb-8 md:pb-16">
          <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-12 shadow-lg border border-gray-100">
            <div className="text-center mb-8 md:mb-12">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="Target" size={32} className="text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Наша миссия
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Мы создаем экосистему доверия, где каждый может легко найти нужные товары или продать ненужные вещи. 
                Наша цель — сделать процесс покупки и продажи максимально простым, безопасным и выгодным для всех участников.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pb-8 md:pb-16">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              TRIVO в цифрах
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-lg border border-gray-100 text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={stat.icon as any} size={24} className="text-white md:w-8 md:h-8" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Values Section */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pb-8 md:pb-16">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Наши ценности
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Принципы, которыми мы руководствуемся в работе
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg border border-gray-100">
                <div className="flex items-start gap-4 md:gap-6">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name={value.icon as any} size={24} className="text-white md:w-8 md:h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pb-8 md:pb-16">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl md:rounded-3xl p-8 md:p-12 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Присоединяйтесь к TRIVO
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Начните покупать и продавать уже сегодня
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/register')}
                className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-full shadow hover:bg-blue-50 transition"
              >
                Зарегистрироваться
              </button>
              <button
                onClick={() => navigate('/')}
                className="bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-blue-600 transition"
              >
                Посмотреть объявления
              </button>
            </div>
          </div>
        </section>
      </main>

      <AvitoFooter />
    </div>
  );
};

export default AboutPage;