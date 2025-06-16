import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDropzone } from "react-dropzone";
import clsx from "clsx";

const MAX_IMAGES = 10;

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

export default function ProductWizardForm({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [images, setImages] = useState<File[]>([]);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [youtubeLink, setYoutubeLink] = useState("");
  const [condition, setCondition] = useState("");

  const handleMainDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles[0]) setMainImage(acceptedFiles[0]);
  };

  const handleGalleryDrop = (acceptedFiles: File[]) => {
    if (images.length + acceptedFiles.length <= MAX_IMAGES) {
      setImages((prev) => [...prev, ...acceptedFiles]);
    }
  };

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

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
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
              </>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label className="font-semibold">Бренд</Label>
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


            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label className="font-semibold">Главное изображение</Label>
              <DropZoneArea onDrop={handleMainDrop} file={mainImage} />
              <p className="text-xs text-muted-foreground mt-1">
                Соотношение: 1:1, мин 342x342, макс 1600x1600, до 4MB
              </p>
            </div>
            <div>
              <Label className="font-semibold">Галерея (максимум 10)</Label>
              <DropZoneArea onDrop={handleGalleryDrop} multiple files={images} />
            </div>
            <div>
              <Label htmlFor="youtube">Видео с YouTube</Label>
              <Input
                id="youtube"
                placeholder="https://youtube.com/..."
                value={youtubeLink}
                onChange={(e) => setYoutubeLink(e.target.value)}
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <Label className="font-semibold">Состояние</Label>
            {["Новый, не использовался", "Б/У"].map((item) => (
              <div
                key={item}
                onClick={() => setCondition(item)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <div
                  className={clsx(
                    "w-4 h-4 rounded-full border",
                    condition === item ? "border-blue-600 bg-blue-600" : "border-gray-400"
                  )}
                />
                <span>{item}</span>
              </div>
            ))}
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
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
          </div>
        );

      default:
        return <div>Шаг {step} - пока не реализован.</div>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Заполните товар</CardTitle>
          <Button variant="ghost" onClick={onClose}>Закрыть</Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-sm">
              {[1, 2, 3, 4, 5].map((s) => (
                <div
                  key={s}
                  className={clsx(
                    "w-6 h-6 flex items-center justify-center rounded-full border text-xs",
                    step === s ? "bg-blue-600 text-white" : "border-gray-300"
                  )}
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          {renderStep()}

          <div className="flex justify-between">
            {step > 1 ? (
              <Button variant="outline" onClick={() => setStep((prev) => prev - 1)}>
                Назад
              </Button>
            ) : <div />}
            <Button onClick={() => setStep((prev) => Math.min(prev + 1, 5))}>
              Далее
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function DropZoneArea({
  onDrop,
  multiple = false,
  file,
  files
}: {
  onDrop: (files: File[]) => void;
  multiple?: boolean;
  file?: File | null;
  files?: File[];
}) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple,
    accept: {
      "image/*": []
    }
  });

  const fileList = file ? [file] : files ?? [];

  return (
    <div
      {...getRootProps()}
      className={clsx(
        "mt-2 border-2 border-dashed rounded-md p-4 text-center cursor-pointer transition",
        isDragActive ? "border-blue-500" : "border-gray-300"
      )}
    >
      <input {...getInputProps()} />
      {fileList.length === 0 ? (
        <p className="text-sm text-muted-foreground">Добавьте фото</p>
      ) : (
        <div className="flex flex-wrap gap-2 justify-center">
          {fileList.map((f, i) => (
            <div key={i} className="w-20 h-20 bg-gray-200 rounded-md overflow-hidden flex items-center justify-center">
              <img
                src={URL.createObjectURL(f)}
                alt="preview"
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
