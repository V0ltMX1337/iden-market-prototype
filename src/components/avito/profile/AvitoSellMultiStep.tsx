import React, { useState, useEffect, useRef } from "react";
import { useAvitoSellLogic } from "@/hooks/useAvitoSellLogic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import { FilterType } from "@/lib/types";
import Icon from "@/components/ui/icon";

enum Step {
  CATEGORY = 1,
  PHOTOS = 2,
  LOCATION = 3,
  DETAILS = 4,
}

const STEP_TITLES = {
  [Step.CATEGORY]: "Категория и подкатегории",
  [Step.PHOTOS]: "Фотографии товара",
  [Step.LOCATION]: "Местоположение",
  [Step.DETAILS]: "Детали объявления",
};

const AvitoSellMultiStep = () => {
  const [currentStep, setCurrentStep] = useState<Step>(Step.CATEGORY);
  const [addressInput, setAddressInput] = useState("");
  const mapRef = useRef<any>(null);
  const ymapsRef = useRef<any>(null);
  const suggestViewRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
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
    open,
    isSubmitting,
    isDragActive,
    setAsMain,
  } = useAvitoSellLogic();

  const progress = (currentStep / 4) * 100;

  const canProceedFromStep = (step: Step): boolean => {
    switch (step) {
      case Step.CATEGORY:
        return subcategoryPath.length > 0;
      case Step.PHOTOS:
        return photos.length > 0;
      case Step.LOCATION:
        return !!formData.cityId && !!formData.latitude && !!formData.longitude;
      case Step.DETAILS:
        return !!formData.title && !!formData.description && !!formData.price;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (currentStep < Step.DETAILS && canProceedFromStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > Step.CATEGORY) {
      setCurrentStep(currentStep - 1);
    }
  };

  const geocodeCity = async (cityName: string, regionName: string) => {
    if (!ymapsRef.current) return;
    
    const ymapsInstance = ymapsRef.current;
    try {
      const res = await ymapsInstance.geocode(`${cityName}, ${regionName}`);
      const firstGeoObject = res.geoObjects.get(0);
      if (firstGeoObject) {
        const coords = firstGeoObject.geometry.getCoordinates();
        handleInputChange("latitude", coords[0]);
        handleInputChange("longitude", coords[1]);
        if (mapRef.current) {
          mapRef.current.setCenter(coords, 10, { duration: 300 });
        }
      }
    } catch (error) {
      console.error("Geocode error:", error);
    }
  };

  const initializeSuggest = (ymapsInstance: any) => {
    if (inputRef.current && !suggestViewRef.current) {
      const suggest = new ymapsInstance.SuggestView(inputRef.current);
      suggest.events.add("select", async (e: any) => {
        const selectedName = e.get("item").value;
        setAddressInput(selectedName);
        handleInputChange("fullAdress", selectedName);

        try {
          const res = await ymapsInstance.geocode(selectedName);
          const firstGeoObject = res.geoObjects.get(0);
          if (firstGeoObject) {
            const coords = firstGeoObject.geometry.getCoordinates();
            handleInputChange("latitude", coords[0]);
            handleInputChange("longitude", coords[1]);
            if (mapRef.current) {
              mapRef.current.setCenter(coords, 10, { duration: 300 });
            }
          }
        } catch (error) {
          console.error("Geocode error:", error);
        }
      });
      suggestViewRef.current = suggest;
    }
  };

  const onAddressBlur = async () => {
    if (!ymapsRef.current) return;
    try {
      const res = await ymapsRef.current.geocode(addressInput);
      const firstGeoObject = res.geoObjects.get(0);
      if (firstGeoObject) {
        const coords = firstGeoObject.geometry.getCoordinates();
        handleInputChange("latitude", coords[0]);
        handleInputChange("longitude", coords[1]);
        if (mapRef.current) {
          mapRef.current.setCenter(coords, 10, { duration: 300 });
        }
        const newAddress = firstGeoObject.getAddressLine();
        setAddressInput(newAddress);
        handleInputChange("fullAdress", newAddress);
      }
    } catch (error) {
      console.error("Geocode error:", error);
    }
  };

  const onPlacemarkDragEnd = async (e: any) => {
    if (!ymapsRef.current) return;

    const coords = e.get("target").geometry.getCoordinates();
    handleInputChange("latitude", coords[0]);
    handleInputChange("longitude", coords[1]);

    try {
      const res = await ymapsRef.current.geocode(coords);
      const firstGeoObject = res.geoObjects.get(0);
      if (firstGeoObject) {
        const newAddress = firstGeoObject.getAddressLine();
        setAddressInput(newAddress);
        handleInputChange("fullAdress", newAddress);
      }
    } catch (error) {
      console.error("Reverse geocode error:", error);
    }
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setAddressInput(val);
    handleInputChange("fullAdress", val);
  };

  useEffect(() => {
    setAddressInput(formData.fullAdress || "");
  }, [formData.fullAdress]);

  const renderStepContent = () => {
    switch (currentStep) {
      case Step.CATEGORY:
        return (
          <Card className="shadow-lg">
            <CardHeader className="pb-3 md:pb-6">
              <CardTitle className="text-base md:text-lg flex items-center space-x-2">
                <Icon name="Grid3X3" className="w-4 h-4 md:w-5 md:h-5" />
                <span>Выберите категорию</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6 space-y-4">
              {subcategoryLevels.map((level, index) => (
                <div key={index}>
                  <Label className="text-sm font-medium">
                    {index === 0 ? "Категория" : `Подкатегория ${index}`}
                  </Label>
                  <Select
                    value={subcategoryPath[index] || ""}
                    onValueChange={(value) => handleSubcategorySelect(index, value)}
                  >
                    <SelectTrigger className="w-full mt-1">
                      <SelectValue placeholder={`Выберите ${index === 0 ? "категорию" : "подкатегорию"}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {level.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          <div className="flex items-center space-x-2">
                            {item.icon && (
                              item.icon.startsWith('http') ? (
                                <img src={item.icon} alt="" className="w-4 h-4" />
                              ) : (
                                <span className="w-4 h-4 text-center text-xs">{item.icon}</span>
                              )
                            )}
                            <span>{item.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </CardContent>
          </Card>
        );

      case Step.PHOTOS:
        return (
          <Card className="shadow-lg">
            <CardHeader className="pb-3 md:pb-6">
              <CardTitle className="text-base md:text-lg flex items-center space-x-2">
                <Icon name="Camera" className="w-4 h-4 md:w-5 md:h-5" />
                <span>Добавьте фотографии</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6 space-y-4">
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-4 md:p-8 text-center cursor-pointer transition-colors ${
                  isDragActive
                    ? "border-blue-400 bg-blue-50"
                    : "border-gray-300 hover:border-blue-400"
                }`}
              >
                <input {...getInputProps()} />
                <Icon name="Upload" className="w-8 h-8 md:w-12 md:h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm md:text-base text-gray-600 mb-2">
                  Перетащите изображения сюда или
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={open}
                  className="text-xs md:text-sm"
                >
                  Выберите файлы
                </Button>
                <p className="text-xs text-gray-500 mt-2">
                  Максимум 10 фотографий, до 10MB каждая
                </p>
              </div>

              {photos.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                  {photos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={photo.preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 md:h-32 object-cover rounded-lg border"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-lg flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 flex space-x-2">
                          <Button
                            type="button"
                            size="sm"
                            variant="secondary"
                            onClick={() => setAsMain(index)}
                            className="text-xs p-1 md:p-2"
                          >
                            <Icon name="Star" className="w-3 h-3 md:w-4 md:h-4" />
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="destructive"
                            onClick={() => handleRemovePhoto(index)}
                            className="text-xs p-1 md:p-2"
                          >
                            <Icon name="Trash2" className="w-3 h-3 md:w-4 md:h-4" />
                          </Button>
                        </div>
                      </div>
                      {photo.isMain && (
                        <div className="absolute top-1 left-1 bg-yellow-500 text-white rounded px-1 md:px-2 py-1 text-xs">
                          Главная
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        );

      case Step.LOCATION:
        return (
          <Card className="shadow-lg">
            <CardHeader className="pb-3 md:pb-6">
              <CardTitle className="text-base md:text-lg flex items-center space-x-2">
                <Icon name="MapPin" className="w-4 h-4 md:w-5 md:h-5" />
                <span>Местоположение</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6 space-y-4">
              <div>
                <Label className="text-sm font-medium">Город</Label>
                <Select
                  value={formData.cityId}
                  onValueChange={(value) => {
                    handleInputChange("cityId", value);
                    const selectedCity = cities.find(city => city.id === value);
                    if (selectedCity) {
                      geocodeCity(selectedCity.name, selectedCity.region);
                    }
                  }}
                >
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Выберите город" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city.id} value={city.id}>
                        {city.name}, {city.region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium">Точный адрес</Label>
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Введите адрес"
                  value={addressInput}
                  onChange={handleAddressChange}
                  onBlur={onAddressBlur}
                  className="mt-1"
                />
              </div>

              {formData.cityId && (
                <div className="h-64 md:h-96 rounded-lg overflow-hidden border">
                  <YMaps
                    query={{
                      apikey: "29294198-6cdc-40ec-b6df-88f8639e1d37",
                      lang: "ru_RU",
                    }}
                  >
                    <Map
                      defaultState={{
                        center: [55.751244, 37.618423],
                        zoom: 10,
                      }}
                      width="100%"
                      height="100%"
                      modules={["geocode", "SuggestView"]}
                      onLoad={(ymapsInstance: any) => {
                        ymapsRef.current = ymapsInstance;
                        initializeSuggest(ymapsInstance);
                      }}
                      instanceRef={mapRef}
                    >
                      {formData.latitude && formData.longitude && (
                        <Placemark
                          geometry={[formData.latitude, formData.longitude]}
                          options={{
                            draggable: true,
                            iconColor: "#3b82f6",
                          }}
                          onDragEnd={onPlacemarkDragEnd}
                        />
                      )}
                    </Map>
                  </YMaps>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case Step.DETAILS:
        return (
          <div className="space-y-4 md:space-y-6">
            <Card className="shadow-lg">
              <CardHeader className="pb-3 md:pb-6">
                <CardTitle className="text-base md:text-lg flex items-center space-x-2">
                  <Icon name="FileText" className="w-4 h-4 md:w-5 md:h-5" />
                  <span>Основная информация</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 space-y-4">
                <div>
                  <Label className="text-sm font-medium">Название</Label>
                  <Input
                    type="text"
                    placeholder="Название товара"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium">Описание</Label>
                  <Textarea
                    placeholder="Опишите товар подробно"
                    rows={4}
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Цена (₽)</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      min="0"
                      value={formData.price}
                      onChange={(e) => handleInputChange("price", Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Состояние</Label>
                    <Select
                      value={formData.condition}
                      onValueChange={(value) => handleInputChange("condition", value)}
                    >
                      <SelectTrigger className="w-full mt-1">
                        <SelectValue placeholder="Выберите состояние" />
                      </SelectTrigger>
                      <SelectContent>
                        {conditions.map((condition) => (
                          <SelectItem key={condition.id} value={condition.id}>
                            {condition.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {filters.length > 0 && (
              <Card className="shadow-lg">
                <CardHeader className="pb-3 md:pb-6">
                  <CardTitle className="text-base md:text-lg flex items-center space-x-2">
                    <Icon name="Filter" className="w-4 h-4 md:w-5 md:h-5" />
                    <span>Дополнительные характеристики</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6 space-y-4">
                  {filters.map((filter) => (
                    <div key={filter.id}>
                      <Label className="text-sm font-medium">{filter.name}</Label>
                      {filter.type === FilterType.SELECT && (
                        <Select
                          value={selectedFilters[filter.id] || ""}
                          onValueChange={(value) => handleFilterChange(filter.id, value)}
                        >
                          <SelectTrigger className="w-full mt-1">
                            <SelectValue placeholder={`Выберите ${filter.name.toLowerCase()}`} />
                          </SelectTrigger>
                          <SelectContent>
                            {filter.values.map((value) => (
                              <SelectItem key={value} value={value}>
                                {value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                      {filter.type === FilterType.CHECKBOX && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                          {filter.values.map((value) => (
                            <label key={value} className="flex items-center space-x-2 text-sm">
                              <input
                                type="checkbox"
                                checked={selectedFilters[filter.id]?.includes(value) || false}
                                onChange={(e) => {
                                  const currentValues = selectedFilters[filter.id] || [];
                                  if (e.target.checked) {
                                    handleFilterChange(filter.id, [...currentValues, value]);
                                  } else {
                                    handleFilterChange(filter.id, currentValues.filter(v => v !== value));
                                  }
                                }}
                                className="rounded"
                              />
                              <span>{value}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4 md:space-y-6 max-w-4xl mx-auto">
      {/* Header */}
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
                {STEP_TITLES[currentStep]}
              </p>
            </div>
          </div>
          
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs md:text-sm text-gray-500">
              <span>Шаг {currentStep} из 4</span>
              <span>{Math.round(progress)}% завершено</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      <form onSubmit={currentStep === Step.DETAILS ? handleSubmit : (e) => e.preventDefault()}>
        {renderStepContent()}

        {/* Navigation */}
        <Card className="shadow-lg">
          <CardContent className="p-4 md:p-6">
            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === Step.CATEGORY}
                className="flex items-center space-x-2"
              >
                <Icon name="ChevronLeft" className="w-4 h-4" />
                <span>Назад</span>
              </Button>

              {currentStep < Step.DETAILS ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={!canProceedFromStep(currentStep)}
                  className="flex items-center space-x-2"
                >
                  <span>Далее</span>
                  <Icon name="ChevronRight" className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting || !canProceedFromStep(currentStep)}
                  className="flex items-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <Icon name="Loader2" className="w-4 h-4 animate-spin" />
                      <span>Создаю...</span>
                    </>
                  ) : (
                    <>
                      <Icon name="Check" className="w-4 h-4" />
                      <span>Опубликовать</span>
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default AvitoSellMultiStep;