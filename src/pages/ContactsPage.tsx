import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AvitoHeader from "@/components/avitomarket/AvitoHeader";
import AvitoFooter from "@/components/avitomarket/AvitoFooter";
import Icon from "@/components/ui/icon";
import { Helmet } from "react-helmet-async";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useAlert } from "@/contexts/AlertContext";

const ContactsPage = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useAlert();
  const { getPageTitle, settings: systemSettings } = usePageTitle();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const pageTitle = systemSettings
    ? getPageTitle("contactsPageTitle", {})
    : "Контакты - TRIVO";

  const contacts = [
    {
      icon: "Phone",
      title: "Телефон поддержки",
      value: "+7 (800) 555-00-99",
      description: "Бесплатно по России, 24/7"
    },
    {
      icon: "Mail",
      title: "Email",
      value: "support@trivo.ru",
      description: "Ответим в течение 2 часов"
    },
    {
      icon: "MapPin",
      title: "Офис",
      value: "Москва, ул. Тверская, 1",
      description: "Пн-Пт с 9:00 до 18:00"
    },
    {
      icon: "MessageCircle",
      title: "Онлайн-чат",
      value: "Чат на сайте",
      description: "Быстрые ответы 24/7"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      showError("Заполните все обязательные поля");
      return;
    }

    // Имитация отправки
    setTimeout(() => {
      showSuccess("Сообщение отправлено! Мы свяжемся с вами в ближайшее время.");
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content="Свяжитесь с нами - TRIVO. Телефон поддержки, email, адрес офиса. Форма обратной связи." />
      </Helmet>

      <AvitoHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-8 md:py-16">
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              Контакты
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Свяжитесь с нами любым удобным способом. Мы всегда готовы помочь!
            </p>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pb-8 md:pb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {contacts.map((contact, index) => (
              <div key={index} className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg border border-gray-100 text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name={contact.icon as any} size={32} className="text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                  {contact.title}
                </h3>
                <div className="text-lg font-semibold text-blue-600 mb-2">
                  {contact.value}
                </div>
                <p className="text-sm text-gray-600">
                  {contact.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pb-8 md:pb-16">
          <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-12 shadow-lg border border-gray-100">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Напишите нам
              </h2>
              <p className="text-lg text-gray-600">
                Заполните форму, и мы обязательно вам ответим
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Имя *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ваше имя"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Тема
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Тема сообщения"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Сообщение *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Опишите ваш вопрос или предложение..."
                    required
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-8 py-3 rounded-full shadow hover:shadow-lg transform hover:scale-105 transition"
                  >
                    Отправить сообщение
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pb-8 md:pb-16">
          <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-12 shadow-lg border border-gray-100">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Частые вопросы
              </h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Как быстро обрабатываются заявки?
                </h3>
                <p className="text-gray-600">
                  Мы отвечаем на все обращения в течение 2 часов в рабочее время и в течение 24 часов в выходные.
                </p>
              </div>

              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Можно ли получить помощь в выходные?
                </h3>
                <p className="text-gray-600">
                  Да, наша служба поддержки работает 24/7. В выходные дни время ответа может быть увеличено до 24 часов.
                </p>
              </div>

              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Как связаться с технической поддержкой?
                </h3>
                <p className="text-gray-600">
                  Используйте телефон горячей линии +7 (800) 555-00-99 или напишите на support@trivo.ru для технических вопросов.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <AvitoFooter />
    </div>
  );
};

export default ContactsPage;