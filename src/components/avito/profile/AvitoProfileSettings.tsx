import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/hooks/useAuth";
import { storeApi } from "@/lib/store";
import { City, User } from "@/lib/types";

const AvitoProfileSettings = () => {
  const { user } = useAuth();

  // formData хранит частично данные из User
  const [formData, setFormData] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    cityId: string;
    photoUrl?: string;
  }>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cityId: "",
    photoUrl: "",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    marketing: false,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [cities, setCities] = useState<City[]>([]);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  useEffect(() => {
    const loadCities = async () => {
      try {
        const citiesData: City[] = await storeApi.getCities();
        setCities(citiesData);
      } catch (error) {
        console.error("Ошибка загрузки городов", error);
      }
    };
    loadCities();
  }, []);

  useEffect(() => {
    if (!user?.id) return;

    const loadUserData = async () => {
      setLoading(true);
      try {
        const freshUser: User = await storeApi.getUserById(user.id);
        setFormData({
          firstName: freshUser.firstName || "",
          lastName: freshUser.lastName || "",
          email: freshUser.email || "",
          phone: freshUser.phone || "",
          cityId: freshUser.city?.id || "",
          photoUrl: freshUser.photoUrl || "",
        });
      } catch (error) {
        console.error("Ошибка загрузки данных пользователя", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [user?.id]);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (
    field: keyof typeof notifications,
    value: boolean
  ) => {
    setNotifications((prev) => ({ ...prev, [field]: value }));
  };
  
  const handleSave = async () => {
    if (!user?.id) return;
  
    if (!formData.cityId) {
      alert("Пожалуйста, выберите город");
      return;
    }
  
    setSaving(true);
    try {
      const cityObj = cities.find((c) => c.id === formData.cityId);
      if (!cityObj) {
        alert("Выбран неверный город");
        setSaving(false);
        return;
      }
    
      // Объединяем полный объект пользователя с новыми данными из формы
      const updatedUser: User = {
        ...user,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        city: cityObj,
        photoUrl: formData.photoUrl || "", // Гарантируем, что всегда строка
      };
    
      await storeApi.updateUser(user.id, updatedUser);
    
      alert("Данные успешно сохранены");
    
      // тут нужно обновить локальный контекст/стейт пользователя, если используешь
      // например: updateUserInContext(updatedUser);
    
    } catch (error) {
      console.error("Ошибка сохранения данных", error);
      alert("Ошибка при сохранении данных");
    } finally {
      setSaving(false);
    }
  };



  // Загрузка аватарки
  const onAvatarChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files?.[0]) return;

      const file = e.target.files[0];
      setUploadingAvatar(true);

      try {
        const res = await storeApi.uploadPhoto("avatars", file);
        setFormData((prev) => ({ ...prev, photoUrl: res.url }));
      } catch (error) {
        console.error("Ошибка загрузки аватарки", error);
        alert("Ошибка загрузки аватарки");
      } finally {
        setUploadingAvatar(false);
      }
    },
    []
  );

  if (loading) return <div>Загрузка...</div>;
  if (!user) return <div>Пользователь не авторизован</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Настройки профиля</h1>

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
          <Button
            variant="outline"
            className="w-full justify-start border-blue-200 text-blue-600 hover:bg-blue-50"
          >
            <Icon name="Key" size={16} className="mr-2" />
            Изменить пароль
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start border-purple-200 text-purple-600 hover:bg-purple-50"
          >
            <Icon name="Shield" size={16} className="mr-2" />
            Двухфакторная аутентификация
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start border-blue-200 text-blue-600 hover:bg-blue-50"
          >
            <Icon name="Download" size={16} className="mr-2" />
            Скачать мои данные
          </Button>
        </CardContent>
      </Card>

      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">Опасная зона</CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" className="w-full">
            <Icon name="Trash2" size={16} className="mr-2" />
            Удалить аккаунт
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AvitoProfileSettings;
