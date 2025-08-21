import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface AppDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppDownloadModal = ({ isOpen, onClose }: AppDownloadModalProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleDownload = () => {
    window.open("/about", "_blank");
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isVisible ? "opacity-50" : "opacity-0"
        }`}
        onClick={handleClose}
      />
      
      <Card 
        className={`relative mx-4 w-full max-w-md shadow-2xl transform transition-all duration-300 ${
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <CardHeader className="text-center pb-3">
          <div className="mx-auto mb-4 p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-fit">
            <Icon name="Smartphone" className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-xl font-bold text-gray-900">
            Установите наше приложение
          </CardTitle>
          <p className="text-gray-600 text-sm">
            Получите лучший опыт покупок и продаж с нашим мобильным приложением
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-full">
                <Icon name="Zap" className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-sm text-gray-700">Быстрый доступ к объявлениям</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <Icon name="Bell" className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm text-gray-700">Push-уведомления о новых сообщениях</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-full">
                <Icon name="Camera" className="w-4 h-4 text-purple-600" />
              </div>
              <span className="text-sm text-gray-700">Удобная загрузка фотографий</span>
            </div>
          </div>
          
          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={handleClose}
              className="flex-1"
            >
              Позже
            </Button>
            <Button
              onClick={handleDownload}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              <Icon name="Download" className="w-4 h-4 mr-2" />
              Скачать
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};