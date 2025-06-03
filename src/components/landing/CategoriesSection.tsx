import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

const CategoriesSection = () => {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Электроника",
      icon: "Smartphone",
      gradient: "from-blue-500 to-cyan-500",
    },
    { name: "Одежда", icon: "Shirt", gradient: "from-pink-500 to-rose-500" },
    {
      name: "Дом и сад",
      icon: "Home",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      name: "Спорт",
      icon: "Dumbbell",
      gradient: "from-orange-500 to-amber-500",
    },
    {
      name: "Красота",
      icon: "Sparkles",
      gradient: "from-purple-500 to-violet-500",
    },
    { name: "Авто", icon: "Car", gradient: "from-gray-600 to-gray-800" },
    { name: "Книги", icon: "Book", gradient: "from-indigo-500 to-blue-600" },
    { name: "Игрушки", icon: "Gamepad2", gradient: "from-red-500 to-pink-500" },
  ];

  return (
    <section id="categories" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Популярные категории
          </h2>
          <p className="text-xl text-gray-600">
            Найдите всё что нужно в нашем огромном каталоге
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group cursor-pointer"
              onClick={() => navigate("/marketplace")}
            >
              <div
                className={`bg-gradient-to-br ${category.gradient} rounded-xl p-6 text-white text-center hover:scale-105 transition-transform duration-200`}
              >
                <Icon name={category.icon} size={40} className="mx-auto mb-3" />
                <h3 className="font-semibold">{category.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
