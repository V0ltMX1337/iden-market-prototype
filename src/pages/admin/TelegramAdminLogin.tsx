import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const TelegramAdminLogin: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [authMethod, setAuthMethod] = useState<'telegram' | 'vk' | null>(null);

  const handleTelegramAuth = () => {
    setIsLoading(true);
    setAuthMethod('telegram');
    // Имитация авторизации через Telegram
    setTimeout(() => {
      localStorage.setItem('admin_auth', 'telegram');
      localStorage.setItem('admin_user', JSON.stringify({
        id: 'tg_12345',
        name: 'Админ Телеграм',
        platform: 'telegram',
        username: '@admin_user',
        avatar: '/avatars/telegram-user.jpg',
        role: 'admin',
        needsBinding: false
      }));
      window.location.href = '/tgadmin/dashboard';
    }, 2000);
  };

  const handleVKAuth = () => {
    setIsLoading(true);
    setAuthMethod('vk');
    // Имитация авторизации через VK
    setTimeout(() => {
      localStorage.setItem('admin_auth', 'vk');
      localStorage.setItem('admin_user', JSON.stringify({
        id: 'vk_67890',
        name: 'Админ ВКонтакте',
        platform: 'vk',
        username: 'admin_vk',
        avatar: '/avatars/vk-user.jpg',
        role: 'admin',
        needsBinding: true // Требует привязки Telegram
      }));
      window.location.href = '/tgadmin/dashboard';
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Icon name="Shield" className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">MigalkiAdmin</h1>
                <p className="text-sm text-gray-600">Панель администрирования</p>
              </div>
            </div>
            <Link to="/migalki">
              <Button variant="outline" size="sm">
                <Icon name="ArrowLeft" className="mr-2" size={16} />
                К приложению
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Login Form */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto">
                <Icon name="UserCheck" className="text-white" size={32} />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">Вход в админ-панель</CardTitle>
                <CardDescription className="text-gray-600 mt-2">
                  Войдите через Telegram или ВКонтакте для доступа к панели администрирования
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {!isLoading ? (
                <>
                  {/* Telegram Auth */}
                  <Button
                    onClick={handleTelegramAuth}
                    className="w-full h-14 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg"
                    size="lg"
                  >
                    <Icon name="Send" className="mr-3" size={24} />
                    <div className="text-left">
                      <div className="font-semibold">Войти через Telegram</div>
                      <div className="text-xs opacity-90">Быстрый и безопасный вход</div>
                    </div>
                  </Button>

                  {/* VK Auth */}
                  <Button
                    onClick={handleVKAuth}
                    className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg"
                    size="lg"
                  >
                    <div className="w-6 h-6 mr-3 bg-white rounded-sm flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">VK</span>
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">Войти через ВКонтакте</div>
                      <div className="text-xs opacity-90">Авторизация через VK ID</div>
                    </div>
                  </Button>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">или</span>
                    </div>
                  </div>

                  {/* Demo Access */}
                  <Link to="/tgadmin/dashboard">
                    <Button variant="outline" className="w-full h-12 border-2 border-dashed border-gray-300 hover:border-purple-300 hover:bg-purple-50">
                      <Icon name="Eye" className="mr-2" size={20} />
                      Демо-доступ
                    </Button>
                  </Link>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600 mb-2">
                    {authMethod === 'telegram' ? 'Подключение к Telegram...' : 'Подключение к ВКонтакте...'}
                  </p>
                  <p className="text-sm text-gray-500">
                    Пожалуйста, подтвердите вход в приложении
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Security Notice */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <Icon name="Shield" className="inline mr-1" size={16} />
            Безопасная авторизация через OAuth 2.0
          </div>
        </div>
      </div>
    </div>
  );
};

export default TelegramAdminLogin;