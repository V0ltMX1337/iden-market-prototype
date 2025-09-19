import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface BannedWord {
  id: string;
  word: string;
  category: 'spam' | 'offensive' | 'politics' | 'custom';
  chats: string[];
  action: 'warn' | 'mute' | 'kick' | 'ban';
  severity: 'low' | 'medium' | 'high';
  addedBy: string;
  addedDate: string;
  triggerCount: number;
}

const ModerationTools: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newWord, setNewWord] = useState({
    word: '',
    category: 'custom' as 'spam' | 'offensive' | 'politics' | 'custom',
    chats: [] as string[],
    action: 'warn' as 'warn' | 'mute' | 'kick' | 'ban',
    severity: 'medium' as 'low' | 'medium' | 'high'
  });

  const mockBannedWords: BannedWord[] = [
    {
      id: 'word_1',
      word: 'спам',
      category: 'spam',
      chats: ['Основной чат', 'VK Основная'],
      action: 'warn',
      severity: 'low',
      addedBy: '@admin_main',
      addedDate: '15.09.2024',
      triggerCount: 23
    },
    {
      id: 'word_2',
      word: 'мат***',
      category: 'offensive',
      chats: ['Все чаты'],
      action: 'mute',
      severity: 'high',
      addedBy: '@admin_main',
      addedDate: '10.09.2024',
      triggerCount: 156
    },
    {
      id: 'word_3',
      word: 'политика',
      category: 'politics',
      chats: ['Основной чат'],
      action: 'warn',
      severity: 'medium',
      addedBy: '@moderator_anna',
      addedDate: '12.09.2024',
      triggerCount: 45
    },
    {
      id: 'word_4',
      word: 'реклама',
      category: 'spam',
      chats: ['Основной чат', 'Новости'],
      action: 'kick',
      severity: 'high',
      addedBy: '@admin_main',
      addedDate: '08.09.2024',
      triggerCount: 89
    }
  ];

  const categories = [
    { id: 'all', label: 'Все', count: mockBannedWords.length },
    { id: 'spam', label: 'Спам', count: mockBannedWords.filter(w => w.category === 'spam').length },
    { id: 'offensive', label: 'Оскорбления', count: mockBannedWords.filter(w => w.category === 'offensive').length },
    { id: 'politics', label: 'Политика', count: mockBannedWords.filter(w => w.category === 'politics').length },
    { id: 'custom', label: 'Прочее', count: mockBannedWords.filter(w => w.category === 'custom').length }
  ];

  const availableChats = [
    'Основной чат',
    'Новости',
    'Обсуждения',
    'VK Основная',
    'VK Помощь',
    'Технический'
  ];

  const filteredWords = selectedCategory === 'all' 
    ? mockBannedWords 
    : mockBannedWords.filter(word => word.category === selectedCategory);

  const handleAddWord = () => {
    console.log('Adding banned word:', newWord);
    setShowAddModal(false);
    setNewWord({
      word: '',
      category: 'custom',
      chats: [],
      action: 'warn',
      severity: 'medium'
    });
  };

  const handleDeleteWord = (wordId: string) => {
    console.log('Deleting word:', wordId);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-orange-600 bg-orange-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'warn': return 'text-yellow-600 bg-yellow-100';
      case 'mute': return 'text-orange-600 bg-orange-100';
      case 'kick': return 'text-red-600 bg-red-100';
      case 'ban': return 'text-red-800 bg-red-200';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Icon name="Shield" className="text-red-600" size={24} />
              <span>Управление модерацией</span>
            </CardTitle>
            <Button onClick={() => setShowAddModal(true)}>
              <Icon name="Plus" className="mr-2" size={16} />
              Добавить слово
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Category Filters */}
          <div className="flex space-x-2 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  selectedCategory === category.id
                    ? 'bg-red-100 text-red-700 border border-red-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Moderation Settings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="AlertTriangle" className="text-orange-600" size={24} />
              <h3 className="font-semibold text-orange-800">Автоматическая модерация</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-orange-700">Включена</span>
                <Badge variant="default" className="bg-green-100 text-green-700">
                  Активна
                </Badge>
              </div>
              <div className="text-xs text-orange-600">
                Обработано сегодня: 45 сообщений
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="Clock" className="text-blue-600" size={24} />
              <h3 className="font-semibold text-blue-800">Очередь модерации</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-700">В очереди</span>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  12 заявок
                </Badge>
              </div>
              <div className="text-xs text-blue-600">
                Среднее время обработки: 5 мин
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="Users" className="text-purple-600" size={24} />
              <h3 className="font-semibold text-purple-800">Активные модераторы</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-purple-700">Онлайн</span>
                <Badge variant="default" className="bg-green-100 text-green-700">
                  6 из 8
                </Badge>
              </div>
              <div className="text-xs text-purple-600">
                Последняя активность: 2 мин назад
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Banned Words List */}
      <div className="space-y-4">
        {filteredWords.map((word) => (
          <Card key={word.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Word Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 font-mono bg-gray-100 px-3 py-1 rounded">
                        {word.word}
                      </h3>
                      <Badge variant="outline" className={getSeverityColor(word.severity)}>
                        {word.severity === 'low' ? 'Низкая' : word.severity === 'medium' ? 'Средняя' : 'Высокая'}
                      </Badge>
                      <Badge variant="outline" className={getActionColor(word.action)}>
                        {word.action === 'warn' ? 'Предупреждение' :
                         word.action === 'mute' ? 'Блокировка' :
                         word.action === 'kick' ? 'Исключение' : 'Бан'}
                      </Badge>
                      <Badge variant="secondary">
                        {word.category === 'spam' ? 'Спам' :
                         word.category === 'offensive' ? 'Оскорбления' :
                         word.category === 'politics' ? 'Политика' : 'Прочее'}
                      </Badge>
                    </div>
                    
                    {/* Chats */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {word.chats.map((chat, index) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {chat}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>Срабатывания: {word.triggerCount}</span>
                      <span>Добавлено: {word.addedBy}</span>
                      <span>Дата: {word.addedDate}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Icon name="Edit" className="mr-1" size={14} />
                    Изменить
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteWord(word.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Icon name="Trash2" className="mr-1" size={14} />
                    Удалить
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Word Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-lg mx-4 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Icon name="Plus" className="text-red-600" size={24} />
                <span>Добавить запрещенное слово</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Word */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Слово или фраза
                </label>
                <Input
                  placeholder="Введите запрещенное слово..."
                  value={newWord.word}
                  onChange={(e) => setNewWord({...newWord, word: e.target.value})}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Поддерживаются wildcards: * для любых символов
                </p>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Категория
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'spam', label: 'Спам', icon: 'AlertCircle' },
                    { id: 'offensive', label: 'Оскорбления', icon: 'Ban' },
                    { id: 'politics', label: 'Политика', icon: 'Flag' },
                    { id: 'custom', label: 'Прочее', icon: 'Tag' }
                  ].map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setNewWord({...newWord, category: category.id as any})}
                      className={`p-3 rounded-lg border text-left ${
                        newWord.category === category.id
                          ? 'border-red-500 bg-red-50 text-red-700'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <Icon name={category.icon as any} className="mb-1" size={16} />
                      <div className="text-sm font-medium">{category.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Severity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Серьезность нарушения
                </label>
                <div className="flex space-x-2">
                  {[
                    { id: 'low', label: 'Низкая', color: 'bg-green-50 border-green-200 text-green-700' },
                    { id: 'medium', label: 'Средняя', color: 'bg-orange-50 border-orange-200 text-orange-700' },
                    { id: 'high', label: 'Высокая', color: 'bg-red-50 border-red-200 text-red-700' }
                  ].map((severity) => (
                    <button
                      key={severity.id}
                      onClick={() => setNewWord({...newWord, severity: severity.id as any})}
                      className={`flex-1 p-2 rounded-lg border text-sm font-medium ${
                        newWord.severity === severity.id
                          ? severity.color
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      {severity.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Действие при нарушении
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'warn', label: 'Предупреждение', desc: 'Отправить предупреждение пользователю' },
                    { id: 'mute', label: 'Блокировка сообщений', desc: 'Временно запретить отправку сообщений' },
                    { id: 'kick', label: 'Исключение', desc: 'Удалить пользователя из беседы' },
                    { id: 'ban', label: 'Постоянная блокировка', desc: 'Заблокировать пользователя навсегда' }
                  ].map((action) => (
                    <button
                      key={action.id}
                      onClick={() => setNewWord({...newWord, action: action.id as any})}
                      className={`w-full p-3 text-left rounded-lg border ${
                        newWord.action === action.id
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="font-medium">{action.label}</div>
                      <div className="text-sm text-gray-600">{action.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Chats */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Применить к беседам
                </label>
                <div className="max-h-32 overflow-y-auto space-y-1">
                  {availableChats.map((chat) => (
                    <label key={chat} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={newWord.chats.includes(chat)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewWord({
                              ...newWord,
                              chats: [...newWord.chats, chat]
                            });
                          } else {
                            setNewWord({
                              ...newWord,
                              chats: newWord.chats.filter(c => c !== chat)
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

              {/* Actions */}
              <div className="flex space-x-3 pt-4">
                <Button className="flex-1" onClick={handleAddWord}>
                  <Icon name="Plus" className="mr-2" size={16} />
                  Добавить слово
                </Button>
                <Button variant="outline" onClick={() => setShowAddModal(false)}>
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

export default ModerationTools;