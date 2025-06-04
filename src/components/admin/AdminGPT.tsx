import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminGPT = () => {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("realistic");
  const [size, setSize] = useState("1024x1024");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);

  const categories = [
    { name: "Умный дом", color: "from-orange-400 to-orange-600" },
    { name: "Бытовая техника", color: "from-pink-400 to-purple-600" },
    { name: "Смартфоны", color: "from-purple-600 to-blue-600" },
    { name: "Умные часы и браслеты", color: "from-gray-700 to-gray-900" },
    { name: "Аксессуары", color: "from-purple-500 to-purple-700" },
    { name: "Планшеты", color: "from-cyan-400 to-blue-500" },
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);

    // Симуляция генерации изображения
    setTimeout(() => {
      const mockImage = `https://picsum.photos/400/300?random=${Date.now()}`;
      setGeneratedImages((prev) => [mockImage, ...prev]);
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Icon name="Sparkles" size={28} className="text-yellow-500" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Генерация изображений AI
          </h2>
          <p className="text-gray-600">
            Создайте изображения для категорий товаров с помощью ИИ
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Форма генерации */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Settings" size={20} />
              Настройки генерации
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Описание изображения
              </label>
              <Textarea
                placeholder="Опишите, какое изображение вы хотите создать для категории..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Стиль</label>
                <Select value={style} onValueChange={setStyle}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realistic">Реалистичный</SelectItem>
                    <SelectItem value="cartoon">Мультяшный</SelectItem>
                    <SelectItem value="minimalist">Минималистичный</SelectItem>
                    <SelectItem value="gradient">Градиентный</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Размер</label>
                <Select value={size} onValueChange={setSize}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="512x512">512×512</SelectItem>
                    <SelectItem value="1024x1024">1024×1024</SelectItem>
                    <SelectItem value="1024x1792">1024×1792</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={handleGenerate}
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-black"
              disabled={isGenerating || !prompt.trim()}
            >
              {isGenerating ? (
                <>
                  <Icon
                    name="Loader2"
                    size={16}
                    className="animate-spin mr-2"
                  />
                  Генерация...
                </>
              ) : (
                <>
                  <Icon name="Sparkles" size={16} className="mr-2" />
                  Создать изображение
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Существующие категории */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Grid3x3" size={20} />
              Текущие категории
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${category.color} rounded-lg p-4 text-white relative overflow-hidden`}
                >
                  <h3 className="font-medium text-sm">{category.name}</h3>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="mt-2 bg-white/20 hover:bg-white/30 text-white border-none"
                  >
                    <Icon name="RefreshCw" size={14} className="mr-1" />
                    Обновить
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Результаты генерации */}
      {generatedImages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Image" size={20} />
              Сгенерированные изображения
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {generatedImages.map((image, index) => (
                <div key={index} className="group relative">
                  <img
                    src={image}
                    alt={`Generated image ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                    <Button size="sm" variant="secondary">
                      <Icon name="Download" size={14} />
                    </Button>
                    <Button size="sm" variant="secondary">
                      <Icon name="Eye" size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminGPT;
