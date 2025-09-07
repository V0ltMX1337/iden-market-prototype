import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { useTaxiAuth, type TaxiOrder } from '@/contexts/TaxiAuthContext';

const TaxiOrderTracking = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { user, orders } = useTaxiAuth();
  const [order, setOrder] = useState<TaxiOrder | null>(null);
  const [driverLocation, setDriverLocation] = useState<[number, number] | null>(null);
  const [estimatedTime, setEstimatedTime] = useState<number>(0);

  // Найти заказ по ID
  useEffect(() => {
    if (orderId) {
      const foundOrder = orders.find(o => o.id === orderId);
      if (foundOrder) {
        setOrder(foundOrder);
        // Имитируем данные водителя
        simulateDriverData(foundOrder);
      } else {
        // Создаем заказ-заглушку для демонстрации
        const mockOrder: TaxiOrder = {
          id: orderId,
          clientId: user?.id || '1',
          driverId: 'driver-123',
          type: 'taxi',
          status: 'accepted',
          fromAddress: 'ул. Ленина, 1',
          fromCoordinates: [56.2431, 43.8346],
          toAddress: 'ул. Большая Покровская, 15',
          toCoordinates: [56.2965, 44.0048],
          baseCost: 250,
          distanceCost: 120,
          nightSurcharge: 0,
          holidaySurcharge: 0,
          totalCost: 370,
          distance: 6,
          createdAt: new Date(),
          acceptedAt: new Date(),
          passengerCount: 1,
          paymentMethod: 'card'
        };
        setOrder(mockOrder);
        simulateDriverData(mockOrder);
      }
    }
  }, [orderId, orders, user]);

  const simulateDriverData = (orderData: TaxiOrder) => {
    // Имитируем местоположение водителя
    const startCoords: [number, number] = [56.24, 43.82];
    setDriverLocation(startCoords);
    
    // Имитируем время прибытия
    setEstimatedTime(Math.floor(Math.random() * 8) + 2); // 2-10 минут
    
    // Имитируем движение водителя к клиенту
    if (orderData.status === 'accepted') {
      const interval = setInterval(() => {
        setDriverLocation(prev => {
          if (!prev) return startCoords;
          
          // Движемся к точке отправления
          const targetCoords = orderData.fromCoordinates;
          const newLat = prev[0] + (targetCoords[0] - prev[0]) * 0.1;
          const newLng = prev[1] + (targetCoords[1] - prev[1]) * 0.1;
          
          // Уменьшаем время прибытия
          setEstimatedTime(prevTime => Math.max(0, prevTime - 0.5));
          
          return [newLat, newLng];
        });
      }, 3000);

      // Очищаем интервал через минуту
      setTimeout(() => clearInterval(interval), 60000);
    }
  };

  const getStatusInfo = (status: TaxiOrder['status']) => {
    switch (status) {
      case 'pending':
        return {
          label: 'Поиск водителя',
          description: 'Ищем ближайшего водителя...',
          progress: 25,
          color: 'yellow',
          icon: 'Search'
        };
      case 'accepted':
        return {
          label: 'Водитель едет к вам',
          description: 'Водитель принял заказ и направляется к точке подачи',
          progress: 50,
          color: 'blue',
          icon: 'Car'
        };
      case 'in_progress':
        return {
          label: 'В пути',
          description: 'Водитель забрал вас и едет по маршруту',
          progress: 75,
          color: 'green',
          icon: 'Navigation'
        };
      case 'completed':
        return {
          label: 'Поездка завершена',
          description: 'Вы прибыли в пункт назначения',
          progress: 100,
          color: 'green',
          icon: 'CheckCircle'
        };
      case 'cancelled':
        return {
          label: 'Заказ отменен',
          description: 'Поездка была отменена',
          progress: 0,
          color: 'red',
          icon: 'XCircle'
        };
      default:
        return {
          label: 'Неизвестный статус',
          description: '',
          progress: 0,
          color: 'gray',
          icon: 'Clock'
        };
    }
  };

  const mockDriver = {
    id: 'driver-123',
    name: 'Алексей Петров',
    rating: 4.8,
    carModel: 'Toyota Camry',
    carNumber: 'А123ВС52',
    carColor: 'Белый',
    phone: '+7 (900) 123-45-67',
    avatar: ''
  };

  const formatTime = (minutes: number) => {
    if (minutes < 1) return 'меньше минуты';
    return `${Math.round(minutes)} мин`;
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <Icon name="Search" className="mx-auto mb-4 text-gray-400" size={48} />
            <h2 className="text-xl font-semibold mb-2">Заказ не найден</h2>
            <p className="text-gray-600 mb-4">Заказ с указанным ID не существует</p>
            <Link to="/migalki/dashboard/client">
              <Button>К списку заказов</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const statusInfo = getStatusInfo(order.status);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/migalki/dashboard/client" className="flex items-center space-x-2">
            <Icon name="ArrowLeft" size={20} />
            <span className="font-medium">К заказам</span>
          </Link>

          <div className="flex items-center space-x-2">
            <Badge variant={statusInfo.color as any} className="px-3 py-1">
              <Icon name={statusInfo.icon as any} className="mr-1" size={14} />
              {statusInfo.label}
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Статус заказа */}
          <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className={`w-10 h-10 bg-${statusInfo.color}-500 rounded-xl flex items-center justify-center`}>
                  <Icon name={statusInfo.icon as any} className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{statusInfo.label}</h2>
                  <p className="text-sm text-gray-600">{statusInfo.description}</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Progress value={statusInfo.progress} className="h-2" />
                
                {order.status === 'accepted' && estimatedTime > 0 && (
                  <div className="flex items-center justify-center p-4 bg-blue-50 rounded-lg">
                    <Icon name="Clock" className="text-blue-600 mr-2" size={20} />
                    <span className="font-medium text-blue-800">
                      Водитель будет через {formatTime(estimatedTime)}
                    </span>
                  </div>
                )}

                {order.status === 'in_progress' && (
                  <div className="flex items-center justify-center p-4 bg-green-50 rounded-lg">
                    <Icon name="Navigation" className="text-green-600 mr-2" size={20} />
                    <span className="font-medium text-green-800">
                      В пути к месту назначения
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Информация о водителе */}
            <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon name="User" className="text-blue-500" size={24} />
                  <span>Ваш водитель</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-6">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={mockDriver.avatar} />
                    <AvatarFallback className="text-lg">
                      {mockDriver.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{mockDriver.name}</h3>
                    <div className="flex items-center space-x-1 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          className={`w-4 h-4 ${i < Math.floor(mockDriver.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">{mockDriver.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon name="Car" className="text-blue-600" size={16} />
                    </div>
                    <div>
                      <p className="font-medium">{mockDriver.carModel}</p>
                      <p className="text-sm text-gray-600">{mockDriver.carColor}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <Icon name="Hash" className="text-green-600" size={16} />
                    </div>
                    <div>
                      <p className="font-medium">{mockDriver.carNumber}</p>
                      <p className="text-sm text-gray-600">Гос. номер</p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3 mt-6">
                  <Button className="flex-1">
                    <Icon name="Phone" className="mr-2" size={16} />
                    Позвонить
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Icon name="MessageCircle" className="mr-2" size={16} />
                    Написать
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Детали маршрута */}
            <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon name="Route" className="text-purple-500" size={24} />
                  <span>Маршрут</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Icon name="MapPin" className="text-green-600" size={16} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Откуда</p>
                      <p className="text-sm text-gray-600">{order.fromAddress}</p>
                    </div>
                  </div>

                  <div className="ml-4 border-l-2 border-gray-200 h-8"></div>

                  {order.waypoints && order.waypoints.length > 0 && (
                    <>
                      {order.waypoints.map((waypoint, index) => (
                        <div key={index}>
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                              <Icon name="MapPin" className="text-yellow-600" size={16} />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">Промежуточная точка</p>
                              <p className="text-sm text-gray-600">{waypoint.address}</p>
                            </div>
                          </div>
                          <div className="ml-4 border-l-2 border-gray-200 h-8"></div>
                        </div>
                      ))}
                    </>
                  )}

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Icon name="MapPin" className="text-red-600" size={16} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Куда</p>
                      <p className="text-sm text-gray-600">{order.toAddress}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Расстояние</span>
                    <span className="font-medium">{order.distance} км</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Способ оплаты</span>
                    <span className="font-medium">
                      {order.paymentMethod === 'card' ? '💳 Карта' : '💵 Наличные'}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Стоимость</span>
                    <span className="text-green-600">{order.totalCost} ₽</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Действия */}
          {order.status !== 'completed' && order.status !== 'cancelled' && (
            <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                  <Button
                    variant="outline"
                    className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => {
                      // Логика отмены заказа
                      if (window.confirm('Вы уверены, что хотите отменить заказ?')) {
                        // Здесь будет API вызов
                        navigate('/migalki/dashboard/client');
                      }
                    }}
                  >
                    <Icon name="X" className="mr-2" size={16} />
                    Отменить заказ
                  </Button>
                  
                  <Button variant="outline" className="flex-1">
                    <Icon name="MessageCircle" className="mr-2" size={16} />
                    Связаться с поддержкой
                  </Button>
                  
                  <Button
                    className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                    onClick={() => {
                      // Логика для обновления статуса (для демо)
                      if (order.status === 'accepted') {
                        setOrder(prev => prev ? { ...prev, status: 'in_progress' } : null);
                      } else if (order.status === 'in_progress') {
                        setOrder(prev => prev ? { ...prev, status: 'completed' } : null);
                      }
                    }}
                  >
                    <Icon name="RefreshCw" className="mr-2" size={16} />
                    Обновить статус
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Завершенный заказ - оценка */}
          {order.status === 'completed' && !order.rating && (
            <Card className="border-none shadow-xl bg-gradient-to-br from-green-50 to-blue-50">
              <CardContent className="p-6 text-center">
                <Icon name="CheckCircle" className="mx-auto mb-4 text-green-500" size={48} />
                <h3 className="text-xl font-bold mb-2">Поездка завершена!</h3>
                <p className="text-gray-600 mb-6">Оцените качество поездки и водителя</p>
                
                <div className="flex justify-center space-x-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button
                      key={i}
                      className="w-8 h-8 text-gray-300 hover:text-yellow-400 transition-colors"
                    >
                      <Icon name="Star" className="w-full h-full" />
                    </button>
                  ))}
                </div>
                
                <div className="flex space-x-3">
                  <Button variant="outline" className="flex-1">
                    Пропустить
                  </Button>
                  <Button className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                    Оценить
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaxiOrderTracking;