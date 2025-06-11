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
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // URL изображения намордника для наложения
  const muzzleImageUrl = "https://cdn.poehali.dev/files/b3a17e93-cc80-49e1-baa3-aed95ad824b1.png";

  // Упрощенный алгоритм детекции морды собаки
  const detectMuzzlePosition = useCallback((canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return { x: canvas.width * 0.5, y: canvas.height * 0.4, width: 120, height: 80 };

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const { data, width, height } = imageData;

    // Поиск области с наибольшим контрастом в центральной части (предполагаемая морда)
    let maxContrast = 0;
    let bestX = width * 0.5;
    let bestY = height * 0.4;

    // Сканируем центральную область изображения
    for (let y = height * 0.2; y < height * 0.7; y += 5) {
      for (let x = width * 0.2; x < width * 0.8; x += 5) {
        let contrast = 0;
        let pixelCount = 0;

        // Анализируем небольшую область вокруг точки
        for (let dy = -10; dy <= 10; dy += 2) {
          for (let dx = -10; dx <= 10; dx += 2) {
            const ny = y + dy;
            const nx = x + dx;
            if (ny >= 0 && ny < height && nx >= 0 && nx < width) {
              const idx = (ny * width + nx) * 4;
              const brightness = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
              contrast += Math.abs(brightness - 128);
              pixelCount++;
            }
          }
        }

        if (pixelCount > 0) {
          contrast /= pixelCount;
          if (contrast > maxContrast) {
            maxContrast = contrast;
            bestX = x;
            bestY = y;
          }
        }
      }
    }

    // Вычисляем размер намордника пропорционально размеру изображения
    const scale = Math.min(width, height) / 400;
    const muzzleWidth = 120 * scale;
    const muzzleHeight = 80 * scale;

    return {
      x: bestX - muzzleWidth / 2,
      y: bestY - muzzleHeight / 2,
      width: muzzleWidth,
      height: muzzleHeight
    };
  }, []);

  // Функция наложения намордника на фото собаки
  const overlayMuzzle = useCallback(async (dogImageSrc: string) => {
    if (!canvasRef.current) return null;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    return new Promise<string>((resolve) => {
      const dogImg = new Image();
      dogImg.crossOrigin = "anonymous";
      
      dogImg.onload = () => {
        canvas.width = dogImg.width;
        canvas.height = dogImg.height;

        // Рисуем оригинальное изображение собаки
        ctx.drawImage(dogImg, 0, 0);

        // Детектируем позицию для намордника
        const muzzlePos = detectMuzzlePosition(canvas);

        // Загружаем и накладываем намордник
        const muzzleImg = new Image();
        muzzleImg.crossOrigin = "anonymous";
        
        muzzleImg.onload = () => {
          // Настраиваем режим смешивания для реалистичности
          ctx.save();
          ctx.globalCompositeOperation = "multiply";
          ctx.globalAlpha = 0.9;

          // Рисуем намордник
          ctx.drawImage(
            muzzleImg,
            muzzlePos.x,
            muzzlePos.y,
            muzzlePos.width,
            muzzlePos.height
          );

          ctx.restore();

          // Возвращаем результат
          const result = canvas.toDataURL("image/jpeg", 0.9);
          resolve(result);
        };

        muzzleImg.src = muzzleImageUrl;
      };

      dogImg.src = dogImageSrc;
    });
  }, [muzzleImageUrl, detectMuzzlePosition]);

  // Обработка изображения
  const processImage = useCallback(async () => {
    if (!uploadedImage) return;

    setIsProcessing(true);
    
    try {
      const result = await overlayMuzzle(uploadedImage);
      if (result) {
        setProcessedImageUrl(result);
      }
    } catch (error) {
      console.error("Ошибка обработки изображения:", error);
    } finally {
      setIsProcessing(false);
    }
  }, [uploadedImage, overlayMuzzle]);
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
    await processImage();
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

      {/* Демонстрационный пример */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Icon name="Eye" size={24} className="text-green-600" />
            <span>Пример результата</span>
          </CardTitle>
          <p className="text-gray-600">
            Посмотрите, как работает наложение намордника на фото собаки
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Оригинальное фото собаки */}
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">До</h3>
              <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden">
                <img
                  src="https://cdn.poehali.dev/files/718c712a-b054-4b0b-a2f9-007c59f260e2.png"
                  alt="Собака без намордника"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-gray-600">
                Оригинальное фото собаки
              </p>
            </div>

            {/* Результат с намордником */}
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">После</h3>
              <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden">
                <DemoResult />
              </div>
              <p className="text-sm text-gray-600">
                С наложенным намордником
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="CheckCircle" size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-green-900 mb-1">
                  Точное позиционирование
                </h4>
                <p className="text-sm text-green-700">
                  Алгоритм автоматически определяет оптимальное место для размещения намордника на морде собаки
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Скрытый canvas для обработки */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default ARTryOn;
