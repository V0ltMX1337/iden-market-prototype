import Header from "@/components/marketplace/Header";
import Footer from "@/components/marketplace/Footer";
import ProductSwiper from "@/components/ProductSwiper";

const Index = () => {

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
      <Footer />
    </div>
  );
};

export default Index;
