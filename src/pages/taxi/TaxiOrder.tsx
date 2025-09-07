import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useTaxiAuth } from '@/contexts/TaxiAuthContext';
import YandexMap from '@/components/taxi/YandexMap';

const TaxiOrder = () => {
  const { user, createOrder, calculateCost } = useTaxiAuth();
  const navigate = useNavigate();

  const [orderData, setOrderData] = useState({
    type: 'taxi' as 'taxi' | 'food' | 'truck',
    fromAddress: '',
    toAddress: '',
    passengerCount: 1,
    scheduledAt: '',
    comment: '',
    paymentMethod: 'card' as 'cash' | 'card',
    city: 'nizhny' as 'dzerzhinsk' | 'nizhny'
  });

  const [waypoints, setWaypoints] = useState<string[]>(['']);
  const [isLoading, setIsLoading] = useState(false);
  const [costEstimate, setCostEstimate] = useState<{
    baseCost: number;
    distanceCost: number;
    nightSurcharge: number;
    holidaySurcharge: number;
    totalCost: number;
    distance: number;
  } | null>(null);

  const [realDistance, setRealDistance] = useState<number>(0);
  const [mapPoints, setMapPoints] = useState<{
    from?: { address: string; coordinates: [number, number] };
    to?: { address: string; coordinates: [number, number] };
    waypoints?: Array<{ address: string; coordinates: [number, number] }>;
  }>({});
  const [showMap, setShowMap] = useState(true);

  // Если пользователь не авторизован, перенаправляем на авторизацию
  useEffect(() => {
    if (!user) {
      navigate('/migalki/auth');
    }
  }, [user, navigate]);

  // Расчет стоимости при изменении параметров
  useEffect(() => {
    if (realDistance > 0) {
      calculateEstimate();
    }
  }, [realDistance, orderData.city]);

  const calculateEstimate = () => {
    const distance = realDistance;
    
    const now = new Date();
    const isNight = now.getHours() >= 23 || now.getHours() < 6;
    const isHoliday = now.getDay() === 0 || now.getDay() === 6;

    const baseCost = orderData.city === 'dzerzhinsk' ? 200 : 250;
    const distanceCost = distance * 20;
    const nightSurcharge = isNight ? (baseCost + distanceCost) * 0.15 : 0;
    const holidaySurcharge = isHoliday ? (baseCost + distanceCost) * 0.05 : 0;
    const totalCost = calculateCost({ 
      city: orderData.city, 
      distance, 
      isNight, 
      isHoliday 
    });

    setCostEstimate({
      baseCost,
      distanceCost,
      nightSurcharge,
      holidaySurcharge,
      totalCost,
      distance: Math.round(distance * 100) / 100
    });
  };

  // Обработчики карты
  const handleMapPointsChange = (from: any, to: any, waypoints: any[]) => {
    setMapPoints({ from, to, waypoints });
    setOrderData(prev => ({
      ...prev,
      fromAddress: from.address,
      toAddress: to.address
    }));
  };

  const handleDistanceChange = (distance: number) => {
    setRealDistance(distance);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    try {
      const order = await createOrder({
        ...orderData,
        fromCoordinates: mapPoints.from?.coordinates || [56.2431, 43.8346],
        toCoordinates: mapPoints.to?.coordinates || [56.2965, 44.0048],
        waypoints: mapPoints.waypoints || waypoints.filter(w => w.trim()).map(address => ({
          address,
          coordinates: [56.2431, 43.8346] as [number, number]
        })),
        scheduledAt: orderData.scheduledAt ? new Date(orderData.scheduledAt) : undefined
      });

      navigate(`/migalki/tracking/${order.id}`);
    } catch (error) {
      console.error('Ошибка создания заказа:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addWaypoint = () => {
    setWaypoints([...waypoints, '']);
  };

  const removeWaypoint = (index: number) => {
    setWaypoints(waypoints.filter((_, i) => i !== index));
  };

  const updateWaypoint = (index: number, value: string) => {
    const updated = [...waypoints];
    updated[index] = value;
    setWaypoints(updated);
  };

  const getServiceConfig = (type: string) => {
    switch (type) {
      case 'taxi':
        return {
          icon: 'Car',
          title: 'Такси',
          description: 'Комфортная поездка по городу',
          color: 'blue'
        };
      case 'food':
        return {
          icon: 'Package',
          title: 'Курьер еды',
          description: 'Быстрая доставка еды и продуктов',
          color: 'green'
        };
      case 'truck':
        return {
          icon: 'Truck',
          title: 'Газель',
          description: 'Грузоперевозки и переезды',
          color: 'purple'
        };
      default:
        return { icon: 'Car', title: 'Услуга', description: '', color: 'gray' };
    }
  };

  if (!user) {
    return null;
  }

  const serviceConfig = getServiceConfig(orderData.type);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <Link to="/migalki" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
            <Icon name="Car" className="text-white" size={16} />
          </div>
          <span className="text-lg font-semibold text-gray-800">Мигалки</span>
        </Link>

        <div className="flex items-center space-x-4">
          <Link to="/migalki/profile">
            <Button variant="outline" size="sm">
              <Icon name="User" className="mr-2" size={16} />
              {user.name}
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 pb-8">
        <div className="max-w-4xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Форма заказа */}
          <div className="lg:col-span-2">
            <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className={`w-10 h-10 bg-gradient-to-r from-${serviceConfig.color}-500 to-${serviceConfig.color}-600 rounded-xl flex items-center justify-center`}>
                    <Icon name={serviceConfig.icon as any} className="text-white" size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">Оформить заказ</h2>
                    <p className="text-sm text-gray-600">{serviceConfig.description}</p>
                  </div>
                </CardTitle>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Тип услуги */}
                  <div className="space-y-2">
                    <Label>Тип услуги</Label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { value: 'taxi', icon: 'Car', label: 'Такси', color: 'blue' },
                        { value: 'food', icon: 'Package', label: 'Еда', color: 'green' },
                        { value: 'truck', icon: 'Truck', label: 'Газель', color: 'purple' }
                      ].map((service) => (
                        <button
                          key={service.value}
                          type="button"
                          onClick={() => setOrderData({ ...orderData, type: service.value as any })}
                          className={`p-3 rounded-xl border-2 transition-all ${
                            orderData.type === service.value
                              ? `border-${service.color}-500 bg-${service.color}-50`
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <Icon name={service.icon as any} className={`mx-auto mb-1 ${
                            orderData.type === service.value ? `text-${service.color}-600` : 'text-gray-400'
                          }`} size={20} />
                          <div className={`text-sm font-medium ${
                            orderData.type === service.value ? `text-${service.color}-700` : 'text-gray-600'
                          }`}>
                            {service.label}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Город */}
                  <div className="space-y-2">
                    <Label>Город</Label>
                    <Select value={orderData.city} onValueChange={(value: any) => setOrderData({ ...orderData, city: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nizhny">Нижний Новгород</SelectItem>
                        <SelectItem value="dzerzhinsk">Дзержинск</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Выбор способа ввода адреса */}
                  <div className="space-y-4">
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                      <button
                        type="button"
                        onClick={() => setShowMap(true)}
                        className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all flex items-center justify-center space-x-2 ${
                          showMap
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <Icon name="Map" size={16} />
                        <span>Карта</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowMap(false)}
                        className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all flex items-center justify-center space-x-2 ${
                          !showMap
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <Icon name="Edit3" size={16} />
                        <span>Ручной ввод</span>
                      </button>
                    </div>

                    {showMap ? (
                      <YandexMap
                        onPointsChange={handleMapPointsChange}
                        onDistanceChange={handleDistanceChange}
                        city={orderData.city}
                      />
                    ) : (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Откуда</Label>
                          <div className="relative">
                            <Icon name="MapPin" className="absolute left-3 top-3 text-green-500" size={20} />
                            <Input
                              value={orderData.fromAddress}
                              onChange={(e) => setOrderData({ ...orderData, fromAddress: e.target.value })}
                              placeholder="Адрес отправления"
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>

                        {/* Промежуточные точки */}
                        {waypoints.map((waypoint, index) => (
                          <div key={index} className="space-y-2">
                            <Label>Промежуточная точка {index + 1}</Label>
                            <div className="flex space-x-2">
                              <div className="relative flex-1">
                                <Icon name="MapPin" className="absolute left-3 top-3 text-yellow-500" size={20} />
                                <Input
                                  value={waypoint}
                                  onChange={(e) => updateWaypoint(index, e.target.value)}
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

                        <div className="space-y-2">
                          <Label>Куда</Label>
                          <div className="relative">
                            <Icon name="MapPin" className="absolute left-3 top-3 text-red-500" size={20} />
                            <Input
                              value={orderData.toAddress}
                              onChange={(e) => setOrderData({ ...orderData, toAddress: e.target.value })}
                              placeholder="Адрес назначения"
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Дополнительные параметры */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {orderData.type === 'taxi' && (
                      <div className="space-y-2">
                        <Label>Количество пассажиров</Label>
                        <Select value={orderData.passengerCount.toString()} onValueChange={(value) => setOrderData({ ...orderData, passengerCount: parseInt(value) })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 пассажир</SelectItem>
                            <SelectItem value="2">2 пассажира</SelectItem>
                            <SelectItem value="3">3 пассажира</SelectItem>
                            <SelectItem value="4">4 пассажира</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label>Способ оплаты</Label>
                      <Select value={orderData.paymentMethod} onValueChange={(value: any) => setOrderData({ ...orderData, paymentMethod: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="card">💳 Картой</SelectItem>
                          <SelectItem value="cash">💵 Наличными</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Время подачи */}
                  <div className="space-y-2">
                    <Label>Время подачи</Label>
                    <Input
                      type="datetime-local"
                      value={orderData.scheduledAt}
                      onChange={(e) => setOrderData({ ...orderData, scheduledAt: e.target.value })}
                      min={new Date().toISOString().slice(0, 16)}
                    />
                    <p className="text-xs text-gray-500">
                      Оставьте пустым для заказа сейчас
                    </p>
                  </div>

                  {/* Комментарий */}
                  <div className="space-y-2">
                    <Label>Комментарий к заказу</Label>
                    <Textarea
                      value={orderData.comment}
                      onChange={(e) => setOrderData({ ...orderData, comment: e.target.value })}
                      placeholder="Дополнительные пожелания..."
                      rows={3}
                    />
                  </div>

                  {/* Кнопка заказа */}
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isLoading || !orderData.fromAddress || !orderData.toAddress}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                  >
                    {isLoading ? (
                      <Icon name="Loader2" className="animate-spin mr-2" size={20} />
                    ) : (
                      <Icon name="Send" className="mr-2" size={20} />
                    )}
                    {costEstimate ? `Заказать за ${costEstimate.totalCost} ₽` : 'Оформить заказ'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Расчет стоимости */}
          <div className="space-y-6">
            {/* Текущие условия */}
            <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Условия заказа</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Время</span>
                  <Badge variant="outline">
                    {new Date().getHours() >= 23 || new Date().getHours() < 6 ? '🌙 Ночь (+15%)' : '☀️ День'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">День недели</span>
                  <Badge variant="outline">
                    {[0, 6].includes(new Date().getDay()) ? '🎉 Праздник (+5%)' : '📅 Обычный'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Город</span>
                  <Badge variant="outline">
                    {orderData.city === 'dzerzhinsk' ? '🏙️ Дзержинск' : '🏙️ Н.Новгород'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Расчет стоимости */}
            {costEstimate && (
              <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Расчет стоимости</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-yellow-500 rounded text-white text-xs font-bold flex items-center justify-center">А</div>
                        <span className="text-sm">Базовая ставка</span>
                      </div>
                      <span className="font-medium">{costEstimate.baseCost} ₽</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-blue-500 rounded text-white text-xs font-bold flex items-center justify-center">Б</div>
                        <span className="text-sm">{costEstimate.distance} км × 20 ₽</span>
                      </div>
                      <span className="font-medium">{costEstimate.distanceCost} ₽</span>
                    </div>

                    {costEstimate.nightSurcharge > 0 && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-purple-500 rounded text-white text-xs font-bold flex items-center justify-center">В</div>
                          <span className="text-sm">Ночная надбавка</span>
                        </div>
                        <span className="font-medium">+{Math.round(costEstimate.nightSurcharge)} ₽</span>
                      </div>
                    )}

                    {costEstimate.holidaySurcharge > 0 && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-red-500 rounded text-white text-xs font-bold flex items-center justify-center">Г</div>
                          <span className="text-sm">Праздничная надбавка</span>
                        </div>
                        <span className="font-medium">+{Math.round(costEstimate.holidaySurcharge)} ₽</span>
                      </div>
                    )}
                  </div>

                  <div className="border-t pt-3">
                    <div className="flex items-center justify-between text-lg font-bold">
                      <span>Итого</span>
                      <span className="text-green-600">{costEstimate.totalCost} ₽</span>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 text-center">
                    Стоимость может измениться в зависимости от точного маршрута
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Информация */}
            <Card className="border-none shadow-xl bg-gradient-to-br from-yellow-50 to-orange-50">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Icon name="Info" className="text-yellow-600 mt-1" size={20} />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-800">Подача автомобиля</p>
                    <p className="text-xs text-gray-600">Обычно 3-7 минут в зависимости от загруженности</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxiOrder;