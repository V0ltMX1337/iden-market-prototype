import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/hooks/useAuth";

const TrivoMessengerLanding = () => {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const features = [
    {
      icon: "MessageCircle",
      title: "Быстрые сообщения",
      description: "Мгновенная доставка сообщений с поддержкой медиафайлов"
    },
    {
      icon: "Users",
      title: "Каналы и группы",
      description: "Создавайте каналы для бизнеса и группы для общения"
    },
    {
      icon: "Shield",
      title: "Безопасность",
      description: "Сквозное шифрование и защита личных данных"
    },
    {
      icon: "Music",
      title: "Музыка и видео",
      description: "Делитесь музыкой и видео прямо в чате"
    },
    {
      icon: "Smartphone",
      title: "Мультиплатформа",
      description: "Работает на всех устройствах синхронно"
    },
    {
      icon: "Zap",
      title: "Молниеносно",
      description: "Оптимизированная архитектура для максимальной скорости"
    }
  ];

  const handleGetStarted = () => {
    if (user) {
      navigate("/messenger/main");
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      navigate("/messenger/main");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="w-full bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Icon name="MessageCircle" className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TrivoMessenger
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">Привет, {user.firstName || user.email}!</span>
                <Button onClick={() => navigate("/messenger/main")} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Открыть мессенджер
                </Button>
              </div>
            ) : (
              <Button onClick={handleGetStarted} variant="outline">
                Войти
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-gray-200 text-sm text-gray-600 mb-6">
              <Icon name="Sparkles" className="w-4 h-4 mr-2 text-yellow-500" />
              Новое поколение мессенджеров
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              TrivoMessenger
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Современный мессенджер для работы и личного общения. 
              Быстро, безопасно, удобно.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6"
              >
                <Icon name="MessageCircle" className="w-5 h-5 mr-2" />
                Начать общение
              </Button>
              
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                <Icon name="Download" className="w-5 h-5 mr-2" />
                Скачать приложение
              </Button>
            </div>
          </div>
          
          {/* Preview Image */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 flex items-center space-x-3">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <span className="text-white font-medium">TrivoMessenger</span>
              </div>
              <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <Icon name="MessageCircle" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Интерфейс мессенджера</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Почему TrivoMessenger?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Мы собрали лучшие функции современных мессенджеров в одном приложении
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/60 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Icon name={feature.icon} className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 border border-gray-200">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Готовы начать общение?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Присоединяйтесь к тысячам пользователей, которые уже используют TrivoMessenger
            </p>
            <Button 
              size="lg" 
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-12 py-6"
            >
              <Icon name="ArrowRight" className="w-5 h-5 mr-2" />
              Присоединиться сейчас
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Icon name="MessageCircle" className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TrivoMessenger
            </span>
          </div>
          <p className="text-gray-600 text-sm">
            © 2024 TrivoMessenger. Часть экосистемы Trivo.
          </p>
        </div>
      </footer>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Вход в TrivoMessenger</h3>
              <p className="text-gray-600">Используйте свой аккаунт Trivo</p>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              handleLogin(
                formData.get('email') as string,
                formData.get('password') as string
              );
            }}>
              <div className="space-y-4">
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setIsLoginModalOpen(false)}
                >
                  Отмена
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  Войти
                </Button>
              </div>
            </form>
            
            <div className="text-center mt-6">
              <Link to="/auth/register" className="text-blue-600 hover:underline text-sm">
                Нет аккаунта? Зарегистрироваться
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrivoMessengerLanding;