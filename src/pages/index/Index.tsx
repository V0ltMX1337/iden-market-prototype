import Header from "@/components/marketplace/Header";
import Sidebar from "@/components/marketplace/Sidebar";
import ProductStories from "@/components/marketplace/ProductStories";
import PromoSection from "@/components/marketplace/PromoSection";
import Categories from "@/components/marketplace/Categories";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 max-w-5xl">
          <div className="p-6">
            {/* Хлебные крошки */}
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
              <span className="hover:text-indigo-600 cursor-pointer">
                Каталог
              </span>
              <span>〈</span>
              <span className="text-indigo-600 font-medium">Смартфоны</span>
            </div>

            {/* Заголовок страницы */}
            <div className="flex items-center mb-8">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white text-lg">📱</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Смартфоны</h1>
            </div>

            <ProductStories />
            <PromoSection />
            <Categories />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
