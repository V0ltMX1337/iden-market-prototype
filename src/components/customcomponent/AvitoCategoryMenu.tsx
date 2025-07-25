import React, { useState, useRef, useEffect } from "react";
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
    timeoutRef.current = setTimeout(() => setHoveredIndex(null), 200);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6" onMouseLeave={handleMouseLeave}>
      {subcategories.map((subcat, idx) => {
        const hasChildren = subcat.children && subcat.children.length > 0;
        const fullPath = [...parentPath, subcat.slug]; // собираем полный путь по slug

        return (
          <div
            key={subcat.slug}
            className="relative"
            style={{ zIndex: 100 + idx }}
            onMouseEnter={() => handleMouseEnter(idx)}
          >
            <Link
              to={`/category/${categorySlug}/${fullPath.join("/")}`}
              className="block font-semibold text-gray-800 text-sm md:text-base mb-2 cursor-pointer hover:text-blue-600 transition-colors"
            >
              {subcat.name}
            </Link>

            {hasChildren && hoveredIndex === idx && (
              <div
                className="absolute top-0 left-full ml-2 md:ml-4 w-[250px] md:w-[300px] bg-white border border-gray-200 rounded-lg shadow-xl p-3 md:p-4 pointer-events-auto"
                style={{ 
                  zIndex: 2000 + idx,
                  position: 'absolute',
                  transform: 'translateZ(0)'
                }}
                onMouseEnter={() => {
                  if (timeoutRef.current) clearTimeout(timeoutRef.current);
                  setHoveredIndex(idx);
                }}
                onMouseLeave={() => {
                  timeoutRef.current = setTimeout(() => setHoveredIndex(null), 200);
                }}
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
  const [isMobile, setIsMobile] = useState(false);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseEnter = (index: number) => {
    if (isMobile) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    timeoutRef.current = setTimeout(() => setHoveredIndex(null), 300);
  };

  const handleClick = (index: number) => {
    if (!isMobile) return;
    setClickedIndex(clickedIndex === index ? null : index);
  };

  return (
    <div className="relative w-full" style={{ zIndex: 50 }}>
      <div className="w-full">
        {categories.map((category, index) => {
          const IconComponent =
            (category.icon && (LucideIcons as any)[category.icon]) || LucideIcons.Box;
          const hasSubcategories = category.subcategories?.length > 0;
          const isOpen = isMobile ? clickedIndex === index : hoveredIndex === index;

          return (
            <div
              key={category.slug}
              className="relative"
              style={{ zIndex: 50 + index }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div 
                className="px-3 md:px-4 py-2 md:py-3 cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 flex items-center select-none"
                onClick={() => handleClick(index)}
              >
                <div className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-md bg-gradient-to-br from-blue-100 to-purple-100 mr-2 md:mr-3">
                  <IconComponent className="text-blue-600" size={12} />
                </div>
                <span className="font-medium text-gray-700 text-xs md:text-sm">{category.name}</span>
                {hasSubcategories && (
                  <LucideIcons.ChevronRight 
                    className={`ml-auto text-gray-400 transition-transform ${
                      isOpen && isMobile ? 'rotate-90' : ''
                    }`} 
                    size={12} 
                  />
                )}
              </div>

              {/* Desktop подменю */}
              {!isMobile && isOpen && hasSubcategories && (
                <div
                  className="absolute top-0 left-full ml-2 w-[350px] md:w-[400px] bg-white border border-gray-200 rounded-lg shadow-2xl p-4 md:p-6 pointer-events-auto"
                  style={{ 
                    zIndex: 10000 + index,
                    position: 'fixed',
                    transform: 'translateZ(0)',
                    isolation: 'isolate'
                  }}
                  onMouseEnter={() => {
                    if (timeoutRef.current) clearTimeout(timeoutRef.current);
                    setHoveredIndex(index);
                  }}
                  onMouseLeave={() => {
                    timeoutRef.current = setTimeout(() => setHoveredIndex(null), 300);
                  }}
                >
                  <div className="flex items-center mb-3 md:mb-4 pb-2 md:pb-3 border-b border-gray-100">
                    <div className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 mr-2 md:mr-3">
                      <IconComponent className="text-blue-600" size={14} />
                    </div>
                    <span className="text-base md:text-lg font-bold text-gray-800">{category.name}</span>
                  </div>

                  <div className="relative" style={{ zIndex: 1 }}>
                    <SubcategoryList
                      subcategories={category.subcategories}
                      categorySlug={category.slug}
                    />
                  </div>
                </div>
              )}

              {/* Mobile подменю */}
              {isMobile && isOpen && hasSubcategories && (
                <div className="bg-gray-50 border-t border-gray-200 px-4 py-3">
                  <div className="space-y-2">
                    {category.subcategories.map((subcat) => (
                      <Link
                        key={subcat.slug}
                        to={`/category/${category.slug}/${subcat.slug}`}
                        className="block text-sm text-gray-700 hover:text-blue-600 py-1 transition-colors"
                        onClick={() => setClickedIndex(null)}
                      >
                        {subcat.name}
                      </Link>
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