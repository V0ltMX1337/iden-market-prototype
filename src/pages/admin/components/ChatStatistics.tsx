import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface ChatStats {
  id: string;
  name: string;
  platform: 'telegram' | 'vk';
  memberCount: number;
  activeMembers: number;
  messagesPerDay: number;
  violationsCount: number;
  createdDate: string;
  adminsCount: number;
  description: string;
  isActive: boolean;
}

const ChatStatistics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedChat, setSelectedChat] = useState<ChatStats | null>(null);

  const mockStats: ChatStats[] = [
    {
      id: 'tg_main',
      name: 'Основной чат',
      platform: 'telegram',
      memberCount: 2543,
      activeMembers: 1876,
      messagesPerDay: 450,
      violationsCount: 12,
      createdDate: '15.08.2024',
      adminsCount: 5,
      description: 'Главная беседа сообщества',
      isActive: true
    },
    {
      id: 'tg_news',
      name: 'Новости',
      platform: 'telegram',
      memberCount: 3210,
      activeMembers: 892,
      messagesPerDay: 85,
      violationsCount: 3,
      createdDate: '01.08.2024',
      adminsCount: 3,
      description: 'Канал новостей и объявлений',
      isActive: true
    },
    {
      id: 'vk_main',
      name: 'VK Основная',
      platform: 'vk',
      memberCount: 1897,
      activeMembers: 1234,
      messagesPerDay: 320,
      violationsCount: 8,
      createdDate: '20.07.2024',
      adminsCount: 4,
      description: 'Основная беседа ВКонтакте',
      isActive: true
    },
    {
      id: 'tg_old',
      name: 'Старая беседа',
      platform: 'telegram',
      memberCount: 156,
      activeMembers: 23,
      messagesPerDay: 5,
      violationsCount: 1,
      createdDate: '10.05.2024',
      adminsCount: 2,
      description: 'Неактивная беседа',
      isActive: false
    }
  ];

  const totalStats = {
    totalMembers: mockStats.reduce((sum, chat) => sum + chat.memberCount, 0),
    totalActive: mockStats.reduce((sum, chat) => sum + chat.activeMembers, 0),
    totalMessages: mockStats.reduce((sum, chat) => sum + chat.messagesPerDay, 0),
    totalViolations: mockStats.reduce((sum, chat) => sum + chat.violationsCount, 0),
    activeChatCount: mockStats.filter(chat => chat.isActive).length
  };

  const periods = [
    { id: 'day', label: 'День' },
    { id: 'week', label: 'Неделя' },
    { id: 'month', label: 'Месяц' },
    { id: 'year', label: 'Год' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Icon name="TrendingUp" className="text-pink-600" size={24} />
              <span>Статистика по беседам</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Период:</span>
              {periods.map((period) => (
                <button
                  key={period.id}
                  onClick={() => setSelectedPeriod(period.id)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                    selectedPeriod === period.id
                      ? 'bg-pink-100 text-pink-700 border border-pink-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-xs">Всего участников</p>
                <p className="text-2xl font-bold">{totalStats.totalMembers.toLocaleString()}</p>
              </div>
              <Icon name="Users" size={24} className="text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-xs">Активных</p>
                <p className="text-2xl font-bold">{totalStats.totalActive.toLocaleString()}</p>
              </div>
              <Icon name="UserCheck" size={24} className="text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-xs">Сообщений/день</p>
                <p className="text-2xl font-bold">{totalStats.totalMessages}</p>
              </div>
              <Icon name="MessageSquare" size={24} className="text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-xs">Нарушений</p>
                <p className="text-2xl font-bold">{totalStats.totalViolations}</p>
              </div>
              <Icon name="AlertTriangle" size={24} className="text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-pink-500 to-pink-600 text-white border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-pink-100 text-xs">Активных бесед</p>
                <p className="text-2xl font-bold">{totalStats.activeChatCount}</p>
              </div>
              <Icon name="MessageCircle" size={24} className="text-pink-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chat List */}
      <div className="space-y-4">
        {mockStats.map((chat) => (
          <Card key={chat.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Platform Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    chat.platform === 'telegram' ? 'bg-blue-500' : 'bg-indigo-600'
                  }`}>
                    {chat.platform === 'telegram' ? (
                      <Icon name="Send" className="text-white" size={20} />
                    ) : (
                      <span className="text-white font-bold">VK</span>
                    )}
                  </div>

                  {/* Chat Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">{chat.name}</h3>
                      <Badge variant={chat.isActive ? 'default' : 'secondary'}>
                        {chat.isActive ? 'Активна' : 'Неактивна'}
                      </Badge>
                      {chat.violationsCount > 10 && (
                        <Badge variant="destructive">Много нарушений</Badge>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{chat.description}</p>
                    
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Icon name="Users" className="text-blue-500" size={16} />
                        <span className="text-gray-600">Участников:</span>
                        <span className="font-semibold">{chat.memberCount.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="Activity" className="text-green-500" size={16} />
                        <span className="text-gray-600">Активных:</span>
                        <span className="font-semibold">{chat.activeMembers.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="MessageSquare" className="text-purple-500" size={16} />
                        <span className="text-gray-600">Сообщений/день:</span>
                        <span className="font-semibold">{chat.messagesPerDay}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="AlertTriangle" className={`${chat.violationsCount > 5 ? 'text-red-500' : 'text-orange-500'}`} size={16} />
                        <span className="text-gray-600">Нарушений:</span>
                        <span className={`font-semibold ${chat.violationsCount > 5 ? 'text-red-600' : ''}`}>
                          {chat.violationsCount}
                        </span>
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="flex items-center space-x-6 text-xs text-gray-500 mt-3">
                      <span>Создана: {chat.createdDate}</span>
                      <span>Администраторов: {chat.adminsCount}</span>
                      <span>Активность: {Math.round((chat.activeMembers / chat.memberCount) * 100)}%</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedChat(chat)}
                  >
                    <Icon name="BarChart3" className="mr-1" size={14} />
                    Подробно
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Icon name="Settings" className="mr-1" size={14} />
                    Настройки
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Chat Modal */}
      {selectedChat && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-4xl mx-4 bg-white max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Icon name="BarChart3" className="text-pink-600" size={24} />
                <span>Детальная статистика - {selectedChat.name}</span>
              </CardTitle>
              <Button variant="outline" size="sm" onClick={() => setSelectedChat(null)}>
                <Icon name="X" size={16} />
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Chat Header */}
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                  selectedChat.platform === 'telegram' ? 'bg-blue-500' : 'bg-indigo-600'
                }`}>
                  {selectedChat.platform === 'telegram' ? (
                    <Icon name="Send" className="text-white" size={24} />
                  ) : (
                    <span className="text-white font-bold text-lg">VK</span>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedChat.name}</h3>
                  <p className="text-gray-600">{selectedChat.description}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant={selectedChat.isActive ? 'default' : 'secondary'}>
                      {selectedChat.isActive ? 'Активная беседа' : 'Неактивная беседа'}
                    </Badge>
                    <Badge variant="outline">
                      {selectedChat.platform === 'telegram' ? 'Telegram' : 'ВКонтакте'}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Detailed Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{selectedChat.memberCount.toLocaleString()}</div>
                  <div className="text-sm text-blue-800">Всего участников</div>
                  <div className="text-xs text-blue-600 mt-1">
                    Активных: {selectedChat.activeMembers} ({Math.round((selectedChat.activeMembers / selectedChat.memberCount) * 100)}%)
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{selectedChat.messagesPerDay}</div>
                  <div className="text-sm text-green-800">Сообщений в день</div>
                  <div className="text-xs text-green-600 mt-1">
                    В среднем: {Math.round(selectedChat.messagesPerDay / selectedChat.activeMembers * 10) / 10} на участника
                  </div>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{selectedChat.violationsCount}</div>
                  <div className="text-sm text-red-800">Нарушений</div>
                  <div className="text-xs text-red-600 mt-1">
                    За последние 30 дней
                  </div>
                </div>
              </div>

              {/* Activity Chart Placeholder */}
              <Card className="bg-gray-50">
                <CardHeader>
                  <CardTitle className="text-lg">График активности</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                    <div className="text-center text-gray-500">
                      <Icon name="BarChart3" className="mx-auto mb-2" size={48} />
                      <p>График активности по дням</p>
                      <p className="text-sm">Здесь будет отображаться статистика сообщений</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Events */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Последние события</h4>
                <div className="space-y-2">
                  {[
                    { event: 'Предупреждение пользователю', user: '@spammer123', time: '2 часа назад', type: 'warning' },
                    { event: 'Новый участник', user: 'Иван Петров', time: '4 часа назад', type: 'join' },
                    { event: 'Удалено сообщение', user: '@troll_user', time: '6 часов назад', type: 'delete' },
                    { event: 'Назначен модератор', user: '@new_mod', time: '1 день назад', type: 'promote' },
                  ].map((event, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-2 h-2 rounded-full ${
                        event.type === 'warning' ? 'bg-orange-500' :
                        event.type === 'join' ? 'bg-green-500' :
                        event.type === 'delete' ? 'bg-red-500' : 'bg-blue-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{event.event}</p>
                        <p className="text-xs text-gray-500">{event.user} • {event.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3 pt-4 border-t">
                <Button className="flex-1">
                  <Icon name="Download" className="mr-2" size={16} />
                  Экспорт данных
                </Button>
                <Button variant="outline" className="flex-1">
                  <Icon name="Settings" className="mr-2" size={16} />
                  Настройки беседы
                </Button>
                <Button variant="outline" className="flex-1">
                  <Icon name="Users" className="mr-2" size={16} />
                  Участники
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ChatStatistics;