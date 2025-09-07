import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const ClientRideScreen: React.FC = () => {
  const [rideStatus, setRideStatus] = useState<'searching' | 'found' | 'arriving' | 'in_progress' | 'completed'>('searching');
  const [arrivalTime, setArrivalTime] = useState(420); // 7 минут в секундах
  const [tripTime, setTripTime] = useState(0);

  // Симуляция процесса поиска и поездки
  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    if (rideStatus === 'searching') {
      timeouts.push(setTimeout(() => setRideStatus('found'), 3000));
    } else if (rideStatus === 'found') {
      timeouts.push(setTimeout(() => setRideStatus('arriving'), 2000));
    }

    return () => timeouts.forEach(clearTimeout);
  }, [rideStatus]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (rideStatus === 'arriving' && arrivalTime > 0) {
      interval = setInterval(() => {
        setArrivalTime(prev => prev - 1);
      }, 1000);
    } else if (rideStatus === 'in_progress') {
      interval = setInterval(() => {
        setTripTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [rideStatus, arrivalTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const rideData = {
    driver: {
      name: 'Абдосали',
      rating: 4.88,
      car: 'Hyundai Solaris',
      plate: 'А 443 УТ 142',
      photo: '/api/placeholder/60/60'
    },
    route: {
      from: 'аэропорт Пулково LED',
      to: 'Шушары',
      distance: '17 км',
      estimatedTime: '17 мин'
    },
    price: 443
  };

  if (rideStatus === 'searching') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 animate-ping bg-purple-400 rounded-full opacity-20"></div>
              <div className="relative bg-purple-600 rounded-full p-6">
                <Icon name="Car" className="text-white" size={32} />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Ищем водителя...</h3>
            <p className="text-gray-600 mb-4">Это займет не больше минуты</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (rideStatus === 'found') {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <div className="bg-green-100 rounded-full p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <Icon name="CheckCircle" className="text-green-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-green-600 mb-2">Водитель найден!</h3>
            <p className="text-gray-600 mb-4">Водитель принял ваш заказ</p>
            
            <div className="flex items-center space-x-4 bg-white rounded-lg p-4">
              <img 
                src={rideData.driver.photo} 
                alt={rideData.driver.name}
                className="w-12 h-12 rounded-full bg-gray-200"
              />
              <div className="text-left">
                <div className="font-semibold">{rideData.driver.name}</div>
                <div className="text-sm text-gray-600">{rideData.driver.car}</div>
                <div className="flex items-center text-sm">
                  <Icon name="Star" className="text-yellow-400 mr-1" size={14} />
                  {rideData.driver.rating}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Карта */}
      <div className="relative h-2/3 bg-gradient-to-br from-blue-100 to-green-100">
        <img 
          src="https://cdn.poehali.dev/files/6ea67bb9-fb84-4800-9419-00c1e58cc391.png" 
          alt="Карта поездки"
          className="w-full h-full object-cover"
        />
        
        {rideStatus === 'arriving' && (
          <div className="absolute top-4 left-4 right-4">
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {Math.floor(arrivalTime / 60)} мин
                </div>
                <div className="text-sm text-gray-600">Ближайшая подача</div>
              </div>
            </div>
          </div>
        )}

        {rideStatus === 'in_progress' && (
          <div className="absolute top-4 left-4 right-4">
            <div className="bg-green-600 rounded-lg p-4 shadow-lg">
              <div className="text-white text-center">
                <div className="text-2xl font-bold">{formatTime(tripTime)}</div>
                <div className="text-sm opacity-90">В пути</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Информация о поездке */}
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl">
        <div className="p-6">
          {rideStatus === 'arriving' && (
            <>
              <div className="text-center mb-4">
                <h3 className="text-xl font-semibold">Ехать {Math.floor(arrivalTime / 60)} мин</h3>
                <p className="text-gray-600">Как вам поездка?</p>
              </div>

              <div className="flex items-center space-x-4 bg-gray-50 rounded-xl p-4 mb-6">
                <img 
                  src={rideData.driver.photo} 
                  alt={rideData.driver.name}
                  className="w-16 h-16 rounded-full bg-gray-200"
                />
                <div className="flex-1">
                  <div className="font-semibold text-lg">{rideData.driver.name}</div>
                  <div className="text-gray-600">{rideData.driver.car}</div>
                  <div className="flex items-center text-sm">
                    <Icon name="Star" className="text-yellow-400 mr-1" size={16} />
                    {rideData.driver.rating}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Номер</div>
                  <div className="font-bold">{rideData.driver.plate}</div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-gray-600">Откуда:</span>
                  <span className="font-medium">{rideData.route.from}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-gray-600">Куда:</span>
                  <span className="font-medium">{rideData.route.to}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <Button variant="outline" className="flex flex-col items-center py-3 bg-gray-50">
                  <Icon name="MessageCircle" size={20} className="mb-1 text-blue-600" />
                  <span className="text-xs">Сообщение</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center py-3 bg-gray-50">
                  <Icon name="Phone" size={20} className="mb-1 text-green-600" />
                  <span className="text-xs">Звонок</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center py-3 bg-gray-50">
                  <Icon name="AlertTriangle" size={20} className="mb-1 text-red-600" />
                  <span className="text-xs">Помощь</span>
                </Button>
              </div>

              <Button 
                onClick={() => setRideStatus('in_progress')}
                className="w-full bg-purple-600 hover:bg-purple-700 text-lg py-4"
              >
                Водитель прибыл
              </Button>
            </>
          )}

          {rideStatus === 'in_progress' && (
            <>
              <div className="text-center mb-4">
                <h3 className="text-xl font-semibold">{formatTime(tripTime)}</h3>
                <p className="text-gray-600">В пути к месту назначения</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Куда:</span>
                  <Icon name="ArrowRight" className="text-gray-400" size={16} />
                </div>
                <div className="font-semibold text-lg">{rideData.route.to}</div>
              </div>

              <div className="bg-green-50 rounded-xl p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-green-700">Оплата наличными</span>
                  <span className="text-2xl font-bold text-green-700">{rideData.price} ₽</span>
                </div>
              </div>

              <div className="flex items-center space-x-4 bg-gray-50 rounded-xl p-4 mb-6">
                <img 
                  src={rideData.driver.photo} 
                  alt={rideData.driver.name}
                  className="w-12 h-12 rounded-full bg-gray-200"
                />
                <div className="flex-1">
                  <div className="font-semibold">{rideData.driver.name}</div>
                  <div className="text-sm text-gray-600">{rideData.driver.car} • {rideData.driver.plate}</div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="p-2">
                    <Icon name="MessageCircle" size={16} />
                  </Button>
                  <Button variant="outline" size="sm" className="p-2">
                    <Icon name="Phone" size={16} />
                  </Button>
                </div>
              </div>

              <Button 
                onClick={() => setRideStatus('completed')}
                variant="outline"
                className="w-full py-4"
              >
                Завершить поездку
              </Button>
            </>
          )}

          {rideStatus === 'completed' && (
            <div className="text-center py-8">
              <div className="bg-green-100 rounded-full p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Icon name="CheckCircle" className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-green-600 mb-2">Поездка завершена!</h3>
              <p className="text-gray-600 mb-4">Спасибо, что выбрали нас</p>
              
              <div className="text-3xl font-bold text-gray-800 mb-2">{rideData.price} ₽</div>
              <p className="text-gray-600 mb-6">Оплата наличными</p>

              <div className="flex justify-center space-x-2 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Icon 
                    key={star} 
                    name="Star" 
                    className="text-yellow-400 cursor-pointer" 
                    size={32}
                  />
                ))}
              </div>

              <Button className="w-full bg-purple-600 hover:bg-purple-700 py-4">
                Заказать еще раз
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientRideScreen;