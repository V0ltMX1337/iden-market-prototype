import { useNavigate } from "react-router-dom";
import AvitoHeader from "@/components/avitomarket/AvitoHeader";
import AvitoFooter from "@/components/avitomarket/AvitoFooter";
import Icon from "@/components/ui/icon";
import { Helmet } from "react-helmet-async";
import { usePageTitle } from "@/hooks/usePageTitle";

const PrivacyPolicyPage = () => {
  const navigate = useNavigate();
  const { getPageTitle, settings: systemSettings } = usePageTitle();

  const pageTitle = systemSettings
    ? getPageTitle("privacyPageTitle", {})
    : "Политика конфиденциальности - TRIVO";

  const sections = [
    {
      title: "Сбор информации",
      content: "Мы собираем информацию, которую вы предоставляете нам при регистрации, размещении объявлений, общении с другими пользователями. Это включает имя, email, телефон, фотографии товаров и другие данные, необходимые для работы сервиса."
    },
    {
      title: "Использование данных",
      content: "Ваши данные используются для предоставления услуг платформы, улучшения качества сервиса, связи с вами по важным вопросам, обеспечения безопасности и предотвращения мошенничества."
    },
    {
      title: "Передача третьим лицам",
      content: "Мы не передаем ваши персональные данные третьим лицам без вашего согласия, за исключением случаев, предусмотренных законодательством или необходимых для работы сервиса (например, службы доставки)."
    },
    {
      title: "Защита данных",
      content: "Мы применяем современные технологии шифрования и защиты данных. Все данные хранятся на защищенных серверах с ограниченным доступом и регулярным резервным копированием."
    },
    {
      title: "Ваши права",
      content: "Вы имеете право на доступ к своим данным, их исправление, удаление или ограничение обработки. Также вы можете отозвать согласие на обработку данных в любое время."
    },
    {
      title: "Cookies и аналитика",
      content: "Мы используем cookies для улучшения работы сайта и анализа трафика. Вы можете управлять cookies в настройках браузера. Мы также используем системы аналитики для понимания поведения пользователей."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content="Политика конфиденциальности TRIVO. Как мы собираем, используем и защищаем ваши персональные данные." />
      </Helmet>

      <AvitoHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-8 md:py-16">
          <div className="text-center mb-12 md:mb-16">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="Shield" size={32} className="text-white" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              Политика конфиденциальности
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Мы серьезно относимся к защите ваших персональных данных и обеспечиваем их безопасность
            </p>
          </div>
        </section>

        {/* Last Updated */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 md:p-6 text-center">
            <p className="text-blue-800">
              <Icon name="Calendar" size={16} className="inline mr-2" />
              Последнее обновление: 15 января 2024 года
            </p>
          </div>
        </section>

        {/* Content Sections */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pb-8 md:pb-16">
          <div className="space-y-6 md:space-y-8">
            {sections.map((section, index) => (
              <div key={index} className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-lg border border-gray-100">
                <div className="flex items-start gap-4 md:gap-6">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm md:text-base">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                      {section.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pb-8 md:pb-16">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl md:rounded-3xl p-8 md:p-12 text-center text-white">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="MessageCircle" size={32} className="text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Есть вопросы?
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Если у вас есть вопросы о политике конфиденциальности, свяжитесь с нами
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/contacts')}
                className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-full shadow hover:bg-blue-50 transition"
              >
                Связаться с нами
              </button>
              <a
                href="mailto:privacy@trivo.ru"
                className="bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-blue-600 transition"
              >
                privacy@trivo.ru
              </a>
            </div>
          </div>
        </section>

        {/* Rights Summary */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pb-8 md:pb-16">
          <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-12 shadow-lg border border-gray-100">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              Ваши права в отношении персональных данных
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <Icon name="Eye" size={32} className="mx-auto mb-4 text-blue-600" />
                <h3 className="font-semibold text-gray-900 mb-2">Право на доступ</h3>
                <p className="text-sm text-gray-600">Получить копию ваших данных</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <Icon name="Edit" size={32} className="mx-auto mb-4 text-blue-600" />
                <h3 className="font-semibold text-gray-900 mb-2">Право на исправление</h3>
                <p className="text-sm text-gray-600">Исправить неточную информацию</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <Icon name="Trash2" size={32} className="mx-auto mb-4 text-blue-600" />
                <h3 className="font-semibold text-gray-900 mb-2">Право на удаление</h3>
                <p className="text-sm text-gray-600">Удалить ваши персональные данные</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <AvitoFooter />
    </div>
  );
};

export default PrivacyPolicyPage;