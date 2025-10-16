import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Community } from '../types';

interface CommunitiesTabProps {
  currentUser: User;
}

const CommunitiesTab = ({ currentUser }: CommunitiesTabProps) => {
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
  
  const [communities] = useState<Community[]>([
    {
      id: 1,
      name: 'Путешественники России',
      description: 'Сообщество для тех, кто любит путешествовать по России',
      avatar: '🌍',
      cover: '',
      membersCount: 12456,
      type: 'public',
      category: 'Путешествия',
      adminId: 2,
      isMember: true,
      posts: [],
    },
    {
      id: 2,
      name: 'IT-специалисты',
      description: 'Обсуждаем новости IT, делимся опытом',
      avatar: '💻',
      cover: '',
      membersCount: 8934,
      type: 'public',
      category: 'Технологии',
      adminId: 3,
      isMember: true,
      posts: [],
    },
    {
      id: 3,
      name: 'Фотография для начинающих',
      description: 'Учимся делать красивые фотографии вместе',
      avatar: '📸',
      cover: '',
      membersCount: 5678,
      type: 'public',
      category: 'Хобби',
      adminId: 4,
      isMember: false,
      posts: [],
    },
  ]);

  if (selectedCommunity) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <Button
          variant="ghost"
          onClick={() => setSelectedCommunity(null)}
          className="mb-4"
        >
          <Icon name="ArrowLeft" size={20} className="mr-2" />
          Назад к сообществам
        </Button>

        <Card className="mb-6">
          <CardContent className="p-0">
            <div className="h-48 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-lg"></div>
            <div className="p-6">
              <div className="flex items-start gap-4 -mt-20 mb-4">
                <div className="w-32 h-32 bg-white rounded-2xl border-4 border-white shadow-xl flex items-center justify-center text-6xl">
                  {selectedCommunity.avatar}
                </div>
                <div className="flex-1 mt-16">
                  <h1 className="text-3xl font-bold mb-2">{selectedCommunity.name}</h1>
                  <p className="text-gray-600 mb-4">{selectedCommunity.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Icon name="Users" size={16} />
                      {selectedCommunity.membersCount.toLocaleString()} участников
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Tag" size={16} />
                      {selectedCommunity.category}
                    </div>
                  </div>
                </div>
                <Button className={selectedCommunity.isMember ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' : 'bg-blue-600 hover:bg-blue-700'}>
                  {selectedCommunity.isMember ? 'Вы участник' : 'Вступить'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="posts">
          <TabsList className="mb-6">
            <TabsTrigger value="posts">Записи</TabsTrigger>
            <TabsTrigger value="members">Участники</TabsTrigger>
            <TabsTrigger value="photos">Фото</TabsTrigger>
            <TabsTrigger value="videos">Видео</TabsTrigger>
          </TabsList>

          <TabsContent value="posts">
            <Card>
              <CardContent className="p-6 text-center text-gray-500">
                <Icon name="FileText" size={48} className="mx-auto mb-4 text-gray-300" />
                <p>Записей пока нет</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="members">
            <Card>
              <CardContent className="p-6 text-center text-gray-500">
                <Icon name="Users" size={48} className="mx-auto mb-4 text-gray-300" />
                <p>Список участников</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="photos">
            <Card>
              <CardContent className="p-6 text-center text-gray-500">
                <Icon name="Image" size={48} className="mx-auto mb-4 text-gray-300" />
                <p>Фотографий пока нет</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="videos">
            <Card>
              <CardContent className="p-6 text-center text-gray-500">
                <Icon name="Video" size={48} className="mx-auto mb-4 text-gray-300" />
                <p>Видео пока нет</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Сообщества</h1>
        <Input placeholder="Поиск сообществ..." className="max-w-md" />
      </div>

      <Tabs defaultValue="my">
        <TabsList className="mb-6">
          <TabsTrigger value="my">Мои сообщества</TabsTrigger>
          <TabsTrigger value="recommended">Рекомендации</TabsTrigger>
        </TabsList>

        <TabsContent value="my">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {communities.filter(c => c.isMember).map((community) => (
              <Card 
                key={community.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedCommunity(community)}
              >
                <CardContent className="p-0">
                  <div className="h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-t-lg"></div>
                  <div className="p-4">
                    <div className="flex items-start gap-3 -mt-12 mb-3">
                      <div className="w-20 h-20 bg-white rounded-xl border-4 border-white shadow-lg flex items-center justify-center text-4xl">
                        {community.avatar}
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{community.name}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">{community.description}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Icon name="Users" size={14} />
                      {community.membersCount.toLocaleString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recommended">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {communities.filter(c => !c.isMember).map((community) => (
              <Card key={community.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="h-32 bg-gradient-to-br from-purple-500 to-pink-600 rounded-t-lg"></div>
                  <div className="p-4">
                    <div className="flex items-start gap-3 -mt-12 mb-3">
                      <div className="w-20 h-20 bg-white rounded-xl border-4 border-white shadow-lg flex items-center justify-center text-4xl">
                        {community.avatar}
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{community.name}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">{community.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Icon name="Users" size={14} />
                        {community.membersCount.toLocaleString()}
                      </div>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Вступить
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunitiesTab;
