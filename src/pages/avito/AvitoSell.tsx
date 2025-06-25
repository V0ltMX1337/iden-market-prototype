import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Icon from "@/components/ui/icon";

const AvitoSell = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    condition: "",
    location: "Москва",
  });

  const categories = [
    "Транспорт",
    "Недвижимость",
    "Работа",
    "Услуги",
    "Личные вещи",
    "Для дома и дачи",
    "Электроника",
    "Хобби и отдых",
  ];

  const conditions = [
    "Новое",
    "Отличное",
    "Очень хорошее",
    "Хорошее",
    "Удовлетворительное",
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь была бы логика отправки формы
    navigate("/avito/profile/ads");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button
              variant="ghost"
              onClick={() => navigate("/avito")}
              className="flex items-center space-x-2"
            >
              <Icon name="ArrowLeft" size={20} />
              <span className="text-2xl font-bold text-blue-600">AVITO</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Подать объявление
          </h1>
          <p className="text-gray-600">
            Заполните информацию о товаре для размещения объявления
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Photos */}
          <Card>
            <CardHeader>
              <CardTitle>Фотографии</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Icon
                  name="ImagePlus"
                  size={48}
                  className="mx-auto text-gray-400 mb-4"
                />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Добавьте фотографии
                </h3>
                <p className="text-gray-600 mb-4">
                  Первая фотография будет на обложке объявления
                </p>
                <Button type="button" variant="outline">
                  <Icon name="Upload" size={16} className="mr-2" />
                  Выбрать фото
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Основная информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="category">Категория</Label>
                <Select
                  onValueChange={(value) =>
                    handleInputChange("category", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
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
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Описание</Label>
                <Textarea
                  id="description"
                  placeholder="Расскажите о товаре подробнее..."
                  rows={6}
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="condition">Состояние</Label>
                  <Select
                    onValueChange={(value) =>
                      handleInputChange("condition", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите состояние" />
                    </SelectTrigger>
                    <SelectContent>
                      {conditions.map((condition) => (
                        <SelectItem key={condition} value={condition}>
                          {condition}
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

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle>Местоположение</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="location">Город</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/avito")}
            >
              Отменить
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Опубликовать объявление
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AvitoSell;
