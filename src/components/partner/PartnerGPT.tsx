import { useState } from "react";
import { Buffer } from 'buffer';
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminGPT = () => {
  const [categoryName, setCategoryName] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [style, setStyle] = useState("minimalist");
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

  const generatePrompt = (category: string, selectedStyle: string) => {
    const basePrompt = `Создайте минималистичную иконку для категории "${category}" интернет-магазина. `;

    const stylePrompts = {
      minimalist:
        "Чистый минимализм, простые геометрические формы, плоский дизайн, без лишних деталей",
      gradient:
        "Яркие градиенты, современный стиль, объёмные элементы с мягкими тенями",
      realistic:
        "Реалистичные объекты с высокой детализацией, профессиональное освещение",
      geometric: "Геометрические абстрактные формы, симметрия, чёткие линии",
    };

    const contextPrompt =
      ". Иконка должна быть на прозрачном фоне или с лёгким градиентным фоном, подходить для использования в каталоге товаров, размер 512x512 пикселей, высокое качество, профессиональный дизайн.";

    return (
      basePrompt +
      stylePrompts[selectedStyle as keyof typeof stylePrompts] +
      contextPrompt
    );
  };

  const handleGenerate = async () => {
    if (!categoryName.trim() || !apiKey.trim()) return;

    setIsGenerating(true);

    try {
      // Используем прокси сервис для обхода CORS
      const targetUrl = "https://api.proxyapi.ru/openai/v1/images/generations";

      //const prompt = generatePrompt(categoryName, style);
      const prompt = "Создай визуалы для категорий маркетплейса по примеру на фото https://chatgpt.com/s/m_6841a90f708c81919b57bd5a833344ce. Обязательные категории: 1.умные часы и браслеты, 2.аксессуары, 3.одежда и обувь, 4.электросамокаты, 5.модемы и тв. Для каждой карточки категории свой градиент, фон сзади прозрачный, текст напиши так-же как на примере на русском!.";

      const response = await fetch(targetUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer sk-a7K2ucmIOIL5H4PSlBP4zUNa79EskbeE`,
        },
        body: JSON.stringify({
          model: "dall-e-3",
          prompt: prompt,
          size: "1024x1024",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          `API Error: ${response.status} - ${errorData.error?.message || "Unknown error"}`,
        );
      }

      const data = await response.json();
      const image_base64 = data.data[0].url;
      //downloadBase64Image(image_base64);

      setGeneratedImages((prev) => [image_base64, ...prev]);

      // Показываем успешное уведомление
      console.log("✅ Изображение успешно сгенерировано!");
    } catch (error) {
      console.error("Ошибка генерации:", error);

      // Для демонстрации создаем изображение-заглушку с текстом категории
      const canvas = document.createElement("canvas");
      canvas.width = 400;
      canvas.height = 400;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        // Создаем градиентный фон
        const gradient = ctx.createLinearGradient(0, 0, 400, 400);
        gradient.addColorStop(0, "#8B5CF6");
        gradient.addColorStop(1, "#3B82F6");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 400, 400);

        // Добавляем текст
        ctx.fillStyle = "white";
        ctx.font = "bold 24px Arial";
        ctx.textAlign = "center";
        ctx.fillText(categoryName, 200, 180);

        ctx.font = "16px Arial";
        ctx.fillText("Демо изображение", 200, 220);
        ctx.fillText(`Стиль: ${style}`, 200, 250);

        // Конвертируем в URL
        const mockImage = canvas.toDataURL("image/png");
        setGeneratedImages((prev) => [mockImage, ...prev]);
      } else {
        // Fallback к случайному изображению
        const mockImage = `https://picsum.photos/400/400?random=${Date.now()}`;
        setGeneratedImages((prev) => [mockImage, ...prev]);
      }

      // Показываем информативное сообщение об ошибке
      alert(
        `Не удалось подключиться к OpenAI API. Показано демо-изображение.\n\nОшибка: ${error instanceof Error ? error.message : "Неизвестная ошибка"}\n\nДля работы с реальным API нужен серверный прокси.`,
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadBase64Image = (base64: string, filename = "image.png") => {
  // Преобразуем base64 в Blob
  const byteCharacters = atob(base64); // декодируем base64
  const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) =>
    byteCharacters.charCodeAt(i)
  );
  const byteArray = new Uint8Array(byteNumbers);

  const blob = new Blob([byteArray], { type: "image/png" });

  // Создаем ссылку и инициируем загрузку
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();

  // Освобождаем память
  URL.revokeObjectURL(link.href);
};

  const handleCategoryUpdate = async (categoryName: string) => {
    setCategoryName(categoryName);
    if (apiKey.trim()) {
      await handleGenerate();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Icon name="Sparkles" size={28} className="text-yellow-500" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Генератор иконок категорий DALL-E 3
          </h2>
          <p className="text-gray-600">
            Создавайте профессиональные иконки для категорий товаров с помощью
            ИИ
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Настройки API и генерации */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Key" size={20} />
              Настройки DALL-E 3
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                API ключ OpenAI
              </label>
              <Input
                type="password"
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">
                Ваш ключ не сохраняется и используется только для этой сессии
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Название категории
              </label>
              <Input
                placeholder="Например: Наушники и гарнитуры"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Стиль иконки
              </label>
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minimalist">Минималистичный</SelectItem>
                  <SelectItem value="gradient">Градиентный</SelectItem>
                  <SelectItem value="realistic">Реалистичный</SelectItem>
                  <SelectItem value="geometric">Геометрический</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm font-medium mb-2">Автоматический промпт:</p>
              <p className="text-xs text-gray-600">
                {categoryName
                  ? generatePrompt(categoryName, style)
                  : "Введите название категории для предварительного просмотра промпта"}
              </p>
            </div>

            <Button
              onClick={handleGenerate}
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-black"
              disabled={isGenerating || !categoryName.trim() || !apiKey.trim()}
            >
              {isGenerating ? (
                <>
                  <Icon
                    name="Loader2"
                    size={16}
                    className="animate-spin mr-2"
                  />
                  Генерация через DALL-E 3...
                </>
              ) : (
                <>
                  <Icon name="Sparkles" size={16} className="mr-2" />
                  Создать иконку категории
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Текущие категории */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Grid3x3" size={20} />
              Категории каталога
            </CardTitle>
            <p className="text-sm text-gray-600">
              Нажмите "Обновить" для генерации новой иконки
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${category.color} rounded-lg p-4 text-white relative overflow-hidden group hover:scale-105 transition-transform`}
                >
                  <h3 className="font-medium text-sm mb-2">{category.name}</h3>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/20 hover:bg-white/30 text-white border-none"
                    onClick={() => handleCategoryUpdate(category.name)}
                    disabled={!apiKey.trim()}
                  >
                    <Icon name="RefreshCw" size={14} className="mr-1" />
                    Обновить
                  </Button>

                  {/* Демо иконка из изображения */}
                  <div className="absolute -right-2 -top-2 opacity-20">
                    <Icon name="Smartphone" size={40} />
                  </div>
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
              Сгенерированные иконки
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {generatedImages.map((image, index) => (
                <div
                  key={index}
                  className="group relative bg-gray-50 rounded-lg overflow-hidden"
                >
                  <img
                    src={image}
                    alt={`Generated category icon ${index + 1}`}
                    className="w-full h-32 object-contain p-2"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => {
                        const link = document.createElement("a");
                        link.href = image;
                        link.download = `category-icon-${categoryName || index + 1}.png`;
                        link.click();
                      }}
                    >
                      <Icon name="Download" size={14} />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => {
                        navigator.clipboard.writeText(image);
                        alert("Ссылка на изображение скопирована!");
                      }}
                    >
                      <Icon name="Copy" size={14} />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => window.open(image, "_blank")}
                    >
                      <Icon name="Eye" size={14} />
                    </Button>
                  </div>
                  <div className="p-2 bg-white">
                    <p className="text-xs text-gray-600 truncate">
                      {categoryName || `Иконка ${index + 1}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Справка */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Icon name="Lightbulb" size={20} className="text-yellow-600 mt-1" />
            <div>
              <h3 className="font-medium text-yellow-800 mb-2">
                Советы по использованию:
              </h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>
                  • Используйте описательные названия категорий для лучших
                  результатов
                </li>
                <li>
                  • Минималистичный стиль лучше всего подходит для иконок
                  интерфейса
                </li>
                <li>
                  • Изображения генерируются в высоком качестве (1024x1024)
                </li>
                <li>
                  • API ключ не сохраняется и используется только в текущей
                  сессии
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminGPT;
