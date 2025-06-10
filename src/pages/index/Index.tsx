import React, { useState } from "react";
import Header from "@/components/marketplace/Header";
import Footer from "@/components/marketplace/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import ProductSwiper from "@/components/ProductSwiper";

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const bannerSlides = [
    {
      title: "СМАРТФОНЫ",
      subtitle: "Последние модели",
      description: "Откройте для себя новейшие технологии",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop",
      buttonText: "Смотреть все",
      bgColor: "from-blue-600 to-purple-700",
    },
    {
      title: "НАУШНИКИ",
      subtitle: "Премиум звук",
      description: "Беспроводные и проводные модели",
      image:
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop",
      buttonText: "Купить сейчас",
      bgColor: "from-purple-600 to-pink-600",
    },
  ];

  const categories = [
    {
      name: "Смартфоны",
      count: "124 товара",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop",
    },
    {
      name: "Наушники",
      count: "86 товаров",
      image:
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&h=200&fit=crop",
    },
    {
      name: "Ноутбуки",
      count: "45 товаров",
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop",
    },
    {
      name: "Планшеты",
      count: "67 товаров",
      image:
        "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=300&h=200&fit=crop",
    },
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      price: 119999,
      oldPrice: 139999,
      image:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop",
      rating: 4.9,
      isNew: true,
      discount: 15,
    },
    {
      id: 2,
      name: "Samsung Galaxy S24",
      price: 89999,
      oldPrice: 99999,
      image:
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300&h=300&fit=crop",
      rating: 4.8,
      isNew: false,
      discount: 10,
    },
    {
      id: 3,
      name: "MacBook Pro M3",
      price: 189999,
      oldPrice: 219999,
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop",
      rating: 4.9,
      isNew: true,
      discount: 14,
    },
    {
      id: 4,
      name: "AirPods Pro 2",
      price: 24999,
      oldPrice: 29999,
      image:
        "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=300&h=300&fit=crop",
      rating: 4.7,
      isNew: false,
      discount: 17,
    },
    {
      id: 5,
      name: "iPad Pro 12.9",
      price: 134999,
      oldPrice: 154999,
      image:
        "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=300&h=300&fit=crop",
      rating: 4.8,
      isNew: true,
      discount: 13,
    },
    {
      id: 6,
      name: "Sony WH-1000XM5",
      price: 34999,
      oldPrice: 39999,
      image:
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&h=300&fit=crop",
      rating: 4.9,
      isNew: false,
      discount: 13,
    },
  ];

  const products = [
    {
      id: 1,
      name: "Смарт-часы Apple Watch",
      price: 35990,
      originalPrice: 39990,
      image:
        "https://cdn.poehali.dev/files/bb9b2af8-e78f-4a2f-9dea-c6b6c42ace47.png",
      rating: 5,
      badge: "ХИТ",
      badgeColor: "bg-red-500",
    },
    {
      id: 2,
      name: "Беспроводные наушники Sony",
      price: 18990,
      originalPrice: 19990,
      image:
        "https://cdn.poehali.dev/files/5f5dd5dd-9b36-43b1-9b6c-36e12c6d1a89.png",
      rating: 4,
      badge: "СКИДКА",
      badgeColor: "bg-orange-500",
    },
    {
      id: 3,
      name: "Наушники Bluetooth розовые",
      price: 8990,
      image:
        "https://cdn.poehali.dev/files/f4d00396-1810-4907-9b1a-fd1239d9e135.png",
      rating: 5,
      badge: "НОВОЕ",
      badgeColor: "bg-green-500",
    },
    {
      id: 4,
      name: "Планшет Samsung Galaxy",
      price: 25990,
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400",
      rating: 4,
      badge: "ТОП",
      badgeColor: "bg-purple-500",
    },
    {
      id: 5,
      name: "Камера GoPro Hero",
      price: 32990,
      image:
        "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400",
      rating: 5,
      badge: "ЭКСКЛЮЗИВ",
      badgeColor: "bg-indigo-500",
    },
    {
      id: 6,
      name: "Игровая мышь Razer",
      price: 7990,
      originalPrice: 9990,
      image:
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
      rating: 4,
      badge: "ГЕЙМЕР",
      badgeColor: "bg-cyan-500",
    },
  ];

  const brands = [
    {
      name: "Apple",
      logo: "https://images.unsplash.com/photo-1621768216002-5ac171876625?w=120&h=60&fit=crop",
    },
    {
      name: "Samsung",
      logo: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=120&h=60&fit=crop",
    },
    {
      name: "Sony",
      logo: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=120&h=60&fit=crop",
    },
    {
      name: "Xiaomi",
      logo: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=120&h=60&fit=crop",
    },
    {
      name: "Huawei",
      logo: "https://images.unsplash.com/photo-1559526324-593bc073d938?w=120&h=60&fit=crop",
    },
    {
      name: "LG",
      logo: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=120&h=60&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Слайдер */}
      <div className="w-full flex justify-center">
        <img
          src="https://themes.ewonta.com/demo/modules/homeblocks/views/img/img_home/slider-37-2-1.webp?t=1749571081"
          alt="Баннер"
          className="max-w-full h-auto"
          style={{ maxWidth: "1410px" }}
        />
      </div>

      {/* Hero slider остается */}

      {/* Остальной контент страницы */}
      <section className="py-8 bg-white">
        <div className="max-w-[1410px] mx-auto px-4">
          <div className="flex items-start mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Новинки</h2>
          </div>

          <div
            className="overflow-hidden bg-gray-50 rounded-lg"
            style={{ width: "1410px", height: "526px" }}
          >
            <div className="grid grid-cols-5 h-full" style={{ gap: "5px" }}>
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="relative h-full flex flex-col">
                  <img
                    src="https://cdn.poehali.dev/files/b22099be-e4a7-4c98-8c88-c4639765fc95.png"
                    alt="Смарт-часы Apple Watch"
                    className="w-full flex-1 object-cover"
                  />
                  <Badge className="absolute top-2 left-2 bg-green-500 text-white text-xs">
                    НОВОЕ
                  </Badge>
                  <Button
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 hover:opacity-100 transition-opacity p-2 h-8 w-8"
                  >
                    <Icon name="Heart" size={12} />
                  </Button>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">
                      Смарт-часы Apple Watch
                    </h3>
                    <div className="flex items-center gap-1 mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            size={14}
                            className="text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="text-xl font-bold text-gray-900">
                        39 990 ₽
                      </div>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        В корзину
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-56 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden">
                <div className="relative">
                  <img
                    src="https://cdn.poehali.dev/files/9cd75def-2506-4cee-9ece-5a2c67522a60.png"
                    alt="Фен Dyson"
                    className="w-56 h-56 object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-2 left-2 bg-green-500 text-white text-xs">
                    НОВОЕ
                  </Badge>
                  <div className="absolute top-2 left-16">
                    <Badge className="bg-blue-500 text-white text-xs">
                      НЕТ В НАЛИЧИИ
                    </Badge>
                  </div>
                  <Button
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 hover:opacity-100 transition-opacity p-2 h-8 w-8"
                  >
                    <Icon name="Heart" size={12} />
                  </Button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    Фен Dyson HD07 Professional
                  </h3>
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={14}
                          className="text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="text-xl font-bold text-gray-900">
                      29 990 ₽
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Подробнее
                    </Button>
                  </div>
                </div>
              </div>

              <div className="w-56 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden">
                <div className="relative">
                  <img
                    src="https://cdn.poehali.dev/files/b726d1d2-119e-4b15-896c-9076dfb80f43.png"
                    alt="Колонка Mountain Fox"
                    className="w-56 h-56 object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-2 left-2 bg-green-500 text-white text-xs">
                    НОВОЕ
                  </Badge>
                  <div className="absolute top-2 left-16">
                    <Badge className="bg-red-500 text-white text-xs">
                      -1 000 ₽
                    </Badge>
                  </div>
                  <Button
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 hover:opacity-100 transition-opacity p-2 h-8 w-8"
                  >
                    <Icon name="Heart" size={12} />
                  </Button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    Колонка Mountain Fox Vector
                  </h3>
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex">
                      {[...Array(4)].map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={14}
                          className="text-yellow-400 fill-current"
                        />
                      ))}
                      <Icon name="Star" size={14} className="text-gray-300" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex flex-col">
                      <span className="text-xl font-bold text-gray-900">
                        18 990 ₽
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        19 990 ₽
                      </span>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      В корзину
                    </Button>
                  </div>
                </div>
              </div>

              <div className="w-56 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden">
                <div className="relative">
                  <img
                    src="https://cdn.poehali.dev/files/f4d00396-1810-4907-9b1a-fd1239d9e135.png"
                    alt="Наушники розовые"
                    className="w-56 h-56 object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-2 left-2 bg-green-500 text-white text-xs">
                    НОВОЕ
                  </Badge>
                  <Button
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 hover:opacity-100 transition-opacity p-2 h-8 w-8"
                  >
                    <Icon name="Heart" size={12} />
                  </Button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    Наушники Bluetooth розовые
                  </h3>
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={14}
                          className="text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="text-xl font-bold text-gray-900">
                      8 990 ₽
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      В корзину
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Новинки</h2>
            <p className="text-lg text-gray-600">
              Самые свежие поступления в нашем магазине
            </p>
          </div>

          <ProductSwiper products={products} />
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Популярные категории
            </h2>
            <p className="text-lg text-gray-600">
              Найдите именно то, что вам нужно
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500">{category.count}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Рекомендуемые товары
              </h2>
              <p className="text-lg text-gray-600">
                Лучшие предложения специально для вас
              </p>
            </div>
            <Button variant="outline" size="lg">
              Смотреть все
              <Icon name="ArrowRight" className="ml-2" size={16} />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 flex flex-col space-y-1">
                    {product.isNew && (
                      <Badge className="bg-green-500 text-white text-xs">
                        Новинка
                      </Badge>
                    )}
                    <Badge className="bg-red-500 text-white text-xs">
                      -{product.discount}%
                    </Badge>
                  </div>
                  <Button
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-2 h-8 w-8"
                  >
                    <Icon name="Heart" size={12} />
                  </Button>
                </div>

                <div className="p-3">
                  <h3 className="font-medium text-sm text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={12}
                          className={
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">
                      ({product.rating})
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900">
                          {product.price.toLocaleString()} ₽
                        </span>
                        {product.oldPrice && (
                          <span className="text-xs text-gray-400 line-through">
                            {product.oldPrice.toLocaleString()} ₽
                          </span>
                        )}
                      </div>
                    </div>

                    <Button
                      size="sm"
                      className="w-full text-xs bg-blue-600 hover:bg-blue-700"
                    >
                      В корзину
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers Banner */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Скидки до 50%</h2>
            <p className="text-xl mb-8">
              На избранные товары. Ограниченное предложение!
            </p>
            <div className="flex justify-center space-x-4">
              <Button
                size="lg"
                className="bg-white text-orange-600 hover:bg-gray-100"
              >
                Смотреть скидки
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Подписаться на уведомления
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Наши бренды
            </h2>
            <p className="text-lg text-gray-600">
              Работаем с ведущими производителями
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {brands.map((brand, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-8 w-auto opacity-60 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Подпишитесь на новости
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Получайте уведомления о новых товарах и специальных предложениях
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <input
              type="email"
              placeholder="Введите ваш email"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-300"
            />
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8">
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
