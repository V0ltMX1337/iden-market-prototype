import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";

import type { Ad, AdFilter, Category, City, FilterDefinition } from "@/lib/types";
import { AdStatus, AdSold } from "@/lib/types";
import { useAuth } from "@/hooks/useAuth";
import { storeApi } from "@/lib/store";

export const useEditAdLogic = (adId: string) => {
  const navigate = useNavigate();
  const { user } = useAuth();

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
  const [subcategoryLevels, setSubcategoryLevels] = useState<Array<{ name: string; slug: string }[]>>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [photos, setPhotos] = useState<Array<{ file: File; preview: string; isMain: boolean }>>([]);
  const [existingLinks, setExistingLinks] = useState<string[]>([]); // старые фото

  const [allFilters, setAllFilters] = useState<FilterDefinition[]>([]);
  const [filters, setFilters] = useState<FilterDefinition[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string | number | boolean>>({});

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
    const fetchData = async () => {
      const [catRes, cityRes, filterRes, adRes] = await Promise.all([
        storeApi.getCategories(),
        storeApi.getCities(),
        storeApi.getFilters(),
        storeApi.getAdById(adId),
      ]);
      setCategories(catRes);
      setCities(cityRes);
      setAllFilters(filterRes);

      const ad = adRes;
      const city = ad.city.id;

      setFormData({
        title: ad.title,
        description: ad.description,
        price: ad.price.toString(),
        category: ad.categoryId,
        condition: Object.keys(AdSold).find((key) => AdSold[key as keyof typeof AdSold] === ad.adSold) || "Новое",
        cityId: city,
        address: ad.fullAdress,
        fullAdress: ad.fullAdress,
        latitude: ad.latitude,
        longitude: ad.longitude,
      });

      setExistingLinks(ad.links);

      const cat = catRes.find((c) => c.id === ad.categoryId);
      if (cat) {
        const path: string[] = [];
        let currentSub = cat.subcategories;
        while (currentSub && currentSub.length > 0) {
          const found = currentSub.find((s) => s.id === ad.subcategoryId);
          if (found) {
            path.push(found.slug);
            break;
          } else {
            const child = currentSub.find((s) =>
              s.children?.some((c) => c.id === ad.subcategoryId)
            );
            if (child) {
              path.push(child.slug);
              currentSub = child.children || [];
            } else {
              break;
            }
          }
        }
        setSubcategoryPath(path);
        setSubcategoryLevels([cat.subcategories]);

        const last = path[path.length - 1];
        const sub = findSubcategoryByPath(cat.subcategories, path);
        if (sub) {
          const subFilters = sub.filters
            .map((f) => filterRes.find((ff) => ff.id === f.filterId))
            .filter((f): f is FilterDefinition => !!f);
          setFilters(subFilters);
        }
      }

      const selected: Record<string, string | number | boolean> = {};
      ad.filters.forEach((f) => {
        selected[f.filterId] = f.value;
      });
      setSelectedFilters(selected);
    };

    fetchData();
  }, [adId]);

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

  const updateAddressFromMap = (fullAdress: string, latitude: number, longitude: number) => {
    setFormData((prev) => ({
      ...prev,
      fullAdress,
      latitude,
      longitude,
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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  const setAsMain = (index: number) => {
    setPhotos((prev) =>
      prev.map((p, i) => ({ ...p, isMain: i === index }))
    );
  };

  const handleUpdate = async () => {
    const city = cities.find((c) => c.id === formData.cityId);
    if (!city) {
      alert("Выберите корректный город");
      return;
    }

    const cat = categories.find((c) => c.slug === formData.category);
    const sub = cat && findSubcategoryByPath(cat.subcategories, subcategoryPath);
    if (!cat || !sub) {
      alert("Проверьте категорию и подкатегорию");
      return;
    }

    let photoLinks = [...existingLinks];

    if (photos.length > 0) {
      const uploaded = await storeApi.uploadPhotos(
        "ads",
        photos.map((p) => p.file)
      );
      photoLinks = [...uploaded.urls];
    }

    const filtersArray: AdFilter[] = Object.entries(selectedFilters).map(([filterId, value]) => ({
      filterId,
      value: String(value),
    }));

    const updatedAd: Omit<Ad, "id"> = {
      title: formData.title,
      description: formData.description,
      price: Number(formData.price),
      city,
      links: photoLinks,
      views: 0,
      favoritesCount: 0,
      publishedAt: new Date().toISOString(),
      userId: user?.id || "",
      adStatus: AdStatus.ACTIVE,
      adSold: mapConditionToAdSold(formData.condition),
      categoryId: cat.id,
      subcategoryId: sub.id,
      filters: filtersArray,
      fullAdress: formData.fullAdress,
      latitude: formData.latitude,
      longitude: formData.longitude,
    };

    await storeApi.updateAd(adId, updatedAd);
    navigate("/profile/ads");
  };

  return {
    formData,
    handleInputChange,
    updateAddressFromMap,
    handleFilterChange,
    selectedFilters,
    filters,
    subcategoryPath,
    subcategoryLevels,
    handleSubcategorySelect,
    categories,
    cities,
    conditions: ["Новое", "Отличное", "Очень хорошее", "Хорошее", "Удовлетворительное"],
    photos,
    existingLinks,
    setAsMain,
    getRootProps,
    getInputProps,
    isDragActive,
    handleUpdate,
  };
};
