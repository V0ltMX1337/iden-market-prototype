import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

const TaxiTab = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-6">Заказать такси</h2>
          
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Откуда</label>
              <div className="relative">
                <Icon name="MapPin" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input placeholder="Введите адрес..." className="pl-10" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Куда</label>
              <div className="relative">
                <Icon name="MapPin" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600" />
                <Input placeholder="Введите адрес..." className="pl-10" />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {[
              { name: 'Эконом', price: '450 ₽', time: '3 мин', icon: '🚗' },
              { name: 'Комфорт', price: '650 ₽', time: '5 мин', icon: '🚙' },
              { name: 'Бизнес', price: '1200 ₽', time: '7 мин', icon: '🚘' },
            ].map((tariff) => (
              <div
                key={tariff.name}
                className="border-2 border-gray-200 rounded-xl p-4 hover:border-blue-500 cursor-pointer transition-all"
              >
                <div className="text-3xl mb-2">{tariff.icon}</div>
                <div className="font-semibold mb-1">{tariff.name}</div>
                <div className="text-lg font-bold text-blue-600 mb-1">{tariff.price}</div>
                <div className="text-sm text-gray-600">Подача: {tariff.time}</div>
              </div>
            ))}
          </div>

          <Button className="w-full bg-blue-600 hover:bg-blue-700 py-6 text-lg font-semibold">
            Заказать такси
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxiTab;
