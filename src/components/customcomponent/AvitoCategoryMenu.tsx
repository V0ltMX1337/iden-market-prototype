import React, { useState } from "react";
import * as LucideIcons from "lucide-react";
import type { Category } from "@/lib/types";

interface AvitoCategoryMenuProps {
  categories: Category[];
  onCategorySelect?: (categoryId: string) => void;
  onSubcategorySelect?: (categoryId: string, subcategoryItem: string) => void;
}

export const AvitoCategoryMenu = ({
  categories,
  onCategorySelect,
  onSubcategorySelect,
}: AvitoCategoryMenuProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative w-full">
      <div className="w-full">
        {categories.map((category, index) => {
          const IconComponent =
            (category.icon && (LucideIcons as any)[category.icon]) || LucideIcons.Box;
          const hasSubcategories = category.subcategories?.length > 0;

          return (
            <div
              key={category.id}
              className="group relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Категория */}
              <div
                className="px-4 py-3 cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 flex items-center select-none"
                onClick={() => onCategorySelect?.(category.id)}
              >
                <div className="flex items-center justify-center w-6 h-6 rounded-md bg-gradient-to-br from-blue-100 to-purple-100 mr-3">
                  <IconComponent className="text-blue-600" size={14} />
                </div>
                <span className="font-medium text-gray-700 text-sm">{category.name}</span>
                {hasSubcategories && (
                  <LucideIcons.ChevronRight className="ml-auto text-gray-400" size={14} />
                )}
              </div>

              {/* Подкатегории */}
              {hoveredIndex === index && hasSubcategories && (
                <div
                  className="absolute top-0 left-full ml-2 z-50 w-[500px] bg-white border border-gray-200 rounded-lg shadow-2xl p-6 transition-all duration-300 ease-out transform animate-fade-in"
                >
                  <div className="flex items-center mb-4 pb-3 border-b border-gray-100">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 mr-3">
                      <IconComponent className="text-blue-600" size={16} />
                    </div>
                    <span className="text-lg font-bold text-gray-800">{category.name}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    {category.subcategories.map((subcat) => (
                      <div key={subcat.name}>
                        <h4 className="font-semibold text-gray-800 text-base mb-3 border-b border-gray-100 pb-2">
                          {subcat.name}
                        </h4>
                        <div className="space-y-2">
                          {subcat.items.map((item) => (
                            <div
                              key={item}
                              className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer py-1.5 px-2 rounded hover:bg-blue-50 transition-all duration-150"
                              onClick={() => onSubcategorySelect?.(category.id, item)}
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
