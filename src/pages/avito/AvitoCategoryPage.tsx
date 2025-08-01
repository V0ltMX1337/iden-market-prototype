import { useNavigate } from "react-router-dom";
import { Ad, FilterType, User } from "@/lib/types";
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
import { useCategoryFilters } from "@/hooks/useCategoryFilters";
import { usePageTitle } from "@/hooks/usePageTitle";
import { Helmet } from "react-helmet-async";
import { storeApi } from "@/lib/store";
import Icon from "@/components/ui/icon";

const AvitoCategoryPage = () => {
  const navigate = useNavigate();
  const {
    // Data
    cities,
    filtersDefs,
    category,
    lastSubcategory,
    categoryPath,
    categoryFullSlug,
    subslugs,
    
    // State
    loading,
    currentPage,
    totalPages,
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
  } = useCategoryFilters();

  const { getPageTitle, settings: systemSettings } = usePageTitle();

  // Формируем заголовок
  const pageTitle =
    category && systemSettings && categoryPath.length
      ? getPageTitle("categoryTitle", {
          categorytitle: category?.name || "Категория не найдена",
        })
      : "";

  const toggleFavorite = async (user: User, product: Ad, isFavorite: boolean) => {
      if (!user || !product) return alert("Войдите в аккаунт");
      try {
        const [favorites] = await Promise.all([
            storeApi.getFavorites(user.id),
          ]);
          setIsFavorite(favorites.includes(product.id));
          
        if (isFavorite) {
          await storeApi.removeFavorite(user.id, product.id);
          setIsFavorite(false);
        } else {
          await storeApi.addFavorite(user.id, product.id);
          setIsFavorite(true);
        }
      } catch {
        alert("Ошибка при обновлении избранного");
      }
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
            onChange={e => setMinPrice(Number(e.target.value) || 0)}
            className="w-1/2 h-8 md:h-10"
          />
          <Input
            type="number"
            placeholder="до"
            value={maxPrice || ""}
            onChange={e => setMaxPrice(Number(e.target.value) || 0)}
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

      {filtersDefs.map((filter) => {
        const currentVal = selectedFilters[filter.id];

        switch (filter.type) {
          case FilterType.SELECT:
            return (
              <div key={filter.id} className="mb-4">
                <h3 className="text-sm font-medium mb-2">{filter.name}</h3>
                <select
                  value={typeof currentVal === "string" ? currentVal : ""}
                  onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                  className="w-full border p-2 rounded text-sm"
                >
                  <option value="">Не выбрано</option>
                  {filter.values.map((val) => (
                    <option key={val} value={val}>{val}</option>
                  ))}
                </select>
              </div>
            );

          case FilterType.CHECKBOX:
            return (
              <div key={filter.id} className="mb-4">
                <h3 className="text-sm font-medium mb-2">{filter.name}</h3>
                {filter.values.map((val) => (
                  <label key={val} className="flex items-center space-x-2 text-xs mb-1">
                    <Checkbox
                      checked={Array.isArray(currentVal) && (currentVal as string[]).includes(val)}
                      onCheckedChange={() => {
                        const prevArr = Array.isArray(currentVal) ? [...currentVal as string[]] : [];
                        const newVal = prevArr.includes(val)
                          ? prevArr.filter((v) => v !== val)
                          : [...prevArr, val];
                        handleFilterChange(filter.id, newVal);
                      }}
                    />
                    <span>{val}</span>
                  </label>
                ))}
              </div>
            );

          case FilterType.RANGE:
            const [min, max] = currentVal as number[] || [0, 100];
            return (
              <div key={filter.id} className="mb-4">
                <h3 className="text-sm font-medium mb-2">{filter.name}</h3>
                <Slider
                  value={[min, max]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={([newMin, newMax]) => {
                    handleFilterChange(filter.id, [newMin, newMax]);
                  }}
                />
                <div className="flex justify-between text-xs mt-1">
                  <span>{min}</span>
                  <span>{max}</span>
                </div>
              </div>
            );

          default:
            return null;
        }
      })}

      <Button
        variant="outline"
        className="w-full text-xs md:text-sm h-8 md:h-10"
        onClick={clearAllFilters}
      >
        Сбросить фильтры
      </Button>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content={`12 100 объявлений, о ${category?.name || "Категория не найдена"}. в Дзержинске и Нижнем Новгороде. Подробнее на Trivo.`}
        />
        <meta
          name="og:title"
          content={`{pageTitle}`}
        />
      </Helmet>
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
                      const newPath = `/category/${category?.slug}/${[...subslugs, sub.slug].join("/")}`;
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
                    onClick={() => navigate(`/category/${category.slug}/${sub.slug}`)}
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
                        {user && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className={`absolute top-1 md:top-2 right-1 md:right-2 z-10 h-6 w-6 md:h-8 md:w-8 transition-colors ${
                              isFavorite
                                ? "text-red-500 hover:text-red-700"
                                : "text-gray-500 hover:text-gray-700"
                            }`}
                            onClick={() => toggleFavorite(user, ad, isFavorite)}
                            aria-label={isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
                          >
                            <Icon name="Heart" size={20} />
                          </Button>
                        )}

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
                      onClick={() => setPage(currentPage - 1)}
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
                      onClick={() => setPage(currentPage + 1)}
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