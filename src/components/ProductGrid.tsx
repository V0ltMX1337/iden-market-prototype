import ProductCard from "./ProductCard";

const ProductGrid = () => {
  const products = [
    {
      id: 1,
      title: "iPhone 15 Pro Max 256GB Титановый",
      price: 134990,
      oldPrice: 149990,
      rating: 4.8,
      reviewsCount: 1247,
      image:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop",
      seller: "Apple Store",
      discount: 10,
      isDeliveryFree: true,
    },
    {
      id: 2,
      title: "Samsung Galaxy S24 Ultra 512GB Черный",
      price: 119990,
      rating: 4.7,
      reviewsCount: 892,
      image:
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=300&fit=crop",
      seller: "Samsung Official",
      isDeliveryFree: true,
    },
    {
      id: 3,
      title: 'MacBook Pro 14" M3 Pro 18GB 512GB Space Black',
      price: 249990,
      oldPrice: 269990,
      rating: 4.9,
      reviewsCount: 456,
      image:
        "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop",
      seller: "Apple Store",
      discount: 7,
      isDeliveryFree: true,
    },
    {
      id: 4,
      title: "AirPods Pro 2-го поколения с MagSafe",
      price: 24990,
      rating: 4.6,
      reviewsCount: 2341,
      image:
        "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=300&fit=crop",
      seller: "Apple Store",
      isDeliveryFree: true,
    },
    {
      id: 5,
      title: "iPad Air 5-го поколения 64GB Wi-Fi Starlight",
      price: 74990,
      rating: 4.5,
      reviewsCount: 678,
      image:
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop",
      seller: "Apple Store",
      isDeliveryFree: true,
    },
    {
      id: 6,
      title: "Sony WH-1000XM5 Беспроводные наушники",
      price: 34990,
      oldPrice: 39990,
      rating: 4.8,
      reviewsCount: 1567,
      image:
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop",
      seller: "Sony Store",
      discount: 13,
      isDeliveryFree: true,
    },
    {
      id: 7,
      title: "Xiaomi 14 Ultra 512GB Черный",
      price: 89990,
      rating: 4.4,
      reviewsCount: 234,
      image:
        "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&h=300&fit=crop",
      seller: "Mi Store",
      isDeliveryFree: false,
    },
    {
      id: 8,
      title: "Apple Watch Series 9 45mm GPS Midnight",
      price: 44990,
      rating: 4.7,
      reviewsCount: 891,
      image:
        "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=300&fit=crop",
      seller: "Apple Store",
      isDeliveryFree: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};

export default ProductGrid;
