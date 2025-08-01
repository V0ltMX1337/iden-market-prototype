import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { storeApi } from "@/lib/store";
import { AdStatus, FilterType, type Ad, type Category, type City, type Subcategory, type FilterDefinition } from "@/lib/types";
import { useAuth } from "./useAuth";

const ADS_PER_PAGE = 10;

type FilterValue = string | string[] | number[];

export const useCategoryFilters = () => {
  const { categoryid } = useParams<{ categoryid: string }>();
  const location = useLocation();
  const { user } = useAuth();

  // State
  const [categories, setCategories] = useState<Category[]>([]);
  const [ads, setAds] = useState<Ad[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtersDefs, setFiltersDefs] = useState<FilterDefinition[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, FilterValue>>({});
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Category path for breadcrumbs
  const [categoryPath, setCategoryPath] = useState<
    { name: string; slug: string; fullSlug: string }[]
  >([]);
  const [categoryFullSlug, setCategoryFullSlug] = useState("");

  // Parse subcategories from path
  const subslugs: string[] = (() => {
    if (!categoryid) return [];
    const basePath = `/category/${categoryid}`;
    const path = location.pathname;
    if (path === basePath) return [];
    const tail = path.startsWith(basePath) ? path.slice(basePath.length) : "";
    return tail.split("/").filter(Boolean);
  })();

  // Build category path
  const buildCategoryPath = async (
    categorySlug: string,
    subSlugs: string[]
  ): Promise<{ name: string; slug: string; fullSlug: string }[]> => {
    try {
      const categoriesData: Category[] = await storeApi.getCategories();
      const category = categoriesData.find((cat) => cat.slug === categorySlug);
      if (!category) return [];

      const basePath = [
        {
          name: category.name,
          slug: category.slug,
          fullSlug: category.slug,
        },
      ];

      const findSubcategoryPath = (
        subs: Subcategory[],
        slugs: string[],
        level = 0,
        path: { name: string; slug: string; fullSlug: string }[] = [],
        slugsAcc: string[] = []
      ): { name: string; slug: string; fullSlug: string }[] | null => {
        if (level >= slugs.length) return path;

        const currentSlug = slugs[level];
        const sub = subs.find((s) => s.slug === currentSlug);
        if (!sub) return null;

        const newSlugsAcc = [...slugsAcc, sub.slug];
        const newPath = [
          ...path,
          { name: sub.name, slug: sub.slug, fullSlug: newSlugsAcc.join("/") },
        ];

        if (level === slugs.length - 1) return newPath;

        if (sub.children?.length) {
          return findSubcategoryPath(sub.children, slugs, level + 1, newPath, newSlugsAcc);
        }

        return newPath;
      };

      const subPath = findSubcategoryPath(category.subcategories ?? [], subSlugs);

      return subPath ? [...basePath, ...subPath] : basePath;
    } catch (err) {
      console.error("Ошибка при построении пути:", err);
      return [];
    }
  };

  // Load initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [categoriesData, filters, adsData, citiesData] = await Promise.all([
          storeApi.getCategories(),
          storeApi.getFilters(),
          storeApi.getAds(),
          storeApi.getCities(),
        ]);
        setCategories(categoriesData);
        setAds(adsData.filter((ad) => ad.adStatus === AdStatus.ACTIVE));
        setCities(citiesData);
        setFiltersDefs(filters);
        
        if (categoryid) {
          const path = await buildCategoryPath(categoryid, subslugs);
          setCategoryPath(path);
          setCategoryFullSlug(path.map((p) => p.slug).join("/"));
        } else {
          setCategoryPath([]);
          setCategoryFullSlug("");
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [categoryid, location.pathname]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [minPrice, maxPrice, selectedCities, selectedFilters, categoryid, location.pathname]);

  // Get current category and subcategory
  const category = categories.find((cat) => cat.slug === categoryid);
  const currentSub = categoryPath.length > 0 ? categoryPath[categoryPath.length - 1] : undefined;

  // Helper functions for subcategory navigation
  const findSubBySlug = (subs: Subcategory[] | undefined, slug: string): Subcategory | undefined =>
    subs?.find((s) => s.slug === slug);

  const findSubcategoryByPath = (
    subs: Subcategory[] | undefined,
    slugs: string[]
  ): Subcategory | undefined => {
    if (!subs || slugs.length === 0) return undefined;
    let currentSubs = subs;
    let foundSub: Subcategory | undefined = undefined;
    for (const slug of slugs) {
      foundSub = findSubBySlug(currentSubs, slug);
      if (!foundSub) return undefined;
      currentSubs = foundSub.children ?? [];
    }
    return foundSub;
  };

  const lastSubcategory = category
    ? findSubcategoryByPath(category.subcategories, subslugs)
    : undefined;

  const collectSubcategoryIds = (subcat: Subcategory | undefined): string[] => {
    if (!subcat) return [];
    let ids = [subcat.id];
    if (subcat.children && subcat.children.length > 0) {
      subcat.children.forEach((child) => {
        ids = ids.concat(collectSubcategoryIds(child));
      });
    }
    return ids;
  };

  const allowedCategoryIds = category ? [category.id] : [];
  const allowedSubcategoryIds = lastSubcategory ? collectSubcategoryIds(lastSubcategory) : [];

  // Filter ads
  const filteredAds = ads.filter((ad) => {
    // Category filter
    if (!allowedCategoryIds.includes(ad.categoryId)) return false;
    
    // Subcategory filter
    if (allowedSubcategoryIds.length > 0 && !allowedSubcategoryIds.includes(ad.subcategoryId))
      return false;
    
    // Price filter
    if (minPrice > 0 && ad.price < minPrice) return false;
    if (maxPrice > 0 && ad.price > maxPrice) return false;
    
    // City filter
    if (selectedCities.length && !selectedCities.includes(ad.city.id)) return false;
    
    // Custom filters
    for (const filterId in selectedFilters) {
      const selected = selectedFilters[filterId];
      
      // Skip empty filters
      if (!selected || 
          (Array.isArray(selected) && selected.length === 0) ||
          (typeof selected === "string" && selected === "")) {
        continue;
      }

      const adFilter = ad.filters.find((f) => f.filterId === filterId);
      if (!adFilter) return false;

      const def = filtersDefs.find((f) => f.id === filterId);
      if (!def) return false;

      switch (def.type) {
        case FilterType.SELECT:
          if (selected && adFilter.value !== selected) return false;
          break;
        case FilterType.CHECKBOX:
          if (Array.isArray(selected)) {
            const selectedArray = selected as string[];
            if (selectedArray.length > 0 && !selectedArray.includes(adFilter.value)) return false;
          }
          break;
        case FilterType.RANGE:
          const [min, max] = selected as number[];
          const numericValue = Number(adFilter.value);
          if (numericValue < min || numericValue > max) return false;
          break;
      }
    }
    return true;
  });

  const totalPages = Math.ceil(filteredAds.length / ADS_PER_PAGE);
  const paginatedAds = filteredAds.slice(
    (currentPage - 1) * ADS_PER_PAGE,
    currentPage * ADS_PER_PAGE
  );

  // Handlers
  const handleCityChange = (cityId: string) => {
    setSelectedCities((prev) =>
      prev.includes(cityId) ? prev.filter((c) => c !== cityId) : [...prev, cityId]
    );
  };

  const handleFilterChange = (filterId: string, value: FilterValue) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterId]: value
    }));
  };

  const clearAllFilters = () => {
    setMinPrice(0);
    setMaxPrice(0);
    setSelectedCities([]);
    setSelectedFilters({});
    setIsMobileFiltersOpen(false);
  };

  const setPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(totalPages, page)));
  };

  // Фильтруем фильтры по текущей категории/подкатегории
  const getAvailableFilters = (): FilterDefinition[] => {
    if (!categoryid) {
      // Если категория не выбрана, показываем все фильтры
      return filtersDefs;
    }

    if (!category) return [];

    // Собираем все доступные фильтры из подкатегорий
    const collectFiltersFromSubcategories = (subcategories: Subcategory[]): string[] => {
      let filterIds: string[] = [];
      
      for (const sub of subcategories) {
        // Добавляем фильтры текущей подкатегории
        filterIds = filterIds.concat(sub.filters.map(f => f.filterId));
        
        // Рекурсивно добавляем фильтры из дочерних подкатегорий
        if (sub.children && sub.children.length > 0) {
          filterIds = filterIds.concat(collectFiltersFromSubcategories(sub.children));
        }
      }
      
      return filterIds;
    };

    let availableFilterIds: string[] = [];

    if (lastSubcategory) {
      // Если выбрана конкретная подкатегория, берем только её фильтры
      availableFilterIds = lastSubcategory.filters.map(f => f.filterId);
      
      // Добавляем фильтры из дочерних подкатегорий
      if (lastSubcategory.children) {
        availableFilterIds = availableFilterIds.concat(
          collectFiltersFromSubcategories(lastSubcategory.children)
        );
      }
    } else {
      // Если выбрана только категория, берем все фильтры из всех подкатегорий
      availableFilterIds = collectFiltersFromSubcategories(category.subcategories);
    }

    // Убираем дубликаты и возвращаем только нужные фильтры
    const uniqueFilterIds = [...new Set(availableFilterIds)];
    return filtersDefs.filter(filter => uniqueFilterIds.includes(filter.id));
  };

  const availableFilters = getAvailableFilters();

  return {
    // Data
    categories,
    ads,
    cities,
    filtersDefs: availableFilters,
    category,
    lastSubcategory,
    categoryPath,
    categoryFullSlug,
    subslugs,
    
    // State
    loading,
    currentPage,
    totalPages,
    filteredAds,
    paginatedAds,
    
    // Filters
    minPrice,
    maxPrice,
    selectedCities,
    selectedFilters,
    isMobileFiltersOpen,
    
    // Setters
    setMinPrice,
    setMaxPrice,
    setSelectedCities,
    setSelectedFilters,
    setIsMobileFiltersOpen,
    setPage,
    
    // Handlers
    handleCityChange,
    handleFilterChange,
    clearAllFilters,

    user,
    isFavorite,
    setIsFavorite,
    
    // Constants
    ADS_PER_PAGE
  };
};