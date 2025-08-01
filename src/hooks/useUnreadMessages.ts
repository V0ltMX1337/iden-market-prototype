import { useState, useEffect } from 'react';
import { storeApi } from '@/lib/store';
import { useAuth } from '@/hooks/useAuth';
import type { Message } from '@/lib/types.tsx';

export interface UnreadMessagesState {
  count: number;
  hasUnread: boolean;
  messages: Message[];
}

export const useUnreadMessages = () => {
  const { user } = useAuth();
  const [unreadState, setUnreadState] = useState<UnreadMessagesState>({
    count: 0,
    hasUnread: false,
    messages: []
  });

  useEffect(() => {
    if (!user) {
      setUnreadState({ count: 0, hasUnread: false, messages: [] });
      return;
    }

    const fetchUnreadMessages = async () => {
      try {
        // Получаем все сообщения пользователя
        const messages = await storeApi.getMessagesByUserId(user.id);
        
        // Фильтруем непрочитанные сообщения, где пользователь - получатель
        const unreadMessages = messages.filter(
          (msg: Message) => msg.receiverId === user.id && !msg.read
        );

        setUnreadState({
          count: unreadMessages.length,
          hasUnread: unreadMessages.length > 0,
          messages: unreadMessages
        });
      } catch (error) {
        console.error('Error fetching unread messages:', error);
        setUnreadState({ count: 0, hasUnread: false, messages: [] });
      }
    };

    // Загружаем сначала
    fetchUnreadMessages();

    // Обновляем каждые 30 секунд
    const interval = setInterval(fetchUnreadMessages, 30000);

    return () => clearInterval(interval);
  }, [user]);

  return unreadState;
};