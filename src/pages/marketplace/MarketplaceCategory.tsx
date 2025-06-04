import Header from "@/components/marketplace/Header";
import Footer from "@/components/marketplace/Footer";
import CategoryFilter from "@/components/marketplace/category/CategoryFilter";
import ProductGrid from "@/components/marketplace/category/ProductGrid";
import BrandFilter from "@/components/marketplace/category/BrandFilter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Input } from "@/components/ui/input";

const MarketplaceCategory = () => {
  return (
    <div className="min-h-screen bg-white font-roboto">
      <Header />

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          <a href="/" className="hover:text-primary">
            Каталог
          </a>
          <Icon name="ChevronRight" size={16} />
          <a href="#" className="hover:text-primary">
            Смартфоны
          </a>
          <Icon name="ChevronRight" size={16} />
          <span className="text-gray-900">Смартфоны</span>
        </nav>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Category Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Смартфоны
              </h1>
              <p className="text-gray-600">3540 товаров</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-1"
              >
                <Icon name="SlidersHorizontal" size={16} />
                <span>По популярности</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-1"
              >
                <Icon name="Filter" size={16} />
                <span>Фильтр</span>
                <Badge variant="secondary" className="ml-1">
                  32
                </Badge>
              </Button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Button variant="default" size="sm">
              iOS
            </Button>
            <Button variant="outline" size="sm">
              Android
            </Button>
            <Button variant="outline" size="sm">
              Камерафоны
            </Button>
            <Button variant="outline" size="sm">
              Флагманы
            </Button>
            <Button variant="outline" size="sm">
              Бюджетные
            </Button>
            <Button variant="outline" size="sm">
              Все для смартфонов
            </Button>
          </div>

          {/* Brand Filter */}
          <BrandFilter />
        </div>

        <div className="flex gap-8">
          {/* Products Section */}
          <main className="flex-1">
            <ProductGrid />
          </main>

          {/* Sidebar Filters - Moved to right */}
          <aside className="w-72 flex-shrink-0">
            <CategoryFilter />
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MarketplaceCategory;
