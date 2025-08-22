import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface AdBannerProps {
  type?: 'horizontal' | 'vertical' | 'square';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const AdBanner = ({ type = 'horizontal', size = 'medium', className = '' }: AdBannerProps) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const getSizeClasses = () => {
    const sizes = {
      horizontal: {
        small: 'h-16 w-full',
        medium: 'h-24 w-full',
        large: 'h-32 w-full'
      },
      vertical: {
        small: 'h-64 w-32',
        medium: 'h-80 w-40',
        large: 'h-96 w-48'
      },
      square: {
        small: 'h-32 w-32',
        medium: 'h-40 w-40',
        large: 'h-48 w-48'
      }
    };
    return sizes[type][size];
  };

  const ads = {
    horizontal: [
      {
        title: "Получи займ до 100,000₽",
        subtitle: "Одобрение за 15 минут",
        cta: "Получить займ",
        gradient: "from-blue-500 to-purple-600",
        icon: "CreditCard"
      },
      {
        title: "Скидки до 70% на технику",
        subtitle: "Только сегодня в М.Видео",
        cta: "К скидкам",
        gradient: "from-red-500 to-pink-600",
        icon: "Smartphone"
      },
      {
        title: "Доставка продуктов за 30 мин",
        subtitle: "Бесплатно при заказе от 1000₽",
        cta: "Заказать",
        gradient: "from-green-500 to-emerald-600",
        icon: "ShoppingCart"
      }
    ],
    vertical: [
      {
        title: "Авто в кредит",
        subtitle: "От 5.5% годовых",
        cta: "Подробнее",
        gradient: "from-indigo-500 to-blue-600",
        icon: "Car"
      },
      {
        title: "Недвижимость",
        subtitle: "Лучшие предложения",
        cta: "Смотреть",
        gradient: "from-orange-500 to-red-600",
        icon: "Home"
      }
    ],
    square: [
      {
        title: "Работа мечты",
        subtitle: "Найди за 5 минут",
        cta: "Найти",
        gradient: "from-purple-500 to-pink-600",
        icon: "Briefcase"
      },
      {
        title: "Обучение",
        subtitle: "Курсы со скидкой",
        cta: "Учиться",
        gradient: "from-teal-500 to-cyan-600",
        icon: "GraduationCap"
      }
    ]
  };

  const currentAds = ads[type];
  const randomAd = currentAds[Math.floor(Math.random() * currentAds.length)];

  return (
    <Card className={`relative overflow-hidden group hover-lift animate-scale-in ${getSizeClasses()} ${className}`}>
      <div className={`absolute inset-0 bg-gradient-to-r ${randomAd.gradient} opacity-90`} />
      <div className="absolute inset-0 bg-black/10" />
      
      <div className="relative z-10 h-full flex items-center justify-between p-4 text-white">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Icon name={randomAd.icon as any} size={type === 'square' ? 16 : 20} className="text-white/80" />
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full backdrop-blur">
              Реклама
            </span>
          </div>
          <h3 className={`font-bold text-shadow ${
            type === 'horizontal' 
              ? size === 'small' ? 'text-sm' : size === 'medium' ? 'text-base' : 'text-lg'
              : type === 'square' 
                ? 'text-sm' 
                : 'text-base'
          }`}>
            {randomAd.title}
          </h3>
          <p className={`text-white/90 ${
            type === 'horizontal' 
              ? size === 'small' ? 'text-xs' : 'text-sm'
              : type === 'square' 
                ? 'text-xs' 
                : 'text-sm'
          }`}>
            {randomAd.subtitle}
          </p>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <Button
            size="sm"
            variant="secondary"
            className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur text-xs"
            onClick={() => {
              // Здесь будет логика перехода к рекламодателю
              console.log('Ad clicked:', randomAd.title);
            }}
          >
            {randomAd.cta}
          </Button>
          
          <Button
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0 text-white/60 hover:text-white/80 hover:bg-white/10"
            onClick={() => setIsVisible(false)}
          >
            <Icon name="X" size={12} />
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <div className="h-full bg-white/40 animate-shimmer" />
      </div>
    </Card>
  );
};

export default AdBanner;