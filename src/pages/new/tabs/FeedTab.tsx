import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { User, Post } from '../types';

interface FeedTabProps {
  currentUser: User;
}

const FeedTab = ({ currentUser }: FeedTabProps) => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      authorId: 2,
      author: {
        id: 2,
        name: 'Анна Смирнова',
        avatar: '👩',
        email: '',
        friendsCount: 234,
        followersCount: 1200,
        isOnline: true,
        twoFactorEnabled: false,
      },
      text: 'Отличный день для прогулки! ☀️ Погода просто замечательная.',
      images: [],
      likes: 124,
      comments: 18,
      reposts: 5,
      timestamp: '2 часа назад',
      isLiked: false,
      isReposted: false,
    },
    {
      id: 2,
      authorId: 3,
      author: {
        id: 3,
        name: 'Дмитрий Петров',
        avatar: '👨',
        email: '',
        friendsCount: 145,
        followersCount: 890,
        isOnline: false,
        twoFactorEnabled: false,
      },
      text: 'Запустил новый проект! 🚀 Очень рад поделиться результатами.',
      images: [],
      likes: 89,
      comments: 12,
      reposts: 8,
      timestamp: '5 часов назад',
      isLiked: true,
      isReposted: false,
    },
  ]);

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleRepost = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isReposted: !post.isReposted, reposts: post.isReposted ? post.reposts - 1 : post.reposts + 1 }
        : post
    ));
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 text-white flex items-center justify-center font-semibold text-lg">
              {currentUser.avatar}
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

      {posts.map((post) => (
        <Card key={post.id}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center text-lg">
                {post.author.avatar}
              </Avatar>
              <div className="flex-1">
                <div className="font-semibold">{post.author.name}</div>
                <div className="text-xs text-gray-500">{post.timestamp}</div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Icon name="MoreHorizontal" size={20} className="text-gray-600" />
              </button>
            </div>
            
            <p className="mb-4 text-gray-800">{post.text}</p>
            
            {post.images && post.images.length > 0 && (
              <div className="bg-gray-100 h-64 rounded-xl mb-4 flex items-center justify-center">
                <Icon name="Image" size={48} className="text-gray-400" />
              </div>
            )}
            
            <div className="flex items-center gap-6 text-gray-600 border-t pt-3">
              <button 
                onClick={() => handleLike(post.id)}
                className={`flex items-center gap-2 transition-colors ${
                  post.isLiked ? 'text-red-500' : 'hover:text-red-500'
                }`}
              >
                <Icon name="Heart" size={20} fill={post.isLiked ? 'currentColor' : 'none'} />
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                <Icon name="MessageCircle" size={20} />
                <span>{post.comments}</span>
              </button>
              <button 
                onClick={() => handleRepost(post.id)}
                className={`flex items-center gap-2 transition-colors ${
                  post.isReposted ? 'text-green-500' : 'hover:text-green-500'
                }`}
              >
                <Icon name="Repeat2" size={20} />
                <span>{post.reposts}</span>
              </button>
              <button className="flex items-center gap-2 hover:text-blue-500 transition-colors ml-auto">
                <Icon name="Share2" size={20} />
              </button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FeedTab;
