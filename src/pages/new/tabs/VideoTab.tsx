import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { User, Video } from '../types';

interface VideoTabProps {
  currentUser: User;
}

const VideoTab = ({ currentUser }: VideoTabProps) => {
  const [showUpload, setShowUpload] = useState(false);
  const [videos] = useState<Video[]>([
    {
      id: 1,
      title: 'Путешествие в горы',
      description: 'Незабываемое приключение в горах Кавказа',
      thumbnail: '🏔️',
      url: '',
      duration: '12:34',
      views: 1234,
      likes: 89,
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
      timestamp: '2 дня назад',
    },
  ]);

  if (showUpload) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Загрузить видео</h1>
          <Button variant="ghost" onClick={() => setShowUpload(false)}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <Card>
          <CardContent className="p-8">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-500 cursor-pointer transition-colors mb-6">
              <Icon name="Upload" size={64} className="text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Перетащите видео сюда</h3>
              <p className="text-sm text-gray-600 mb-4">или нажмите, чтобы выбрать файл</p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Выбрать видео
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block font-semibold mb-2">Название</label>
                <input className="w-full px-4 py-2 border rounded-lg" placeholder="Введите название видео" />
              </div>
              <div>
                <label className="block font-semibold mb-2">Описание</label>
                <textarea className="w-full px-4 py-2 border rounded-lg" rows={4} placeholder="Расскажите о видео..."></textarea>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 py-3">
                Опубликовать видео
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
        <h1 className="text-2xl font-bold">Видео</h1>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowUpload(true)}>
          <Icon name="Upload" size={20} className="mr-2" />
          Загрузить видео
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {videos.map((video) => (
          <Card key={video.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-0">
              <div className="relative h-48 bg-gradient-to-br from-purple-400 to-pink-400 rounded-t-lg flex items-center justify-center text-6xl">
                {video.thumbnail}
                <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                  {video.duration}
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-semibold line-clamp-2 mb-2">{video.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Icon name="Eye" size={14} />
                    {video.views}
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Heart" size={14} />
                    {video.likes}
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-2">{video.timestamp}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VideoTab;
