import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { useTaxiAuth, type TaxiOrder } from '@/contexts/TaxiAuthContext';

const TaxiProfile = () => {
  const [searchParams] = useSearchParams();
  const { user, orders, updateProfile, addPaymentCard, removePaymentCard, logout } = useTaxiAuth();
  
  const initialTab = searchParams.get('tab') || 'profile';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || ''
  });

  const [newCard, setNewCard] = useState({
    number: '',
    expiry: '',
    cvv: '',
    holderName: ''
  });

  const [showAddCard, setShowAddCard] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name,
        phone: user.phone,
        email: user.email
      });
    }
  }, [user]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    try {
      await updateProfile(profileData);
      setIsEditing(false);
    } catch (error) {
      console.error('Ошибка обновления профиля:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCard = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await addPaymentCard(newCard);
      setNewCard({ number: '', expiry: '', cvv: '', holderName: '' });
      setShowAddCard(false);
    } catch (error) {
      console.error('Ошибка добавления карты:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCardNumber = (number: string) => {
    return number.replace(/(.{4})/g, '$1 ').trim();
  };

  const getCardType = (type: string) => {
    switch (type) {
      case 'visa': return '💳 Visa';
      case 'mastercard': return '💳 Mastercard';
      case 'mir': return '💳 МИР';
      default: return '💳';
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
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <Icon name="UserX" className="mx-auto mb-4 text-gray-400" size={48} />
            <h2 className="text-xl font-semibold mb-2">Вы не авторизованы</h2>
            <p className="text-gray-600 mb-4">Войдите в аккаунт для доступа к профилю</p>
            <Link to="/migalki/auth">
              <Button>Войти в аккаунт</Button>
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
          <Link to="/migalki/dashboard/client" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
              <Icon name="Car" className="text-white" size={16} />
            </div>
            <span className="text-lg font-semibold text-gray-800">Мигалки</span>
          </Link>

          <Link to="/migalki/dashboard/client">
            <Button variant="outline" size="sm">
              <Icon name="ArrowLeft" className="mr-2" size={16} />
              К заказам
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="text-xl">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="text-center sm:text-left flex-1">
                  <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
                  <p className="text-gray-600">{user.email}</p>
                  <div className="flex items-center justify-center sm:justify-start space-x-4 mt-2">
                    <Badge variant="outline">
                      👤 {user.role === 'client' ? 'Клиент' : user.role}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" className="text-yellow-400 fill-current" size={16} />
                      <span className="text-sm font-medium">
                        {orders.filter(o => o.rating).length > 0 
                          ? (orders.reduce((sum, order) => sum + (order.rating || 0), 0) / orders.filter(o => o.rating).length).toFixed(1)
                          : '—'
                        }
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    variant={isEditing ? "default" : "outline"}
                    size="sm"
                  >
                    <Icon name="Edit" className="mr-2" size={16} />
                    {isEditing ? 'Отменить' : 'Редактировать'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="profile">Профиль</TabsTrigger>
              <TabsTrigger value="cards">Карты</TabsTrigger>
              <TabsTrigger value="history">История</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Личная информация</CardTitle>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Полное имя</Label>
                          <Input
                            id="name"
                            value={profileData.name}
                            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone">Телефон</Label>
                          <Input
                            id="phone"
                            value={profileData.phone}
                            onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          required
                        />
                      </div>

                      <div className="flex space-x-4 pt-4">
                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                        >
                          {isLoading ? (
                            <Icon name="Loader2" className="animate-spin mr-2" size={16} />
                          ) : (
                            <Icon name="Save" className="mr-2" size={16} />
                          )}
                          Сохранить
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsEditing(false)}
                        >
                          Отмена
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-500">Полное имя</Label>
                          <p className="text-gray-800">{user.name}</p>
                        </div>
                        
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-500">Телефон</Label>
                          <p className="text-gray-800">{user.phone}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-500">Email</Label>
                        <p className="text-gray-800">{user.email}</p>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-500">Дата регистрации</Label>
                        <p className="text-gray-800">{formatDate(user.createdAt)}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Cards Tab */}
            <TabsContent value="cards">
              <div className="space-y-6">
                <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Платежные карты</CardTitle>
                      <Button
                        onClick={() => setShowAddCard(true)}
                        size="sm"
                        className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                      >
                        <Icon name="Plus" className="mr-2" size={16} />
                        Добавить карту
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {user.paymentCards && user.paymentCards.length > 0 ? (
                      <div className="space-y-3">
                        {user.paymentCards.map((card) => (
                          <div key={card.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                            <div className="flex items-center space-x-4">
                              <div className="text-2xl">{getCardType(card.type).split(' ')[0]}</div>
                              <div>
                                <div className="font-medium">•••• •••• •••• {card.lastFour}</div>
                                <div className="text-sm text-gray-500">
                                  {getCardType(card.type).split(' ')[1]}
                                  {card.isDefault && (
                                    <Badge variant="secondary" className="ml-2">По умолчанию</Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => removePaymentCard(card.id)}
                              className="text-red-600 border-red-200 hover:bg-red-50"
                            >
                              <Icon name="Trash2" size={16} />
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Icon name="CreditCard" className="mx-auto mb-4 text-gray-300" size={48} />
                        <p className="text-gray-500 mb-4">У вас пока нет привязанных карт</p>
                        <Button
                          onClick={() => setShowAddCard(true)}
                          className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                        >
                          <Icon name="Plus" className="mr-2" size={16} />
                          Добавить первую карту
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Add Card Form */}
                {showAddCard && (
                  <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Добавить карту</CardTitle>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setShowAddCard(false)}
                        >
                          <Icon name="X" size={16} />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleAddCard} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Номер карты</Label>
                          <Input
                            id="cardNumber"
                            value={newCard.number}
                            onChange={(e) => setNewCard({ ...newCard, number: e.target.value.replace(/\s/g, '') })}
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry">Срок действия</Label>
                            <Input
                              id="expiry"
                              value={newCard.expiry}
                              onChange={(e) => setNewCard({ ...newCard, expiry: e.target.value })}
                              placeholder="MM/YY"
                              maxLength={5}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              value={newCard.cvv}
                              onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })}
                              placeholder="123"
                              maxLength={3}
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="holderName">Имя владельца</Label>
                          <Input
                            id="holderName"
                            value={newCard.holderName}
                            onChange={(e) => setNewCard({ ...newCard, holderName: e.target.value })}
                            placeholder="IVAN IVANOV"
                            required
                          />
                        </div>

                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                        >
                          {isLoading ? (
                            <Icon name="Loader2" className="animate-spin mr-2" size={16} />
                          ) : (
                            <Icon name="Plus" className="mr-2" size={16} />
                          )}
                          Добавить карту
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history">
              <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>История поездок</CardTitle>
                </CardHeader>
                <CardContent>
                  {orders.length > 0 ? (
                    <div className="space-y-4">
                      {orders.map((order) => {
                        const status = getStatusBadge(order.status);
                        return (
                          <div key={order.id} className="p-4 border border-gray-200 rounded-xl">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-3">
                                <div className="font-medium text-gray-800">
                                  {getServiceLabel(order.type)}
                                </div>
                                <Badge variant={status.variant}>{status.label}</Badge>
                              </div>
                              <div className="font-bold text-green-600">
                                {order.totalCost} ₽
                              </div>
                            </div>

                            <div className="space-y-2 text-sm mb-3">
                              <div className="flex items-center space-x-2">
                                <Icon name="MapPin" className="text-green-500" size={14} />
                                <span className="text-gray-600">{order.fromAddress}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Icon name="MapPin" className="text-red-500" size={14} />
                                <span className="text-gray-600">{order.toAddress}</span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>#{order.id}</span>
                              <span>{formatDate(order.createdAt)}</span>
                            </div>

                            {order.rating && (
                              <div className="flex items-center space-x-1 mt-3 pt-3 border-t border-gray-100">
                                <span className="text-sm text-gray-600 mr-2">Оценка:</span>
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Icon
                                    key={i}
                                    name="Star"
                                    className={`w-4 h-4 ${i < order.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                  />
                                ))}
                                <span className="text-sm text-gray-500 ml-2">{order.rating}/5</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Icon name="History" className="mx-auto mb-4 text-gray-300" size={48} />
                      <p className="text-gray-500 mb-4">История поездок пуста</p>
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
            </TabsContent>
          </Tabs>

          {/* Danger Zone */}
          <Card className="border-red-200 bg-red-50/50 mt-8">
            <CardHeader>
              <CardTitle className="text-red-800">Опасная зона</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-red-700">
                Эти действия необратимы. Будьте осторожны.
              </p>
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
        </div>
      </div>
    </div>
  );
};

export default TaxiProfile;