import Icon from "@/components/ui/icon";

const CategoriesGrid = () => {
  const categories = [
    {
      id: 1,
      name: "Электроника",
      icon: "Smartphone",
      gradient: "from-blue-500 to-indigo-600",
      products: "12K+",
    },
    {
      id: 2,
      name: "Одежда",
      icon: "Shirt",
      gradient: "from-pink-500 to-rose-600",
      products: "8K+",
    },
    {
      id: 3,
      name: "Дом и сад",
      icon: "Home",
      gradient: "from-green-500 to-emerald-600",
      products: "6K+",
    },
    {
      id: 4,
      name: "Автотовары",
      icon: "Car",
      gradient: "from-orange-500 to-red-600",
      products: "4K+",
    },
    {
      id: 5,
      name: "Спорт",
      icon: "Dumbbell",
      gradient: "from-purple-500 to-violet-600",
      products: "3K+",
    },
    {
      id: 6,
      name: "Красота",
      icon: "Sparkles",
      gradient: "from-teal-500 to-cyan-600",
      products: "5K+",
    },
    {
      id: 7,
      name: "Книги",
      icon: "BookOpen",
      gradient: "from-amber-500 to-yellow-600",
      products: "2K+",
    },
    {
      id: 8,
      name: "Игрушки",
      icon: "Gamepad2",
      gradient: "from-indigo-500 to-blue-600",
      products: "1K+",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Каталог товаров
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-4">
        {categories.map((category) => (
          <div key={category.id} className="group cursor-pointer">
            <div
              className={`bg-gradient-to-br ${category.gradient} rounded-2xl p-6 text-center text-white hover:scale-105 transition-transform duration-200 shadow-lg`}
            >
              <div className="flex justify-center mb-3">
                <Icon
                  name={category.icon as any}
                  size={32}
                  className="text-white"
                />
              </div>
              <h3 className="font-semibold text-sm mb-1">{category.name}</h3>
              <p className="text-xs opacity-90">{category.products}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesGrid;
