import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

const PvzOrderIssuance = () => {
  return (
    <div className="space-y-6">
      <Alert variant="default">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Отсканируйте штрихкод из ЛК клиента или введите код целиком.</AlertTitle>
        <AlertDescription>
          Если у вас появились проблемы со сканированием, попросите клиента продиктовать код под штрихкодом.
        </AlertDescription>
      </Alert>

      <div className="flex gap-4 items-center">
        <Input placeholder="Введите код заказа" className="max-w-sm" />
        <button className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800">Найти</button>
      </div>
    </div>
  );
};

export default PvzOrderIssuance;
