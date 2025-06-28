import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";

const mockChats = [
  {
    id: 1,
    name: "Анна Смирнова",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b9fcf7cf?w=50&h=50&fit=crop&crop=face",
    lastMessage: "Добрый день! Можно посмотреть iPhone завтра?",
    time: "2 часа назад",
    unread: 1,
    isOnline: true,
    productTitle: "iPhone 14 Pro 128GB",
  },
  {
    id: 2,
    name: "Дмитрий Козлов",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
    lastMessage: "Спасибо за покупку! Оставлю отзыв.",
    time: "1 день назад",
    productTitle: "MacBook Air M2",
  },
  {
    id: 3,
    name: "Елена Петрова",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
    lastMessage: "Актуально? Могу приехать сегодня за диваном.",
    time: "3 дня назад",
    unread: 2,
    productTitle: "Диван угловой",
  },
];

const mockMessages = [
  {
    id: 1,
    text: "Добрый день! Можно посмотреть iPhone завтра? Интересует состояние экрана и батареи.",
    time: "11:32",
    isMine: false,
  },
  {
    id: 2,
    text: "Добрый день! Конечно, можно. Телефон в отличном состоянии, экран без царапин, батарея держит весь день.",
    time: "11:34",
    isMine: true,
  },
  {
    id: 3,
    text: "Отлично! В какое время удобно встретиться?",
    time: "11:37",
    isMine: false,
  },
  {
    id: 4,
    text: "Завтра после 18:00 подходит? Можем встретиться у метро Проспект Мира.",
    time: "16:26",
    isMine: true,
  },
];

interface Chat {
  id: number;
  name: string;
  avatar?: string;
  lastMessage: string;
  time: string;
  unread?: number;
  isOnline?: boolean;
  productTitle?: string;
}

const AvitoProfileMessages = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: messages.length + 1,
      text: newMessage,
      time: new Date().toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isMine: true,
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  const filteredChats = mockChats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.productTitle?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex h-[700px] bg-white rounded-lg overflow-hidden border shadow-sm">
      {/* Левая панель - список чатов */}
      <div className="w-80 border-r bg-gray-50">
        <div className="p-4 border-b bg-white">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Диалоги
            </h3>
            <Button variant="ghost" size="sm" className="p-1">
              <Icon name="RotateCcw" size={18} />
            </Button>
          </div>
          <div className="relative">
            <Icon
              name="Search"
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <Input
              placeholder="Поиск по диалогам..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-gray-100 border-0"
            />
          </div>
        </div>

        <div className="overflow-y-auto">
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              className={`flex items-center p-4 hover:bg-white cursor-pointer transition-colors ${
                selectedChat?.id === chat.id
                  ? "bg-white border-r-2 border-gradient-to-b from-blue-500 to-purple-600"
                  : ""
              }`}
              onClick={() => setSelectedChat(chat)}
            >
              <div className="relative mr-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={chat.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    {chat.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {chat.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-gray-900 truncate text-sm">
                    {chat.name}
                  </h4>
                  <span className="text-xs text-gray-500">{chat.time}</span>
                </div>
                {chat.productTitle && (
                  <p className="text-xs text-green-600 font-medium mb-1 truncate">
                    {chat.productTitle}
                  </p>
                )}
                <p className="text-sm text-gray-600 truncate">
                  {chat.lastMessage}
                </p>
              </div>
              {chat.unread && (
                <div className="ml-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {chat.unread}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Правая панель */}
      <div className="flex-1 flex flex-col">
        {!selectedChat ? (
          /* Стартовый экран */
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center max-w-sm">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Icon
                  name="MessageCircle"
                  size={32}
                  className="text-blue-600"
                />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Выберите диалог
              </h3>
              <p className="text-gray-500 mb-6">
                Нажмите на диалог слева, чтобы начать общение с покупателем или
                продавцом
              </p>
            </div>
          </div>
        ) : (
          /* Интерфейс чата */
          <>
            <div className="flex items-center space-x-3 p-4 border-b bg-white">
              <div className="relative">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={selectedChat.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    {selectedChat.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {selectedChat.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{selectedChat.name}</h3>
                {selectedChat.productTitle && (
                  <p className="text-sm text-green-600">
                    {selectedChat.productTitle}
                  </p>
                )}
                {selectedChat.isOnline && (
                  <p className="text-xs text-green-600">В сети</p>
                )}
              </div>
              <Button variant="outline" size="sm">
                <Icon name="Phone" size={16} className="mr-2" />
                Позвонить
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isMine ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                      message.isMine
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                        : "bg-white text-gray-900 shadow-sm"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <div
                      className={`text-xs mt-1 ${
                        message.isMine ? "text-green-100" : "text-gray-500"
                      }`}
                    >
                      {message.time}
                      {message.isMine && (
                        <Icon name="Check" size={12} className="inline ml-1" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t bg-white">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="p-2">
                  <Icon name="Paperclip" size={18} className="text-gray-500" />
                </Button>
                <Input
                  placeholder="Написать сообщение..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button variant="ghost" size="sm" className="p-2">
                  <Icon name="Smile" size={18} className="text-gray-500" />
                </Button>
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full w-10 h-10 p-0"
                >
                  <Icon name="Send" size={16} />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AvitoProfileMessages;
