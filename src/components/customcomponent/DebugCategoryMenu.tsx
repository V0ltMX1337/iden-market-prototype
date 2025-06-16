import React, { useState } from "react";
import Icon from "@/components/ui/icon";

const categories = [
    {
      name: "Умный дом",
      icon: "Wifi",
      subcategories: [],
    },
    {
      name: "Бытовая техника",
      icon: "Zap",
      subcategories: [],
    },
    {
      name: "Смартфоны",
      icon: "Smartphone",
      subcategories: [
        {
          name: "Смартфоны",
          items: [
            "Apple iPhone",
            "Samsung Galaxy",
            "Huawei",
            "HONOR",
            "Xiaomi",
            "Ещё▼",
          ],
        },
        {
          name: "Мобильные телефоны",
          items: ["Кнопочные телефоны", "Домашние телефоны"],
        },
        {
          name: "Аксессуары",
          items: [
            "Наушники",
            "Чехлы",
            "Защитные стёкла",
            "Зарядные устройства",
            "Кабели",
          ],
        },
        {
          name: "Умные часы и браслеты",
          items: ["Смарт-часы", "Фитнес-браслеты", "Детские часы"],
        },
      ],
    },
    {
      name: "Умные часы и браслеты",
      icon: "Watch",
      subcategories: [
        {
          name: "Смарт-часы",
          items: ["Apple Watch", "Samsung Galaxy Watch", "Huawei Watch"],
        },
        {
          name: "Фитнес-браслеты",
          items: ["Xiaomi Mi Band", "Honor Band", "Fitbit"],
        },
      ],
    },
    {
      name: "Аксессуары",
      icon: "Cable",
      subcategories: [
        {
          name: "Наушники",
          items: [
            "Беспроводные наушники",
            "Проводные наушники",
            "Игровые гарнитуры",
          ],
        },
        {
          name: "Чехлы",
          items: ["Чехлы для телефонов", "Чехлы для планшетов"],
        },
        { name: "Защитные стёкла", items: ["Для смартфонов", "Для планшетов"] },
        {
          name: "Зарядные устройства",
          items: ["Беспроводные зарядки", "Power bank", "Автозарядки"],
        },
        { name: "Кабели", items: ["USB-C", "Lightning", "Micro USB"] },
      ],
    },
    {
      name: "Планшеты",
      icon: "Tablet",
      subcategories: [],
    },
    {
      name: "Электросамокаты",
      icon: "Zap",
      subcategories: [],
    },
    {
      name: "Телевизоры",
      icon: "Monitor",
      subcategories: [],
    },
    {
      name: "Развлечение",
      icon: "Gamepad2",
      subcategories: [],
    },
    {
      name: "Модемы и ТВ",
      icon: "Router",
      subcategories: [],
    },
  ];

export default function DebugCategoryMenu() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="p-8">
      <div className="relative inline-block text-left">
  <div className="flex flex-col w-64 border rounded bg-white">
    {categories.map((cat, i) => (
      <div
        key={i}
        className="group relative"
        onMouseEnter={() => setHovered(i)}
        onMouseLeave={() => setHovered(null)}
      >
        {/* Категория */}
        <div className="flex items-center gap-2 p-3 cursor-pointer hover:bg-blue-50">
          <Icon name={cat.icon} size={16} />
          <span>{cat.name}</span>
        </div>

        {/* Подкатегории */}
        {hovered === i && cat.subcategories.length > 0 && (
          <div
            className="absolute top-0 left-full ml-1 w-[400px] p-4 bg-white border rounded shadow-lg z-50"
          >
            <div className="grid grid-cols-2 gap-4">
              {cat.subcategories.map((subcat, si) => (
                <div key={si}>
                  <h4 className="font-semibold text-sm mb-2">{subcat.name}</h4>
                  <ul className="text-sm space-y-1">
                    {subcat.items.map((item, idx) => (
                      <li key={idx} className="hover:text-blue-600 cursor-pointer">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    ))}
  </div>
</div>
    </div>
  );
}