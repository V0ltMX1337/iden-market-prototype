import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Friend } from '../types';

interface FriendsTabProps {
  currentUser: User;
}

const FriendsTab = ({ currentUser }: FriendsTabProps) => {
  const [friends] = useState<Friend[]>([
    {
      id: 1,
      user: {
        id: 2,
        name: 'Александр Иванов',
        avatar: '👤',
        email: '',
        city: 'Москва',
        friendsCount: 156,
        followersCount: 430,
        isOnline: true,
        twoFactorEnabled: false,
      },
      status: 'friend',
      mutualFriends: 23,
    },
    {
      id: 2,
      user: {
        id: 3,
        name: 'Мария Петрова',
        avatar: '👩',
        email: '',
        city: 'Санкт-Петербург',
        friendsCount: 234,
        followersCount: 890,
        isOnline: true,
        twoFactorEnabled: false,
      },
      status: 'friend',
      mutualFriends: 45,
    },
    {
      id: 3,
      user: {
        id: 4,
        name: 'Дмитрий Сидоров',
        avatar: '👨',
        email: '',
        city: 'Казань',
        friendsCount: 89,
        followersCount: 234,
        isOnline: false,
        lastSeen: '2 часа назад',
        twoFactorEnabled: false,
      },
      status: 'friend',
      mutualFriends: 12,
    },
  ]);

  const [requests] = useState<Friend[]>([
    {
      id: 4,
      user: {
        id: 5,
        name: 'Елена Смирнова',
        avatar: '👩',
        email: '',
        friendsCount: 67,
        followersCount: 123,
        isOnline: false,
        twoFactorEnabled: false,
      },
      status: 'incoming',
      mutualFriends: 8,
    },
  ]);

  const [suggestions] = useState<Friend[]>([
    {
      id: 5,
      user: {
        id: 6,
        name: 'Игорь Петров',
        avatar: '👨',
        email: '',
        friendsCount: 145,
        followersCount: 567,
        isOnline: true,
        twoFactorEnabled: false,
      },
      status: 'none',
      mutualFriends: 15,
    },
  ]);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Друзья</h1>
        <Input placeholder="Поиск друзей..." className="max-w-md" />
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">
            Все друзья ({friends.length})
          </TabsTrigger>
          <TabsTrigger value="requests">
            Заявки ({requests.length})
          </TabsTrigger>
          <TabsTrigger value="suggestions">
            Рекомендации
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {friends.map((friend) => (
              <Card key={friend.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-2xl">
                        {friend.user.avatar}
                      </div>
                      {friend.user.isOnline && (
                        <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{friend.user.name}</h3>
                      <p className="text-sm text-gray-600">{friend.user.city}</p>
                      <p className="text-xs text-gray-500">{friend.mutualFriends} общих друзей</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Icon name="MessageCircle" size={16} className="mr-1" />
                      Написать
                    </Button>
                    <Button variant="ghost" size="icon-sm">
                      <Icon name="MoreHorizontal" size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="requests">
          <div className="space-y-4">
            {requests.map((request) => (
              <Card key={request.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl">
                      {request.user.avatar}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{request.user.name}</h3>
                      <p className="text-sm text-gray-600">{request.mutualFriends} общих друзей</p>
                    </div>
                    <div className="flex gap-2">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Принять
                      </Button>
                      <Button variant="outline">
                        Отклонить
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="suggestions">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {suggestions.map((suggestion) => (
              <Card key={suggestion.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-2xl">
                      {suggestion.user.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{suggestion.user.name}</h3>
                      <p className="text-xs text-gray-500">{suggestion.mutualFriends} общих друзей</p>
                    </div>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Icon name="UserPlus" size={16} className="mr-2" />
                    Добавить в друзья
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FriendsTab;
