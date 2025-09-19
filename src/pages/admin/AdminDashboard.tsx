import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import UserManagement from './components/UserManagement';
import AdminManagement from './components/AdminManagement';
import ChatStatistics from './components/ChatStatistics';
import ModerationTools from './components/ModerationTools';
import CleanupTools from './components/CleanupTools';

interface AdminUser {
  id: string;
  name: string;
  platform: 'telegram' | 'vk';
  username: string;
  avatar: string;
  role: string;
  needsBinding: boolean;
}

const AdminDashboard: React.FC = () => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [activeSection, setActiveSection] = useState('overview');
  const [showBindingModal, setShowBindingModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authData = localStorage.getItem('admin_auth');
    const userData = localStorage.getItem('admin_user');
    
    if (!authData || !userData) {
      navigate('/tgadmin');
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    
    if (parsedUser.needsBinding) {
      setShowBindingModal(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    localStorage.removeItem('admin_user');
    navigate('/tgadmin');
  };

  const handleBindPlatform = () => {
    if (user) {
      const updatedUser = { ...user, needsBinding: false };
      setUser(updatedUser);
      localStorage.setItem('admin_user', JSON.stringify(updatedUser));
      setShowBindingModal(false);
    }
  };

  if (!user) return null;

  const menuItems = [
    { id: 'overview', label: 'Обзор', icon: 'BarChart3', color: 'text-blue-600' },
    { id: 'users', label: 'Пользователи', icon: 'Users', color: 'text-green-600' },
    { id: 'admins', label: 'Администраторы', icon: 'UserCheck', color: 'text-purple-600' },
    { id: 'members', label: 'Участники', icon: 'UserPlus', color: 'text-orange-600' },
    { id: 'statistics', label: 'Статистика', icon: 'TrendingUp', color: 'text-pink-600' },
    { id: 'moderation', label: 'Модерация', icon: 'Shield', color: 'text-red-600' },
    { id: 'cleanup', label: 'Очистка', icon: 'Trash2', color: 'text-gray-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Icon name="Shield" className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">MigalkiAdmin</h1>
                <p className="text-sm text-gray-600">Панель администрирования</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* User Info */}
              <div className="flex items-center space-x-3 bg-white/80 rounded-xl px-4 py-2 border">
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-8 h-8 rounded-full bg-gray-200"
                  onError={(e) => { e.currentTarget.src = '/avatars/default.jpg'; }}
                />
                <div className="text-sm">
                  <div className="font-medium text-gray-900">{user.name}</div>
                  <div className="text-gray-500 flex items-center">
                    {user.platform === 'telegram' ? (
                      <Icon name="Send" className="mr-1" size={12} />
                    ) : (
                      <span className="text-xs mr-1">VK</span>
                    )}
                    {user.username}
                  </div>
                </div>
                <Badge variant={user.needsBinding ? 'destructive' : 'default'}>
                  {user.role}
                </Badge>
              </div>

              <Button variant="outline" onClick={handleLogout}>
                <Icon name="LogOut" className="mr-2" size={16} />
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-64 space-y-2">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all ${
                        activeSection === item.id
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon name={item.icon as any} className={activeSection === item.id ? 'text-blue-600' : item.color} size={20} />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">Быстрая статистика</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Всего пользователей</span>
                  <Badge variant="secondary">1,234</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Активных бесед</span>
                  <Badge variant="secondary">12</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Администраторов</span>
                  <Badge variant="secondary">8</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeSection === 'overview' && (
              <div className="space-y-6">
                {/* Platform Binding Alert */}
                {user.needsBinding && (
                  <Card className="border-orange-200 bg-orange-50/80 backdrop-blur-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <Icon name="AlertTriangle" className="text-orange-600" size={24} />
                        <div className="flex-1">
                          <h3 className="font-semibold text-orange-800">Требуется привязка аккаунта</h3>
                          <p className="text-sm text-orange-700 mt-1">
                            Для полного доступа к функциям администрирования рекомендуется привязать 
                            {user.platform === 'telegram' ? ' аккаунт ВКонтакте' : ' аккаунт Telegram'}
                          </p>
                        </div>
                        <Button onClick={() => setShowBindingModal(true)} size="sm" className="bg-orange-600 hover:bg-orange-700">
                          Привязать аккаунт
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-100 text-sm">Всего пользователей</p>
                          <p className="text-3xl font-bold">1,234</p>
                        </div>
                        <Icon name="Users" size={32} className="text-blue-200" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-100 text-sm">Активных бесед</p>
                          <p className="text-3xl font-bold">12</p>
                        </div>
                        <Icon name="MessageCircle" size={32} className="text-green-200" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-purple-100 text-sm">Администраторов</p>
                          <p className="text-3xl font-bold">8</p>
                        </div>
                        <Icon name="UserCheck" size={32} className="text-purple-200" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-orange-100 text-sm">Нарушений сегодня</p>
                          <p className="text-3xl font-bold">3</p>
                        </div>
                        <Icon name="AlertTriangle" size={32} className="text-orange-200" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Последняя активность</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { action: 'Назначен новый админ', user: '@admin_new', time: '5 минут назад', platform: 'telegram' },
                        { action: 'Удален пользователь', user: 'спамер123', time: '15 минут назад', platform: 'vk' },
                        { action: 'Добавлено запрещенное слово', user: 'система', time: '1 час назад', platform: 'system' },
                        { action: 'Очистка неактивных', user: 'автоматически', time: '2 часа назад', platform: 'system' },
                      ].map((activity, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className={`w-2 h-2 rounded-full ${
                            activity.platform === 'telegram' ? 'bg-blue-500' :
                            activity.platform === 'vk' ? 'bg-indigo-500' : 'bg-gray-500'
                          }`}></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                            <p className="text-xs text-gray-500">{activity.user} • {activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Section Content */}
            {activeSection === 'users' && <UserManagement />}
            {activeSection === 'admins' && <AdminManagement />}
            {activeSection === 'members' && <UserManagement />}
            {activeSection === 'statistics' && <ChatStatistics />}
            {activeSection === 'moderation' && <ModerationTools />}
            {activeSection === 'cleanup' && <CleanupTools />}
            
            {/* Other sections placeholder */}
            {!['overview', 'users', 'admins', 'members', 'statistics', 'moderation', 'cleanup'].includes(activeSection) && (
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <Icon name="Construction" className="mx-auto mb-4 text-gray-400" size={48} />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {menuItems.find(item => item.id === activeSection)?.label}
                  </h3>
                  <p className="text-gray-600">
                    Раздел в разработке. Скоро здесь появится полный функционал.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Binding Modal */}
      {showBindingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4 bg-white">
            <CardHeader>
              <CardTitle className="text-center">
                Привязка {user.platform === 'telegram' ? 'ВКонтакте' : 'Telegram'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-center">
                Привяжите {user.platform === 'telegram' ? 'аккаунт ВКонтакте' : 'аккаунт Telegram'} 
                для расширенных возможностей администрирования
              </p>
              <div className="flex space-x-3">
                <Button className="flex-1" onClick={handleBindPlatform}>
                  <Icon name={user.platform === 'telegram' ? 'User' : 'Send'} className="mr-2" size={16} />
                  Привязать аккаунт
                </Button>
                <Button variant="outline" onClick={() => setShowBindingModal(false)}>
                  Позже
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;