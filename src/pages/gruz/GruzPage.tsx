import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { gruzConfig } from './config';
import Icon from '@/components/ui/icon';
import { CalculatorState } from './types';

const GruzPage = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [editorPassword, setEditorPassword] = useState('');
  const [isEditorAuth, setIsEditorAuth] = useState(false);

  const [calculator, setCalculator] = useState<CalculatorState>({
    service: 'gazelle',
    hours: 3,
    loaders: 0,
    distance: 0,
    additional: []
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const calculatePrice = () => {
    const servicePrices: Record<string, number> = {
      gazelle: 800,
      gazelleXL: 1000,
      truck3t: 1500,
      truck5t: 2000
    };

    let total = servicePrices[calculator.service] * calculator.hours;
    total += calculator.loaders * 500 * calculator.hours;
    total += calculator.distance * 35;

    return total;
  };

  const handleEditorLogin = () => {
    if (editorPassword === gruzConfig.editor.password) {
      setIsEditorAuth(true);
      setShowEditor(true);
    } else {
      alert('Неверный пароль');
    }
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `Здравствуйте! Хочу заказать грузоперевозку.\n` +
      `Транспорт: ${calculator.service}\n` +
      `Часы работы: ${calculator.hours}ч\n` +
      `Грузчики: ${calculator.loaders} чел\n` +
      `Примерная стоимость: ${calculatePrice()} ₽`
    );
    window.open(`https://wa.me/${gruzConfig.site.whatsapp.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${gruzConfig.site.phone}`;
  };

  return (
    <>
      <Helmet>
        <title>{gruzConfig.seo.title}</title>
        <meta name="description" content={gruzConfig.seo.description} />
        <meta name="keywords" content={gruzConfig.seo.keywords} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icon name="Truck" className="text-blue-600" size={36} />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{gruzConfig.site.companyName}</h1>
                  <p className="text-sm text-gray-600">{gruzConfig.site.tagline}</p>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-4">
                <a
                  href={`tel:${gruzConfig.site.phone}`}
                  className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  <Icon name="Phone" size={20} />
                  {gruzConfig.site.phone}
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-12 md:py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                {gruzConfig.hero.title}
              </h2>
              <p className="text-xl md:text-2xl mb-8 text-blue-50">
                {gruzConfig.hero.subtitle}
              </p>
              <button
                onClick={() => setShowCalculator(true)}
                className="bg-white text-blue-600 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-all transform hover:scale-105 shadow-xl inline-flex items-center gap-2 text-lg"
              >
                <Icon name="Calculator" size={24} />
                {gruzConfig.hero.buttonText}
              </button>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-3xl mx-auto">
                {gruzConfig.hero.features.map((feature, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div className="font-semibold">{feature}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Calculator Modal */}
        {showCalculator && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Калькулятор стоимости</h3>
                <button onClick={() => setShowCalculator(false)} className="text-gray-400 hover:text-gray-600">
                  <Icon name="X" size={24} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Тип транспорта</label>
                  <select
                    value={calculator.service}
                    onChange={(e) => setCalculator({ ...calculator, service: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="gazelle">Газель (800 ₽/час)</option>
                    <option value="gazelleXL">Газель удлиненная (1000 ₽/час)</option>
                    <option value="truck3t">Фургон 3т (1500 ₽/час)</option>
                    <option value="truck5t">Фургон 5т (2000 ₽/час)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Время работы: {calculator.hours} ч (минимум 3ч)
                  </label>
                  <input
                    type="range"
                    min="3"
                    max="12"
                    value={calculator.hours}
                    onChange={(e) => setCalculator({ ...calculator, hours: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Грузчики: {calculator.loaders} чел (500 ₽/час за человека)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="6"
                    value={calculator.loaders}
                    onChange={(e) => setCalculator({ ...calculator, loaders: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Расстояние за МКАД: {calculator.distance} км (35 ₽/км)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={calculator.distance}
                    onChange={(e) => setCalculator({ ...calculator, distance: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>

                <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                  <div className="text-sm text-gray-600 mb-2">Примерная стоимость:</div>
                  <div className="text-4xl font-bold text-blue-600">{calculatePrice().toLocaleString()} ₽</div>
                  <div className="text-xs text-gray-500 mt-2">Точная стоимость рассчитывается менеджером</div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleWhatsAppClick}
                    className="flex-1 bg-green-600 text-white font-bold py-4 rounded-xl hover:bg-green-700 transition-colors inline-flex items-center justify-center gap-2"
                  >
                    <Icon name="MessageCircle" size={20} />
                    WhatsApp
                  </button>
                  <button
                    onClick={handlePhoneClick}
                    className="flex-1 bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-colors inline-flex items-center justify-center gap-2"
                  >
                    <Icon name="Phone" size={20} />
                    Позвонить
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Services Section */}
        <section id="services" className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              Наши услуги
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {gruzConfig.services.map((service) => (
                <div
                  key={service.id}
                  className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 ${
                    service.popular ? 'border-blue-500' : 'border-gray-100'
                  }`}
                >
                  {service.popular && (
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center py-2 font-semibold text-sm">
                      ⭐ Популярное
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Icon name={service.icon as any} className="text-blue-600" size={32} />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-gray-900">{service.name}</h3>
                        <div className="text-2xl font-bold text-blue-600">{service.price}</div>
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Icon name="Weight" size={16} className="text-gray-400" />
                        <span>Грузоподъемность: {service.capacity}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Icon name="Box" size={16} className="text-gray-400" />
                        <span>Объем: {service.volume}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Icon name="Ruler" size={16} className="text-gray-400" />
                        <span>Размеры: {service.dimensions}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                    <button
                      onClick={() => setShowCalculator(true)}
                      className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Заказать
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">Дополнительные услуги</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {gruzConfig.additionalServices.map((service, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                    <Icon name={service.icon as any} className="text-blue-600 mb-3" size={32} />
                    <h4 className="font-bold text-lg mb-2 text-gray-900">{service.name}</h4>
                    <div className="text-blue-600 font-bold mb-2">{service.price}</div>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              Почему выбирают нас
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gruzConfig.benefits.map((benefit, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                    <Icon name={benefit.icon as any} className="text-white" size={28} />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              Как мы работаем
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {gruzConfig.howItWorks.map((step) => (
                <div key={step.step} className="relative text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Icon name={step.icon as any} className="text-white" size={32} />
                  </div>
                  <div className="mb-3">
                    <span className="inline-block bg-blue-600 text-white font-bold px-4 py-1 rounded-full text-sm">
                      Шаг {step.step}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              Отзывы клиентов
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {gruzConfig.testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={18} className="text-yellow-500" fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                  <div className="border-t pt-4">
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.service}</div>
                    <div className="text-xs text-gray-400 mt-1">{testimonial.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              Частые вопросы
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {gruzConfig.faq.map((item, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-blue-300 transition-colors"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left"
                  >
                    <span className="font-semibold text-gray-900">{item.question}</span>
                    <Icon
                      name="ChevronDown"
                      className={`text-blue-600 transition-transform ${
                        expandedFaq === index ? 'rotate-180' : ''
                      }`}
                      size={20}
                    />
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-4 text-gray-600">
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Готовы заказать грузоперевозку?</h2>
            <p className="text-xl mb-8 text-blue-50">Рассчитайте стоимость за 30 секунд или позвоните нам прямо сейчас</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => setShowCalculator(true)}
                className="bg-white text-blue-600 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-all transform hover:scale-105 shadow-xl inline-flex items-center gap-2"
              >
                <Icon name="Calculator" size={24} />
                Рассчитать стоимость
              </button>
              <a
                href={`tel:${gruzConfig.site.phone}`}
                className="bg-blue-800 text-white font-bold px-8 py-4 rounded-xl hover:bg-blue-900 transition-all transform hover:scale-105 shadow-xl inline-flex items-center gap-2"
              >
                <Icon name="Phone" size={24} />
                {gruzConfig.site.phone}
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-white font-bold text-xl mb-4">{gruzConfig.site.companyName}</h3>
                <p className="text-sm mb-4">{gruzConfig.site.tagline}</p>
                <div className="flex gap-4">
                  <a href={gruzConfig.contacts.vk} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    <Icon name="Share2" size={20} />
                  </a>
                  <a href={gruzConfig.contacts.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    <Icon name="Instagram" size={20} />
                  </a>
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-4">Контакты</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Icon name="Phone" size={16} />
                    <span>{gruzConfig.site.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Mail" size={16} />
                    <span>{gruzConfig.site.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="MapPin" size={16} />
                    <span>{gruzConfig.site.address}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4">Реквизиты</h4>
                <div className="space-y-2 text-sm">
                  <div>ИНН: {gruzConfig.site.inn}</div>
                  <div>ОГРН: {gruzConfig.site.ogrn}</div>
                  <div>{gruzConfig.site.workingHours}</div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-8 text-center text-sm">
              <div className="flex flex-wrap justify-center gap-4 mb-4">
                {gruzConfig.footer.links.map((link, index) => (
                  <a key={index} href={link.url} className="hover:text-white transition-colors">
                    {link.title}
                  </a>
                ))}
              </div>
              <p className="text-gray-400">{gruzConfig.footer.copyright}</p>
            </div>
          </div>
        </footer>

        {/* Editor Button */}
        {gruzConfig.editor.enabled && (
          <button
            onClick={() => setShowEditor(!showEditor)}
            className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-full shadow-lg hover:bg-gray-700 transition-colors z-40"
            title="Редактор"
          >
            <Icon name="Settings" size={24} />
          </button>
        )}

        {/* Editor Modal */}
        {showEditor && !isEditorAuth && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Вход в редактор</h3>
              <input
                type="password"
                placeholder="Введите пароль"
                value={editorPassword}
                onChange={(e) => setEditorPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && handleEditorLogin()}
              />
              <div className="flex gap-3">
                <button
                  onClick={handleEditorLogin}
                  className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Войти
                </button>
                <button
                  onClick={() => setShowEditor(false)}
                  className="flex-1 bg-gray-200 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Отмена
                </button>
              </div>
            </div>
          </div>
        )}

        {showEditor && isEditorAuth && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full p-8 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Редактор контента</h3>
                <button
                  onClick={() => {
                    setShowEditor(false);
                    setIsEditorAuth(false);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Icon name="X" size={24} />
                </button>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  Для изменения контента отредактируйте файл <code className="bg-blue-100 px-2 py-1 rounded">src/pages/gruz/config.ts</code>
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Доступные поля: {gruzConfig.editor.editableFields.join(', ')}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GruzPage;
