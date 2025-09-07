import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useTaxiAuth, type TaxiOrder } from '@/contexts/TaxiAuthContext';

interface DriverStats {
  todayEarnings: number;
  todayRides: number;
  weeklyEarnings: number;
  monthlyEarnings: number;
  rating: number;
  totalRides: number;
  balance: number;
  pendingBalance: number;
}

interface WithdrawRequest {
  id: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  processedAt?: Date;
  method: 'card' | 'cash';
}

const DriverDashboard = () => {
  const { user, orders, logout } = useTaxiAuth();
  const [isOnline, setIsOnline] = useState(true);
  const [activeOrders, setActiveOrders] = useState<TaxiOrder[]>([]);
  const [completedOrders, setCompletedOrders] = useState<TaxiOrder[]>([]);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawRequests, setWithdrawRequests] = useState<WithdrawRequest[]>([]);
  
  const [stats, setStats] = useState<DriverStats>({
    todayEarnings: 0,
    todayRides: 0,
    weeklyEarnings: 0,
    monthlyEarnings: 0,
    rating: 4.8,
    totalRides: 0,
    balance: 2450,
    pendingBalance: 350
  });

  useEffect(() => {
    if (user?.role === 'driver') {
      loadDriverData();
    }
  }, [user]);

  const loadDriverData = () => {
    // Фильтруем заказы водителя
    const driverOrders = orders.filter(order => order.driverId === user?.id);
    
    const active = driverOrders.filter(order => 
      ['pending', 'accepted', 'in_progress'].includes(order.status)
    );
    const completed = driverOrders.filter(order => 
      order.status === 'completed'
    );

    setActiveOrders(active);
    setCompletedOrders(completed);

    // Подсчет статистики
    const today = new Date();
    const todayOrders = completed.filter(order => 
      order.completedAt && 
      new Date(order.completedAt).toDateString() === today.toDateString()
    );

    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const weeklyOrders = completed.filter(order => 
      order.completedAt && new Date(order.completedAt) >= weekAgo
    );

    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    const monthlyOrders = completed.filter(order => 
      order.completedAt && new Date(order.completedAt) >= monthAgo
    );

    setStats(prev => ({
      ...prev,
      todayEarnings: todayOrders.reduce((sum, order) => sum + (order.totalCost * 0.8), 0), // 80% водителю
      todayRides: todayOrders.length,
      weeklyEarnings: weeklyOrders.reduce((sum, order) => sum + (order.totalCost * 0.8), 0),
      monthlyEarnings: monthlyOrders.reduce((sum, order) => sum + (order.totalCost * 0.8), 0),
      totalRides: completed.length
    }));

    // Загружаем заявки на вывод
    loadWithdrawRequests();
  };

  const loadWithdrawRequests = () => {
    // Заглушка для заявок на вывод
    const mockRequests: WithdrawRequest[] = [
      {
        id: '1',
        amount: 1500,
        status: 'approved',
        createdAt: new Date(Date.now() - 86400000),
        processedAt: new Date(Date.now() - 43200000),
        method: 'card'
      },
      {
        id: '2',
        amount: 800,
        status: 'pending',
        createdAt: new Date(Date.now() - 3600000),
        method: 'card'
      }
    ];
    setWithdrawRequests(mockRequests);
  };

  const handleWithdraw = async () => {
    const amount = parseInt(withdrawAmount);
    if (!amount || amount <= 0 || amount > stats.balance) {
      alert('Введите корректную сумму');
      return;
    }

    const newRequest: WithdrawRequest = {
      id: Date.now().toString(),
      amount,
      status: 'pending',
      createdAt: new Date(),
      method: 'card'
    };

    setWithdrawRequests(prev => [newRequest, ...prev]);
    setStats(prev => ({
      ...prev,
      balance: prev.balance - amount,
      pendingBalance: prev.pendingBalance + amount
    }));
    setWithdrawAmount('');
  };

  const getStatusBadge = (status: TaxiOrder['status']) => {
    const statusMap = {
      pending: { label: 'Новый заказ', variant: 'default' as const },
      accepted: { label: 'Принят', variant: 'secondary' as const },
      in_progress: { label: 'Выполняется', variant: 'default' as const },
      completed: { label: 'Завершен', variant: 'outline' as const },
      cancelled: { label: 'Отменен', variant: 'destructive' as const }
    };
    return statusMap[status] || statusMap.pending;
  };

  const getWithdrawStatusBadge = (status: WithdrawRequest['status']) => {
    const statusMap = {
      pending: { label: 'Ожидает', variant: 'outline' as const, color: 'yellow' },
      approved: { label: 'Одобрено', variant: 'default' as const, color: 'green' },
      rejected: { label: 'Отклонено', variant: 'destructive' as const, color: 'red' }
    };
    return statusMap[status];
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  if (!user || user.role !== 'driver') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <Icon name="AlertCircle" className="mx-auto mb-4 text-red-400" size={48} />
            <h2 className="text-xl font-semibold mb-2">Доступ запрещен</h2>
            <p className="text-gray-600 mb-4">Эта страница доступна только водителям</p>
            <Link to="/migalki/auth">
              <Button>Войти как водитель</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/migalki" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
              <Icon name="Car" className="text-white" size={16} />
            </div>
            <span className="text-lg font-semibold text-gray-800">Мигалки Водитель</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Button
              variant={isOnline ? "default" : "outline"}
              size="sm"
              onClick={() => setIsOnline(!isOnline)}
              className={isOnline ? "bg-green-500 hover:bg-green-600" : "border-green-500 text-green-600"}
            >
              <div className={`w-2 h-2 rounded-full mr-2 ${isOnline ? 'bg-white' : 'bg-green-500'}`}></div>
              {isOnline ? 'Онлайн' : 'Оффлайн'}
            </Button>
            
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
        <Tabs defaultValue="dashboard" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">Главная</TabsTrigger>
            <TabsTrigger value="orders">Заказы</TabsTrigger>
            <TabsTrigger value="earnings">Заработок</TabsTrigger>
            <TabsTrigger value="support">Поддержка</TabsTrigger>
            <TabsTrigger value="profile">Профиль</TabsTrigger>
          </TabsList>

          {/* Dashboard */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <Icon name="Wallet" className="text-green-600" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Сегодня</p>
                      <p className="text-xl font-bold text-green-600">{Math.round(stats.todayEarnings)} ₽</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Icon name="Car" className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Поездки</p>
                      <p className="text-xl font-bold">{stats.todayRides}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Icon name="Star" className="text-purple-600" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Рейтинг</p>
                      <p className="text-xl font-bold">{stats.rating}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                      <Icon name="Banknote" className="text-yellow-600" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Баланс</p>
                      <p className="text-xl font-bold text-yellow-600">{stats.balance} ₽</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Активные заказы */}
              <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Icon name="Clock" className="text-blue-500" size={24} />
                    <span>Активные заказы</span>
                    {activeOrders.length > 0 && (
                      <Badge variant="secondary">{activeOrders.length}</Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {activeOrders.length > 0 ? (
                    <div className="space-y-3">
                      {activeOrders.slice(0, 3).map((order) => {
                        const status = getStatusBadge(order.status);
                        return (
                          <div key={order.id} className="p-3 border border-gray-200 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <Badge variant={status.variant}>{status.label}</Badge>
                              <span className="font-bold text-green-600">{Math.round(order.totalCost * 0.8)} ₽</span>
                            </div>
                            <div className="text-sm space-y-1">
                              <div className="flex items-center space-x-2">
                                <Icon name="MapPin" className="text-green-500" size={12} />
                                <span className="text-gray-600">{order.fromAddress}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Icon name="MapPin" className="text-red-500" size={12} />
                                <span className="text-gray-600">{order.toAddress}</span>
                              </div>
                            </div>
                            <div className="flex space-x-2 mt-3">
                              <Button size="sm" variant="outline" className="flex-1">
                                <Icon name="Phone" className="mr-1" size={12} />
                                Клиент
                              </Button>
                              <Button size="sm" className="flex-1">
                                <Icon name="Navigation" className="mr-1" size={12} />
                                Маршрут
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Icon name="Car" className="mx-auto mb-4 text-gray-300" size={48} />
                      <p className="text-gray-500 mb-4">Нет активных заказов</p>
                      <p className="text-sm text-gray-400 mb-4">
                        {isOnline ? 'Ожидаем новые заказы...' : 'Включите статус "Онлайн" для получения заказов'}
                      </p>
                      {isOnline && (
                        <Link to="/migalki/driver-order">
                          <Button className="bg-green-500 hover:bg-green-600">
                            <Icon name="Play" className="mr-2" size={16} />
                            Начать работу
                          </Button>
                        </Link>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Заработок */}
              <Card className="border-none shadow-xl bg-gradient-to-br from-green-50 to-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Icon name="TrendingUp" className="text-green-500" size={24} />
                    <span>Заработок</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-white/50 rounded-lg">
                      <p className="text-sm text-gray-600">Неделя</p>
                      <p className="font-bold text-lg">{Math.round(stats.weeklyEarnings)} ₽</p>
                    </div>
                    <div className="text-center p-3 bg-white/50 rounded-lg">
                      <p className="text-sm text-gray-600">Месяц</p>
                      <p className="font-bold text-lg">{Math.round(stats.monthlyEarnings)} ₽</p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Доступно к выводу</span>
                      <span className="font-bold text-green-600">{stats.balance} ₽</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-gray-600">В ожидании</span>
                      <span className="font-medium text-yellow-600">{stats.pendingBalance} ₽</span>
                    </div>
                    <Button className="w-full" onClick={() => setWithdrawAmount(stats.balance.toString())}>
                      <Icon name="Download" className="mr-2" size={16} />
                      Заказать выплату
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Orders */}
          <TabsContent value="orders" className="space-y-6">
            <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>История заказов</CardTitle>
              </CardHeader>
              <CardContent>
                {completedOrders.length > 0 ? (
                  <div className="space-y-3">
                    {completedOrders.map((order) => (
                      <div key={order.id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <Icon name="CheckCircle" className="text-green-500" size={20} />
                            <div>
                              <div className="font-medium">Заказ #{order.id}</div>
                              <div className="text-sm text-gray-500">{formatDate(order.completedAt || order.createdAt)}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-green-600">{Math.round(order.totalCost * 0.8)} ₽</div>
                            <div className="text-sm text-gray-500">{order.distance} км</div>
                          </div>
                        </div>

                        <div className="text-sm space-y-1">
                          <div className="flex items-center space-x-2">
                            <Icon name="MapPin" className="text-green-500" size={12} />
                            <span className="text-gray-600">{order.fromAddress}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Icon name="MapPin" className="text-red-500" size={12} />
                            <span className="text-gray-600">{order.toAddress}</span>
                          </div>
                        </div>

                        {order.rating && (
                          <div className="flex items-center space-x-1 mt-3 pt-3 border-t">
                            <span className="text-sm text-gray-600">Оценка клиента:</span>
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Icon
                                key={i}
                                name="Star"
                                className={`w-4 h-4 ${i < order.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Icon name="History" className="mx-auto mb-4 text-gray-300" size={48} />
                    <p className="text-gray-500">История заказов пуста</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Earnings */}
          <TabsContent value="earnings" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Заказ выплаты */}
              <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Заказать выплату</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Доступно к выводу:</span>
                      <span className="font-bold text-blue-600">{stats.balance} ₽</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="withdrawAmount">Сумма вывода</Label>
                    <Input
                      id="withdrawAmount"
                      type="number"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      placeholder="Введите сумму"
                      max={stats.balance}
                    />
                  </div>

                  <Button onClick={handleWithdraw} className="w-full" disabled={!withdrawAmount || parseInt(withdrawAmount) > stats.balance}>
                    <Icon name="Send" className="mr-2" size={16} />
                    Отправить заявку
                  </Button>

                  <div className="text-xs text-gray-500">
                    * Выплаты обрабатываются в течение 24 часов. Комиссия сервиса составляет 20%.
                  </div>
                </CardContent>
              </Card>

              {/* История выплат */}
              <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>История выплат</CardTitle>
                </CardHeader>
                <CardContent>
                  {withdrawRequests.length > 0 ? (
                    <div className="space-y-3">
                      {withdrawRequests.map((request) => {
                        const statusBadge = getWithdrawStatusBadge(request.status);
                        return (
                          <div key={request.id} className="p-3 border border-gray-200 rounded-lg">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium">{request.amount} ₽</div>
                                <div className="text-sm text-gray-500">{formatDate(request.createdAt)}</div>
                              </div>
                              <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
                            </div>
                            {request.processedAt && (
                              <div className="text-xs text-gray-500 mt-2">
                                Обработано: {formatDate(request.processedAt)}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Icon name="Wallet" className="mx-auto mb-4 text-gray-300" size={48} />
                      <p className="text-gray-500">История выплат пуста</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Support */}
          <TabsContent value="support" className="space-y-6">
            <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Служба поддержки</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                      <Icon name="Phone" className="text-blue-500" size={24} />
                      <div>
                        <p className="font-medium">Телефон поддержки</p>
                        <p className="text-sm text-gray-600">+7 (800) 123-45-67</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                      <Icon name="MessageCircle" className="text-green-500" size={24} />
                      <div>
                        <p className="font-medium">Онлайн чат</p>
                        <p className="text-sm text-gray-600">Доступен 24/7</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
                      <Icon name="Mail" className="text-purple-500" size={24} />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-sm text-gray-600">support@migalki.ru</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Часто задаваемые вопросы</h3>
                    
                    <div className="space-y-3">
                      <details className="p-3 border rounded-lg">
                        <summary className="cursor-pointer font-medium">Как получить выплату?</summary>
                        <p className="mt-2 text-sm text-gray-600">
                          Создайте заявку на вывод в разделе "Заработок". Выплаты обрабатываются в течение 24 часов.
                        </p>
                      </details>

                      <details className="p-3 border rounded-lg">
                        <summary className="cursor-pointer font-medium">Какая комиссия сервиса?</summary>
                        <p className="mt-2 text-sm text-gray-600">
                          Комиссия составляет 20% от стоимости поездки. 80% остается водителю.
                        </p>
                      </details>

                      <details className="p-3 border rounded-lg">
                        <summary className="cursor-pointer font-medium">Как повысить рейтинг?</summary>
                        <p className="mt-2 text-sm text-gray-600">
                          Будьте вежливы с клиентами, поддерживайте чистоту в автомобиле, приезжайте вовремя.
                        </p>
                      </details>
                    </div>

                    <Button className="w-full">
                      <Icon name="MessageCircle" className="mr-2" size={16} />
                      Открыть чат поддержки
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Профиль водителя</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="text-xl">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold">{user.name}</h3>
                      <p className="text-gray-600">{user.email}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            className={`w-4 h-4 ${i < Math.floor(stats.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-2">{stats.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Телефон</Label>
                      <p className="text-gray-800">{user.phone}</p>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Всего поездок</Label>
                      <p className="text-gray-800">{stats.totalRides}</p>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-500">На сервисе с</Label>
                      <p className="text-gray-800">{new Intl.DateTimeFormat('ru-RU', { year: 'numeric', month: 'long' }).format(new Date(user.createdAt))}</p>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    <Icon name="Edit" className="mr-2" size={16} />
                    Редактировать профиль
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Автомобиль</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Icon name="Car" className="text-blue-600" size={20} />
                      </div>
                      <div>
                        <p className="font-medium">{user.carModel || 'Не указано'}</p>
                        <p className="text-sm text-gray-600">Модель</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Icon name="Hash" className="text-green-600" size={20} />
                      </div>
                      <div>
                        <p className="font-medium">{user.carNumber || 'Не указано'}</p>
                        <p className="text-sm text-gray-600">Номер</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Icon name="Palette" className="text-purple-600" size={20} />
                      </div>
                      <div>
                        <p className="font-medium">{user.carColor || 'Не указано'}</p>
                        <p className="text-sm text-gray-600">Цвет</p>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    <Icon name="Settings" className="mr-2" size={16} />
                    Изменить данные автомобиля
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Danger Zone */}
            <Card className="border-red-200 bg-red-50/50">
              <CardHeader>
                <CardTitle className="text-red-800">Опасная зона</CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={logout}
                  variant="outline"
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  <Icon name="LogOut" className="mr-2" size={16} />
                  Выйти из аккаунта
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DriverDashboard;