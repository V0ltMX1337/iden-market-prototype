import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/hooks/useAuth";

interface ChatMessage {
  id: number;
  sender: string;
  avatar?: string;
  content: string;
  time: string;
  isOwn: boolean;
  type: 'text' | 'image' | 'audio' | 'video' | 'file';
  fileUrl?: string;
}

interface ChatUser {
  id: number;
  name: string;
  avatar?: string;
  online: boolean;
  lastSeen?: string;
}

const TrivoMessengerChat = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatUser, setChatUser] = useState<ChatUser | null>(null);
  const [showAttachmentModal, setShowAttachmentModal] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [attachmentType, setAttachmentType] = useState<'file' | 'image' | 'video' | 'audio' | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const mockMessages: ChatMessage[] = [
      {
        id: 1,
        sender: "Алексей Иванов",
        avatar: "https://api.trivoads.ru/uploads/files/art_1.png",
        content: "Привет! Как дела с проектом?",
        time: "14:20",
        isOwn: false,
        type: 'text'
      },
      {
        id: 2,
        sender: user?.firstName || "Вы",
        content: "Привет! Всё идёт по плану, завтра будет готово",
        time: "14:21",
        isOwn: true,
        type: 'text'
      },
      {
        id: 3,
        sender: "Алексей Иванов",
        avatar: "https://api.trivoads.ru/uploads/files/art_1.png",
        content: "Отлично! А можешь скинуть промежуточные результаты?",
        time: "14:22",
        isOwn: false,
        type: 'text'
      },
      {
        id: 4,
        sender: user?.firstName || "Вы",
        content: "Конечно, сейчас отправлю файлы",
        time: "14:23",
        isOwn: true,
        type: 'text'
      }
    ];

    const mockUser: ChatUser = {
      id: 1,
      name: "Алексей Иванов",
      avatar: "https://api.trivoads.ru/uploads/files/art_1.png",
      online: true
    };

    setMessages(mockMessages);
    setChatUser(mockUser);
  }, [chatId, user]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage: ChatMessage = {
      id: messages.length + 1,
      sender: user?.firstName || "Вы",
      content: message,
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
      type: 'text'
    };

    setMessages([...messages, newMessage]);
    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
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
          
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setShowUserInfo(true)}>
            {chatUser?.avatar ? (
              <img src={chatUser.avatar} alt={chatUser.name} className="w-8 h-8 rounded-full object-cover" />
            ) : (
              <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
                <Icon name="User" className="w-4 h-4 text-white" />
              </div>
            )}
            <div className="text-center">
              <h2 className="font-semibold text-sm">{chatUser?.name}</h2>
              <p className="text-xs text-gray-500">
                {chatUser?.online ? "В сети" : "Не в сети"}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm">
              <Icon name="Phone" className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="Video" className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Sidebar (Desktop only) */}
      <div className="hidden md:flex w-80 bg-white border-r border-gray-200 flex-col">
        <div className="p-4 border-b border-gray-200">
          <Button variant="ghost" onClick={() => navigate("/messenger/main")} className="mb-4">
            <Icon name="ArrowLeft" className="w-4 h-4 mr-2" />
            Назад к чатам
          </Button>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Icon name="MessageCircle" className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TrivoMessenger
            </h1>
          </div>
        </div>
        
        <div className="flex-1 p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Информация о чате</h3>
          
          {chatUser && (
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                {chatUser.avatar ? (
                  <img src={chatUser.avatar} alt={chatUser.name} className="w-12 h-12 rounded-full object-cover" />
                ) : (
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
                    <Icon name="User" className="w-6 h-6 text-white" />
                  </div>
                )}
                <div>
                  <p className="font-semibold">{chatUser.name}</p>
                  <p className="text-sm text-gray-500">
                    {chatUser.online ? "В сети" : `Был в сети ${chatUser.lastSeen}`}
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="Phone" className="w-4 h-4 mr-2" />
                  Позвонить
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="Video" className="w-4 h-4 mr-2" />
                  Видеозвонок
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="Search" className="w-4 h-4 mr-2" />
                  Поиск в чате
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col pt-16 md:pt-0">
        {/* Chat Header (Desktop only) */}
        <div className="hidden md:flex bg-white border-b border-gray-200 p-4 items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setShowUserInfo(true)}>
            {chatUser?.avatar ? (
              <img src={chatUser.avatar} alt={chatUser.name} className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
                <Icon name="User" className="w-5 h-5 text-white" />
              </div>
            )}
            <div>
              <h2 className="font-semibold">{chatUser?.name}</h2>
              <p className="text-sm text-gray-500">
                {chatUser?.online ? "В сети" : `Был в сети ${chatUser?.lastSeen}`}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Icon name="Phone" className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="Video" className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="MoreVertical" className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex space-x-2 max-w-xs lg:max-w-md ${msg.isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
                {!msg.isOwn && (
                  <div className="flex-shrink-0">
                    {msg.avatar ? (
                      <img src={msg.avatar} alt={msg.sender} className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                      <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
                        <Icon name="User" className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                )}
                
                <div className={`px-4 py-2 rounded-2xl ${
                  msg.isOwn 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm">{msg.content}</p>
                  <p className={`text-xs mt-1 ${msg.isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={() => setShowAttachmentModal(true)}>
              <Icon name="Paperclip" className="w-4 h-4" />
            </Button>
            
            <div className="flex-1 relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Напишите сообщение..."
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Button 
                variant="ghost" 
                size="sm" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <Icon name="Smile" className="w-4 h-4" />
              </Button>
            </div>
            
            <Button variant="ghost" size="sm">
              <Icon name="Mic" className="w-4 h-4" />
            </Button>
            
            <Button 
              onClick={sendMessage}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              size="sm"
            >
              <Icon name="Send" className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Attachment Modal */}
      {showAttachmentModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Прикрепить файл</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowAttachmentModal(false)}>
                  <Icon name="X" className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  className="h-16 flex-col"
                  onClick={() => setAttachmentType('image')}
                >
                  <Icon name="Image" className="w-6 h-6 mb-1 text-green-600" />
                  <span className="text-sm">Фото</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-16 flex-col"
                  onClick={() => setAttachmentType('video')}
                >
                  <Icon name="Video" className="w-6 h-6 mb-1 text-red-600" />
                  <span className="text-sm">Видео</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-16 flex-col"
                  onClick={() => setAttachmentType('audio')}
                >
                  <Icon name="Music" className="w-6 h-6 mb-1 text-purple-600" />
                  <span className="text-sm">Аудио</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-16 flex-col"
                  onClick={() => setAttachmentType('file')}
                >
                  <Icon name="File" className="w-6 h-6 mb-1 text-blue-600" />
                  <span className="text-sm">Файл</span>
                </Button>
              </div>
              
              {attachmentType && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">
                      {attachmentType === 'image' && 'Выберите изображение'}
                      {attachmentType === 'video' && 'Выберите видео'}
                      {attachmentType === 'audio' && 'Выберите аудио'}
                      {attachmentType === 'file' && 'Выберите файл'}
                    </h4>
                    <Button variant="ghost" size="sm" onClick={() => setAttachmentType(null)}>
                      <Icon name="X" className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept={
                        attachmentType === 'image' ? 'image/*' :
                        attachmentType === 'video' ? 'video/*' :
                        attachmentType === 'audio' ? 'audio/*' : '*/*'
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                    
                    <div className="text-center text-sm text-gray-500">или</div>
                    
                    <Button variant="outline" className="w-full">
                      <Icon name="Search" className="w-4 h-4 mr-2" />
                      Найти в библиотеке
                    </Button>
                  </div>
                  
                  <div className="flex space-x-2 mt-4">
                    <Button size="sm" className="flex-1">Отправить</Button>
                    <Button size="sm" variant="outline" onClick={() => setAttachmentType(null)}>
                      Отмена
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* User Info Modal */}
      {showUserInfo && chatUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-sm">
            <CardContent className="p-6 text-center">
              <Button 
                variant="ghost" 
                size="sm" 
                className="absolute top-4 right-4"
                onClick={() => setShowUserInfo(false)}
              >
                <Icon name="X" className="w-4 h-4" />
              </Button>
              
              <div className="mb-4">
                {chatUser.avatar ? (
                  <img src={chatUser.avatar} alt={chatUser.name} className="w-20 h-20 rounded-full object-cover mx-auto" />
                ) : (
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center mx-auto">
                    <Icon name="User" className="w-10 h-10 text-white" />
                  </div>
                )}
              </div>
              
              <h3 className="text-xl font-bold mb-2">{chatUser.name}</h3>
              <p className="text-gray-500 mb-4">
                {chatUser.online ? "В сети" : `Был в сети ${chatUser.lastSeen}`}
              </p>
              
              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                  <Icon name="Phone" className="w-4 h-4 mr-2" />
                  Позвонить
                </Button>
                <Button variant="outline" className="w-full">
                  <Icon name="Video" className="w-4 h-4 mr-2" />
                  Видеозвонок
                </Button>
                <Button variant="outline" className="w-full">
                  <Icon name="UserPlus" className="w-4 h-4 mr-2" />
                  Добавить в контакты
                </Button>
                <Button variant="outline" className="w-full text-red-600 border-red-200">
                  <Icon name="Ban" className="w-4 h-4 mr-2" />
                  Заблокировать
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
      </div>
    </div>
  );
};

export default TrivoMessengerChat;