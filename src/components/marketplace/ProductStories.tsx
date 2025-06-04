const ProductStories = () => {
  const products = [
    {
      id: 1,
      name: "iPhone 12 Pro и Pro Max",
      image:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=200&fit=crop",
      bgColor: "bg-gradient-to-br from-blue-900 to-black",
    },
    {
      id: 2,
      name: "Привет, фиолет!",
      image:
        "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=300&h=200&fit=crop",
      bgColor: "bg-gradient-to-br from-purple-400 to-purple-600",
    },
    {
      id: 3,
      name: "Samsung Galaxy S21",
      image:
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300&h=200&fit=crop",
      bgColor: "bg-gradient-to-br from-gray-900 to-black",
    },
    {
      id: 4,
      name: "Игровые консоли",
      image:
        "https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=300&h=200&fit=crop",
      bgColor: "bg-gradient-to-br from-blue-400 to-purple-500",
    },
    {
      id: 5,
      name: "iPhone 12 Pro и Pro Max",
      image:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=200&fit=crop",
      bgColor: "bg-gradient-to-br from-blue-900 to-black",
    },
    {
      id: 6,
      name: "Привет, фиолет!",
      image:
        "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=300&h=200&fit=crop",
      bgColor: "bg-gradient-to-br from-purple-400 to-purple-600",
    },
    {
      id: 7,
      name: "Samsung Galaxy",
      image:
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300&h=200&fit=crop",
      bgColor: "bg-gradient-to-br from-gray-600 to-gray-800",
    },
  ];

  return (
    <div className="mb-8">
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {products.map((product) => (
          <div key={product.id} className="flex-shrink-0 cursor-pointer group">
            <div
              className={`relative w-24 h-24 rounded-2xl ${product.bgColor} border-2 border-indigo-500 overflow-hidden group-hover:scale-105 transition-transform duration-200`}
            >
              <div className="absolute inset-2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="absolute bottom-1 left-1 right-1">
                <span className="text-white text-xs font-medium leading-tight block">
                  {product.name}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductStories;
