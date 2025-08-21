// Performance optimization utilities

// Image lazy loading with intersection observer
export const createImageLazyLoader = () => {
  if (typeof window === 'undefined') return;
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const src = img.dataset.src;
        if (src) {
          img.src = src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '50px'
  });

  return imageObserver;
};

// Debounce function for search and input events
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Throttle function for scroll events
export const throttle = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let lastTime = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastTime >= delay) {
      func(...args);
      lastTime = now;
    }
  };
};

// Preload critical resources
export const preloadResource = (href: string, as: string) => {
  if (typeof window === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  document.head.appendChild(link);
};

// Optimize images with WebP fallback
export const getOptimizedImageUrl = (url: string, width?: number, quality = 85) => {
  if (!url) return '/placeholder.png';
  
  // Check if browser supports WebP
  const supportsWebP = typeof window !== 'undefined' && 
    window.HTMLCanvasElement &&
    document.createElement('canvas').toDataURL('image/webp').indexOf('webp') > -1;
  
  // If it's already an external URL, return as is
  if (url.startsWith('http')) {
    return url;
  }
  
  // Add optimization parameters
  const params = new URLSearchParams();
  if (width) params.append('w', width.toString());
  params.append('q', quality.toString());
  if (supportsWebP) params.append('f', 'webp');
  
  return `${url}?${params.toString()}`;
};

// Memory management for components
export const cleanupComponent = (cleanup: () => void) => {
  return () => {
    if (typeof cleanup === 'function') {
      cleanup();
    }
  };
};

// Virtual scrolling helper
export const calculateVirtualItems = (
  scrollTop: number,
  containerHeight: number,
  itemHeight: number,
  totalItems: number,
  overscan = 5
) => {
  const start = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const visibleCount = Math.ceil(containerHeight / itemHeight);
  const end = Math.min(totalItems, start + visibleCount + overscan * 2);
  
  return {
    start,
    end,
    offsetY: start * itemHeight,
    totalHeight: totalItems * itemHeight
  };
};

// Request idle callback polyfill
export const requestIdleCallback = (callback: () => void) => {
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    return window.requestIdleCallback(callback);
  }
  return setTimeout(callback, 1);
};

// Critical CSS detection
export const isCriticalCSS = () => {
  if (typeof window === 'undefined') return true;
  return window.innerWidth <= 768 || window.location.pathname === '/';
};