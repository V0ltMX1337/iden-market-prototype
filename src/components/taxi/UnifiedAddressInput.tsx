import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

interface UnifiedAddressInputProps {
  onPointsChange: (from: MapPoint, to: MapPoint, waypoints: MapPoint[]) => void;
  onDistanceChange: (distance: number) => void;
  city: 'dzerzhinsk' | 'nizhny';
}

const UnifiedAddressInput: React.FC<UnifiedAddressInputProps> = ({
  onPointsChange,
  onDistanceChange,
  city
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<'map' | 'manual'>('map');

  // State for addresses
  const [fromAddress, setFromAddress] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [waypoints, setWaypoints] = useState<string[]>(['']);

  // State for map points
  const [fromPoint, setFromPoint] = useState<MapPoint | null>(null);
  const [toPoint, setToPoint] = useState<MapPoint | null>(null);
  const [waypointPoints, setWaypointPoints] = useState<MapPoint[]>([]);

  // State for suggestions
  const [suggestions, setSuggestions] = useState<{ [key: string]: any[] }>({});
  const [activeSuggestion, setActiveSuggestion] = useState<string | null>(null);

  // State for map
  const [route, setRoute] = useState<any>(null);
  const [placemarks, setPlacemarks] = useState<any[]>([]);

  const cityCoords: { [key: string]: [number, number] } = {
    dzerzhinsk: [56.2431, 43.8346],
    nizhny: [56.2965, 44.0048]
  };

  const cityNames = {
    dzerzhinsk: 'Дзержинск',
    nizhny: 'Нижний Новгород'
  };

  // Initialize Yandex Maps
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

  // Update map center when city changes
  useEffect(() => {
    if (map && isMapLoaded) {
      map.setCenter(cityCoords[city], 12);
      clearAll();
    }
  }, [city, map, isMapLoaded]);

  const initMap = () => {
    if (!mapRef.current) return;

    const mapInstance = new window.ymaps.Map(mapRef.current, {
      center: cityCoords[city],
      zoom: 12,
      controls: ['zoomControl', 'fullscreenControl']
    });

    mapInstance.behaviors.enable(['drag', 'scrollZoom', 'dblClickZoom']);
    mapInstance.events.add('click', handleMapClick);

    setMap(mapInstance);
    setIsMapLoaded(true);
  };

  const handleMapClick = async (e: any) => {
    const coords = e.get('coords') as [number, number];
    
    if (!fromPoint) {
      const address = await getAddressFromCoords(coords);
      const newFromPoint = { address, coordinates: coords };
      setFromPoint(newFromPoint);
      setFromAddress(address);
      addPlacemark(coords, 'Откуда', 'islands#greenIcon');
    } else if (!toPoint) {
      const address = await getAddressFromCoords(coords);
      const newToPoint = { address, coordinates: coords };
      setToPoint(newToPoint);
      setToAddress(address);
      addPlacemark(coords, 'Куда', 'islands#redIcon');
      
      setTimeout(() => {
        buildRoute(newFromPoint, newToPoint, waypointPoints);
      }, 100);
    } else {
      // Add waypoint
      const address = await getAddressFromCoords(coords);
      const newWaypoint = { address, coordinates: coords };
      const newWaypoints = [...waypointPoints, newWaypoint];
      setWaypointPoints(newWaypoints);
      setWaypoints(prev => [...prev.slice(0, -1), address, '']);
      addPlacemark(coords, `Точка ${newWaypoints.length}`, 'islands#yellowIcon');
      
      setTimeout(() => {
        buildRoute(fromPoint, toPoint, newWaypoints);
      }, 100);
    }
  };

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

  const getCoordsFromAddress = async (address: string): Promise<[number, number] | null> => {
    try {
      const fullAddress = address.includes(cityNames[city]) ? address : `${address}, ${cityNames[city]}`;
      const geocoder = window.ymaps.geocode(fullAddress);
      const result = await geocoder;
      const firstGeoObject = result.geoObjects.get(0);
      return firstGeoObject ? firstGeoObject.geometry.getCoordinates() : null;
    } catch (error) {
      console.error('Ошибка геокодирования адреса:', error);
      return null;
    }
  };

  const addPlacemark = (coords: [number, number], hint: string, preset: string) => {
    if (!map) return;

    const placemark = new window.ymaps.Placemark(coords, {
      hintContent: hint
    }, {
      preset: preset,
      draggable: true
    });

    placemark.events.add('dragend', async (e: any) => {
      const newCoords = e.get('target').geometry.getCoordinates();
      const newAddress = await getAddressFromCoords(newCoords);
      
      if (preset === 'islands#greenIcon') {
        const newFromPoint = { address: newAddress, coordinates: newCoords };
        setFromPoint(newFromPoint);
        setFromAddress(newAddress);
        if (toPoint) {
          buildRoute(newFromPoint, toPoint, waypointPoints);
        }
      } else if (preset === 'islands#redIcon') {
        const newToPoint = { address: newAddress, coordinates: newCoords };
        setToPoint(newToPoint);
        setToAddress(newAddress);
        if (fromPoint) {
          buildRoute(fromPoint, newToPoint, waypointPoints);
        }
      }
    });

    map.geoObjects.add(placemark);
    setPlacemarks(prev => [...prev, placemark]);
  };

  const buildRoute = async (from: MapPoint, to: MapPoint, waypointsList: MapPoint[]) => {
    if (!map) return;

    try {
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
      
      // Notify parent component
      onPointsChange(from, to, waypointsList);
    } catch (error) {
      console.error('Ошибка построения маршрута:', error);
    }
  };

  const searchAddress = async (query: string, field: string) => {
    if (query.length < 3) {
      setSuggestions(prev => ({ ...prev, [field]: [] }));
      return;
    }

    if (!window.ymaps) return;

    try {
      const fullQuery = `${query}, ${cityNames[city]}`;
      const suggest = window.ymaps.suggest(fullQuery);
      const results = await suggest;
      
      const filteredResults = results.filter((item: any) => 
        item.displayName.includes(cityNames[city])
      ).slice(0, 5);

      setSuggestions(prev => ({ ...prev, [field]: filteredResults }));
      setActiveSuggestion(field);
    } catch (error) {
      console.error('Ошибка поиска адреса:', error);
      setSuggestions(prev => ({ ...prev, [field]: [] }));
    }
  };

  const selectAddress = async (selectedAddress: string, field: string) => {
    const coords = await getCoordsFromAddress(selectedAddress);
    
    if (field === 'from') {
      setFromAddress(selectedAddress);
      if (coords) {
        const newFromPoint = { address: selectedAddress, coordinates: coords };
        setFromPoint(newFromPoint);
        if (map) {
          clearPlacemarks();
          addPlacemark(coords, 'Откуда', 'islands#greenIcon');
          if (toPoint) {
            addPlacemark(toPoint.coordinates, 'Куда', 'islands#redIcon');
            waypointPoints.forEach((wp, i) => 
              addPlacemark(wp.coordinates, `Точка ${i + 1}`, 'islands#yellowIcon')
            );
            buildRoute(newFromPoint, toPoint, waypointPoints);
          }
        }
      }
    } else if (field === 'to') {
      setToAddress(selectedAddress);
      if (coords) {
        const newToPoint = { address: selectedAddress, coordinates: coords };
        setToPoint(newToPoint);
        if (map) {
          clearPlacemarks();
          if (fromPoint) {
            addPlacemark(fromPoint.coordinates, 'Откуда', 'islands#greenIcon');
          }
          addPlacemark(coords, 'Куда', 'islands#redIcon');
          waypointPoints.forEach((wp, i) => 
            addPlacemark(wp.coordinates, `Точка ${i + 1}`, 'islands#yellowIcon')
          );
          if (fromPoint) {
            buildRoute(fromPoint, newToPoint, waypointPoints);
          }
        }
      }
    } else if (field.startsWith('waypoint-')) {
      const index = parseInt(field.split('-')[1]);
      const updatedWaypoints = [...waypoints];
      updatedWaypoints[index] = selectedAddress;
      setWaypoints(updatedWaypoints);
      
      if (coords) {
        const newWaypointPoints = [...waypointPoints];
        newWaypointPoints[index] = { address: selectedAddress, coordinates: coords };
        setWaypointPoints(newWaypointPoints);
        
        if (map && fromPoint && toPoint) {
          clearPlacemarks();
          addPlacemark(fromPoint.coordinates, 'Откуда', 'islands#greenIcon');
          addPlacemark(toPoint.coordinates, 'Куда', 'islands#redIcon');
          newWaypointPoints.forEach((wp, i) => 
            addPlacemark(wp.coordinates, `Точка ${i + 1}`, 'islands#yellowIcon')
          );
          buildRoute(fromPoint, toPoint, newWaypointPoints);
        }
      }
    }

    setSuggestions(prev => ({ ...prev, [field]: [] }));
    setActiveSuggestion(null);
  };

  const clearPlacemarks = () => {
    placemarks.forEach(placemark => {
      if (map) map.geoObjects.remove(placemark);
    });
    setPlacemarks([]);
  };

  const clearAll = () => {
    if (map) {
      map.geoObjects.removeAll();
    }
    setFromPoint(null);
    setToPoint(null);
    setWaypointPoints([]);
    setFromAddress('');
    setToAddress('');
    setWaypoints(['']);
    setRoute(null);
    setPlacemarks([]);
    setSuggestions({});
    setActiveSuggestion(null);
  };

  const addWaypoint = () => {
    setWaypoints(prev => [...prev, '']);
  };

  const removeWaypoint = (index: number) => {
    const newWaypoints = waypoints.filter((_, i) => i !== index);
    const newWaypointPoints = waypointPoints.filter((_, i) => i !== index);
    
    setWaypoints(newWaypoints);
    setWaypointPoints(newWaypointPoints);
    
    if (map && fromPoint && toPoint) {
      clearPlacemarks();
      addPlacemark(fromPoint.coordinates, 'Откуда', 'islands#greenIcon');
      addPlacemark(toPoint.coordinates, 'Куда', 'islands#redIcon');
      newWaypointPoints.forEach((wp, i) => 
        addPlacemark(wp.coordinates, `Точка ${i + 1}`, 'islands#yellowIcon')
      );
      buildRoute(fromPoint, toPoint, newWaypointPoints);
    }
  };

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'map' | 'manual')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="map" className="flex items-center space-x-2">
            <Icon name="Map" size={16} />
            <span>Карта</span>
          </TabsTrigger>
          <TabsTrigger value="manual" className="flex items-center space-x-2">
            <Icon name="Edit3" size={16} />
            <span>Ввод адресов</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="space-y-4">
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
                      {waypointPoints.length > 0 && (
                        <Badge variant="outline">
                          <Icon name="MapPin" className="mr-1 text-yellow-500" size={14} />
                          Точки: {waypointPoints.length}
                        </Badge>
                      )}
                    </div>
                    <Button size="sm" variant="outline" onClick={clearAll}>
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
        </TabsContent>

        <TabsContent value="manual" className="space-y-4">
          <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6 space-y-4">
              {/* From Address */}
              <div className="space-y-2 relative">
                <Label>Откуда</Label>
                <div className="relative">
                  <Icon name="MapPin" className="absolute left-3 top-3 text-green-500" size={16} />
                  <Input
                    value={fromAddress}
                    onChange={(e) => {
                      setFromAddress(e.target.value);
                      searchAddress(e.target.value, 'from');
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

              {/* Waypoints */}
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

              {/* To Address */}
              <div className="space-y-2 relative">
                <Label>Куда</Label>
                <div className="relative">
                  <Icon name="MapPin" className="absolute left-3 top-3 text-red-500" size={16} />
                  <Input
                    value={toAddress}
                    onChange={(e) => {
                      setToAddress(e.target.value);
                      searchAddress(e.target.value, 'to');
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

              {fromPoint && toPoint && (
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
        </TabsContent>
      </Tabs>

      {/* Hide suggestions when clicking outside */}
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

export default UnifiedAddressInput;