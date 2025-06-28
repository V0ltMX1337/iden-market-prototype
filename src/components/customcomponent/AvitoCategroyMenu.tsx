"use client";

import React, { useState } from "react";
import Icon from "@/components/ui/icon";

interface CategoryItem {
  name: string;
  icon: string;
  subcategories: {
    name: string;
    items: string[];
  }[];
}

interface Props {
  categories: CategoryItem[];
}

export const AvitoCategroyMenu: React.FC<Props> = ({ categories }) => {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  return (
    <div className="relative w-full">
      <div className="w-full">
        {categories.map((category, index) => (
          <div
            key={index}
            className="group relative"
            onMouseEnter={() => setHoveredCategory(index)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            {/* Категория */}
            <div className="px-4 py-3 cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 flex items-center">
              <div className="flex items-center justify-center w-6 h-6 rounded-md bg-gradient-to-br from-blue-100 to-purple-100 mr-3">
                <Icon
                  name={category.icon}
                  size={14}
                  className="text-blue-600"
                />
              </div>
              <span className="font-medium text-gray-700 text-sm">
                {category.name}
              </span>
              {category.subcategories.length > 0 && (
                <Icon
                  name="ChevronRight"
                  size={14}
                  className="ml-auto text-gray-400"
                />
              )}
            </div>

            {/* Подкатегории */}
            {hoveredCategory === index && category.subcategories.length > 0 && (
              <div
                className={`
                  absolute top-0 left-full ml-2 z-50 w-[500px] bg-white border border-gray-200 rounded-lg shadow-2xl
                  p-6 transition-all duration-300 ease-out transform
                  animate-fade-in
                `}
              >
                <div className="flex items-center mb-4 pb-3 border-b border-gray-100">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 mr-3">
                    <Icon
                      name={category.icon}
                      size={16}
                      className="text-blue-600"
                    />
                  </div>
                  <span className="text-lg font-bold text-gray-800">
                    {category.name}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  {category.subcategories.map((subcat, subIndex) => (
                    <div key={subIndex}>
                      <h4 className="font-semibold text-gray-800 text-base mb-3 border-b border-gray-100 pb-2">
                        {subcat.name}
                      </h4>
                      <div className="space-y-2">
                        {subcat.items.map((item, i) => (
                          <div
                            key={i}
                            className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer py-1.5 px-2 rounded hover:bg-blue-50 transition-all duration-150"
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
        ))}
      </div>
    </div>
  );
};
