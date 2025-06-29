import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { storeApi } from "@/lib/store";

const StatsTab = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalCategories: 0,
    totalCities: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
    totalAds: 0,
    activeAds: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const users = await storeApi.getAllUsers();
        const categories = await storeApi.getCategories();
        const cities = await storeApi.getCities();
        const ads = await storeApi.getAllAds();

        setStats({
          totalUsers: users.length,
          activeUsers: users.filter((u) => u.status === "active").length,
          totalCategories: categories.length,
          totalCities: cities.length,
          totalRevenue: 125000,
          monthlyRevenue: 15000,
          totalAds: ads.length,
          activeAds: ads.filter((ad) => ad.status === "active").length,
        });
      } catch (error) {
        console.error("Ошибка загрузки статистики:", error);
      }
    };

    loadStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Всего пользователей
          </CardTitle>
          <Icon name="Users" className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalUsers}</div>
          <p className="text-xs text-muted-foreground">
            Активных: {stats.activeUsers}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Категории</CardTitle>
          <Icon name="Grid3X3" className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalCategories}</div>
          <p className="text-xs text-muted-foreground">Активные категории</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Города</CardTitle>
          <Icon name="MapPin" className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalCities}</div>
          <p className="text-xs text-muted-foreground">Поддерживаемые города</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Объявления</CardTitle>
          <Icon name="FileText" className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalAds}</div>
          <p className="text-xs text-muted-foreground">
            Активных: {stats.activeAds}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Общий доход</CardTitle>
          <Icon name="DollarSign" className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.totalRevenue.toLocaleString()} ₽
          </div>
          <p className="text-xs text-muted-foreground">За все время</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Доход за месяц</CardTitle>
          <Icon name="TrendingUp" className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.monthlyRevenue.toLocaleString()} ₽
          </div>
          <p className="text-xs text-muted-foreground">Текущий месяц</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsTab;
