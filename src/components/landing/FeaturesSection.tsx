import Icon from "@/components/ui/icon";

const FeaturesSection = () => {
  const features = [
    {
      icon: "Shield",
      title: "Безопасность покупок",
      description:
        "Защита платежей, проверенные продавцы и гарантия возврата денег",
    },
    {
      icon: "Zap",
      title: "Быстрая доставка",
      description:
        "Доставка по всей России от 1 дня. Экспресс-доставка в крупных городах",
    },
    {
      icon: "Star",
      title: "Лучшие цены",
      description:
        "Сравнивайте цены от разных продавцов и выбирайте самые выгодные предложения",
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Почему выбирают IdenMarket?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Мы создали платформу, которая объединяет лучшее от современных
            технологий и заботы о клиентах
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Icon name={feature.icon} size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
