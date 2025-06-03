import ProductCard from "./ProductCard";

const ProductGrid = () => {
  const products = [
    {
      id: 1,
      title: "Игровой пк, Core i3 7100, 8 ГБ ОЗУ, SSD 256 Гб, GTX 1650; предустановленная Windows 11 PRO",
      price: 46739,
      oldPrice: 76500,
      rating: 4.8,
      reviewsCount: 1247,
      image:
        "https://avatars.mds.yandex.net/get-mpic/15282130/2a00000197240072cd812d3099f5c8f4514a/optimize",
      seller: "PotionShop",
      discount: 10,
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
