import { useState, useEffect, useRef } from 'react';

interface OnlineStatusConfig {
  heartbeatInterval?: number; // Интервал отправки heartbeat в мс (по умолчанию 30 секунд)
  apiEndpoint?: string; // Эндпоинт для отправки статуса
  userId?: string; // ID пользователя
}

interface OnlineUser {
  id: string;
  lastSeen: Date;
  isOnline: boolean;
}

export const useOnlineStatus = (config: OnlineStatusConfig = {}) => {
  const {
    heartbeatInterval = 30000, // 30 секунд
    apiEndpoint = '/api/user/online-status',
    userId
  } = config;

  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [lastActiveTime, setLastActiveTime] = useState<Date>(new Date());
  const heartbeatIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const activityTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastActivityRef = useRef<Date>(new Date());

  // Функция отправки статуса на сервер (закомментирована для будущего использования)
  const sendOnlineStatus = async (online: boolean, lastActivity?: Date) => {
    if (!userId || !apiEndpoint) return;

    try {
      /* 
      // Раскомментировать когда будет готово API
      const response = await fetch(`${apiEndpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}` // Нужно получить токен из useAuth
        },
        body: JSON.stringify({
          userId,
          isOnline: online,
          lastActivity: lastActivity?.toISOString() || new Date().toISOString(),
          userAgent: navigator.userAgent,
          timestamp: Date.now()
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Online status updated:', result);
      */
      
      // Временная заглушка для демонстрации
      console.log('📡 [Online Status] Sending to server:', {
        userId,
        isOnline: online,
        lastActivity: lastActivity?.toISOString() || new Date().toISOString(),
        timestamp: Date.now()
      });
    } catch (error) {
      console.error('Ошибка отправки онлайн статуса:', error);
    }
  };

  // Обработчик активности пользователя
  const handleUserActivity = () => {
    const now = new Date();
    lastActivityRef.current = now;
    setLastActiveTime(now);

    // Сбрасываем таймер неактивности
    if (activityTimeoutRef.current) {
      clearTimeout(activityTimeoutRef.current);
    }

    // Устанавливаем пользователя как оффлайн через 5 минут неактивности
    activityTimeoutRef.current = setTimeout(() => {
      setIsOnline(false);
      sendOnlineStatus(false, lastActivityRef.current);
    }, 5 * 60 * 1000); // 5 минут

    // Если пользователь стал активным после оффлайна
    if (!isOnline && navigator.onLine) {
      setIsOnline(true);
      sendOnlineStatus(true, now);
    }
  };

  // Обработчики событий браузера
  const handleOnline = () => {
    setIsOnline(true);
    sendOnlineStatus(true);
  };

  const handleOffline = () => {
    setIsOnline(false);
    sendOnlineStatus(false);
  };

  // Обработчик закрытия вкладки/браузера
  const handleBeforeUnload = () => {
    sendOnlineStatus(false, lastActivityRef.current);
  };

  // Обработчик смены видимости вкладки
  const handleVisibilityChange = () => {
    if (document.hidden) {
      // Вкладка скрыта
      sendOnlineStatus(false, lastActivityRef.current);
    } else {
      // Вкладка видима
      if (navigator.onLine) {
        setIsOnline(true);
        handleUserActivity();
      }
    }
  };

  useEffect(() => {
    // Добавляем слушателей событий
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // События активности пользователя
    const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    activityEvents.forEach(event => {
      document.addEventListener(event, handleUserActivity, { passive: true });
    });

    // Запускаем heartbeat
    if (userId && apiEndpoint) {
      heartbeatIntervalRef.current = setInterval(() => {
        if (isOnline) {
          sendOnlineStatus(true, lastActivityRef.current);
        }
      }, heartbeatInterval);
    }

    // Инициализируем как онлайн при маунте компонента
    if (navigator.onLine && userId) {
      handleUserActivity();
    }

    // Cleanup
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      activityEvents.forEach(event => {
        document.removeEventListener(event, handleUserActivity);
      });

      if (heartbeatIntervalRef.current) {
        clearInterval(heartbeatIntervalRef.current);
      }

      if (activityTimeoutRef.current) {
        clearTimeout(activityTimeoutRef.current);
      }

      // Отправляем статус оффлайн при размонтировании
      if (userId) {
        sendOnlineStatus(false, lastActivityRef.current);
      }
    };
  }, [userId, apiEndpoint, heartbeatInterval, isOnline]);

  // Функция для получения онлайн статуса других пользователей (заглушка)
  const getUsersOnlineStatus = async (userIds: string[]): Promise<OnlineUser[]> => {
    try {
      /*
      // Раскомментировать когда будет готово API
      const response = await fetch(`${apiEndpoint}/bulk`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
        },
        body: JSON.stringify({ userIds })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
      */

      // Временная заглушка
      console.log('📡 [Online Status] Requesting users status:', userIds);
      return userIds.map(id => ({
        id,
        lastSeen: new Date(),
        isOnline: Math.random() > 0.5 // Случайный статус для демо
      }));
    } catch (error) {
      console.error('Ошибка получения статуса пользователей:', error);
      return [];
    }
  };

  // Принудительная отправка статуса
  const updateOnlineStatus = (online: boolean) => {
    setIsOnline(online);
    sendOnlineStatus(online, lastActivityRef.current);
  };

  return {
    isOnline,
    lastActiveTime,
    updateOnlineStatus,
    getUsersOnlineStatus,
    sendOnlineStatus: () => sendOnlineStatus(isOnline, lastActivityRef.current)
  };
};

export default useOnlineStatus;