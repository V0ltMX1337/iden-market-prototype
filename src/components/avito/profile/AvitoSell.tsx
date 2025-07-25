import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import type { Ad, AdFilter, Category, City, FilterDefinition } from "@/lib/types";
import { AdStatus, AdSold, FilterType } from "@/lib/types";
import { useAuth } from "@/hooks/useAuth";
import { storeApi } from "@/lib/store";

const AvitoSell = () => {
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
        return AdSold.XOROSHEE;
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
      setSubcategoryLevels((prev) => [
        ...prev.slice(0, levelIndex + 1),
        children,
      ]);
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

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert("Пожалуйста, войдите в систему для публикации объявления.");
      return;
    }

    const requiredFields = [
      formData.title,
      formData.description,
      formData.price,
      formData.category,
      subcategoryPath.length > 0,
      formData.condition,
      formData.cityId,
    ];

    if (requiredFields.includes("") || requiredFields.includes(false)) {
      alert("Пожалуйста, заполните все обязательные поля.");
      return;
    }

    const city = cities.find((c) => c.id === formData.cityId);
    if (!city) {
      alert("Пожалуйста, выберите корректный город.");
      return;
    }

    try {
      let photoLinks: string[] = [];

      if (photos.length > 0) {
        const uploadResult = await storeApi.uploadPhotos(
          "ads",
          photos.map((p) => p.file)
        );
        photoLinks = uploadResult.urls;
      }

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
        filters: filtersArray, // 👈 сюда добавили
      };

      await storeApi.addAd(newAd);
      navigate("/profile/ads");
    } catch (error) {
      console.error(error);
      alert("Ошибка при публикации объявления. Попробуйте позже.");
    }
  };


  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Подать объявление
          </h1>
          <p className="text-gray-600">
            Заполните информацию о товаре для размещения объявления
          </p>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Photo uploader */}
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
                      alt="Фото объявления"
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

        {/* Basic info */}
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
                placeholder="Введите название"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Описание</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Введите описание"
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
                placeholder="Введите цену"
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Категория</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange("category", value)}
                required
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

            {/* Подкатегории по уровням */}
            {subcategoryLevels.map((levelSubcats, idx) => (
              <div key={idx}>
                <Label>Подкатегория (уровень {idx + 1})</Label>
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
              <Label htmlFor="condition">Состояние</Label>
              <Select
                value={formData.condition}
                onValueChange={(value) => handleInputChange("condition", value)}
                required
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
              <Label htmlFor="cityId">Город</Label>
              <Select
                value={formData.cityId}
                onValueChange={(value) => handleInputChange("cityId", value)}
                required
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
              <Label htmlFor="address">Адрес</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Введите адрес"
              />
            </div>
          </CardContent>
        </Card>

        {/* Фильтры */}
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
          Опубликовать
        </Button>
      </form>
    </div>
  );
};

export default AvitoSell;
