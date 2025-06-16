import Header from "@/components/marketplace/Header";
import Footer from "@/components/marketplace/Footer";
import ProductSwiper from "@/components/ProductSwiper";
import CategorySwipper from "@/components/CategorySwipper";
import SliderSwiper from "@/components/SliderSwipper";
import { Card } from "@/components/ui/card";
import ProductSales from "@/components/ProductSales";

const Index = () => {

  const sliders = [
    {
      id: 1,
      name: "Слайдер 1",
      image:
        "https://themes.ewonta.com/demo/modules/homeblocks/views/img/img_home/slider-37-1-1.webp?t=1749596117",
    },
    {
      id: 2,
      name: "Слайдер 2",
      image:
        "https://themes.ewonta.com/demo/modules/homeblocks/views/img/img_home/slider-37-2-1.webp?t=1749571081",
    },
  ];

  const categories = [
    {
      id: 1,
      name: "Детям",
      image:
        "https://themes.ewonta.com/demo/modules/thememanager/views/img/category_icon/21.webp?t=1749592297",
    },
    {
      id: 2,
      name: "Мужчинам",
      image:
        "https://themes.ewonta.com/demo/modules/thememanager/views/img/category_icon/25.webp?t=1749592297",
    },
    {
      id: 3,
      name: "Дом",
      image:
        "https://themes.ewonta.com/demo/modules/thememanager/views/img/category_icon/29.webp?t=1749592297",
    },
    {
      id: 4,
      name: "Красота",
      image:
        "https://themes.ewonta.com/demo/modules/thememanager/views/img/category_icon/33.webp?t=1749592297",
    },
    {
      id: 5,
      name: "Аксессуары",
      image:
        "https://themes.ewonta.com/demo/modules/thememanager/views/img/category_icon/37.webp?t=1749592297",
    },
    {
      id: 6,
      name: "Электроника",
      image:
        "https://themes.ewonta.com/demo/modules/thememanager/views/img/category_icon/38.webp?t=1749592297",
    },
  ];

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
    {
      id: 7,
      name: "Ноутбук MacBook Air M2",
      price: 120990,
      originalPrice: 135990,
      image:
        "https://themes.ewonta.com/demo/350-home_default/hummingbird-vector-graphics.webp",
      rating: 5,
      badge: "ПРЕМИУМ",
      badgeColor: "bg-gold-500",
    },
    {
      id: 8,
      name: "Наушники Sony WH-1000XM5",
      price: 32990,
      image:
        "https://themes.ewonta.com/demo/390-home_default/brown-bear-vector-graphics.webp",
      rating: 5,
      badge: "ЗВУК",
      badgeColor: "bg-blue-500",
    },
    {
      id: 9,
      name: "Умные часы Apple Watch Ultra",
      price: 89990,
      originalPrice: 99990,
      image:
        "https://themes.ewonta.com/demo/383-home_default/today-is-a-good-day-framed-poster.webp",
      rating: 4,
      badge: "СПОРТ",
      badgeColor: "bg-red-500",
    },
    {
      id: 10,
      name: "Клавиатура механическая Corsair",
      price: 15990,
      image:
        "https://themes.ewonta.com/demo/339-home_default/mountain-fox-vector-graphics.webp",
      rating: 4,
      badge: "RGB",
      badgeColor: "bg-purple-500",
    },
    {
      id: 11,
      name: "Монитор LG UltraWide 34»",
      price: 75990,
      originalPrice: 89990,
      image:
        "https://themes.ewonta.com/demo/343-home_default/brown-bear-vector-graphics.webp",
      rating: 5,
      badge: "4K",
      badgeColor: "bg-green-500",
    },
    {
      id: 12,
      name: "Видеокарта NVIDIA RTX 4080",
      price: 169990,
      image:
        "https://themes.ewonta.com/demo/350-home_default/hummingbird-vector-graphics.webp",
      rating: 5,
      badge: "ГЕЙМЕР",
      badgeColor: "bg-orange-500",
    },
  ];

  const product_sales = [
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
    {
      id: 7,
      name: "Ноутбук MacBook Air M2",
      price: 120990,
      originalPrice: 135990,
      image:
        "https://themes.ewonta.com/demo/350-home_default/hummingbird-vector-graphics.webp",
      rating: 5,
      badge: "ПРЕМИУМ",
      badgeColor: "bg-gold-500",
    },
    {
      id: 8,
      name: "Наушники Sony WH-1000XM5",
      price: 32990,
      image:
        "https://themes.ewonta.com/demo/390-home_default/brown-bear-vector-graphics.webp",
      rating: 5,
      badge: "ЗВУК",
      badgeColor: "bg-blue-500",
    },
    {
      id: 9,
      name: "Умные часы Apple Watch Ultra",
      price: 89990,
      originalPrice: 99990,
      image:
        "https://themes.ewonta.com/demo/383-home_default/today-is-a-good-day-framed-poster.webp",
      rating: 4,
      badge: "СПОРТ",
      badgeColor: "bg-red-500",
    },
    {
      id: 10,
      name: "Клавиатура механическая Corsair",
      price: 15990,
      image:
        "https://themes.ewonta.com/demo/339-home_default/mountain-fox-vector-graphics.webp",
      rating: 4,
      badge: "RGB",
      badgeColor: "bg-purple-500",
    },
    {
      id: 11,
      name: "Монитор LG UltraWide 34»",
      price: 75990,
      originalPrice: 89990,
      image:
        "https://themes.ewonta.com/demo/343-home_default/brown-bear-vector-graphics.webp",
      rating: 5,
      badge: "4K",
      badgeColor: "bg-green-500",
    },
    {
      id: 12,
      name: "Видеокарта NVIDIA RTX 4080",
      price: 169990,
      image:
        "https://themes.ewonta.com/demo/350-home_default/hummingbird-vector-graphics.webp",
      rating: 5,
      badge: "ГЕЙМЕР",
      badgeColor: "bg-orange-500",
    },
    {
      id: 13,
      name: "Умные часы Apple Watch Ultra",
      price: 89990,
      originalPrice: 99990,
      image:
        "https://themes.ewonta.com/demo/383-home_default/today-is-a-good-day-framed-poster.webp",
      rating: 4,
      badge: "СПОРТ",
      badgeColor: "bg-red-500",
    },
    {
      id: 14,
      name: "Клавиатура механическая Corsair",
      price: 15990,
      image:
        "https://themes.ewonta.com/demo/339-home_default/mountain-fox-vector-graphics.webp",
      rating: 4,
      badge: "RGB",
      badgeColor: "bg-purple-500",
    },
    {
      id: 15,
      name: "Монитор LG UltraWide 34»",
      price: 75990,
      originalPrice: 89990,
      image:
        "https://themes.ewonta.com/demo/343-home_default/brown-bear-vector-graphics.webp",
      rating: 5,
      badge: "4K",
      badgeColor: "bg-green-500",
    },
    {
      id: 16,
      name: "Видеокарта NVIDIA RTX 4080",
      price: 169990,
      image:
        "https://themes.ewonta.com/demo/350-home_default/hummingbird-vector-graphics.webp",
      rating: 5,
      badge: "ГЕЙМЕР",
      badgeColor: "bg-orange-500",
    },

    {
      id: 17,
      name: "Видеокарта NVIDIA RTX 4080",
      price: 169990,
      image:
        "https://themes.ewonta.com/demo/350-home_default/hummingbird-vector-graphics.webp",
      rating: 5,
      badge: "ГЕЙМЕР",
      badgeColor: "bg-orange-500",
    },
    {
      id: 18,
      name: "Видеокарта NVIDIA RTX 4080",
      price: 169990,
      image:
        "https://themes.ewonta.com/demo/350-home_default/hummingbird-vector-graphics.webp",
      rating: 5,
      badge: "ГЕЙМЕР",
      badgeColor: "bg-orange-500",
    },
    {
      id: 19,
      name: "Видеокарта NVIDIA RTX 4080",
      price: 169990,
      image:
        "https://themes.ewonta.com/demo/350-home_default/hummingbird-vector-graphics.webp",
      rating: 5,
      badge: "ГЕЙМЕР",
      badgeColor: "bg-orange-500",
    },
    {
      id: 20,
      name: "Видеокарта NVIDIA RTX 4080",
      price: 169990,
      image:
        "https://themes.ewonta.com/demo/350-home_default/hummingbird-vector-graphics.webp",
      rating: 5,
      badge: "ГЕЙМЕР",
      badgeColor: "bg-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Добавляем паддинг снизу хедера, чтобы контент не перекрывался */}
      <Header />

      {/* Слайдер */}
      <section style={{ paddingTop: "1.563rem" }}>
        <SliderSwiper slideres={sliders} />
      </section>

      {/* New Products Section */}
      <section style={{ paddingTop: "1.563rem" }}>
        <ProductSwiper products={products} />
      </section>

      {/* Баннер */}
      <section style={{ paddingTop: "1.563rem" }}>
        <div className="w-full flex justify-center">
          <img
            src="https://themes.ewonta.com/demo/modules/homeblocks/views/img/img_home/40-1-1.webp?t=1749592297"
            alt="Баннер"
            className="max-w-full h-auto"
            style={{ maxWidth: "1410px" }}
          />
        </div>
      </section>

      {/* New Products Section */}
      <section style={{ paddingTop: "1.563rem" }}>
        <CategorySwipper products={categories} />
      </section>

      {/* Баннер */}
      <section style={{ paddingTop: "1.563rem" }}>
        <ProductSales products={product_sales} />
      </section>
      <Footer />
    </div>
  );
};

export default Index;
