import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            О нас
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Мы создаем удобную платформу для продажи и покупки товаров между частными лицами
          </p>
        </div>

        {/* Main Content */}
        <div className="grid gap-8 md:gap-12">
          {/* Mission */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-3 text-2xl">
                <Icon name="Target" className="w-7 h-7 text-blue-600" />
                <span>Наша миссия</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed text-lg">
                Мы делаем процесс покупки и продажи товаров максимально простым, безопасным и удобным. 
                Наша цель — создать доверительную среду, где каждый пользователь может легко найти то, 
                что ему нужно, или продать ненужные вещи.
              </p>
            </CardContent>
          </Card>

          {/* Values */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-3">
                  <Icon name="Shield" className="w-6 h-6 text-green-600" />
                  <span>Безопасность</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Мы обеспечиваем безопасность сделок с помощью проверенных методов оплаты 
                  и системы рейтингов пользователей.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-3">
                  <Icon name="Users" className="w-6 h-6 text-purple-600" />
                  <span>Сообщество</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Мы строим дружелюбное сообщество, где каждый участник важен и может 
                  рассчитывать на поддержку.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-3">
                  <Icon name="Zap" className="w-6 h-6 text-yellow-600" />
                  <span>Простота</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Интуитивно понятный интерфейс позволяет размещать объявления и искать 
                  товары за считанные минуты.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-3">
                  <Icon name="Heart" className="w-6 h-6 text-red-600" />
                  <span>Забота</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Мы заботимся о каждом пользователе и постоянно работаем над улучшением 
                  качества сервиса.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Statistics */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
            <CardHeader className="pb-6">
              <CardTitle className="text-center text-2xl">
                Мы в цифрах
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">100K+</div>
                  <div className="text-gray-600">Пользователей</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">500K+</div>
                  <div className="text-gray-600">Объявлений</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">1M+</div>
                  <div className="text-gray-600">Сделок</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">50+</div>
                  <div className="text-gray-600">Городов</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center space-x-3 text-2xl">
                <Icon name="Users" className="w-7 h-7 text-blue-600" />
                <span>Наша команда</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                Мы — команда энтузиастов, которые верят в силу технологий для улучшения жизни людей. 
                Каждый день мы работаем над тем, чтобы сделать наш сервис еще лучше.
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="p-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon name="Code" className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold mb-1">Разработка</h4>
                  <p className="text-sm text-gray-600">Создаем надежные решения</p>
                </div>
                <div className="p-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon name="Headphones" className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold mb-1">Поддержка</h4>
                  <p className="text-sm text-gray-600">Помогаем пользователям 24/7</p>
                </div>
                <div className="p-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon name="Lightbulb" className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="font-semibold mb-1">Инновации</h4>
                  <p className="text-sm text-gray-600">Внедряем новые идеи</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Готовы начать?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Присоединяйтесь к нашему сообществу и откройте для себя мир удобных покупок и продаж
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/register')}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Icon name="UserPlus" className="w-5 h-5 mr-2" />
                Зарегистрироваться
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/catalog')}
                size="lg"
              >
                <Icon name="Search" className="w-5 h-5 mr-2" />
                Посмотреть объявления
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;