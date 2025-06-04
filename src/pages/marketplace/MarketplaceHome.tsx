import Header from "@/components/marketplace/Header";
import Footer from "@/components/marketplace/Footer";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const MarketplaceHome = () => {
  return (
    <div className="min-h-screen bg-white font-roboto">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Маркетплейс техники
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Найдите лучшие предложения на смартфоны, ноутбуки и другую технику
          </p>
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            Начать покупки
          </Button>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Популярные категории
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <a href="/marketplace/category" className="group">
              <div className="bg-gray-100 rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
                <Icon
                  name="Smartphone"
                  size={48}
                  className="mx-auto mb-4 text-blue-600"
                />
                <h3 className="font-semibold text-gray-900">Смартфоны</h3>
                <p className="text-sm text-gray-600 mt-1">3540 товаров</p>
              </div>
            </a>
            <div className="bg-gray-100 rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
              <Icon
                name="Laptop"
                size={48}
                className="mx-auto mb-4 text-purple-600"
              />
              <h3 className="font-semibold text-gray-900">Ноутбуки</h3>
              <p className="text-sm text-gray-600 mt-1">1250 товаров</p>
            </div>
            <div className="bg-gray-100 rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
              <Icon
                name="Headphones"
                size={48}
                className="mx-auto mb-4 text-green-600"
              />
              <h3 className="font-semibold text-gray-900">Наушники</h3>
              <p className="text-sm text-gray-600 mt-1">890 товаров</p>
            </div>
            <div className="bg-gray-100 rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
              <Icon
                name="Watch"
                size={48}
                className="mx-auto mb-4 text-red-600"
              />
              <h3 className="font-semibold text-gray-900">Часы</h3>
              <p className="text-sm text-gray-600 mt-1">420 товаров</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MarketplaceHome;
