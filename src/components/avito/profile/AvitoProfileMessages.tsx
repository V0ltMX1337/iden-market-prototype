import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Icon from "@/components/ui/icon";
import { storeApi } from "@/lib/store";
import type { ChatSummary, Message, User, Ad } from "@/lib/types";
import { useAuth } from "@/hooks/useAuth";

interface Chat extends ChatSummary {
  interlocutorName: string;
  interlocutorPhotoUrl?: string;
  adTitle: string;
}

const AvitoProfileMessages = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messageRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Отслеживание размера экрана
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setShowSidebar(!selectedChat);
      } else {
        setShowSidebar(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [selectedChat]);

  useEffect(() => {
    if (!user) return;
    const fetchChats = async () => {
      const chatSummaries = await storeApi.getUserChats(user.id);

      const interlocutorIds = Array.from(new Set(chatSummaries.map(c => c.otherUserId).filter(Boolean)));
      const interlocutors = await Promise.all(interlocutorIds.map(id => storeApi.getUserById(id)));
      const interlocutorMap = new Map(interlocutors.map(u => [u.id, u]));

      const adIds = Array.from(new Set(chatSummaries.map(c => c.adId)));
      const ads = await Promise.all(adIds.map(id => storeApi.getAdById(id)));
      const adMap = new Map(ads.map(a => [a.id, a]));

      const chatsWithDetails = await Promise.all(chatSummaries.map(async chat => {
        const interlocutor = interlocutorMap.get(chat.otherUserId);
        const ad = adMap.get(chat.adId);
        let lastMessage = chat.lastMessage;
        if (!lastMessage && chat.adId && chat.otherUserId) {
          const msgs = await storeApi.getMessages(chat.adId, user.id, chat.otherUserId);
          lastMessage = msgs.length ? msgs[msgs.length - 1].content : "Сообщений пока нет";
        }
        return {
          ...chat,
          interlocutorName: interlocutor?.firstName || interlocutor?.email || "Неизвестный",
          interlocutorPhotoUrl: interlocutor?.photoUrl,
          adTitle: ad?.title || "Объявление",
          lastMessage: lastMessage || "Сообщений пока нет",
        };
      }));

      setChats(chatsWithDetails);
    };
    fetchChats();
  }, [user]);

  const loadMessages = async (chat: Chat) => {
    if (!user || !chat.adId || !chat.otherUserId) return;
    const msgs = await storeApi.getMessages(chat.adId, user.id, chat.otherUserId);
    setMessages(msgs);
    
    // Отмечаем непрочитанные сообщения как прочитанные
    const unreadMessages = msgs.filter(msg => 
      msg.receiverId === user.id && !msg.read
    );
    
    for (const msg of unreadMessages) {
      try {
        await storeApi.markMessageAsRead(msg.id);
      } catch (error) {
        console.error('Ошибка отмечания сообщения как прочитанного:', error);
      }
    }
  };

  const handleSelectChat = async (chat: Chat) => {
    setSelectedChat(chat);
    await loadMessages(chat);
    // На мобильных скрываем сайдбар при выборе чата
    if (isMobile) {
      setShowSidebar(false);
    }
  };

  const handleBackToChats = () => {
    setSelectedChat(null);
    setShowSidebar(true);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedChat || !user) return;
    if (!selectedChat.adId || !selectedChat.otherUserId) return;
    const msg = {
      adId: selectedChat.adId,
      senderId: user.id,
      receiverId: selectedChat.otherUserId,
      content: newMessage.trim(),
    };
    const sent = await storeApi.sendMessage(msg);
    setMessages(prev => [...prev, sent]);
    setNewMessage("");
  };

  // Прокрутка к последнему прочитанному сообщению
  const scrollToLastReadMessage = useCallback(() => {
    if (!user || messages.length === 0) return;
    
    // Находим последнее прочитанное сообщение пользователя
    const userMessages = messages.filter(msg => msg.receiverId === user.id);
    const lastReadMessage = userMessages
      .slice()
      .reverse()
      .find(msg => msg.read);
    
    if (lastReadMessage) {
      const messageElement = messageRefs.current.get(lastReadMessage.id);
      if (messageElement && messagesContainerRef.current) {
        messageElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
        return;
      }
    }
    
    // Если нет прочитанных сообщений, прокручиваем вниз
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, user]);

  // Прокрутка при загрузке сообщений
  useEffect(() => {
    if (messages.length > 0) {
      // Небольшая задержка для отрисовки DOM
      setTimeout(scrollToLastReadMessage, 100);
    }
  }, [messages, scrollToLastReadMessage]);

  return (
    <div className="flex h-[700px] md:h-[700px] h-[calc(100vh-120px)] bg-white rounded-lg overflow-hidden border shadow-sm">
      {/* Sidebar */}
      <div className={`${
        isMobile 
          ? (showSidebar ? 'w-full' : 'hidden') 
          : 'w-80'
      } border-r bg-gray-50 flex flex-col`}>
        <div className="p-3 md:p-4 border-b bg-white">
          <h3 className="font-semibold text-lg">Диалоги</h3>
        </div>
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={`${chat.adId}-${chat.otherUserId}`}
              onClick={() => handleSelectChat(chat)}
              className={`p-3 md:p-4 cursor-pointer hover:bg-white transition-colors ${selectedChat?.adId === chat.adId && selectedChat.otherUserId === chat.otherUserId ? "bg-white border-l-2 border-blue-500" : ""}`}
            >
              <div className="flex items-center space-x-3">
                <Avatar className="cursor-pointer w-10 h-10 md:w-10 md:h-10" onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/user/${chat.otherUserId}`);
                }}>
                  <AvatarImage src={chat.interlocutorPhotoUrl} />
                  <AvatarFallback className="text-sm">{chat.interlocutorName.charAt(0) || "?"}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-sm md:text-base truncate pr-2">{chat.interlocutorName}</span>
                    <span className="text-xs text-gray-400 flex-shrink-0">
                      {chat.lastTimestamp && new Date(chat.lastTimestamp).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <div className="text-xs md:text-sm text-gray-500 truncate mb-1">{chat.lastMessage}</div>
                  <div className="text-xs text-blue-600 hover:underline cursor-pointer truncate" onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/product/${chat.adId}`);
                  }}>
                    {chat.adTitle}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat */}
      <div className={`${
        isMobile 
          ? (showSidebar ? 'hidden' : 'w-full') 
          : 'flex-1'
      } flex flex-col`}>
        {selectedChat ? (
          <>
            <div className="p-3 md:p-4 border-b bg-white flex justify-between items-center">
              <div className="flex items-center space-x-2 md:space-x-3 flex-1 min-w-0">
                {isMobile && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleBackToChats}
                    className="p-1 mr-1 flex-shrink-0"
                  >
                    <Icon name="ArrowLeft" size={16} />
                  </Button>
                )}
                <Avatar className="w-8 h-8 md:w-10 md:h-10 cursor-pointer flex-shrink-0" onClick={() => navigate(`/user/${selectedChat.otherUserId}`)}>
                  <AvatarImage src={selectedChat.interlocutorPhotoUrl} />
                  <AvatarFallback className="text-sm">{selectedChat.interlocutorName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm md:text-base truncate">{selectedChat.interlocutorName}</div>
                  <div className="text-xs text-gray-500 cursor-pointer hover:underline truncate" onClick={() => navigate(`/product/${selectedChat.adId}`)}>
                    {selectedChat.adTitle}
                  </div>
                </div>
              </div>
              {!isMobile && (
                <Button variant="outline" size="sm" onClick={() => navigate(`/user/${selectedChat.otherUserId}`)} className="flex-shrink-0">
                  Перейти к пользователю
                </Button>
              )}
            </div>
            <div 
              ref={messagesContainerRef}
              className="flex-1 p-3 md:p-4 overflow-y-auto space-y-2 md:space-y-3 bg-gray-50"
            >
              {messages.map((msg) => {
                const isMyMessage = msg.senderId === user?.id;
                const isUnread = msg.receiverId === user?.id && !msg.read;
                
                return (
                  <div 
                    key={msg.id} 
                    ref={el => {
                      if (el) {
                        messageRefs.current.set(msg.id, el);
                      } else {
                        messageRefs.current.delete(msg.id);
                      }
                    }}
                    className={`flex ${isMyMessage ? "justify-end" : "justify-start"} relative`}
                  >
                    <div className={`px-3 md:px-4 py-2 rounded-lg max-w-xs md:max-w-sm relative ${
                      isMyMessage 
                        ? "bg-blue-500 text-white" 
                        : isUnread 
                          ? "bg-yellow-50 text-black shadow-md border-l-4 border-yellow-400" 
                          : "bg-white text-black shadow"
                    }`}>
                      {isUnread && (
                        <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-yellow-400 rounded-full"></div>
                      )}
                      <p className="text-sm md:text-base break-words">{msg.content}</p>
                      <div className={`text-xs mt-1 text-right flex items-center justify-end gap-1 ${
                        isMyMessage ? "text-blue-100" : "text-gray-400"
                      }`}>
                        {new Date(msg.timestamp).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}
                        {isMyMessage && msg.read && (
                          <Icon name="CheckCheck" size={12} className="text-blue-200" />
                        )}
                        {isMyMessage && !msg.read && (
                          <Icon name="Check" size={12} className="text-blue-200" />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
              {messages.length === 0 && (
                <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                  Сообщений пока нет
                </div>
              )}
            </div>
            <div className="p-3 md:p-4 border-t bg-white flex items-center space-x-2">
              <Input
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                onKeyDown={e => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                placeholder="Введите сообщение..."
                className="text-sm md:text-base"
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                size={isMobile ? "sm" : "default"}
                className="flex-shrink-0"
              >
                <Icon name="Send" size={isMobile ? 14 : 16} />
              </Button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 p-4">
            <div className="text-center">
              <Icon name="MessageCircle" size={48} className="mx-auto mb-4 text-gray-300" />
              <p className="text-sm md:text-base">{isMobile ? "Выберите диалог" : "Выберите диалог для просмотра сообщений"}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvitoProfileMessages;