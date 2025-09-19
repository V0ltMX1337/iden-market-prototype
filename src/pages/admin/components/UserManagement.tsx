import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface User {
  id: string;
  name: string;
  username: string;
  platform: 'telegram' | 'vk';
  avatar: string;
  role: 'user' | 'admin' | 'moderator';
  chats: string[];
  lastActivity: string;
  status: 'active' | 'banned' | 'restricted';
  violations: number;
  joinDate: string;
}

const UserManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const mockUsers: User[] = [
    {
      id: 'tg_123',
      name: 'Алексей Петров',
      username: '@alexey_p',
      platform: 'telegram',
      avatar: '/avatars/user1.jpg',
      role: 'user',
      chats: ['Основной чат', 'Новости', 'Обсуждения'],
      lastActivity: '2 минуты назад',
      status: 'active',
      violations: 0,
      joinDate: '15.09.2024'
    },
    {
      id: 'vk_456',
      name: 'Мария Иванова',
      username: 'maria_ivanova',
      platform: 'vk',
      avatar: '/avatars/user2.jpg',
      role: 'moderator',
      chats: ['Основной чат', 'Модераторы'],
      lastActivity: '5 минут назад',
      status: 'active',
      violations: 0,
      joinDate: '12.09.2024'
    },
    {
      id: 'tg_789',
      name: 'Спамер Bot',
      username: '@spammer_bot',
      platform: 'telegram',
      avatar: '/avatars/user3.jpg',
      role: 'user',
      chats: ['Основной чат'],
      lastActivity: '1 час назад',
      status: 'banned',
      violations: 5,
      joinDate: '18.09.2024'
    }
  ];

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.username.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedFilter === 'all') return matchesSearch;
    if (selectedFilter === 'telegram') return matchesSearch && user.platform === 'telegram';
    if (selectedFilter === 'vk') return matchesSearch && user.platform === 'vk';
    if (selectedFilter === 'admins') return matchesSearch && user.role === 'admin';
    if (selectedFilter === 'banned') return matchesSearch && user.status === 'banned';
    
    return matchesSearch;
  });

  const handleUserAction = (userId: string, action: string) => {
    console.log(`Action ${action} for user ${userId}`);
    // Здесь будет логика для действий с пользователем
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Icon name="Users" className="text-blue-600" size={24} />
            <span>Управление пользователями</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Поиск по имени или username..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Icon name="Filter" className="mr-2" size={16} />
              Фильтры
            </Button>
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-2 overflow-x-auto">
            {[
              { id: 'all', label: 'Все', count: mockUsers.length },
              { id: 'telegram', label: 'Telegram', count: mockUsers.filter(u => u.platform === 'telegram').length },
              { id: 'vk', label: 'ВКонтакте', count: mockUsers.filter(u => u.platform === 'vk').length },
              { id: 'admins', label: 'Админы', count: mockUsers.filter(u => u.role === 'admin').length },
              { id: 'banned', label: 'Заблокированные', count: mockUsers.filter(u => u.status === 'banned').length },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  selectedFilter === filter.id
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <div className="grid gap-4">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Avatar and Platform Icon */}
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-full bg-gray-200"
                      onError={(e) => { e.currentTarget.src = '/avatars/default.jpg'; }}
                    />
                    <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center ${
                      user.platform === 'telegram' ? 'bg-blue-500' : 'bg-indigo-600'
                    }`}>
                      {user.platform === 'telegram' ? (
                        <Icon name="Send" className="text-white" size={12} />
                      ) : (
                        <span className="text-white text-xs font-bold">VK</span>
                      )}
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{user.name}</h3>
                      <Badge variant={user.role === 'admin' ? 'default' : user.role === 'moderator' ? 'secondary' : 'outline'}>
                        {user.role === 'admin' ? 'Админ' : user.role === 'moderator' ? 'Модератор' : 'Пользователь'}
                      </Badge>
                      <Badge variant={user.status === 'active' ? 'default' : user.status === 'banned' ? 'destructive' : 'secondary'}>
                        {user.status === 'active' ? 'Активен' : user.status === 'banned' ? 'Заблокирован' : 'Ограничен'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{user.username}</p>
                    
                    {/* Chats */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {user.chats.map((chat, index) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {chat}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>Последняя активность: {user.lastActivity}</span>
                      <span>Нарушений: {user.violations}</span>
                      <span>Дата входа: {user.joinDate}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedUser(user)}
                  >
                    <Icon name="Eye" className="mr-1" size={14} />
                    Подробнее
                  </Button>
                  
                  {user.status === 'active' ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUserAction(user.id, 'restrict')}
                      className="text-orange-600 hover:text-orange-700"
                    >
                      <Icon name="UserX" className="mr-1" size={14} />
                      Ограничить
                    </Button>
                  ) : user.status === 'banned' ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUserAction(user.id, 'unban')}
                      className="text-green-600 hover:text-green-700"
                    >
                      <Icon name="UserCheck" className="mr-1" size={14} />
                      Разблокировать
                    </Button>
                  ) : null}

                  {user.role !== 'admin' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUserAction(user.id, 'promote')}
                      className="text-purple-600 hover:text-purple-700"
                    >
                      <Icon name="Crown" className="mr-1" size={14} />
                      {user.role === 'moderator' ? 'В админы' : 'В модераторы'}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl mx-4 bg-white max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Icon name="User" className="text-blue-600" size={24} />
                <span>Профиль пользователя</span>
              </CardTitle>
              <Button variant="outline" size="sm" onClick={() => setSelectedUser(null)}>
                <Icon name="X" size={16} />
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* User Header */}
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="relative">
                  <img
                    src={selectedUser.avatar}
                    alt={selectedUser.name}
                    className="w-16 h-16 rounded-full bg-gray-200"
                    onError={(e) => { e.currentTarget.src = '/avatars/default.jpg'; }}
                  />
                  <div className={`absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center ${
                    selectedUser.platform === 'telegram' ? 'bg-blue-500' : 'bg-indigo-600'
                  }`}>
                    {selectedUser.platform === 'telegram' ? (
                      <Icon name="Send" className="text-white" size={16} />
                    ) : (
                      <span className="text-white text-sm font-bold">VK</span>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedUser.name}</h3>
                  <p className="text-gray-600">{selectedUser.username}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant={selectedUser.role === 'admin' ? 'default' : selectedUser.role === 'moderator' ? 'secondary' : 'outline'}>
                      {selectedUser.role === 'admin' ? 'Администратор' : selectedUser.role === 'moderator' ? 'Модератор' : 'Пользователь'}
                    </Badge>
                    <Badge variant={selectedUser.status === 'active' ? 'default' : selectedUser.status === 'banned' ? 'destructive' : 'secondary'}>
                      {selectedUser.status === 'active' ? 'Активен' : selectedUser.status === 'banned' ? 'Заблокирован' : 'Ограничен'}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* User Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{selectedUser.chats.length}</div>
                  <div className="text-sm text-blue-800">Активных бесед</div>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{selectedUser.violations}</div>
                  <div className="text-sm text-red-800">Нарушений</div>
                </div>
              </div>

              {/* Chat List */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Участие в беседах</h4>
                <div className="space-y-2">
                  {selectedUser.chats.map((chat, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Icon name="MessageCircle" className="text-gray-600" size={16} />
                        <span className="font-medium">{chat}</span>
                      </div>
                      <Button variant="outline" size="sm">
                        <Icon name="Settings" className="mr-1" size={14} />
                        Управлять
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3 pt-4 border-t">
                <Button className="flex-1">
                  <Icon name="MessageSquare" className="mr-2" size={16} />
                  Отправить сообщение
                </Button>
                <Button variant="outline" className="flex-1">
                  <Icon name="UserX" className="mr-2" size={16} />
                  {selectedUser.status === 'banned' ? 'Разблокировать' : 'Заблокировать'}
                </Button>
                <Button variant="outline" className="flex-1">
                  <Icon name="Crown" className="mr-2" size={16} />
                  Повысить роль
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default UserManagement;