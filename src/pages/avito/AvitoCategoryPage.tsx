import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { storeApi } from "@/lib/store";
import { AdStatus, type Ad, type Category, type City, type Subcategory } from "@/lib/types";
import AvitoHeader from "@/components/avitomarket/AvitoHeader";
import AvitoFooter from "@/components/avitomarket/AvitoFooter";
import Breadcrumbs from "@/components/customcomponent/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const ADS_PER_PAGE = 10;

const AvitoCategoryPage = () => {
  const { categoryid } = useParams<{ categoryid: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [categories, setCategories] = useState<Category[]>([]);
  const [ads, setAds] = useState<Ad[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Новый стейт для хлебных крошек
  const [categoryPath, setCategoryPath] = useState<
    { name: string; slug: string; fullSlug: string }[]
  >([]);
  const [categoryFullSlug, setCategoryFullSlug] = useState("");

  // Разбор подкатегорий из пути
  const subslugs: string[] = (() => {
    if (!categoryid) return [];
    const basePath = `/category/${categoryid}`;
    const path = location.pathname;
    if (path === basePath) return [];
    const tail = path.startsWith(basePath) ? path.slice(basePath.length) : "";
    return tail.split("/").filter(Boolean);
  })();

  // Асинхронная функция построения пути, адаптирована из твоего примера
  const buildCategoryPath = async (
    categorySlug: string,
    subSlugs: string[]
  ): Promise<{ name: string; slug: string; fullSlug: string }[]> => {
    try {
      const categoriesData: Category[] = await storeApi.getCategories();
      const category = categoriesData.find((cat) => cat.slug === categorySlug);
      if (!category) return [];

      // Первый элемент - категория
      const basePath = [
        {
          name: category.name,
          slug: category.slug,
          fullSlug: category.slug,
        },
      ];

      // Рекурсивный поиск пути подкатегорий
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

  // Остальная логика (фильтрация объявлений и т.д.) без изменений, только category и currentSub теперь можно брать из categoryPath

  // Чтобы получить category и currentSub для фильтров и навигации
  const category = categories.find((cat) => cat.slug === categoryid);
  const currentSub = (() => {
    if (!categoryPath.length) return undefined;
    return categoryPath[categoryPath.length - 1];
  })();

  const allowedCategoryIds = category ? [category.id] : [];
  // Здесь получаем id подкатегорий из текущей последней подкатегории
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

  const allowedSubcategoryIds = lastSubcategory ? collectSubcategoryIds(lastSubcategory) : [];

  // Фильтрация объявлений
  const filteredAds = ads.filter((ad) => {
    if (!allowedCategoryIds.includes(ad.categoryId)) return false;
    if (allowedSubcategoryIds.length > 0 && !allowedSubcategoryIds.includes(ad.subcategoryId))
      return false;
    if (minPrice && ad.price < minPrice) return false;
    if (maxPrice && ad.price > maxPrice) return false;
    if (selectedCities.length && !selectedCities.includes(ad.city.id)) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredAds.length / ADS_PER_PAGE);
  const paginatedAds = filteredAds.slice(
    (currentPage - 1) * ADS_PER_PAGE,
    currentPage * ADS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [minPrice, maxPrice, selectedCities, categoryid, location.pathname]);

  const handleCityChange = (cityId: string) => {
    setSelectedCities((prev) =>
      prev.includes(cityId) ? prev.filter((c) => c !== cityId) : [...prev, cityId]
    );
  };

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-3 text-sm md:text-base">Цена (₽)</h3>
        <div className="flex space-x-2 text-sm mb-3">
          <Input
            type="number"
            placeholder="от"
            value={minPrice || ""}
            onChange={e => setMinPrice(Number(e.target.value))}
            className="w-1/2 h-8 md:h-10"
          />
          <Input
            type="number"
            placeholder="до"
            value={maxPrice || ""}
            onChange={e => setMaxPrice(Number(e.target.value))}
            className="w-1/2 h-8 md:h-10"
          />
        </div>
        <Slider
          value={[minPrice, maxPrice]}
          min={0}
          max={1000000}
          step={1000}
          onValueChange={([min, max]) => {
            setMinPrice(min);
            setMaxPrice(max);
          }}
        />
      </div>

      <div>
        <h3 className="font-medium mb-3 text-sm md:text-base">Город</h3>
        <div className="max-h-32 md:max-h-40 overflow-y-auto">
          {cities.map(city => (
            <label key={city.id} className="flex items-center space-x-2 mb-2 text-xs md:text-sm">
              <Checkbox
                checked={selectedCities.includes(city.id)}
                onCheckedChange={() => handleCityChange(city.id)}
              />
              <span>{city.name}</span>
            </label>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full text-xs md:text-sm h-8 md:h-10"
        onClick={() => {
          setMinPrice(0);
          setMaxPrice(0);
          setSelectedCities([]);
          setIsMobileFiltersOpen(false);
        }}
      >
        Сбросить фильтры
      </Button>
    </div>
  );

  return (
    <>
      <AvitoHeader />
      <main className="flex flex-col md:flex-row bg-gray-50 min-h-screen pt-16 md:pt-20">
        {/* Desktop фильтры */}
        <aside className="hidden md:block w-64 p-4 bg-white border-r">
          <h2 className="font-bold mb-4">Фильтры</h2>
          <FilterContent />
        </aside>

        <section className="flex-1 p-3 md:p-6">
          <div className="mb-3 md:mb-4">
            <Breadcrumbs categoryPath={categoryPath} fullSlug={categoryFullSlug} />
          </div>

          {/* Mobile шапка с фильтрами */}
          <div className="flex items-center justify-between mb-4 md:hidden">
            <h1 className="text-lg font-bold truncate">{category?.name || "Категория"}</h1>
            <Sheet open={isMobileFiltersOpen} onOpenChange={setIsMobileFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Фильтры
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[80vh]">
                <SheetHeader>
                  <SheetTitle className="flex items-center justify-between">
                    Фильтры
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsMobileFiltersOpen(false)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-4">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop заголовок */}
          <h1 className="hidden md:block text-xl md:text-2xl font-bold mb-4">{category?.name || "Категория не найдена"}</h1>

          {/* Навигация по подкатегориям */}
          <div className="flex gap-2 mb-4 overflow-x-auto">
            {lastSubcategory
              ? lastSubcategory.children?.map((sub) => (
                  <Button
                    key={sub.slug}
                    variant={
                      sub.slug === subslugs[subslugs.length - 1] ? "default" : "outline"
                    }
                    size={"sm"}
                    className="whitespace-nowrap text-xs md:text-sm"
                    onClick={() => {
                      const newPath = `/category/${categoryid}/${[...subslugs, sub.slug].join("/")}`;
                      navigate(newPath);
                    }}
                  >
                    {sub.name}
                  </Button>
                ))
              : category?.subcategories.map((sub) => (
                  <Button
                    key={sub.slug}
                    variant={sub.slug === subslugs[0] ? "default" : "outline"}
                    size={"sm"}
                    className="whitespace-nowrap text-xs md:text-sm"
                    onClick={() => navigate(`/category/${categoryid}/${sub.slug}`)}
                  >
                    {sub.name}
                  </Button>
                ))}
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
              {Array.from({ length: ADS_PER_PAGE }).map((_, i) => (
                <Card key={i} className="p-2 md:p-4 space-y-2 md:space-y-3">
                  <Skeleton className="h-24 md:h-32 w-full rounded" />
                  <Skeleton className="h-3 md:h-5 w-3/4" />
                  <Skeleton className="h-2 md:h-4 w-1/2" />
                </Card>
              ))}
            </div>
          ) : (
            <>
              {paginatedAds.length === 0 ? (
                <div className="text-center text-gray-500 py-8">Объявления не найдены</div>
              ) : (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
                    {paginatedAds.map((ad) => (
                      <Card
                        key={ad.id}
                        className="overflow-hidden cursor-pointer group relative flex flex-col border-0 shadow-md hover:shadow-lg transition-shadow"
                        onClick={() => navigate(`/product/${ad.id}`)}
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-1 md:top-2 right-1 md:right-2 z-10 bg-white/80 hover:bg-white h-6 w-6 md:h-8 md:w-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log("Добавлено в избранное:", ad.id);
                          }}
                        >
                          <Heart className="w-3 h-3 md:w-4 md:h-4 text-red-500" />
                        </Button>

                        <div className="relative w-full h-24 md:h-40 bg-gray-200 overflow-hidden">
                          <img
                            src={ad.links?.[0]}
                            alt={ad.title}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <CardContent className="flex flex-col flex-1 p-2 md:p-4">
                          <h3 className="text-xs md:text-base font-semibold leading-tight mb-1" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{ad.title}</h3>
                          <p className="text-xs md:text-sm font-bold text-blue-600 mt-auto">{ad.price.toLocaleString()} ₽</p>
                          <p className="text-xs text-gray-500 truncate">{ad.city.name}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="mt-4 md:mt-6 flex justify-center items-center space-x-2">
                    <Button
                      size="sm"
                      disabled={currentPage <= 1}
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      className="text-xs md:text-sm"
                    >
                      Назад
                    </Button>
                    <span className="px-2 md:px-4 py-1 md:py-2 text-xs md:text-sm">
                      {currentPage} / {totalPages}
                    </span>
                    <Button
                      size="sm"
                      disabled={currentPage >= totalPages}
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      className="text-xs md:text-sm"
                    >
                      Вперед
                    </Button>
                  </div>
                </>
              )}
            </>
          )}
        </section>
      </main>
      <AvitoFooter />
    </>
  );
};

export default AvitoCategoryPage;