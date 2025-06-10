import Header from "@/components/marketplace/Header";
import Footer from "@/components/marketplace/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useState } from "react";

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredProducts = [
    {
      id: 1,
      name: "iPhone 15 Pro",
      price: 89999,
      oldPrice: 119999,
      image:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 256,
      badge: "Хит продаж",
    },
    {
      id: 2,
      name: "MacBook Air M2",
      price: 129999,
      oldPrice: 149999,
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 189,
      badge: "Новинка",
    },
    {
      id: 3,
      name: "AirPods Pro",
      price: 24999,
      oldPrice: 29999,
      image:
        "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 432,
      badge: "Скидка",
    },
    {
      id: 4,
      name: "iPad Air",
      price: 54999,
      oldPrice: 64999,
      image:
        "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 178,
      badge: "Популярно",
    },
  ];

  const categories = [
    {
      id: 1,
      name: "Беспроводные наушники",
      description: "более 100 актуальных моделей",
      image:
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=400&fit=crop",
      gradient: "from-blue-600 to-purple-600",
    },
    {
      id: 2,
      name: "Смартфоны",
      description: "Последние модели от топ брендов",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=400&fit=crop",
      gradient: "from-purple-600 to-pink-600",
    },
    {
      id: 3,
      name: "Ноутбуки",
      description: "Для работы и развлечений",
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop",
      gradient: "from-green-600 to-blue-600",
    },
  ];

  const brands = [
    {
      name: "Apple",
      logo: "https://images.unsplash.com/photo-1621768216002-5ac171876625?w=120&h=80&fit=crop",
    },
    {
      name: "Samsung",
      logo: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=120&h=80&fit=crop",
    },
    {
      name: "Sony",
      logo: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=120&h=80&fit=crop",
    },
    {
      name: "LG",
      logo: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=120&h=80&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                беспроводные
                <br />
                <span className="text-blue-200">наушники</span>
              </h1>
              <div className="inline-block">
                <Badge className="bg-blue-500/30 text-white px-6 py-2 text-lg font-medium rounded-full border border-blue-300/30">
                  более 100 актуальных моделей
                </Badge>
              </div>
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold"
              >
                Смотреть каталог
                <Icon name="ArrowRight" className="ml-2" size={20} />
              </Button>
            </div>
            <div className="relative">
              <img
                src="https://cdn.poehali.dev/files/fd5a9f86-ad55-436b-a06b-5f061bbbdedc.png"
                alt="Беспроводные наушники"
                className="w-full h-auto opacity-90"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Популярные категории
            </h2>
            <p className="text-lg text-gray-600">
              Откройте для себя лучшие товары в каждой категории
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <div
                key={category.id}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-90`}
                ></div>
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                  <p className="text-white/90 mb-4">{category.description}</p>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-fit bg-white/20 text-white border-white/30 hover:bg-white/30"
                  >
                    Перейти в каталог
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Рекомендуемые товары
              </h2>
              <p className="text-lg text-gray-600">
                Специально отобранные для вас
              </p>
            </div>
            <Button variant="outline" size="lg">
              Смотреть все
              <Icon name="ArrowRight" className="ml-2" size={16} />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-blue-600 text-white">
                    {product.badge}
                  </Badge>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      <Icon
                        name="Star"
                        className="text-yellow-400 fill-current"
                        size={16}
                      />
                      <span className="text-sm text-gray-600 ml-1">
                        {product.rating}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      ({product.reviews})
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-900">
                        {product.price.toLocaleString()} ₽
                      </span>
                      {product.oldPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          {product.oldPrice.toLocaleString()} ₽
                        </span>
                      )}
                    </div>
                  </div>

                  <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                    В корзину
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Наши партнёры
            </h2>
            <p className="text-gray-600">
              Работаем только с проверенными брендами
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {brands.map((brand, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity duration-200"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Готовы найти идеальный товар?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Более 10,000 товаров с быстрой доставкой и гарантией качества
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 px-8"
            >
              Начать покупки
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 px-8"
            >
              Связаться с нами
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
