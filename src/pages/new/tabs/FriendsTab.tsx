import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Friend } from '../types';

interface FriendsTabProps {
  currentUser: User;
  onNavigate?: (type: string, data?: any) => void;
}

const FriendsTab = ({ currentUser, onNavigate }: FriendsTabProps) => {
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Друзья</h2>
        <Input placeholder="Поиск друзей..." className="max-w-xs" />
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">Все друзья ({friends.length})</TabsTrigger>
          <TabsTrigger value="requests">Заявки ({requests.length})</TabsTrigger>
          <TabsTrigger value="suggestions">Рекомендации</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-3">
          {friends.map((friend) => (
            <Card key={friend.id}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="relative cursor-pointer" onClick={() => onNavigate?.('user-profile', friend.user)}>
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-lg">
                      {friend.user.avatar}
                    </div>
                    {friend.user.isOnline && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div 
                      className="font-semibold cursor-pointer hover:underline"
                      onClick={() => onNavigate?.('user-profile', friend.user)}
                    >
                      {friend.user.name}
                    </div>
                    <div className="text-sm text-gray-600">{friend.user.city}</div>
                    <div className="text-xs text-gray-500">{friend.mutualFriends} общих друзей</div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Icon name="MessageCircle" size={16} className="mr-1" />
                      Написать
                    </Button>
                    <Button variant="ghost" size="icon-sm">
                      <Icon name="MoreHorizontal" size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="requests" className="space-y-3">
          {requests.map((request) => (
            <Card key={request.id}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-lg cursor-pointer"
                    onClick={() => onNavigate?.('user-profile', request.user)}
                  >
                    {request.user.avatar}
                  </div>
                  <div className="flex-1">
                    <div 
                      className="font-semibold cursor-pointer hover:underline"
                      onClick={() => onNavigate?.('user-profile', request.user)}
                    >
                      {request.user.name}
                    </div>
                    <div className="text-sm text-gray-600">{request.mutualFriends} общих друзей</div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Принять</Button>
                    <Button size="sm" variant="outline">Отклонить</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="suggestions">
          <Card>
            <CardContent className="p-6 text-center text-gray-500">
              <Icon name="Users" size={48} className="mx-auto mb-4 text-gray-300" />
              <p>Рекомендаций пока нет</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FriendsTab;
