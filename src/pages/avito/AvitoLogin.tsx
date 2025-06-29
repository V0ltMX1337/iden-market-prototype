import { useState } from "react";
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
import { useAuth } from "@/hooks/useAuth";

const AvitoLogin = () => {
  const navigate = useNavigate();
  const { user, login, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const success = await login(email, password);
      if (success) {
        navigate("/avito");
      } else {
        setError("Неверный email или пароль");
      }
    } catch (error) {
      setError("Ошибка при входе в систему");
    }
  };

  const handleLoginAsUser = () => {
    navigate("/avito");
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link
            to="/avito"
            className="inline-flex items-center text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            <Icon name="ArrowLeft" size={24} className="mr-3 text-blue-600" />
            TRIVO ID
          </Link>
          <h2 className="mt-8 text-3xl font-extrabold text-gray-900">
            Единая система авторизации
          </h2>
          <p className="mt-3 text-sm text-gray-600">
            Войдите один раз и пользуйтесь всеми сервисами
          </p>
        </div>

        {user ? (
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardHeader className="text-center pb-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="User" size={32} className="text-white" />
              </div>
              <CardTitle className="text-xl">Добро пожаловать!</CardTitle>
              <CardDescription className="text-base">
                Вы уже авторизованы как {user.firstName} {user.lastName}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={handleLoginAsUser}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-12"
              >
                Войти как {user.firstName} {user.lastName}
              </Button>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="w-full"
              >
                Войти как другой пользователь
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Shield" size={32} className="text-white" />
              </div>
              <CardTitle className="text-xl">Вход в TRIVO ID</CardTitle>
              <CardDescription>
                Введите данные для входа в единую систему
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email или телефон
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11"
                    placeholder="your@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Пароль
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-11"
                    placeholder="••••••••"
                  />
                </div>

                {error && (
                  <div className="text-red-600 text-sm text-center">
                    {error}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Запомнить меня
                    </span>
                  </label>
                  <Link
                    to="#"
                    className="text-sm text-blue-600 hover:text-blue-500"
                  >
                    Забыли пароль?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-12"
                >
                  Войти в TRIVO ID
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Нет аккаунта?{" "}
                  <Link
                    to="/avito/register"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Создать TRIVO ID
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AvitoLogin;
