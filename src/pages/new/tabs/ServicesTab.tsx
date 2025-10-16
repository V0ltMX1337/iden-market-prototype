import Icon from '@/components/ui/icon';
import { Card, CardContent } from '@/components/ui/card';

interface ServicesTabProps {
  onTabChange: (tab: string) => void;
}

const ServicesTab = ({ onTabChange }: ServicesTabProps) => {
  const services = [
    {
      id: 'ads',
      icon: 'ShoppingBag',
      name: 'Объявления',
      description: 'Покупайте и продавайте товары',
      color: 'from-green-500 to-emerald-500',
    },
    {
      id: 'taxi',
      icon: 'Car',
      name: 'Такси',
      description: 'Заказывайте поездки по городу',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      id: 'video',
      icon: 'Video',
      name: 'Видео',
      description: 'Смотрите и загружайте видео',
      color: 'from-red-500 to-pink-500',
    },
    {
      id: 'music',
      icon: 'Music',
      name: 'Музыка',
      description: 'Слушайте любимые треки',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  const additionalServices = [
    { icon: 'Calendar', name: 'События', description: 'Ищите мероприятия рядом' },
    { icon: 'Briefcase', name: 'Работа', description: 'Поиск вакансий и резюме' },
    { icon: 'GraduationCap', name: 'Образование', description: 'Курсы и обучение' },
    { icon: 'Heart', name: 'Знакомства', description: 'Найдите свою вторую половинку' },
    { icon: 'ShoppingCart', name: 'Магазины', description: 'Покупки в интернете' },
    { icon: 'Newspaper', name: 'Новости', description: 'Актуальные новости' },
    { icon: 'MapPin', name: 'Карты', description: 'Навигация по городу' },
    { icon: 'Gamepad2', name: 'Игры', description: 'Играйте с друзьями' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Сервисы</h2>
        <p className="text-gray-600">Все возможности платформы в одном месте</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Основные сервисы</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service) => (
            <Card
              key={service.id}
              className="hover:shadow-lg transition-all cursor-pointer"
              onClick={() => onTabChange(service.id)}
            >
              <CardContent className="p-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-4`}>
                  <Icon name={service.icon as any} size={32} className="text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">{service.name}</h3>
                <p className="text-sm text-gray-600">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Дополнительные сервисы</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {additionalServices.map((service) => (
            <Card key={service.name} className="hover:shadow-lg transition-all cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                    <Icon name={service.icon as any} size={24} className="text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold truncate">{service.name}</h4>
                  </div>
                </div>
                <p className="text-xs text-gray-600">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <CardContent className="p-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
              <Icon name="Sparkles" size={40} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2">Хотите добавить свой сервис?</h3>
              <p className="text-blue-100 mb-4">
                Создайте собственный сервис и расширьте возможности платформы
              </p>
              <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Узнать больше
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServicesTab;
