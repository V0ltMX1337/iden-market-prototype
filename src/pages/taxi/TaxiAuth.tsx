import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { useTaxiAuth, type UserRole } from '@/contexts/TaxiAuthContext';

const TaxiAuth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, register, isLoading } = useTaxiAuth();
  
  const initialMode = searchParams.get('mode') === 'register' ? 'register' : 'login';
  const initialRole = (searchParams.get('role') as UserRole) || 'client';
  
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [role, setRole] = useState<UserRole>(initialRole);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    name: '',
    carModel: '',
    carNumber: '',
    carColor: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Валидация
    const newErrors: Record<string, string> = {};
    
    if (!formData.email) newErrors.email = 'Введите email';
    if (!formData.password) newErrors.password = 'Введите пароль';
    
    if (mode === 'register') {
      if (!formData.name) newErrors.name = 'Введите имя';
      if (!formData.phone) newErrors.phone = 'Введите телефон';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Пароли не совпадают';
      }
      if (role === 'driver') {
        if (!formData.carModel) newErrors.carModel = 'Введите модель автомобиля';
        if (!formData.carNumber) newErrors.carNumber = 'Введите номер автомобиля';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      if (mode === 'login') {
        await login(formData.email, formData.password);
      } else {
        await register({
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          name: formData.name,
          role,
          carModel: formData.carModel || undefined,
          carNumber: formData.carNumber || undefined,
          carColor: formData.carColor || undefined
        });
      }
      
      // Перенаправляем в зависимости от роли
      const redirectPath = role === 'client' ? '/migalki/order' : `/migalki/dashboard/${role}`;
      navigate(redirectPath);
    } catch (error) {
      setErrors({ form: error instanceof Error ? error.message : 'Произошла ошибка' });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const getRoleLabel = (roleValue: UserRole) => {
    switch (roleValue) {
      case 'client': return 'Клиент';
      case 'driver': return 'Водитель';
      case 'manager': return 'Менеджер';
      case 'admin': return 'Администратор';
      default: return roleValue;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 flex items-center justify-center p-4">
      {/* Header */}
      <div className="absolute top-6 left-6">
        <Link to="/migalki" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
            <Icon name="Car" className="text-white" size={16} />
          </div>
          <span className="text-lg font-semibold text-gray-800">Мигалки</span>
        </Link>
      </div>

      <Card className="w-full max-w-md border-none shadow-xl bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold text-gray-800">
            {mode === 'login' ? 'Вход в аккаунт' : 'Регистрация'}
          </CardTitle>
          <p className="text-gray-600">
            {mode === 'login' 
              ? 'Войдите для доступа к сервису'
              : `Создайте аккаунт ${getRoleLabel(role).toLowerCase()}`
            }
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Переключатель режима */}
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all ${
                mode === 'login'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Вход
            </button>
            <button
              type="button"
              onClick={() => setMode('register')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all ${
                mode === 'register'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Регистрация
            </button>
          </div>

          {/* Выбор роли для регистрации */}
          {mode === 'register' && (
            <div className="space-y-2">
              <Label>Роль</Label>
              <Select value={role} onValueChange={(value: UserRole) => setRole(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите роль" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="client">👤 Клиент</SelectItem>
                  <SelectItem value="driver">🚗 Водитель</SelectItem>
                  <SelectItem value="manager">👔 Менеджер</SelectItem>
                  <SelectItem value="admin">⚙️ Администратор</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Форма */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Имя (только для регистрации) */}
            {mode === 'register' && (
              <div className="space-y-2">
                <Label htmlFor="name">Полное имя</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Иван Иванов"
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="text-sm text-red-600">{errors.name}</p>
                )}
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="ivan@example.com"
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Телефон (только для регистрации) */}
            {mode === 'register' && (
              <div className="space-y-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+7 (900) 123-45-67"
                  className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && (
                  <p className="text-sm text-red-600">{errors.phone}</p>
                )}
              </div>
            )}

            {/* Пароль */}
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={errors.password ? 'border-red-500' : ''}
              />
              {errors.password && (
                <p className="text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Подтверждение пароля (только для регистрации) */}
            {mode === 'register' && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className={errors.confirmPassword ? 'border-red-500' : ''}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>
            )}

            {/* Данные автомобиля (только для водителей) */}
            {mode === 'register' && role === 'driver' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="carModel">Модель автомобиля</Label>
                  <Input
                    id="carModel"
                    value={formData.carModel}
                    onChange={(e) => handleInputChange('carModel', e.target.value)}
                    placeholder="Toyota Camry"
                    className={errors.carModel ? 'border-red-500' : ''}
                  />
                  {errors.carModel && (
                    <p className="text-sm text-red-600">{errors.carModel}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="carNumber">Номер автомобиля</Label>
                  <Input
                    id="carNumber"
                    value={formData.carNumber}
                    onChange={(e) => handleInputChange('carNumber', e.target.value)}
                    placeholder="А123ВС52"
                    className={errors.carNumber ? 'border-red-500' : ''}
                  />
                  {errors.carNumber && (
                    <p className="text-sm text-red-600">{errors.carNumber}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="carColor">Цвет автомобиля</Label>
                  <Input
                    id="carColor"
                    value={formData.carColor}
                    onChange={(e) => handleInputChange('carColor', e.target.value)}
                    placeholder="Белый"
                  />
                </div>
              </>
            )}

            {/* Общие ошибки */}
            {errors.form && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{errors.form}</p>
              </div>
            )}

            {/* Кнопка отправки */}
            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
            >
              {isLoading ? (
                <Icon name="Loader2" className="animate-spin mr-2" size={20} />
              ) : (
                <Icon name={mode === 'login' ? 'LogIn' : 'UserPlus'} className="mr-2" size={20} />
              )}
              {mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
            </Button>
          </form>

          {/* Ссылки */}
          <div className="text-center space-y-2">
            {mode === 'login' ? (
              <p className="text-sm text-gray-600">
                Нет аккаунта?{' '}
                <button
                  onClick={() => setMode('register')}
                  className="font-medium text-yellow-600 hover:text-yellow-500"
                >
                  Зарегистрируйтесь
                </button>
              </p>
            ) : (
              <p className="text-sm text-gray-600">
                Уже есть аккаунт?{' '}
                <button
                  onClick={() => setMode('login')}
                  className="font-medium text-yellow-600 hover:text-yellow-500"
                >
                  Войти
                </button>
              </p>
            )}
            
            <p className="text-xs text-gray-500">
              Продолжая, вы соглашаетесь с{' '}
              <a href="#" className="underline hover:text-gray-700">
                условиями использования
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxiAuth;