import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const NewMarketplace = () => {
  const categories = [
    {
      name: "Электроника",
      icon: "📱",
      products: "12K+",
      color: "from-blue-500 to-purple-600",
      href: "/marketplace/category/electronics",
    },
    {
      name: "Одежда и обувь",
      icon: "👔",
      products: "8K+",
      color: "from-pink-500 to-rose-600",
      href: "/marketplace/category/clothes",
    },
    {
      name: "Дом и сад",
      icon: "🏠",
      products: "6K+",
      color: "from-green-500 to-emerald-600",
      href: "/marketplace/category/home",
    },
    {
      name: "Автотовары",
      icon: "🚗",
      products: "4K+",
      color: "from-orange-500 to-red-600",
      href: "/marketplace/category/auto",
    },
    {
      name: "Спорт",
      icon: "⚽",
      products: "3K+",
      color: "from-indigo-500 to-blue-600",
      href: "/marketplace/category/sport",
    },
    {
      name: "Красота",
      icon: "💄",
      products: "5K+",
      color: "from-purple-500 to-pink-600",
      href: "/marketplace/category/beauty",
    },
  ];

  const featuredProducts = [
    {
      name: "iPhone 15 Pro Max",
      price: "139 990₽",
      rating: 4.8,
      reviews: 245,
      image:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop",
      badge: "Популярное",
    },
    {
      name: "MacBook Air M2",
      price: "109 990₽",
      rating: 4.9,
      reviews: 187,
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop",
      badge: "Новинка",
    },
    {
      name: "PlayStation 5",
      price: "54 990₽",
      rating: 4.7,
      reviews: 328,
      image:
        "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=300&h=300&fit=crop",
      badge: "Скидка -15%",
    },
    {
      name: "AirPods Pro 2",
      price: "24 990₽",
      rating: 4.6,
      reviews: 156,
      image:
        "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=300&h=300&fit=crop",
      badge: "Хит продаж",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Найдите всё, что нужно
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                в одном месте
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Миллионы товаров, проверенные продавцы, быстрая доставка
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
              >
                Начать покупки
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3">
                Стать продавцом
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Популярные категории
            </h2>
            <p className="text-gray-600">
              Выберите категорию и найдите то, что ищете
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <a
                key={category.name}
                href={category.href}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br p-8 text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{
                  backgroundImage: `linear-gradient(to bottom right, ${category.color.split(" ")[1]}, ${category.color.split(" ")[3]})`,
                }}
              >
                <div className="relative z-10">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                  <p className="text-white/80 text-sm">
                    {category.products} товаров
                  </p>
                </div>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Рекомендуем
              </h2>
              <p className="text-gray-600">Лучшие предложения для вас</p>
            </div>
            <Button variant="outline" className="hidden sm:flex">
              Смотреть все
              <Icon name="ArrowRight" size={16} className="ml-2" />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-white text-gray-900 hover:bg-white">
                    {product.badge}
                  </Badge>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-3 right-3 w-8 h-8 p-0 bg-white/80 hover:bg-white"
                  >
                    <Icon name="Heart" size={16} className="text-gray-600" />
                  </Button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      <Icon
                        name="Star"
                        size={14}
                        className="text-yellow-400 fill-current"
                      />
                      <span className="text-sm text-gray-600 ml-1">
                        {product.rating}
                      </span>
                    </div>
                    <span className="text-sm text-gray-400 ml-2">
                      ({product.reviews})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      {product.price}
                    </span>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      В корзину
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Готовы начать продавать?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Присоединяйтесь к тысячам успешных продавцов
          </p>
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3"
          >
            Стать продавцом
            <Icon name="ArrowRight" size={20} className="ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">PotionMarket</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Современный маркетплейс с широким ассортиментом товаров и
                быстрой доставкой.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Покупателям</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Как сделать заказ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Способы оплаты
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Доставка
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Возврат товара
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Партнёрам</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Стать продавцом
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Реклама на сайте
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Программа лояльности
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>📞 8 (800) 123-45-67</li>
                <li>📧 support@potionmarket.ru</li>
                <li>🕐 Ежедневно с 9:00 до 21:00</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 PotionMarket. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NewMarketplace;
