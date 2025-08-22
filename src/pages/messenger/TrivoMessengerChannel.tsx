import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/hooks/useAuth";

interface ChannelPost {
  id: number;
  author: string;
  avatar?: string;
  content: string;
  time: string;
  views: number;
  likes: number;
  comments: number;
  media?: {
    type: 'image' | 'video' | 'audio' | 'file';
    url: string;
    thumbnail?: string;
  };
}

interface ChannelInfo {
  id: number;
  name: string;
  description: string;
  avatar?: string;
  members: number;
  isSubscribed: boolean;
  isAdmin: boolean;
}

const TrivoMessengerChannel = () => {
  const { channelId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [comment, setComment] = useState("");
  const [posts, setPosts] = useState<ChannelPost[]>([]);
  const [channelInfo, setChannelInfo] = useState<ChannelInfo | null>(null);
  const postsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mockPosts: ChannelPost[] = [
      {
        id: 1,
        author: "Администратор",
        avatar: "https://api.trivoads.ru/uploads/files/art_4.png",
        content: "🚀 Добро пожаловать в официальный канал Trivo! Здесь мы будем публиковать все новости и обновления платформы.",
        time: "2 часа назад",
        views: 1250,
        likes: 89,
        comments: 12
      },
      {
        id: 2,
        author: "Команда разработки",
        avatar: "https://api.trivoads.ru/uploads/files/art_5.png",
        content: "📱 Релиз мобильного приложения запланирован на следующую неделю! Будет доступно в App Store и Google Play.",
        time: "5 часов назад",
        views: 890,
        likes: 56,
        comments: 8,
        media: {
          type: 'image',
          url: 'https://api.trivoads.ru/uploads/files/art_1.png',
          thumbnail: 'https://api.trivoads.ru/uploads/files/art_1.png'
        }
      },
      {
        id: 3,
        author: "Администратор",
        content: "🔧 Сегодня в 02:00 будет проведено техническое обслуживание. Ожидаемое время недоступности - 30 минут.",
        time: "1 день назад",
        views: 654,
        likes: 23,
        comments: 4
      }
    ];

    const mockChannelInfo: ChannelInfo = {
      id: 1,
      name: "Новости Trivo",
      description: "Официальные новости и обновления платформы Trivo. Будьте в курсе всех изменений!",
      avatar: "https://api.trivoads.ru/uploads/files/art_4.png",
      members: 12543,
      isSubscribed: true,
      isAdmin: false
    };

    setPosts(mockPosts);
    setChannelInfo(mockChannelInfo);
  }, [channelId]);

  const toggleSubscription = () => {
    if (channelInfo) {
      setChannelInfo({
        ...channelInfo,
        isSubscribed: !channelInfo.isSubscribed,
        members: channelInfo.isSubscribed ? channelInfo.members - 1 : channelInfo.members + 1
      });
    }
  };

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  if (!user) {
    navigate("/messenger");
    return null;
  }

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 p-4 z-50">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate("/messenger/main")}>
            <Icon name="ArrowLeft" className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center space-x-3">
            {channelInfo?.avatar ? (
              <img src={channelInfo.avatar} alt={channelInfo.name} className="w-8 h-8 rounded-full object-cover" />
            ) : (
              <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center">
                <Icon name="Radio" className="w-4 h-4 text-white" />
              </div>
            )}
            <div className="text-center">
              <h2 className="font-semibold text-sm">{channelInfo?.name}</h2>
              <p className="text-xs text-gray-500">
                {channelInfo?.members.toLocaleString()} участников
              </p>
            </div>
          </div>
          
          <Button variant="ghost" size="sm">
            <Icon name="MoreVertical" className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Sidebar (Desktop only) */}
      <div className="hidden md:flex w-80 bg-white border-r border-gray-200 flex-col">
        <div className="p-4 border-b border-gray-200">
          <Button variant="ghost" onClick={() => navigate("/messenger/main")} className="mb-4">
            <Icon name="ArrowLeft" className="w-4 h-4 mr-2" />
            Назад к каналам
          </Button>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Icon name="Radio" className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TrivoMessenger
            </h1>
          </div>
        </div>
        
        <div className="flex-1 p-4">
          <h3 className="font-semibold text-gray-900 mb-4">О канале</h3>
          
          {channelInfo && (
            <div className="space-y-4">
              <div className="text-center">
                {channelInfo.avatar ? (
                  <img src={channelInfo.avatar} alt={channelInfo.name} className="w-20 h-20 rounded-full object-cover mx-auto mb-3" />
                ) : (
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon name="Radio" className="w-10 h-10 text-white" />
                  </div>
                )}
                <h2 className="font-bold text-lg">{channelInfo.name}</h2>
                <p className="text-sm text-gray-500 mb-2">{channelInfo.members.toLocaleString()} участников</p>
                <p className="text-sm text-gray-600">{channelInfo.description}</p>
              </div>
              
              <Button
                onClick={toggleSubscription}
                className={`w-full ${
                  channelInfo.isSubscribed
                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                }`}
              >
                {channelInfo.isSubscribed ? (
                  <>
                    <Icon name="Bell" className="w-4 h-4 mr-2" />
                    Подписан
                  </>
                ) : (
                  <>
                    <Icon name="BellRing" className="w-4 h-4 mr-2" />
                    Подписаться
                  </>
                )}
              </Button>
              
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="Search" className="w-4 h-4 mr-2" />
                  Поиск в канале
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="Share" className="w-4 h-4 mr-2" />
                  Поделиться каналом
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="Flag" className="w-4 h-4 mr-2" />
                  Пожаловаться
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Channel Posts */}
      <div className="flex-1 flex flex-col pt-16 md:pt-0">
        {/* Channel Header (Desktop only) */}
        <div className="hidden md:flex bg-white border-b border-gray-200 p-4 items-center justify-between">
          <div className="flex items-center space-x-3">
            {channelInfo?.avatar ? (
              <img src={channelInfo.avatar} alt={channelInfo.name} className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center">
                <Icon name="Radio" className="w-5 h-5 text-white" />
              </div>
            )}
            <div>
              <h2 className="font-semibold">{channelInfo?.name}</h2>
              <p className="text-sm text-gray-500">
                {channelInfo?.members.toLocaleString()} участников
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Icon name="Search" className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="MoreVertical" className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Posts */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  {post.avatar ? (
                    <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center">
                      <Icon name="User" className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="font-semibold">{post.author}</p>
                    <p className="text-sm text-gray-500">{post.time}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-gray-900 leading-relaxed">{post.content}</p>
                  
                  {post.media && (
                    <div className="mt-4">
                      {post.media.type === 'image' && (
                        <img
                          src={post.media.url}
                          alt="Post media"
                          className="w-full max-w-md h-48 object-cover rounded-lg border border-gray-200"
                        />
                      )}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center space-x-1">
                      <Icon name="Eye" className="w-4 h-4" />
                      <span>{post.views}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="MessageCircle" className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(post.id)}
                      className="hover:text-red-600"
                    >
                      <Icon name="Heart" className="w-4 h-4 mr-1" />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Icon name="Share" className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          <div ref={postsEndRef} />
        </div>

        {/* Comment Input (only for channels where user can comment) */}
        {channelInfo?.isAdmin && (
          <div className="bg-white border-t border-gray-200 p-4">
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Написать пост в канал..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <Button variant="ghost" size="sm">
                <Icon name="Image" className="w-4 h-4" />
              </Button>
              
              <Button variant="ghost" size="sm">
                <Icon name="Video" className="w-4 h-4" />
              </Button>
              
              <Button 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                size="sm"
              >
                <Icon name="Send" className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrivoMessengerChannel;