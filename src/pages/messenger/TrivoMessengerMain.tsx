import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/hooks/useAuth";

interface Message {
  id: number;
  sender: string;
  avatar?: string;
  content: string;
  time: string;
  unread?: number;
  online?: boolean;
  type: 'private' | 'group' | 'channel';
}

interface Channel {
  id: number;
  name: string;
  avatar?: string;
  members: number;
  description: string;
  unread?: number;
}

const TrivoMessengerMain = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("chats");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/messenger");
    }
  }, [user, navigate]);

  const messages: Message[] = [
    {
      id: 1,
      sender: "Алексей Иванов",
      avatar: "https://api.trivoads.ru/uploads/files/art_1.png",
      content: "Привет! Как дела с проектом?",
      time: "14:23",
      unread: 2,
      online: true,
      type: 'private'
    },
    {
      id: 2,
      sender: "Команда разработки",
      avatar: "https://api.trivoads.ru/uploads/files/art_2.png",
      content: "Релиз запланирован на завтра",
      time: "13:45",
      unread: 5,
      online: false,
      type: 'group'
    },
    {
      id: 3,
      sender: "Мария Петрова",
      avatar: "https://api.trivoads.ru/uploads/files/art_3.png",
      content: "Отлично! Увидимся на встрече",
      time: "12:10",
      online: true,
      type: 'private'
    },
    {
      id: 4,
      sender: "Техподдержка",
      content: "Ваш запрос обработан",
      time: "11:30",
      unread: 1,
      online: false,
      type: 'private'
    }
  ];

  const channels: Channel[] = [
    {
      id: 1,
      name: "Новости Trivo",
      avatar: "https://api.trivoads.ru/uploads/files/art_4.png",
      members: 12543,
      description: "Официальные новости и обновления платформы",
      unread: 3
    },
    {
      id: 2,
      name: "IT Сообщество",
      avatar: "https://api.trivoads.ru/uploads/files/art_5.png",
      members: 8921,
      description: "Обсуждения технологий и программирования"
    },
    {
      id: 3,
      name: "Дизайн и UX",
      members: 5432,
      description: "Канал для дизайнеров и UX специалистов"
    }
  ];

  const filteredMessages = messages.filter(msg =>
    msg.sender.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredChannels = channels.filter(channel =>
    channel.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!user) {
    return null;
  }

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Icon name="MessageCircle" className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TrivoMessenger
              </h1>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="ghost" onClick={() => navigate("/")}>
                <Icon name="Home" className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={logout}>
                <Icon name="LogOut" className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* User Profile */}
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
            {user.photoUrl ? (
              <img src={user.photoUrl} alt={user.firstName} className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Icon name="User" className="w-5 h-5 text-white" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">{user.firstName || user.email}</p>
              <p className="text-xs text-gray-500">В сети</p>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск чатов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-3 mx-4">
            <TabsTrigger value="chats" className="text-xs">
              <Icon name="MessageCircle" className="w-4 h-4 mr-1" />
              Чаты
            </TabsTrigger>
            <TabsTrigger value="channels" className="text-xs">
              <Icon name="Radio" className="w-4 h-4 mr-1" />
              Каналы
            </TabsTrigger>
            <TabsTrigger value="calls" className="text-xs">
              <Icon name="Phone" className="w-4 h-4 mr-1" />
              Звонки
            </TabsTrigger>
          </TabsList>

          {/* Chat List */}
          <TabsContent value="chats" className="flex-1 overflow-hidden">
            <div className="h-full overflow-y-auto px-4">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors"
                  onClick={() => navigate(`/messenger/chat/${message.id}`)}
                >
                  <div className="relative">
                    {message.avatar ? (
                      <img src={message.avatar} alt={message.sender} className="w-12 h-12 rounded-full object-cover" />
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
                        <Icon name="User" className="w-6 h-6 text-white" />
                      </div>
                    )}
                    {message.online && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                    {message.type === 'group' && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <Icon name="Users" className="w-2 h-2 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-sm truncate">{message.sender}</p>
                      <span className="text-xs text-gray-500">{message.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{message.content}</p>
                  </div>
                  
                  {message.unread && (
                    <div className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {message.unread}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Channels List */}
          <TabsContent value="channels" className="flex-1 overflow-hidden">
            <div className="h-full overflow-y-auto px-4">
              {filteredChannels.map((channel) => (
                <div
                  key={channel.id}
                  className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors"
                  onClick={() => navigate(`/messenger/channel/${channel.id}`)}
                >
                  <div className="relative">
                    {channel.avatar ? (
                      <img src={channel.avatar} alt={channel.name} className="w-12 h-12 rounded-full object-cover" />
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center">
                        <Icon name="Radio" className="w-6 h-6 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-sm truncate">{channel.name}</p>
                      {channel.unread && (
                        <div className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {channel.unread}
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{channel.members.toLocaleString()} участников</p>
                    <p className="text-sm text-gray-600 truncate">{channel.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Calls List */}
          <TabsContent value="calls" className="flex-1 overflow-hidden">
            <div className="h-full overflow-y-auto px-4">
              <div className="text-center py-12">
                <Icon name="Phone" className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">История звонков пуста</p>
                <p className="text-sm text-gray-400 mt-2">Звонки будут отображаться здесь</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* New Chat Button */}
        <div className="p-4 border-t border-gray-200">
          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Icon name="Plus" className="w-4 h-4 mr-2" />
            Новый чат
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Welcome Screen */}
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="text-center max-w-md">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Icon name="MessageCircle" className="w-12 h-12 text-white" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Добро пожаловать в TrivoMessenger
            </h2>
            
            <p className="text-gray-600 mb-8">
              Выберите чат или канал, чтобы начать общение
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-0 text-center">
                  <Icon name="Users" className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="font-semibold text-sm">Создать группу</p>
                </CardContent>
              </Card>
              
              <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-0 text-center">
                  <Icon name="Radio" className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="font-semibold text-sm">Найти каналы</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrivoMessengerMain;