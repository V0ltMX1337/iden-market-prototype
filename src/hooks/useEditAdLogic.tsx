import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDropzone } from "react-dropzone";

import type { Ad, AdFilter, Category, City, FilterDefinition } from "@/lib/types";
import { AdStatus, AdSold } from "@/lib/types";
import { useAuth } from "@/hooks/useAuth";
import { storeApi } from "@/lib/store";
import { useAlertContext } from "@/contexts/AlertContext";
import Icon from "@/components/ui/icon";
import { slugify } from "@/lib/slug";

export const useEditAdLogic = () => {
  const { adId } = useParams<{ adId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showSuccess, showError, showInfo } = useAlertContext();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentAd, setCurrentAd] = useState<Ad | null>(null);

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
  const [subcategoryLevels, setSubcategoryLevels] = useState<
    Array<{ name: string; slug: string }[]>
  >([]);

  const [categories, setCategories] = useState<Category[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [photos, setPhotos] = useState<
    Array<{ file?: File; preview: string; isMain: boolean; url?: string }>
  >([]);

  const [allFilters, setAllFilters] = useState<FilterDefinition[]>([]);
  const [filters, setFilters] = useState<FilterDefinition[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string | number | boolean>
  >({});
  const [addressInput, setAddressInput] = useState<string>("");

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

  const mapAdSoldToCondition = (adSold: AdSold): string => {
    switch (adSold) {
      case AdSold.NEW:
        return "Новое";
      case AdSold.OTLICHNOE:
        return "Отличное";
      case AdSold.XOROSHEE:
        return "Хорошее";
      case AdSold.YDVORITEL:
        return "Удовлетворительное";
      default:
        return "Новое";
    }
  };

  // Загрузка данных
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      if (!adId) {
        console.error("Missing adId from route params");
        setIsLoading(false); // просто остановим загрузку
        return;
      }
      
      try {
        const [categoriesData, citiesData, filtersData, adData] = await Promise.all([
          storeApi.getCategories(),
          storeApi.getCities(), 
          storeApi.getFilters(),
          storeApi.getAdById(adId),
        ]);

        setCategories(categoriesData);
        setCities(citiesData);
        setAllFilters(filtersData);
        setCurrentAd(adData);

        // Заполняем форму данными объявления
        const category = categoriesData.find(c => c.id === adData.categoryId);
        setFormData({
          title: adData.title,
          description: adData.description,
          price: adData.price.toString(),
          category: category?.slug || "",
          condition: mapAdSoldToCondition(adData.adSold),
          cityId: adData.city.id,
          address: adData.fullAdress || "",
          fullAdress: adData.fullAdress || "",
          latitude: adData.latitude || 0,
          longitude: adData.longitude || 0,
        });

        // Загружаем фотографии
        const photoData = adData.links.map((url, index) => ({
          preview: url,
          isMain: index === 0,
          url: url,
        }));
        setPhotos(photoData);
        setAddressInput(formData.fullAdress || "")

        // Устанавливаем фильтры
        const filtersMap: Record<string, string | number | boolean> = {};
        adData.filters.forEach(filter => {
          filtersMap[filter.filterId] = filter.value;
        });
        setSelectedFilters(filtersMap);

        showSuccess("Объявление загружено", "Готово к редактированию");
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
        showError("Не удалось загрузить данные объявления", "Ошибка загрузки");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();

    return () => {
      // Очищаем preview URL при размонтировании
      photos.forEach((p) => {
        if (p.file && p.preview.startsWith('blob:')) {
          URL.revokeObjectURL(p.preview);
        }
      });
    };
  }, [adId]);

  // Обработка изменения категории
  useEffect(() => {
    if (formData.category && currentAd) {
      const cat = categories.find((c) => c.slug === formData.category);
      if (cat) {
        // Загружаем подкатегории для текущего объявления
        const loadSubcategories = async () => {
          try {
            // Найдем путь к подкатегории объявления
            const findSubcategoryPath = (subcategories: any[], targetId: string, path: string[] = []): string[] | null => {
              for (const subcat of subcategories) {
                const currentPath = [...path, subcat.slug];
                if (subcat.id === targetId) {
                  return currentPath;
                }
                if (subcat.children) {
                  const result = findSubcategoryPath(subcat.children, targetId, currentPath);
                  if (result) return result;
                }
              }
              return null;
            };

            const path = findSubcategoryPath(cat.subcategories, currentAd.subcategoryId);
            if (path) {
              setSubcategoryPath(path);
              
              // Строим уровни подкатегорий
              const levels: Array<{ name: string; slug: string }[]> = [cat.subcategories];
              let currentLevel = cat.subcategories;
              
              for (let i = 0; i < path.length - 1; i++) {
                const subcat = currentLevel.find(s => s.slug === path[i]);
                if (subcat?.children) {
                  currentLevel = subcat.children;
                  levels.push(currentLevel);
                }
              }
              
              setSubcategoryLevels(levels);

              // Загружаем фильтры последней подкатегории
              const lastSubcat = currentLevel.find(s => s.slug === path[path.length - 1]);
              if (lastSubcat) {
                const filterDefs = lastSubcat.filters
                  .map((fa: any) => allFilters.find((f) => f.id === fa.filterId))
                  .filter((f): f is FilterDefinition => f !== undefined);
                setFilters(filterDefs);
              }
            }
          } catch (error) {
            console.error("Ошибка загрузки подкатегорий:", error);
            showError("Не удалось загрузить подкатегории", "Ошибка");
          }
        };

        loadSubcategories();
      }
    }
  }, [formData.category, categories, currentAd, allFilters]);

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

  const handleInputChange = (field: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
    noKeyboard: true,
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
      if (removed[0]?.preview && removed[0]?.file) {
        URL.revokeObjectURL(removed[0].preview);
      }

      if (removed[0]?.isMain && newPhotos.length > 0) {
        newPhotos[0].isMain = true;
      }

      return newPhotos;
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    if (!user) {
      showError("Пожалуйста, войдите в систему", "Ошибка авторизации");
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
      showInfo("Обновляем объявление...", "Процесс сохранения");

      let photoLinks: string[] = [];

      // Обрабатываем фотографии
      const newFiles = photos.filter(p => p.file).map(p => p.file!);
      const existingUrls = photos.filter(p => p.url).map(p => p.url!);

      if (newFiles.length > 0) {
        const uploadResult = await storeApi.uploadPhotos("ads", newFiles);
        photoLinks = [...existingUrls, ...uploadResult.urls];
      } else {
        photoLinks = existingUrls;
      }

      // Устанавливаем главное фото первым
      const mainPhotoIndex = photos.findIndex(p => p.isMain);
      if (mainPhotoIndex > 0) {
        const mainPhoto = photoLinks[mainPhotoIndex];
        photoLinks.splice(mainPhotoIndex, 1);
        photoLinks.unshift(mainPhoto);
      }

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

      const updatedAd: Omit<Ad, "id"> = {
        title: formData.title,
        description: formData.description,
        slug: slugify(formData.title),
        price: Number(formData.price),
        city,
        links: photoLinks,
        views: currentAd?.views || 0,
        favoritesCount: currentAd?.favoritesCount || 0,
        publishedAt: currentAd?.publishedAt || new Date().toISOString(),
        userId: user.id,
        adStatus: currentAd?.adStatus || AdStatus.ACTIVE,
        adSold: mapConditionToAdSold(formData.condition),
        categoryId: category.id,
        subcategoryId: lastSubcategory.id,
        filters: filtersArray,
        fullAdress: formData.fullAdress,
        latitude: formData.latitude,
        longitude: formData.longitude,
      };

      await storeApi.updateAd(adId, updatedAd);
      showSuccess("Объявление успешно обновлено!", "Сохранено");
      navigate("/profile/ads");
    } catch (error) {
      console.error(error);
      showError("Ошибка при обновлении объявления. Попробуйте позже.", "Ошибка сохранения");
    } finally {
      setIsSubmitting(false);
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
    handleFilterChange,
    handleUpdate,
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
    isLoading,
    currentAd,
    setAddressInput,
    addressInput,
  };
};