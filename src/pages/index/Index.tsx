import Header from "@/components/marketplace/Header";
import Footer from "@/components/marketplace/Footer";
import ProductSwiper from "@/components/ProductSwiper";

const Index = () => {

  const products = [
    {
      id: 1,
      name: "Телевизор Sber SDX- 43F2012S, 43»(109 см), FHD",
      price: 35990,
      originalPrice: 39990,
      image:
        "https://themes.ewonta.com/demo/350-home_default/hummingbird-vector-graphics.webp",
      rating: 5,
      badge: "ХИТ",
      badgeColor: "bg-red-500",
    },
    {
      id: 2,
      name: "Смартфон Apple iPhone 15 Pro 256GB Natural Titanium",
      price: 18990,
      originalPrice: 19990,
      image:
        "https://themes.ewonta.com/demo/390-home_default/brown-bear-vector-graphics.webp",
      rating: 4,
      badge: "СКИДКА",
      badgeColor: "bg-orange-500",
    },
    {
      id: 3,
      name: "Фен Dyson HD07 1600 Вт синий, розовый",
      price: 8990,
      image:
        "https://themes.ewonta.com/demo/383-home_default/today-is-a-good-day-framed-poster.webp",
      rating: 5,
      badge: "НОВОЕ",
      badgeColor: "bg-green-500",
    },
    {
      id: 4,
      name: "Планшет Samsung Galaxy",
      price: 25990,
      image: "https://themes.ewonta.com/demo/339-home_default/mountain-fox-vector-graphics.webp",
      rating: 4,
      badge: "ТОП",
      badgeColor: "bg-purple-500",
    },
    {
      id: 5,
      name: "Камера GoPro Hero",
      price: 32990,
      image:
        "https://themes.ewonta.com/demo/343-home_default/brown-bear-vector-graphics.webp",
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
        "https://themes.ewonta.com/demo/343-home_default/brown-bear-vector-graphics.webp",
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
