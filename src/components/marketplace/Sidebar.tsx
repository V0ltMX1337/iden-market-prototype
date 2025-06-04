const Sidebar = () => {
  const categories = [
    {
      title: "Смартфоны",
      items: ["Apple iPhone", "Samsung Galaxy", "Huawei", "HONOR", "Xiaomi"],
    },
    {
      title: "Аксессуары",
      items: [
        "Наушники",
        "Чехлы",
        "Защитные стёкла",
        "Зарядные устройства",
        "Кабели",
      ],
    },
    {
      title: "Умные часы и браслеты",
      items: ["Смарт-часы", "Фитнес-браслеты", "Детские часы"],
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6">
        {categories.map((category, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-lg font-semibold text-indigo-600 mb-4">
              {category.title}
            </h2>
            <ul className="space-y-3">
              {category.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-indigo-600 text-sm block py-1"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
