import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { useProfileSettings } from "@/hooks/useProfileSettings";

const AvitoProfileSettings = () => {
  const {
    user,
    formData,
    notifications,
    loading,
    saving,
    cities,
    uploadingAvatar,
    uploadingBanner,
    showPasswordModal,
    showTwoFactorModal,
    passwordForm,
    twoFactorForm,
    changingPassword,
    settingTwoFactor,
    handleInputChange,
    handleNotificationChange,
    handleSave,
    onAvatarChange,
    onBannerChange,
    setShowPasswordModal,
    setShowTwoFactorModal,
    setPasswordForm,
    setTwoFactorForm,
    handlePasswordChange,
    handleTwoFactorSetup,
    resetTwoFactorModal,
  } = useProfileSettings();



  if (loading) return <div>Загрузка...</div>;
  if (!user) return <div>Пользователь не авторизован</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Настройки профиля</h1>

      <Card>
        <CardHeader>
          <CardTitle>Баннер профиля</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.bannerUrl ? (
            <div className="relative">
              <img
                src={formData.bannerUrl}
                alt="Баннер профиля"
                className="w-full h-48 rounded-lg object-cover border border-gray-300"
              />
            </div>
          ) : (
            <div className="w-full h-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-400">
              <div className="text-center text-gray-500">
                <Icon name="Image" size={48} className="mx-auto mb-2" />
                <p className="text-sm">Рекомендуемый размер: 1200x320 пикселей</p>
              </div>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={onBannerChange}
            disabled={uploadingBanner}
            id="banner-upload"
            className="hidden"
          />
          <label
            htmlFor="banner-upload"
            className={`cursor-pointer px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 inline-block ${
              uploadingBanner ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {uploadingBanner ? "Загрузка..." : "Загрузить баннер"}
          </label>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Аватарка</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 flex flex-col items-center">
          {formData.photoUrl ? (
            <img
              src={formData.photoUrl}
              alt="Аватар пользователя"
              className="w-24 h-24 rounded-full object-cover mb-4 border border-gray-300"
            />
          ) : (
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Icon name="User" size={32} className="text-white" />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={onAvatarChange}
            disabled={uploadingAvatar}
            id="avatar-upload"
            className="hidden"
          />
          <label
            htmlFor="avatar-upload"
            className={`cursor-pointer px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 ${
              uploadingAvatar ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {uploadingAvatar ? "Загрузка..." : "Загрузить аватарку"}
          </label>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Личная информация</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">Имя</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="lastName">Фамилия</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="phone">Телефон</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="city">Город</Label>
            <select
              id="city"
              value={formData.cityId}
              onChange={(e) => handleInputChange("cityId", e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">Выберите город</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name} ({city.region})
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="description">О себе</Label>
            <Textarea
              id="description"
              value={formData.description || ""}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Расскажите о себе, своем опыте и интересах..."
              className="min-h-[100px] resize-none"
              maxLength={500}
            />
            <p className="text-xs text-gray-500 mt-1">
              {(formData.description || "").length}/500 символов
            </p>
          </div>
          <Button
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Сохранение..." : "Сохранить изменения"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Уведомления</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {[
            {
              label: "Email уведомления",
              description: "Получать уведомления на email",
              field: "email",
            },
            {
              label: "SMS уведомления",
              description: "Получать SMS о новых сообщениях",
              field: "sms",
            },
            {
              label: "Push уведомления",
              description: "Показывать уведомления в браузере",
              field: "push",
            },
            {
              label: "Маркетинговые рассылки",
              description: "Получать информацию о акциях и новостях",
              field: "marketing",
            },
          ].map(({ label, description, field }) => (
            <div className="flex items-center justify-between" key={field}>
              <div>
                <h3 className="font-medium">{label}</h3>
                <p className="text-sm text-gray-600">{description}</p>
              </div>
              <Switch
                checked={notifications[field]}
                onCheckedChange={(checked) =>
                  handleNotificationChange(field, checked)
                }
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Безопасность</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Dialog open={showPasswordModal} onOpenChange={setShowPasswordModal}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                <Icon name="Key" size={16} className="mr-2" />
                Изменить пароль
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <Icon name="Key" className="w-5 h-5" />
                  <span>Смена пароля</span>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Текущий пароль</Label>
                  <Input
                    id="current-password"
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                    placeholder="Введите текущий пароль"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">Новый пароль</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                    placeholder="Минимум 6 символов"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Подтвердите пароль</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    placeholder="Повторите новый пароль"
                  />
                </div>
                <div className="flex space-x-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowPasswordModal(false)}
                    className="flex-1"
                  >
                    Отмена
                  </Button>
                  <Button
                    onClick={handlePasswordChange}
                    disabled={changingPassword}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    {changingPassword ? "Изменение..." : "Изменить"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <Dialog open={showTwoFactorModal} onOpenChange={setShowTwoFactorModal}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start border-purple-200 text-purple-600 hover:bg-purple-50"
              >
                <Icon name="Shield" size={16} className="mr-2" />
                Двухфакторная аутентификация
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <Icon name="Shield" className="w-5 h-5" />
                  <span>Двухфакторная аутентификация</span>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                {twoFactorForm.step === "input" ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="telegram-id">Telegram ID</Label>
                      <Input
                        id="telegram-id"
                        value={twoFactorForm.telegramId}
                        onChange={(e) => setTwoFactorForm(prev => ({ ...prev, telegramId: e.target.value }))}
                        placeholder="Например: @username или 123456789"
                      />
                      <p className="text-sm text-gray-600">
                        Введите ваш Telegram ID для настройки двухфакторной аутентификации
                      </p>
                    </div>
                    <div className="flex space-x-2 pt-4">
                      <Button
                        variant="outline"
                        onClick={resetTwoFactorModal}
                        className="flex-1"
                      >
                        Отмена
                      </Button>
                      <Button
                        onClick={handleTwoFactorSetup}
                        disabled={settingTwoFactor}
                        className="flex-1 bg-purple-600 hover:bg-purple-700"
                      >
                        {settingTwoFactor ? "Настройка..." : "Продолжить"}
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-4">
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <Icon name="CheckCircle" className="w-5 h-5 text-green-600 mb-2" />
                        <h3 className="font-medium text-green-800 mb-2">Шаг 1: Отправьте команду боту</h3>
                        <p className="text-sm text-green-700 mb-3">
                          Отправьте следующую команду нашему боту в Telegram:
                        </p>
                        <code className="block p-2 bg-white rounded border text-sm font-mono break-all">
                          /start&siteid={user?.id}&verif={twoFactorForm.telegramId}
                        </code>
                      </div>
                      
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <Icon name="MessageCircle" className="w-5 h-5 text-blue-600 mb-2" />
                        <h3 className="font-medium text-blue-800 mb-2">Шаг 2: Найдите бота</h3>
                        <p className="text-sm text-blue-700">
                          Найдите нашего бота в Telegram по имени: 
                          <strong>@avitobot</strong> и отправьте команду выше.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <Icon name="AlertTriangle" className="w-5 h-5 text-yellow-600 mb-2" />
                        <h3 className="font-medium text-yellow-800 mb-2">Важно!</h3>
                        <p className="text-sm text-yellow-700">
                          После отправки команды бот подтвердит настройку 2FA. 
                          Можете закрыть это окно.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 pt-4">
                      <Button
                        variant="outline"
                        onClick={resetTwoFactorModal}
                        className="flex-1"
                      >
                        Закрыть
                      </Button>
                      <Button
                        onClick={() => {
                          const command = `/start&siteid=${user?.id}&verif=${twoFactorForm.telegramId}`;
                          navigator.clipboard.writeText(command);
                          alert("Команда скопирована в буфер обмена");
                        }}
                        className="flex-1 bg-purple-600 hover:bg-purple-700"
                      >
                        <Icon name="Copy" className="w-4 h-4 mr-2" />
                        Копировать команду
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
};

export default AvitoProfileSettings;