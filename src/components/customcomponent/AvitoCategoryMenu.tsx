import React, { useState, useRef } from "react";
import * as LucideIcons from "lucide-react";
import type { Category, Subcategory } from "@/lib/types";
import { Link } from "react-router-dom";

interface AvitoCategoryMenuProps {
  categories: Category[];
}

const SubcategoryList = ({
  subcategories,
  categorySlug,
  parentPath = [],
}: {
  subcategories: Subcategory[];
  categorySlug: string;
  parentPath?: string[];
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (index: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setHoveredIndex(null), 100);
  };

  return (
    <div className="grid grid-cols-2 gap-6" onMouseLeave={handleMouseLeave}>
      {subcategories.map((subcat, idx) => {
        const hasChildren = subcat.children && subcat.children.length > 0;
        const fullPath = [...parentPath, subcat.slug]; // собираем полный путь по slug

        return (
          <div
            key={subcat.slug}
            className="relative group"
            onMouseEnter={() => handleMouseEnter(idx)}
          >
            <Link
              to={`/category/${categorySlug}/${fullPath.join("/")}`}
              className="block font-semibold text-gray-800 text-base mb-2 cursor-pointer hover:text-blue-600"
            >
              {subcat.name}
            </Link>

            {hasChildren && hoveredIndex === idx && (
              <div
                className="absolute top-0 left-full ml-4 w-[300px] bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50"
                onMouseEnter={() => handleMouseEnter(idx)}
                onMouseLeave={handleMouseLeave}
              >
                <SubcategoryList
                  subcategories={subcat.children ?? []} // если undefined, передаём пустой массив
                  categorySlug={categorySlug}
                  parentPath={fullPath}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export const AvitoCategoryMenu = ({ categories }: AvitoCategoryMenuProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (index: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setHoveredIndex(null), 100);
  };

  return (
    <div className="relative w-full">
      <div className="w-full">
        {categories.map((category, index) => {
          const IconComponent =
            (category.icon && (LucideIcons as any)[category.icon]) || LucideIcons.Box;
          const hasSubcategories = category.subcategories?.length > 0;

          return (
            <div
              key={category.slug} // лучше ключ по slug для уникальности
              className="group relative"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="px-4 py-3 cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 flex items-center select-none">
                <div className="flex items-center justify-center w-6 h-6 rounded-md bg-gradient-to-br from-blue-100 to-purple-100 mr-3">
                  <IconComponent className="text-blue-600" size={14} />
                </div>
                <span className="font-medium text-gray-700 text-sm">{category.name}</span>
                {hasSubcategories && (
                  <LucideIcons.ChevronRight className="ml-auto text-gray-400" size={14} />
                )}
              </div>

              {hoveredIndex === index && hasSubcategories && (
                <div
                  className="absolute top-0 left-full ml-2 z-50 w-[400px] bg-white border border-gray-200 rounded-lg shadow-2xl p-6 transition-all duration-300 ease-out transform animate-fade-in"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="flex items-center mb-4 pb-3 border-b border-gray-100">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 mr-3">
                      <IconComponent className="text-blue-600" size={16} />
                    </div>
                    <span className="text-lg font-bold text-gray-800">{category.name}</span>
                  </div>

                  <SubcategoryList
                    subcategories={category.subcategories}
                    categorySlug={category.slug}  // передаём slug вместо id
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
