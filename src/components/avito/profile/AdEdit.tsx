import React, { useEffect, useRef, useState } from "react";
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
import { useEditAdLogic } from "@/hooks/editAdLogic";
import { useParams } from "react-router-dom";

const EditAd = () => {
  const { adId } = useParams<{ adId: string }>(); // Получаем adId из URL

  if (!adId) {
    return <div>Объявление не найдено</div>;
  }

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
    handleUpdate,
    getRootProps,
    getInputProps,
    isDragActive,
    setAsMain,
  } = useEditAdLogic(adId);

  const [addressInput, setAddressInput] = useState("");
  const mapRef = useRef<any>(null);
  const ymapsRef = useRef<any>(null);
  const suggestViewRef = useRef<any>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);

  const geocodeCity = async (cityName: string, regionName: string) => {
    if (!ymapsRef.current) return;
    try {
      const res = await ymapsRef.current.geocode(`${regionName}, ${cityName}`);
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

  useEffect(() => {
    setAddressInput(formData.fullAdress || "");
  }, [formData.fullAdress]);

  useEffect(() => {
    if (formData.cityId) {
      const city = cities.find(c => c.id === formData.cityId);
      if (city) {
        const fullAddress = `${city.region}, ${city.name}`;
        setAddressInput(fullAddress);
        handleInputChange("fullAdress", fullAddress);
        if (ymapsRef.current) {
          geocodeCity(city.name, city.region);
        }
      }
    }
  }, [formData.cityId]);

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

return (
  <div className="space-y-6">
    <Card>
      <CardContent className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Редактировать объявление
        </h1>
        <p className="text-gray-600">
          Внесите изменения и сохраните, чтобы обновить объявление
        </p>
      </CardContent>
    </Card>

    <form onSubmit={handleUpdate} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Фотографии</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            {...getRootProps()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer"
          >
            <input {...getInputProps()} />
            {isDragActive
              ? "Отпустите файлы здесь..."
              : "Перетяните фото или нажмите, чтобы выбрать"}
          </div>
          {photos.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mt-4">
              {photos.map((p, i) => (
                <div key={i} className="relative">
                  <img
                    src={p.preview}
                    className={`w-full h-32 object-cover rounded ${
                      p.isMain ? "ring-4 ring-green-500" : ""
                    }`}
                    alt="Фото"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute bottom-2 left-2"
                    onClick={() => setAsMain(i)}
                    type="button"
                  >
                    {p.isMain ? "Главное" : "Сделать главным"}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Основная информация</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="title">Название</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Описание</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              required
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="price">Цена</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
              required
            />
          </div>

          <div>
            <Label>Категория</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleInputChange("category", value)}
            >
              <SelectTrigger>
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
            <div key={idx}>
              <Label>Подкатегория</Label>
              <Select
                value={subcategoryPath[idx] || ""}
                onValueChange={(value) => handleSubcategorySelect(idx, value)}
              >
                <SelectTrigger>
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

          <div>
            <Label>Состояние</Label>
            <Select
              value={formData.condition}
              onValueChange={(value) => handleInputChange("condition", value)}
            >
              <SelectTrigger>
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

          <div>
            <Label>Город</Label>
            <Select
              value={formData.cityId}
              onValueChange={(value) => handleInputChange("cityId", value)}
            >
              <SelectTrigger>
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

          <div>
            <Label>Адрес</Label>
            <Input
              ref={addressInputRef}
              value={addressInput}
              onChange={handleAddressChange}
              onBlur={onAddressBlur}
              placeholder="Введите адрес"
              autoComplete="off"
            />
          </div>

          <div className="rounded border border-gray-300" style={{ height: 400 }}>
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
                instanceRef={(ref) => {
                  mapRef.current = ref;
                }}
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
        </CardContent>
      </Card>

      {filters.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Фильтры</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {filters.map((filter) => {
              switch (filter.type) {
                case FilterType.SELECT:
                  return (
                    <div key={filter.id}>
                      <Label>{filter.name}</Label>
                      <Select
                        value={selectedFilters[filter.id]?.toString() || ""}
                        onValueChange={(val) => handleFilterChange(filter.id, val)}
                      >
                        <SelectTrigger>
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
                    <div key={filter.id}>
                      <Label>{filter.name}</Label>
                      <Input
                        type="number"
                        value={selectedFilters[filter.id]?.toString() || ""}
                        onChange={(e) =>
                          handleFilterChange(filter.id, Number(e.target.value))
                        }
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

      <Button type="submit" className="w-full">
        Сохранить изменения
      </Button>
    </form>
  </div>
);

};

export default EditAd;
