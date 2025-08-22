import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Ad, FilterType, User, City } from "@/lib/types";
import AvitoHeader from "@/components/avitomarket/AvitoHeader";
import AvitoFooter from "@/components/avitomarket/AvitoFooter";
import Breadcrumbs from "@/components/customcomponent/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import AdBanner from "@/components/ui/AdBanner";

const AvitoCategoryWithCity = () => {
  const navigate = useNavigate();
  const { city: citySlug, slug } = useParams();
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [isSelectingCity, setIsSelectingCity] = useState(!citySlug);

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
    
    // Actions
    handleFilterUpdate,
    handleCityToggle,
    clearFilters,
    toggleFavorite,
  } = useCategoryFilters(slug || '');

  const { getPageTitle } = usePageTitle();

  // Load selected city on mount
  useEffect(() => {
    if (citySlug && cities.length > 0) {
      const city = cities.find(c => c.slug === citySlug);
      if (city) {
        setSelectedCity(city);
        setIsSelectingCity(false);
        // Update filters to include only this city
        if (!selectedCities.includes(city.id)) {
          handleCityToggle(city.id);
        }
      }
    }
  }, [citySlug, cities, selectedCities, handleCityToggle]);

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
    setIsSelectingCity(false);
    // Navigate to the new URL with city
    navigate(`/category/${city.slug}/${slug}`);
  };

  const handleChangeCity = () => {
    setIsSelectingCity(true);
  };

  if (isSelectingCity) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <AvitoHeader />
        
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 animate-slide-up">
              <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
                Выберите ваш город
              </h1>
              <p className="text-gray-600 text-lg">
                {category?.name && `Объявления в категории "${category.name}"`}
              </p>
            </div>

            <div className="glass rounded-3xl p-6 shadow-soft">
              <div className="mb-6">
                <Input
                  type="text"
                  placeholder="Поиск по городу..."
                  className="w-full text-lg"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cities.map((city) => (
                  <Card
                    key={city.id}
                    className="cursor-pointer hover-lift transition-all duration-200 border-2 hover:border-primary animate-scale-in"
                    onClick={() => handleCitySelect(city)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <Icon name="MapPin" size={24} className="text-white" />
                      </div>
                      <h3 className="font-semibold text-lg">{city.name}</h3>
                      <p className="text-sm text-gray-600">
                        {city.adCount || 0} объявлений
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Popular cities */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Популярные города</h3>
                <div className="flex flex-wrap gap-2">
                  {cities.slice(0, 10).map((city) => (
                    <Button
                      key={city.id}
                      variant="outline"
                      className="hover-lift"
                      onClick={() => handleCitySelect(city)}
                    >
                      {city.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>

        <AvitoFooter />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <AvitoHeader />
        <main className="container mx-auto px-4 py-8">
          <div className="space-y-4">
            <Skeleton className="h-8 w-64" />
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-32 w-full" />
              </div>
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} className="h-64 w-full" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
        <AvitoFooter />
      </div>
    );
  }

  const pageTitle = getPageTitle(
    category?.name 
      ? `${category.name}${selectedCity ? ` в ${selectedCity.name}` : ''}`
      : 'Категории'
  );

  const breadcrumbPath = categoryPath.map((cat, index) => ({
    label: cat.name,
    href: index === categoryPath.length - 1 
      ? `/category/${selectedCity?.slug || 'all'}/${categoryFullSlug}`
      : `/category/${selectedCity?.slug || 'all'}/${subslugs.slice(0, index + 1).join('/')}`
  }));

  // Add city to breadcrumbs
  if (selectedCity) {
    breadcrumbPath.unshift({
      label: selectedCity.name,
      href: `/category/${selectedCity.slug}/${categoryFullSlug}`
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={`Объявления в категории ${category?.name}${selectedCity ? ` в городе ${selectedCity.name}` : ''}`} />
      </Helmet>

      <AvitoHeader />

      <main className="container mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center justify-between animate-slide-up">
          <Breadcrumbs path={breadcrumbPath} />
          
          {selectedCity && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleChangeCity}
              className="flex items-center gap-2 hover-lift"
            >
              <Icon name="MapPin" size={16} />
              {selectedCity.name}
              <Icon name="ChevronDown" size={14} />
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Desktop Filters */}
          <div className="hidden lg:block space-y-6 animate-slide-up">
            <div className="glass rounded-2xl p-6 shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Фильтры</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-sm"
                >
                  Сбросить
                </Button>
              </div>

              {/* Price Range */}
              <div className="space-y-4 mb-6">
                <h4 className="font-medium">Цена, ₽</h4>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="от"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    placeholder="до"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>

              {/* Category Filters */}
              {filtersDefs.map((filterDef) => (
                <div key={filterDef.id} className="space-y-3 mb-6">
                  <h4 className="font-medium">{filterDef.name}</h4>
                  <div className="space-y-2">
                    {filterDef.options?.map((option) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`filter-${filterDef.id}-${option.id}`}
                          checked={selectedFilters.some(f => f.filterId === filterDef.id && f.optionId === option.id)}
                          onCheckedChange={(checked) => 
                            handleFilterUpdate(filterDef.id, option.id, checked as boolean)
                          }
                        />
                        <label
                          htmlFor={`filter-${filterDef.id}-${option.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {option.value}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar Ad */}
            <AdBanner type="vertical" size="large" className="sticky top-6" />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Mobile Filters */}
            <div className="lg:hidden animate-slide-up">
              <Sheet open={isMobileFiltersOpen} onOpenChange={setIsMobileFiltersOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Icon name="Filter" size={16} className="mr-2" />
                    Фильтры
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 custom-scrollbar">
                  <SheetHeader>
                    <SheetTitle>Фильтры</SheetTitle>
                  </SheetHeader>
                  <div className="py-4 space-y-6">
                    {/* Same filter content as desktop */}
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Results Header */}
            <div className="glass rounded-2xl p-6 shadow-soft animate-slide-up">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold gradient-text">
                    {lastSubcategory?.name || category?.name || 'Категории'}
                  </h1>
                  {selectedCity && (
                    <p className="text-gray-600 mt-1">
                      в городе {selectedCity.name}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Найдено</p>
                  <p className="text-xl font-bold text-primary">{paginatedAds.length}</p>
                </div>
              </div>
            </div>

            {/* Ads Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {paginatedAds.map((ad, index) => (
                <div key={ad.id}>
                  <Card
                    className="cursor-pointer hover-lift transition-all duration-200 animate-scale-in glass shadow-soft"
                    onClick={() => navigate(`/product/${ad.slug}/${ad.id}`)}
                  >
                    <div className="relative">
                      <img
                        src={ad.links?.[0] || '/placeholder.png'}
                        alt={ad.title}
                        className="w-full h-48 object-cover rounded-t-xl"
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2 h-8 w-8 p-0 bg-white/80 hover:bg-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(ad.id);
                        }}
                      >
                        <Icon name="Heart" size={16} />
                      </Button>
                    </div>
                    
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2 text-shadow">{ad.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                        {ad.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-primary">
                          {ad.price?.toLocaleString() || 'Цена не указана'} ₽
                        </span>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Icon name="MapPin" size={12} />
                          {ad.city?.name || 'Город не указан'}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <Icon name="User" size={12} className="text-white" />
                          </div>
                          <span className="text-sm text-gray-600">
                            {ad.user?.firstName || 'Аноним'}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400">
                          {new Date(ad.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Insert ad banner every 6 ads */}
                  {(index + 1) % 6 === 0 && (
                    <div className="my-6">
                      <AdBanner type="horizontal" size="large" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {paginatedAds.length === 0 && (
              <div className="glass rounded-2xl p-12 text-center shadow-soft animate-scale-in">
                <Icon name="Search" size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Объявления не найдены</h3>
                <p className="text-gray-600 mb-4">
                  {selectedCity 
                    ? `В городе ${selectedCity.name} пока нет объявлений в этой категории`
                    : 'Попробуйте изменить фильтры или выбрать другую категорию'
                  }
                </p>
                <div className="flex gap-2 justify-center">
                  <Button variant="outline" onClick={clearFilters}>
                    Сбросить фильтры
                  </Button>
                  <Button onClick={handleChangeCity}>
                    Выбрать другой город
                  </Button>
                </div>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center space-x-2 animate-slide-up">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={page === currentPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPage(page)}
                    className="hover-lift"
                  >
                    {page}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <AvitoFooter />
    </div>
  );
};

export default AvitoCategoryWithCity;