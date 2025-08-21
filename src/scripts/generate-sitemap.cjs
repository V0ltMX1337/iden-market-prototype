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
  '/category/transport/avtomobili',
  '/category/transport/mototsikly-i-mototehnika',
  '/category/elektronika',
  '/category/elektronika/telefony',
  '/category/elektronika/telefony/mobil-nye-telefony',
  '/category/elektronika/telefony/aksessuary',
  '/category/elektronika/audio-i-video',
  '/category/elektronika/audio-i-video/televizory-i-proektory',
  '/category/elektronika/audio-i-video/naushniki',
  '/category/elektronika/audio-i-video/akustika-kolonki-sabvufery',
  '/category/elektronika/audio-i-video/muzykal-nye-tsentry-magnitoly',
  '/category/elektronika/tovary-dlya-komp-yutera',
  '/category/elektronika/tovary-dlya-komp-yutera/komplektuyuschie',
  '/category/elektronika/tovary-dlya-komp-yutera/komplektuyuschie/cd-dvd-i-blu-ray-privody',
  '/category/elektronika/tovary-dlya-komp-yutera/komplektuyuschie/bloki-pitaniya',
  '/category/elektronika/tovary-dlya-komp-yutera/komplektuyuschie/videokarty',
  '/category/elektronika/tovary-dlya-komp-yutera/komplektuyuschie/zhestkie-diski',
  '/category/elektronika/tovary-dlya-komp-yutera/komplektuyuschie/zvukovye-karty',
  '/category/elektronika/tovary-dlya-komp-yutera/komplektuyuschie/korpusa',
  '/category/elektronika/tovary-dlya-komp-yutera/komplektuyuschie/materinskie-platy',
  '/category/elektronika/tovary-dlya-komp-yutera/komplektuyuschie/operativnaya-pamyat',
  '/category/elektronika/tovary-dlya-komp-yutera/komplektuyuschie/protsessory',
  '/category/elektronika/tovary-dlya-komp-yutera/komplektuyuschie/sistemy-ohlazhdeniya',
  '/category/elektronika/tovary-dlya-komp-yutera/monitory-i-zapchasti',
  '/category/elektronika/tovary-dlya-komp-yutera/setevoe-oborudovanie',
  '/category/elektronika/tovary-dlya-komp-yutera/klaviatury-i-myshi',
  '/category/elektronika/tovary-dlya-komp-yutera/aksessuary',
  '/category/elektronika/tovary-dlya-komp-yutera/gotovye-komp-yutery',
  '/category/elektronika/tovary-dlya-komp-yutera/fleshki-i-karty-pamyati',
  '/category/uslugi',
  '/category/uslugi/avtoservis-arenda',
  '/category/uslugi/komp-yuternaya-pomosch',
  '/category/uslugi/it-dizayn-marketing',
  '/category/uslugi/gruzchiki-skladskie-uslugi',
  '/category/elektronnye-sigatery',
  '/category/kal-yannaya-produktsiya',
  '/category/lichnye-veschi',
  '/category/lichnye-veschi/elektrosamokaty',
  '/category/lichnye-veschi/elektrovelosipedy',
  '/category/lichnye-veschi/chasy',
  '/category/lichnye-veschi/igrushki',
  '/category/lichnye-veschi/mebel',
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