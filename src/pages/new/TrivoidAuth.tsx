import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { TrivoidAuthData } from './types';

interface TrivoidAuthProps {
  onSuccess: (user: any) => void;
}

const TrivoidAuth = ({ onSuccess }: TrivoidAuthProps) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [step, setStep] = useState<'credentials' | '2fa'>('credentials');
  const [formData, setFormData] = useState<TrivoidAuthData>({
    email: '',
    password: '',
    name: '',
    phone: '',
    code: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'login' && step === 'credentials') {
      setStep('2fa');
    } else if (step === '2fa') {
      onSuccess({
        id: 1,
        email: formData.email,
        name: formData.name || 'Иван Иванов',
        avatar: '👤',
        friendsCount: 142,
        followersCount: 589,
        isOnline: true,
        twoFactorEnabled: true,
      });
    } else {
      onSuccess({
        id: 1,
        email: formData.email,
        name: formData.name || 'Иван Иванов',
        avatar: '👤',
        friendsCount: 0,
        followersCount: 0,
        isOnline: true,
        twoFactorEnabled: false,
      });
    }
  };

  const resendCode = () => {
    alert('Код отправлен повторно!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-block bg-white/10 backdrop-blur-lg rounded-3xl p-6 mb-6">
            <Icon name="Shield" size={60} className="text-white mx-auto" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Trivoid Auth</h1>
          <p className="text-blue-100">Безопасная авторизация с двухфакторной защитой</p>
        </div>

        <Card>
          <CardContent className="p-8">
            {step === 'credentials' ? (
              <>
                <div className="flex gap-2 mb-6">
                  <Button
                    variant={mode === 'login' ? 'default' : 'outline'}
                    className="flex-1"
                    onClick={() => setMode('login')}
                  >
                    Вход
                  </Button>
                  <Button
                    variant={mode === 'register' ? 'default' : 'outline'}
                    className="flex-1"
                    onClick={() => setMode('register')}
                  >
                    Регистрация
                  </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {mode === 'register' && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Имя</label>
                      <Input
                        type="text"
                        placeholder="Иван Иванов"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input
                      type="email"
                      placeholder="example@mail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  {mode === 'register' && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Телефон</label>
                      <Input
                        type="tel"
                        placeholder="+7 (999) 123-45-67"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium mb-2">Пароль</label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                  </div>

                  {mode === 'login' && (
                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span>Запомнить меня</span>
                      </label>
                      <a href="#" className="text-blue-600 hover:underline">
                        Забыли пароль?
                      </a>
                    </div>
                  )}

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-3">
                    {mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
                  </Button>
                </form>

                {mode === 'register' && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg text-sm">
                    <div className="flex items-start gap-2">
                      <Icon name="Shield" size={16} className="text-blue-600 mt-0.5" />
                      <p className="text-gray-700">
                        После регистрации будет включена двухфакторная аутентификация для защиты вашего аккаунта
                      </p>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Smartphone" size={32} className="text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold mb-2">Двухфакторная аутентификация</h2>
                  <p className="text-gray-600 text-sm">
                    Введите 6-значный код из SMS, отправленный на номер {formData.phone || '+7 *** *** **67'}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input
                      type="text"
                      placeholder="000000"
                      maxLength={6}
                      className="text-center text-2xl tracking-widest font-mono"
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value.replace(/\D/g, '') })}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-3">
                    Подтвердить
                  </Button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={resendCode}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Отправить код повторно
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep('credentials')}
                    className="w-full text-sm text-gray-600 hover:text-gray-900"
                  >
                    ← Назад к входу
                  </button>
                </form>
              </>
            )}
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-white/80 text-sm">
          <p>Защищено шифрованием AES-256</p>
          <p className="mt-2">© 2024 Trivoid Auth. Все права защищены.</p>
        </div>
      </div>
    </div>
  );
};

export default TrivoidAuth;
