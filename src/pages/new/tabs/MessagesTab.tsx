import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { User, Chat, Message } from '../types';

interface MessagesTabProps {
  currentUser: User;
}

const MessagesTab = ({ currentUser }: MessagesTabProps) => {
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  
  const mockChats: Chat[] = [
    {
      id: 1,
      type: 'private',
      participants: [{
        id: 2,
        name: 'Александр Иванов',
        avatar: '👤',
        email: '',
        friendsCount: 156,
        followersCount: 430,
        isOnline: true,
        twoFactorEnabled: false,
      }],
      lastMessage: {
        id: 1,
        chatId: 1,
        senderId: 2,
        text: 'Привет! Как дела?',
        timestamp: '14:30',
        read: false,
      },
      unreadCount: 3,
    },
    {
      id: 2,
      type: 'private',
      participants: [{
        id: 3,
        name: 'Мария Петрова',
        avatar: '👩',
        email: '',
        friendsCount: 234,
        followersCount: 890,
        isOnline: true,
        twoFactorEnabled: false,
      }],
      lastMessage: {
        id: 2,
        chatId: 2,
        senderId: 3,
        text: 'Спасибо за помощь!',
        timestamp: '13:15',
        read: true,
      },
      unreadCount: 0,
    },
  ];

  const [messages] = useState<Message[]>([
    {
      id: 1,
      chatId: 1,
      senderId: 2,
      text: 'Привет! Как дела?',
      timestamp: '14:30',
      read: true,
    },
    {
      id: 2,
      chatId: 1,
      senderId: 1,
      text: 'Отлично, спасибо! А у тебя?',
      timestamp: '14:31',
      read: true,
    },
  ]);

  const currentChat = mockChats.find(chat => chat.id === selectedChat);
  const chatMessages = messages.filter(msg => msg.chatId === selectedChat);

  return (
    <div className="h-[calc(100vh-64px)] flex">
      <div className="w-full md:w-80 border-r border-gray-200 bg-white">
        <div className="p-4 border-b">
          <Input placeholder="Поиск сообщений..." />
        </div>
        <div className="overflow-y-auto h-[calc(100%-73px)]">
          {mockChats.map((chat) => {
            const participant = chat.participants[0];
            return (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition-colors ${
                  selectedChat === chat.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-lg">
                      {participant.avatar}
                    </div>
                    {participant.isOnline && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm truncate">{participant.name}</span>
                      <span className="text-xs text-gray-500">{chat.lastMessage?.timestamp}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600 truncate">{chat.lastMessage?.text}</p>
                      {chat.unreadCount > 0 && (
                        <Badge className="bg-blue-600 text-white text-xs">{chat.unreadCount}</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {currentChat ? (
        <div className="hidden md:flex flex-1 flex-col bg-gray-50">
          <div className="flex items-center gap-3 p-4 bg-white border-b">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white">
              {currentChat.participants[0].avatar}
            </div>
            <div className="flex-1">
              <div className="font-semibold">{currentChat.participants[0].name}</div>
              <div className="text-xs text-green-600">
                {currentChat.participants[0].isOnline ? 'онлайн' : 'был(а) недавно'}
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <Icon name="Phone" size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="Video" size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="MoreVertical" size={20} />
            </Button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {chatMessages.map((msg) => {
              const isOwn = msg.senderId === currentUser.id;
              return (
                <div key={msg.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs ${isOwn ? 'bg-blue-600 text-white rounded-2xl rounded-tr-none' : 'bg-white rounded-2xl rounded-tl-none shadow-sm'} px-4 py-2`}>
                    <p>{msg.text}</p>
                    <span className={`text-xs ${isOwn ? 'text-blue-100' : 'text-gray-500'}`}>{msg.timestamp}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 bg-white border-t">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Icon name="Paperclip" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Image" size={20} />
              </Button>
              <Input placeholder="Написать сообщение..." className="flex-1" />
              <Button size="icon" className="bg-blue-600 hover:bg-blue-700">
                <Icon name="Send" size={20} />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center bg-gray-50">
          <div className="text-center">
            <Icon name="MessageCircle" size={64} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Выберите чат, чтобы начать общение</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesTab;
