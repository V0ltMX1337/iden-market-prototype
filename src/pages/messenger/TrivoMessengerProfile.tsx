import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/hooks/useAuth";
import { useSEO } from "@/hooks/useSEO";

const TrivoMessengerProfile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bio, setBio] = useState("Разработчик в Trivo. Люблю создавать классные проекты!");
  const [tempBio, setTempBio] = useState(bio);

  // SEO метатеги для страницы профиля
  useSEO({
    title: "Профиль - TrivoMessenger",
    description: "Настройки профиля TrivoMessenger. Редактирование личной информации, настройки приватности, уведомления и внешний вид.",
    keywords: "профиль, настройки, приватность, уведомления, персонализация, trivo",
    ogTitle: "Настройки профиля - TrivoMessenger",
    ogDescription: "Управляйте своим профилем в TrivoMessenger: редактируйте информацию, настраивайте приватность и уведомления"
  });

  const handleSaveBio = () => {
    setBio(tempBio);
    setIsEditingBio(false);
  };

  const handleCancelEdit = () => {
    setTempBio(bio);
    setIsEditingBio(false);
  };

  if (!user) {
    navigate("/messenger");
    return null;
  }

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 p-4 z-50">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate("/messenger/main")}>
            <Icon name="ArrowLeft" className="w-5 h-5" />
          </Button>
          <h1 className="font-semibold">Профиль</h1>
          <Button variant="ghost" onClick={logout}>
            <Icon name="LogOut" className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Sidebar (Desktop only) */}
      <div className="hidden md:flex w-80 bg-white border-r border-gray-200 flex-col">
        <div className="p-4 border-b border-gray-200">
          <Button variant="ghost" onClick={() => navigate("/messenger/main")} className="mb-4">
            <Icon name="ArrowLeft" className="w-4 h-4 mr-2" />
            Назад к чатам
          </Button>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Icon name="User" className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Профиль
            </h1>
          </div>
        </div>
        
        <div className="flex-1 p-4">
          <nav className="space-y-2">
            <Button variant="ghost" className="w-full justify-start">
              <Icon name="User" className="w-4 h-4 mr-2" />
              Основная информация
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Icon name="Settings" className="w-4 h-4 mr-2" />
              Настройки
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Icon name="Lock" className="w-4 h-4 mr-2" />
              Приватность
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Icon name="Bell" className="w-4 h-4 mr-2" />
              Уведомления
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Icon name="Palette" className="w-4 h-4 mr-2" />
              Темы
            </Button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col pt-16 md:pt-0">
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-2xl mx-auto space-y-6">
            
            {/* Profile Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="relative">
                    {user.photoUrl ? (
                      <img src={user.photoUrl} alt={user.firstName} className="w-24 h-24 rounded-full object-cover" />
                    ) : (
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <Icon name="User" className="w-12 h-12 text-white" />
                      </div>
                    )}
                    <Button 
                      size="sm" 
                      className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-gradient-to-r from-blue-600 to-purple-600"
                    >
                      <Icon name="Camera" className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="flex-1 text-center sm:text-left">
                    <h2 className="text-2xl font-bold">{user.firstName || user.email}</h2>
                    <p className="text-gray-500 mb-4">@{user.email.split('@')[0]}</p>
                    
                    <div className="space-y-2">
                      {isEditingBio ? (
                        <div className="space-y-2">
                          <textarea
                            value={tempBio}
                            onChange={(e) => setTempBio(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg resize-none"
                            rows={3}
                            placeholder="Расскажите о себе..."
                          />
                          <div className="flex space-x-2">
                            <Button size="sm" onClick={handleSaveBio}>Сохранить</Button>
                            <Button size="sm" variant="outline" onClick={handleCancelEdit}>Отмена</Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <p className="text-gray-700">{bio}</p>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => setIsEditingBio(true)}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <Icon name="Edit" className="w-4 h-4 mr-1" />
                            Редактировать
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Settings Tabs */}
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                <TabsTrigger value="personal" className="text-xs">
                  <Icon name="User" className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">Личные</span>
                </TabsTrigger>
                <TabsTrigger value="privacy" className="text-xs">
                  <Icon name="Lock" className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">Приватность</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="text-xs">
                  <Icon name="Bell" className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">Уведомления</span>
                </TabsTrigger>
                <TabsTrigger value="appearance" className="text-xs">
                  <Icon name="Palette" className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">Внешний вид</span>
                </TabsTrigger>
              </TabsList>

              {/* Personal Settings */}
              <TabsContent value="personal" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Личная информация</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Имя</label>
                      <input
                        type="text"
                        defaultValue={user.firstName || ''}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Фамилия</label>
                      <input
                        type="text"
                        defaultValue={user.lastName || ''}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue={user.email}
                        disabled
                        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Телефон</label>
                      <input
                        type="tel"
                        defaultValue={user.phone}
                        placeholder="+7 (999) 123-45-67"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Сохранить изменения
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Privacy Settings */}
              <TabsContent value="privacy" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Настройки приватности</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Показывать статус "в сети"</p>
                        <p className="text-sm text-gray-500">Другие пользователи будут видеть, когда вы онлайн</p>
                      </div>
                      <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Двухфакторная аутентификация</p>
                        <p className="text-sm text-gray-500">Дополнительная защита аккаунта</p>
                      </div>
                      <Button variant="outline" size="sm">Настроить</Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Кто может писать мне</p>
                        <p className="text-sm text-gray-500">Все / Только контакты</p>
                      </div>
                      <Button variant="outline" size="sm">Изменить</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notifications */}
              <TabsContent value="notifications" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Уведомления</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Звук уведомлений</p>
                        <p className="text-sm text-gray-500">Воспроизводить звук при получении сообщений</p>
                      </div>
                      <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Предпросмотр сообщений</p>
                        <p className="text-sm text-gray-500">Показывать текст сообщения в уведомлении</p>
                      </div>
                      <div className="w-12 h-6 bg-gray-300 rounded-full relative cursor-pointer">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5"></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Уведомления о звонках</p>
                        <p className="text-sm text-gray-500">Получать уведомления о входящих звонках</p>
                      </div>
                      <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Appearance */}
              <TabsContent value="appearance" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Внешний вид</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-medium mb-3">Тема оформления</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="p-4 border-2 border-blue-500 rounded-lg cursor-pointer">
                          <div className="w-full h-16 bg-white rounded mb-2 border"></div>
                          <p className="text-sm font-medium text-center">Светлая</p>
                        </div>
                        <div className="p-4 border-2 border-gray-300 rounded-lg cursor-pointer">
                          <div className="w-full h-16 bg-gray-800 rounded mb-2"></div>
                          <p className="text-sm font-medium text-center">Темная</p>
                        </div>
                        <div className="p-4 border-2 border-gray-300 rounded-lg cursor-pointer">
                          <div className="w-full h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded mb-2"></div>
                          <p className="text-sm font-medium text-center">Авто</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <p className="font-medium mb-3">Размер шрифта</p>
                      <div className="space-y-2">
                        <input type="range" min="12" max="20" defaultValue="14" className="w-full" />
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>Маленький</span>
                          <span>Средний</span>
                          <span>Большой</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Danger Zone */}
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-600">Опасная зона</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50">
                  <Icon name="Trash2" className="w-4 h-4 mr-2" />
                  Удалить все сообщения
                </Button>
                <Button variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50">
                  <Icon name="UserX" className="w-4 h-4 mr-2" />
                  Деактивировать аккаунт
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrivoMessengerProfile;