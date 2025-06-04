import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const SellersStories = () => {
  const sellers = [
    {
      id: 1,
      name: "iPhone 12 Pro и Pro Max",
      avatar:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=200&fit=crop&crop=center",
      borderColor: "border-purple-500",
    },
    {
      id: 2,
      name: "Привет, фиолет!",
      avatar:
        "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=300&h=200&fit=crop&crop=center",
      borderColor: "border-purple-400",
    },
    {
      id: 3,
      name: "Samsung Galaxy S21",
      avatar:
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300&h=200&fit=crop&crop=center",
      borderColor: "border-gray-900",
    },
    {
      id: 4,
      name: "Игровые консоли",
      avatar:
        "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=300&h=200&fit=crop&crop=center",
      borderColor: "border-blue-400",
    },
    {
      id: 5,
      name: "iPhone 12 Pro и Pro Max",
      avatar:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=200&fit=crop&crop=center",
      borderColor: "border-gray-900",
    },
    {
      id: 6,
      name: "Привет, фиолет!",
      avatar:
        "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=300&h=200&fit=crop&crop=center",
      borderColor: "border-purple-400",
    },
    {
      id: 7,
      name: "Samsung Galaxy",
      avatar:
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300&h=200&fit=crop&crop=center",
      borderColor: "border-gray-400",
    },
  ];

  return (
    <div className="bg-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center space-x-4 overflow-x-auto pb-2">
          {sellers.map((seller) => (
            <div key={seller.id} className="flex-shrink-0 cursor-pointer group">
              <div
                className={`relative w-32 h-20 rounded-2xl border-3 ${seller.borderColor} shadow-lg ring-2 ring-gray-200 ring-offset-2 overflow-hidden group-hover:scale-105 transition-transform duration-200`}
              >
                <img
                  src={seller.avatar}
                  alt={seller.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2 right-2">
                  <span className="text-white text-xs font-medium leading-tight">
                    {seller.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SellersStories;
