import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const DriverOrderScreen: React.FC = () => {
  const [currentOrder, setCurrentOrder] = useState<any>(null);
  const [orderStatus, setOrderStatus] = useState<'new' | 'accepted' | 'picking_up' | 'in_progress' | 'completed'>('new');
  const [timer, setTimer] = useState(300); // 5 минут на принятие заказа
  const [earnings, setEarnings] = useState(0);

  // Мокаем новый заказ
  useEffect(() => {
    if (!currentOrder) {
      const mockOrder = {
        id: '#4521',
        from: 'улица Каховка, 27к1',
        to: 'улица Слонова, 4/8',
        distance: '1.6 км',
        duration: '7 мин',
        price: 280,
        surge: 1.1,
        passengerName: 'Анна К.',
        passengerRating: 4.8,
        passengerPhone: '+7 (999) 123-45-67'
      };
      setCurrentOrder(mockOrder);
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (orderStatus === 'new' && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [orderStatus, timer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAcceptOrder = () => {
    setOrderStatus('accepted');
    setTimer(0);
  };

  const handleStartTrip = () => {
    setOrderStatus('picking_up');
  };

  const handlePickupClient = () => {
    setOrderStatus('in_progress');
  };

  const handleCompleteOrder = () => {
    setOrderStatus('completed');
    setEarnings(currentOrder.price * 0.8); // 80% водителю
    setTimeout(() => {
      setCurrentOrder(null);
      setOrderStatus('new');
      setTimer(300);
    }, 3000);
  };

  if (!currentOrder) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold mb-2">Ищем заказы...</h3>
            <p className="text-gray-600">Ожидайте новые заказы</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (orderStatus === 'completed') {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <div className="bg-green-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <Icon name="CheckCircle" className="text-green-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-green-800 mb-2">Заказ выполнен!</h3>
            <p className="text-green-600 mb-4">Спасибо за отличную работу</p>
            
            <div className="bg-white rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Заработано:</span>
                <span className="text-2xl font-bold text-green-600">+{earnings} ₽</span>
              </div>
            </div>
            
            <div className="text-sm text-gray-500">
              Переход к поиску новых заказов...
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Карта */}
      <div className="relative h-64 bg-gradient-to-br from-blue-100 to-purple-100">
        <img 
          src="https://cdn.poehali.dev/files/2598d871-7f49-4d49-bb61-11d4200a1e4a.png" 
          alt="Карта заказа"
          className="w-full h-full object-cover"
        />
        
        {orderStatus === 'new' && (
          <div className="absolute top-4 left-4 right-4">
            <div className="bg-white rounded-full px-4 py-2 shadow-lg flex items-center justify-center">
              <Icon name="Clock" className="text-red-500 mr-2" size={16} />
              <span className="font-semibold text-red-500">
                Принять до: {formatTime(timer)}
              </span>
            </div>
          </div>
        )}

        {orderStatus === 'picking_up' && (
          <div className="absolute top-4 left-4 right-4">
            <div className="bg-purple-600 rounded-full px-4 py-2 shadow-lg">
              <div className="text-white text-center">
                <div className="text-sm opacity-90">Едем к клиенту</div>
                <div className="font-semibold">1,6 км • 7 мин</div>
              </div>
            </div>
          </div>
        )}

        {orderStatus === 'in_progress' && (
          <div className="absolute top-4 left-4 right-4">
            <div className="bg-green-600 rounded-full px-4 py-2 shadow-lg">
              <div className="text-white text-center">
                <div className="text-sm opacity-90">В пути</div>
                <div className="font-semibold">00:22 • В пути</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Информация о заказе */}
      <div className="p-4">
        <Card>
          <CardContent className="p-6">
            {orderStatus === 'new' && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Новый заказ {currentOrder.id}</h3>
                    <p className="text-gray-600">{currentOrder.distance} • {currentOrder.duration}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{currentOrder.price} ₽</div>
                    <div className="text-sm text-purple-600 flex items-center">
                      <Icon name="Zap" size={14} className="mr-1" />
                      x{currentOrder.surge}
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-3 h-3 rounded-full bg-green-500 mt-1"></div>
                    <div>
                      <div className="text-sm text-gray-500">Откуда</div>
                      <div className="font-medium">{currentOrder.from}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-3 h-3 rounded-full bg-red-500 mt-1"></div>
                    <div>
                      <div className="text-sm text-gray-500">Куда</div>
                      <div className="font-medium">{currentOrder.to}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 mb-6 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Icon name="User" className="text-blue-600" size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{currentOrder.passengerName}</div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Icon name="Star" className="text-yellow-400 mr-1" size={14} />
                      {currentOrder.passengerRating}
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleAcceptOrder}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-lg py-6"
                >
                  Принять
                </Button>
              </>
            )}

            {orderStatus === 'accepted' && (
              <>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon name="CheckCircle" className="text-green-600" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-green-600 mb-1">Заказ принят!</h3>
                  <p className="text-gray-600">Начните движение к клиенту</p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Клиент:</span>
                    <span className="font-medium">{currentOrder.passengerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Расстояние:</span>
                    <span className="font-medium">{currentOrder.distance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Стоимость:</span>
                    <span className="font-medium">{currentOrder.price} ₽</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  <Button variant="outline" className="flex flex-col items-center py-3">
                    <Icon name="Pause" size={20} className="mb-1" />
                    <span className="text-xs">Ждать</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center py-3">
                    <Icon name="Phone" size={20} className="mb-1" />
                    <span className="text-xs">Звонок</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center py-3">
                    <Icon name="AlertTriangle" size={20} className="mb-1" />
                    <span className="text-xs">Помощь</span>
                  </Button>
                </div>

                <Button 
                  onClick={handleStartTrip}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-lg py-6"
                >
                  Начать поездку
                </Button>
              </>
            )}

            {orderStatus === 'picking_up' && (
              <>
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold mb-1">Едем к клиенту</h3>
                  <p className="text-gray-600">{currentOrder.from}</p>
                </div>

                <div className="bg-purple-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-purple-600">Расстояние до клиента:</span>
                    <span className="font-bold text-purple-600">1,6 км</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-purple-600">Время в пути:</span>
                    <span className="font-bold text-purple-600">7 мин</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  <Button variant="outline" className="flex flex-col items-center py-3">
                    <Icon name="Pause" size={20} className="mb-1" />
                    <span className="text-xs">Ждать</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center py-3">
                    <Icon name="Phone" size={20} className="mb-1" />
                    <span className="text-xs">Звонок</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center py-3">
                    <Icon name="AlertTriangle" size={20} className="mb-1" />
                    <span className="text-xs">Помощь</span>
                  </Button>
                </div>

                <Button 
                  onClick={handlePickupClient}
                  className="w-full bg-green-600 hover:bg-green-700 text-lg py-6"
                >
                  Клиент сел в машину
                </Button>
              </>
            )}

            {orderStatus === 'in_progress' && (
              <>
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold mb-1">В пути к месту назначения</h3>
                  <p className="text-gray-600">{currentOrder.to}</p>
                </div>

                <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-center mb-2">
                    <Icon name="Navigation" className="mr-2" size={24} />
                    <span className="text-lg font-semibold">00:22</span>
                  </div>
                  <div className="text-center text-green-100">В пути</div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Оплата наличными:</span>
                    <span className="font-medium">{currentOrder.price} ₽</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  <Button variant="outline" className="flex flex-col items-center py-3">
                    <Icon name="Pause" size={20} className="mb-1" />
                    <span className="text-xs">Ждать</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center py-3">
                    <Icon name="Phone" size={20} className="mb-1" />
                    <span className="text-xs">Звонок</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center py-3">
                    <Icon name="AlertTriangle" size={20} className="mb-1" />
                    <span className="text-xs">Помощь</span>
                  </Button>
                </div>

                <Button 
                  onClick={handleCompleteOrder}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-lg py-6 text-black font-semibold"
                >
                  Завершить заказ
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DriverOrderScreen;