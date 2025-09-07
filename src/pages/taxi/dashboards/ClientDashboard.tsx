import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { useTaxiAuth, type TaxiOrder } from '@/contexts/TaxiAuthContext';

const ClientDashboard = () => {
  const { user, orders, getOrderHistory, logout } = useTaxiAuth();
  const [activeOrders, setActiveOrders] = useState<TaxiOrder[]>([]);
  const [recentOrders, setRecentOrders] = useState<TaxiOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadOrderHistory();
    }
  }, [user]);

  const loadOrderHistory = async () => {
    try {
      setIsLoading(true);
      if (user) {
        await getOrderHistory(user.id);
      }
    } catch (error) {
      console.error('Ошибка загрузки истории:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const active = orders.filter(order => 
      ['pending', 'accepted', 'in_progress'].includes(order.status)
    );
    const recent = orders.filter(order => 
      ['completed', 'cancelled'].includes(order.status)
    ).slice(0, 5);

    setActiveOrders(active);
    setRecentOrders(recent);
  }, [orders]);

  const getStatusBadge = (status: TaxiOrder['status']) => {
    const statusMap = {
      pending: { label: 'Поиск водителя', variant: 'outline' as const, color: 'yellow' },
      accepted: { label: 'Водитель найден', variant: 'secondary' as const, color: 'blue' },
      in_progress: { label: 'В пути', variant: 'default' as const, color: 'green' },
      completed: { label: 'Завершен', variant: 'outline' as const, color: 'gray' },
      cancelled: { label: 'Отменен', variant: 'destructive' as const, color: 'red' }
    };
    
    return statusMap[status] || statusMap.pending;
  };

  const getServiceIcon = (type: TaxiOrder['type']) => {
    switch (type) {
      case 'taxi': return 'Car';
      case 'food': return 'Package';
      case 'truck': return 'Truck';
      default: return 'Car';
    }
  };

  const getServiceLabel = (type: TaxiOrder['type']) => {
    switch (type) {
      case 'taxi': return 'Такси';
      case 'food': return 'Еда';
      case 'truck': return 'Газель';
      default: return 'Услуга';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/migalki" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
              <Icon name="Car" className="text-white" size={16} />
            </div>
            <span className="text-lg font-semibold text-gray-800">Мигалки</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/migalki/order">
              <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                <Icon name="Plus" className="mr-2" size={16} />
                Новый заказ
              </Button>
            </Link>
            
            <div className="flex items-center space-x-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline text-sm font-medium text-gray-700">{user.name}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Добро пожаловать, {user.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-gray-600">
            Управляйте своими заказами и настройками профиля
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Активные заказы */}
          <div className="lg:col-span-2 space-y-6">
            {/* Текущие заказы */}
            {activeOrders.length > 0 && (
              <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Icon name="Clock" className="text-blue-500" size={24} />
                    <span>Активные заказы</span>
                    <Badge variant="secondary">{activeOrders.length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeOrders.map((order) => {
                    const status = getStatusBadge(order.status);
                    return (
                      <div key={order.id} className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 bg-gradient-to-r from-${status.color}-500 to-${status.color}-600 rounded-xl flex items-center justify-center`}>
                              <Icon name={getServiceIcon(order.type) as any} className="text-white" size={20} />
                            </div>
                            <div>
                              <div className="font-medium text-gray-800">{getServiceLabel(order.type)}</div>
                              <div className="text-sm text-gray-500">#{order.id}</div>
                            </div>
                          </div>
                          <Badge variant={status.variant}>{status.label}</Badge>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center space-x-2">
                            <Icon name="MapPin" className="text-green-500" size={14} />
                            <span className="text-gray-600">{order.fromAddress}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Icon name="MapPin" className="text-red-500" size={14} />
                            <span className="text-gray-600">{order.toAddress}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                          <div className="text-sm text-gray-500">
                            {formatDate(order.createdAt)}
                          </div>
                          <div className="font-bold text-green-600">
                            {order.totalCost} ₽
                          </div>
                        </div>

                        {order.status === 'in_progress' && (
                          <div className="mt-3 flex space-x-2">
                            <Button size="sm" variant="outline" className="flex-1">
                              <Icon name="Phone" className="mr-2" size={14} />
                              Связаться
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1">
                              <Icon name="MapPin" className="mr-2" size={14} />
                              Трекинг
                            </Button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            )}

            {/* История заказов */}
            <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon name="History" className="text-purple-500" size={24} />
                  <span>История заказов</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8">
                    <Icon name="Loader2" className="animate-spin mx-auto mb-4 text-gray-400" size={32} />
                    <p className="text-gray-500">Загрузка истории...</p>
                  </div>
                ) : recentOrders.length > 0 ? (
                  <div className="space-y-3">
                    {recentOrders.map((order) => {
                      const status = getStatusBadge(order.status);
                      return (
                        <div key={order.id} className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-all">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Icon name={getServiceIcon(order.type) as any} className="text-gray-400" size={16} />
                              <div>
                                <div className="text-sm font-medium">{getServiceLabel(order.type)}</div>
                                <div className="text-xs text-gray-500">
                                  {order.fromAddress} → {order.toAddress}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium">{order.totalCost} ₽</div>
                              <div className="text-xs text-gray-500">{formatDate(order.createdAt)}</div>
                            </div>
                          </div>

                          {order.rating && (
                            <div className="flex items-center space-x-1 mt-2">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Icon
                                  key={i}
                                  name="Star"
                                  className={`w-3 h-3 ${i < order.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                />
                              ))}
                              <span className="text-xs text-gray-500 ml-2">{order.rating}/5</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                    
                    <Link to="/migalki/profile?tab=history">
                      <Button variant="outline" className="w-full mt-4">
                        <Icon name="Eye" className="mr-2" size={16} />
                        Посмотреть всю историю
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Icon name="Car" className="mx-auto mb-4 text-gray-300" size={48} />
                    <p className="text-gray-500 mb-4">У вас пока нет завершенных заказов</p>
                    <Link to="/migalki/order">
                      <Button>
                        <Icon name="Plus" className="mr-2" size={16} />
                        Сделать первый заказ
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Быстрые действия */}
            <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Быстрые действия</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/migalki/order?type=taxi">
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="Car" className="mr-3 text-blue-500" size={20} />
                    Заказать такси
                  </Button>
                </Link>
                <Link to="/migalki/order?type=food">
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="Package" className="mr-3 text-green-500" size={20} />
                    Заказать доставку
                  </Button>
                </Link>
                <Link to="/migalki/order?type=truck">
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="Truck" className="mr-3 text-purple-500" size={20} />
                    Заказать газель
                  </Button>
                </Link>
                <Link to="/migalki/client-ride">
                  <Button variant="outline" className="w-full justify-start bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
                    <Icon name="Eye" className="mr-3 text-purple-500" size={20} />
                    Демо: Экран поездки
                  </Button>
                </Link>
                <Link to="/migalki/profile">
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="Settings" className="mr-3 text-gray-500" size={20} />
                    Настройки
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Статистика */}
            <Card className="border-none shadow-xl bg-gradient-to-br from-yellow-50 to-orange-50">
              <CardHeader>
                <CardTitle className="text-lg">Ваша статистика</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Всего поездок</span>
                  <span className="font-bold text-lg">{orders.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Потрачено</span>
                  <span className="font-bold text-lg text-green-600">
                    {orders.reduce((sum, order) => sum + order.totalCost, 0)} ₽
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Средняя оценка</span>
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" className="text-yellow-400 fill-current" size={16} />
                    <span className="font-bold">
                      {orders.filter(o => o.rating).length > 0 
                        ? (orders.reduce((sum, order) => sum + (order.rating || 0), 0) / orders.filter(o => o.rating).length).toFixed(1)
                        : '—'
                      }
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Telegram */}
            <Card className="border-none shadow-xl bg-gradient-to-r from-blue-50 to-cyan-50">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Icon name="MessageCircle" className="text-blue-500 mt-1" size={20} />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800 mb-1">Telegram уведомления</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Получайте уведомления о статусе заказа в Telegram
                    </p>
                    <Button size="sm" className="w-full bg-blue-500 hover:bg-blue-600">
                      <Icon name="Plus" className="mr-2" size={14} />
                      Привязать Telegram
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Поддержка */}
            <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Icon name="Headphones" className="text-blue-500 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Нужна помощь?</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Наша служба поддержки работает круглосуточно
                    </p>
                    <Button size="sm" variant="outline" className="w-full">
                      <Icon name="MessageCircle" className="mr-2" size={14} />
                      Связаться
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Выход */}
            <Button
              onClick={logout}
              variant="outline"
              className="w-full text-red-600 border-red-200 hover:bg-red-50"
            >
              <Icon name="LogOut" className="mr-2" size={16} />
              Выйти из аккаунта
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;