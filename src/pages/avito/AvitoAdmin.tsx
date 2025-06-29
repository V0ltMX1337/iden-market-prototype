import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Icon from "@/components/ui/icon";
import AvitoHeader from "@/components/avitomarket/AvitoHeader";
import AvitoFooter from "@/components/avitomarket/AvitoFooter";
import { storeApi } from "@/lib/store";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { City, User, Category } from "@/lib/types";

const AvitoAdmin = () => {
  const store = storeApi;
  const { isAdmin } = useAuth();

  // Проверяем права доступа
  if (!isAdmin()) {
    return <Navigate to="/avito" replace />;
  }

  // Состояния для данных из store
  const [users, setUsers] = useState(store.getUsers());
  const [categories, setCategories] = useState(store.getCategories());
  const [cities, setCities] = useState(store.getCities());
  const [systemSettings, setSystemSettings] = useState(
    store.getSystemSettings(),
  );

  // Форма состояния
  const [newCategory, setNewCategory] = useState({ name: "", subcategory: "" });
  const [newCity, setNewCity] = useState({ name: "", region: "" });
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [newUserRole, setNewUserRole] = useState<
    "Пользователь" | "Модератор" | "Администратор"
  >("Пользователь");

  // Функции управления категориями
  const addCategory = () => {
    if (newCategory.name.trim()) {
      const newCat = store.addCategory({
        name: newCategory.name,
        icon: "Package",
        subcategories: [],
      });
      setCategories(store.getCategories());
      setNewCategory({ name: "", subcategory: "" });
    }
  };

  const addSubcategory = (categoryId: string) => {
    if (newCategory.subcategory.trim()) {
      store.addSubcategory(categoryId, {
        name: newCategory.subcategory,
        items: [],
      });
      setCategories(store.getCategories());
      setNewCategory({ ...newCategory, subcategory: "" });
    }
  };

  const deleteCategory = (categoryId: string) => {
    store.deleteCategory(categoryId);
    setCategories(store.getCategories());
  };

  // Функции управления городами
  const addCity = () => {
    if (newCity.name.trim() && newCity.region.trim()) {
      const city: City = {
        id: Date.now().toString(),
        name: newCity.name,
        region: newCity.region,
      };
      setCities([...cities, city]);
      setNewCity({ name: "", region: "" });
    }
  };

  const deleteCity = (cityId: string) => {
    setCities(cities.filter((city) => city.id !== cityId));
  };

  // Функции управления пользователями
  const updateUserRole = () => {
    if (selectedUserId) {
      setUsers(
        users.map((user) =>
          user.id === selectedUserId ? { ...user, role: newUserRole } : user,
        ),
      );
      setSelectedUserId("");
    }
  };

  const toggleUserStatus = (userId: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? { ...user, status: user.status === "active" ? "blocked" : "active" }
          : user,
      ),
    );
  };

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

          {/* Категории */}
          <TabsContent value="categories">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Добавить категорию</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4">
                    <Input
                      placeholder="Название категории"
                      value={newCategory.name}
                      onChange={(e) =>
                        setNewCategory({ ...newCategory, name: e.target.value })
                      }
                    />
                    <Button onClick={addCategory}>
                      <Icon name="Plus" className="h-4 w-4 mr-2" />
                      Добавить
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-4">
                {categories.map((category) => (
                  <Card key={category.id}>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteCategory(category.id)}
                      >
                        <Icon name="Trash2" className="h-4 w-4" />
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {category.subcategories.map((sub, index) => (
                            <Badge key={index} variant="secondary">
                              {sub.name}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Добавить подкатегорию"
                            value={newCategory.subcategory}
                            onChange={(e) =>
                              setNewCategory({
                                ...newCategory,
                                subcategory: e.target.value,
                              })
                            }
                          />
                          <Button
                            size="sm"
                            onClick={() => addSubcategory(category.id)}
                          >
                            Добавить
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Города */}
          <TabsContent value="cities">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Добавить город</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="Название города"
                      value={newCity.name}
                      onChange={(e) =>
                        setNewCity({ ...newCity, name: e.target.value })
                      }
                    />
                    <Input
                      placeholder="Область/регион"
                      value={newCity.region}
                      onChange={(e) =>
                        setNewCity({ ...newCity, region: e.target.value })
                      }
                    />
                  </div>
                  <Button onClick={addCity}>
                    <Icon name="Plus" className="h-4 w-4 mr-2" />
                    Добавить город
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Список городов</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Город</TableHead>
                        <TableHead>Регион</TableHead>
                        <TableHead>Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cities.map((city) => (
                        <TableRow key={city.id}>
                          <TableCell className="font-medium">
                            {city.name}
                          </TableCell>
                          <TableCell>{city.region}</TableCell>
                          <TableCell>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => deleteCity(city.id)}
                            >
                              <Icon name="Trash2" className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Финансы */}
          <TabsContent value="finance">
            <div className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Финансовая статистика</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Общий доход:</span>
                      <span className="font-bold">
                        1 ₽
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Доход за месяц:</span>
                      <span className="font-bold">
                        1 ₽
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Средний чек:</span>
                      <span className="font-bold">2,450 ₽</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Комиссия системы:</span>
                      <span className="font-bold">
                        {systemSettings.commission}%
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Последние транзакции</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm">
                          Комиссия с продажи #1234
                        </span>
                        <span className="font-bold text-green-600">+245 ₽</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm">
                          Комиссия с продажи #1233
                        </span>
                        <span className="font-bold text-green-600">+180 ₽</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm">
                          Комиссия с продажи #1232
                        </span>
                        <span className="font-bold text-green-600">+320 ₽</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Пользователи */}
          <TabsContent value="users">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Управление ролями</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4">
                    <Select
                      value={selectedUserId}
                      onValueChange={setSelectedUserId}
                    >
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Выберите пользователя" />
                      </SelectTrigger>
                      <SelectContent>
                        {users.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.name} ({user.email})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={newUserRole}
                      onValueChange={(value) => setNewUserRole(value as any)}
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Пользователь">
                          Пользователь
                        </SelectItem>
                        <SelectItem value="Модератор">Модератор</SelectItem>
                        <SelectItem value="Администратор">Админ</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button onClick={updateUserRole}>Обновить роль</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Список пользователей</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Имя</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Роль</TableHead>
                        <TableHead>Дата регистрации</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead>Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">
                            {user.name}
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                user.role === "Администратор"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.registrationDate}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                user.status === "active"
                                  ? "default"
                                  : "destructive"
                              }
                            >
                              {user.status === "active"
                                ? "Активен"
                                : "Заблокирован"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleUserStatus(user.id)}
                            >
                              {user.status === "active"
                                ? "Заблокировать"
                                : "Разблокировать"}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Настройки */}
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
                        value={systemSettings.siteName}
                        onChange={(e) =>
                          setSystemSettings({
                            ...systemSettings,
                            siteName: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor="siteDescription">Описание сайта</Label>
                      <Textarea
                        id="siteDescription"
                        value={systemSettings.siteDescription}
                        onChange={(e) =>
                          setSystemSettings({
                            ...systemSettings,
                            siteDescription: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor="commission">Комиссия (%)</Label>
                      <Input
                        id="commission"
                        type="number"
                        value={systemSettings.commission}
                        onChange={(e) =>
                          setSystemSettings({
                            ...systemSettings,
                            commission: Number(e.target.value),
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="seoTitle">SEO заголовок</Label>
                      <Input
                        id="seoTitle"
                        value={systemSettings.seoTitle}
                        onChange={(e) =>
                          setSystemSettings({
                            ...systemSettings,
                            seoTitle: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor="seoDescription">SEO описание</Label>
                      <Textarea
                        id="seoDescription"
                        value={systemSettings.seoDescription}
                        onChange={(e) =>
                          setSystemSettings({
                            ...systemSettings,
                            seoDescription: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                <Button className="w-full">
                  <Icon name="Save" className="h-4 w-4 mr-2" />
                  Сохранить настройки
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <AvitoFooter />
    </div>
  );
};

export default AvitoAdmin;
