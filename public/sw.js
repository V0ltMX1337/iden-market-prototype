// Service Worker для push уведомлений TrivoMessenger

const CACHE_NAME = 'trivomessenger-v1';
const urlsToCache = [
  '/',
  '/messenger',
  '/icon-192x192.png',
  '/icon-72x72.png'
];

// Установка Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// Обработка fetch запросов
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Возвращаем кешированный ответ или запрашиваем из сети
        return response || fetch(event.request);
      }
    )
  );
});

// Обработка push уведомлений
self.addEventListener('push', (event) => {
  const options = {
    body: 'У вас новое сообщение!',
    icon: '/icon-192x192.png',
    badge: '/icon-72x72.png',
    actions: [
      {
        action: 'open',
        title: 'Открыть чат'
      },
      {
        action: 'close',
        title: 'Закрыть'
      }
    ]
  };

  if (event.data) {
    try {
      const data = event.data.json();
      options.body = data.body || options.body;
      options.icon = data.icon || options.icon;
    } catch (e) {
      console.error('Ошибка парсинга push данных:', e);
    }
  }

  event.waitUntil(
    self.registration.showNotification('TrivoMessenger', options)
  );
});

// Обработка кликов по уведомлениям
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true })
        .then((clientList) => {
          // Ищем уже открытую вкладку с мессенджером
          for (const client of clientList) {
            if (client.url.includes('/messenger') && 'focus' in client) {
              return client.focus();
            }
          }
          
          // Если открытой вкладки нет, открываем новую
          if (clients.openWindow) {
            return clients.openWindow('/messenger/main');
          }
        })
    );
  }
});

// Обработка закрытия уведомлений
self.addEventListener('notificationclose', (event) => {
  console.log('Уведомление закрыто:', event.notification.tag);
});