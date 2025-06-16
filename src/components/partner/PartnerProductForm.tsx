import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface PartnerProductFormProps {
  onClose: () => void;
}

export const categoryData = {
  Компьютеры: {
    Комплектующие: ["Материнская плата", "Процессор", "Видеокарта"],
    Ноутбуки: ["Игровые", "Офисные"],
  },
};

const manufacturers = ["ASUS", "MSI", "Gigabyte"];
const models = {
  ASUS: ["Prime B450", "TUF Gaming X570"],
  MSI: ["MAG B550", "PRO Z690"],
  Gigabyte: ["B660M", "X570 Aorus"],
};

const colors = ["Черный", "Белый", "Серый"];
const memoryOptions = ["8GB", "16GB", "32GB"];

const PartnerProductForm = ({ onClose }: PartnerProductFormProps) => {
  const [stage, setStage] = useState(1);
  const [formData, setFormData] = useState({
    category: "",
    subcategory: "",
    subsubcategory: "",

    manufacturer: "",
    model: "",
    memory: "",
    color: "",

    image: "",
    gallery: "",
    youtube: "",

    condition: "",
    name: "",
    price: "",
    priceWithoutDiscount: "",
    costPrice: "",
    warehouse: "",
    stock: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => setStage((prev) => prev + 1);
  const handleBack = () => setStage((prev) => prev - 1);

  const handleSubmit = () => {
    console.log("Final Data:", formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Создание товара (этап {stage}/5)</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6 py-4">
          {stage === 1 && (
            <>
              <Label>Категория</Label>
              <select
                value={formData.category}
                onChange={(e) => {
                  handleChange("category", e.target.value);
                  handleChange("subcategory", "");
                  handleChange("subsubcategory", "");
                }}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">Выберите категорию</option>
                {Object.keys(categoryData).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              {formData.category && (
                <>
                  <Label>Подкатегория</Label>
                  <select
                    value={formData.subcategory}
                    onChange={(e) => {
                      handleChange("subcategory", e.target.value);
                      handleChange("subsubcategory", "");
                    }}
                    className="w-full border px-3 py-2 rounded"
                  >
                    <option value="">Выберите подкатегорию</option>
                    {Object.keys(categoryData[formData.category as keyof typeof categoryData]).map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                </>
              )}

              {formData.subcategory && (
                <>
                  <Label>Тип</Label>
                  <select
                    value={formData.subsubcategory}
                    onChange={(e) => handleChange("subsubcategory", e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                  >
                    <option value="">Выберите тип</option>
                    {categoryData[formData.category as keyof typeof categoryData][
                      formData.subcategory as keyof typeof categoryData[string]
                    ].map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </>
              )}

              {formData.subsubcategory && (
                <div className="text-right">
                  <Button onClick={handleNext}>Продолжить</Button>
                </div>
              )}
            </>
          )}

          {stage === 2 && (
            <>
              <Label>Производитель</Label>
              <select
                value={formData.manufacturer}
                onChange={(e) => {
                  handleChange("manufacturer", e.target.value);
                  handleChange("model", "");
                }}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">Выберите</option>
                {manufacturers.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>

              {formData.manufacturer && (
                <>
                  <Label>Модель</Label>
                  <select
                    value={formData.model}
                    onChange={(e) => handleChange("model", e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                  >
                    <option value="">Выберите модель</option>
                    {models[formData.manufacturer as keyof typeof models].map((model) => (
                      <option key={model}>{model}</option>
                    ))}
                  </select>
                </>
              )}

              <Label>Память</Label>
              <select
                value={formData.memory}
                onChange={(e) => handleChange("memory", e.target.value)}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">Выберите</option>
                {memoryOptions.map((mem) => (
                  <option key={mem}>{mem}</option>
                ))}
              </select>

              <Label>Цвет</Label>
              <select
                value={formData.color}
                onChange={(e) => handleChange("color", e.target.value)}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">Выберите</option>
                {colors.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>

              <div className="flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  Назад
                </Button>
                <Button onClick={handleNext}>Далее</Button>
              </div>
            </>
          )}

          {stage === 3 && (
            <>
              <Label>Главное изображение (1:1)</Label>
              <Input
                type="url"
                placeholder="https://example.com/image.jpg"
                value={formData.image}
                onChange={(e) => handleChange("image", e.target.value)}
              />
              <Label>Галерея (до 10)</Label>
              <Input
                placeholder="Через запятую: https://img1.jpg, https://img2.jpg"
                value={formData.gallery}
                onChange={(e) => handleChange("gallery", e.target.value)}
              />
              <Label>Видео YouTube</Label>
              <Input
                placeholder="https://youtube.com/watch?v=..."
                value={formData.youtube}
                onChange={(e) => handleChange("youtube", e.target.value)}
              />

              <div className="flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  Назад
                </Button>
                <Button onClick={handleNext}>Далее</Button>
              </div>
            </>
          )}

          {stage === 4 && (
            <>
              <Label>Состояние</Label>
              <select
                value={formData.condition}
                onChange={(e) => handleChange("condition", e.target.value)}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">Выберите</option>
                <option value="new">Новый</option>
                <option value="used">Б/У</option>
              </select>

              <div className="flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  Назад
                </Button>
                <Button onClick={handleNext}>Далее</Button>
              </div>
            </>
          )}

          {stage === 5 && (
            <>
              <Label>Название</Label>
              <Input
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />

              <Label>Цена (₽)</Label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => handleChange("price", e.target.value)}
              />

              <Label>Цена без скидки</Label>
              <Input
                type="number"
                value={formData.priceWithoutDiscount}
                onChange={(e) => handleChange("priceWithoutDiscount", e.target.value)}
              />

              <Label>Закупочная цена</Label>
              <Input
                type="number"
                value={formData.costPrice}
                onChange={(e) => handleChange("costPrice", e.target.value)}
              />

              <Label>Склад отгрузки</Label>
              <Input
                value={formData.warehouse}
                onChange={(e) => handleChange("warehouse", e.target.value)}
              />

              <Label>Количество в наличии</Label>
              <Input
                type="number"
                value={formData.stock}
                onChange={(e) => handleChange("stock", e.target.value)}
              />

              <div className="flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  Назад
                </Button>
                <Button onClick={handleSubmit}>Готово</Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PartnerProductForm;