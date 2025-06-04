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
      <div className="grid grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`relative h-40 rounded-2xl ${category.bgColor} cursor-pointer group overflow-hidden hover:scale-105 transition-transform duration-200`}
          >
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-white text-lg font-bold">{category.title}</h3>
            </div>
            <div className="absolute top-6 right-6">
              <img
                src={category.image}
                alt={category.title}
                className="w-16 h-16 object-cover rounded-xl opacity-80"
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
