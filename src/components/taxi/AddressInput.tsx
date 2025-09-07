import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface AddressInputProps {
  label: string;
  value: string;
  onChange: (address: string, coordinates?: [number, number]) => void;
  placeholder: string;
  icon: 'green' | 'red' | 'yellow';
  city: 'dzerzhinsk' | 'nizhny';
  onRemove?: () => void;
  showRemoveButton?: boolean;
}

declare global {
  interface Window {
    ymaps: any;
  }
}

const AddressInput: React.FC<AddressInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  icon,
  city,
  onRemove,
  showRemoveButton = false
}) => {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const iconColors = {
    green: 'text-green-500',
    red: 'text-red-500',
    yellow: 'text-yellow-500'
  };

  const cityNames = {
    dzerzhinsk: 'Дзержинск',
    nizhny: 'Нижний Новгород'
  };

  // Поиск адресов через API Яндекс.Карт
  const searchAddresses = async (query: string) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    if (!window.ymaps) {
      return;
    }

    setIsLoading(true);
    try {
      const fullQuery = `${query}, ${cityNames[city]}`;
      const suggest = window.ymaps.suggest(fullQuery);
      const results = await suggest;
      
      // Фильтруем только адреса в нужном городе
      const filteredResults = results.filter((item: any) => 
        item.displayName.includes(cityNames[city])
      ).slice(0, 5);

      setSuggestions(filteredResults);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Ошибка поиска адреса:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Получение координат по адресу
  const getCoordinatesFromAddress = async (address: string): Promise<[number, number] | null> => {
    if (!window.ymaps) return null;

    try {
      const fullAddress = address.includes(cityNames[city]) ? address : `${address}, ${cityNames[city]}`;
      const geocoder = window.ymaps.geocode(fullAddress);
      const result = await geocoder;
      const firstGeoObject = result.geoObjects.get(0);
      
      if (firstGeoObject) {
        return firstGeoObject.geometry.getCoordinates();
      }
    } catch (error) {
      console.error('Ошибка геокодирования:', error);
    }
    
    return null;
  };

  // Обработчик изменения текста
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    
    if (newValue.trim()) {
      searchAddresses(newValue);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Выбор адреса из подсказок
  const selectAddress = async (selectedAddress: string) => {
    onChange(selectedAddress);
    setSuggestions([]);
    setShowSuggestions(false);
    
    // Получаем координаты для выбранного адреса
    const coordinates = await getCoordinatesFromAddress(selectedAddress);
    if (coordinates) {
      onChange(selectedAddress, coordinates);
    }
  };

  // Обработчик потери фокуса
  const handleBlur = () => {
    // Небольшая задержка, чтобы успел сработать клик по подсказке
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  // Обработчик фокуса
  const handleFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  // Обработчик нажатия клавиш
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  // Инициализация Яндекс.Карт при первом рендере
  useEffect(() => {
    if (!window.ymaps) {
      const script = document.createElement('script');
      script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className="space-y-2 relative">
      <Label>{label}</Label>
      <div className="relative">
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <Icon name="MapPin" className={`absolute left-3 top-3 ${iconColors[icon]}`} size={16} />
            <Input
              ref={inputRef}
              value={value}
              onChange={handleInputChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="pl-10"
            />
            {isLoading && (
              <Icon name="Loader2" className="absolute right-3 top-3 animate-spin text-gray-400" size={16} />
            )}
          </div>
          
          {showRemoveButton && onRemove && (
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={onRemove}
            >
              <Icon name="X" size={16} />
            </Button>
          )}
        </div>

        {/* Подсказки */}
        {showSuggestions && suggestions.length > 0 && (
          <div 
            ref={suggestionsRef}
            className="absolute z-50 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto mt-1"
          >
            {suggestions.map((item, index) => (
              <button
                key={index}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                onClick={() => selectAddress(item.displayName)}
                type="button"
              >
                <div className="flex items-center space-x-2">
                  <Icon name="MapPin" className={`${iconColors[icon]} flex-shrink-0`} size={14} />
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {item.displayName.split(',')[0]}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {item.displayName}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Показываем выбранный город */}
      {value && (
        <div className="text-xs text-gray-500 flex items-center space-x-1">
          <Icon name="MapPin" className="text-gray-400" size={12} />
          <span>{cityNames[city]}</span>
        </div>
      )}
    </div>
  );
};

export default AddressInput;