import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AvitoHeader from "@/components/avitomarket/AvitoHeader";
import AvitoFooter from "@/components/avitomarket/AvitoFooter";
import Icon from "@/components/ui/icon";
import { Helmet } from "react-helmet-async";
import { usePageTitle } from "@/hooks/usePageTitle";

const HelpPage = () => {
  const navigate = useNavigate();
  const { getPageTitle, settings: systemSettings } = usePageTitle();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const pageTitle = systemSettings
    ? getPageTitle("helpPageTitle", {})
    : "Помощь - TRIVO";

  const categories = [
    { id: 'all', name: 'Все вопросы', icon: 'HelpCircle' },
    { id: 'account', name: 'Аккаунт', icon: 'User' },
    { id: 'ads', name: 'Объявления', icon: 'Package' },
    { id: 'safety', name: 'Безопасность', icon: 'Shield' },
    { id: 'payments', name: 'Платежи', icon: 'CreditCard' }
  ];

  const faqs = [
    {
      id: 1,
      category: 'account',
      question: 'Как зарегистрироваться на TRIVO?',
      answer: 'Для регистрации нажмите кнопку "Войти" в верхней части сайта, затем выберите "Регистрация". Заполните форму с указанием email и пароля. После этого подтвердите email адрес, перейдя по ссылке в письме.'
    },
    {
      id: 2,
      category: 'account',
      question: 'Как восстановить пароль?',
      answer: 'На странице входа нажмите "Забыли пароль?", введите email и следуйте инструкциям в письме для восстановления доступа.'
    },
    {
      id: 3,
      category: 'ads',
      question: 'Как разместить объявление?',
      answer: 'После регистрации нажмите "Разместить объявление", выберите категорию, заполните описание, добавьте фотографии и укажите цену. Проверьте информацию и опубликуйте объявление.'
    },
    {
      id: 4,
      category: 'ads',
      question: 'Почему мое объявление не отображается?',
      answer: 'Объявления проходят модерацию в течение 30 минут. Возможно, ваше объявление не соответствует правилам размещения или содержит запрещенные товары.'
    },
    {
      id: 5,
      category: 'safety',
      question: 'Как безопасно совершить покупку?',
      answer: 'Встречайтесь в людных местах, проверяйте товар перед оплатой, не переводите деньги заранее. Используйте встроенный чат для общения с продавцом.'
    },
    {
      id: 6,
      category: 'safety',
      question: 'Что делать при обнаружении мошенника?',
      answer: 'Немедленно сообщите о подозрительном пользователе через кнопку "Пожаловаться" в объявлении или профиле. Наша служба безопасности рассмотрит жалобу.'
    },
    {
      id: 7,
      category: 'payments',
      question: 'Какие способы оплаты доступны?',
      answer: 'На TRIVO оплата происходит напрямую между покупателем и продавцом. Мы рекомендуем наличный расчет при встрече или банковский перевод для безопасности.'
    },
    {
      id: 8,
      category: 'payments',
      question: 'Как работают платные услуги?',
      answer: 'Вы можете оплатить поднятие объявления, премиум размещение или другие услуги банковской картой через защищенное соединение на нашем сайте.'
    }
  ];

  const quickHelp = [
    {
      icon: 'MessageCircle',
      title: 'Онлайн-чат',
      description: 'Быстрые ответы от поддержки',
      time: '24/7',
      action: 'Начать чат'
    },
    {
      icon: 'Phone',
      title: 'Телефон',
      description: 'Горячая линия поддержки',
      time: '8:00 - 22:00',
      action: '+7 (800) 555-00-99'
    },
    {
      icon: 'Mail',
      title: 'Email',
      description: 'Подробный ответ на почту',
      time: 'до 2 часов',
      action: 'support@trivo.ru'
    },
    {
      icon: 'FileText',
      title: 'База знаний',
      description: 'Инструкции и гайды',
      time: 'круглосуточно',
      action: 'Перейти'
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content="Центр помощи TRIVO - ответы на частые вопросы, инструкции и поддержка пользователей. FAQ по работе с платформой." />
      </Helmet>

      <AvitoHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-8 md:py-16">
          <div className="text-center mb-12 md:mb-16">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="HelpCircle" size={32} className="text-white" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              Центр помощи
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Найдите ответы на свои вопросы или свяжитесь с нашей службой поддержки
            </p>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto mb-8 md:mb-12">
            <div className="relative">
              <Icon name="Search" size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                placeholder="Найти ответ на вопрос..."
              />
            </div>
          </div>
        </section>

        {/* Quick Help */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pb-8 md:pb-16">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Способы получить помощь
            </h2>
            <p className="text-lg text-gray-600">
              Выберите удобный способ связи
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {quickHelp.map((help, index) => (
              <div key={index} className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg border border-gray-100 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name={help.icon as any} size={32} className="text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                  {help.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {help.description}
                </p>
                <div className="text-blue-600 font-medium text-sm mb-4">
                  {help.time}
                </div>
                <button className="w-full py-2 px-4 bg-blue-100 text-blue-700 rounded-full font-medium hover:bg-blue-200 transition">
                  {help.action}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pb-8">
          <div className="flex flex-wrap gap-3 md:gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full font-medium transition ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 border border-gray-200'
                }`}
              >
                <Icon name={category.icon as any} size={16} />
                <span className="text-sm md:text-base">{category.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* FAQ List */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pb-8 md:pb-16">
          {filteredFaqs.length === 0 ? (
            <div className="bg-white rounded-2xl md:rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100 text-center">
              <Icon name="Search" size={48} className="text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Ничего не найдено
              </h3>
              <p className="text-gray-600 mb-6">
                Попробуйте изменить поисковый запрос или выберите другую категорию
              </p>
              <button
                onClick={() => navigate('/contacts')}
                className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
              >
                Связаться с поддержкой
              </button>
            </div>
          ) : (
            <div className="space-y-4 md:space-y-6">
              {filteredFaqs.map((faq) => (
                <details
                  key={faq.id}
                  className="bg-white rounded-2xl md:rounded-3xl shadow-lg border border-gray-100 overflow-hidden group"
                >
                  <summary className="p-6 md:p-8 cursor-pointer hover:bg-gray-50 transition">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 pr-4">
                        {faq.question}
                      </h3>
                      <Icon name="ChevronDown" size={20} className="text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                    </div>
                  </summary>
                  <div className="px-6 md:px-8 pb-6 md:pb-8">
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          )}
        </section>

        {/* Popular Topics */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pb-8 md:pb-16">
          <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-12 shadow-lg border border-gray-100">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Популярные темы
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <div
                onClick={() => navigate('/how-to-buy')}
                className="p-4 md:p-6 bg-gray-50 rounded-xl hover:bg-blue-50 hover:border-blue-200 border border-transparent cursor-pointer transition group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Icon name="ShoppingBag" size={20} className="text-blue-600" />
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition">
                    Как покупать
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  Пошаговое руководство по покупке товаров
                </p>
              </div>

              <div
                onClick={() => navigate('/how-to-sell')}
                className="p-4 md:p-6 bg-gray-50 rounded-xl hover:bg-green-50 hover:border-green-200 border border-transparent cursor-pointer transition group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Icon name="TrendingUp" size={20} className="text-green-600" />
                  <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition">
                    Как продавать
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  Руководство по успешным продажам
                </p>
              </div>

              <div
                onClick={() => navigate('/pricing')}
                className="p-4 md:p-6 bg-gray-50 rounded-xl hover:bg-purple-50 hover:border-purple-200 border border-transparent cursor-pointer transition group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Icon name="CreditCard" size={20} className="text-purple-600" />
                  <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition">
                    Тарифы и услуги
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  Информация о платных услугах
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pb-8 md:pb-16">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl md:rounded-3xl p-8 md:p-12 text-center text-white">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="MessageCircle" size={32} className="text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Не нашли ответ на вопрос?
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Наша служба поддержки работает круглосуточно и готова помочь
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/contacts')}
                className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-full shadow hover:bg-blue-50 transition"
              >
                Связаться с поддержкой
              </button>
              <a
                href="mailto:support@trivo.ru"
                className="bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-blue-600 transition"
              >
                support@trivo.ru
              </a>
            </div>
          </div>
        </section>
      </main>

      <AvitoFooter />
    </div>
  );
};

export default HelpPage;