import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

declare global {
  interface Window {
    ymaps: any;
  }
}

interface MapPoint {
  address: string;
  coordinates: [number, number];
}

interface YandexMapProps {
  onPointsChange: (from: MapPoint, to: MapPoint, waypoints: MapPoint[]) => void;
  onDistanceChange: (distance: number) => void;
  city: 'dzerzhinsk' | 'nizhny';
}

const YandexMap: React.FC<YandexMapProps> = ({ onPointsChange, onDistanceChange, city }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [fromAddress, setFromAddress] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [waypoints, setWaypoints] = useState<string[]>(['']);
  const [fromCoords, setFromCoords] = useState<[number, number] | null>(null);
  const [toCoords, setToCoords] = useState<[number, number] | null>(null);
  const [waypointCoords, setWaypointCoords] = useState<[number, number][]>([]);
  const [suggestions, setSuggestions] = useState<{ [key: string]: any[] }>({});
  const [activeSuggestion, setActiveSuggestion] = useState<string | null>(null);
  const [route, setRoute] = useState<any>(null);

  const cityCoords: { [key: string]: [number, number] } = {
    dzerzhinsk: [56.2431, 43.8346],
    nizhny: [56.2965, 44.0048]
  };

  // Инициализация Яндекс.Карт
  useEffect(() => {
    if (!window.ymaps) {
      const script = document.createElement('script');
      script.src = 'https://api-maps.yandex.ru/2.1/?apikey=YOUR_API_KEY&lang=ru_RU';
      script.async = true;
      script.onload = () => {
        window.ymaps.ready(initMap);
      };
      document.head.appendChild(script);
    } else {
      window.ymaps.ready(initMap);
    }
  }, []);

  const initMap = () => {
    if (!mapRef.current) return;

    const mapInstance = new window.ymaps.Map(mapRef.current, {
      center: cityCoords[city],
      zoom: 12,
      controls: ['zoomControl', 'fullscreenControl']
    });

    // Добавляем поведения карты
    mapInstance.behaviors.enable(['drag', 'scrollZoom']);

    // Обработчик клика по карте
    mapInstance.events.add('click', (e: any) => {
      const coords = e.get('coords') as [number, number];
      handleMapClick(coords);
    });

    setMap(mapInstance);
    setIsMapLoaded(true);
  };

  // Обработчик клика по карте
  const handleMapClick = async (coords: [number, number]) => {
    if (!fromCoords) {
      setFromCoords(coords);
      const address = await getAddressFromCoords(coords);
      setFromAddress(address);
      addPlacemark(coords, 'Откуда', 'islands#greenIcon');
    } else if (!toCoords) {
      setToCoords(coords);
      const address = await getAddressFromCoords(coords);
      setToAddress(address);
      addPlacemark(coords, 'Куда', 'islands#redIcon');
      buildRoute();
    }
  };

  // Получение адреса по координатам
  const getAddressFromCoords = async (coords: [number, number]): Promise<string> => {
    try {
      const geocoder = window.ymaps.geocode(coords);
      const result = await geocoder;
      const firstGeoObject = result.geoObjects.get(0);
      return firstGeoObject.getAddressLine();
    } catch (error) {
      console.error('Ошибка геокодирования:', error);
      return 'Неизвестный адрес';
    }
  };

  // Получение координат по адресу
  const getCoordsFromAddress = async (address: string): Promise<[number, number] | null> => {
    try {
      const geocoder = window.ymaps.geocode(address + `, ${city === 'dzerzhinsk' ? 'Дзержинск' : 'Нижний Новгород'}`);
      const result = await geocoder;
      const firstGeoObject = result.geoObjects.get(0);
      if (firstGeoObject) {
        return firstGeoObject.geometry.getCoordinates();
      }
      return null;
    } catch (error) {
      console.error('Ошибка геокодирования адреса:', error);
      return null;
    }
  };

  // Добавление метки на карту
  const addPlacemark = (coords: [number, number], hint: string, preset: string) => {
    if (!map) return;

    const placemark = new window.ymaps.Placemark(coords, {
      hintContent: hint
    }, {
      preset: preset,
      draggable: true
    });

    // Обработчик перетаскивания метки
    placemark.events.add('dragend', async (e: any) => {
      const newCoords = e.get('target').geometry.getCoordinates();
      const newAddress = await getAddressFromCoords(newCoords);
      
      if (preset === 'islands#greenIcon') {
        setFromCoords(newCoords);
        setFromAddress(newAddress);
      } else if (preset === 'islands#redIcon') {
        setToCoords(newCoords);
        setToAddress(newAddress);
      }
      
      buildRoute();
    });

    map.geoObjects.add(placemark);
  };

  // Построение маршрута
  const buildRoute = async () => {
    if (!map || !fromCoords || !toCoords) return;

    try {
      // Удаляем предыдущий маршрут
      if (route) {
        map.geoObjects.remove(route);
      }

      const waypoints = [fromCoords, ...waypointCoords, toCoords];
      
      const multiRoute = new window.ymaps.multiRouter.MultiRoute({
        referencePoints: waypoints,
        params: {
          routingMode: 'auto'
        }
      }, {
        boundsAutoApply: true,
        routeActiveStrokeWidth: 6,
        routeActiveStrokeColor: '#ffb800'
      });

      // Обработчик успешного построения маршрута
      multiRoute.model.events.add('requestsuccess', () => {
        const routes = multiRoute.getRoutes();
        if (routes.length > 0) {
          const distance = routes.get(0).properties.get('distance');
          const distanceKm = Math.round((distance / 1000) * 100) / 100;
          onDistanceChange(distanceKm);
        }
      });

      map.geoObjects.add(multiRoute);
      setRoute(multiRoute);

      // Вызываем callback с точками
      if (fromCoords && toCoords) {
        const waypointObjects = waypointCoords.map((coords, index) => ({
          address: waypoints[index] || `Точка ${index + 1}`,
          coordinates: coords
        }));

        onPointsChange(
          { address: fromAddress, coordinates: fromCoords },
          { address: toAddress, coordinates: toCoords },
          waypointObjects
        );
      }
    } catch (error) {
      console.error('Ошибка построения маршрута:', error);
    }
  };

  // Поиск адресов с подсказками
  const searchAddress = async (query: string, field: string) => {
    if (query.length < 3) {
      setSuggestions(prev => ({ ...prev, [field]: [] }));
      return;
    }

    try {
      const suggest = window.ymaps.suggest(query + `, ${city === 'dzerzhinsk' ? 'Дзержинск' : 'Нижний Новгород'}`);
      const results = await suggest;
      setSuggestions(prev => ({ ...prev, [field]: results.slice(0, 5) }));
    } catch (error) {
      console.error('Ошибка поиска адреса:', error);
      setSuggestions(prev => ({ ...prev, [field]: [] }));
    }
  };

  // Выбор адреса из подсказок
  const selectAddress = async (address: string, field: string) => {
    const coords = await getCoordsFromAddress(address);
    if (!coords) return;

    if (field === 'from') {
      setFromAddress(address);
      setFromCoords(coords);
      map?.geoObjects.removeAll();
      addPlacemark(coords, 'Откуда', 'islands#greenIcon');
    } else if (field === 'to') {
      setToAddress(address);
      setToCoords(coords);
      addPlacemark(coords, 'Куда', 'islands#redIcon');
    }

    setSuggestions(prev => ({ ...prev, [field]: [] }));
    setActiveSuggestion(null);

    if (fromCoords && toCoords) {
      buildRoute();
    }
  };

  // Добавление промежуточной точки
  const addWaypoint = () => {
    setWaypoints(prev => [...prev, '']);
  };

  // Удаление промежуточной точки
  const removeWaypoint = (index: number) => {
    setWaypoints(prev => prev.filter((_, i) => i !== index));
    setWaypointCoords(prev => prev.filter((_, i) => i !== index));
  };

  // Очистка карты
  const clearMap = () => {
    if (map) {
      map.geoObjects.removeAll();
    }
    setFromAddress('');
    setToAddress('');
    setWaypoints(['']);
    setFromCoords(null);
    setToCoords(null);
    setWaypointCoords([]);
    setRoute(null);
    setSuggestions({});
  };

  return (
    <div className="space-y-6">
      {/* Карта */}
      <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-0">
          <div
            ref={mapRef}
            className="w-full h-96 bg-gray-100 flex items-center justify-center"
          >
            {!isMapLoaded && (
              <div className="text-center">
                <Icon name="Loader2" className="animate-spin mx-auto mb-4 text-gray-400" size={32} />
                <p className="text-gray-500">Загрузка карты...</p>
              </div>
            )}
          </div>
          
          {isMapLoaded && (
            <div className="p-4 bg-blue-50 border-t">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <Badge variant="outline">
                    <Icon name="MapPin" className="mr-1 text-green-500" size={14} />
                    Откуда: клик по карте
                  </Badge>
                  <Badge variant="outline">
                    <Icon name="MapPin" className="mr-1 text-red-500" size={14} />
                    Куда: второй клик
                  </Badge>
                </div>
                <Button size="sm" variant="outline" onClick={clearMap}>
                  <Icon name="RotateCcw" className="mr-1" size={14} />
                  Очистить
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Ручной ввод адресов */}
      <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Edit3" className="text-blue-500" size={20} />
            <h3 className="text-lg font-semibold">Ручной ввод адресов</h3>
          </div>

          {/* Откуда */}
          <div className="space-y-2 relative">
            <Label>Откуда</Label>
            <div className="relative">
              <Icon name="MapPin" className="absolute left-3 top-3 text-green-500" size={16} />
              <Input
                value={fromAddress}
                onChange={(e) => {
                  setFromAddress(e.target.value);
                  searchAddress(e.target.value, 'from');
                  setActiveSuggestion('from');
                }}
                placeholder="Введите адрес отправления"
                className="pl-10"
              />
            </div>
            
            {suggestions.from && suggestions.from.length > 0 && activeSuggestion === 'from' && (
              <div className="absolute z-50 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                {suggestions.from.map((item, index) => (
                  <button
                    key={index}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                    onClick={() => selectAddress(item.displayName, 'from')}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon name="MapPin" className="text-green-500 flex-shrink-0" size={14} />
                      <span className="text-sm">{item.displayName}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Промежуточные точки */}
          {waypoints.map((waypoint, index) => (
            <div key={index} className="space-y-2 relative">
              <Label>Промежуточная точка {index + 1}</Label>
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <Icon name="MapPin" className="absolute left-3 top-3 text-yellow-500" size={16} />
                  <Input
                    value={waypoint}
                    onChange={(e) => {
                      const updated = [...waypoints];
                      updated[index] = e.target.value;
                      setWaypoints(updated);
                      searchAddress(e.target.value, `waypoint-${index}`);
                      setActiveSuggestion(`waypoint-${index}`);
                    }}
                    placeholder="Промежуточный адрес"
                    className="pl-10"
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeWaypoint(index)}
                >
                  <Icon name="X" size={16} />
                </Button>
              </div>

              {suggestions[`waypoint-${index}`] && suggestions[`waypoint-${index}`].length > 0 && activeSuggestion === `waypoint-${index}` && (
                <div className="absolute z-50 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  {suggestions[`waypoint-${index}`].map((item, suggIndex) => (
                    <button
                      key={suggIndex}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                      onClick={() => selectAddress(item.displayName, `waypoint-${index}`)}
                    >
                      <div className="flex items-center space-x-2">
                        <Icon name="MapPin" className="text-yellow-500 flex-shrink-0" size={14} />
                        <span className="text-sm">{item.displayName}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={addWaypoint}
            className="w-full border-dashed"
          >
            <Icon name="Plus" className="mr-2" size={16} />
            Добавить промежуточную точку
          </Button>

          {/* Куда */}
          <div className="space-y-2 relative">
            <Label>Куда</Label>
            <div className="relative">
              <Icon name="MapPin" className="absolute left-3 top-3 text-red-500" size={16} />
              <Input
                value={toAddress}
                onChange={(e) => {
                  setToAddress(e.target.value);
                  searchAddress(e.target.value, 'to');
                  setActiveSuggestion('to');
                }}
                placeholder="Введите адрес назначения"
                className="pl-10"
              />
            </div>

            {suggestions.to && suggestions.to.length > 0 && activeSuggestion === 'to' && (
              <div className="absolute z-50 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                {suggestions.to.map((item, index) => (
                  <button
                    key={index}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                    onClick={() => selectAddress(item.displayName, 'to')}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon name="MapPin" className="text-red-500 flex-shrink-0" size={14} />
                      <span className="text-sm">{item.displayName}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {fromCoords && toCoords && (
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" className="text-green-600" size={16} />
                <span className="text-sm font-medium text-green-800">
                  Маршрут построен успешно
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Скрыть подсказки при клике вне */}
      {activeSuggestion && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setSuggestions({});
            setActiveSuggestion(null);
          }}
        />
      )}
    </div>
  );
};

export default YandexMap;