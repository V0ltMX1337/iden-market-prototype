import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const LeadersSection = () => {
  const leaders = [
    {
      id: 1,
      title: "Cyberpunk 2077",
      price: 500,
      oldPrice: 1000,
      discount: 50,
      image:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=200&fit=crop",
      gradient: "from-pink-400 to-purple-600",
      rating: 4.5,
      reviews: 1000,
      category: "ИГРЫ",
    },
    {
      id: 2,
      title: "Steam Platform",
      price: 500,
      oldPrice: 1000,
      discount: 50,
      image:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&h=200&fit=crop",
      gradient: "from-indigo-500 to-purple-700",
      rating: 4.5,
      reviews: 1000,
      category: "ПЛАТФОРМА",
    },
    {
      id: 3,
      title: "Microsoft Office",
      price: 500,
      oldPrice: 1000,
      discount: 50,
      image:
        "https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=300&h=200&fit=crop",
      gradient: "from-pink-500 to-red-500",
      rating: 4.5,
      reviews: 1000,
      category: "ОФИСНЫЕ",
    },
    {
      id: 4,
      title: "Xbox Game Pass",
      price: 500,
      oldPrice: 1000,
      discount: 50,
      image:
        "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=300&h=200&fit=crop",
      gradient: "from-teal-500 to-green-600",
      rating: 4.5,
      reviews: 1000,
      category: "ПОДПИСКИ",
    },
    {
      id: 5,
      title: "Spotify Premium",
      price: 500,
      oldPrice: 1000,
      discount: 50,
      image:
        "https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=300&h=200&fit=crop",
      gradient: "from-green-400 to-emerald-600",
      rating: 4.5,
      reviews: 1000,
      category: "МУЗЫКА",
    },
    {
      id: 6,
      title: "PlayStation Plus",
      price: 500,
      oldPrice: 1000,
      discount: 50,
      image:
        "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=300&h=200&fit=crop",
      gradient: "from-blue-600 to-indigo-800",
      rating: 4.5,
      reviews: 1000,
      category: "ПОДПИСКИ",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Лидеры продаж</h2>
        <Button
          variant="ghost"
          className="text-purple-600 hover:text-purple-700"
        >
          Все популярные товары
          <Icon name="ChevronRight" size={16} className="ml-1" />
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {leaders.map((product) => (
          <div key={product.id} className="group cursor-pointer">
            {/* Product Image with Gradient Background */}
            <div
              className={`relative bg-gradient-to-br ${product.gradient} rounded-2xl p-4 mb-3 aspect-[3/2] overflow-hidden`}
            >
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 text-white hover:bg-white/20 p-1 rounded-full"
              >
                <Icon name="Heart" size={16} />
              </Button>

              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-20 h-20 object-contain opacity-90"
                />
              </div>

              <div className="absolute bottom-2 left-4">
                <span className="text-white text-xs font-medium bg-black/20 px-2 py-1 rounded">
                  {product.category}
                </span>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-lg text-gray-900">
                  {product.price} ₽
                </span>
                <span className="text-gray-400 line-through text-sm">
                  {product.oldPrice} ₽
                </span>
                <span className="text-green-600 text-sm font-medium">
                  -{product.discount}%
                </span>
              </div>

              <h3 className="text-sm text-gray-800 line-clamp-2 leading-tight">
                Название товара может быть длинным, поэтому...
              </h3>

              <div className="flex items-center text-sm text-gray-600">
                <Icon name="Star" size={14} className="text-yellow-500 mr-1" />
                <span className="font-medium">{product.rating}</span>
                <span className="ml-2">Продано: {product.reviews}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LeadersSection;
