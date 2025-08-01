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
  '/catalog',
  '/category/transport',
  '/category/elektronika',
  '/category/elektronnye-sigatery',
  '/category/kal-yannaya-produktsiya',
  '/category/lichnye-veschi',
  '/about',
  '/contacts',
  '/privacy-policy',
  '/terms',
  '/sitemap',
  '/how-to-buy',
  '/how-to-sell',
  '/pricing',
  '/advertising',
  '/help',
  // Можно добавить больше…
];

// Генерация
staticRoutes.forEach((path) => {
  sitemap.write({ url: path });
});

sitemap.end();