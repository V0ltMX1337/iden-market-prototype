import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary">IdenMarket</h1>
              <Badge variant="secondary" className="ml-2 text-xs">
                beta
              </Badge>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-primary">
                О платформе
              </a>
              <a
                href="#categories"
                className="text-gray-600 hover:text-primary"
              >
                Категории
              </a>
              <a href="#sellers" className="text-gray-600 hover:text-primary">
                Продавцам
              </a>
              <Button onClick={() => navigate("/marketplace")}>
                Перейти в каталог
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-purple-600 to-indigo-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-white/20 text-white border-white/30">
                  🚀 Новая эра покупок
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Твой <span className="text-yellow-300">идеальный</span>{" "}
                  маркетплейс
                </h1>
                <p className="text-xl text-white/90 leading-relaxed">
                  Миллионы товаров, тысячи продавцов, одна платформа. Покупай
                  выгодно, продавай успешно.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4"
                  onClick={() => navigate("/marketplace")}
                >
                  <Icon name="ShoppingBag" size={20} className="mr-2" />
                  Начать покупки
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4"
                >
                  <Icon name="Store" size={20} className="mr-2" />
                  Стать продавцом
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-6">
                  Статистика платформы
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-300">
                      2.5М+
                    </div>
                    <div className="text-sm text-white/80">Товаров</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-300">
                      50К+
                    </div>
                    <div className="text-sm text-white/80">Продавцов</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-300">
                      1М+
                    </div>
                    <div className="text-sm text-white/80">Покупателей</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-300">
                      99.8%
                    </div>
                    <div className="text-sm text-white/80">
                      Довольных клиентов
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
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
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Icon name="Shield" size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Безопасность покупок
              </h3>
              <p className="text-gray-600">
                Защита платежей, проверенные продавцы и гарантия возврата денег
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Icon name="Zap" size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Быстрая доставка
              </h3>
              <p className="text-gray-600">
                Доставка по всей России от 1 дня. Экспресс-доставка в крупных
                городах
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Icon name="Star" size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Лучшие цены
              </h3>
              <p className="text-gray-600">
                Сравнивайте цены от разных продавцов и выбирайте самые выгодные
                предложения
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Популярные категории
            </h2>
            <p className="text-xl text-gray-600">
              Найдите всё что нужно в нашем огромном каталоге
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                name: "Электроника",
                icon: "Smartphone",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                name: "Одежда",
                icon: "Shirt",
                gradient: "from-pink-500 to-rose-500",
              },
              {
                name: "Дом и сад",
                icon: "Home",
                gradient: "from-green-500 to-emerald-500",
              },
              {
                name: "Спорт",
                icon: "Dumbbell",
                gradient: "from-orange-500 to-amber-500",
              },
              {
                name: "Красота",
                icon: "Sparkles",
                gradient: "from-purple-500 to-violet-500",
              },
              {
                name: "Авто",
                icon: "Car",
                gradient: "from-gray-600 to-gray-800",
              },
              {
                name: "Книги",
                icon: "Book",
                gradient: "from-indigo-500 to-blue-600",
              },
              {
                name: "Игрушки",
                icon: "Gamepad2",
                gradient: "from-red-500 to-pink-500",
              },
            ].map((category, index) => (
              <div
                key={index}
                className="group cursor-pointer"
                onClick={() => navigate("/marketplace")}
              >
                <div
                  className={`bg-gradient-to-br ${category.gradient} rounded-xl p-6 text-white text-center hover:scale-105 transition-transform duration-200`}
                >
                  <Icon
                    name={category.icon}
                    size={40}
                    className="mx-auto mb-3"
                  />
                  <h3 className="font-semibold">{category.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Готовы начать?</h2>
          <p className="text-xl mb-8 text-white/90">
            Присоединяйтесь к миллионам довольных покупателей
          </p>
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4"
            onClick={() => navigate("/marketplace")}
          >
            <Icon name="ArrowRight" size={20} className="mr-2" />
            Перейти к покупкам
          </Button>
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

export default LandingPage;
