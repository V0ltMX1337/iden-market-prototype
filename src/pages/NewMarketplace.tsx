import Header from "@/components/Header";
import SellersSlider from "@/components/SellersSlider";
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
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              ПОКУПАЙ
              <span className="text-yellow-400 ml-2">ПРОДАВАЙ</span>
              <span className="ml-2">ОПТОМ</span>
            </h1>
            <p className="text-lg mb-6 opacity-90">В РОЗНИЦУ</p>
            <Button
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-6 py-3"
            >
              Начать покупки
            </Button>
          </div>
        </div>

        {/* Navigation arrows */}
        <button className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all">
          <Icon name="ChevronLeft" size={20} />
        </button>
        <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all">
          <Icon name="ChevronRight" size={20} />
        </button>
      </section>

      {/* Popular Sellers Slider */}
      <SellersSlider />

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category) => (
            <a
              key={category.name}
              href={category.href}
              className="group flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                {category.icon}
              </div>
              <span className="text-xs font-medium text-gray-700 text-center">
                {category.name}
              </span>
            </a>
          ))}
          {/* Добавляем новые категории */}
          <a
            href="/marketplace/category/sale"
            className="group flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
          >
            <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
              🔥
            </div>
            <span className="text-xs font-medium text-gray-700 text-center">
              Распродажа
            </span>
          </a>
          <a
            href="/marketplace/category/special"
            className="group flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
          >
            <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
              ⭐
            </div>
            <span className="text-xs font-medium text-gray-700 text-center">
              Спецпредложения
            </span>
          </a>
        </div>
      </section>

      {/* Special Offers Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"></section>

      {/* Popular Sellers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Популярные продавцы
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            {
              id: 1,
              name: "OnShop",
              avatar:
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
              rating: 4.8,
              products: 127,
            },
            {
              id: 2,
              name: "ReVolt",
              avatar:
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop&crop=face",
              rating: 4.9,
              products: 89,
            },
            {
              id: 3,
              name: "GG17",
              avatar:
                "https://images.unsplash.com/photo-1494790108755-2616b332c796?w=64&h=64&fit=crop&crop=face",
              rating: 4.7,
              products: 234,
            },
            {
              id: 4,
              name: "ATALANT",
              avatar:
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
              rating: 4.6,
              products: 156,
            },
            {
              id: 5,
              name: "AKIRA",
              avatar:
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
              rating: 5.0,
              products: 78,
            },
            {
              id: 6,
              name: "TechPro",
              avatar:
                "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=64&h=64&fit=crop&crop=face",
              rating: 4.5,
              products: 203,
            },
          ].map((seller) => (
            <a
              key={seller.id}
              href={`/seller/${seller.id}`}
              className="group flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
            >
              <img
                src={seller.avatar}
                alt={seller.name}
                className="w-16 h-16 rounded-full mb-3 group-hover:scale-110 transition-transform"
              />
              <span className="font-medium text-gray-900 text-sm mb-1">
                {seller.name}
              </span>
              <div className="flex items-center text-xs text-gray-600 mb-1">
                <Icon name="Star" size={12} className="text-yellow-500 mr-1" />
                <span>{seller.rating}</span>
              </div>
              <span className="text-xs text-gray-500">
                {seller.products} товаров
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Special Offers Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Спецпредложения</h2>
          <Button variant="outline" size="sm">
            Посмотреть все
            <Icon name="ChevronRight" size={16} className="ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            {
              name: "Беспроводные наушники Pods Max",
              price: "4 050₽",
              oldPrice: "6 500₽",
              discount: "-38%",
              image:
                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
            },
            {
              name: "Перфоратор Makita аккумуляторный",
              price: "3 000₽",
              oldPrice: "3 500₽",
              discount: "-14%",
              image:
                "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300&h=300&fit=crop",
            },
            {
              name: "Колонка JBL Clip 5",
              price: "1 490₽",
              oldPrice: "1 700₽",
              discount: "-12%",
              image:
                "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop",
            },
            {
              name: "Внешний аккумулятор MagSafe",
              price: "310₽",
              oldPrice: "500₽",
              discount: "-38%",
              image:
                "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&h=300&fit=crop",
            },
            {
              name: "Набор 2 в 1 Секатор и Пила Makita",
              price: "2 500₽",
              oldPrice: "3 300₽",
              discount: "-24%",
              image:
                "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=300&h=300&fit=crop",
            },
          ].map((product, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  {product.discount}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-gray-900">
                    {product.price}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    {product.oldPrice}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sellers Slider */}
      <SellersSlider />

      {/* Promo Blocks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
