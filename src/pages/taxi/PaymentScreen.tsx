import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface PaymentScreenProps {
  orderData: {
    price: number;
    from: string;
    to: string;
    distance: string;
    duration: string;
  };
  onPaymentComplete: () => void;
}

const PaymentScreen: React.FC<PaymentScreenProps> = ({ orderData, onPaymentComplete }) => {
  const [paymentStep, setPaymentStep] = useState<'select' | 'processing' | 'success' | 'error'>('select');
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'cash' | 'sbp'>('card');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (paymentStep === 'processing') {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setPaymentStep('success');
            setTimeout(() => {
              onPaymentComplete();
            }, 2000);
            return 100;
          }
          return prev + 2;
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [paymentStep, onPaymentComplete]);

  const handlePayment = () => {
    setPaymentStep('processing');
  };

  const paymentMethods = [
    {
      id: 'card' as const,
      name: 'Банковская карта',
      description: '**** 1234',
      icon: 'CreditCard',
      color: 'blue'
    },
    {
      id: 'sbp' as const,
      name: 'СБП',
      description: 'Быстрый платеж',
      icon: 'Smartphone',
      color: 'green'
    },
    {
      id: 'cash' as const,
      name: 'Наличными',
      description: 'Оплата водителю',
      icon: 'Banknote',
      color: 'orange'
    }
  ];

  if (paymentStep === 'processing') {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-20"></div>
              <div className="relative bg-blue-600 rounded-full p-6 flex items-center justify-center">
                <Icon name="CreditCard" className="text-white" size={32} />
              </div>
            </div>
            
            <h3 className="text-xl font-semibold mb-2">Обрабатываем платеж...</h3>
            <p className="text-gray-600 mb-6">Пожалуйста, подождите</p>
            
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-300 ease-out"
                style={{width: `${progress}%`}}
              ></div>
            </div>
            
            <p className="text-sm text-gray-500">{Math.round(progress)}%</p>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">К оплате:</span>
                <span className="text-xl font-bold text-blue-600">{orderData.price} ₽</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (paymentStep === 'success') {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-20"></div>
              <div className="bg-green-600 rounded-full p-6 flex items-center justify-center">
                <Icon name="CheckCircle" className="text-white" size={32} />
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-green-600 mb-2">Оплата прошла успешно!</h3>
            <p className="text-gray-600 mb-6">Ваш заказ оплачен и передан водителю</p>
            
            <div className="bg-white rounded-lg p-4 mb-6 border border-green-100">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Оплачено:</span>
                <span className="text-2xl font-bold text-green-600">{orderData.price} ₽</span>
              </div>
            </div>
            
            <p className="text-sm text-gray-500">Перенаправляем к отслеживанию...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto">
        {/* Заголовок */}
        <div className="bg-white rounded-t-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="sm">
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <h1 className="text-lg font-semibold">Оплата заказа</h1>
            <div></div>
          </div>
        </div>

        {/* Информация о заказе */}
        <Card className="shadow-sm rounded-none">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div>
                  <div className="text-sm text-gray-500">Откуда</div>
                  <div className="font-medium">{orderData.from}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div>
                  <div className="text-sm text-gray-500">Куда</div>
                  <div className="font-medium">{orderData.to}</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="text-gray-600">{orderData.distance} • {orderData.duration}</span>
                <span className="text-2xl font-bold">{orderData.price} ₽</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Способы оплаты */}
        <Card className="shadow-sm rounded-none">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Способ оплаты</h3>
            
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedMethod === method.id
                      ? `border-${method.color}-500 bg-${method.color}-50`
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedMethod(method.id)}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg bg-${method.color}-100`}>
                      <Icon name={method.icon as any} className={`text-${method.color}-600`} size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{method.name}</div>
                      <div className="text-sm text-gray-500">{method.description}</div>
                    </div>
                    {selectedMethod === method.id && (
                      <Icon name="CheckCircle" className={`text-${method.color}-600`} size={20} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Итого и кнопка оплаты */}
        <div className="bg-white rounded-b-2xl p-6 shadow-sm">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Стоимость поездки</span>
                <span>{orderData.price - 50} ₽</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Сервисный сбор</span>
                <span>50 ₽</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Итого</span>
                  <span className="text-xl font-bold">{orderData.price} ₽</span>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={handlePayment}
              className="w-full bg-purple-600 hover:bg-purple-700 text-lg py-6"
            >
              {selectedMethod === 'cash' ? 'Заказать такси' : 'Оплатить'}
            </Button>
            
            <p className="text-xs text-gray-500 text-center">
              Нажимая "Оплатить", вы соглашаетесь с условиями сервиса
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentScreen;