import { Button } from "@/components/ui/button";

const BrandFilter = () => {
  const brands = [
    {
      name: "Акции",
      type: "sale",
      color: "bg-gradient-to-r from-orange-400 to-red-500",
    },
    {
      name: "Новинка",
      type: "new",
      color: "bg-gradient-to-r from-green-400 to-blue-500",
    },
    {
      name: "Популярные",
      type: "popular",
      color: "bg-gradient-to-r from-purple-400 to-pink-500",
    },
    {
      name: "Apple iPhone",
      image:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=100&h=100&fit=crop&crop=center",
    },
    {
      name: "Samsung Galaxy",
      image:
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=100&h=100&fit=crop&crop=center",
    },
    {
      name: "Huawei",
      image:
        "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=100&h=100&fit=crop&crop=center",
    },
    {
      name: "Xiaomi",
      image:
        "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=100&h=100&fit=crop&crop=center",
    },
    {
      name: "HONOR",
      image:
        "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=100&h=100&fit=crop&crop=center",
    },
  ];

  return (
    <div className="grid grid-cols-4 md:grid-cols-8 gap-4 mb-8">
      {brands.map((brand) => (
        <div key={brand.name} className="flex flex-col items-center">
          <div
            className={`w-16 h-16 rounded-lg flex items-center justify-center mb-2 ${
              brand.type === "sale" ||
              brand.type === "new" ||
              brand.type === "popular"
                ? brand.color
                : "bg-gray-100"
            }`}
          >
            {brand.image ? (
              <img
                src={brand.image}
                alt={brand.name}
                className="w-12 h-12 object-contain rounded"
              />
            ) : (
              <span className="text-white font-bold text-xs text-center">
                {brand.type === "sale" && "Sale"}
                {brand.type === "new" && "Новинка"}
                {brand.type === "popular" && "популярные"}
              </span>
            )}
          </div>
          <span className="text-xs text-center text-gray-700">
            {brand.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default BrandFilter;
