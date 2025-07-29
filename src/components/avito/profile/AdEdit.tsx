import React, { useState, useEffect, useRef } from "react";
import { useAvitoSellLogic } from "@/hooks/useAvitoSellLogic";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import { FilterType } from "@/lib/types";
import Icon from "@/components/ui/icon";

const AdEdit = () => {
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
    inputRef,
    isDragActive,
    setAsMain,
  } = useAvitoSellLogic();

  const geocodeCity = async (cityName: string, regionName: string) => {
    if (!ymapsRef.current) return;

    try {
      const res = await ymapsRef.current.geocode(`${cityName}, ${regionName}`);
      const firstGeoObject = res.geoObjects.get(0);
      if (firstGeoObject) {
        const coords = firstGeoObject.geometry.getCoordinates();
        handleInputChange("latitude", coords[0]);
        handleInputChange("longitude", coords[1]);
        if (mapRef.current) {
          mapRef.current.setCenter(coords, 10, { duration: 300 });
        }
      }
    } catch (e) {
      console.error("Geocode city error", e);
    }
  };

  const [addressInput, setAddressInput] = useState(formData.fullAdress || "");

  const mapRef = useRef<any>(null);
  const ymapsRef = useRef<any>(null);
  const suggestViewRef = useRef<any>(null);

  useEffect(() => {
    if (formData.cityId) {
      const city = cities.find(c => c.id === formData.cityId);
      if (city) {
        const addressStr = `${city.region}, ${city.name}`;
        setAddressInput(addressStr);
        handleInputChange("fullAdress", addressStr);

        if (ymapsRef.current) {
          geocodeCity(city.name, city.region);
        }
      }
    }
  }, [formData.cityId]);

  const addressInputRef = useRef<HTMLInputElement>(null);

  const onMapLoad = (ymapsInstance: any) => {
    ymapsRef.current = ymapsInstance;

    if (!suggestViewRef.current && addressInputRef.current) {
      const suggest = new ymapsInstance.SuggestView(addressInputRef.current);
      suggest.events.add("select", async (event: any) => {
        const address = event.get("item").value;
        setAddressInput(address);
        handleInputChange("fullAdress", address);

        try {
          const res = await ymapsInstance.geocode(address);
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

  return (
    <div className="space-y-4 md:space-y-6 max-w-4xl mx-auto">
      <Card className="shadow-lg">
        <CardContent className="p-4 md:p-6">
          <div className="flex items-center space-x-3 md:space-x-4">
            <div className="p-2 md:p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
              <Icon name="Plus" className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg md:text-2xl font-bold text-gray-900">
                Подать объявление
              </h1>
              <p className="text-sm md:text-base text-gray-600">
                Заполните информацию о товаре
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
  <Card className="shadow-lg">
    <CardHeader className="pb-3 md:pb-6">
      <CardTitle className="text-base md:text-lg flex items-center space-x-2">
        <Icon name="Camera" className="w-4 h-4 md:w-5 md:h-5" />
        <span>Фотографии</span>
      </CardTitle>
    </CardHeader>
    <CardContent className="p-4 md:p-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-4 md:p-8 text-center cursor-pointer transition-colors ${
          isDragActive 
            ? "border-blue-500 bg-blue-50" 
            : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
        }`}
      >
        <input {...getInputProps()} />
        <Icon name="Upload" className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-2 md:mb-4 text-gray-400" />
        <p className="text-sm md:text-base text-gray-600">
          {isDragActive
            ? "Отпустите файлы здесь..."
            : "Перетяните фото или нажмите"}
        </p>
        <p className="text-xs md:text-sm text-gray-400 mt-1 md:mt-2">
          Максимум 10 фото, JPG/PNG
        </p>
      </div>

      {photos.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mt-4">
            {photos.map((p, i) => (
              <div key={i} className="relative group">
                <img
                  src={p.preview}
                  className={`w-full h-24 md:h-32 object-cover rounded-lg transition-all ${
                    p.isMain ? "ring-2 md:ring-4 ring-green-500 ring-offset-1" : ""
                  }`}
                  alt="Фото объявления"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />

                {/* Кнопка "Сделать главным" */}
                <Button
                  size="sm"
                  variant={p.isMain ? "default" : "outline"}
                  className={`absolute bottom-1 md:bottom-2 left-1 md:left-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity ${
                    p.isMain ? "bg-green-600 hover:bg-green-700" : "bg-white/90 hover:bg-white"
                  }`}
                  onClick={() => setAsMain(i)}
                  type="button"
                >
                  {p.isMain ? (
                    <span className="flex items-center space-x-1">
                      <Icon name="Star" className="w-3 h-3" />
                      <span className="hidden md:inline">Главное</span>
                    </span>
                  ) : (
                    <span className="md:hidden">Главное</span>
                  )}
                  <span className="hidden md:inline">
                    {p.isMain ? "Главное" : "Сделать главным"}
                  </span>
                </Button>

                {/* Кнопка удаления фото */}
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="absolute top-1 right-1 text-white bg-black/50 hover:bg-black/70 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleRemovePhoto(i)}
                >
                  <Icon name="X" className="w-4 h-4" />
                </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

        <Card className="shadow-lg">
          <CardHeader className="pb-3 md:pb-6">
            <CardTitle className="text-base md:text-lg flex items-center space-x-2">
              <Icon name="FileText" className="w-4 h-4 md:w-5 md:h-5" />
              <span>Основная информация</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 md:space-y-6 p-4 md:p-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm md:text-base font-medium">Название *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Например: iPhone 13 Pro Max 128GB"
                className="text-sm md:text-base h-10 md:h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm md:text-base font-medium">Описание *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Опишите товар: состояние, особенности, почему продаете..."
                className="text-sm md:text-base min-h-[80px] md:min-h-[100px] resize-none"
                required
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price" className="text-sm md:text-base font-medium">Цена *</Label>
              <div className="relative">
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  placeholder="0"
                  className="text-sm md:text-base h-10 md:h-11 pr-12"
                  required
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm md:text-base">₽</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm md:text-base font-medium">Категория *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange("category", value)}
                required
              >
                <SelectTrigger className="text-sm md:text-base h-10 md:h-11">
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.slug}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {subcategoryLevels.map((levelSubcats, idx) => (
              <div key={idx} className="space-y-2">
                <Label className="text-sm md:text-base font-medium">Подкатегория (уровень {idx + 1})</Label>
                <Select
                  value={subcategoryPath[idx] || ""}
                  onValueChange={(value) => handleSubcategorySelect(idx, value)}
                >
                  <SelectTrigger className="text-sm md:text-base h-10 md:h-11">
                    <SelectValue placeholder="Выберите подкатегорию" />
                  </SelectTrigger>
                  <SelectContent>
                    {levelSubcats.map((subcat) => (
                      <SelectItem key={subcat.slug} value={subcat.slug}>
                        {subcat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}

            <div className="space-y-2">
              <Label htmlFor="condition" className="text-sm md:text-base font-medium">Состояние *</Label>
              <Select
                value={formData.condition}
                onValueChange={(value) => handleInputChange("condition", value)}
                required
              >
                <SelectTrigger className="text-sm md:text-base h-10 md:h-11">
                  <SelectValue placeholder="Выберите состояние" />
                </SelectTrigger>
                <SelectContent>
                  {conditions.map((cond) => (
                    <SelectItem key={cond} value={cond}>
                      {cond}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cityId" className="text-sm md:text-base font-medium">Город *</Label>
              <Select
                value={formData.cityId}
                onValueChange={(value) => handleInputChange("cityId", value)}
                required
              >
                <SelectTrigger className="text-sm md:text-base h-10 md:h-11">
                  <SelectValue placeholder="Выберите город" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city.id} value={city.id}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm md:text-base font-medium">Адрес</Label>
              <Input
                ref={addressInputRef}
                id="address"
                value={addressInput}
                onChange={handleAddressChange}
                onBlur={onAddressBlur}
                placeholder="Улица, дом, квартира"
                className="text-sm md:text-base h-10 md:h-11"
                autoComplete="off"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm md:text-base font-medium">Место на карте</Label>
              <div className="rounded-lg border border-gray-300 overflow-hidden" style={{ height: window.innerWidth < 768 ? 250 : 400 }}>
              <YMaps
                query={{
                  lang: "ru_RU",
                  apikey: "254a1844-cf4b-49db-836c-c5aa61915d75",
                  load: "package.full",
                }}
              >
                <Map
                  state={{
                    center: [formData.latitude, formData.longitude],
                    zoom: 10,
                    controls: ["zoomControl"],
                  }}
                  instanceRef={(ref) => { mapRef.current = ref; }}
                  onLoad={onMapLoad}
                  
                  width="100%"
                  height="100%"
                >
                  <Placemark
                    geometry={[formData.latitude, formData.longitude]}
                    options={{ draggable: true, preset: "islands#redIcon" }}
                    onDragEnd={onPlacemarkDragEnd}
                  />
                </Map>
              </YMaps>
              </div>
            </div>
          </CardContent>
        </Card>

        {filters.length > 0 && (
          <Card className="shadow-lg">
            <CardHeader className="pb-3 md:pb-6">
              <CardTitle className="text-base md:text-lg flex items-center space-x-2">
                <Icon name="Settings" className="w-4 h-4 md:w-5 md:h-5" />
                <span>Дополнительные фильтры</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-4 md:p-6">
              {filters.map((filter) => {
                switch (filter.type) {
                  case FilterType.SELECT:
                    return (
                      <div key={filter.id} className="space-y-2">
                        <Label className="text-sm md:text-base font-medium">{filter.name}</Label>
                        <Select
                          value={selectedFilters[filter.id]?.toString() || ""}
                          onValueChange={(val) => handleFilterChange(filter.id, val)}
                        >
                          <SelectTrigger className="text-sm md:text-base h-10 md:h-11">
                            <SelectValue placeholder={`Выберите ${filter.name}`} />
                          </SelectTrigger>
                          <SelectContent>
                            {filter.values.map((val) => (
                              <SelectItem key={val} value={val}>
                                {val}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    );
                  case FilterType.CHECKBOX:
                    return (
                      <div key={filter.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`filter-${filter.id}`}
                          checked={!!selectedFilters[filter.id]}
                          onChange={(e) =>
                            handleFilterChange(filter.id, e.target.checked)
                          }
                        />
                        <Label htmlFor={`filter-${filter.id}`}>{filter.name}</Label>
                      </div>
                    );

                  case FilterType.RANGE:
                    return (
                      <div key={filter.id} className="space-y-2">
                        <Label className="text-sm md:text-base font-medium">{filter.name}</Label>
                        <Input
                          type="number"
                          value={selectedFilters[filter.id]?.toString() || ""}
                          onChange={(e) =>
                            handleFilterChange(filter.id, Number(e.target.value))
                          }
                          className="text-sm md:text-base h-10 md:h-11"
                        />
                      </div>
                    );
                  default:
                    return null;
                }
              })}
            </CardContent>
          </Card>
        )}

        <div className="pt-4 md:pt-6">
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full h-12 md:h-14 text-base md:text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
          >
            <Icon name="Send" className="w-5 h-5 mr-2" />
            {isSubmitting ? "Публикуем..." : "Опубликовать обьявление"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdEdit;