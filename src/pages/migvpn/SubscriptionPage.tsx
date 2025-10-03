import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { vpnApi, VPNSubscription } from './api/vpnApi';
import { Platform, platformApps } from './types';

const SubscriptionPage: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [searchParams] = useSearchParams();
  const server = searchParams.get('server') || 's1';
  
  const [subscription, setSubscription] = useState<VPNSubscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('ios');
  const [copiedUrl, setCopiedUrl] = useState(false);

  useEffect(() => {
    const fetchSubscription = async () => {
      if (!token) return;
      
      setLoading(true);
      const data = await vpnApi.getMockSubscription(token, server);
      setSubscription(data);
      setLoading(false);
    };

    fetchSubscription();
  }, [token, server]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const openSubscriptionUrl = () => {
    if (subscription?.subscription_url) {
      window.location.href = subscription.subscription_url;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysRemaining = (dateString: string) => {
    const end = new Date(dateString);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Icon name="Loader" className="text-yellow-500 animate-spin" size={48} />
          <p className="text-yellow-500/70 text-lg">Загрузка подписки...</p>
        </div>
      </div>
    );
  }

  if (!subscription?.success) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <Card className="bg-black border-yellow-500/30 max-w-md w-full">
          <CardContent className="p-8 text-center space-y-4">
            <Icon name="AlertCircle" className="text-red-500 mx-auto" size={64} />
            <h2 className="text-2xl font-bold text-yellow-500">Ошибка</h2>
            <p className="text-yellow-500/70">{subscription?.error || 'Не удалось загрузить подписку'}</p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-yellow-500 hover:bg-yellow-600 text-black"
            >
              Попробовать снова
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const platformApp = platformApps[selectedPlatform];
  const daysLeft = subscription.subscription_end ? getDaysRemaining(subscription.subscription_end) : 0;

  return (
    <div className="min-h-screen bg-black text-yellow-500">
      {/* Header */}
      <div className="bg-gradient-to-b from-yellow-500/10 to-transparent border-b border-yellow-500/20">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <h1 className="text-6xl md:text-8xl font-bold text-yellow-500/50 tracking-wider">
              MIGVPN
            </h1>
            <div className="flex items-center justify-center space-x-4">
              <a
                href="https://vk.com/migvpn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-500/70 hover:text-yellow-500 transition-colors"
              >
                <Icon name="Share2" size={24} />
              </a>
              <a
                href="https://t.me/migvpn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-500/70 hover:text-yellow-500 transition-colors"
              >
                <Icon name="Send" size={24} />
              </a>
              <a
                href="https://instagram.com/migvpn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-500/70 hover:text-yellow-500 transition-colors"
              >
                <Icon name="Instagram" size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-8">
        {/* Subscription Info */}
        <Card className="bg-black border-yellow-500/30">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Client Name */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-yellow-500/70">
                  <Icon name="User" size={20} />
                  <span className="text-sm">Клиент</span>
                </div>
                <p className="text-2xl font-bold text-yellow-500">{subscription.client_name}</p>
              </div>

              {/* Subscription End */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-yellow-500/70">
                  <Icon name="Calendar" size={20} />
                  <span className="text-sm">Активна до</span>
                </div>
                <p className="text-2xl font-bold text-yellow-500">
                  {subscription.subscription_end && formatDate(subscription.subscription_end)}
                </p>
                <Badge
                  variant="outline"
                  className={`${
                    daysLeft > 30
                      ? 'border-green-500 text-green-500'
                      : daysLeft > 7
                      ? 'border-yellow-500 text-yellow-500'
                      : 'border-red-500 text-red-500'
                  }`}
                >
                  {daysLeft > 0 ? `Осталось ${daysLeft} дней` : 'Истекла'}
                </Badge>
              </div>

              {/* Server */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-yellow-500/70">
                  <Icon name="Server" size={20} />
                  <span className="text-sm">Сервер</span>
                </div>
                <p className="text-2xl font-bold text-yellow-500 uppercase">{server}</p>
                <Badge variant="outline" className="border-green-500 text-green-500">
                  Активен
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* QR Code and Quick Actions */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* QR Code */}
          <Card className="bg-black border-yellow-500/30">
            <CardContent className="p-8 text-center space-y-6">
              <h2 className="text-2xl font-bold text-yellow-500">QR-код подписки</h2>
              <div className="bg-white p-4 rounded-lg inline-block">
                <img
                  src={subscription.qr_code}
                  alt="VPN QR Code"
                  className="w-64 h-64"
                />
              </div>
              <p className="text-yellow-500/70 text-sm">
                Отсканируйте QR-код в приложении VPN
              </p>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-black border-yellow-500/30">
            <CardContent className="p-8 space-y-6">
              <h2 className="text-2xl font-bold text-yellow-500">Быстрое подключение</h2>
              
              <div className="space-y-4">
                <Button
                  onClick={openSubscriptionUrl}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black text-lg py-6"
                >
                  <Icon name="Zap" className="mr-2" size={24} />
                  Добавить подписку
                </Button>
                <p className="text-yellow-500/70 text-sm text-center">
                  Автоматически откроет приложение VPN
                </p>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-yellow-500/20"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-black px-2 text-yellow-500/50">или</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => subscription.subscription_url && copyToClipboard(subscription.subscription_url)}
                  variant="outline"
                  className="w-full border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/10"
                >
                  {copiedUrl ? (
                    <>
                      <Icon name="Check" className="mr-2" size={20} />
                      Скопировано!
                    </>
                  ) : (
                    <>
                      <Icon name="Copy" className="mr-2" size={20} />
                      Скопировать ссылку
                    </>
                  )}
                </Button>

                <div className="p-3 bg-yellow-500/5 rounded border border-yellow-500/20">
                  <code className="text-xs text-yellow-500/70 break-all">
                    {subscription.subscription_url}
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Platform Selection */}
        <Card className="bg-black border-yellow-500/30">
          <CardContent className="p-8 space-y-6">
            <h2 className="text-2xl font-bold text-yellow-500 text-center">
              Инструкция по подключению
            </h2>

            {/* Platform Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {(Object.keys(platformApps) as Platform[]).map((platform) => (
                <button
                  key={platform}
                  onClick={() => setSelectedPlatform(platform)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedPlatform === platform
                      ? 'border-yellow-500 bg-yellow-500/10'
                      : 'border-yellow-500/30 hover:border-yellow-500/50'
                  }`}
                >
                  <div className="text-3xl mb-2">{platformApps[platform].icon}</div>
                  <div className="text-sm font-medium text-yellow-500 capitalize">
                    {platform}
                  </div>
                </button>
              ))}
            </div>

            {/* Instructions */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-yellow-500">
                  {platformApp.name}
                </h3>
                <Button
                  onClick={() => window.open(platformApp.downloadUrl, '_blank')}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black"
                >
                  <Icon name="Download" className="mr-2" size={16} />
                  Скачать
                </Button>
              </div>

              <ol className="space-y-3">
                {platformApp.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-500/20 border border-yellow-500/50 flex items-center justify-center">
                      <span className="text-yellow-500 font-bold text-sm">{index + 1}</span>
                    </div>
                    <p className="text-yellow-500/70 pt-1">{instruction}</p>
                  </li>
                ))}
              </ol>
            </div>
          </CardContent>
        </Card>

        {/* Support */}
        <Card className="bg-gradient-to-r from-yellow-500/10 to-yellow-500/5 border-yellow-500/30">
          <CardContent className="p-8 text-center space-y-4">
            <Icon name="HelpCircle" className="text-yellow-500 mx-auto" size={48} />
            <h3 className="text-xl font-bold text-yellow-500">Нужна помощь?</h3>
            <p className="text-yellow-500/70">
              Свяжитесь с нами в социальных сетях или напишите в поддержку
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Button
                variant="outline"
                className="border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/10"
                onClick={() => window.open('https://t.me/migvpn_support', '_blank')}
              >
                <Icon name="MessageCircle" className="mr-2" size={16} />
                Telegram
              </Button>
              <Button
                variant="outline"
                className="border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/10"
                onClick={() => window.open('https://vk.com/migvpn', '_blank')}
              >
                <Icon name="Send" className="mr-2" size={16} />
                VK
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="border-t border-yellow-500/20 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center">
          <p className="text-yellow-500/50 text-sm">
            © 2025 MIGVPN. Безопасное и быстрое VPN-подключение
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;