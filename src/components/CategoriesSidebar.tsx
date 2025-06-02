import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Icon from "@/components/ui/icon";
import { cn } from "@/lib/utils";

interface Subcategory {
  name: string;
  href: string;
}

interface Category {
  name: string;
  icon: string;
  href: string;
  subcategories: Subcategory[];
}

const CategoriesSidebar = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories: Category[] = [
    {
      name: "Электроника",
      icon: "Smartphone",
      href: "/category/electronics",
      subcategories: [
        { name: "Смартфоны и планшеты", href: "/category/electronics/phones" },
        {
          name: "Компьютеры и ноутбуки",
          href: "/category/electronics/computers",
        },
        { name: "Телевизоры и аудио", href: "/category/electronics/tv-audio" },
        { name: "Игровые приставки", href: "/category/electronics/gaming" },
        { name: "Фото и видеотехника", href: "/category/electronics/photo" },
      ],
    },
    {
      name: "Одежда",
      icon: "Shirt",
      href: "/category/clothing",
      subcategories: [
        { name: "Мужская одежда", href: "/category/clothing/men" },
        { name: "Женская одежда", href: "/category/clothing/women" },
        { name: "Детская одежда", href: "/category/clothing/kids" },
        { name: "Обувь", href: "/category/clothing/shoes" },
        { name: "Аксессуары", href: "/category/clothing/accessories" },
      ],
    },
    {
      name: "Дом и сад",
      icon: "Home",
      href: "/category/home",
      subcategories: [
        { name: "Мебель", href: "/category/home/furniture" },
        { name: "Декор", href: "/category/home/decor" },
        { name: "Кухонная техника", href: "/category/home/kitchen" },
        { name: "Садовые товары", href: "/category/home/garden" },
        { name: "Освещение", href: "/category/home/lighting" },
      ],
    },
    {
      name: "Спорт и отдых",
      icon: "Dumbbell",
      href: "/category/sport",
      subcategories: [
        { name: "Фитнес", href: "/category/sport/fitness" },
        { name: "Командные виды спорта", href: "/category/sport/team" },
        { name: "Велосипеды", href: "/category/sport/bikes" },
        { name: "Туризм", href: "/category/sport/tourism" },
        { name: "Водные виды спорта", href: "/category/sport/water" },
      ],
    },
    {
      name: "Автотовары",
      icon: "Car",
      href: "/category/auto",
      subcategories: [
        { name: "Автозапчасти", href: "/category/auto/parts" },
        { name: "Автоэлектроника", href: "/category/auto/electronics" },
        { name: "Шины и диски", href: "/category/auto/tires" },
        { name: "Автохимия", href: "/category/auto/chemistry" },
        { name: "Аксессуары", href: "/category/auto/accessories" },
      ],
    },
    {
      name: "Красота и здоровье",
      icon: "Heart",
      href: "/category/beauty",
      subcategories: [
        { name: "Косметика", href: "/category/beauty/cosmetics" },
        { name: "Парфюмерия", href: "/category/beauty/perfume" },
        { name: "Средства гигиены", href: "/category/beauty/hygiene" },
        { name: "Медтехника", href: "/category/beauty/medical" },
        { name: "БАДы и витамины", href: "/category/beauty/supplements" },
      ],
    },
    {
      name: "Книги",
      icon: "Book",
      href: "/category/books",
      subcategories: [
        { name: "Художественная литература", href: "/category/books/fiction" },
        {
          name: "Нехудожественная литература",
          href: "/category/books/non-fiction",
        },
        { name: "Учебная литература", href: "/category/books/educational" },
        { name: "Детские книги", href: "/category/books/children" },
        { name: "Комиксы", href: "/category/books/comics" },
      ],
    },
    {
      name: "Игрушки",
      icon: "Gamepad2",
      href: "/category/toys",
      subcategories: [
        { name: "Развивающие игрушки", href: "/category/toys/educational" },
        { name: "Конструкторы", href: "/category/toys/construction" },
        { name: "Куклы и фигурки", href: "/category/toys/dolls" },
        { name: "Настольные игры", href: "/category/toys/board-games" },
        { name: "Радиоуправляемые игрушки", href: "/category/toys/rc" },
      ],
    },
  ];

  const handleCategoryClick = (categoryName: string) => {
    setActiveCategory(activeCategory === categoryName ? null : categoryName);
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 h-full">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Каталог товаров</h2>
      </div>

      <ScrollArea className="h-full">
        <div className="py-2">
          {categories.map((category) => (
            <div key={category.name} className="mb-1">
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-between px-4 py-3 h-auto text-left font-normal",
                  activeCategory === category.name && "bg-gray-50",
                )}
                onClick={() => handleCategoryClick(category.name)}
              >
                <div className="flex items-center space-x-3">
                  <Icon
                    name={category.icon}
                    size={20}
                    className="text-gray-600"
                  />
                  <span className="text-gray-900">{category.name}</span>
                </div>
                <Icon
                  name="ChevronRight"
                  size={16}
                  className={cn(
                    "text-gray-400 transition-transform",
                    activeCategory === category.name && "rotate-90",
                  )}
                />
              </Button>

              {activeCategory === category.name && (
                <div className="ml-6 mt-1 space-y-1">
                  {category.subcategories.map((subcategory) => (
                    <Button
                      key={subcategory.name}
                      variant="ghost"
                      className="w-full justify-start px-4 py-2 h-auto text-left font-normal text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    >
                      {subcategory.name}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default CategoriesSidebar;
