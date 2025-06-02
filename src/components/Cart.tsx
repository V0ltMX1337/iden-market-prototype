import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Icon from "@/components/ui/icon";
import { useState } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Твитеры пищалки Alpine DDT-S30",
      description: "Пищалки DDT-S30 - TWEETER DDT-S30",
      price: 1000,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
    },
  ]);

  const updateQuantity = (id: number, change: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item,
      ),
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Icon name="ShoppingCart" size={20} />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 px-2 py-1 text-xs">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-96">
        <SheetHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-lg font-semibold">
              Товары{" "}
              <span className="text-gray-500 font-normal">
                {totalItems} шт.
              </span>
            </SheetTitle>
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-600 hover:text-blue-700"
            >
              Очистить
            </Button>
          </div>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm"
            >
              <div className="flex gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg bg-gray-100"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-sm leading-tight mb-1">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-500 mb-3">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center border rounded-lg">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 rounded-none"
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        <Icon name="Minus" size={14} />
                      </Button>
                      <span className="px-3 py-1 text-sm font-medium min-w-[40px] text-center">
                        {item.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 rounded-none"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <Icon name="Plus" size={14} />
                      </Button>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">
                        {(item.price * item.quantity).toLocaleString()} ₽
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-gray-400 hover:text-red-500"
                        onClick={() => removeItem(item.id)}
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {cartItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <Icon name="ShoppingCart" size={48} className="mb-4 opacity-30" />
            <p className="text-lg">Корзина пуста</p>
            <p className="text-sm">Добавьте товары для оформления заказа</p>
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="mt-6 space-y-4 border-t pt-6">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Итого:</span>
              <span>{totalPrice.toLocaleString()} ₽</span>
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-base">
              В корзину
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
