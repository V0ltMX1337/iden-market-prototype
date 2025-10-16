import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Post } from '../types';

interface UserProfileViewProps {
  user: User;
  currentUser: User;
  onBack: () => void;
}

const UserProfileView = ({ user, currentUser, onBack }: UserProfileViewProps) => {
  const [isFriend, setIsFriend] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleAddFriend = () => {
    setIsPending(true);
  };

  const handleMessage = () => {
    alert('Открыть чат с ' + user.name);
  };

  const mockPosts: Post[] = [
    {
      id: 1,
      authorId: user.id,
      author: user,
      text: 'Пост пользователя',
      likes: 45,
      comments: 12,
      reposts: 3,
      timestamp: '2 часа назад',
      isLiked: false,
      isReposted: false,
    },
  ];

  return (
    <div className="space-y-4">
      <Button variant="ghost" onClick={onBack} className="mb-2">
        <Icon name="ArrowLeft" size={20} className="mr-2" />
        Назад
      </Button>

      <Card>
        <CardContent className="p-0">
          <div className="h-48 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-lg"></div>
          <div className="p-6">
            <div className="flex items-start gap-4 -mt-20">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl border-4 border-white shadow-xl flex items-center justify-center text-white text-6xl">
                {user.avatar}
              </div>
              <div className="flex-1 mt-16">
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-3xl font-bold">{user.name}</h1>
                  {user.isOnline && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">онлайн</span>
                  )}
                </div>
                <p className="text-gray-600 mb-4">{user.bio || 'Нет информации'}</p>
                <div className="flex items-center gap-6 text-sm">
                  <div>
                    <span className="font-semibold">{user.friendsCount}</span>
                    <span className="text-gray-600 ml-1">друзей</span>
                  </div>
                  <div>
                    <span className="font-semibold">{user.followersCount}</span>
                    <span className="text-gray-600 ml-1">подписчиков</span>
                  </div>
                  {user.city && (
                    <div className="flex items-center gap-1 text-gray-600">
                      <Icon name="MapPin" size={14} />
                      {user.city}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-2 mt-16">
                {isFriend ? (
                  <Button variant="outline" className="gap-2">
                    <Icon name="Check" size={18} />
                    Вы друзья
                  </Button>
                ) : isPending ? (
                  <Button variant="outline" className="gap-2">
                    <Icon name="Clock" size={18} />
                    Заявка отправлена
                  </Button>
                ) : (
                  <Button onClick={handleAddFriend} className="bg-blue-600 hover:bg-blue-700 gap-2">
                    <Icon name="UserPlus" size={18} />
                    Добавить в друзья
                  </Button>
                )}
                <Button onClick={handleMessage} variant="outline" className="gap-2">
                  <Icon name="MessageCircle" size={18} />
                  Написать
                </Button>
                <Button variant="ghost" size="icon">
                  <Icon name="MoreHorizontal" size={20} />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="wall">
        <TabsList>
          <TabsTrigger value="wall">Стена</TabsTrigger>
          <TabsTrigger value="photos">Фото</TabsTrigger>
          <TabsTrigger value="videos">Видео</TabsTrigger>
          <TabsTrigger value="friends">Друзья</TabsTrigger>
        </TabsList>

        <TabsContent value="wall" className="space-y-4">
          {mockPosts.map((post) => (
            <Card key={post.id}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-lg">
                    {post.author.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{post.author.name}</div>
                    <div className="text-xs text-gray-500">{post.timestamp}</div>
                  </div>
                </div>
                <p className="mb-4">{post.text}</p>
                <div className="flex items-center gap-6 text-gray-600 text-sm border-t pt-3">
                  <button className="flex items-center gap-2 hover:text-red-500">
                    <Icon name="Heart" size={18} />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-blue-500">
                    <Icon name="MessageCircle" size={18} />
                    <span>{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-green-500">
                    <Icon name="Repeat2" size={18} />
                    <span>{post.reposts}</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
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

        <TabsContent value="friends">
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i}>
                <CardContent className="p-3">
                  <div className="w-full aspect-square bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg mb-2 flex items-center justify-center text-white text-4xl">
                    👤
                  </div>
                  <div className="font-medium text-sm">Друг {i}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfileView;
