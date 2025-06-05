import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";

interface Message {
  id: number;
  text: string;
  time: string;
  isMine: boolean;
  type?: "text" | "transaction";
  transactionData?: {
    amount: string;
    status: "success" | "pending";
    from: string;
    to: string;
    recipient: string;
    phone: string;
  };
}

interface Chat {
  id: number;
  name: string;
  avatar?: string;
  lastMessage: string;
  time: string;
  unread?: number;
  isOnline?: boolean;
}

const mockChats: Chat[] = [
  {
    id: 1,
    name: "OnShop",
    lastMessage: "Пришлите, пожалуйста, номер теле...",
    time: "29 Апр",
    isOnline: true,
  },
  {
    id: 2,
    name: "TV SHOP",
    lastMessage: "все в наличии",
    time: "22 Апр",
  },
];

const mockMessages: Message[] = [
  {
    id: 1,
    text: "Пришлите, пожалуйста, номер телефона или название банка для перевода. Или оставить бонус в счет следующего заказа?",
    time: "11:32",
    isMine: false,
  },
  {
    id: 2,
    text: "89050128454",
    time: "11:34",
    isMine: true,
  },
  {
    id: 3,
    text: "Газпром",
    time: "11:34",
    isMine: true,
  },
  {
    id: 4,
    text: "Нет ошибки в номере?",
    time: "11:37",
    isMine: false,
  },
  {
    id: 5,
    text: "Извиняюсь, 89050129454",
    time: "16:26",
    isMine: true,
  },
  {
    id: 6,
    text: "",
    time: "17:21",
    isMine: false,
    type: "transaction",
    transactionData: {
      amount: "150 ₽",
      status: "success",
      from: "Основной счёт",
      to: "Газпромбанк",
      recipient: "Данила Павлович П.",
      phone: "+7 (905) 012-94-54",
    },
  },
];

const ProfileMessages = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
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
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex h-[600px] bg-white rounded-lg overflow-hidden border">
      {/* Левая панель - список чатов */}
      <div className="w-80 border-r bg-gray-50">
        <div className="p-4 border-b bg-white">
          <div className="flex items-center justify-between mb-3">
            <Button variant="ghost" size="sm" className="p-1">
              <Icon name="Menu" size={20} />
            </Button>
            <h3 className="font-semibold">Все</h3>
            <Button variant="ghost" size="sm" className="p-1">
              <Icon name="RotateCcw" size={20} />
            </Button>
          </div>
          <div className="relative">
            <Icon
              name="Search"
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <Input
              placeholder="Поиск"
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
              className="flex items-center p-4 hover:bg-white cursor-pointer transition-colors"
              onClick={() => setSelectedChat(chat)}
            >
              <div className="relative mr-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={chat.avatar} />
                  <AvatarFallback className="bg-blue-600 text-white">
                    {chat.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {chat.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-900 truncate">
                    {chat.name}
                  </h4>
                  <span className="text-xs text-gray-500">{chat.time}</span>
                </div>
                <p className="text-sm text-gray-600 truncate mt-1">
                  {chat.lastMessage}
                </p>
              </div>
              {chat.unread && (
                <div className="ml-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
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
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Icon
                  name="MessageCircle"
                  size={32}
                  className="text-gray-400"
                />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Нет пользователей
              </h3>
              <p className="text-gray-500 mb-6">
                Нажмите на диалог, чтобы посмотреть сообщения
              </p>
              <div className="bg-white rounded-lg p-4 border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">
                    Имя пользователя
                  </span>
                  <span className="text-xs text-gray-400">15:30</span>
                </div>
                <p className="text-sm text-gray-500">Текст сообщения</p>
              </div>
            </div>
          </div>
        ) : (
          /* Интерфейс чата */
          <>
            <div className="flex items-center space-x-3 p-4 border-b bg-white">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedChat(null)}
                className="p-1"
              >
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <div className="relative">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-blue-600 text-white">
                    {selectedChat.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {selectedChat.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{selectedChat.name}</h3>
                {selectedChat.isOnline && (
                  <p className="text-xs text-green-600">В сети</p>
                )}
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">29.04.2025, 16:32</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isMine ? "justify-end" : "justify-start"}`}
                >
                  {message.type === "transaction" ? (
                    <div className="bg-white rounded-lg p-4 max-w-xs shadow-sm">
                      <div className="flex items-center mb-2">
                        <Icon
                          name="CheckCircle"
                          size={16}
                          className="text-green-500 mr-2"
                        />
                        <span className="text-green-600 text-sm font-medium">
                          Успешный перевод
                        </span>
                      </div>
                      <div className="text-2xl font-bold mb-2">
                        — {message.transactionData?.amount}
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>
                          {message.transactionData?.from} →{" "}
                          {message.transactionData?.to}
                        </div>
                        <div className="font-medium">
                          {message.transactionData?.recipient}
                        </div>
                        <div>{message.transactionData?.phone}</div>
                      </div>
                      <div className="text-xs text-gray-400 mt-2">
                        {message.time}
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.isMine
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-900 shadow-sm"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <div
                        className={`text-xs mt-1 ${
                          message.isMine ? "text-blue-100" : "text-gray-500"
                        }`}
                      >
                        {message.time}
                        {message.isMine && (
                          <Icon
                            name="Check"
                            size={12}
                            className="inline ml-1"
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="p-4 border-t bg-white">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="p-2">
                  <Icon name="Paperclip" size={20} className="text-gray-500" />
                </Button>
                <Input
                  placeholder="Написать сообщение"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button variant="ghost" size="sm" className="p-2">
                  <Icon name="Smile" size={20} className="text-gray-500" />
                </Button>
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-10 h-10 p-0"
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

export default ProfileMessages;
