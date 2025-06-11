import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface ARTryOnProps {
  productImage: string;
  productTitle: string;
  productType: "collar" | "muzzle" | "harness" | "leash";
}

const ARTryOn = ({ productImage, productTitle, productType }: ARTryOnProps) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setShowResult(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTryOn = async () => {
    if (!uploadedImage) return;

    setIsProcessing(true);
    // Симуляция обработки AR
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setShowResult(true);
  };

  const getProductPosition = () => {
    switch (productType) {
      case "collar":
        return {
          top: "25%",
          left: "35%",
          width: "30%",
          transform: "rotate(-5deg)",
        };
      case "muzzle":
        return {
          top: "45%",
          left: "42%",
          width: "16%",
          transform: "rotate(0deg)",
        };
      case "harness":
        return {
          top: "35%",
          left: "30%",
          width: "40%",
          transform: "rotate(-2deg)",
        };
      case "leash":
        return {
          top: "20%",
          left: "55%",
          width: "8%",
          height: "60%",
          transform: "rotate(15deg)",
        };
      default:
        return { top: "30%", left: "40%", width: "20%" };
    }
  };

  return (
    <Card className="mt-8">
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
                  <img
                    src={uploadedImage}
                    alt="Pet with accessory"
                    className="w-full h-full object-cover"
                  />
                  {showResult && (
                    <div
                      className="absolute opacity-90"
                      style={getProductPosition()}
                    >
                      <img
                        src={productImage}
                        alt={productTitle}
                        className="w-full h-full object-contain"
                        style={{ mixBlendMode: "multiply" }}
                      />
                    </div>
                  )}
                  {isProcessing && (
                    <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                        <p className="text-sm text-gray-600">Обрабатываем...</p>
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
  );
};

export default ARTryOn;
