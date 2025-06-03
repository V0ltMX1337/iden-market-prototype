import Header from "@/components/marketplace/Header";
import Footer from "@/components/marketplace/Footer";
import CategoryFilter from "@/components/marketplace/category/CategoryFilter";
import ProductGrid from "@/components/marketplace/category/ProductGrid";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const MarketplaceCategory = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-roboto">
      <Header />

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
    <Footer></Footer>
    </div>
  );
};

export default MarketplaceCategory;
