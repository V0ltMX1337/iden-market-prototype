import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const TaxiLanding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const screens = [
    {
      title: "Заказ такси",
      description: "Укажите адрес и получите предварительную стоимость",
      image: "https://cdn.poehali.dev/files/2598d871-7f49-4d49-bb61-11d4200a1e3a.png"
    },
    {
      title: "Отслеживание",
      description: "Следите за водителем в режиме реального времени", 
      image: "https://cdn.poehali.dev/files/e33ee0a4-891f-4271-b8d3-cae4799d0347.png"
    },
    {
      title: "В пути",
      description: "Комфортная поездка с контролем маршрута",
      image: "https://cdn.poehali.dev/files/6ea67bb9-fb84-4800-9419-00c1e58cc391.png"
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % screens.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center animate-pulse">
            <Icon name="Car" className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Мигалки</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link to="/migalki/auth">
            <Button variant="outline" className="hidden sm:inline-flex hover:scale-105 transition-transform">
              Войти
            </Button>
          </Link>
          <Link to="/migalki/auth?mode=register">
            <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 hover:scale-105 transition-transform">
              Регистрация
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`space-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-800 leading-tight">
              Быстро и надёжно
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500 animate-gradient">
                по всему городу
              </span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Закажите такси, курьера или грузоперевозки в несколько кликов. 
              Прозрачное ценообразование и быстрая подача автомобиля.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/migalki/order">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                  <Icon name="MapPin" className="mr-2" size={20} />
                  Заказать такси
                </Button>
              </Link>
              <Link to="/migalki/auth?role=driver">
                <Button size="lg" variant="outline" className="w-full sm:w-auto hover:scale-105 transition-all duration-200">
                  <Icon name="UserPlus" className="mr-2" size={20} />
                  Стать водителем
                </Button>
              </Link>
            </div>
          </div>
          
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="w-full h-80 lg:h-96 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-3xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 animate-pulse"></div>
              <Icon name="Car" className="text-yellow-500 z-10 animate-bounce" size={120} />
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-500 rounded-full opacity-20 animate-ping"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-orange-500 rounded-full opacity-30 animate-ping delay-1000"></div>
            <div className="absolute top-1/2 -left-8 w-12 h-12 bg-purple-400 rounded-full opacity-25 animate-pulse delay-500"></div>
          </div>
        </div>
      </section>

      {/* App Preview Section */}
      <section className="container mx-auto px-4 py-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl my-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">Как это работает</h3>
          <p className="text-gray-600 text-lg">Простой процесс заказа в несколько касаний</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Выберите маршрут</h4>
                <p className="text-gray-600">Укажите точки отправления и назначения на карте или введите адреса</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Выберите тариф</h4>
                <p className="text-gray-600">Сравните цены и выберите подходящий тип автомобиля</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Отслеживайте поездку</h4>
                <p className="text-gray-600">Следите за приближением водителя и контролируйте маршрут</p>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="relative w-64 h-[500px] bg-gray-800 rounded-[2rem] p-2 shadow-2xl">
              <div className="w-full h-full bg-white rounded-[1.5rem] overflow-hidden relative">
                {screens.map((screen, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-500 ${
                      currentSlide === index ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}
                  >
                    <img
                      src={screen.image}
                      alt={screen.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <h4 className="text-white font-semibold text-lg">{screen.title}</h4>
                      <p className="text-white/80 text-sm">{screen.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Slide indicators */}
            <div className="absolute -bottom-8 flex space-x-2">
              {screens.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index ? 'bg-purple-600 w-8' : 'bg-gray-300'
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
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
          {[
            {
              icon: "Car",
              title: "Такси",
              description: "Комфортные поездки по городу с фиксированной стоимостью",
              price: "От 200 ₽ базовый тариф",
              gradient: "from-blue-500 to-blue-600",
              delay: "delay-0"
            },
            {
              icon: "Package",
              title: "Курьер еды",
              description: "Быстрая доставка еды и продуктов к вашему порогу",
              price: "20 ₽ за км",
              gradient: "from-green-500 to-green-600",
              delay: "delay-100"
            },
            {
              icon: "Truck",
              title: "Газель",
              description: "Грузоперевозки и переезды с опытными водителями",
              price: "Индивидуальный расчет",
              gradient: "from-purple-500 to-purple-600",
              delay: "delay-200"
            }
          ].map((service, index) => (
            <Card key={index} className={`hover:shadow-2xl transition-all duration-500 border-none bg-white/70 backdrop-blur-sm hover:scale-105 ${service.delay} animate-fadeInUp group`}>
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:animate-bounce`}>
                  <Icon name={service.icon as any} className="text-white" size={32} />
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h4>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="text-sm text-gray-500 font-medium">{service.price}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing Info with Animation */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-2xl hover:shadow-3xl transition-all duration-500">
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-8 animate-fadeInUp">Прозрачное ценообразование</h3>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              {[
                {
                  letter: "А",
                  title: "Базовая ставка",
                  description: "Дзержинск: 200 ₽ • Нижний Новгород: 250 ₽",
                  bg: "bg-yellow-500"
                },
                {
                  letter: "Б", 
                  title: "Расстояние",
                  description: "20 ₽ за каждый километр",
                  bg: "bg-blue-500"
                },
                {
                  letter: "В",
                  title: "Ночная надбавка", 
                  description: "+15% с 23:00 до 06:00",
                  bg: "bg-purple-500"
                },
                {
                  letter: "Г",
                  title: "Праздники",
                  description: "+5% в праздничные дни",
                  bg: "bg-red-500"
                }
              ].map((item, index) => (
                <div key={index} className={`flex items-center space-x-4 animate-slideInLeft delay-${index * 100}`}>
                  <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center flex-shrink-0 hover:animate-pulse cursor-pointer`}>
                    <span className="text-white font-bold text-lg">{item.letter}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{item.title}</h4>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
              <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">Формула расчета</h4>
              <div className="text-center text-3xl font-bold text-gray-800 mb-4 animate-pulse">
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
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl p-8 lg:p-12 text-center text-white shadow-2xl hover:shadow-3xl transition-all duration-500 animate-fadeInUp">
          <h3 className="text-3xl lg:text-4xl font-bold mb-4 animate-bounce">
            Готовы начать?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Присоединяйтесь к тысячам довольных клиентов
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/migalki/order">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto hover:scale-110 transition-transform duration-200 shadow-lg">
                <Icon name="Smartphone" className="mr-2" size={20} />
                Заказать сейчас
              </Button>
            </Link>
            <Link to="/migalki/auth?role=driver">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-yellow-600 hover:scale-110 transition-all duration-200">
                <Icon name="Briefcase" className="mr-2" size={20} />
                Работать с нами
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "10,000+", label: "Довольных клиентов", icon: "Users" },
            { number: "500+", label: "Водителей", icon: "Car" },
            { number: "24/7", label: "Поддержка", icon: "Headphones" },
            { number: "4.9", label: "Средняя оценка", icon: "Star" }
          ].map((stat, index) => (
            <div key={index} className={`text-center animate-fadeInUp delay-${index * 100} hover:scale-105 transition-transform duration-300`}>
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Icon name={stat.icon as any} className="text-white" size={24} />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">{stat.number}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-gray-200 mt-16">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 sm:mb-0">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center animate-pulse">
              <Icon name="Car" className="text-white" size={16} />
            </div>
            <span className="text-gray-600">© 2024 Мигалки. Все права защищены.</span>
          </div>
          <div className="flex space-x-6">
            {["Поддержка", "О нас", "Контакты"].map((link, index) => (
              <a key={index} href="#" className="text-gray-500 hover:text-gray-800 transition-colors hover:scale-105 transform">
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TaxiLanding;