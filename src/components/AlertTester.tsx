import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAlertContext } from '@/contexts/AlertContext';

const AlertTester = () => {
  const { showSuccess, showError, showWarning, showInfo, clearAllAlerts } = useAlertContext();

  const testAlerts = () => {
    showSuccess("Это успешное уведомление!", "Успех");
    
    setTimeout(() => {
      showError("Это ошибка с действием", "Критическая ошибка", {
        action: {
          label: "Попробовать снова",
          onClick: () => showInfo("Вы нажали на кнопку действия!", "Действие выполнено")
        }
      });
    }, 1000);

    setTimeout(() => {
      showWarning("Это предупреждение", "Внимание");
    }, 2000);

    setTimeout(() => {
      showInfo("Это информационное сообщение с длинным текстом для демонстрации переноса строк и правильной верстки уведомлений", "Информация", {
        duration: 0 // Не исчезает автоматически
      });
    }, 3000);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Тестер уведомлений</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={testAlerts} className="w-full">
          Показать все типы уведомлений
        </Button>
        
        <div className="grid grid-cols-2 gap-2">
          <Button 
            variant="outline" 
            onClick={() => showSuccess("Операция выполнена!", "Готово")}
            className="text-green-600 border-green-200 hover:bg-green-50"
          >
            Успех
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => showError("Что-то пошло не так", "Ошибка")}
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            Ошибка
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => showWarning("Будьте осторожны", "Предупреждение")}
            className="text-yellow-600 border-yellow-200 hover:bg-yellow-50"
          >
            Предупреждение
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => showInfo("Полезная информация", "К сведению")}
            className="text-blue-600 border-blue-200 hover:bg-blue-50"
          >
            Инфо
          </Button>
        </div>
        
        <Button 
          variant="destructive" 
          onClick={clearAllAlerts}
          className="w-full"
        >
          Очистить все уведомления
        </Button>
      </CardContent>
    </Card>
  );
};

export default AlertTester;