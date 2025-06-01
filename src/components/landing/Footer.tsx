const Footer = () => {
  const footerSections = [
    {
      title: "Покупателям",
      links: [
        "Как сделать заказ",
        "Способы оплаты",
        "Доставка",
        "Возврат товара",
      ],
    },
    {
      title: "Партнёрам",
      links: ["Стать продавцом", "Реклама на сайте", "Программа лояльности"],
    },
  ];

  const contacts = [
    "📞 8 (800) 123-45-67",
    "📧 support@potionmarket.net",
    "🕐 Ежедневно с 9:00 до 21:00",
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">PotionMarket</h3>
            <p className="text-gray-300 text-sm">
              Современный маркетплейс с широким ассортиментом товаров и быстрой
              доставкой.
            </p>
          </div>
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-medium mb-4">{section.title}</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h4 className="font-medium mb-4">Контакты</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              {contacts.map((contact, index) => (
                <li key={index}>{contact}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 PotionMarket. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
