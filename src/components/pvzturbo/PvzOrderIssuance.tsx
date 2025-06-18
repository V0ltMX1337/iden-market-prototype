import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "pvz-picked-orders";

type OrderInfo = {
  code: string;
  recipientName: string;
  cell: string;
};

const PvzOrderIssuance = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [pickedOrders, setPickedOrders] = useState<OrderInfo[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setPickedOrders(JSON.parse(saved));
      } catch {
        setPickedOrders([]);
      }
    }
  }, []);

  // Имитация загрузки заказа по коду (в реальном приложении - запрос к API)
  const fetchOrderInfo = (code: string): OrderInfo => ({
    code,
    recipientName: "Имя Фамилия", // тут будет реальное имя из API
    cell: "A-12", // тут будет реальная ячейка из API
  });

  const saveOrders = (orders: OrderInfo[]) => {
    setPickedOrders(orders);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  };

  const handleAddOrder = () => {
    const trimmed = code.trim();
    if (!trimmed) return;

    if (pickedOrders.find((o) => o.code === trimmed)) {
      alert("Этот заказ уже добавлен");
      return;
    }

    const newOrder = fetchOrderInfo(trimmed);
    const newOrders = [...pickedOrders, newOrder];
    saveOrders(newOrders);
    setCode("");
    navigate(`/pvzturbo/order-issuance/${trimmed}`);
  };

  const handleRemoveOrder = (orderCode: string) => {
    const newOrders = pickedOrders.filter((o) => o.code !== orderCode);
    saveOrders(newOrders);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl">
        <Alert variant="default" className="mb-8">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Отсканируйте штрихкод из ЛК клиента или введите код целиком.</AlertTitle>
          <AlertDescription>
            Если у вас появились проблемы со сканированием, попросите клиента продиктовать код под штрихкодом.
          </AlertDescription>
        </Alert>

        <div className="flex gap-4 items-center mb-6 max-w-xl">
          <Input
            placeholder="Введите код заказа"
            className="flex-1"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddOrder();
            }}
          />
          <Button
            onClick={handleAddOrder}
            className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            Найти
          </Button>
        </div>

        {pickedOrders.length > 0 ? (
          <>
            <h3 className="text-xl font-semibold mb-4">Заказы в выдаче</h3>
            <div
              className="grid gap-6"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              }}
            >
              {pickedOrders.map(({ code, recipientName, cell }) => (
                <div
                  key={code}
                  onClick={() => navigate(`/pvzturbo/order-issuance/${code}`)}
                  className="p-4 rounded-lg border border-gray-300 bg-white shadow-sm flex flex-col justify-between min-h-[130px] cursor-pointer hover:shadow-md transition-shadow"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      navigate(`/pvzturbo/order-issuance/${code}`);
                    }
                  }}
                >
                  <div className="mb-4">
                    <span className="block font-semibold text-lg">{recipientName}</span>
                    <span className="block font-mono text-gray-700 mt-1">Заказ: {code}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="inline-block bg-yellow-400 text-black text-sm px-3 py-1 rounded-full font-semibold select-none">
                      Ячейка: {cell}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveOrder(code);
                      }}
                    >
                      Удалить
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-gray-500 mt-10 text-lg">Заказы отсутствуют</p>
        )}
      </div>
    </div>
  );
};

export default PvzOrderIssuance;
