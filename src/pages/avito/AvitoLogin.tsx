import { useState, useEffect, useRef } from "react";
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
import { usePageTitle } from "@/hooks/usePageTitle";
import { useAlertContext } from "@/contexts/AlertContext";
import { Helmet } from "react-helmet-async";

const AvitoLogin = () => {
  const navigate = useNavigate();
  const { user, login, logout, checkPendingLoginStatus } = useAuth();
  const { showError, showSuccess, showInfo } = useAlertContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [waitingTelegram, setWaitingTelegram] = useState(false);

  const { getPageTitle, settings: systemSettings } = usePageTitle();

  const pollInterval = useRef<NodeJS.Timeout | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setWaitingTelegram(false);

    try {
      const result = await login(email, password);
      if (result === "success") {
        showSuccess("Добро пожаловать!", "Успешный вход");
        navigate("/");
      } else if (result === "waiting") {
        setWaitingTelegram(true);
        showInfo("Подтвердите вход через Telegram", "Ожидание подтверждения", {
          duration: 0 // Не исчезает автоматически
        });
      } else {
        showError("Неверный email или пароль", "Ошибка входа");
      }
    } catch {
      showError("Произошла ошибка при входе в систему", "Системная ошибка");
    }
  };

  const handleLoginAsUser = () => {
    navigate("/");
  };

  const handleLogout = async () => {
    await logout();
    setWaitingTelegram(false);
    showInfo("Вы можете войти как другой пользователь", "Выход выполнен");
  };

  useEffect(() => {
    let isMounted = true;
    let pollTimeout: NodeJS.Timeout | null = null;

    const poll = async () => {
      if (!isMounted || document.hidden) return;

      const userId = localStorage.getItem("loginUserId");
      if (!userId) return;

      const confirmed = await checkPendingLoginStatus(userId);

      if (confirmed) {
        setWaitingTelegram(false);
        showSuccess("Вход подтвержден через Telegram!", "Добро пожаловать");
        navigate("/");
      } else if (isMounted && !document.hidden) {
        pollTimeout = setTimeout(poll, 1000); // Запускаем следующий опрос через 1 секунду
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Приложение ушло в фон - останавливаем поллинг
        if (pollTimeout) {
          clearTimeout(pollTimeout);
          pollTimeout = null;
        }
      } else if (waitingTelegram && isMounted) {
        // Приложение вернулось в фокус - возобновляем поллинг
        poll();
      }
    };

    const handleFocus = () => {
      if (waitingTelegram && isMounted) {
        poll();
      }
    };

    if (waitingTelegram) {
      poll();
      document.addEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('focus', handleFocus);
    }

    return () => {
      isMounted = false;
      if (pollTimeout) {
        clearTimeout(pollTimeout);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [waitingTelegram, checkPendingLoginStatus, navigate]);

  const pageTitle =
    systemSettings ? getPageTitle("authTitle", {}) : "Страница авторизации";

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
          <Link
            to="/"
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
              <Button variant="outline" onClick={handleLogout} className="w-full">
                Войти как другой пользователь
              </Button>
            </CardContent>
          </Card>
        ) : waitingTelegram ? (
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur text-center p-8">
            <Icon
              name="Send"
              size={48}
              className="mx-auto mb-4 text-blue-600 animate-pulse"
            />
            <h3 className="text-xl font-semibold mb-2">
              Подтвердите вход через Telegram
            </h3>
            <p className="text-gray-700 mb-4">
              Для продолжения входа подтвердите запрос в вашем Telegram-боте @TrivoAdsBot
            </p>
            <Button variant="outline" onClick={handleLogout} className="w-full">
              Войти как другой пользователь
            </Button>
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
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="text"
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



                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="remember"
                      className="mr-2"
                      disabled
                    />
                    Запомнить меня
                  </label>
                  <Link
                    to="/reset-password"
                    className="text-sm font-semibold text-blue-600 hover:text-blue-800"
                  >
                    Забыли пароль?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-12"
                >
                  Войти
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AvitoLogin;