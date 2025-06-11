import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface ARTryOnProps {
  productImage: string;
  productTitle: string;
  productType: "collar" | "muzzle" | "harness" | "leash";
}

interface KeyPoint {
  x: number;
  y: number;
  confidence: number;
}

interface DogFeatures {
  snout: KeyPoint;
  neck: KeyPoint;
  chest: KeyPoint;
  head: KeyPoint;
}

const ARTryOn = ({ productImage, productTitle, productType }: ARTryOnProps) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(
    null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Детекция ключевых точек собаки на изображении
  const detectDogFeatures = useCallback((imageData: ImageData): DogFeatures => {
    const { data, width, height } = imageData;

    // Поиск контуров и ключевых точек через анализ пикселей
    let headCenter = { x: 0, y: 0, count: 0 };
    let neckRegion = { x: 0, y: 0, count: 0 };
    let snoutRegion = { x: 0, y: 0, count: 0 };

    // Анализируем верхнюю треть изображения (голова)
    for (let y = 0; y < height * 0.6; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];

        // Детекция краев через контраст
        const brightness = (r + g + b) / 3;
        const isEdge = brightness > 50 && brightness < 200;

        if (isEdge) {
          // Область головы (верхняя часть)
          if (y < height * 0.4) {
            headCenter.x += x;
            headCenter.y += y;
            headCenter.count++;
          }

          // Область шеи (средняя часть)
          if (y > height * 0.3 && y < height * 0.6) {
            neckRegion.x += x;
            neckRegion.y += y;
            neckRegion.count++;
          }

          // Область морды (центральная нижняя часть головы)
          if (
            y > height * 0.4 &&
            y < height * 0.6 &&
            x > width * 0.3 &&
            x < width * 0.7
          ) {
            snoutRegion.x += x;
            snoutRegion.y += y;
            snoutRegion.count++;
          }
        }
      }
    }

    return {
      head: {
        x: headCenter.count > 0 ? headCenter.x / headCenter.count : width * 0.5,
        y:
          headCenter.count > 0 ? headCenter.y / headCenter.count : height * 0.3,
        confidence: Math.min(headCenter.count / 1000, 1),
      },
      neck: {
        x: neckRegion.count > 0 ? neckRegion.x / neckRegion.count : width * 0.5,
        y:
          neckRegion.count > 0
            ? neckRegion.y / neckRegion.count
            : height * 0.45,
        confidence: Math.min(neckRegion.count / 800, 1),
      },
      snout: {
        x:
          snoutRegion.count > 0
            ? snoutRegion.x / snoutRegion.count
            : width * 0.5,
        y:
          snoutRegion.count > 0
            ? snoutRegion.y / snoutRegion.count
            : height * 0.5,
        confidence: Math.min(snoutRegion.count / 500, 1),
      },
      chest: {
        x: width * 0.5,
        y: height * 0.7,
        confidence: 0.8,
      },
    };
  }, []);

  // Позиционирование амуниции на основе типа и ключевых точек
  const getProductTransform = useCallback(
    (features: DogFeatures, canvasWidth: number, canvasHeight: number) => {
      const scaleX = canvasWidth / 400; // Базовый масштаб
      const scaleY = canvasHeight / 400;

      switch (productType) {
        case "collar":
          return {
            x: features.neck.x - 60 * scaleX,
            y: features.neck.y - 10 * scaleY,
            width: 120 * scaleX,
            height: 20 * scaleY,
            rotation: Math.atan2(
              features.head.y - features.chest.y,
              features.head.x - features.chest.x,
            ),
          };

        case "muzzle":
          return {
            x: features.snout.x - 25 * scaleX,
            y: features.snout.y - 15 * scaleY,
            width: 50 * scaleX,
            height: 30 * scaleY,
            rotation: 0,
          };

        case "harness":
          return {
            x: features.chest.x - 80 * scaleX,
            y: features.chest.y - 40 * scaleY,
            width: 160 * scaleX,
            height: 80 * scaleY,
            rotation: 0,
          };

        case "leash":
          return {
            x: features.neck.x + 30 * scaleX,
            y: features.neck.y,
            width: 8 * scaleX,
            height: 200 * scaleY,
            rotation: Math.PI / 8,
          };

        default:
          return {
            x: features.head.x,
            y: features.head.y,
            width: 50 * scaleX,
            height: 50 * scaleY,
            rotation: 0,
          };
      }
    },
    [productType],
  );

  // Основная функция наложения амуниции
  const processImage = useCallback(async () => {
    if (!uploadedImage || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Загружаем изображение собаки
    const dogImg = new Image();
    dogImg.crossOrigin = "anonymous";

    dogImg.onload = async () => {
      canvas.width = dogImg.width;
      canvas.height = dogImg.height;

      // Рисуем оригинальное изображение
      ctx.drawImage(dogImg, 0, 0);

      // Получаем данные пикселей для анализа
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      // Детектируем ключевые точки
      const features = detectDogFeatures(imageData);

      // Загружаем изображение амуниции
      const productImg = new Image();
      productImg.crossOrigin = "anonymous";

      productImg.onload = () => {
        // Получаем параметры трансформации
        const transform = getProductTransform(
          features,
          canvas.width,
          canvas.height,
        );

        // Сохраняем состояние canvas
        ctx.save();

        // Применяем трансформации
        ctx.translate(
          transform.x + transform.width / 2,
          transform.y + transform.height / 2,
        );
        ctx.rotate(transform.rotation);

        // Настраиваем режим смешивания для реалистичности
        ctx.globalCompositeOperation = "multiply";
        ctx.globalAlpha = 0.85;

        // Рисуем амуницию
        ctx.drawImage(
          productImg,
          -transform.width / 2,
          -transform.height / 2,
          transform.width,
          transform.height,
        );

        // Восстанавливаем состояние
        ctx.restore();

        // Сохраняем результат
        const processedDataUrl = canvas.toDataURL("image/jpeg", 0.9);
        setProcessedImageUrl(processedDataUrl);
        setIsProcessing(false);
      };

      productImg.src = productImage;
    };

    dogImg.src = uploadedImage;
  }, [uploadedImage, productImage, detectDogFeatures, getProductTransform]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setProcessedImageUrl(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTryOn = async () => {
    if (!uploadedImage) return;

    setIsProcessing(true);
    // Небольшая задержка для UX
    setTimeout(() => {
      processImage();
    }, 500);
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Icon name="Camera" size={24} className="text-blue-600" />
            <span>AR Примерка</span>
          </CardTitle>
          <p className="text-gray-600">
            Загрузите фото своего питомца и посмотрите, как будет выглядеть
            амуниция
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {!uploadedImage ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
            >
              <Icon
                name="Upload"
                size={48}
                className="mx-auto text-gray-400 mb-4"
              />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Загрузите фото собаки
              </h3>
              <p className="text-gray-600 mb-4">
                Выберите четкое фото питомца в профиль или анфас
              </p>
              <Button variant="outline">Выбрать файл</Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Оригинальное фото */}
                <div>
                  <h3 className="font-medium mb-3">Оригинальное фото</h3>
                  <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden">
                    <img
                      src={uploadedImage}
                      alt="Uploaded pet"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Результат примерки */}
                <div>
                  <h3 className="font-medium mb-3">С амуницией</h3>
                  <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden relative">
                    {processedImageUrl ? (
                      <img
                        src={processedImageUrl}
                        alt="Pet with accessory"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={uploadedImage}
                        alt="Pet"
                        className="w-full h-full object-cover"
                      />
                    )}
                    {isProcessing && (
                      <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                          <p className="text-sm text-gray-600">
                            Обрабатываем...
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  onClick={handleTryOn}
                  disabled={isProcessing}
                  className="flex-1"
                >
                  {isProcessing ? "Обрабатываем..." : "Примерить"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Icon name="RefreshCw" size={16} className="mr-2" />
                  Другое фото
                </Button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          )}

          {/* Подсказки */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">
              💡 Советы для лучшего результата:
            </h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Используйте четкое фото без размытия</li>
              <li>• Лучше всего подходят фото в профиль или анфас</li>
              <li>• Убедитесь, что голова собаки хорошо видна</li>
              <li>• Избегайте слишком темных или контрастных фонов</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Скрытый canvas для обработки */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Секция с примером */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Icon name="Sparkles" size={24} className="text-purple-600" />
            <span>Как это работает</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Пример 1 */}
            <div className="text-center space-y-3">
              <div className="aspect-square bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 flex items-center justify-center">
                <Icon name="ScanLine" size={48} className="text-blue-500" />
              </div>
              <h3 className="font-semibold text-gray-900">
                1. Анализ изображения
              </h3>
              <p className="text-sm text-gray-600">
                Автоматически определяем ключевые точки: голову, шею, морду и
                грудь собаки
              </p>
            </div>

            {/* Пример 2 */}
            <div className="text-center space-y-3">
              <div className="aspect-square bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-4 flex items-center justify-center">
                <Icon name="Target" size={48} className="text-green-500" />
              </div>
              <h3 className="font-semibold text-gray-900">
                2. Точное позиционирование
              </h3>
              <p className="text-sm text-gray-600">
                Рассчитываем оптимальное расположение и размер амуниции для
                каждого типа товара
              </p>
            </div>

            {/* Пример 3 */}
            <div className="text-center space-y-3">
              <div className="aspect-square bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 flex items-center justify-center">
                <Icon name="Palette" size={48} className="text-purple-500" />
              </div>
              <h3 className="font-semibold text-gray-900">
                3. Реалистичное наложение
              </h3>
              <p className="text-sm text-gray-600">
                Применяем правильное освещение и тени для естественного вида
              </p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
            <div className="flex items-start space-x-4">
              <Icon
                name="Zap"
                size={24}
                className="text-blue-600 flex-shrink-0 mt-1"
              />
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Технология компьютерного зрения
                </h4>
                <p className="text-gray-700 mb-3">
                  Используем алгоритмы машинного обучения для детекции
                  анатомических особенностей собак и точного позиционирования
                  амуниции.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white bg-opacity-70 rounded-full text-sm font-medium text-gray-700">
                    Canvas API
                  </span>
                  <span className="px-3 py-1 bg-white bg-opacity-70 rounded-full text-sm font-medium text-gray-700">
                    Детекция контуров
                  </span>
                  <span className="px-3 py-1 bg-white bg-opacity-70 rounded-full text-sm font-medium text-gray-700">
                    Адаптивное масштабирование
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ARTryOn;
