import ProductCard from "./ProductCard";

const ProductGrid = () => {
  const products = [
    {
      id: 1,
      title: "Смартфон Apple iPhone 12 mini 64GB, Синий",
      price: 69990,
      oldPrice: 89990,
      rating: 4.8,
      reviewsCount: 1247,
      image:
        "https://cdn.poehali.dev/files/744e06b0-34bb-43dc-9edc-4548e85a5d88.png",
      seller: "Apple Store",
      sellerRating: 4.9,
      isVerifiedSeller: true,
      isSafeTransaction: true,
      discount: 22,
      isDeliveryFree: true,
      features: ["iOS 14+", "A14 Bionic", "64 ГБ"],
      specs: {
        screen: "5.4''2340×1080 Пикс",
        technology: "OLED",
        memory: "64 ГБ",
        camera: "12Мп",
      },
    },
    {
      id: 2,
      title: "Смартфон Samsung Galaxy S21 128GB, Phantom Gray",
      price: 74990,
      oldPrice: null,
      rating: 4.7,
      reviewsCount: 892,
      image:
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop&crop=center",
      seller: "Samsung Official",
      sellerRating: 4.8,
      isVerifiedSeller: true,
      isSafeTransaction: true,
      discount: null,
      isDeliveryFree: true,
      features: ["Android", "Samsung"],
      specs: {
        screen: "6.2''2340×1080 Пикс",
        technology: "OLED",
        memory: "64 ГБ",
        camera: "12Мп",
      },
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};

export default ProductGrid;
