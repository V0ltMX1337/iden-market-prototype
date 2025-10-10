import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { mfoConfig } from './config';
import Icon from '@/components/ui/icon';
import { MfoOffer } from './types';

const MfoPage = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleOfferClick = (offer: MfoOffer) => {
    window.open(offer.cpaLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <Helmet>
        <title>{mfoConfig.seo.title}</title>
        <meta name="description" content={mfoConfig.seo.description} />
        <meta name="keywords" content={mfoConfig.seo.keywords} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="Wallet" className="text-green-600" size={32} />
                <h1 className="text-2xl font-bold text-gray-900">{mfoConfig.site.siteName}</h1>
              </div>
              <div className="hidden md:flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Icon name="Phone" size={16} className="text-green-600" />
                  <span className="font-medium">{mfoConfig.site.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Clock" size={16} className="text-green-600" />
                  <span className="text-gray-600">{mfoConfig.site.workingHours}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-12 md:py-20 bg-gradient-to-r from-green-600 to-emerald-700 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                {mfoConfig.hero.title}
              </h2>
              <p className="text-xl md:text-2xl mb-8 text-green-50">
                {mfoConfig.hero.subtitle}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                {mfoConfig.hero.features.map((feature, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div className="text-2xl font-bold">{feature}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Offers Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              Лучшие предложения от МФО
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {mfoConfig.offers.map((offer) => (
                <div
                  key={offer.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  {offer.badge && (
                    <div className={`${offer.badgeColor} text-white text-center py-2 font-semibold text-sm`}>
                      {offer.badge}
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <img src={offer.logo} alt={offer.name} className="h-12 object-contain" />
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Icon name="Star" size={18} fill="currentColor" />
                        <Icon name="Star" size={18} fill="currentColor" />
                        <Icon name="Star" size={18} fill="currentColor" />
                        <Icon name="Star" size={18} fill="currentColor" />
                        <Icon name="Star" size={18} fill="currentColor" />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div>
                        <div className="text-gray-500 text-xs mb-1">Сумма</div>
                        <div className="font-bold text-green-600">{offer.amount}</div>
                      </div>
                      <div>
                        <div className="text-gray-500 text-xs mb-1">Ставка</div>
                        <div className="font-bold text-green-600">{offer.rate}</div>
                      </div>
                      <div>
                        <div className="text-gray-500 text-xs mb-1">Срок</div>
                        <div className="font-bold text-gray-900">{offer.term}</div>
                      </div>
                    </div>

                    <div className="mb-6 space-y-2">
                      {offer.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Icon name="CheckCircle" size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mb-4 p-3 bg-green-50 rounded-lg">
                      <span className="text-sm text-gray-700">Процент одобрения</span>
                      <span className="text-2xl font-bold text-green-600">{offer.approval}</span>
                    </div>

                    <button
                      onClick={() => handleOfferClick(offer)}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-4 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-lg"
                    >
                      Получить деньги
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              Почему выбирают нас
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {mfoConfig.benefits.map((benefit, index) => (
                <div key={index} className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
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
              Как получить займ
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {mfoConfig.howItWorks.map((step) => (
                <div key={step.step} className="relative">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Icon name={step.icon as any} className="text-white" size={32} />
                    </div>
                    <div className="absolute top-8 left-1/2 w-full h-0.5 bg-green-200 -z-10 hidden lg:block last:hidden" />
                    <div className="mb-3">
                      <span className="inline-block bg-green-600 text-white font-bold px-4 py-1 rounded-full text-sm">
                        Шаг {step.step}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-gray-900">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              Частые вопросы
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {mfoConfig.faq.map((item, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-green-300 transition-colors"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left"
                  >
                    <span className="font-semibold text-gray-900">{item.question}</span>
                    <Icon
                      name="ChevronDown"
                      className={`text-green-600 transition-transform ${
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

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-6">
                <h3 className="text-white font-bold text-xl mb-2">{mfoConfig.site.siteName}</h3>
                <p className="text-sm">{mfoConfig.site.phone} • {mfoConfig.site.email}</p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4 mb-6 text-sm">
                {mfoConfig.footer.links.map((link, index) => (
                  <a key={index} href={link.url} className="hover:text-white transition-colors">
                    {link.title}
                  </a>
                ))}
              </div>

              <div className="border-t border-gray-700 pt-6 text-xs text-gray-400">
                <p className="mb-2">{mfoConfig.footer.companyName}</p>
                <p>{mfoConfig.footer.disclaimer}</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default MfoPage;
