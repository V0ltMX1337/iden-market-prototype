import { useEffect, useState } from 'react';
import { useUnreadMessages } from '@/hooks/useUnreadMessages';

interface NotificationTitleProps {
  originalTitle: string;
}

export const NotificationTitle = ({ originalTitle }: NotificationTitleProps) => {
  const { hasUnread } = useUnreadMessages();
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    if (hasUnread) {
      setIsBlinking(true);
      
      // Возвращаем к оригинальному заголовку через 3 секунды
      const timer = setTimeout(() => {
        setIsBlinking(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [hasUnread]);

  // Устанавливаем заголовок документа
  useEffect(() => {
    if (hasUnread && isBlinking) {
      document.title = "❗ 1 НЕПРОЧИТАННОЕ СООБЩЕНИЕ";
    } else {
      document.title = originalTitle;
    }

    return () => {
      // При размонтировании восстанавливаем оригинальный заголовок
      document.title = originalTitle;
    };
  }, [hasUnread, isBlinking, originalTitle]);

  return null; // Компонент ничего не рендерит
};