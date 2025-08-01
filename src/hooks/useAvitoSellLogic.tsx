// --- logic/avitoSellLogic.ts ---
import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";

import type { Ad, AdFilter, Category, City, FilterDefinition } from "@/lib/types";
import { AdStatus, AdSold } from "@/lib/types";
import { useAuth } from "@/hooks/useAuth";
import { storeApi } from "@/lib/store";
import { useAlertContext } from "@/contexts/AlertContext";

export const useAvitoSellLogic = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showSuccess, showError, showInfo } = useAlertContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const inputRef = useRef<HTMLInputElement>(null);

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
  };
};