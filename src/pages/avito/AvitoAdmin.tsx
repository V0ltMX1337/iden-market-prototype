import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AvitoHeader from "@/components/avitomarket/AvitoHeader";
import AvitoFooter from "@/components/avitomarket/AvitoFooter";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import StatsTab from "@/components/avito/admin/tabs/StatsTab";
import CategoriesTab from "@/components/avito/admin/tabs/CategoriesTab";
import CitiesTab from "@/components/avito/admin/tabs/CitiesTab";
import FinanceTab from "@/components/avito/admin/tabs/FinanceTab";
import UsersTab from "@/components/avito/admin/tabs/UsersTab";
import SettingsTab from "@/components/avito/admin/tabs/SettingsTab";

const AvitoAdmin = () => {
  const { isAdmin } = useAuth();

  // Проверяем права доступа
  if (!isAdmin()) {
    return <Navigate to="/avito" replace />;
  }

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

          <TabsContent value="stats">
            <StatsTab />
          </TabsContent>

          <TabsContent value="categories">
            <CategoriesTab />
          </TabsContent>

          <TabsContent value="cities">
            <CitiesTab />
          </TabsContent>

          <TabsContent value="finance">
            <FinanceTab />
          </TabsContent>

          <TabsContent value="users">
            <UsersTab />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsTab />
          </TabsContent>
        </Tabs>
      </div>

      <AvitoFooter />
    </div>
  );
};

export default AvitoAdmin;
