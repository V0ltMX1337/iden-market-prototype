import { useEffect } from 'react';

interface SEOOptions {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

const DEFAULT_SEO = {
  title: 'TrivoMessenger - Современный мессенджер',
  description: 'TrivoMessenger - быстрый и безопасный мессенджер с каналами, группами и медиафайлами. Общайтесь с друзьями и коллегами удобно.',
  keywords: 'мессенджер, чат, общение, каналы, группы, сообщения'
};

export const useSEO = (options: SEOOptions = {}) => {
  useEffect(() => {
    const {
      title = DEFAULT_SEO.title,
      description = DEFAULT_SEO.description,
      keywords = DEFAULT_SEO.keywords,
      ogTitle = title,
      ogDescription = description,
      ogImage = '/og-image.png'
    } = options;

    // Обновляем title
    document.title = title;

    // Функция для обновления или создания meta тега
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Обновляем meta теги
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('robots', 'index, follow');
    
    // Open Graph теги
    updateMetaTag('og:title', ogTitle, true);
    updateMetaTag('og:description', ogDescription, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:url', window.location.href, true);
    
    // Twitter Card теги
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', ogTitle);
    updateMetaTag('twitter:description', ogDescription);
    updateMetaTag('twitter:image', ogImage);

    // Cleanup function для возврата к дефолтным значениям
    return () => {
      document.title = DEFAULT_SEO.title;
      updateMetaTag('description', DEFAULT_SEO.description);
      updateMetaTag('keywords', DEFAULT_SEO.keywords);
    };
  }, [options]);
};

export default useSEO;