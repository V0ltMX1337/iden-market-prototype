import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";

const ProfileSettings = () => {
  const [telegramUsername, setTelegramUsername] = useState("@zzzwzxzzz");
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
  });

  const handleNotificationChange = (type: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [type]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Telegram Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="MessageCircle" size={20} />
            Telegram
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="telegram">Username Telegram</Label>
            <div className="relative">
              <Input
                id="telegram"
                value={telegramUsername}
                onChange={(e) => setTelegramUsername(e.target.value)}
                placeholder="@username"
                className="pr-10"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6"
                onClick={() => setTelegramUsername("")}
              >
                <Icon name="X" size={14} />
              </Button>
            </div>
            <p className="text-sm text-gray-500">
              Укажите ваш Telegram username для получения уведомлений
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Bell" size={20} />
            Уведомления
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email уведомления</Label>
              <p className="text-sm text-gray-500">
                Получать уведомления на email
              </p>
            </div>
            <Switch
              checked={notifications.email}
              onCheckedChange={(value) =>
                handleNotificationChange("email", value)
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Push уведомления</Label>
              <p className="text-sm text-gray-500">
                Показывать уведомления в браузере
              </p>
            </div>
            <Switch
              checked={notifications.push}
              onCheckedChange={(value) =>
                handleNotificationChange("push", value)
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>SMS уведомления</Label>
              <p className="text-sm text-gray-500">
                Получать SMS о важных событиях
              </p>
            </div>
            <Switch
              checked={notifications.sms}
              onCheckedChange={(value) =>
                handleNotificationChange("sms", value)
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Shield" size={20} />
            Безопасность
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full justify-start">
            <Icon name="Key" size={16} className="mr-2" />
            Изменить пароль
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Icon name="Smartphone" size={16} className="mr-2" />
            Двухфакторная аутентификация
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start text-red-600 hover:text-red-700"
          >
            <Icon name="LogOut" size={16} className="mr-2" />
            Выйти из всех устройств
          </Button>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button size="lg">
          <Icon name="Save" size={16} className="mr-2" />
          Сохранить изменения
        </Button>
      </div>
    </div>
  );
};

export default ProfileSettings;
