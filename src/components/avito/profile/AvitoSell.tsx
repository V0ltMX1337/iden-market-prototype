import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

import type { Ad, Category, City } from "@/lib/types";
import { useAuth } from "@/hooks/useAuth";
import { storeApi } from "@/lib/store";

const AvitoSell = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",     // slug категории
    subcategory: "",  // slug подкатегории
    condition: "",
    cityId: "",
    address: "",
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [photos, setPhotos] = useState<
    Array<{ file: File; preview: string; isMain: boolean }>
  >([]);

  const conditions = [
    "Новое",
    "Отличное",
    "Очень хорошее",
    "Хорошее",
    "Удовлетворительное",
  ];

  useEffect(() => {
    storeApi.getCategories().then(setCategories);
    storeApi.getCities().then(setCities);

    // Очистка preview URL при размонтировании
    return () => {
      photos.forEach((p) => URL.revokeObjectURL(p.preview));
    };
  }, []);

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
    setPhotos((prev) => prev.map((p, i) => ({ ...p, isMain: i === index })));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert("Пожалуйста, войдите в систему для публикации объявления.");
      return;
    }

    if (
      !formData.title ||
      !formData.description ||
      !formData.price ||
      !formData.category ||
      !formData.subcategory ||
      !formData.condition ||
      !formData.cityId
    ) {
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
        // Загружаем файлы в папку 'ads'
        const uploadResult = await storeApi.uploadPhotos(
          "ads",
          photos.map((p) => p.file)
        );
        photoLinks = uploadResult.urls;
      }

      const category = categories.find((c) => c.slug === formData.category);
      const subcategorySlug = formData.subcategory;

      if (!category) {
        alert("Невалидная категория.");
        return;
      }

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
        active: true,
        categoryId: category.id,
        subcategorySlug: subcategorySlug,
      };

      await storeApi.addAd(newAd);

      navigate("/avito/profile/ads");
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
              <Label htmlFor="category">Категория</Label>
              <Select
                value={formData.category}
                onValueChange={(v) => {
                  handleInputChange("category", v);
                  handleInputChange("subcategory", "");
                }}
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

            {formData.category && (
              <div>
                <Label htmlFor="subcategory">Подкатегория</Label>
                <Select
                  value={formData.subcategory}
                  onValueChange={(v) => handleInputChange("subcategory", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите подкатегорию" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories
                      .find((cat) => cat.slug === formData.category)
                      ?.subcategories.map((sub) => (
                        <SelectItem key={sub.slug} value={sub.slug}>
                          {sub.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div>
              <Label htmlFor="title">Название</Label>
              <Input
                id="title"
                placeholder="Например: iPhone 14 Pro 128GB"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Описание</Label>
              <Textarea
                id="description"
                rows={4}
                placeholder="Расскажите подробнее..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="condition">Состояние</Label>
                <Select
                  value={formData.condition}
                  onValueChange={(v) => handleInputChange("condition", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите состояние" />
                  </SelectTrigger>
                  <SelectContent>
                    {conditions.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="price">Цена, ₽</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="0"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location picker */}
        <Card>
          <CardHeader>
            <CardTitle>Местоположение</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="cityId">Город</Label>
              <Select
                value={formData.cityId}
                onValueChange={(v) => handleInputChange("cityId", v)}
              >
                <SelectTrigger>
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
              <Label htmlFor="address">Адрес (опционально)</Label>
              <Input
                id="address"
                placeholder="Улица, дом, квартира и т.п."
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => navigate("/avito")}>
            Отменить
          </Button>
          <Button type="submit" className="bg-green-600 hover:bg-green-700">
            Опубликовать объявление
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AvitoSell;
