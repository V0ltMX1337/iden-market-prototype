import Header from "@/components/marketplace/Header";
import Footer from "@/components/marketplace/Footer";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useState } from "react";

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    {
      id: 1,
      image:
        "https://iss.s.wik-prod.top/HLpidE4K7ezx9kGBRSpD7APCy38tJM/9c/19/18/86/2c/018d3a99-9c19-7818-862c-43de4676bf8e.jpg",
      title: "Летняя распродажа",
      subtitle: "Скидки до 70% на все товары",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1416&h=400&fit=crop",
      title: "Новая коллекция",
      subtitle: "Технологии будущего уже здесь",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1416&h=400&fit=crop",
      title: "Товары для дома",
      subtitle: "Создайте уют в вашем доме",
    },
  ];

  const categories = [
    { name: "Электроника", icon: "📱", products: "12K+" },
    { name: "Одежда", icon: "👔", products: "8K+" },
    { name: "Дом и сад", icon: "🏠", products: "6K+" },
    { name: "Автотовары", icon: "🚗", products: "4K+" },
    { name: "Спорт", icon: "⚽", products: "3K+" },
  ];

  const saleProducts = [
    {
      id: 1,
      title: "iPhone 15 Pro",
      price: 89999,
      oldPrice: 119999,
      image:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop",
      discount: 25,
    },
    {
      id: 2,
      title: "MacBook Air M2",
      price: 129999,
      oldPrice: 149999,
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop",
      discount: 13,
    },
    {
      id: 3,
      title: "Nike Air Max",
      price: 7999,
      oldPrice: 12999,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
      discount: 38,
    },
    {
      id: 4,
      title: 'Samsung TV 55"',
      price: 45999,
      oldPrice: 65999,
      image:
        "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&h=300&fit=crop",
      discount: 30,
    },
    {
      id: 5,
      title: "Sony WH-1000XM5",
      price: 24999,
      oldPrice: 32999,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      discount: 24,
    },
    {
      id: 6,
      title: "Adidas Ultraboost",
      price: 8999,
      oldPrice: 14999,
      image:
        "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=300&h=300&fit=crop",
      discount: 40,
    },
    {
      id: 7,
      title: "Canon EOS R6",
      price: 159999,
      oldPrice: 189999,
      image:
        "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=300&h=300&fit=crop",
      discount: 16,
    },
    {
      id: 8,
      title: "Dyson V15",
      price: 39999,
      oldPrice: 54999,
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
      discount: 27,
    },
    {
      id: 9,
      title: "iPad Pro 12.9",
      price: 89999,
      oldPrice: 109999,
      image:
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop",
      discount: 18,
    },
    {
      id: 10,
      title: "AirPods Pro",
      price: 19999,
      oldPrice: 24999,
      image:
        "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=300&h=300&fit=crop",
      discount: 20,
    },
    {
      id: 11,
      title: "Tesla Model Y",
      price: 4599999,
      oldPrice: 5199999,
      image:
        "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=300&h=300&fit=crop",
      discount: 12,
    },
    {
      id: 12,
      title: "Gaming Chair",
      price: 25999,
      oldPrice: 35999,
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop",
      discount: 28,
    },
    {
      id: 13,
      title: "Smart Watch",
      price: 15999,
      oldPrice: 22999,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
      discount: 30,
    },
    {
      id: 14,
      title: "Coffee Machine",
      price: 29999,
      oldPrice: 39999,
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop",
      discount: 25,
    },
    {
      id: 15,
      title: "Leather Jacket",
      price: 12999,
      oldPrice: 19999,
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop",
      discount: 35,
    },
    {
      id: 16,
      title: "Wireless Speaker",
      price: 8999,
      oldPrice: 12999,
      image:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop",
      discount: 31,
    },
    {
      id: 17,
      title: "Gaming Laptop",
      price: 89999,
      oldPrice: 119999,
      image:
        "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=300&h=300&fit=crop",
      discount: 25,
    },
    {
      id: 18,
      title: "Drone 4K",
      price: 34999,
      oldPrice: 49999,
      image:
        "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=300&h=300&fit=crop",
      discount: 30,
    },
    {
      id: 19,
      title: "Electric Scooter",
      price: 45999,
      oldPrice: 65999,
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
      discount: 30,
    },
    {
      id: 20,
      title: "Smart Home Kit",
      price: 19999,
      oldPrice: 29999,
      image:
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=300&h=300&fit=crop",
      discount: 33,
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="w-full">
        {/* Banner Slider */}
        <div className="relative mb-8 w-full">
          <div className="w-full h-[400px] overflow-hidden">
            <img
              src={banners[currentSlide].image}
              alt={banners[currentSlide].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-4xl font-bold mb-2">
                  {banners[currentSlide].title}
                </h2>
                <p className="text-xl">{banners[currentSlide].subtitle}</p>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white"
            onClick={prevSlide}
          >
            <Icon name="ChevronLeft" size={20} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white"
            onClick={nextSlide}
          >
            <Icon name="ChevronRight" size={20} />
          </Button>
        </div>

        {/* Categories */}
        <section className="bg-white mb-8">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6">Популярные категории</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Выберите категорию и найдите именно то, что вам нужно
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {categories.map((category) => (
                <div key={category.id} className="cursor-pointer group">
                  <div className="bg-white rounded-3xl p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className="text-6xl mb-6">{category.icon}</div>
                    <h3 className="font-bold text-xl mb-4">{category.name}</h3>
                    <p className="text-gray-500 text-lg">{category.products}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hot Offers */}
        <section className="bg-gray-50 mb-8">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6">Горячие предложения</h2>
              <p className="text-xl text-gray-600">
                Ограниченное время — не упустите свой шанс!
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {saleProducts.slice(0, 6).map((product) => (
                <div key={product.id} className="cursor-pointer group">
                  <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-80 object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-red-500 text-white text-lg px-4 py-2">
                          -{product.discount}%
                        </Badge>
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="font-bold text-xl mb-4">
                        {product.title}
                      </h3>
                      <div className="flex items-center gap-4 mb-6">
                        <span className="text-3xl font-bold text-red-500">
                          {product.price.toLocaleString()} ₽
                        </span>
                        <span className="text-xl text-gray-400 line-through">
                          {product.oldPrice.toLocaleString()} ₽
                        </span>
                      </div>
                      <Button className="w-full h-14 text-lg">В корзину</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default Index;
