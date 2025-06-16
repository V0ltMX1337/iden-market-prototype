import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const DropdownCartContent = () => {
  const navigate = useNavigate();
  
  return (
    <div className="absolute z-50 mt-2 w-80 rounded-lg border bg-white shadow-lg">
      <div className="p-4 border-b">
        <h3 className="font-semibold text-lg">Корзина</h3>
      </div>
      <div className="max-h-96 overflow-y-auto">
        <div className="p-4 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=100&h=100&fit=crop"
                alt="Твитеры пищалки Alpine DDT-S30"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm truncate">
                Твитеры пищалки Alpine DDT-S30
              </h4>
              <p className="text-xs text-gray-500">
                Пищалки DDT-S30 - TWEETER DDT-S30
              </p>
              <p className="font-semibold text-blue-600">1 000 ₽</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">-</Button>
              <span className="text-sm font-medium w-8 text-center">1</span>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">+</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 border-t space-y-3">
        <div className="flex justify-between items-center">
          <span className="font-medium">Товары (1)</span>
          <span className="font-semibold">1 000 ₽</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium">Итого:</span>
          <span className="font-semibold">1 000 ₽</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Общая стоимость</span>
          <span className="font-semibold text-lg">1 000 ₽</span>
        </div>
        <p className="text-xs text-gray-500">Без учёта доставки</p>
        <Button onClick={() => navigate("/cart")} className="w-full bg-blue-600 hover:bg-blue-700">
          Перейти к оформлению
        </Button>
      </div>
    </div>
  );
};

export default DropdownCartContent;