import { useNavigate } from "react-router-dom";
import AvitoHeader from "@/components/avitomarket/AvitoHeader";
import AvitoFooter from "@/components/avitomarket/AvitoFooter";
import Icon from "@/components/ui/icon";
import { Helmet } from "react-helmet-async";
import { usePageTitle } from "@/hooks/usePageTitle";

const TermsPage = () => {
  const navigate = useNavigate();

  const pageTitle = "Условия использования - TRIVO";

  const terms = [
    {
      title: "Общие положения",
      items: [
        "Настоящие Условия использования регулируют отношения между пользователями и администрацией сайта TRIVO",
        "Используя сайт, вы соглашаетесь с данными условиями в полном объеме",
        "Администрация оставляет за собой право изменять условия без предварительного уведомления"
      ]
    },
    {
      title: "Регистрация и аккаунт",
      items: [
        "Для размещения объявлений необходима регистрация с указанием достоверных данных",
        "Пользователь несет ответственность за сохранность своих данных для входа",
        "Запрещено создание множественных аккаунтов одним лицом",
        "При нарушении правил аккаунт может быть заблокирован без предупреждения"
      ]
    },
    {
      title: "Размещение объявлений",
      items: [
        "Объявления должны содержать только актуальную и достоверную информацию",
        "Запрещено размещение товаров, запрещенных к продаже законодательством РФ",
        "Фотографии должны соответствовать описываемому товару",
        "Цены должны быть указаны корректно и соответствовать реальной стоимости"
      ]
    },
    {
      title: "Правила поведения",
      items: [
        "Запрещены оскорбления, угрозы и неэтичное поведение по отношению к другим пользователям",
        "Недопустимо использование нецензурной лексики в объявлениях и сообщениях",
        "Запрещена рассылка спама и нерелевантных сообщений",
        "Мошеннические действия преследуются по закону"
      ]
    },
    {
      title: "Ответственность",
      items: [
        "Администрация не несет ответственности за качество товаров и услуг",
        "Все сделки совершаются на свой страх и риск",
        "Пользователи самостоятельно решают спорные вопросы",
        "Рекомендуется проверять товары перед покупкой"
      ]
    },
    {
      title: "Нарушения и санкции",
      items: [
        "За нарушение правил может быть наложено предупреждение или блокировка",
        "Повторные нарушения ведут к постоянной блокировке аккаунта",
        "Администрация может удалять объявления без объяснения причин",
        "Решения модерации не подлежат обжалованию"
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content="Условия использования TRIVO. Правила размещения объявлений, поведения на платформе и ответственность пользователей." />
      </Helmet>

      <AvitoHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-8 md:py-16">
          <div className="text-center mb-12 md:mb-16">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="FileText" size={32} className="text-white" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              Условия использования
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Правила и условия пользования платформой TRIVO
            </p>
          </div>
        </section>

        {/* Last Updated */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 md:p-6 text-center">
            <p className="text-blue-800">
              <Icon name="Calendar" size={16} className="inline mr-2" />
              Действует с: 15 января 2024 года
            </p>
          </div>
        </section>

        {/* Terms Sections */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pb-8 md:pb-16">
          <div className="space-y-6 md:space-y-8">
            {terms.map((section, index) => (
              <div key={index} className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-lg border border-gray-100">
                <div className="flex items-start gap-4 md:gap-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
                      {section.title}
                    </h2>
                    <ul className="space-y-4">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3">
                          <Icon name="Check" size={16} className="text-green-600 mt-1 flex-shrink-0" />
                          <span className="text-gray-600 leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Important Notice */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pb-8 md:pb-16">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl md:rounded-3xl p-6 md:p-10">
            <div className="flex items-start gap-4">
              <Icon name="AlertTriangle" size={32} className="text-amber-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-amber-900 mb-4">
                  Важно помнить
                </h3>
                <div className="space-y-3 text-amber-800">
                  <p>• Все сделки происходят между пользователями напрямую</p>
                  <p>• TRIVO не является стороной в сделках и не несет ответственности за их результат</p>  
                  <p>• Соблюдайте меры безопасности при встречах с незнакомыми людьми</p>
                  <p>• При обнаружении мошенничества обращайтесь в службу поддержки</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pb-8 md:pb-16">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl md:rounded-3xl p-8 md:p-12 text-center text-white">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="HelpCircle" size={32} className="text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Вопросы по условиям?
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Если что-то неясно, мы всегда готовы помочь
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/contacts')}
                className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-full shadow hover:bg-blue-50 transition"
              >
                Связаться с поддержкой
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

export default TermsPage;