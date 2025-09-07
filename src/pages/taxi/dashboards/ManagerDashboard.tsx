import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useTaxiAuth, type TaxiOrder, type TaxiUser } from '@/contexts/TaxiAuthContext';

interface WithdrawRequest {
  id: string;
  driverId: string;
  driverName: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  processedAt?: Date;
  method: 'card' | 'cash';
}

interface SupportTicket {
  id: string;
  userId: string;
  userName: string;
  userRole: 'client' | 'driver';
  subject: string;
  status: 'open' | 'in_progress' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  lastMessage: string;
  unreadCount: number;
}

const ManagerDashboard = () => {
  const { user, orders, logout } = useTaxiAuth();
  const [activeOrders, setActiveOrders] = useState<TaxiOrder[]>([]);
  const [withdrawRequests, setWithdrawRequests] = useState<WithdrawRequest[]>([]);
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([]);
  const [drivers, setDrivers] = useState<TaxiUser[]>([]);
  const [stats, setStats] = useState({
    todayOrders: 0,
    todayRevenue: 0,
    activeDrivers: 0,
    pendingPayouts: 0
  });

  // Форма регистрации нового водителя
  const [newDriverForm, setNewDriverForm] = useState({
    name: '',
    email: '',
    phone: '',
    carModel: '',
    carNumber: '',
    carColor: '',
    password: ''
  });

  useEffect(() => {
    if (user?.role === 'manager') {
      loadManagerData();
    }
  }, [user]);

  const loadManagerData = () => {
    // Активные заказы
    const active = orders.filter(order => 
      ['pending', 'accepted', 'in_progress'].includes(order.status)
    );
    setActiveOrders(active);

    // Статистика за сегодня
    const today = new Date();
    const todayOrders = orders.filter(order => 
      new Date(order.createdAt).toDateString() === today.toDateString()
    );
    
    setStats({
      todayOrders: todayOrders.length,
      todayRevenue: todayOrders.reduce((sum, order) => sum + order.totalCost, 0),
      activeDrivers: 15, // Заглушка
      pendingPayouts: 3 // Заглушка
    });

    loadWithdrawRequests();
    loadSupportTickets();
    loadDrivers();
  };

  const loadWithdrawRequests = () => {
    const mockRequests: WithdrawRequest[] = [
      {
        id: '1',
        driverId: 'driver-1',
        driverName: 'Алексей Петров',
        amount: 2500,
        status: 'pending',
        createdAt: new Date(Date.now() - 3600000),
        method: 'card'
      },
      {
        id: '2',
        driverId: 'driver-2',
        driverName: 'Иван Сидоров',
        amount: 1800,
        status: 'pending',
        createdAt: new Date(Date.now() - 7200000),
        method: 'card'
      },
      {
        id: '3',
        driverId: 'driver-3',
        driverName: 'Михаил Козлов',
        amount: 3200,
        status: 'approved',
        createdAt: new Date(Date.now() - 86400000),
        processedAt: new Date(Date.now() - 43200000),
        method: 'card'
      }
    ];
    setWithdrawRequests(mockRequests);
  };

  const loadSupportTickets = () => {
    const mockTickets: SupportTicket[] = [
      {
        id: '1',
        userId: 'client-1',
        userName: 'Мария Иванова',
        userRole: 'client',
        subject: 'Проблема с оплатой',
        status: 'open',
        priority: 'high',
        createdAt: new Date(Date.now() - 1800000),
        lastMessage: 'Не прошла оплата картой, помогите разобраться',
        unreadCount: 2
      },
      {
        id: '2',
        userId: 'driver-1',
        userName: 'Алексей Петров',
        userRole: 'driver',
        subject: 'Вопрос по выплатам',
        status: 'in_progress',
        priority: 'medium',
        createdAt: new Date(Date.now() - 3600000),
        lastMessage: 'Когда будет обработана заявка на вывод?',
        unreadCount: 1
      },
      {
        id: '3',
        userId: 'client-2',
        userName: 'Дмитрий Кузнецов',
        userRole: 'client',
        subject: 'Отзыв о поездке',
        status: 'open',
        priority: 'low',
        createdAt: new Date(Date.now() - 7200000),
        lastMessage: 'Хочу оставить благодарность водителю',
        unreadCount: 0
      }
    ];
    setSupportTickets(mockTickets);
  };

  const loadDrivers = () => {
    const mockDrivers: TaxiUser[] = [
      {
        id: 'driver-1',
        name: 'Алексей Петров',
        email: 'alexey@example.com',
        phone: '+7 (900) 123-45-67',
        role: 'driver',
        isActive: true,
        createdAt: new Date(Date.now() - 2592000000), // месяц назад
        carModel: 'Toyota Camry',
        carNumber: 'А123ВС52',
        carColor: 'Белый',
        rating: 4.8
      },
      {
        id: 'driver-2',
        name: 'Иван Сидоров',
        email: 'ivan@example.com',
        phone: '+7 (900) 234-56-78',
        role: 'driver',
        isActive: false,
        createdAt: new Date(Date.now() - 1296000000), // 2 недели назад
        carModel: 'Hyundai Solaris',
        carNumber: 'К456ХМ52',
        carColor: 'Черный',
        rating: 4.6
      }
    ];
    setDrivers(mockDrivers);
  };

  const handleWithdrawAction = (requestId: string, action: 'approve' | 'reject') => {
    setWithdrawRequests(prev => 
      prev.map(request => 
        request.id === requestId 
          ? { 
              ...request, 
              status: action === 'approve' ? 'approved' : 'rejected',
              processedAt: new Date()
            }
          : request
      )
    );
  };

  const handleRegisterDriver = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Здесь будет API вызов для регистрации водителя
      const newDriver: TaxiUser = {
        id: `driver-${Date.now()}`,
        ...newDriverForm,
        role: 'driver',
        isActive: true,
        createdAt: new Date(),
        rating: 5.0
      };

      setDrivers(prev => [newDriver, ...prev]);
      setNewDriverForm({
        name: '',
        email: '',
        phone: '',
        carModel: '',
        carNumber: '',
        carColor: '',
        password: ''
      });

      alert('Водитель успешно зарегистрирован!');
    } catch (error) {
      console.error('Ошибка регистрации водителя:', error);
      alert('Ошибка при регистрации водителя');
    }
  };

  const getStatusBadge = (status: TaxiOrder['status']) => {
    const statusMap = {
      pending: { label: 'Поиск водителя', variant: 'outline' as const },
      accepted: { label: 'Водитель найден', variant: 'secondary' as const },
      in_progress: { label: 'В пути', variant: 'default' as const },
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

  const getSupportPriorityBadge = (priority: SupportTicket['priority']) => {
    const priorityMap = {
      low: { label: 'Низкий', variant: 'outline' as const, color: 'gray' },
      medium: { label: 'Средний', variant: 'secondary' as const, color: 'blue' },
      high: { label: 'Высокий', variant: 'destructive' as const, color: 'red' }
    };
    return priorityMap[priority];
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  if (!user || user.role !== 'manager') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <Icon name="AlertCircle" className="mx-auto mb-4 text-red-400" size={48} />
            <h2 className="text-xl font-semibold mb-2">Доступ запрещен</h2>
            <p className="text-gray-600 mb-4">Эта страница доступна только менеджерам</p>
            <Link to="/migalki/auth">
              <Button>Войти как менеджер</Button>
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
            <span className="text-lg font-semibold text-gray-800">Мигалки Менеджер</span>
          </Link>

          <div className="flex items-center space-x-4">
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
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Обзор</TabsTrigger>
            <TabsTrigger value="orders">Заказы</TabsTrigger>
            <TabsTrigger value="payouts">Выплаты</TabsTrigger>
            <TabsTrigger value="drivers">Водители</TabsTrigger>
            <TabsTrigger value="support">Поддержка</TabsTrigger>
            <TabsTrigger value="profile">Профиль</TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Icon name="ShoppingCart" className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Заказы сегодня</p>
                      <p className="text-xl font-bold">{stats.todayOrders}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <Icon name="DollarSign" className="text-green-600" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Выручка</p>
                      <p className="text-xl font-bold text-green-600">{Math.round(stats.todayRevenue)} ₽</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Icon name="Users" className="text-purple-600" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Активных водителей</p>
                      <p className="text-xl font-bold">{stats.activeDrivers}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                      <Icon name="Clock" className="text-yellow-600" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Ожидают выплат</p>
                      <p className="text-xl font-bold text-yellow-600">{stats.pendingPayouts}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Orders */}
              <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Последние заказы</CardTitle>
                </CardHeader>
                <CardContent>
                  {activeOrders.slice(0, 5).map((order) => {
                    const status = getStatusBadge(order.status);
                    return (
                      <div key={order.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg mb-3 last:mb-0">
                        <div>
                          <div className="font-medium">#{order.id}</div>
                          <div className="text-sm text-gray-500">{formatDate(order.createdAt)}</div>
                        </div>
                        <div className="text-right">
                          <Badge variant={status.variant}>{status.label}</Badge>
                          <div className="text-sm font-medium mt-1">{order.totalCost} ₽</div>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Recent Support Tickets */}
              <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <span>Обращения в поддержку</span>
                    {supportTickets.filter(t => t.unreadCount > 0).length > 0 && (
                      <Badge variant="destructive">
                        {supportTickets.filter(t => t.unreadCount > 0).length}
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {supportTickets.slice(0, 5).map((ticket) => {
                    const priority = getSupportPriorityBadge(ticket.priority);
                    return (
                      <div key={ticket.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg mb-3 last:mb-0">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{ticket.subject}</span>
                            {ticket.unreadCount > 0 && (
                              <Badge variant="destructive" className="text-xs px-1">
                                {ticket.unreadCount}
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">{ticket.userName}</div>
                        </div>
                        <Badge variant={priority.variant}>{priority.label}</Badge>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Orders */}
          <TabsContent value="orders" className="space-y-6">
            <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Управление заказами</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.slice(0, 10).map((order) => {
                    const status = getStatusBadge(order.status);
                    return (
                      <div key={order.id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div>
                              <div className="font-medium">Заказ #{order.id}</div>
                              <div className="text-sm text-gray-500">{formatDate(order.createdAt)}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Badge variant={status.variant}>{status.label}</Badge>
                            <span className="font-bold text-green-600">{order.totalCost} ₽</span>
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

                        {order.status === 'pending' && (
                          <div className="flex space-x-2 mt-3">
                            <Button size="sm" variant="outline" className="flex-1">
                              <Icon name="Search" className="mr-1" size={12} />
                              Найти водителя
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1 text-red-600">
                              <Icon name="X" className="mr-1" size={12} />
                              Отменить
                            </Button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payouts */}
          <TabsContent value="payouts" className="space-y-6">
            <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Заявки на выплаты</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {withdrawRequests.map((request) => {
                    const statusBadge = getWithdrawStatusBadge(request.status);
                    return (
                      <div key={request.id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-10 h-10">
                              <AvatarFallback>
                                {request.driverName.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{request.driverName}</div>
                              <div className="text-sm text-gray-500">{formatDate(request.createdAt)}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-lg">{request.amount} ₽</div>
                            <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
                          </div>
                        </div>

                        {request.status === 'pending' && (
                          <div className="flex space-x-2 mt-3">
                            <Button
                              size="sm"
                              onClick={() => handleWithdrawAction(request.id, 'approve')}
                              className="flex-1 bg-green-500 hover:bg-green-600"
                            >
                              <Icon name="Check" className="mr-1" size={12} />
                              Одобрить
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleWithdrawAction(request.id, 'reject')}
                              className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                            >
                              <Icon name="X" className="mr-1" size={12} />
                              Отклонить
                            </Button>
                          </div>
                        )}

                        {request.processedAt && (
                          <div className="text-xs text-gray-500 mt-2">
                            Обработано: {formatDate(request.processedAt)}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Drivers */}
          <TabsContent value="drivers" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Register New Driver */}
              <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Регистрация нового водителя</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRegisterDriver} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Полное имя</Label>
                        <Input
                          id="name"
                          value={newDriverForm.name}
                          onChange={(e) => setNewDriverForm({ ...newDriverForm, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Телефон</Label>
                        <Input
                          id="phone"
                          value={newDriverForm.phone}
                          onChange={(e) => setNewDriverForm({ ...newDriverForm, phone: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newDriverForm.email}
                        onChange={(e) => setNewDriverForm({ ...newDriverForm, email: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Временный пароль</Label>
                      <Input
                        id="password"
                        type="password"
                        value={newDriverForm.password}
                        onChange={(e) => setNewDriverForm({ ...newDriverForm, password: e.target.value })}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="carModel">Модель авто</Label>
                        <Input
                          id="carModel"
                          value={newDriverForm.carModel}
                          onChange={(e) => setNewDriverForm({ ...newDriverForm, carModel: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="carNumber">Номер</Label>
                        <Input
                          id="carNumber"
                          value={newDriverForm.carNumber}
                          onChange={(e) => setNewDriverForm({ ...newDriverForm, carNumber: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="carColor">Цвет</Label>
                        <Input
                          id="carColor"
                          value={newDriverForm.carColor}
                          onChange={(e) => setNewDriverForm({ ...newDriverForm, carColor: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full">
                      <Icon name="UserPlus" className="mr-2" size={16} />
                      Зарегистрировать водителя
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Drivers List */}
              <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Зарегистрированные водители</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {drivers.map((driver) => (
                      <div key={driver.id} className="p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={driver.avatar} />
                              <AvatarFallback>
                                {driver.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{driver.name}</div>
                              <div className="text-sm text-gray-500">
                                {driver.carModel} • {driver.carNumber}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant={driver.isActive ? 'default' : 'outline'}>
                              {driver.isActive ? 'Активен' : 'Неактивен'}
                            </Badge>
                            <div className="text-sm text-gray-500 mt-1">
                              ⭐ {driver.rating}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Support */}
          <TabsContent value="support" className="space-y-6">
            <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Обращения в поддержку</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {supportTickets.map((ticket) => {
                    const priority = getSupportPriorityBadge(ticket.priority);
                    return (
                      <div key={ticket.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback>
                                {ticket.userName.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="font-medium">{ticket.subject}</span>
                                {ticket.unreadCount > 0 && (
                                  <Badge variant="destructive" className="text-xs px-1">
                                    {ticket.unreadCount}
                                  </Badge>
                                )}
                              </div>
                              <div className="text-sm text-gray-500">
                                {ticket.userName} • {ticket.userRole === 'driver' ? 'Водитель' : 'Клиент'}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant={priority.variant}>{priority.label}</Badge>
                            <div className="text-sm text-gray-500 mt-1">
                              {formatDate(ticket.createdAt)}
                            </div>
                          </div>
                        </div>

                        <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                          {ticket.lastMessage}
                        </div>

                        <div className="flex space-x-2 mt-3">
                          <Button size="sm" className="flex-1">
                            <Icon name="MessageCircle" className="mr-1" size={12} />
                            Ответить
                          </Button>
                          {ticket.status !== 'closed' && (
                            <Button size="sm" variant="outline" className="flex-1">
                              <Icon name="Check" className="mr-1" size={12} />
                              Закрыть
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Профиль менеджера</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
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
                    <Badge variant="outline">Менеджер</Badge>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Телефон</Label>
                      <p className="text-gray-800">{user.phone}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Дата создания</Label>
                      <p className="text-gray-800">{new Intl.DateTimeFormat('ru-RU').format(user.createdAt)}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button variant="outline" className="w-full">
                      <Icon name="Edit" className="mr-2" size={16} />
                      Редактировать профиль
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Icon name="Key" className="mr-2" size={16} />
                      Сменить пароль
                    </Button>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <Button
                    onClick={logout}
                    variant="outline"
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <Icon name="LogOut" className="mr-2" size={16} />
                    Выйти из аккаунта
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ManagerDashboard;