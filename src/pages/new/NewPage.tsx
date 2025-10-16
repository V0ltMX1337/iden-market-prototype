import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: number;
  avatar: string;
  name: string;
  lastMessage: string;
  time: string;
  unread?: number;
  online?: boolean;
}

interface Ad {
  id: number;
  title: string;
  price: string;
  image: string;
  location: string;
  time: string;
}

const NewPage = () => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);
  const [activeTab, setActiveTab] = useState<'feed' | 'messages' | 'ads' | 'taxi' | 'music'>('feed');
  const [showAuthModal, setShowAuthModal] = useState(false);

  const mockMessages: Message[] = [
    { id: 1, avatar: '👤', name: 'Александр Иванов', lastMessage: 'Привет! Как дела?', time: '14:30', unread: 3, online: true },
    { id: 2, avatar: '👤', name: 'Мария Петрова', lastMessage: 'Спасибо за помощь!', time: '13:15', online: true },
    { id: 3, avatar: '👤', name: 'Дмитрий Сидоров', lastMessage: 'Встретимся завтра?', time: '12:00', unread: 1 },
    { id: 4, avatar: '👤', name: 'Елена Козлова', lastMessage: 'Отлично, договорились', time: 'Вчера' },
    { id: 5, avatar: '👤', name: 'Игорь Смирнов', lastMessage: 'Отправил документы', time: 'Вчера', online: true },
  ];

  const mockAds: Ad[] = [
    { id: 1, title: 'iPhone 15 Pro Max 256GB', price: '89 990 ₽', image: '📱', location: 'Москва', time: '2 часа назад' },
    { id: 2, title: 'Квартира 2-к 65м²', price: '12 500 000 ₽', image: '🏠', location: 'Санкт-Петербург', time: '5 часов назад' },
    { id: 3, title: 'Toyota Camry 2020', price: '2 450 000 ₽', image: '🚗', location: 'Москва', time: '1 день назад' },
    { id: 4, title: 'MacBook Pro M3', price: '159 990 ₽', image: '💻', location: 'Казань', time: '2 дня назад' },
    { id: 5, title: 'Диван угловой', price: '45 000 ₽', image: '🛋️', location: 'Москва', time: '3 дня назад' },
    { id: 6, title: 'PlayStation 5', price: '49 990 ₽', image: '🎮', location: 'Екатеринбург', time: '4 дня назад' },
  ];

  const handleTrivoidAuth = () => {
    setShowAuthModal(false);
    setIsAuth(true);
  };

  if (!isAuth) {
    return (
      <>
        <Helmet>
          <title>Моя социальная платформа — мессенджер, объявления, такси</title>
          <meta name="description" content="Единая платформа для общения, покупок и заказа такси" />
        </Helmet>

        <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-block bg-white/10 backdrop-blur-lg rounded-3xl p-6 mb-8">
                  <Icon name="Zap" size={80} className="text-white mx-auto" />
                </div>
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                  Всё в одном месте
                </h1>
                <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
                  Общайся с друзьями, покупай и продавай, заказывай такси, слушай музыку — всё на одной платформе
                </p>
                <Button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-white text-blue-600 hover:bg-blue-50 px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl transform hover:scale-105 transition-all"
                >
                  Войти через Trivoid
                </Button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {[
                  { icon: 'MessageCircle', title: 'Мессенджер', desc: 'Общайся с друзьями в реальном времени', color: 'from-blue-500 to-cyan-500' },
                  { icon: 'ShoppingBag', title: 'Объявления', desc: 'Покупай и продавай без комиссий', color: 'from-green-500 to-emerald-500' },
                  { icon: 'Car', title: 'Такси', desc: 'Заказывай поездки выгодно', color: 'from-yellow-500 to-orange-500' },
                  { icon: 'Music', title: 'Музыка', desc: 'Слушай любимые треки', color: 'from-pink-500 to-rose-500' },
                ].map((feature, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-4`}>
                      <Icon name={feature.icon as any} size={32} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-blue-100 text-sm">{feature.desc}</p>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-3 gap-8 text-center">
                {[
                  { number: '5M+', label: 'Пользователей' },
                  { number: '100K+', label: 'Объявлений' },
                  { number: '1M+', label: 'Поездок в месяц' },
                ].map((stat, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                    <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                    <div className="text-blue-100">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {showAuthModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl max-w-md w-full p-8 relative">
                <button
                  onClick={() => setShowAuthModal(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                  <Icon name="X" size={24} />
                </button>
                
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Zap" size={40} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Вход через Trivoid</h2>
                  <p className="text-gray-600">Быстрая и безопасная авторизация</p>
                </div>

                <Button
                  onClick={handleTrivoidAuth}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 rounded-xl font-semibold text-lg mb-4"
                >
                  <Icon name="LogIn" size={20} className="mr-2" />
                  Войти с Trivoid
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  Нажимая "Войти", вы соглашаетесь с условиями использования
                </p>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Моя платформа — Главная</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                    <Icon name="Zap" size={24} className="text-white" />
                  </div>
                  <span className="text-xl font-bold text-gray-900">MyPlatform</span>
                </div>

                <div className="hidden md:block w-96">
                  <div className="relative">
                    <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Поиск..."
                      className="pl-10 bg-gray-100 border-0 focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                  <Icon name="Bell" size={24} className="text-gray-600" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <Avatar className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 text-white flex items-center justify-center font-semibold">
                  И
                </Avatar>
              </div>
            </div>
          </div>
        </header>

        <div className="flex">
          <aside className="hidden md:block w-64 bg-white border-r border-gray-200 h-[calc(100vh-64px)] sticky top-16">
            <nav className="p-4 space-y-2">
              {[
                { id: 'feed', icon: 'Home', label: 'Лента', badge: null },
                { id: 'messages', icon: 'MessageCircle', label: 'Сообщения', badge: 5 },
                { id: 'ads', icon: 'ShoppingBag', label: 'Объявления', badge: null },
                { id: 'taxi', icon: 'Car', label: 'Такси', badge: null },
                { id: 'music', icon: 'Music', label: 'Музыка', badge: null },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all ${
                    activeTab === item.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon name={item.icon as any} size={22} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <Badge className="bg-red-500 text-white">{item.badge}</Badge>
                  )}
                </button>
              ))}
            </nav>
          </aside>

          <main className="flex-1">
            {activeTab === 'feed' && (
              <div className="max-w-3xl mx-auto p-4 space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 text-white flex items-center justify-center font-semibold">
                        И
                      </Avatar>
                      <Input placeholder="Что у вас нового?" className="flex-1" />
                    </div>
                    <div className="flex gap-4">
                      <Button variant="ghost" size="sm" className="flex-1">
                        <Icon name="Image" size={18} className="mr-2" />
                        Фото
                      </Button>
                      <Button variant="ghost" size="sm" className="flex-1">
                        <Icon name="Video" size={18} className="mr-2" />
                        Видео
                      </Button>
                      <Button variant="ghost" size="sm" className="flex-1">
                        <Icon name="Music" size={18} className="mr-2" />
                        Музыка
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {[1, 2, 3].map((post) => (
                  <Card key={post}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-4">
                        <Avatar className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center">
                          П
                        </Avatar>
                        <div>
                          <div className="font-semibold">Пользователь {post}</div>
                          <div className="text-xs text-gray-500">2 часа назад</div>
                        </div>
                      </div>
                      <p className="mb-4 text-gray-800">
                        Отличный день для прогулки! ☀️ Погода просто замечательная.
                      </p>
                      <div className="bg-gray-100 h-64 rounded-xl mb-4 flex items-center justify-center">
                        <Icon name="Image" size={48} className="text-gray-400" />
                      </div>
                      <div className="flex items-center gap-6 text-gray-600">
                        <button className="flex items-center gap-2 hover:text-red-500 transition-colors">
                          <Icon name="Heart" size={20} />
                          <span>124</span>
                        </button>
                        <button className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                          <Icon name="MessageCircle" size={20} />
                          <span>18</span>
                        </button>
                        <button className="flex items-center gap-2 hover:text-green-500 transition-colors">
                          <Icon name="Share2" size={20} />
                          <span>5</span>
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === 'messages' && (
              <div className="h-[calc(100vh-64px)] flex">
                <div className="w-80 border-r border-gray-200 bg-white">
                  <div className="p-4 border-b">
                    <Input placeholder="Поиск сообщений..." />
                  </div>
                  <div className="overflow-y-auto">
                    {mockMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-lg">
                              {msg.avatar}
                            </div>
                            {msg.online && (
                              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-semibold text-sm truncate">{msg.name}</span>
                              <span className="text-xs text-gray-500">{msg.time}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-gray-600 truncate">{msg.lastMessage}</p>
                              {msg.unread && (
                                <Badge className="bg-blue-600 text-white text-xs">{msg.unread}</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex-1 flex flex-col bg-gray-50">
                  <div className="flex items-center gap-3 p-4 bg-white border-b">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white">
                      👤
                    </div>
                    <div>
                      <div className="font-semibold">Александр Иванов</div>
                      <div className="text-xs text-green-600">онлайн</div>
                    </div>
                  </div>

                  <div className="flex-1 p-4 overflow-y-auto space-y-4">
                    <div className="flex justify-start">
                      <div className="bg-white rounded-2xl rounded-tl-none px-4 py-2 max-w-xs shadow-sm">
                        <p>Привет! Как дела?</p>
                        <span className="text-xs text-gray-500">14:30</span>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-blue-600 text-white rounded-2xl rounded-tr-none px-4 py-2 max-w-xs">
                        <p>Отлично, спасибо! А у тебя?</p>
                        <span className="text-xs text-blue-100">14:31</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white border-t">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Icon name="Paperclip" size={20} />
                      </Button>
                      <Input placeholder="Написать сообщение..." className="flex-1" />
                      <Button size="icon" className="bg-blue-600 hover:bg-blue-700">
                        <Icon name="Send" size={20} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ads' && (
              <div className="max-w-7xl mx-auto p-4">
                <div className="mb-6 flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-gray-900">Объявления</h1>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Icon name="Plus" size={20} className="mr-2" />
                    Подать объявление
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockAds.map((ad) => (
                    <Card key={ad.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-0">
                        <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-6xl rounded-t-lg">
                          {ad.image}
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-lg mb-2 line-clamp-1">{ad.title}</h3>
                          <div className="text-2xl font-bold text-blue-600 mb-2">{ad.price}</div>
                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Icon name="MapPin" size={14} />
                              {ad.location}
                            </div>
                            <span>{ad.time}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'taxi' && (
              <div className="max-w-4xl mx-auto p-4">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-6">Заказать такси</h2>
                    
                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Откуда</label>
                        <div className="relative">
                          <Icon name="MapPin" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <Input placeholder="Введите адрес..." className="pl-10" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Куда</label>
                        <div className="relative">
                          <Icon name="MapPin" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600" />
                          <Input placeholder="Введите адрес..." className="pl-10" />
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      {[
                        { name: 'Эконом', price: '450 ₽', time: '3 мин', icon: '🚗' },
                        { name: 'Комфорт', price: '650 ₽', time: '5 мин', icon: '🚙' },
                        { name: 'Бизнес', price: '1200 ₽', time: '7 мин', icon: '🚘' },
                      ].map((tariff) => (
                        <div
                          key={tariff.name}
                          className="border-2 border-gray-200 rounded-xl p-4 hover:border-blue-500 cursor-pointer transition-all"
                        >
                          <div className="text-3xl mb-2">{tariff.icon}</div>
                          <div className="font-semibold mb-1">{tariff.name}</div>
                          <div className="text-lg font-bold text-blue-600 mb-1">{tariff.price}</div>
                          <div className="text-sm text-gray-600">Подача: {tariff.time}</div>
                        </div>
                      ))}
                    </div>

                    <Button className="w-full bg-blue-600 hover:bg-blue-700 py-6 text-lg font-semibold">
                      Заказать такси
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'music' && (
              <div className="max-w-5xl mx-auto p-4 space-y-4">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
                  <h2 className="text-3xl font-bold mb-2">Музыка</h2>
                  <p className="text-purple-100">Слушайте любимые треки и открывайте новую музыку</p>
                </div>

                <div className="grid md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((track) => (
                    <Card key={track} className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="aspect-square bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg mb-3 flex items-center justify-center">
                          <Icon name="Music" size={40} className="text-white" />
                        </div>
                        <h3 className="font-semibold mb-1 line-clamp-1">Название трека {track}</h3>
                        <p className="text-sm text-gray-600 line-clamp-1">Исполнитель</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="sticky bottom-0">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                        <Icon name="Music" size={24} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">Сейчас играет</div>
                        <div className="text-sm text-gray-600">Исполнитель — Название</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Icon name="SkipBack" size={20} />
                        </Button>
                        <Button size="icon" className="bg-blue-600 hover:bg-blue-700">
                          <Icon name="Play" size={20} />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Icon name="SkipForward" size={20} />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Icon name="Volume2" size={20} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </main>
        </div>

        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
          <div className="flex justify-around py-2">
            {[
              { id: 'feed', icon: 'Home', label: 'Лента' },
              { id: 'messages', icon: 'MessageCircle', label: 'Чаты', badge: 5 },
              { id: 'ads', icon: 'ShoppingBag', label: 'Товары' },
              { id: 'taxi', icon: 'Car', label: 'Такси' },
              { id: 'music', icon: 'Music', label: 'Музыка' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg relative ${
                  activeTab === item.id ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                <Icon name={item.icon as any} size={24} />
                <span className="text-xs">{item.label}</span>
                {item.badge && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
};

export default NewPage;
