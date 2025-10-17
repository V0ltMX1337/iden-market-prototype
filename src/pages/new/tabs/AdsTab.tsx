import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { User, Ad } from '../types';

interface AdsTabProps {
  currentUser: User;
}

const AdsTab = ({ currentUser }: AdsTabProps) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedAd, setSelectedAd] = useState<Ad | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [ads] = useState<Ad[]>([
    {
      id: 1,
      title: 'iPhone 15 Pro Max 256GB',
      description: 'Отличное состояние, полный комплект. Покупал 3 месяца назад, все чеки есть.',
      price: 89990,
      images: ['📱'],
      category: 'Электроника',
      location: 'Москва',
      authorId: 2,
      author: {
        id: 2,
        name: 'Александр Иванов',
        avatar: '👤',
        email: '',
        friendsCount: 156,
        followersCount: 430,
        isOnline: true,
        twoFactorEnabled: false,
      },
      timestamp: '2 часа назад',
      views: 234,
      contacts: {
        phone: '+7 (999) 123-45-67',
        email: 'example@mail.com',
      },
    },
    {
      id: 2,
      title: 'Квартира 2-к 65м²',
      description: 'Продается просторная двухкомнатная квартира в центре города.',
      price: 12500000,
      images: ['🏠'],
      category: 'Недвижимость',
      location: 'Санкт-Петербург',
      authorId: 3,
      author: {
        id: 3,
        name: 'Мария Петрова',
        avatar: '👩',
        email: '',
        friendsCount: 234,
        followersCount: 890,
        isOnline: false,
        twoFactorEnabled: false,
      },
      timestamp: '5 часов назад',
      views: 1234,
      contacts: {
        phone: '+7 (999) 987-65-43',
      },
    },
    {
      id: 3,
      title: 'Toyota Camry 2020',
      description: 'Автомобиль в отличном состоянии, один владелец, полное ТО.',
      price: 2450000,
      images: ['🚗'],
      category: 'Транспорт',
      location: 'Москва',
      authorId: 4,
      author: {
        id: 4,
        name: 'Дмитрий Сидоров',
        avatar: '👨',
        email: '',
        friendsCount: 89,
        followersCount: 234,
        isOnline: true,
        twoFactorEnabled: false,
      },
      timestamp: '1 день назад',
      views: 567,
      contacts: {
        phone: '+7 (999) 555-44-33',
      },
    },
  ]);

  if (selectedAd) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <Button
          variant="ghost"
          onClick={() => setSelectedAd(null)}
          className="mb-4"
        >
          <Icon name="ArrowLeft" size={20} className="mr-2" />
          Назад к объявлениям
        </Button>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl h-96 flex items-center justify-center text-8xl mb-4">
              {selectedAd.images[0]}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-gray-100 rounded-lg h-20 flex items-center justify-center text-2xl">
                  {selectedAd.images[0]}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-4">{selectedAd.title}</h1>
            <div className="text-4xl font-bold text-blue-600 mb-6">
              {selectedAd.price.toLocaleString()} ₽
            </div>

            <Card className="mb-6">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Описание</h3>
                <p className="text-gray-700">{selectedAd.description}</p>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-lg">
                    {selectedAd.author.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{selectedAd.author.name}</div>
                    <div className="text-sm text-gray-600">
                      {selectedAd.author.isOnline ? 'Онлайн' : 'Был(а) недавно'}
                    </div>
                  </div>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 mb-2">
                  <Icon name="MessageCircle" size={20} className="mr-2" />
                  Написать продавцу
                </Button>
                <Button variant="outline" className="w-full">
                  <Icon name="Phone" size={20} className="mr-2" />
                  Показать телефон
                </Button>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <Icon name="MapPin" size={16} className="inline mr-1" />
                {selectedAd.location}
              </div>
              <div>
                <Icon name="Eye" size={16} className="inline mr-1" />
                {selectedAd.views} просмотров
              </div>
              <div>
                <Icon name="Calendar" size={16} className="inline mr-1" />
                {selectedAd.timestamp}
              </div>
              <div>
                <Icon name="Tag" size={16} className="inline mr-1" />
                {selectedAd.category}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showCreateForm) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Новое объявление</h1>
          <Button variant="ghost" onClick={() => setShowCreateForm(false)}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <Card>
          <CardContent className="p-6 space-y-6">
            <div>
              <label className="block font-semibold mb-2">Фотографии</label>
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-blue-500 cursor-pointer transition-colors">
                    <Icon name="Plus" size={32} className="text-gray-400" />
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-2">Добавьте до 10 фотографий</p>
            </div>

            <div>
              <label className="block font-semibold mb-2">Название *</label>
              <Input placeholder="Например: iPhone 15 Pro Max" />
            </div>

            <div>
              <label className="block font-semibold mb-2">Категория *</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option>Выберите категорию</option>
                <option>Электроника</option>
                <option>Недвижимость</option>
                <option>Транспорт</option>
                <option>Одежда и обувь</option>
                <option>Для дома</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-2">Описание *</label>
              <Textarea 
                placeholder="Расскажите о вашем товаре..." 
                rows={6}
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Цена *</label>
              <Input type="number" placeholder="0" />
            </div>

            <div>
              <label className="block font-semibold mb-2">Местоположение *</label>
              <Input placeholder="Город" />
            </div>

            <div>
              <label className="block font-semibold mb-2">Контакты</label>
              <div className="space-y-3">
                <Input type="tel" placeholder="Телефон" />
                <Input type="email" placeholder="Email (необязательно)" />
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                Опубликовать объявление
              </Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Отмена
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Объявления</h1>
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setShowCreateForm(true)}
        >
          <Icon name="Plus" size={20} className="mr-2" />
          Подать объявление
        </Button>
      </div>

      <div className="mb-6">
        <Input placeholder="Поиск объявлений..." className="max-w-md" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ads.map((ad) => (
          <Card 
            key={ad.id} 
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedAd(ad)}
          >
            <CardContent className="p-0">
              <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-6xl rounded-t-lg">
                {ad.images[0]}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-1">{ad.title}</h3>
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  {ad.price.toLocaleString()} ₽
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Icon name="MapPin" size={14} />
                    {ad.location}
                  </div>
                  <span>{ad.timestamp}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdsTab;