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
  level = 1,
  isMobile = false,
}: {
  subcategories: Subcategory[];
  categorySlug: string;
  parentPath?: string[];
  level?: number;
  isMobile?: boolean;
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

  const containerClass =
    level === 1
      ? "grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6"
      : "flex flex-col gap-2";

  if (isMobile) {
    return (
      <div className={containerClass}>
        {subcategories.map((subcat) => {
          const fullPath = [...parentPath, subcat.slug];
          const hasChildren = subcat.children && subcat.children.length > 0;
          return (
            <div key={subcat.slug} className="pl-2 border-l border-gray-300">
              <Link
                to={`/category/${categorySlug}/${fullPath.join("/")}`}
                className="block font-semibold text-gray-800 text-sm mb-1 hover:text-blue-600 transition-colors"
              >
                {subcat.name}
              </Link>
              {hasChildren && (
                <SubcategoryList
                  subcategories={subcat.children ?? []}
                  categorySlug={categorySlug}
                  parentPath={fullPath}
                  level={level + 1}
                  isMobile={true}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={containerClass} onMouseLeave={handleMouseLeave}>
      {subcategories.map((subcat, idx) => {
        const hasChildren = subcat.children && subcat.children.length > 0;
        const fullPath = [...parentPath, subcat.slug];

        // Для первого уровня всегда позиционируем справа и фиксируем
        // Для вложенных уровней — первая подкатегория справа, остальные вниз
        const submenuStyle = (() => {
          if (level === 1) {
            return {
              top: 0,
              left: "100%",
              marginLeft: "0.5rem",
              width: 320,
              maxHeight: "400px",
              overflowY: "auto",
              position: "fixed",
              backgroundColor: "white",
              borderRadius: "0.5rem",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              padding: "1rem",
              zIndex: 2000 + idx,
            };
          } else {
            if (idx === 0) {
              return {
                top: 0,
                left: "100%",
                marginLeft: "0.5rem",
                width: 250,
              };
            } else {
              return {
                top: "100%",
                left: 0,
                marginTop: "0.5rem",
                width: 250,
              };
            }
          }
        })();

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
                className="pointer-events-auto"
                style={submenuStyle}
                onMouseEnter={() => {
                  if (timeoutRef.current) clearTimeout(timeoutRef.current);
                  setHoveredIndex(idx);
                }}
                onMouseLeave={() => {
                  timeoutRef.current = setTimeout(() => setHoveredIndex(null), 200);
                }}
              >
                <SubcategoryList
                  subcategories={subcat.children ?? []}
                  categorySlug={categorySlug}
                  parentPath={fullPath}
                  level={level + 1}
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
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
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
                <span className="font-medium text-gray-700 text-xs md:text-sm">
                  {category.name}
                </span>
                {hasSubcategories && (
                  <LucideIcons.ChevronRight
                    className={`ml-auto text-gray-400 transition-transform ${
                      isOpen && isMobile ? "rotate-90" : ""
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
                    position: "fixed",
                    transform: "translateZ(0)",
                    isolation: "isolate",
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
                    <span className="text-base md:text-lg font-bold text-gray-800">
                      {category.name}
                    </span>
                  </div>

                  <div className="relative" style={{ zIndex: 1 }}>
                    <SubcategoryList
                      subcategories={category.subcategories}
                      categorySlug={category.slug}
                      level={1}
                      isMobile={false}
                    />
                  </div>
                </div>
              )}

              {/* Mobile подменю */}
              {isMobile && isOpen && hasSubcategories && (
                <div
                  className="bg-gray-50 border-t border-gray-200 px-4 py-3"
                  style={{
                    maxHeight: "70vh",
                    overflowY: "auto",
                    WebkitOverflowScrolling: "touch",
                  }}
                >
                  <SubcategoryList
                    subcategories={category.subcategories}
                    categorySlug={category.slug}
                    isMobile={true}
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
