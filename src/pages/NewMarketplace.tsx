import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const NewMarketplace = () => {
  const categories = [
    {
      name: "Электроника",
      icon: "📱",
      href: "/marketplace/category/electronics",
    },
    { name: "Одежда", icon: "👔", href: "/marketplace/category/clothes" },
    { name: "Обувь", icon: "👟", href: "/marketplace/category/shoes" },
    {
      name: "Электроинструменты",
      icon: "🔨",
      href: "/marketplace/category/tools",
    },
    { name: "Автотовары", icon: "🚗", href: "/marketplace/category/auto" },
    {
      name: "Аксессуары",
      icon: "🎧",
      href: "/marketplace/category/accessories",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-roboto">
      <Header />

      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white">
        <div className="absolute inset-0">
          <img
            src="https://cdn.poehali.dev/files/ae3d6515-2f85-41ba-8696-b2dcbbc625a5.png"
            alt="Маркетплейс баннер"
            className="w-full h-full object-cover opacity-90"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              ПОКУПАЙ
              <br />
              <span className="text-yellow-400">ПРОДАВАЙ</span>
              <br />
              ОПТОМ
            </h1>
            <p className="text-xl mb-8 opacity-90">В РОЗНИЦУ</p>
            <Button
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-8 py-4 text-lg"
            >
              Начать покупки
            </Button>
          </div>
        </div>

        {/* Navigation arrows */}
        <button className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all">
          <Icon name="ChevronLeft" size={24} />
        </button>
        <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all">
          <Icon name="ChevronRight" size={24} />
        </button>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <a
              key={category.name}
              href={category.href}
              className="group flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                {category.icon}
              </div>
              <span className="text-sm font-medium text-gray-700 text-center">
                {category.name}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Promo Blocks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Wholesale Instructions */}
          <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">
                Как сделать
                <br />
                оптовый заказ?
              </h3>
              <Button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold">
                Инструкция
                <Icon name="ChevronRight" size={16} className="ml-1" />
              </Button>
            </div>
            <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
          </div>

          {/* New Suppliers Reviews */}
          <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">
                <span className="bg-white text-blue-600 px-3 py-1 rounded-lg text-lg">
                  обзоры
                </span>
                <br />
                новых поставщиков
              </h3>
              <div className="flex space-x-2">
                <Button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-sm">
                  видео
                </Button>
                <Button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-sm">
                  отзывы
                </Button>
              </div>
            </div>
            <div className="absolute right-4 top-4">
              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                <Icon name="Play" size={24} className="text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">IdenMarket</h3>
              <p className="text-gray-300 text-sm">
                Современный маркетплейс с широким ассортиментом товаров и
                быстрой доставкой.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Покупателям</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="#" className="hover:text-white">
                    Как сделать заказ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Способы оплаты
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Доставка
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Возврат товара
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Партнёрам</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="#" className="hover:text-white">
                    Стать продавцом
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Реклама на сайте
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Программа лояльности
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>📞 8 (800) 123-45-67</li>
                <li>📧 support@idenmarket.ru</li>
                <li>🕐 Ежедневно с 9:00 до 21:00</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 IdenMarket. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NewMarketplace;
