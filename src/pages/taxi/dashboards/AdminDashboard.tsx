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

interface AdminStats {
  totalUsers: number;
  totalDrivers: number;
  totalOrders: number;
  totalRevenue: number;
  todayOrders: number;
  todayRevenue: number;
  activeDrivers: number;
  pendingPayouts: number;
  openTickets: number;
}

interface SystemUser extends TaxiUser {
  status: 'active' | 'banned' | 'pending';
  lastActivity: Date;
  totalOrders?: number;
  totalEarnings?: number;
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
  assignedTo?: string;
}

const AdminDashboard = () => {
  const { user, orders, logout } = useTaxiAuth();
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalDrivers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    todayOrders: 0,
    todayRevenue: 0,
    activeDrivers: 0,
    pendingPayouts: 0,
    openTickets: 0
  });

  const [allUsers, setAllUsers] = useState<SystemUser[]>([]);
  const [allOrders, setAllOrders] = useState<TaxiOrder[]>([]);
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([]);
  const [selectedUser, setSelectedUser] = useState<SystemUser | null>(null);
  const [userFilter, setUserFilter] = useState<'all' | 'clients' | 'drivers' | 'managers'>('all');
  const [orderFilter, setOrderFilter] = useState<'all' | 'pending' | 'active' | 'completed'>('all');

  useEffect(() => {
    if (user?.role === 'admin') {
      loadAdminData();
    }
  }, [user]);

  const loadAdminData = () => {
    // Load system statistics
    const today = new Date();
    const todayOrders = orders.filter(order => 
      new Date(order.createdAt).toDateString() === today.toDateString()
    );

    setStats({
      totalUsers: 1247, // Mock data
      totalDrivers: 89,
      totalOrders: orders.length + 3456,
      totalRevenue: 2850000,
      todayOrders: todayOrders.length + 45,
      todayRevenue: todayOrders.reduce((sum, order) => sum + order.totalCost, 0) + 12500,
      activeDrivers: 67,
      pendingPayouts: 12,
      openTickets: 8
    });

    loadSystemUsers();
    loadAllOrders();
    loadAllSupportTickets();
  };

  const loadSystemUsers = () => {
    const mockUsers: SystemUser[] = [
      {
        id: 'client-1',
        name: 'Мария Иванова',
        email: 'maria@example.com',
        phone: '+7 (900) 111-22-33',
        role: 'client',
        isActive: true,
        status: 'active',
        createdAt: new Date(Date.now() - 2592000000), // месяц назад
        lastActivity: new Date(Date.now() - 86400000), // день назад
        totalOrders: 23,
        rating: 4.9
      },
      {
        id: 'driver-1',
        name: 'Алексей Петров',
        email: 'alexey@example.com',
        phone: '+7 (900) 123-45-67',
        role: 'driver',
        isActive: true,
        status: 'active',
        createdAt: new Date(Date.now() - 5184000000), // 2 месяца назад
        lastActivity: new Date(Date.now() - 3600000), // час назад
        carModel: 'Toyota Camry',
        carNumber: 'А123ВС52',
        carColor: 'Белый',
        rating: 4.8,
        totalOrders: 156,
        totalEarnings: 187200
      },
      {
        id: 'manager-1',
        name: 'Ольга Сидорова',
        email: 'olga@example.com',
        phone: '+7 (900) 555-66-77',
        role: 'manager',
        isActive: true,
        status: 'active',
        createdAt: new Date(Date.now() - 7776000000), // 3 месяца назад
        lastActivity: new Date(Date.now() - 1800000) // 30 мин назад
      },
      {
        id: 'driver-2',
        name: 'Иван Кузнецов',
        email: 'ivan@example.com',
        phone: '+7 (900) 888-99-00',
        role: 'driver',
        isActive: false,
        status: 'banned',
        createdAt: new Date(Date.now() - 1296000000), // 2 недели назад
        lastActivity: new Date(Date.now() - 604800000), // неделю назад
        carModel: 'Lada Vesta',
        carNumber: 'К789МН52',
        carColor: 'Синий',
        rating: 3.2,
        totalOrders: 12,
        totalEarnings: 8400
      }
    ];
    setAllUsers(mockUsers);
  };

  const loadAllOrders = () => {
    // Используем существующие заказы и добавляем mock данные
    const mockOrders: TaxiOrder[] = [
      ...orders,
      {
        id: 'order-mock-1',
        clientId: 'client-1',
        driverId: 'driver-1',
        type: 'taxi',
        status: 'completed',
        fromAddress: 'ул. Горького, 5',
        fromCoordinates: [56.2965, 44.0048],
        toAddress: 'ул. Белинского, 34',
        toCoordinates: [56.3022, 44.0155],
        baseCost: 250,
        distanceCost: 80,
        nightSurcharge: 0,
        holidaySurcharge: 0,
        totalCost: 330,
        distance: 4,
        createdAt: new Date(Date.now() - 7200000), // 2 часа назад
        completedAt: new Date(Date.now() - 5400000), // 1.5 часа назад
        passengerCount: 1,
        paymentMethod: 'card',
        rating: 5
      }
    ];
    setAllOrders(mockOrders);
  };

  const loadAllSupportTickets = () => {
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
        lastMessage: 'Не могу оплатить поездку картой',
        unreadCount: 2,
        assignedTo: 'manager-1'
      },
      {
        id: '2',
        userId: 'driver-1',
        userName: 'Алексей Петров',
        userRole: 'driver',
        subject: 'Задержка выплат',
        status: 'in_progress',
        priority: 'medium',
        createdAt: new Date(Date.now() - 3600000),
        lastMessage: 'Когда будет выплата за прошлую неделю?',
        unreadCount: 1,
        assignedTo: 'manager-1'
      },
      {
        id: '3',
        userId: 'client-2',
        userName: 'Дмитрий Новиков',
        userRole: 'client',
        subject: 'Благодарность водителю',
        status: 'closed',
        priority: 'low',
        createdAt: new Date(Date.now() - 7200000),
        lastMessage: 'Отличный сервис, спасибо!',
        unreadCount: 0
      }
    ];
    setSupportTickets(mockTickets);
  };

  const getStatusBadge = (status: string, type: 'user' | 'order' | 'ticket') => {
    if (type === 'user') {
      const statusMap = {
        active: { label: 'Активный', variant: 'default' as const, color: 'green' },
        banned: { label: 'Заблокирован', variant: 'destructive' as const, color: 'red' },
        pending: { label: 'Ожидает', variant: 'outline' as const, color: 'yellow' }
      };
      return statusMap[status as keyof typeof statusMap] || statusMap.active;
    }

    if (type === 'order') {
      const statusMap = {
        pending: { label: 'Поиск водителя', variant: 'outline' as const },
        accepted: { label: 'Водитель найден', variant: 'secondary' as const },
        in_progress: { label: 'В пути', variant: 'default' as const },
        completed: { label: 'Завершен', variant: 'outline' as const },
        cancelled: { label: 'Отменен', variant: 'destructive' as const }
      };
      return statusMap[status as keyof typeof statusMap] || statusMap.pending;
    }

    // ticket
    const statusMap = {
      open: { label: 'Открыт', variant: 'destructive' as const },
      in_progress: { label: 'В работе', variant: 'default' as const },
      closed: { label: 'Закрыт', variant: 'outline' as const }
    };
    return statusMap[status as keyof typeof statusMap] || statusMap.open;
  };

  const getPriorityBadge = (priority: string) => {
    const priorityMap = {
      low: { label: 'Низкий', variant: 'outline' as const },
      medium: { label: 'Средний', variant: 'secondary' as const },
      high: { label: 'Высокий', variant: 'destructive' as const }
    };
    return priorityMap[priority as keyof typeof priorityMap] || priorityMap.medium;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const filteredUsers = allUsers.filter(u => {
    if (userFilter === 'all') return true;
    if (userFilter === 'clients') return u.role === 'client';
    if (userFilter === 'drivers') return u.role === 'driver';
    if (userFilter === 'managers') return u.role === 'manager';
    return true;
  });

  const filteredOrders = allOrders.filter(o => {
    if (orderFilter === 'all') return true;
    if (orderFilter === 'pending') return o.status === 'pending';
    if (orderFilter === 'active') return ['accepted', 'in_progress'].includes(o.status);
    if (orderFilter === 'completed') return ['completed', 'cancelled'].includes(o.status);
    return true;
  });

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <Icon name="Shield" className="mx-auto mb-4 text-red-400" size={48} />
            <h2 className="text-xl font-semibold mb-2">Доступ запрещен</h2>
            <p className="text-gray-600 mb-4">Эта страница доступна только администраторам</p>
            <p className="text-sm text-gray-500">Регистрация администраторов недоступна</p>
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
              <Icon name="Shield" className="text-white" size={16} />
            </div>
            <span className="text-lg font-semibold text-gray-800">Мигалки Админ</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="border-red-500 text-red-600">
              СУПЕР АДМИН
            </Badge>
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
            <TabsTrigger value="users">Пользователи</TabsTrigger>
            <TabsTrigger value="orders">Заказы</TabsTrigger>
            <TabsTrigger value="support">Поддержка</TabsTrigger>
            <TabsTrigger value="analytics">Аналитика</TabsTrigger>
            <TabsTrigger value="settings">Настройки</TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview" className="space-y-6">
            {/* Main Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Icon name="Users" className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Всего пользователей</p>
                      <p className="text-xl font-bold">{stats.totalUsers.toLocaleString()}</p>
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
                      <p className="text-sm text-gray-600">Общая выручка</p>
                      <p className="text-xl font-bold text-green-600">{formatCurrency(stats.totalRevenue)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Icon name="ShoppingCart" className="text-purple-600" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Всего заказов</p>
                      <p className="text-xl font-bold">{stats.totalOrders.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                      <Icon name="Car" className="text-yellow-600" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Активных водителей</p>
                      <p className="text-xl font-bold text-yellow-600">{stats.activeDrivers}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Today's Stats */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-none shadow-xl bg-gradient-to-br from-blue-50 to-purple-50">
                <CardHeader>
                  <CardTitle>Сегодняшняя статистика</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Заказы сегодня</span>
                      <span className="font-bold text-2xl">{stats.todayOrders}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Выручка сегодня</span>
                      <span className="font-bold text-2xl text-green-600">{formatCurrency(stats.todayRevenue)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Средний чек</span>
                      <span className="font-bold text-xl">
                        {stats.todayOrders > 0 ? formatCurrency(stats.todayRevenue / stats.todayOrders) : '—'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl bg-gradient-to-br from-yellow-50 to-orange-50">
                <CardHeader>
                  <CardTitle>Требуют внимания</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Icon name="AlertTriangle" className="text-yellow-500" size={16} />
                        <span className="text-sm">Ожидают выплат</span>
                      </div>
                      <Badge variant="outline">{stats.pendingPayouts}</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Icon name="MessageCircle" className="text-red-500" size={16} />
                        <span className="text-sm">Открытые обращения</span>
                      </div>
                      <Badge variant="destructive">{stats.openTickets}</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Icon name="Clock" className="text-blue-500" size={16} />
                        <span className="text-sm">Заказы в ожидании</span>
                      </div>
                      <Badge variant="secondary">
                        {filteredOrders.filter(o => o.status === 'pending').length}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Управление пользователями</h2>
                <p className="text-gray-600">Всего пользователей: {filteredUsers.length}</p>
              </div>
              <Select value={userFilter} onValueChange={(value: any) => setUserFilter(value)}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все пользователи</SelectItem>
                  <SelectItem value="clients">Клиенты</SelectItem>
                  <SelectItem value="drivers">Водители</SelectItem>
                  <SelectItem value="managers">Менеджеры</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {filteredUsers.map((systemUser) => {
                    const statusBadge = getStatusBadge(systemUser.status, 'user');
                    return (
                      <div key={systemUser.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={systemUser.avatar} />
                              <AvatarFallback>
                                {systemUser.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            
                            <div>
                              <div className="flex items-center space-x-2">
                                <h3 className="font-semibold">{systemUser.name}</h3>
                                <Badge variant="outline">
                                  {systemUser.role === 'client' ? 'Клиент' : 
                                   systemUser.role === 'driver' ? 'Водитель' : 
                                   systemUser.role === 'manager' ? 'Менеджер' : 'Админ'}
                                </Badge>
                                <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
                              </div>
                              <p className="text-sm text-gray-600">{systemUser.email}</p>
                              <p className="text-sm text-gray-500">
                                Регистрация: {formatDate(systemUser.createdAt)} • 
                                Активность: {formatDate(systemUser.lastActivity)}
                              </p>
                              {systemUser.carModel && (
                                <p className="text-sm text-gray-500">
                                  {systemUser.carModel} • {systemUser.carNumber} • {systemUser.carColor}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="text-right">
                            {systemUser.rating && (
                              <div className="flex items-center space-x-1 mb-1">
                                <Icon name="Star" className="text-yellow-400 fill-current" size={14} />
                                <span className="text-sm font-medium">{systemUser.rating}</span>
                              </div>
                            )}
                            {systemUser.totalOrders && (
                              <div className="text-sm text-gray-600">
                                Заказов: {systemUser.totalOrders}
                              </div>
                            )}
                            {systemUser.totalEarnings && (
                              <div className="text-sm text-gray-600">
                                Заработок: {formatCurrency(systemUser.totalEarnings)}
                              </div>
                            )}
                            
                            <div className="flex space-x-2 mt-2">
                              <Button size="sm" variant="outline" onClick={() => setSelectedUser(systemUser)}>
                                <Icon name="Edit" size={14} />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                className={systemUser.status === 'banned' ? 'text-green-600' : 'text-red-600'}
                              >
                                <Icon name={systemUser.status === 'banned' ? 'Unlock' : 'Lock'} size={14} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders */}
          <TabsContent value="orders" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Все заказы</h2>
                <p className="text-gray-600">Всего заказов: {filteredOrders.length}</p>
              </div>
              <Select value={orderFilter} onValueChange={(value: any) => setOrderFilter(value)}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все заказы</SelectItem>
                  <SelectItem value="pending">Ожидают</SelectItem>
                  <SelectItem value="active">Активные</SelectItem>
                  <SelectItem value="completed">Завершенные</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {filteredOrders.slice(0, 20).map((order) => {
                    const statusBadge = getStatusBadge(order.status, 'order');
                    return (
                      <div key={order.id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">Заказ #{order.id}</span>
                              <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
                            </div>
                            <p className="text-sm text-gray-500">
                              {formatDate(order.createdAt)} • ID клиента: {order.clientId}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-green-600 text-lg">{formatCurrency(order.totalCost)}</div>
                            <div className="text-sm text-gray-500">{order.distance} км</div>
                          </div>
                        </div>

                        <div className="text-sm space-y-1 mb-3">
                          <div className="flex items-center space-x-2">
                            <Icon name="MapPin" className="text-green-500" size={12} />
                            <span className="text-gray-600">{order.fromAddress}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Icon name="MapPin" className="text-red-500" size={12} />
                            <span className="text-gray-600">{order.toAddress}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm">
                            <span>Тип: {order.type === 'taxi' ? 'Такси' : order.type === 'food' ? 'Еда' : 'Газель'}</span>
                            <span>Оплата: {order.paymentMethod === 'card' ? 'Карта' : 'Наличные'}</span>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Icon name="Eye" className="mr-1" size={12} />
                              Детали
                            </Button>
                            {order.status === 'pending' && (
                              <Button size="sm" variant="outline" className="text-red-600">
                                <Icon name="X" className="mr-1" size={12} />
                                Отменить
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Support */}
          <TabsContent value="support" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Система поддержки</h2>
              <p className="text-gray-600">Управление всеми обращениями пользователей</p>
            </div>

            <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {supportTickets.map((ticket) => {
                    const statusBadge = getStatusBadge(ticket.status, 'ticket');
                    const priorityBadge = getPriorityBadge(ticket.priority);
                    
                    return (
                      <div key={ticket.id} className="p-4 border border-gray-200 rounded-lg">
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
                              <p className="text-sm text-gray-500">
                                {ticket.userName} • {ticket.userRole === 'driver' ? 'Водитель' : 'Клиент'} • 
                                {formatDate(ticket.createdAt)}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Badge variant={priorityBadge.variant}>{priorityBadge.label}</Badge>
                            <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
                          </div>
                        </div>

                        <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded mb-3">
                          {ticket.lastMessage}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500">
                            {ticket.assignedTo && `Назначен: ${ticket.assignedTo}`}
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Icon name="MessageCircle" className="mr-1" size={12} />
                              Ответить
                            </Button>
                            <Button size="sm" variant="outline">
                              <Icon name="User" className="mr-1" size={12} />
                              Назначить
                            </Button>
                            {ticket.status !== 'closed' && (
                              <Button size="sm" variant="outline">
                                <Icon name="Check" className="mr-1" size={12} />
                                Закрыть
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Аналитика и отчеты</h2>
              <p className="text-gray-600">Детальная статистика работы сервиса</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Финансовая статистика</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Общая выручка</span>
                      <span className="font-bold">{formatCurrency(stats.totalRevenue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Комиссия сервиса (20%)</span>
                      <span className="font-bold text-green-600">
                        {formatCurrency(stats.totalRevenue * 0.2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Выплачено водителям (80%)</span>
                      <span className="font-bold">{formatCurrency(stats.totalRevenue * 0.8)}</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between text-lg">
                        <span>Средний чек</span>
                        <span className="font-bold">
                          {formatCurrency(stats.totalRevenue / stats.totalOrders)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Операционная статистика</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Заказов на одного водителя</span>
                      <span className="font-bold">
                        {Math.round(stats.totalOrders / stats.totalDrivers)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Конверсия в заказ</span>
                      <span className="font-bold">73%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Средний рейтинг сервиса</span>
                      <span className="font-bold flex items-center">
                        4.6 <Icon name="Star" className="text-yellow-400 fill-current ml-1" size={16} />
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Повторные заказы</span>
                      <span className="font-bold">68%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Системные настройки</h2>
              <p className="text-gray-600">Конфигурация и управление системой</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Тарифы и комиссии</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Комиссия сервиса (%)</Label>
                    <Input defaultValue="20" type="number" />
                  </div>
                  <div className="space-y-2">
                    <Label>Базовая ставка Дзержинск (₽)</Label>
                    <Input defaultValue="200" type="number" />
                  </div>
                  <div className="space-y-2">
                    <Label>Базовая ставка Н.Новгород (₽)</Label>
                    <Input defaultValue="250" type="number" />
                  </div>
                  <div className="space-y-2">
                    <Label>Стоимость за км (₽)</Label>
                    <Input defaultValue="20" type="number" />
                  </div>
                  <Button className="w-full">
                    <Icon name="Save" className="mr-2" size={16} />
                    Сохранить настройки
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Профиль администратора</CardTitle>
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
                      <Badge variant="destructive">Супер Админ</Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button variant="outline" className="w-full">
                      <Icon name="Key" className="mr-2" size={16} />
                      Сменить пароль
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Icon name="Download" className="mr-2" size={16} />
                      Экспорт данных
                    </Button>
                  </div>

                  <div className="border-t pt-4">
                    <Button
                      onClick={logout}
                      variant="outline"
                      className="w-full text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <Icon name="LogOut" className="mr-2" size={16} />
                      Выйти из аккаунта
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;