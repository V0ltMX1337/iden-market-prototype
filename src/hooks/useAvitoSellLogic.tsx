// --- logic/avitoSellLogic.ts ---
import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";

import type { Ad, AdFilter, Category, City, FilterDefinition } from "@/lib/types";
import { AdStatus, AdSold } from "@/lib/types";
import { useAuth } from "@/hooks/useAuth";
import { storeApi } from "@/lib/store";

export const useAvitoSellLogic = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    condition: "",
    cityId: "",
    address: "",        // прежнее поле для адреса
    fullAdress: "",     // новое поле: полный адрес из карты/геокодера
    latitude: 0,        // новое поле: широта
    longitude: 0,       // новое поле: долгота
  });

  const [subcategoryPath, setSubcategoryPath] = useState<string[]>([]);
  const [subcategoryLevels, setSubcategoryLevels] = useState<
    Array<{ name: string; slug: string }[]>
  >([]);

  const [categories, setCategories] = useState<Category[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [photos, setPhotos] = useState<
    Array<{ file: File; preview: string; isMain: boolean }>
  >([]);

  const [allFilters, setAllFilters] = useState<FilterDefinition[]>([]);
  const [filters, setFilters] = useState<FilterDefinition[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string | number | boolean>
  >({});

  const conditions = [
    "Новое",
    "Отличное",
    "Очень хорошее",
    "Хорошее",
    "Удовлетворительное",
  ];

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
    storeApi.getCategories().then(setCategories);
    storeApi.getCities().then(setCities);
    storeApi.getFilters().then(setAllFilters);

    return () => {
      photos.forEach((p) => URL.revokeObjectURL(p.preview));
    };
  }, []);

  useEffect(() => {
    if (formData.category) {
      const cat = categories.find((c) => c.slug === formData.category);
      if (cat) {
        setSubcategoryPath([]);
        setSubcategoryLevels([cat.subcategories]);
      } else {
        setSubcategoryLevels([]);
        setSubcategoryPath([]);
      }
      setFilters([]);
      setSelectedFilters({});
    } else {
      setSubcategoryLevels([]);
      setSubcategoryPath([]);
      setFilters([]);
      setSelectedFilters({});
    }
  }, [formData.category, categories]);

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

const inputRef = useRef<HTMLInputElement>(null);

  const setAsMain = (index: number) => {
    setPhotos((prev) =>
      prev.map((p, i) => ({ ...p, isMain: i === index }))
    );
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!user) {
    alert("Пожалуйста, войдите в систему для публикации объявления.");
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
    alert("Пожалуйста, исправьте следующие ошибки:\n\n" + errors.join("\n"));
    return;
  }

  const city = cities.find((c) => c.id === formData.cityId);
  if (!city) {
    alert("Пожалуйста, выберите корректный город.");
    return;
  }

  try {
    let photoLinks: string[] = [];

    const uploadResult = await storeApi.uploadPhotos(
      "ads",
      photos.map((p) => p.file)
    );
    photoLinks = uploadResult.urls;

    const category = categories.find((c) => c.slug === formData.category);
    if (!category) {
      alert("Невалидная категория.");
      return;
    }

    const lastSubcategory = findSubcategoryByPath(
      category.subcategories,
      subcategoryPath
    );
    if (!lastSubcategory) {
      alert("Невалидная подкатегория.");
      return;
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
    navigate("/profile/ads");
  } catch (error) {
    console.error(error);
    alert("Ошибка при публикации объявления. Попробуйте позже.");
  }
};


  return {
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
  };
};
