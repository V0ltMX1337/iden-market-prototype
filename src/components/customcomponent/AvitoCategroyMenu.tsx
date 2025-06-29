import Icon from "@/components/ui/icon";
import { useState } from "react";
import type { Category } from "@/lib/types";

interface AvitoCategoryMenuProps {
  categories: Category[];
}

export const AvitoCategroyMenu = ({ categories }: AvitoCategoryMenuProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryId: string) => {
    console.log("Выбрана категория:", categoryId);
    // Здесь будет переход к объявлениям категории
  };

  const handleSubcategoryClick = (
    categoryId: string,
    subcategoryName: string,
  ) => {
    console.log(
      "Выбрана подкатегория:",
      subcategoryName,
      "в категории:",
      categoryId,
    );
    // Здесь будет переход к объявлениям подкатегории
  };

  return (
    <div className="max-h-[400px] overflow-y-auto">
      {categories.map((category) => (
        <div
          key={category.id}
          className="border-b border-gray-100 last:border-0"
        >
          <div
            className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer"
            onClick={() => handleCategoryClick(category.id)}
          >
            <span className="font-medium text-gray-900">{category.name}</span>
            {category.subcategories && category.subcategories.length > 0 && (
              <Icon name="ChevronRight" size={16} className="text-gray-400" />
            )}
          </div>

          {category.subcategories && category.subcategories.length > 0 && (
            <div className="pl-4 pb-2">
              {category.subcategories.map((subcategory) => (
                <div key={subcategory.name} className="mb-2">
                  <div
                    className="text-sm font-medium text-gray-700 px-4 py-2 hover:bg-gray-50 cursor-pointer rounded"
                    onClick={() =>
                      handleSubcategoryClick(category.id, subcategory.name)
                    }
                  >
                    {subcategory.name}
                  </div>
                  {subcategory.items && subcategory.items.length > 0 && (
                    <div className="pl-4">
                      {subcategory.items.map((item) => (
                        <div
                          key={item}
                          className="text-sm text-gray-600 px-4 py-1 hover:bg-gray-50 cursor-pointer rounded"
                          onClick={() => console.log("Выбран товар:", item)}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
