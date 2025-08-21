// --- logic/avitoSellLogic.ts ---
import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";

import type { Ad, AdFilter, Category, City, FilterDefinition } from "@/lib/types";
import { AdStatus, AdSold } from "@/lib/types";
import { useAuth } from "@/hooks/useAuth";
import { storeApi } from "@/lib/store";
import { useAlertContext } from "@/contexts/AlertContext";
import { slugify } from "@/lib/slug";

export const useAvitoSellLogic = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showSuccess, showError, showInfo } = useAlertContext();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingInit, setIsLoadingInit] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    condition: "",
    cityId: "",
    address: "",
    fullAdress: "",
    latitude: 0,
    longitude: 0,
  });

  const [subcategoryPath, setSubcategoryPath] = useState<string[]>([]);
  const [subcategoryLevels, setSubcategoryLevels] = useState<Array<Category["subcategories"]>>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [photos, setPhotos] = useState<Array<{ file: File; preview: string; isMain: boolean }>>([]);
  const [allFilters, setAllFilters] = useState<FilterDefinition[]>([]);
  const [filters, setFilters] = useState<FilterDefinition[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string | number | boolean>>({});

  const addressInputRef = useRef<HTMLInputElement>(null);
  const mapRef = useRef<any>(null);
  const ymapsRef = useRef<any>(null);
  const suggestViewRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [addressInput, setAddressInput] = useState("");

  const conditions = useMemo(() => [
    "Новое",
    "Отличное",
    "Очень хорошее",
    "Хорошее",
    "Удовлетворительное",
  ], []);


  const mapConditionToAdSold = (condition: string): AdSold => {
    switch (condition) {
      case "Новое":
        return AdSold.NEW;
      case "Отличное":
        return AdSold.OTLICHNOE;
      case "Очень хорошее":
      case "Хорошее":
        return AdSold.XOROSHEE;
      case "Удовлетворительное":
        return AdSold.YDVORITEL;
      default:
        return AdSold.NEW;
    }
  };

  useEffect(() => {
  const loadInitialData = async () => {
    try {
      const [fetchedCategories, fetchedCities, fetchedFilters] = await Promise.all([
        storeApi.getCategories(),
        storeApi.getCities(),
        storeApi.getFilters(),
      ]);

      setCategories(fetchedCategories);
      setCities(fetchedCities);
      setAllFilters(fetchedFilters);
    } catch (error) {
      showError("Ошибка при загрузке данных. Попробуйте позже.", "Ошибка");
    } finally {
      setIsLoadingInit(false);
    }
  };

  loadInitialData();

  return () => {
    photos.forEach((p) => URL.revokeObjectURL(p.preview));
  };
}, []);

// Объединённый useEffect: при смене города
useEffect(() => {
  if (!formData.cityId || cities.length === 0) return;

  const city = cities.find(c => c.id === formData.cityId);
  if (city) {
    const addressStr = `${city.region}, ${city.name}`;
    setAddressInput(addressStr);
    handleInputChange("fullAdress", addressStr);

    if (ymapsRef.current) {
      geocodeCity(city.name, city.region);
    }
  }
}, [formData.cityId, cities]);

// Обработка смены категории
useEffect(() => {
  const cat = categories.find((c) => c.slug === formData.category);

  if (formData.category && cat) {
    setSubcategoryPath([]);
    setSubcategoryLevels([cat.subcategories]);
  } else {
    setSubcategoryLevels([]);
    setSubcategoryPath([]);
  }

  setFilters([]);
  setSelectedFilters({});
}, [formData.category, categories]);

// Синхронизация текстового инпута адреса
useEffect(() => {
  setAddressInput(formData.fullAdress || "");
}, [formData.fullAdress]);

  const findSubcategoryByPath = (
    subcategories: Category["subcategories"],
    path: string[]
  ): Category["subcategories"][0] | undefined => {
    if (path.length === 0) return undefined;
    let currentLevel = subcategories;
    let foundSubcat;

    for (const slug of path) {
      foundSubcat = currentLevel.find((sub) => sub.slug === slug);
      if (!foundSubcat) return undefined;
      currentLevel = foundSubcat.children || [];
    }
    return foundSubcat;
  };

  const handleSubcategorySelect = (levelIndex: number, slug: string) => {
    const newPath = [...subcategoryPath.slice(0, levelIndex), slug];
    setSubcategoryPath(newPath);

    const cat = categories.find((c) => c.slug === formData.category);
    if (!cat) return;

    const currentSubcat = findSubcategoryByPath(cat.subcategories, newPath);
    const children = currentSubcat?.children || [];

    if (children.length > 0) {
      setSubcategoryLevels((prev) => [...prev.slice(0, levelIndex + 1), children]);
    } else {
      setSubcategoryLevels((prev) => prev.slice(0, levelIndex + 1));
    }

    if (currentSubcat) {
      const filterDefs = currentSubcat.filters
        .map((fa) => allFilters.find((f) => f.id === fa.filterId))
        .filter((f): f is FilterDefinition => f !== undefined);

      setFilters(filterDefs);
      setSelectedFilters({});
    } else {
      setFilters([]);
      setSelectedFilters({});
    }
  };

  const handleFilterChange = (filterId: string, value: any) => {
    setSelectedFilters((prev) => ({ ...prev, [filterId]: value }));
  };

  // Удобный универсальный обработчик изменений любого поля формы
  const handleInputChange = (field: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Обновление адресных данных из карты (адрес + координаты)
  const updateAddressFromMap = (fullAdress: string, latitude: number, longitude: number) => {
    setFormData((prev) => ({
      ...prev,
      fullAdress,
      latitude,
      longitude,
      // Можно при желании сбросить поле address или синхронизировать
      address: fullAdress,
    }));
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const mapped = acceptedFiles.map((file, idx) => ({
        file,
        preview: URL.createObjectURL(file),
        isMain: photos.length + idx === 0,
      }));
      setPhotos((prev) => [...prev, ...mapped]);
    },
    [photos]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
  onDrop,
  accept: { "image/*": [] },
  noKeyboard: true,  // отключаем клавиатуру
});

  const setAsMain = (index: number) => {
    setPhotos((prev) =>
      prev.map((p, i) => ({ ...p, isMain: i === index }))
    );
  };

  const handleRemovePhoto = (index: number) => {
  setPhotos((prev) => {
    const newPhotos = [...prev];
    const removed = newPhotos.splice(index, 1);
    if (removed[0]?.preview) URL.revokeObjectURL(removed[0].preview);

    // если удалили главное фото — делаем первым оставшееся главным
    if (removed[0]?.isMain && newPhotos.length > 0) {
      newPhotos[0].isMain = true;
    }

    return newPhotos;
  });
};

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

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (isSubmitting) return; // блокируем повторные клики
  setIsSubmitting(true);

  if (!user) {
    showError("Пожалуйста, войдите в систему для публикации объявления", "Ошибка авторизации");
    setIsSubmitting(false);
    return;
  }

  const errors: string[] = [];

  if (!formData.title.trim()) errors.push("Укажите заголовок.");
  if (!formData.description.trim()) errors.push("Добавьте описание.");
  if (!formData.price.trim()) errors.push("Укажите цену.");
  if (!formData.category) errors.push("Выберите категорию.");
  if (subcategoryPath.length === 0) errors.push("Выберите подкатегорию.");
  if (!formData.condition) errors.push("Укажите состояние.");
  if (!formData.cityId) errors.push("Выберите город.");
  if (!formData.fullAdress.trim()) errors.push("Укажите адрес.");
  if (!formData.latitude || !formData.longitude) errors.push("Отметьте точку на карте.");
  if (photos.length === 0) errors.push("Добавьте хотя бы одну фотографию.");

  if (errors.length > 0) {
    showError(
      "Пожалуйста, исправьте следующие ошибки:\n\n" + errors.join("\n"), 
      "Ошибки валидации"
    );
    setIsSubmitting(false);
    return;
  }

  const city = cities.find((c) => c.id === formData.cityId);
  if (!city) {
    showError("Пожалуйста, выберите корректный город", "Ошибка");
    setIsSubmitting(false);
    return;
  }

  try {
    showInfo("Публикуем объявление...", "Процесс создания");
    
    let photoLinks: string[] = [];

    const uploadResult = await storeApi.uploadPhotos(
      "ads",
      photos.map((p) => p.file)
    );
    photoLinks = uploadResult.urls;

    const category = categories.find((c) => c.slug === formData.category);
    if (!category) {
      showError("Невалидная категория", "Ошибка");
      setIsSubmitting(false);
      return;
    }

    const lastSubcategory = findSubcategoryByPath(
      category.subcategories,
      subcategoryPath
    );
    if (!lastSubcategory) {
      showError("Невалидная подкатегория", "Ошибка");
      setIsSubmitting(false);
      return;
    }

      // Проверка обязательных фильтров
    const requiredFilters = (lastSubcategory?.filters || []).filter(fa => fa.required);
    for (const rf of requiredFilters) {
      const val = selectedFilters[rf.filterId];
      if (val === undefined || val === null || val === "") {
        const def = allFilters.find(f => f.id === rf.filterId);
        showError(`Укажите значение для фильтра "${def?.name || rf.filterId}".`, "Ошибка");
        setIsSubmitting(false);
        return;
      }
    }

    const filtersArray: AdFilter[] = Object.entries(selectedFilters).map(
      ([filterId, value]) => ({
        filterId,
        value: String(value),
      })
    );

    const newAd: Omit<Ad, "id"> = {
      title: formData.title,
      description: formData.description,
      slug: slugify(formData.title),
      price: Number(formData.price),
      city,
      links: photoLinks,
      views: 0,
      favoritesCount: 0,
      publishedAt: new Date().toISOString(),
      userId: user.id,
      adStatus: AdStatus.ACTIVE,
      adSold: mapConditionToAdSold(formData.condition),
      categoryId: category.id,
      subcategoryId: lastSubcategory.id,
      filters: filtersArray,
      fullAdress: formData.fullAdress,
      latitude: formData.latitude,
      longitude: formData.longitude,
    };

    await storeApi.addAd(newAd);
    showSuccess("Объявление успешно опубликовано!", "Поздравляем");
    navigate("/profile/ads");
  } catch (error) {
    console.error(error);
    showError("Ошибка при публикации объявления. Попробуйте позже.", "Ошибка публикации");
    
  } finally {
    setIsSubmitting(false); // всегда разблокируем
  }
};


  return {
    isLoadingInit,
    formData,
    setFormData,
    categories,
    cities,
    conditions,
    filters,
    selectedFilters,
    handleInputChange,
    updateAddressFromMap,
    handleFilterChange,
    handleSubmit,
    getRootProps,
    getInputProps,
    open,
    inputRef,
    isDragActive,
    photos,
    setAsMain,
    subcategoryPath,
    subcategoryLevels,
    handleSubcategorySelect,
    handleRemovePhoto,
    isSubmitting,

    addressInputRef,
    addressInput,
    handleAddressChange,
    onAddressBlur,
    onMapLoad,
    onPlacemarkDragEnd,
    mapRef,
  };
};