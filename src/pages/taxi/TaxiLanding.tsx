import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const TaxiLanding = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
            <Icon name="Car" className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Мигалки</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link to="/migalki/auth">
            <Button variant="outline" className="hidden sm:inline-flex">
              Войти
            </Button>
          </Link>
          <Link to="/migalki/auth?mode=register">
            <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
              Регистрация
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-800 leading-tight">
              Быстро и надёжно
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">
                по всему городу
              </span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Закажите такси, курьера или грузоперевозки в несколько кликов. 
              Прозрачное ценообразование и быстрая подача автомобиля.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/migalki/order">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                  <Icon name="MapPin" className="mr-2" size={20} />
                  Заказать такси
                </Button>
              </Link>
              <Link to="/migalki/auth?role=driver">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  <Icon name="UserPlus" className="mr-2" size={20} />
                  Стать водителем
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="w-full h-80 lg:h-96 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-3xl flex items-center justify-center">
              <Icon name="Car" className="text-yellow-500" size={120} />
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-500 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-orange-500 rounded-full opacity-30 animate-pulse delay-1000"></div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">Наши услуги</h3>
          <p className="text-gray-600 text-lg">Выберите подходящий вариант для ваших задач</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-all duration-300 border-none bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icon name="Car" className="text-white" size={32} />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Такси</h4>
              <p className="text-gray-600 mb-4">
                Комфортные поездки по городу с фиксированной стоимостью
              </p>
              <div className="text-sm text-gray-500">
                От 200 ₽ базовый тариф
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-none bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icon name="Package" className="text-white" size={32} />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Курьер еды</h4>
              <p className="text-gray-600 mb-4">
                Быстрая доставка еды и продуктов к вашему порогу
              </p>
              <div className="text-sm text-gray-500">
                20 ₽ за км
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-none bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icon name="Truck" className="text-white" size={32} />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Газель</h4>
              <p className="text-gray-600 mb-4">
                Грузоперевозки и переезды с опытными водителями
              </p>
              <div className="text-sm text-gray-500">
                Индивидуальный расчет
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing Info */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 lg:p-12">
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-8">Прозрачное ценообразование</h3>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">А</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Базовая ставка</h4>
                  <p className="text-gray-600">Дзержинск: 200 ₽ • Нижний Новгород: 250 ₽</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">Б</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Расстояние</h4>
                  <p className="text-gray-600">20 ₽ за каждый километр</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">В</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Ночная надбавка</h4>
                  <p className="text-gray-600">+15% с 23:00 до 06:00</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">Г</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Праздники</h4>
                  <p className="text-gray-600">+5% в праздничные дни</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-2xl p-6">
              <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">Формула расчета</h4>
              <div className="text-center text-3xl font-bold text-gray-800 mb-4">
                А + Б + В + Г
              </div>
              <div className="text-center text-gray-600">
                Итоговая стоимость рассчитывается автоматически при оформлении заказа
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl p-8 lg:p-12 text-center text-white">
          <h3 className="text-3xl lg:text-4xl font-bold mb-4">
            Готовы начать?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Присоединяйтесь к тысячам довольных клиентов
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/migalki/order">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                <Icon name="Smartphone" className="mr-2" size={20} />
                Заказать сейчас
              </Button>
            </Link>
            <Link to="/migalki/auth?role=driver">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-yellow-600">
                <Icon name="Briefcase" className="mr-2" size={20} />
                Работать с нами
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-gray-200 mt-16">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 sm:mb-0">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
              <Icon name="Car" className="text-white" size={16} />
            </div>
            <span className="text-gray-600">© 2024 Мигалки. Все права защищены.</span>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-gray-800 transition-colors">
              Поддержка
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-800 transition-colors">
              О нас
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-800 transition-colors">
              Контакты
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TaxiLanding;