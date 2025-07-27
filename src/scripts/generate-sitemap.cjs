const { createWriteStream } = require('fs');
const { SitemapStream } = require('sitemap');

const sitemap = new SitemapStream({ hostname: 'https://trivoads.ru' });
const writeStream = createWriteStream('./public/sitemap.xml');
sitemap.pipe(writeStream);

// Статические маршруты
const staticRoutes = [
  '/',
  '/login',
  '/register',
  '/profile',
  '/ads',
  // Можно добавить больше…
];

// Генерация
staticRoutes.forEach((path) => {
  sitemap.write({ url: path });
});

sitemap.end();