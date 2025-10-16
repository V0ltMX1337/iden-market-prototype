import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User } from '../types';

interface ProfileTabProps {
  currentUser: User;
}

const ProfileTab = ({ currentUser }: ProfileTabProps) => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="mb-6">
        <CardContent className="p-0">
          <div className="h-48 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-lg"></div>
          <div className="p-6">
            <div className="flex items-start gap-4 -mt-20">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl border-4 border-white shadow-xl flex items-center justify-center text-white text-6xl">
                {currentUser.avatar}
              </div>
              <div className="flex-1 mt-16">
                <h1 className="text-3xl font-bold mb-2">{currentUser.name}</h1>
                <p className="text-gray-600 mb-4">{currentUser.bio || 'Добавьте информацию о себе'}</p>
                <div className="flex items-center gap-6 text-sm">
                  <div>
                    <span className="font-semibold">{currentUser.friendsCount}</span>
                    <span className="text-gray-600 ml-1">друзей</span>
                  </div>
                  <div>
                    <span className="font-semibold">{currentUser.followersCount}</span>
                    <span className="text-gray-600 ml-1">подписчиков</span>
                  </div>
                </div>
              </div>
              <Button variant="outline">
                <Icon name="Settings" size={20} className="mr-2" />
                Редактировать
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="posts">
        <TabsList className="mb-6">
          <TabsTrigger value="posts">Записи</TabsTrigger>
          <TabsTrigger value="photos">Фотографии</TabsTrigger>
          <TabsTrigger value="videos">Видео</TabsTrigger>
          <TabsTrigger value="info">Информация</TabsTrigger>
        </TabsList>

        <TabsContent value="posts">
          <Card>
            <CardContent className="p-6 text-center text-gray-500">
              <Icon name="FileText" size={48} className="mx-auto mb-4 text-gray-300" />
              <p>Записей пока нет</p>
              <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                Создать первую запись
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="photos">
          <Card>
            <CardContent className="p-6 text-center text-gray-500">
              <Icon name="Image" size={48} className="mx-auto mb-4 text-gray-300" />
              <p>Фотографий пока нет</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="videos">
          <Card>
            <CardContent className="p-6 text-center text-gray-500">
              <Icon name="Video" size={48} className="mx-auto mb-4 text-gray-300" />
              <p>Видео пока нет</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="info">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-4">Личная информация</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Icon name="Mail" size={20} className="text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="font-medium">{currentUser.email}</div>
                  </div>
                </div>
                {currentUser.phone && (
                  <div className="flex items-center gap-3">
                    <Icon name="Phone" size={20} className="text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">Телефон</div>
                      <div className="font-medium">{currentUser.phone}</div>
                    </div>
                  </div>
                )}
                {currentUser.city && (
                  <div className="flex items-center gap-3">
                    <Icon name="MapPin" size={20} className="text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">Город</div>
                      <div className="font-medium">{currentUser.city}</div>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <Icon name="Shield" size={20} className="text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-500">Двухфакторная аутентификация</div>
                    <div className="font-medium">
                      {currentUser.twoFactorEnabled ? (
                        <span className="text-green-600">✓ Включена</span>
                      ) : (
                        <span className="text-gray-400">Выключена</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileTab;
