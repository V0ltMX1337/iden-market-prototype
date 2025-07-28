import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

const HowToBuyPage = () => {
  const navigate = useNavigate();

  const steps = [
    {
      number: 1,
      title: "Найдите товар",
      description: "Используйте поиск или просматривайте категории",
      icon: "Search",
      color: "blue",
      details: [
        "Введите название товара в поисковую строку",
        "Используйте фильтры по цене, местоположению и состоянию",
        "Просматривайте объявления в интересующих категориях",
        "Сохраняйте понравившиеся товары в избранное"
      ]
    },
    {
      number: 2,
      title: "Изучите объявление",
      description: "Внимательно прочитайте описание и посмотрите фото",
      icon: "Eye",
      color: "green",
      details: [
        "Ознакомьтесь с подробным описанием товара",
        "Просмотрите все фотографии",
        "Проверьте состояние и характеристики",
        "Обратите внимание на местоположение продавца"
      ]
    },
    {
      number: 3,
      title: "Свяжитесь с продавцом",
      description: "Задайте вопросы и договоритесь о встрече",
      icon: "MessageCircle",
      color: "purple",
      details: [
        "Нажмите кнопку 'Написать продавцу'",
        "Задайте все интересующие вопросы",
        "Уточните актуальность объявления",
        "Договоритесь о времени и месте встречи"
      ]
    },
    {
      number: 4,
      title: "Встретьтесь безопасно",
      description: "Выберите общественное место для встречи",
      icon: "MapPin",
      color: "orange",
      details: [
        "Встречайтесь в людных общественных местах",
        "Приходите не один, если это возможно",
        "Проверьте товар при встрече",
        "Не передавайте деньги до осмотра товара"
      ]
    },
    {
      number: 5,
      title: "Проверьте товар",
      description: "Убедитесь, что товар соответствует описанию",
      icon: "CheckCircle",
      color: "green",
      details: [
        "Внимательно осмотрите товар на предмет дефектов",
        "Проверьте работоспособность (для техники)",
        "Сверьте с описанием в объявлении",
        "При необходимости попросите документы"
      ]
    },
    {
      number: 6,
      title: "Совершите покупку",
      description: "Оплатите товар и получите чек",
      icon: "CreditCard",
      color: "blue",
      details: [
        "Договоритесь о способе оплаты",
        "Передайте деньги только после проверки товара",
        "Получите чек или расписку при необходимости",
        "Оставьте отзыв о сделке"
      ]
    }
  ];

  const safetyTips = [
    {
      icon: "Shield",
      title: "Проверяйте продавца",
      description: "Изучите рейтинг и отзывы других покупателей"
    },
    {
      icon: "Clock",
      title: "Не торопитесь",
      description: "Тщательно изучите товар перед покупкой"
    },
    {
      icon: "Users",
      title: "Встречайтесь с другом",
      description: "По возможности приходите на встречу не один"
    },
    {
      icon: "Phone",
      title: "Оставайтесь на связи",
      description: "Сообщите близким о месте и времени встречи"
    },
    {
      icon: "AlertTriangle",
      title: "Доверяйте интуиции",
      description: "Если что-то кажется подозрительным, лучше отказаться"
    },
    {
      icon: "CreditCard",
      title: "Безопасные платежи",
      description: "Используйте наличные или безопасные способы оплаты"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: "bg-blue-50 border-blue-200 text-blue-600",
      green: "bg-green-50 border-green-200 text-green-600",
      purple: "bg-purple-50 border-purple-200 text-purple-600",
      orange: "bg-orange-50 border-orange-200 text-orange-600"
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Как покупать
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Пошаговое руководство для безопасных и успешных покупок на нашей платформе
          </p>
        </div>

        {/* Quick Start */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <Icon name="Zap" className="w-6 h-6 text-yellow-600" />
              <span>Быстрый старт</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button
                onClick={() => navigate("/")}
                className="bg-blue-600 hover:bg-blue-700 h-auto p-4 flex-col space-y-2"
              >
                <Icon name="Search" className="w-6 h-6" />
                <span>Начать поиск</span>
              </Button>
              <Button
                onClick={() => navigate("/register")}
                variant="outline"
                className="h-auto p-4 flex-col space-y-2"
              >
                <Icon name="UserPlus" className="w-6 h-6" />
                <span>Зарегистрироваться</span>
              </Button>
              <Button
                onClick={() => navigate("/contacts")}
                variant="outline"
                className="h-auto p-4 flex-col space-y-2"
              >
                <Icon name="HelpCircle" className="w-6 h-6" />
                <span>Получить помощь</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Step by Step Guide */}
        <div className="space-y-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Пошаговое руководство
          </h2>
          
          {steps.map((step, index) => (
            <Card key={index} className="border-0 shadow-lg overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className={`p-6 md:w-1/3 ${getColorClasses(step.color)}`}>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold text-lg">
                        {step.number}
                      </div>
                      <Icon name={step.icon as any} className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-sm opacity-90">{step.description}</p>
                  </div>
                  <div className="p-6 md:w-2/3 bg-white">
                    <ul className="space-y-3">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start space-x-3">
                          <Icon name="Check" className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Safety Tips */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <Icon name="Shield" className="w-6 h-6 text-red-600" />
              <span>Советы по безопасности</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {safetyTips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                  <Icon name={tip.icon as any} className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{tip.title}</h4>
                    <p className="text-sm text-gray-600">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Warning Signs */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <Icon name="AlertTriangle" className="w-6 h-6 text-yellow-600" />
              <span>Признаки мошенничества</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-4">
              <p className="text-yellow-800 font-medium mb-2">
                Будьте осторожны, если продавец:
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <Icon name="X" className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Просит предоплату без встречи</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Icon name="X" className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Предлагает цену намного ниже рыночной</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Icon name="X" className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Торопит с принятием решения</span>
                </li>
              </ul>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <Icon name="X" className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Отказывается встречаться лично</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Icon name="X" className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Использует только фото из интернета</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Icon name="X" className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Просит перевести деньги на карту заранее</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <Icon name="HelpCircle" className="w-6 h-6 text-blue-600" />
              <span>Часто задаваемые вопросы</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Что делать, если товар не соответствует описанию?
                </h4>
                <p className="text-gray-700 text-sm">
                  Вы имеете право отказаться от покупки. Не передавайте деньги, если товар 
                  отличается от заявленного в объявлении. Сообщите об этом продавцу и при 
                  необходимости обратитесь в службу поддержки.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Можно ли вернуть товар после покупки?
                </h4>
                <p className="text-gray-700 text-sm">
                  Возврат товара зависит от договоренности с продавцом. Рекомендуем обсудить 
                  условия возврата до совершения покупки. Для дорогих товаров можно составить 
                  простую расписку.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Как проверить подлинность товара?
                </h4>
                <p className="text-gray-700 text-sm">
                  Просите у продавца документы на товар, проверяйте серийные номера, 
                  изучайте упаковку и маркировку. Для дорогих товаров можно воспользоваться 
                  услугами экспертизы.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Что делать при возникновении спора?
                </h4>
                <p className="text-gray-700 text-sm">
                  Сначала попытайтесь решить вопрос с продавцом напрямую. Если это не удается, 
                  обратитесь в службу поддержки сайта. Мы поможем найти компромиссное решение.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Готовы начать покупки?
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Теперь вы знаете, как безопасно и эффективно покупать товары на нашей платформе. 
                Начните поиск прямо сейчас!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => navigate('/')}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Icon name="Search" className="w-5 h-5 mr-2" />
                  Искать товары
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/register')}
                  size="lg"
                >
                  <Icon name="UserPlus" className="w-5 h-5 mr-2" />
                  Создать аккаунт
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HowToBuyPage;