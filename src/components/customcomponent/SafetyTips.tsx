import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const SafetyTips = () => (
  <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50 mt-6 h-fit">
    <CardContent className="p-4">
      <div className="flex items-start gap-3">
        <Icon name="Shield" size={20} className="text-orange-600 mt-1" />
        <div>
          <h3 className="font-semibold text-orange-800 mb-2">Безопасная сделка</h3>
          <ul className="text-sm text-orange-700 space-y-1">
            <li>• Встречайтесь в людных местах</li>
            <li>• Проверяйте товар перед покупкой</li>
            <li>• Не переводите деньги заранее</li>
          </ul>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default SafetyTips;
