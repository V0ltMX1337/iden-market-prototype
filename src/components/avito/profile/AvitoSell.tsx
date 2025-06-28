import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { YMaps, Map, Placemark, GeolocationControl, SearchControl } from "@pbe/react-yandex-maps";

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

const AvitoSell = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    condition: "",
    location: "",
  });

  const categories = [
    "Транспорт","Недвижимость","Работа",
    "Услуги","Личные вещи","Для дома и дачи",
    "Электроника","Хобби и отдых",
  ];

  const conditions = [
    "Новое","Отличное","Очень хорошее",
    "Хорошее","Удовлетворительное",
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const [photos, setPhotos] = useState<
    Array<{ file: File; preview: string; isMain: boolean }>
  >([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const mapped = acceptedFiles.map((file, idx) => ({
        file,
        preview: URL.createObjectURL(file),
        isMain: photos.length + idx === 0,
      }));
      setPhotos(prev => [...prev, ...mapped]);
    },
    [photos]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  const setAsMain = (index: number) => {
    setPhotos(prev =>
      prev.map((p, i) => ({ ...p, isMain: i === index }))
    );
  };

  const [coords, setCoords] = useState<[number, number]>([55.75, 37.57]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const c: [number, number] = [
          pos.coords.latitude,
          pos.coords.longitude,
        ];
        setCoords(c);
      });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь отправка formData, photos, coords на сервер...
    navigate("/avito/profile/ads");
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
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute bottom-2 left-2"
                      onClick={() => setAsMain(i)}
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
                onValueChange={v => handleInputChange("category", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(c => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="title">Название</Label>
              <Input
                id="title"
                placeholder="Например: iPhone 14 Pro 128GB"
                value={formData.title}
                onChange={e => handleInputChange("title", e.target.value)}
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
                onChange={e =>
                  handleInputChange("description", e.target.value)
                }
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="condition">Состояние</Label>
                <Select
                  value={formData.condition}
                  onValueChange={v => handleInputChange("condition", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите состояние" />
                  </SelectTrigger>
                  <SelectContent>
                    {conditions.map(c => (
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
                  onChange={e => handleInputChange("price", e.target.value)}
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
          <CardContent>
            <div className="space-y-4">
              <Label>Укажите город/точку на карте</Label>
              <YMaps>
                <Map
                  defaultState={{ center: coords, zoom: 10 }}
                  width="100%"
                  height="300px"
                  onClick={e => {
                    const c = e.get("coords") as [number, number];
                    setCoords(c);
                  }}
                >
                  <GeolocationControl options={{ float: "left" }} />
                  <SearchControl options={{ float: "left" }} />
                  <Placemark geometry={coords} />
                </Map>
              </YMaps>
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
