import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
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

interface InteractiveMapProps {
  onPointsChange: (from: MapPoint, to: MapPoint, waypoints: MapPoint[]) => void;
  onDistanceChange: (distance: number) => void;
  city: 'dzerzhinsk' | 'nizhny';
  fromAddress?: string;
  toAddress?: string;
  waypointsAddresses?: string[];
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ 
  onPointsChange, 
  onDistanceChange, 
  city,
  fromAddress,
  toAddress,
  waypointsAddresses = []
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [fromPoint, setFromPoint] = useState<MapPoint | null>(null);
  const [toPoint, setToPoint] = useState<MapPoint | null>(null);
  const [waypoints, setWaypoints] = useState<MapPoint[]>([]);
  const [route, setRoute] = useState<any>(null);
  const [placemarks, setPlacemarks] = useState<any[]>([]);

  const cityCoords: { [key: string]: [number, number] } = {
    dzerzhinsk: [56.2431, 43.8346],
    nizhny: [56.2965, 44.0048]
  };

  // Инициализация карты
  const initMap = () => {
    if (!mapRef.current) return;

    const mapInstance = new window.ymaps.Map(mapRef.current, {
      center: cityCoords[city],
      zoom: 12,
      controls: ['zoomControl', 'fullscreenControl']
    });

    // Добавляем поведения карты для корректной работы на ПК
    mapInstance.behaviors.enable(['drag', 'scrollZoom', 'dblClickZoom']);

    // Обработчик клика по карте - работает и на ПК и на мобильном
    mapInstance.events.add('click', handleMapClick);

    setMap(mapInstance);
    setIsMapLoaded(true);
  };

  // Обработчик клика по карте
  const handleMapClick = async (e: any) => {
    const coords = e.get('coords') as [number, number];
    
    if (!fromPoint) {
      const address = await getAddressFromCoords(coords);
      const newFromPoint = { address, coordinates: coords };
      setFromPoint(newFromPoint);
      addPlacemark(coords, 'Откуда', 'islands#greenIcon');
    } else if (!toPoint) {
      const address = await getAddressFromCoords(coords);
      const newToPoint = { address, coordinates: coords };
      setToPoint(newToPoint);
      addPlacemark(coords, 'Куда', 'islands#redIcon');
      
      // Строим маршрут и уведомляем родительский компонент
      setTimeout(() => {
        buildRoute(newFromPoint, newToPoint, waypoints);
        onPointsChange(newFromPoint, newToPoint, waypoints);
      }, 100);
    } else {
      // Добавляем промежуточную точку
      const address = await getAddressFromCoords(coords);
      const newWaypoint = { address, coordinates: coords };
      const newWaypoints = [...waypoints, newWaypoint];
      setWaypoints(newWaypoints);
      addPlacemark(coords, `Точка ${newWaypoints.length}`, 'islands#yellowIcon');
      
      // Перестраиваем маршрут
      setTimeout(() => {
        buildRoute(fromPoint, toPoint, newWaypoints);
        onPointsChange(fromPoint, toPoint, newWaypoints);
      }, 100);
    }
  };

  // Получение адреса по координатам
  const getAddressFromCoords = async (coords: [number, number]): Promise<string> => {
    try {
      const geocoder = window.ymaps.geocode(coords);
      const result = await geocoder;
      const firstGeoObject = result.geoObjects.get(0);
      return firstGeoObject ? firstGeoObject.getAddressLine() : 'Неизвестный адрес';
    } catch (error) {
      console.error('Ошибка геокодирования:', error);
      return 'Неизвестный адрес';
    }
  };

  // Получение координат по адресу
  const getCoordsFromAddress = async (address: string): Promise<[number, number] | null> => {
    try {
      const cityName = city === 'dzerzhinsk' ? 'Дзержинск' : 'Нижний Новгород';
      const fullAddress = address.includes(cityName) ? address : `${address}, ${cityName}`;
      const geocoder = window.ymaps.geocode(fullAddress);
      const result = await geocoder;
      const firstGeoObject = result.geoObjects.get(0);
      return firstGeoObject ? firstGeoObject.geometry.getCoordinates() : null;
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

    // Обработчик перетаскивания
    placemark.events.add('dragend', async (e: any) => {
      const newCoords = e.get('target').geometry.getCoordinates();
      const newAddress = await getAddressFromCoords(newCoords);
      
      if (preset === 'islands#greenIcon') {
        const newFromPoint = { address: newAddress, coordinates: newCoords };
        setFromPoint(newFromPoint);
        if (toPoint) {
          buildRoute(newFromPoint, toPoint, waypoints);
          onPointsChange(newFromPoint, toPoint, waypoints);
        }
      } else if (preset === 'islands#redIcon') {
        const newToPoint = { address: newAddress, coordinates: newCoords };
        setToPoint(newToPoint);
        if (fromPoint) {
          buildRoute(fromPoint, newToPoint, waypoints);
          onPointsChange(fromPoint, newToPoint, waypoints);
        }
      }
    });

    map.geoObjects.add(placemark);
    setPlacemarks(prev => [...prev, placemark]);
  };

  // Построение маршрута
  const buildRoute = async (from: MapPoint, to: MapPoint, waypointsList: MapPoint[]) => {
    if (!map) return;

    try {
      // Удаляем предыдущий маршрут
      if (route) {
        map.geoObjects.remove(route);
      }

      const routePoints = [
        from.coordinates,
        ...waypointsList.map(wp => wp.coordinates),
        to.coordinates
      ];
      
      const multiRoute = new window.ymaps.multiRouter.MultiRoute({
        referencePoints: routePoints,
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
    } catch (error) {
      console.error('Ошибка построения маршрута:', error);
    }
  };

  // Очистка карты
  const clearMap = () => {
    if (!map) return;

    // Удаляем все объекты с карты
    map.geoObjects.removeAll();
    
    // Сбрасываем состояние
    setFromPoint(null);
    setToPoint(null);
    setWaypoints([]);
    setRoute(null);
    setPlacemarks([]);
  };

  // Инициализация при загрузке адресов извне
  useEffect(() => {
    if (!map || !isMapLoaded) return;

    const initializeFromAddresses = async () => {
      let newFromPoint = null;
      let newToPoint = null;
      let newWaypoints: MapPoint[] = [];

      // Обрабатываем адрес отправления
      if (fromAddress && fromAddress.trim()) {
        const coords = await getCoordsFromAddress(fromAddress);
        if (coords) {
          newFromPoint = { address: fromAddress, coordinates: coords };
          setFromPoint(newFromPoint);
          addPlacemark(coords, 'Откуда', 'islands#greenIcon');
        }
      }

      // Обрабатываем адрес назначения
      if (toAddress && toAddress.trim()) {
        const coords = await getCoordsFromAddress(toAddress);
        if (coords) {
          newToPoint = { address: toAddress, coordinates: coords };
          setToPoint(newToPoint);
          addPlacemark(coords, 'Куда', 'islands#redIcon');
        }
      }

      // Обрабатываем промежуточные точки
      for (let i = 0; i < waypointsAddresses.length; i++) {
        const address = waypointsAddresses[i];
        if (address && address.trim()) {
          const coords = await getCoordsFromAddress(address);
          if (coords) {
            const waypoint = { address, coordinates: coords };
            newWaypoints.push(waypoint);
            addPlacemark(coords, `Точка ${i + 1}`, 'islands#yellowIcon');
          }
        }
      }

      setWaypoints(newWaypoints);

      // Строим маршрут если есть начальная и конечная точки
      if (newFromPoint && newToPoint) {
        buildRoute(newFromPoint, newToPoint, newWaypoints);
        onPointsChange(newFromPoint, newToPoint, newWaypoints);
      }
    };

    initializeFromAddresses();
  }, [fromAddress, toAddress, waypointsAddresses, map, isMapLoaded]);

  // Инициализация Яндекс.Карт
  useEffect(() => {
    if (!window.ymaps) {
      const script = document.createElement('script');
      script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
      script.async = true;
      script.onload = () => {
        window.ymaps.ready(initMap);
      };
      document.head.appendChild(script);
    } else {
      window.ymaps.ready(initMap);
    }
  }, []);

  return (
    <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm overflow-hidden">
      <CardContent className="p-0">
        <div
          ref={mapRef}
          className="w-full h-96 bg-gray-100 flex items-center justify-center cursor-pointer"
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
                  Откуда: {fromPoint ? '✓' : 'клик по карте'}
                </Badge>
                <Badge variant="outline">
                  <Icon name="MapPin" className="mr-1 text-red-500" size={14} />
                  Куда: {toPoint ? '✓' : 'второй клик'}
                </Badge>
                {waypoints.length > 0 && (
                  <Badge variant="outline">
                    <Icon name="MapPin" className="mr-1 text-yellow-500" size={14} />
                    Точки: {waypoints.length}
                  </Badge>
                )}
              </div>
              <Button size="sm" variant="outline" onClick={clearMap}>
                <Icon name="RotateCcw" className="mr-1" size={14} />
                Очистить
              </Button>
            </div>
            
            <div className="mt-2 text-xs text-gray-600">
              💡 Кликните по карте для выбора точек маршрута. Метки можно перетаскивать.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InteractiveMap;