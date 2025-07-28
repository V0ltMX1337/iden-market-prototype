import { useNavigate } from "react-router-dom";
import AvitoHeader from "@/components/avitomarket/AvitoHeader";
import AvitoFooter from "@/components/avitomarket/AvitoFooter";
import Icon from "@/components/ui/icon";
import { Helmet } from "react-helmet-async";

const UnderDevelopmentPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: 'Smartphone',
      title: 'Мобильное приложение',
      description: 'Нативные приложения для iOS и Android',
      status: 'В разработке'
    },
    {
      icon: 'MessageSquare',
      title: 'Улучшенный чат',
      description: 'Групповые чаты и файлообмен',
      status: 'Скоро'
    },
    {
      icon: 'CreditCard',
      title: 'Безопасные платежи',
      description: 'Эскроу-сервис для защищенных сделок',
      status: 'В разработке'
    },
    {
      icon: 'Truck',
      title: 'Служба доставки',
      description: 'Интегрированная логистика по всей России',
      status: 'Планируется'
    },
    {
      icon: 'Bot',
      title: 'ИИ-помощник',
      description: 'Умные рекомендации и автозаполнение',
      status: 'В тестировании'
    },
    {
      icon: 'Globe',
      title: 'Международная версия',
      description: 'Расширение на страны СНГ',
      status: 'Планируется'
    }
  ];

  const stats = [
    { label: 'Функций в разработке', value: '25+' },
    { label: 'Разработчиков в команде', value: '50+' },
    { label: 'Обновлений в месяц', value: '15+' },
    { label: 'Пользователей в бета-тесте', value: '10K+' }
  ];

  const timeline = [
    {
      quarter: 'Q1 2024',
      title: 'Мобильные приложения',
      description: 'Запуск приложений для iOS и Android',
      status: 'in-progress'
    },
    {
      quarter: 'Q2 2024',
      title: 'Безопасные платежи',
      description: 'Интеграция эскроу-сервиса',
      status: 'planned'
    },
    {
      quarter: 'Q3 2024',
      title: 'ИИ-рекомендации',
      description: 'Персонализированные предложения',
      status: 'planned'
    },
    {
      quarter: 'Q4 2024',
      title: 'Служба доставки',
      description: 'Собственная логистическая сеть',
      status: 'planned'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Helmet>
        <title>В разработке - TRIVO</title>
        <meta name="description" content="Новые функции TRIVO в разработке. Мобильные приложения, безопасные платежи, ИИ-помощник и многое другое." />
      </Helmet>

      <AvitoHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-8 md:py-16">
          <div className="text-center mb-12 md:mb-16">
            <div className="relative mb-8">
              <div className="w-20 h-20 md:w-32 md:h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <Icon name="Hammer" size={40} className="text-white md:w-16 md:h-16" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full animate-bounce" />
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-green-500 rounded-full animate-bounce delay-100" />
              <div className="absolute top-0 -right-4 w-3 h-3 bg-purple-500 rounded-full animate-bounce delay-200" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              В разработке
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Мы постоянно работаем над улучшением TRIVO. Следите за новинками и будьте первыми, 
              кто попробует крутые фишки!
            </p>
          </div>
        </section>

        {/* Features in Development */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pb-8 md:pb-16">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Что мы готовим
            </h2>
            <p className="text-lg text-gray-600">
              Новые функции, которые сделают TRIVO еще лучше
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg border border-gray-100 relative overflow-hidden">
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    feature.status === 'В разработке' ? 'bg-blue-100 text-blue-700' :
                    feature.status === 'В тестировании' ? 'bg-green-100 text-green-700' :
                    feature.status === 'Скоро' ? 'bg-orange-100 text-orange-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {feature.status}
                  </span>
                </div>
                
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon name={feature.icon as any} size={32} className="text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {feature.status === 'В разработке' && (
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full animate-pulse" style={{width: '65%'}} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Development Stats */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pb-8 md:pb-16">
          <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-12 shadow-lg border border-gray-100">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Наша команда работает
              </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pb-8 md:pb-16">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Дорожная карта
            </h2>
            <p className="text-lg text-gray-600">
              Планы развития на ближайшие кварталы
            </p>
          </div>

          <div className="space-y-6 md:space-y-8">
            {timeline.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-lg border border-gray-100">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center font-bold text-white ${
                      item.status === 'in-progress' 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 animate-pulse'
                        : 'bg-gray-400'
                    }`}>
                      {item.status === 'in-progress' ? 
                        <Icon name="Play" size={20} /> : 
                        <Icon name="Calendar" size={20} />
                      }
                    </div>
                    <div className="text-lg md:text-xl font-bold text-blue-600">
                      {item.quarter}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {item.status === 'in-progress' && (
                    <div className="flex items-center gap-2 text-green-600 font-medium">
                      <Icon name="Zap" size={16} />
                      <span className="text-sm">В работе</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Beta Testing */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pb-8 md:pb-16">
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl md:rounded-3xl p-8 md:p-12 text-center text-white">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="TestTube" size={32} className="text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Станьте бета-тестером
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Получите доступ к новым функциям раньше всех и помогите нам сделать TRIVO лучше
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/contacts')}
                className="bg-white text-purple-600 font-semibold px-8 py-3 rounded-full shadow hover:bg-purple-50 transition"
              >
                Подать заявку
              </button>
              <button
                onClick={() => window.open('https://t.me/+QgiLIa1gFRY4Y2Iy', '_blank')}
                className="bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-purple-600 transition"
              >
                Telegram канал
              </button>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pb-8 md:pb-16">
          <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-12 shadow-lg border border-gray-100">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="Bell" size={32} className="text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Не пропустите обновления
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Подпишитесь на уведомления о новых функциях
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <div className="flex gap-3">
                <input
                  type="email"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ваш email"
                />
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition">
                  Подписаться
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-3 text-center">
                Не более 1 письма в неделю. Отписаться можно в любой момент.
              </p>
            </div>
          </div>
        </section>
      </main>

      <AvitoFooter />
    </div>
  );
};

export default UnderDevelopmentPage;