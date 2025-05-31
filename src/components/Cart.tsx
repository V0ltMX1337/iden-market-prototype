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

const cartItems = [
  {
    id: 1,
    name: "Беспроводные наушники Pods Max",
    price: 4050,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
  },
  {
    id: 2,
    name: "Колонка JBL Clip 5",
    price: 1490,
    quantity: 2,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=100&h=100&fit=crop",
  },
];

const Cart = () => {
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
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Корзина</SheetTitle>
          <SheetDescription>
            {totalItems} {totalItems === 1 ? "товар" : "товара"} в корзине
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center space-x-3 p-3 border rounded-lg"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 object-cover rounded"
              />
              <div className="flex-1">
                <h4 className="font-medium text-sm">{item.name}</h4>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm text-gray-600">
                    {item.quantity} шт. × {item.price}₽
                  </span>
                  <span className="font-bold">
                    {item.price * item.quantity}₽
                  </span>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Icon name="Trash2" size={16} />
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex justify-between text-lg font-bold">
            <span>Итого:</span>
            <span>{totalPrice}₽</span>
          </div>
          <Button className="w-full">
            Оформить заказ
            <Icon name="ArrowRight" size={16} className="ml-2" />
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
