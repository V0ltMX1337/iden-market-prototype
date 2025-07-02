import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import AvitoHeader from "@/components/avitomarket/AvitoHeader";
import AvitoFooter from "@/components/avitomarket/AvitoFooter";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import CategoriesTab from "@/components/avito/admin/tabs/CategoriesTab";
import CitiesTab from "@/components/avito/admin/tabs/CitiesTab";
import FinanceTab from "@/components/avito/admin/tabs/FinanceTab";
import UsersTab from "@/components/avito/admin/tabs/UsersTab";
import SettingsTab from "@/components/avito/admin/tabs/SettingsTab";
import { useState } from "react";
import UserEditTab from "@/components/avito/admin/tabs/UserEditTab";

const AvitoAdmin = () => {
  const { isAdmin } = useAuth();

  // Проверяем права доступа
  if (!isAdmin()) {
    return <Navigate to="/avito" replace />;
  }

  // ID пользователя, которого редактируем
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  // Функция открытия редактирования пользователя
  const openUserEdit = (userId: string) => setEditingUserId(userId);

  // Закрытие редактирования (возврат к списку)
  const closeUserEdit = () => setEditingUserId(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <AvitoHeader />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Панель администратора
          </h1>
          <p className="text-gray-600">Управление системой TRIVO</p>
        </div>

        <Tabs defaultValue="stats" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="stats">Статистика</TabsTrigger>
            <TabsTrigger value="categories">Категории</TabsTrigger>
            <TabsTrigger value="cities">Города</TabsTrigger>
            <TabsTrigger value="finance">Финансы</TabsTrigger>
            <TabsTrigger value="users">Пользователи</TabsTrigger>
            <TabsTrigger value="settings">Настройки</TabsTrigger>
          </TabsList>

          {/* Статистика */}
          <TabsContent value="stats">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Всего пользователей
                  </CardTitle>
                  <Icon
                    name="Users"
                    className="h-4 w-4 text-muted-foreground"
                  />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">123</div>
                  <p className="text-xs text-muted-foreground">
                    Активных: 1
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Категории
                  </CardTitle>
                  <Icon
                    name="Grid3X3"
                    className="h-4 w-4 text-muted-foreground"
                  />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    1
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Активные категории
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Города</CardTitle>
                  <Icon
                    name="MapPin"
                    className="h-4 w-4 text-muted-foreground"
                  />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1</div>
                  <p className="text-xs text-muted-foreground">
                    Поддерживаемые города
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Общий доход
                  </CardTitle>
                  <Icon
                    name="DollarSign"
                    className="h-4 w-4 text-muted-foreground"
                  />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    1 ₽
                  </div>
                  <p className="text-xs text-muted-foreground">За все время</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Доход за месяц
                  </CardTitle>
                  <Icon
                    name="TrendingUp"
                    className="h-4 w-4 text-muted-foreground"
                  />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    1 ₽
                  </div>
                  <p className="text-xs text-muted-foreground">Текущий месяц</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="categories"><CategoriesTab /></TabsContent>
          <TabsContent value="cities"><CitiesTab /></TabsContent>
          <TabsContent value="finance"><FinanceTab /></TabsContent>
          <TabsContent value="users">
            {editingUserId ? (
              <UserEditTab
                userId={editingUserId}
                onCancel={closeUserEdit}
                onSave={closeUserEdit}
              />
            ) : (
              <UsersTab onEditUser={openUserEdit} />
            )}
          </TabsContent>
          <TabsContent value="settings"><SettingsTab /></TabsContent>
        </Tabs>
      </div>

      <AvitoFooter />
    </div>
  );
};

export default AvitoAdmin;
