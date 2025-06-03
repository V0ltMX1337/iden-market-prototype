import Header from "@/components/Header";
import CategoryFilter from "@/components/CategoryFilter";
import ProductGrid from "@/components/ProductGrid";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const Marketplace = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-roboto">
      <Header />

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-primary to-purple-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Скидки до 70%</h2>
              <p className="text-lg opacity-90">На электронику и аксессуары</p>
            </div>
            <Button variant="secondary" size="lg">
              Смотреть акции
            </Button>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          <a href="/" className="hover:text-primary">
            Главная
          </a>
          <Icon name="ChevronRight" size={16} />
          <a href="#" className="hover:text-primary">
            Электроника
          </a>
          <Icon name="ChevronRight" size={16} />
          <span className="text-gray-900">Компьютеры</span>
        </nav>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <CategoryFilter />
          </aside>

          {/* Products Section */}
          <main className="flex-1">
            {/* Sort and View Options */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-gray-900">Компьютеры</h1>
                <Badge variant="secondary">1 товар</Badge>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Сортировка:</span>
                <select className="text-sm border border-gray-300 rounded-md px-3 py-1">
                  <option>По популярности</option>
                  <option>По цене ↑</option>
                  <option>По цене ↓</option>
                  <option>По рейтингу</option>
                  <option>По новизне</option>
                </select>
              </div>
            </div>

            {/* Active Filters */}
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-sm text-gray-600">Применены фильтры:</span>
              <Badge variant="outline" className="flex items-center space-x-1">
                <span>Персональные компьютеры</span>
                <Icon name="X" size={12} className="cursor-pointer" />
              </Badge>
              <Button variant="ghost" size="sm" className="text-primary">
                Очистить все
              </Button>
            </div>

            {/* Products Grid */}
            <ProductGrid />
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">PotionMarket</h3>
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
                <li>📧 support@potionmarket.net</li>
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

export default Marketplace;
