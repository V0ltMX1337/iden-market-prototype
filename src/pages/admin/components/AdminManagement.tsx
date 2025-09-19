import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface Admin {
  id: string;
  name: string;
  username: string;
  platform: 'telegram' | 'vk';
  avatar: string;
  role: 'superadmin' | 'admin' | 'moderator';
  permissions: string[];
  chatsManaged: string[];
  lastActivity: string;
  appointedBy: string;
  appointedDate: string;
}

const AdminManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPermissionsModal, setShowPermissionsModal] = useState<Admin | null>(null);
  const [newAdminData, setNewAdminData] = useState({
    username: '',
    platform: 'telegram' as 'telegram' | 'vk',
    role: 'moderator' as 'superadmin' | 'admin' | 'moderator',
    chats: [] as string[],
    reason: ''
  });

  const mockAdmins: Admin[] = [
    {
      id: 'admin_1',
      name: 'Главный Админ',
      username: '@main_admin',
      platform: 'telegram',
      avatar: '/avatars/admin1.jpg',
      role: 'superadmin',
      permissions: ['all'],
      chatsManaged: ['Все чаты'],
      lastActivity: '10 минут назад',
      appointedBy: 'Системный',
      appointedDate: '01.09.2024'
    },
    {
      id: 'admin_2',
      name: 'Анна Модератор',
      username: '@anna_mod',
      platform: 'telegram',
      avatar: '/avatars/admin2.jpg',
      role: 'moderator',
      permissions: ['kick', 'mute', 'warn'],
      chatsManaged: ['Основной чат', 'Новости'],
      lastActivity: '2 часа назад',
      appointedBy: '@main_admin',
      appointedDate: '10.09.2024'
    },
    {
      id: 'admin_3',
      name: 'Сергей ВК',
      username: 'sergey_admin',
      platform: 'vk',
      avatar: '/avatars/admin3.jpg',
      role: 'admin',
      permissions: ['kick', 'mute', 'warn', 'ban', 'invite'],
      chatsManaged: ['VK Основная', 'VK Помощь'],
      lastActivity: '1 день назад',
      appointedBy: '@main_admin',
      appointedDate: '05.09.2024'
    }
  ];

  const allPermissions = [
    { id: 'kick', label: 'Исключение пользователей', description: 'Может удалять пользователей из беседы' },
    { id: 'mute', label: 'Блокировка сообщений', description: 'Может запрещать отправку сообщений' },
    { id: 'warn', label: 'Предупреждения', description: 'Может выдавать предупреждения' },
    { id: 'ban', label: 'Блокировка', description: 'Может блокировать пользователей навсегда' },
    { id: 'invite', label: 'Приглашения', description: 'Может приглашать новых пользователей' },
    { id: 'settings', label: 'Настройки беседы', description: 'Может изменять настройки беседы' },
    { id: 'appoint', label: 'Назначение модераторов', description: 'Может назначать других модераторов' }
  ];

  const availableChats = [
    'Основной чат',
    'Новости',
    'Обсуждения',
    'VK Основная',
    'VK Помощь',
    'Технический'
  ];

  const filteredAdmins = mockAdmins.filter(admin => {
    const matchesSearch = admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         admin.username.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedPlatform === 'all') return matchesSearch;
    return matchesSearch && admin.platform === selectedPlatform;
  });

  const handleAddAdmin = () => {
    console.log('Adding new admin:', newAdminData);
    setShowAddModal(false);
    setNewAdminData({
      username: '',
      platform: 'telegram',
      role: 'moderator',
      chats: [],
      reason: ''
    });
  };

  const handleRemoveAdmin = (adminId: string) => {
    console.log('Removing admin:', adminId);
  };

  const handleUpdatePermissions = (admin: Admin, newPermissions: string[]) => {
    console.log('Updating permissions for', admin.username, ':', newPermissions);
    setShowPermissionsModal(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Icon name="UserCheck" className="text-purple-600" size={24} />
              <span>Управление администраторами</span>
            </CardTitle>
            <Button onClick={() => setShowAddModal(true)}>
              <Icon name="UserPlus" className="mr-2" size={16} />
              Назначить администратора
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filters */}
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Поиск администраторов..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex space-x-2">
              {[
                { id: 'all', label: 'Все' },
                { id: 'telegram', label: 'Telegram' },
                { id: 'vk', label: 'ВКонтакте' }
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedPlatform(filter.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedPlatform === filter.id
                      ? 'bg-purple-100 text-purple-700 border border-purple-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Admins List */}
      <div className="space-y-4">
        {filteredAdmins.map((admin) => (
          <Card key={admin.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Avatar */}
                  <div className="relative">
                    <img
                      src={admin.avatar}
                      alt={admin.name}
                      className="w-14 h-14 rounded-full bg-gray-200"
                      onError={(e) => { e.currentTarget.src = '/avatars/default.jpg'; }}
                    />
                    <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center ${
                      admin.platform === 'telegram' ? 'bg-blue-500' : 'bg-indigo-600'
                    }`}>
                      {admin.platform === 'telegram' ? (
                        <Icon name="Send" className="text-white" size={12} />
                      ) : (
                        <span className="text-white text-xs font-bold">VK</span>
                      )}
                    </div>
                  </div>

                  {/* Admin Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">{admin.name}</h3>
                      <Badge variant={admin.role === 'superadmin' ? 'default' : admin.role === 'admin' ? 'secondary' : 'outline'}>
                        {admin.role === 'superadmin' ? 'Супер админ' : 
                         admin.role === 'admin' ? 'Администратор' : 'Модератор'}
                      </Badge>
                      {admin.role === 'superadmin' && (
                        <Badge variant="destructive">
                          <Icon name="Crown" className="mr-1" size={12} />
                          Полные права
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-600 mb-2">{admin.username}</p>
                    
                    {/* Permissions */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {admin.permissions.includes('all') ? (
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                          Все права
                        </span>
                      ) : (
                        admin.permissions.map((perm) => (
                          <span key={perm} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            {allPermissions.find(p => p.id === perm)?.label}
                          </span>
                        ))
                      )}
                    </div>

                    {/* Managed Chats */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {admin.chatsManaged.map((chat, index) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {chat}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>Последняя активность: {admin.lastActivity}</span>
                      <span>Назначен: {admin.appointedBy}</span>
                      <span>Дата: {admin.appointedDate}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowPermissionsModal(admin)}
                  >
                    <Icon name="Settings" className="mr-1" size={14} />
                    Права
                  </Button>
                  
                  {admin.role !== 'superadmin' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveAdmin(admin.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Icon name="UserMinus" className="mr-1" size={14} />
                      Снять
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Admin Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-lg mx-4 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Icon name="UserPlus" className="text-purple-600" size={24} />
                <span>Назначить администратора</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username пользователя
                </label>
                <Input
                  placeholder="@username или user_id"
                  value={newAdminData.username}
                  onChange={(e) => setNewAdminData({...newAdminData, username: e.target.value})}
                />
              </div>

              {/* Platform */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Платформа
                </label>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setNewAdminData({...newAdminData, platform: 'telegram'})}
                    className={`flex-1 p-3 rounded-lg border ${
                      newAdminData.platform === 'telegram'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <Icon name="Send" className="mx-auto mb-1" size={20} />
                    <div className="text-sm font-medium">Telegram</div>
                  </button>
                  <button
                    onClick={() => setNewAdminData({...newAdminData, platform: 'vk'})}
                    className={`flex-1 p-3 rounded-lg border ${
                      newAdminData.platform === 'vk'
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="w-5 h-5 bg-indigo-600 rounded text-white text-xs flex items-center justify-center mx-auto mb-1">
                      VK
                    </div>
                    <div className="text-sm font-medium">ВКонтакте</div>
                  </button>
                </div>
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Роль
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'moderator', label: 'Модератор', desc: 'Базовые права модерации' },
                    { id: 'admin', label: 'Администратор', desc: 'Расширенные права управления' },
                    { id: 'superadmin', label: 'Супер админ', desc: 'Полные права (осторожно!)' }
                  ].map((role) => (
                    <button
                      key={role.id}
                      onClick={() => setNewAdminData({...newAdminData, role: role.id as any})}
                      className={`w-full p-3 text-left rounded-lg border ${
                        newAdminData.role === role.id
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="font-medium">{role.label}</div>
                      <div className="text-sm text-gray-600">{role.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Chats */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Беседы для управления
                </label>
                <div className="max-h-32 overflow-y-auto space-y-1">
                  {availableChats.map((chat) => (
                    <label key={chat} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={newAdminData.chats.includes(chat)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewAdminData({
                              ...newAdminData,
                              chats: [...newAdminData.chats, chat]
                            });
                          } else {
                            setNewAdminData({
                              ...newAdminData,
                              chats: newAdminData.chats.filter(c => c !== chat)
                            });
                          }
                        }}
                        className="rounded"
                      />
                      <span className="text-sm">{chat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Reason */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Причина назначения (опционально)
                </label>
                <Textarea
                  placeholder="Укажите причину назначения администратора..."
                  value={newAdminData.reason}
                  onChange={(e) => setNewAdminData({...newAdminData, reason: e.target.value})}
                  rows={3}
                />
              </div>

              {/* Actions */}
              <div className="flex space-x-3 pt-4">
                <Button className="flex-1" onClick={handleAddAdmin}>
                  <Icon name="UserCheck" className="mr-2" size={16} />
                  Назначить
                </Button>
                <Button variant="outline" onClick={() => setShowAddModal(false)}>
                  Отмена
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Permissions Modal */}
      {showPermissionsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-lg mx-4 bg-white max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Icon name="Settings" className="text-purple-600" size={24} />
                <span>Права доступа - {showPermissionsModal.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Current Role */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant={showPermissionsModal.role === 'superadmin' ? 'default' : showPermissionsModal.role === 'admin' ? 'secondary' : 'outline'}>
                    {showPermissionsModal.role === 'superadmin' ? 'Супер админ' : 
                     showPermissionsModal.role === 'admin' ? 'Администратор' : 'Модератор'}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">
                  Текущая роль определяет базовый набор прав доступа
                </p>
              </div>

              {/* Permissions List */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Доступные права:</h4>
                {allPermissions.map((permission) => (
                  <div key={permission.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                    <input
                      type="checkbox"
                      checked={showPermissionsModal.permissions.includes(permission.id) || showPermissionsModal.permissions.includes('all')}
                      disabled={showPermissionsModal.permissions.includes('all')}
                      onChange={(e) => {
                        const newPermissions = e.target.checked
                          ? [...showPermissionsModal.permissions, permission.id]
                          : showPermissionsModal.permissions.filter(p => p !== permission.id);
                        
                        handleUpdatePermissions(showPermissionsModal, newPermissions);
                      }}
                      className="mt-1 rounded"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{permission.label}</div>
                      <div className="text-sm text-gray-600">{permission.description}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex space-x-3 pt-4 border-t">
                <Button className="flex-1" onClick={() => setShowPermissionsModal(null)}>
                  Сохранить изменения
                </Button>
                <Button variant="outline" onClick={() => setShowPermissionsModal(null)}>
                  Отмена
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminManagement;