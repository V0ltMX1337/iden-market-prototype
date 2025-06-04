import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const SellersStories = () => {
  const sellers = [
    {
      id: 1,
      name: "iPhone 12 Pro и Pro Max",
      avatar:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=100&h=100&fit=crop&crop=center",
      borderColor: "border-purple-500",
    },
    {
      id: 2,
      name: "Привет, фиолет!",
      avatar:
        "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=100&h=100&fit=crop&crop=center",
      borderColor: "border-purple-400",
    },
    {
      id: 3,
      name: "Samsung Galaxy S21",
      avatar:
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=100&h=100&fit=crop&crop=center",
      borderColor: "border-gray-900",
    },
    {
      id: 4,
      name: "Игровые консоли",
      avatar:
        "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=100&h=100&fit=crop&crop=center",
      borderColor: "border-blue-400",
    },
    {
      id: 5,
      name: "iPhone 12 Pro и Pro Max",
      avatar:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=100&h=100&fit=crop&crop=center",
      borderColor: "border-gray-900",
    },
    {
      id: 6,
      name: "Привет, фиолет!",
      avatar:
        "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=100&h=100&fit=crop&crop=center",
      borderColor: "border-purple-400",
    },
    {
      id: 7,
      name: "Samsung Galaxy",
      avatar:
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=100&h=100&fit=crop&crop=center",
      borderColor: "border-gray-400",
    },
  ];

  return (
    <div className="bg-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center space-x-6 overflow-x-auto">
          {sellers.map((seller) => (
            <div
              key={seller.id}
              className="flex flex-col items-center space-y-2 cursor-pointer group min-w-fit"
            >
              <div
                className={`p-1 rounded-full border-2 ${seller.borderColor} group-hover:scale-105 transition-transform duration-200`}
              >
                <Avatar className="w-16 h-16">
                  <AvatarImage src={seller.avatar} alt={seller.name} />
                  <AvatarFallback className="bg-gray-200 text-gray-600 text-sm">
                    {seller.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <span className="text-xs text-gray-700 text-center max-w-20 leading-tight">
                {seller.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SellersStories;
