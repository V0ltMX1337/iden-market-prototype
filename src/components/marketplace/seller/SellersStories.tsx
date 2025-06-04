import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const SellersStories = () => {
  const categories = [
    {
      id: 1,
      name: "iPhone 12 Pro и Pro Max",
      avatar:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=120&h=120&fit=crop&crop=center",
      gradient: "from-purple-600 to-purple-400",
    },
    {
      id: 2,
      name: "Привет, фиолет!",
      avatar:
        "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=120&h=120&fit=crop&crop=center",
      gradient: "from-purple-500 to-pink-400",
    },
    {
      id: 3,
      name: "Samsung Galaxy S21",
      avatar:
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=120&h=120&fit=crop&crop=center",
      gradient: "from-gray-800 to-gray-600",
    },
    {
      id: 4,
      name: "Игровые консоли",
      avatar:
        "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=120&h=120&fit=crop&crop=center",
      gradient: "from-blue-600 to-blue-400",
    },
    {
      id: 5,
      name: "iPhone 12 Pro и Pro Max",
      avatar:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=120&h=120&fit=crop&crop=center",
      gradient: "from-gray-800 to-gray-600",
    },
    {
      id: 6,
      name: "Привет, фиолет!",
      avatar:
        "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=120&h=120&fit=crop&crop=center",
      gradient: "from-purple-500 to-pink-400",
    },
    {
      id: 7,
      name: "Samsung Galaxy",
      avatar:
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=120&h=120&fit=crop&crop=center",
      gradient: "from-gray-600 to-gray-400",
    },
  ];

  return (
    <div className="bg-white py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center space-x-4 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex flex-col items-center space-y-2 cursor-pointer group min-w-fit"
            >
              <div
                className={`p-1 bg-gradient-to-br ${category.gradient} rounded-2xl group-hover:scale-105 transition-all duration-300 shadow-lg`}
              >
                <div className="bg-white p-2 rounded-xl">
                  <Avatar className="w-16 h-16">
                    <AvatarImage
                      src={category.avatar}
                      alt={category.name}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-gray-100 text-gray-600 text-sm font-medium">
                      {category.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
              <span className="text-xs text-gray-700 text-center max-w-20 leading-tight font-medium">
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SellersStories;
