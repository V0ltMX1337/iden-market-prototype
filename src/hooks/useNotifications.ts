import { useEffect, useState } from 'react';

interface NotificationOptions {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  requireInteraction?: boolean;
}

export const useNotifications = () => {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Проверяем поддержку уведомлений
    setIsSupported('Notification' in window && 'serviceWorker' in navigator);
    
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  // Запрос разрешения на уведомления
  const requestPermission = async (): Promise<NotificationPermission> => {
    if (!isSupported) {
      return 'denied';
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result;
    } catch (error) {
      console.error('Ошибка запроса разрешения на уведомления:', error);
      return 'denied';
    }
  };

  // Показать уведомление
  const showNotification = async (options: NotificationOptions): Promise<void> => {
    if (!isSupported || permission !== 'granted') {
      return;
    }

    try {
      // Используем Service Worker для показа уведомлений на мобильных
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.ready;
        
        await registration.showNotification(options.title, {
          body: options.body,
          icon: options.icon || '/icon-192x192.png',
          badge: options.badge || '/icon-72x72.png',
          tag: options.tag,
          requireInteraction: options.requireInteraction || false,
          actions: [
            {
              action: 'reply',
              title: 'Ответить',
              icon: '/icons/reply.png'
            },
            {
              action: 'mark-read',
              title: 'Прочитано',
              icon: '/icons/check.png'
            }
          ],
          data: {
            url: window.location.href,
            timestamp: Date.now()
          }
        });
      } else {
        // Fallback для старых браузеров
        const notification = new Notification(options.title, {
          body: options.body,
          icon: options.icon || '/icon-192x192.png',
          tag: options.tag
        });

        // Автоматически закрываем через 5 секунд
        setTimeout(() => notification.close(), 5000);
      }
    } catch (error) {
      console.error('Ошибка показа уведомления:', error);
    }
  };

  // Показать уведомление о новом сообщении
  const showMessageNotification = async (sender: string, message: string, chatId?: string): Promise<void> => {
    await showNotification({
      title: `Новое сообщение от ${sender}`,
      body: message,
      icon: '/icon-192x192.png',
      tag: `message-${chatId || sender}`,
      requireInteraction: true
    });
  };

  // Показать уведомление о новом посте в канале
  const showChannelNotification = async (channelName: string, author: string, content: string): Promise<void> => {
    await showNotification({
      title: `Новый пост в ${channelName}`,
      body: `${author}: ${content.slice(0, 100)}${content.length > 100 ? '...' : ''}`,
      icon: '/icon-192x192.png',
      tag: `channel-${channelName}`,
      requireInteraction: false
    });
  };

  // Очистить уведомления с определенным тегом
  const clearNotifications = async (tag?: string): Promise<void> => {
    if (!isSupported || !('serviceWorker' in navigator)) {
      return;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      const notifications = await registration.getNotifications({ tag });
      
      notifications.forEach(notification => notification.close());
    } catch (error) {
      console.error('Ошибка очистки уведомлений:', error);
    }
  };

  return {
    permission,
    isSupported,
    requestPermission,
    showNotification,
    showMessageNotification,
    showChannelNotification,
    clearNotifications
  };
};

export default useNotifications;