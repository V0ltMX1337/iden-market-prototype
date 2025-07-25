import { useEffect, useState } from "react";
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
  };

  const handleSelectChat = async (chat: Chat) => {
    setSelectedChat(chat);
    await loadMessages(chat);
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

  return (
    <div className="flex h-[700px] bg-white rounded-lg overflow-hidden border shadow-sm">
      {/* Sidebar */}
      <div className="w-80 border-r bg-gray-50 flex flex-col">
        <div className="p-4 border-b bg-white">
          <h3 className="font-semibold text-lg">Диалоги</h3>
        </div>
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={`${chat.adId}-${chat.otherUserId}`}
              onClick={() => handleSelectChat(chat)}
              className={`p-4 cursor-pointer hover:bg-white ${selectedChat?.adId === chat.adId && selectedChat.otherUserId === chat.otherUserId ? "bg-white font-bold" : ""}`}
            >
              <div className="flex items-center space-x-3">
                <Avatar className="cursor-pointer" onClick={() => navigate(`/user/${chat.otherUserId}`)}>
                  <AvatarImage src={chat.interlocutorPhotoUrl} />
                  <AvatarFallback>{chat.interlocutorName.charAt(0) || "?"}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{chat.interlocutorName}</span>
                    <span className="text-xs text-gray-400">
                      {chat.lastTimestamp && new Date(chat.lastTimestamp).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 truncate">{chat.lastMessage}</div>
                  <div className="text-xs text-blue-600 hover:underline cursor-pointer" onClick={() => navigate(`/proudct/${chat.adId}`)}>
                    {chat.adTitle}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            <div className="p-4 border-b bg-white flex justify-between items-center" onClick={() => navigate(`/user/${selectedChat.otherUserId}`)}>
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={selectedChat.interlocutorPhotoUrl} />
                  <AvatarFallback>{selectedChat.interlocutorName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{selectedChat.interlocutorName}</div>
                  <div className="text-xs text-gray-500 cursor-pointer hover:underline" onClick={() => navigate(`/product/${selectedChat.adId}`)}>
                    {selectedChat.adTitle}
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => navigate(`/user/${selectedChat.otherUserId}`)}>
                Перейти к пользователю
              </Button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.senderId === user?.id ? "justify-end" : "justify-start"}`}>
                  <div className={`px-4 py-2 rounded-lg max-w-sm ${msg.senderId === user?.id ? "bg-blue-500 text-white" : "bg-white text-black shadow"}`}>
                    <p>{msg.content}</p>
                    <div className="text-xs text-gray-300 mt-1 text-right">
                      {new Date(msg.timestamp).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t bg-white flex items-center space-x-2">
              <Input
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSendMessage()}
                placeholder="Введите сообщение..."
              />
              <Button onClick={handleSendMessage}>
                <Icon name="Send" size={16} />
              </Button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Выберите диалог
          </div>
        )}
      </div>
    </div>
  );
};

export default AvitoProfileMessages;
