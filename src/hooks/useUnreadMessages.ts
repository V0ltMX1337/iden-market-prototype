import { useState, useEffect } from 'react';
import { storeApi } from '@/lib/store';
import { useAuth } from '@/hooks/useAuth';

export interface UnreadMessagesState {
  count: number;
  hasUnread: boolean;
}

export const useUnreadMessages = () => {
  const { user } = useAuth();
  const [unreadState, setUnreadState] = useState<UnreadMessagesState>({
    count: 0,
    hasUnread: false,
  });

  useEffect(() => {
    if (!user) {
      setUnreadState({ count: 0, hasUnread: false });
      return;
    }

    const fetchUnreadMessages = async () => {
      try {
        // Получаем все сообщения пользователя
        const { unreadCount } = await storeApi.getMessagesByUserId(user.id);
        setUnreadState({
          count: unreadCount,
          hasUnread: unreadCount > 0
        });
      } catch (error) {
        console.error('Error fetching unread messages:', error);
        setUnreadState({ count: 0, hasUnread: false });
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