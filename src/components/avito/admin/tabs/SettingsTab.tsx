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
import { Textarea } from "@/components/ui/textarea"; // добавлен импорт Textarea
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
    supportEmail: "",
    maintenanceMode: false,
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
          <CardDescription>Основные параметры сайта</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="siteName">Название сайта</Label>
                <Input
                  id="siteName"
                  value={systemSettings.siteName ?? ""}
                  onChange={(e) =>
                    setSystemSettings({
                      ...systemSettings,
                      siteName: e.target.value,
                    })
                  }
                  disabled={loading}
                />
              </div>

              <div>
                <Label htmlFor="siteDescription">Описание сайта</Label>
                <Textarea
                  id="siteDescription"
                  value={systemSettings.siteDescription ?? ""}
                  onChange={(e) =>
                    setSystemSettings({
                      ...systemSettings,
                      siteDescription: e.target.value,
                    })
                  }
                  disabled={loading}
                />
              </div>

              <div>
                <Label htmlFor="commission">Комиссия (%)</Label>
                <Input
                  id="commission"
                  type="number"
                  value={systemSettings.commission ?? 0}
                  onChange={(e) =>
                    setSystemSettings({
                      ...systemSettings,
                      commission: Number(e.target.value),
                    })
                  }
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="seoTitle">SEO заголовок</Label>
                <Input
                  id="seoTitle"
                  value={systemSettings.seoTitle ?? ""}
                  onChange={(e) =>
                    setSystemSettings({
                      ...systemSettings,
                      seoTitle: e.target.value,
                    })
                  }
                  disabled={loading}
                />
              </div>

              <div>
                <Label htmlFor="seoDescription">SEO описание</Label>
                <Textarea
                  id="seoDescription"
                  value={systemSettings.seoDescription ?? ""}
                  onChange={(e) =>
                    setSystemSettings({
                      ...systemSettings,
                      seoDescription: e.target.value,
                    })
                  }
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Label htmlFor="supportEmail">Email поддержки</Label>
            <Input
              id="supportEmail"
              type="email"
              value={systemSettings.supportEmail ?? ""}
              onChange={(e) =>
                setSystemSettings({
                  ...systemSettings,
                  supportEmail: e.target.value,
                })
              }
              disabled={loading}
            />
          </div>

          <div className="flex items-center space-x-2 mt-6">
            <input
              id="maintenanceMode"
              type="checkbox"
              checked={systemSettings.maintenanceMode}
              onChange={(e) =>
                setSystemSettings({
                  ...systemSettings,
                  maintenanceMode: e.target.checked,
                })
              }
              disabled={loading}
              className="w-4 h-4"
            />
            <Label htmlFor="maintenanceMode" className="mb-0 cursor-pointer">
              Режим обслуживания
            </Label>
          </div>

          <Button className="w-full mt-6" onClick={saveSettings} disabled={loading}>
            <Icon name="Save" className="h-4 w-4 mr-2" />
            Сохранить настройки
          </Button>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default SettingsTab;
