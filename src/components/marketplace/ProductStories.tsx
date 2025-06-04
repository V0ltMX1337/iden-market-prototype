const ProductStories = () => {
  const products = [
    {
      id: 1,
      name: "iPhone 12 Pro и Pro Max",
      image:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=200&fit=crop",
      bgColor: "bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700",
    },
    {
      id: 2,
      name: "Привет, фиолет!",
      image:
        "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=300&h=200&fit=crop",
      bgColor: "bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600",
    },
    {
      id: 3,
      name: "Samsung Galaxy S21",
      image:
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300&h=200&fit=crop",
      bgColor: "bg-gradient-to-br from-gray-800 via-gray-900 to-black",
    },
    {
      id: 4,
      name: "Игровые консоли",
      image:
        "https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=300&h=200&fit=crop",
      bgColor: "bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-500",
    },
    {
      id: 5,
      name: "iPhone 12 Pro и Pro Max",
      image:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=200&fit=crop",
      bgColor: "bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700",
    },
    {
      id: 6,
      name: "Привет, фиолет!",
      image:
        "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=300&h=200&fit=crop",
      bgColor: "bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600",
    },
    {
      id: 7,
      name: "Samsung Galaxy",
      image:
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300&h=200&fit=crop",
      bgColor: "bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800",
    },
  ];

  return (
    <div className="mb-8">
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {products.map((product) => (
          <div key={product.id} className="flex-shrink-0 cursor-pointer group">
            <div
              className={`relative w-36 h-24 rounded-2xl ${product.bgColor} overflow-hidden group-hover:scale-105 transition-transform duration-200 border-2 border-indigo-600`}
            >
              <div className="absolute inset-0 p-4 flex flex-col justify-between">
                <div className="flex-1 flex items-start justify-end">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded-lg opacity-90"
                  />
                </div>
                <div className="text-left">
                  <span className="text-white text-sm font-bold leading-tight block">
                    {product.name}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductStories;
