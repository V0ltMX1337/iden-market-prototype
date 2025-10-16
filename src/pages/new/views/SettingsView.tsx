import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User } from '../types';

interface SettingsViewProps {
  currentUser: User;
  onBack: () => void;
  onUpdate: (user: User) => void;
}

const SettingsView = ({ currentUser, onBack, onUpdate }: SettingsViewProps) => {
  const [formData, setFormData] = useState({
    name: currentUser.name,
    bio: currentUser.bio || '',
    email: currentUser.email,
    phone: currentUser.phone || '',
    city: currentUser.city || '',
    birthdate: currentUser.birthdate || '',
  });

  const handleSave = () => {
    onUpdate({
      ...currentUser,
      name: formData.name,
      bio: formData.bio,
      phone: formData.phone,
      city: formData.city,
      birthdate: formData.birthdate,
    });
    alert('Настройки сохранены!');
  };

  const handlePhotoUpload = () => {
    alert('Загрузка фото (будет работать с backend)');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <Button variant="ghost" onClick={onBack} className="mb-2">
        <Icon name="ArrowLeft" size={20} className="mr-2" />
        Назад
      </Button>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Настройки</h1>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Профиль</TabsTrigger>
          <TabsTrigger value="privacy">Приватность</TabsTrigger>
          <TabsTrigger value="security">Безопасность</TabsTrigger>
          <TabsTrigger value="notifications">Уведомления</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-4">Фотография профиля</h3>
                <div className="flex items-center gap-6">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-6xl">
                    {currentUser.avatar}
                  </div>
                  <div className="space-y-2">
                    <Button onClick={handlePhotoUpload}>
                      <Icon name="Upload" size={18} className="mr-2" />
                      Загрузить фото
                    </Button>
                    <div className="text-sm text-gray-500">
                      Рекомендуемый размер: 400x400px
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-2">Имя *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Введите имя"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-2">Email *</label>
                  <Input
                    type="email"
                    value={formData.email}
                    disabled
                    className="bg-gray-100"
                  />
                  <div className="text-xs text-gray-500 mt-1">Email нельзя изменить</div>
                </div>

                <div>
                  <label className="block font-medium mb-2">Телефон</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-2">Город</label>
                  <Input
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Москва"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-2">Дата рождения</label>
                  <Input
                    type="date"
                    value={formData.birthdate}
                    onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium mb-2">О себе</label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none"
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Расскажите о себе..."
                />
              </div>

              <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                <Icon name="Save" size={18} className="mr-2" />
                Сохранить изменения
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-lg mb-4">Настройки приватности</h3>
              
              {[
                { label: 'Кто может видеть мою страницу', value: 'Все пользователи' },
                { label: 'Кто может писать мне сообщения', value: 'Друзья и друзья друзей' },
                { label: 'Кто может комментировать мои записи', value: 'Друзья' },
                { label: 'Кто видит мои фотографии', value: 'Все пользователи' },
              ].map((setting) => (
                <div key={setting.label} className="flex items-center justify-between py-3 border-b">
                  <div>
                    <div className="font-medium">{setting.label}</div>
                  </div>
                  <select className="px-3 py-2 border rounded-lg">
                    <option>{setting.value}</option>
                    <option>Только я</option>
                    <option>Друзья</option>
                    <option>Друзья и друзья друзей</option>
                    <option>Все пользователи</option>
                  </select>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-4">Безопасность</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Icon name="Shield" size={24} className="text-green-600" />
                      <div>
                        <div className="font-medium">Двухфакторная аутентификация</div>
                        <div className="text-sm text-gray-600">
                          {currentUser.twoFactorEnabled ? 'Включена' : 'Выключена'}
                        </div>
                      </div>
                    </div>
                    <Button variant="outline">
                      {currentUser.twoFactorEnabled ? 'Отключить' : 'Включить'}
                    </Button>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="font-medium mb-3">Изменить пароль</div>
                    <div className="space-y-3">
                      <Input type="password" placeholder="Текущий пароль" />
                      <Input type="password" placeholder="Новый пароль" />
                      <Input type="password" placeholder="Повторите новый пароль" />
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Изменить пароль
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="font-medium mb-2">Активные сеансы</div>
                    <div className="text-sm text-gray-600 mb-3">
                      Вы вошли на следующих устройствах:
                    </div>
                    <div className="space-y-2">
                      {[
                        { device: 'Chrome на Windows', location: 'Москва', time: 'Сейчас активен' },
                        { device: 'Safari на iPhone', location: 'Москва', time: '2 часа назад' },
                      ].map((session, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg">
                          <div>
                            <div className="font-medium text-sm">{session.device}</div>
                            <div className="text-xs text-gray-500">
                              {session.location} · {session.time}
                            </div>
                          </div>
                          {idx > 0 && (
                            <Button variant="ghost" size="sm" className="text-red-600">
                              Завершить
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">Уведомления</h3>
              <div className="space-y-3">
                {[
                  'Новые сообщения',
                  'Заявки в друзья',
                  'Комментарии к моим постам',
                  'Лайки моих постов',
                  'Упоминания',
                  'Приглашения в сообщества',
                ].map((item) => (
                  <label key={item} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <span>{item}</span>
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsView;
