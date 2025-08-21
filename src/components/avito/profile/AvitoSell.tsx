import { useState } from "react";
import { useAvitoSellLogic } from "@/hooks/useAvitoSellLogic";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";
import { ProfilePageSkeleton } from "@/components/ui/skeleton-loader";
import { CategoryStep } from "@/components/avito/sell/steps/CategoryStep";
import { PhotoStep } from "@/components/avito/sell/steps/PhotoStep";
import { LocationStep } from "@/components/avito/sell/steps/LocationStep";
import { DetailsStep } from "@/components/avito/sell/steps/DetailsStep";

enum Step {
  CATEGORY = 0,
  PHOTOS = 1,
  LOCATION = 2,
  DETAILS = 3,
}

const STEPS = [
  { id: Step.CATEGORY, title: "Категория", icon: "FileText" },
  { id: Step.PHOTOS, title: "Фотографии", icon: "Camera" },
  { id: Step.LOCATION, title: "Местоположение", icon: "MapPin" },
  { id: Step.DETAILS, title: "Детали", icon: "FileText" },
];

const AvitoSell = () => {
  const [currentStep, setCurrentStep] = useState<Step>(Step.CATEGORY);

  const {
    isLoadingInit,
    formData,
    subcategoryPath,
    subcategoryLevels,
    categories,
    cities,
    photos,
    filters,
    selectedFilters,
    conditions,
    handleInputChange,
    handleFilterChange,
    handleSubcategorySelect,
    handleSubmit,
    handleRemovePhoto,
    getRootProps,
    getInputProps,
    isSubmitting,
    isDragActive,
    setAsMain,
    addressInputRef,
    addressInput,
    handleAddressChange,
    onAddressBlur,
    onMapLoad,
    onPlacemarkDragEnd,
    mapRef,
  } = useAvitoSellLogic();

  if (isLoadingInit) {
    return <ProfilePageSkeleton />;
  }

  const progress = ((currentStep + 1) / STEPS.length) * 100;

  const canProceedToNext = () => {
    switch (currentStep) {
      case Step.CATEGORY:
        return formData.category;
      case Step.PHOTOS:
        return photos.length > 0;
      case Step.LOCATION:
        return formData.cityId;
      case Step.DETAILS:
        return formData.title && formData.description && formData.price && formData.condition;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit(e);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case Step.CATEGORY:
        return (
          <CategoryStep
            categories={categories}
            subcategoryLevels={subcategoryLevels}
            selectedCategory={formData.category}
            subcategoryPath={subcategoryPath}
            onCategoryChange={(value) => handleInputChange("category", value)}
            onSubcategorySelect={handleSubcategorySelect}
          />
        );
      case Step.PHOTOS:
        return (
          <PhotoStep
            photos={photos}
            isDragActive={isDragActive}
            getRootProps={getRootProps}
            getInputProps={getInputProps}
            onRemovePhoto={handleRemovePhoto}
            onSetAsMain={setAsMain}
          />
        );
      case Step.LOCATION:
        return (
          <LocationStep
            cities={cities}
            selectedCityId={formData.cityId}
            onCityChange={(value) => handleInputChange("cityId", value)}
            addressInputRef={addressInputRef}
            addressInput={addressInput}
            onAddressChange={handleAddressChange}
            onAddressBlur={onAddressBlur}
            latitude={formData.latitude}
            longitude={formData.longitude}
            onMapLoad={onMapLoad}
            onPlacemarkDragEnd={onPlacemarkDragEnd}
            mapRef={mapRef}
          />
        );
      case Step.DETAILS:
        return (
          <DetailsStep
            title={formData.title}
            description={formData.description}
            price={formData.price}
            condition={formData.condition}
            conditions={conditions}
            filters={filters}
            selectedFilters={selectedFilters}
            onInputChange={(field, value) => handleInputChange(field as keyof typeof formData, value)}
            onFilterChange={handleFilterChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4 md:space-y-6 max-w-4xl mx-auto">
      <Card className="shadow-lg">
        <CardContent className="p-4 md:p-6">
          <div className="flex items-center space-x-3 md:space-x-4 mb-4">
            <div className="p-2 md:p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
              <Icon name="Plus" className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg md:text-2xl font-bold text-gray-900">
                Подать объявление
              </h1>
              <p className="text-sm md:text-base text-gray-600">
                Шаг {currentStep + 1} из {STEPS.length}: {STEPS[currentStep].title}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <Progress value={progress} className="w-full" />
            
            <div className="flex justify-between items-center text-xs md:text-sm">
              {STEPS.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex items-center space-x-1 ${
                    index <= currentStep ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  <Icon 
                    name={step.icon as any} 
                    className="w-3 h-3 md:w-4 md:h-4" 
                  />
                  <span className="hidden md:inline">{step.title}</span>
                  <span className="md:hidden">{index + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <form onSubmit={onSubmit} className="space-y-4 md:space-y-6">
        {renderCurrentStep()}

        <div className="flex flex-col md:flex-row gap-3 md:gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex-1 h-12 md:h-14 text-base md:text-lg font-semibold"
          >
            <Icon name="ChevronLeft" className="w-5 h-5 mr-2" />
            Назад
          </Button>

          {currentStep === STEPS.length - 1 ? (
            <Button
              type="submit"
              disabled={!canProceedToNext() || isSubmitting}
              className="flex-1 h-12 md:h-14 text-base md:text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
            >
              <Icon name="Send" className="w-5 h-5 mr-2" />
              {isSubmitting ? "Публикуем..." : "Опубликовать объявление"}
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleNext}
              disabled={!canProceedToNext()}
              className="flex-1 h-12 md:h-14 text-base md:text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
            >
              Далее
              <Icon name="ChevronRight" className="w-5 h-5 ml-2" />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AvitoSell;