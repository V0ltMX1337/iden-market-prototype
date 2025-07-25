import { useEffect, useState } from "react";
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
import { useNavigate, Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { storeApi } from "@/lib/store";
import { City, UserRole, UserStatus } from "@/lib/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Helmet } from "react-helmet-async";
import { usePageTitle } from "@/hooks/usePageTitle";

const AvitoRegister = () => {
  const navigate = useNavigate();
  const { getPageTitle, settings: systemSettings } = usePageTitle();

  const [cities, setCities] = useState<City[]>([]);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [formData, setFormData] = useState({
    login: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    city: null as City | null,
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      const res = await storeApi.getCities(); 
      setCities(res);
    };
    fetchCities();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.login) {
      setError("Введите логин");
      return;
    }

    if (!formData.firstName) {
      setError("Введите Имя");
      return;
    }

    if (!formData.lastName) {
      setError("Введите Фамилию");
      return;
    }

    if (!formData.email) {
      setError("Введите email");
      return;
    }

     if (!formData.phone) {
      setError("Введите номер телефона");
      return;
    }

    if (!formData.city) {
      setError("Выберите город");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Пароли не совпадают!");
      return;
    }

    if (!agreeToTerms) {
      setError("Вы должны согласиться с условиями использования.");
      return;
    }

    setIsLoading(true);
    try {
      const userData = {
        login: formData.login,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        city: formData.city,
        role: UserRole.USER,
        status: UserStatus.ACTIVE,
        registrationDate: new Date().toISOString(),
      };

      await storeApi.addUser(userData);
      navigate("/login");
    } catch (error: any) {
      if (error.response?.status === 409) {
        setError("Пользователь с таким email или логином уже зарегистрирован.");
      } else {
        setError("Ошибка при регистрации. Попробуйте еще раз.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Формируем заголовок
  const pageTitle =
   systemSettings
      ? getPageTitle("registerTitle", {})
      : "Страница регистрации";


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content={`Авторизация TrivoID. Подробнее на Trivo.`}
        />
      </Helmet>
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            <Icon name="ArrowLeft" size={24} className="mr-3 text-blue-600" />
            TRIVO ID
          </Link>
          <h2 className="mt-8 text-3xl font-extrabold text-gray-900">
            Создание TRIVO ID
          </h2>
          <p className="mt-3 text-sm text-gray-600">
            Один аккаунт для всех сервисов экосистемы
          </p>
        </div>

        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="UserPlus" size={32} className="text-white" />
            </div>
            <CardTitle className="text-xl">Регистрация</CardTitle>
            <CardDescription>
              Создайте аккаунт для покупок и продаж
            </CardDescription>
          </CardHeader>

          <CardContent>
            {error && (
              <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="login" className="text-sm font-medium">
                  Логин
                </Label>
                <Input
                  id="login"
                  value={formData.login}
                  onChange={(e) => handleChange("login", e.target.value)}
                  required
                  className="h-11 mt-1"
                  placeholder="your_username"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Имя</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    required
                    className="h-11 mt-1"
                    placeholder="Иван"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Фамилия</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    required
                    className="h-11 mt-1"
                    placeholder="Петров"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Телефон</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  required
                  className="h-11 mt-1"
                  placeholder="+7 (900) 123-45-67"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                  className="h-11 mt-1"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <Label htmlFor="city">Город</Label>
                <Select
                  value={formData.city?.id ?? ""}
                  onValueChange={(cityId) => {
                    const selectedCity = cities.find((c) => c.id === cityId);
                    setFormData((prev) => ({ ...prev, city: selectedCity ?? null }));
                  }}
                >
                  <SelectTrigger className="h-11 mt-1">
                    <SelectValue placeholder="Выберите город" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city.id} value={city.id}>
                        {city.name}, {city.region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  required
                  className="h-11 mt-1"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword">Повторите пароль</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  required
                  className="h-11 mt-1"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-start space-x-2">
                <input
                  id="agree-terms"
                  name="agree-terms"
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                />
                <label htmlFor="agree-terms" className="text-sm text-gray-700">
                  Согласен с{" "}
                  <Link to="#" className="text-blue-600 hover:text-blue-500">условиями</Link> и{" "}
                  <Link to="#" className="text-blue-600 hover:text-blue-500">политикой</Link>
                </label>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 h-12"
              >
                {isLoading ? "Создание аккаунта..." : "Создать TRIVO ID"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Уже есть аккаунт?{" "}
                <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                  Войти в TRIVO ID
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AvitoRegister;
