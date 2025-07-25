import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { storeApi } from "@/lib/store";
import { SystemSettings } from "@/lib/types";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const SettingsTab = () => {
  const [systemSettings, setSystemSettings] = useState<SystemSettings>({
    siteName: "",
    siteDescription: "",
    seoTitle: "",
    seoDescription: "",
    mainPageTitle: "",
    adTitle: "",
    userProfile: "",
    categoryTitle: "",
    authTitle: "",
    registerTitle: "",
    profileMain: "",
    profileAds: "",
    profileMessages: "",
    profileFavorites: "",
    profileGame: "",
    profileSettings: "",
    profileNewAd: "",
    commission: 0,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const settings = await storeApi.getSystemSettings();
        setSystemSettings(settings);
      } catch (error) {
        console.error("Ошибка загрузки настроек", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (field: keyof SystemSettings, value: string | number | boolean) => {
    setSystemSettings(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveSettings = async () => {
    setLoading(true);
    try {
      await storeApi.updateSystemSettings(systemSettings);
      alert("Настройки успешно сохранены!");
    } catch (error) {
      console.error("Ошибка сохранения настроек", error);
      alert("Ошибка при сохранении настроек.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TabsContent value="settings">
      <Card>
        <CardHeader>
          <CardTitle>Настройки системы</CardTitle>
          <CardDescription>Основные параметры сайта и шаблоны</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="siteName">Название сайта</Label>
                <Input
                  id="siteName"
                  value={systemSettings.siteName}
                  onChange={e => handleChange("siteName", e.target.value)}
                  disabled={loading}
                />
              </div>

              <div>
                <Label htmlFor="siteDescription">Описание сайта</Label>
                <Textarea
                  id="siteDescription"
                  value={systemSettings.siteDescription}
                  onChange={e => handleChange("siteDescription", e.target.value)}
                  disabled={loading}
                />
              </div>

              <div>
                <Label htmlFor="commission">Комиссия (%)</Label>
                <Input
                  id="commission"
                  type="number"
                  value={systemSettings.commission}
                  onChange={e => handleChange("commission", Number(e.target.value))}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="seoTitle">SEO заголовок</Label>
                <Input
                  id="seoTitle"
                  value={systemSettings.seoTitle}
                  onChange={e => handleChange("seoTitle", e.target.value)}
                  disabled={loading}
                />
              </div>

              <div>
                <Label htmlFor="seoDescription">SEO описание</Label>
                <Textarea
                  id="seoDescription"
                  value={systemSettings.seoDescription}
                  onChange={e => handleChange("seoDescription", e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t">
            <div className="space-y-4">
              <div>
                <Label htmlFor="mainPageTitle">Главная страница</Label>
                <Input
                  id="mainPageTitle"
                  value={systemSettings.mainPageTitle}
                  onChange={e => handleChange("mainPageTitle", e.target.value)}
                  disabled={loading}
                />
              </div>
              <div>
                <Label htmlFor="adTitle">Шаблон объявления</Label>
                <Input
                  id="adTitle"
                  value={systemSettings.adTitle}
                  onChange={e => handleChange("adTitle", e.target.value)}
                  disabled={loading}
                />
              </div>
              <div>
                <Label htmlFor="userProfile">Шаблон пользователя</Label>
                <Input
                  id="userProfile"
                  value={systemSettings.userProfile}
                  onChange={e => handleChange("userProfile", e.target.value)}
                  disabled={loading}
                />
              </div>
              <div>
                <Label htmlFor="categoryTitle">Шаблон категории</Label>
                <Input
                  id="categoryTitle"
                  value={systemSettings.categoryTitle}
                  onChange={e => handleChange("categoryTitle", e.target.value)}
                  disabled={loading}
                />
              </div>
              <div>
                <Label htmlFor="authTitle">Шаблон входа</Label>
                <Input
                  id="authTitle"
                  value={systemSettings.authTitle}
                  onChange={e => handleChange("authTitle", e.target.value)}
                  disabled={loading}
                />
              </div>
              <div>
                <Label htmlFor="registerTitle">Шаблон регистрации</Label>
                <Input
                  id="registerTitle"
                  value={systemSettings.registerTitle}
                  onChange={e => handleChange("registerTitle", e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="profileMain">Профиль: Главная</Label>
                <Input
                  id="profileMain"
                  value={systemSettings.profileMain}
                  onChange={e => handleChange("profileMain", e.target.value)}
                  disabled={loading}
                />
              </div>
              <div>
                <Label htmlFor="profileAds">Профиль: Мои объявления</Label>
                <Input
                  id="profileAds"
                  value={systemSettings.profileAds}
                  onChange={e => handleChange("profileAds", e.target.value)}
                  disabled={loading}
                />
              </div>
              <div>
                <Label htmlFor="profileMessages">Профиль: Сообщения</Label>
                <Input
                  id="profileMessages"
                  value={systemSettings.profileMessages}
                  onChange={e => handleChange("profileMessages", e.target.value)}
                  disabled={loading}
                />
              </div>
              <div>
                <Label htmlFor="profileFavorites">Профиль: Избранное</Label>
                <Input
                  id="profileFavorites"
                  value={systemSettings.profileFavorites}
                  onChange={e => handleChange("profileFavorites", e.target.value)}
                  disabled={loading}
                />
              </div>
              <div>
                <Label htmlFor="profileGame">Профиль: Игра</Label>
                <Input
                  id="profileGame"
                  value={systemSettings.profileGame}
                  onChange={e => handleChange("profileGame", e.target.value)}
                  disabled={loading}
                />
              </div>
              <div>
                <Label htmlFor="profileSettings">Профиль: Настройки</Label>
                <Input
                  id="profileSettings"
                  value={systemSettings.profileSettings}
                  onChange={e => handleChange("profileSettings", e.target.value)}
                  disabled={loading}
                />
              </div>
              <div>
                <Label htmlFor="profileNewAd">Профиль: Новое объявление</Label>
                <Input
                  id="profileNewAd"
                  value={systemSettings.profileNewAd}
                  onChange={e => handleChange("profileNewAd", e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          <Button className="w-full mt-8" onClick={saveSettings} disabled={loading}>
            <Icon name="Save" className="h-4 w-4 mr-2" />
            Сохранить настройки
          </Button>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default SettingsTab;
