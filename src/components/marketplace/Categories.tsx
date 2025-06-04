const Categories = () => {
  const categories = [
    {
      id: 1,
      title: "Смартфоны",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
      bgColor: "bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700",
      icon: "📱",
    },
    {
      id: 2,
      title: "Умные часы и браслеты",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
      bgColor: "bg-gradient-to-br from-gray-800 via-gray-900 to-black",
      icon: "⌚",
    },
    {
      id: 3,
      title: "Аксессуары",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
      bgColor: "bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-700",
      icon: "🎧",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Категории</h2>
      <div className="grid grid-cols-3 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`relative h-32 rounded-2xl ${category.bgColor} cursor-pointer group overflow-hidden`}
          >
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-white text-base font-semibold">
                {category.title}
              </h3>
            </div>
            <div className="absolute top-4 right-4">
              <img
                src={category.image}
                alt={category.title}
                className="w-12 h-12 object-cover rounded-lg opacity-70"
              />
            </div>
            <div className="absolute inset-0 group-hover:bg-black/10 transition-colors duration-200"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
