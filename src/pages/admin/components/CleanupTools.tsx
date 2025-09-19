import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface CleanupTask {
  id: string;
  name: string;
  description: string;
  type: 'inactive_users' | 'old_messages' | 'banned_users' | 'duplicates';
  targetCount: number;
  chats: string[];
  schedule: 'manual' | 'daily' | 'weekly' | 'monthly';
  lastRun: string;
  status: 'idle' | 'running' | 'completed' | 'failed';
  progress?: number;
}

const CleanupTools: React.FC = () => {
  const [runningTasks, setRunningTasks] = useState<Set<string>>(new Set());
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<CleanupTask | null>(null);

  const mockTasks: CleanupTask[] = [
    {
      id: 'cleanup_1',
      name: 'Удаление неактивных пользователей',
      description: 'Пользователи без активности более 90 дней',
      type: 'inactive_users',
      targetCount: 156,
      chats: ['Основной чат', 'VK Основная'],
      schedule: 'weekly',
      lastRun: '12.09.2024',
      status: 'idle'
    },
    {
      id: 'cleanup_2',
      name: 'Очистка старых сообщений',
      description: 'Сообщения старше 1 года',
      type: 'old_messages',
      targetCount: 2543,
      chats: ['Все чаты'],
      schedule: 'monthly',
      lastRun: '01.09.2024',
      status: 'idle'
    },
    {
      id: 'cleanup_3',
      name: 'Проверка заблокированных',
      description: 'Удаление записей о заблокированных пользователях',
      type: 'banned_users',
      targetCount: 23,
      chats: ['Все чаты'],
      schedule: 'daily',
      lastRun: '18.09.2024',
      status: 'completed'
    },
    {
      id: 'cleanup_4',
      name: 'Поиск дубликатов',
      description: 'Пользователи с несколькими аккаунтами',
      type: 'duplicates',
      targetCount: 8,
      chats: ['Основной чат'],
      schedule: 'manual',
      lastRun: '15.09.2024',
      status: 'idle'
    }
  ];

  const handleRunTask = (taskId: string) => {
    setRunningTasks(prev => new Set(prev).add(taskId));
    
    // Симуляция выполнения задачи
    setTimeout(() => {
      setRunningTasks(prev => {
        const newSet = new Set(prev);
        newSet.delete(taskId);
        return newSet;
      });
    }, 5000);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'inactive_users': return 'UserX';
      case 'old_messages': return 'MessageSquareX';
      case 'banned_users': return 'Ban';
      case 'duplicates': return 'Copy';
      default: return 'Trash2';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'inactive_users': return 'text-orange-600 bg-orange-100';
      case 'old_messages': return 'text-blue-600 bg-blue-100';
      case 'banned_users': return 'text-red-600 bg-red-100';
      case 'duplicates': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'idle': return 'text-gray-600 bg-gray-100';
      case 'running': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Icon name="Trash2" className="text-gray-600" size={24} />
            <span>Инструменты очистки</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" className="text-blue-500" size={16} />
              <span className="text-gray-600">Последняя очистка:</span>
              <span className="font-semibold">Сегодня</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Users" className="text-orange-500" size={16} />
              <span className="text-gray-600">Удалено пользователей:</span>
              <span className="font-semibold">23</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="MessageSquare" className="text-purple-500" size={16} />
              <span className="text-gray-600">Очищено сообщений:</span>
              <span className="font-semibold">1.2K</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="HardDrive" className="text-green-500" size={16} />
              <span className="text-gray-600">Освобождено:</span>
              <span className="font-semibold">125 МБ</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 hover:shadow-lg transition-all cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Icon name="UserX" className="text-orange-600" size={24} />
              <div>
                <h3 className="font-semibold text-orange-800">Неактивные</h3>
                <p className="text-sm text-orange-600">156 пользователей</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:shadow-lg transition-all cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Icon name="MessageSquareX" className="text-blue-600" size={24} />
              <div>
                <h3 className="font-semibold text-blue-800">Старые сообщения</h3>
                <p className="text-sm text-blue-600">2.5K сообщений</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-pink-50 border-red-200 hover:shadow-lg transition-all cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Icon name="Ban" className="text-red-600" size={24} />
              <div>
                <h3 className="font-semibold text-red-800">Заблокированные</h3>
                <p className="text-sm text-red-600">23 записи</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200 hover:shadow-lg transition-all cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Icon name="Copy" className="text-purple-600" size={24} />
              <div>
                <h3 className="font-semibold text-purple-800">Дубликаты</h3>
                <p className="text-sm text-purple-600">8 аккаунтов</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cleanup Tasks */}
      <div className="space-y-4">
        {mockTasks.map((task) => (
          <Card key={task.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Task Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getTypeColor(task.type)}`}>
                    <Icon name={getTypeIcon(task.type) as any} size={20} />
                  </div>

                  {/* Task Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">{task.name}</h3>
                      <Badge variant="outline" className={getStatusColor(task.status)}>
                        {runningTasks.has(task.id) ? 'Выполняется...' :
                         task.status === 'idle' ? 'Готов' :
                         task.status === 'running' ? 'Выполняется' :
                         task.status === 'completed' ? 'Завершен' : 'Ошибка'}
                      </Badge>
                      <Badge variant="secondary">
                        {task.schedule === 'manual' ? 'Вручную' :
                         task.schedule === 'daily' ? 'Ежедневно' :
                         task.schedule === 'weekly' ? 'Еженедельно' : 'Ежемесячно'}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{task.description}</p>
                    
                    {/* Target and Chats */}
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Icon name="Target" className="text-gray-500" size={16} />
                        <span className="text-gray-600">Цель:</span>
                        <span className="font-semibold text-orange-600">{task.targetCount.toLocaleString()} элементов</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="MessageCircle" className="text-gray-500" size={16} />
                        <span className="text-gray-600">Беседы:</span>
                        <div className="flex flex-wrap gap-1">
                          {task.chats.slice(0, 2).map((chat, index) => (
                            <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {chat}
                            </span>
                          ))}
                          {task.chats.length > 2 && (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              +{task.chats.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    {runningTasks.has(task.id) && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                          <span>Выполнение...</span>
                          <span>45%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full animate-pulse" style={{ width: '45%' }}></div>
                        </div>
                      </div>
                    )}

                    {/* Last Run */}
                    <div className="flex items-center space-x-4 text-xs text-gray-500 mt-2">
                      <span>Последний запуск: {task.lastRun}</span>
                      {task.status === 'completed' && (
                        <span className="text-green-600">✓ Успешно завершен</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedTask(task)}
                  >
                    <Icon name="Settings" className="mr-1" size={14} />
                    Настройки
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRunTask(task.id)}
                    disabled={runningTasks.has(task.id)}
                    className={runningTasks.has(task.id) ? 'opacity-50' : 'text-blue-600 hover:text-blue-700'}
                  >
                    {runningTasks.has(task.id) ? (
                      <>
                        <Icon name="Loader" className="mr-1 animate-spin" size={14} />
                        Выполняется
                      </>
                    ) : (
                      <>
                        <Icon name="Play" className="mr-1" size={14} />
                        Запустить
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bulk Actions */}
      <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-red-800">
            <Icon name="AlertTriangle" className="text-red-600" size={24} />
            <span>Массовые операции</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-red-700 text-sm">
            Осторожно! Эти операции необратимы и могут затронуть большое количество данных.
          </p>
          <div className="flex space-x-3">
            <Button variant="outline" className="text-red-600 hover:text-red-700 border-red-300">
              <Icon name="UserX" className="mr-2" size={16} />
              Очистить всех неактивных
            </Button>
            <Button variant="outline" className="text-orange-600 hover:text-orange-700 border-orange-300">
              <Icon name="MessageSquareX" className="mr-2" size={16} />
              Удалить старые сообщения
            </Button>
            <Button variant="outline" className="text-purple-600 hover:text-purple-700 border-purple-300">
              <Icon name="RefreshCw" className="mr-2" size={16} />
              Полная очистка
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Task Settings Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-lg mx-4 bg-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Icon name="Settings" className="text-gray-600" size={24} />
                  <span>Настройки задачи</span>
                </CardTitle>
                <Button variant="outline" size="sm" onClick={() => setSelectedTask(null)}>
                  <Icon name="X" size={16} />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Task Info */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-1">{selectedTask.name}</h3>
                <p className="text-sm text-gray-600">{selectedTask.description}</p>
              </div>

              {/* Schedule Settings */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Расписание выполнения
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'manual', label: 'Вручную' },
                    { id: 'daily', label: 'Ежедневно' },
                    { id: 'weekly', label: 'Еженедельно' },
                    { id: 'monthly', label: 'Ежемесячно' }
                  ].map((schedule) => (
                    <button
                      key={schedule.id}
                      className={`p-3 rounded-lg border text-sm font-medium ${
                        selectedTask.schedule === schedule.id
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      {schedule.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Target Settings */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Критерии очистки
                </label>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span>Неактивность более:</span>
                    <span className="font-medium">90 дней</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span>Максимум за раз:</span>
                    <span className="font-medium">100 элементов</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3 pt-4 border-t">
                <Button className="flex-1">
                  <Icon name="Save" className="mr-2" size={16} />
                  Сохранить
                </Button>
                <Button variant="outline" onClick={() => setSelectedTask(null)}>
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

export default CleanupTools;