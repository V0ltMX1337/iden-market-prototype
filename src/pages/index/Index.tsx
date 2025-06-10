import Header from "@/components/marketplace/Header";
import Footer from "@/components/marketplace/Footer";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useState } from "react";

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=500&fit=crop",
      title: "Летняя распродажа",
      subtitle: "Скидки до 70% на все товары",
      buttonText: "Купить сейчас",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=500&fit=crop",
      title: "Новая коллекция",
      subtitle: "Технологии будущего уже здесь",
      buttonText: "Посмотреть",
    },
  ];

  const categories = [
    {
      id: 1,
      name: "Электроника",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop",
      count: "1,234 товара",
    },
    {
      id: 2,
      name: "Одежда",
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=200&fit=crop",
      count: "856 товаров",
    },
    {
      id: 3,
      name: "Дом и сад",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
      count: "642 товара",
    },
    {
      id: 4,
      name: "Спорт",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
      count: "423 товара",
    },
    {
      id: 5,
      name: "Красота",
      image:
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&h=200&fit=crop",
      count: "789 товаров",
    },
    {
      id: 6,
      name: "Игрушки",
      image:
        "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=300&h=200&fit=crop",
      count: "345 товаров",
    },
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "iPhone 15 Pro",
      price: 89999,
      oldPrice: 119999,
      image:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop",
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
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop",
      rating: 4.9,
      reviews: 189,
      badge: "Новинка",
    },
    {
      id: 3,
      name: "Nike Air Max",
      price: 7999,
      oldPrice: 12999,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
      rating: 4.7,
      reviews: 342,
      badge: "Скидка -38%",
    },
    {
      id: 4,
      name: 'Samsung TV 55"',
      price: 45999,
      oldPrice: 65999,
      image:
        "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&h=300&fit=crop",
      rating: 4.6,
      reviews: 128,
      badge: "Топ выбор",
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Анна Петрова",
      rating: 5,
      text: "Отличный сервис! Быстрая доставка и качественные товары. Рекомендую всем!",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b743?w=100&h=100&fit=crop",
    },
    {
      id: 2,
      name: "Михаил Сидоров",
      rating: 5,
      text: "Покупаю здесь уже несколько лет. Всегда довольны качеством и ценами.",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
    {
      id: 3,
      name: "Елена Козлова",
      rating: 4,
      text: "Хороший выбор товаров, удобный сайт. Единственный минус - иногда долгая доставка.",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroSlides[currentSlide].image}
            alt={heroSlides[currentSlide].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white max-w-2xl px-4">
            <h1 className="text-5xl font-bold mb-4">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-xl mb-8">{heroSlides[currentSlide].subtitle}</p>
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
            >
              {heroSlides[currentSlide].buttonText}
            </Button>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
          onClick={prevSlide}
        >
          <Icon name="ChevronLeft" size={20} />
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
          onClick={nextSlide}
        >
          <Icon name="ChevronRight" size={20} />
        </Button>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Truck" size={32} className="text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Быстрая доставка</h3>
              <p className="text-gray-600">
                Доставка по всей России за 1-3 дня
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Shield" size={32} className="text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Гарантия качества</h3>
              <p className="text-gray-600">100% оригинальные товары</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="CreditCard" size={32} className="text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Удобная оплата</h3>
              <p className="text-gray-600">Различные способы оплаты</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Headphones" size={32} className="text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Поддержка 24/7</h3>
              <p className="text-gray-600">Всегда готовы помочь</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Популярные категории
            </h2>
            <p className="text-lg text-gray-600">
              Выберите категорию и найдите именно то, что ищете
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="relative group overflow-hidden rounded-lg cursor-pointer transform hover:scale-105 transition-all duration-300"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center text-center text-white">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.count}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Рекомендуемые товары
            </h2>
            <p className="text-lg text-gray-600">
              Лучшие предложения специально для вас
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                      {product.badge}
                    </span>
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="p-2 bg-white/90 hover:bg-white"
                    >
                      <Icon name="Heart" size={16} />
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={14}
                          className={`${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      ({product.reviews})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold text-gray-900">
                        {product.price.toLocaleString()}₽
                      </span>
                      {product.oldPrice && (
                        <span className="text-sm text-gray-500 line-through ml-2">
                          {product.oldPrice.toLocaleString()}₽
                        </span>
                      )}
                    </div>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Icon name="ShoppingCart" size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">
              Скидки до 50% на электронику!
            </h2>
            <p className="text-xl mb-8">
              Не упустите шанс купить технику мечты по выгодной цене
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Посмотреть предложения
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Что говорят наши клиенты
            </h2>
            <p className="text-lg text-gray-600">
              Отзывы покупателей о нашем сервисе
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-lg p-6 shadow-md"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <div className="flex items-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={12}
                          className="text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Подпишитесь на новости
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Получайте информацию о новых товарах и специальных предложениях
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Введите ваш email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-r-lg">
              Подписаться
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
