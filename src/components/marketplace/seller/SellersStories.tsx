import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const SellersStories = () => {
  const products = [
    {
      id: 1,
      name: "iPhone 14 Pro",
      image:
        "https://images.unsplash.com/photo-1678652197831-2d180705cd2c?w=200&h=200&fit=crop&crop=center",
      price: "от 89 990 ₽",
    },
    {
      id: 2,
      name: "iPhone 14",
      image:
        "https://images.unsplash.com/photo-1678652197542-6348c4dd7f2c?w=200&h=200&fit=crop&crop=center",
      price: "от 69 990 ₽",
    },
    {
      id: 3,
      name: "Samsung Galaxy S23",
      image:
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=200&h=200&fit=crop&crop=center",
      price: "от 79 990 ₽",
    },
    {
      id: 4,
      name: "iPhone 13",
      image:
        "https://images.unsplash.com/photo-1632633173522-15b8d0b069d6?w=200&h=200&fit=crop&crop=center",
      price: "от 59 990 ₽",
    },
    {
      id: 5,
      name: "Xiaomi 13 Pro",
      image:
        "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=200&h=200&fit=crop&crop=center",
      price: "от 49 990 ₽",
    },
    {
      id: 6,
      name: "Google Pixel 7",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop&crop=center",
      price: "от 54 990 ₽",
    },
  ];

  return (
    <div className="bg-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-center space-x-8 overflow-x-auto scrollbar-hide">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col items-center space-y-3 cursor-pointer group min-w-fit"
            >
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 group-hover:scale-105 transition-transform duration-300 shadow-md">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-900 mb-1">
                  {product.name}
                </p>
                <p className="text-xs text-gray-600">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SellersStories;
