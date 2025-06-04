import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Icon from "@/components/ui/icon";
import Header from "@/components/marketplace/Header";

const Cart = () => {
  const cartItems = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
      title: "Кроссовки Nike Air Max 270",
      price: 12999,
      oldPrice: 15999,
      quantity: 1,
      seller: "Nike Store",
      inStock: true,
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1583743814966-8936f37f8302?w=400&h=400&fit=crop",
      title: "Беспроводные наушники AirPods Pro",
      price: 24999,
      quantity: 2,
      seller: "Apple Store",
      inStock: true,
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      title: "Смарт-часы Apple Watch Series 8",
      price: 45999,
      quantity: 1,
      seller: "Apple Store",
      inStock: false,
    },
  ];

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <span>Главная</span>
          <Icon name="ChevronRight" size={16} />
          <span className="text-blue-600">Корзина</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm mb-6">
              {/* Header */}
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Checkbox id="select-all" defaultChecked />
                  <label htmlFor="select-all" className="font-medium">
                    Выбрать все ({totalItems})
                  </label>
                </div>
                <button className="text-red-500 text-sm hover:underline">
                  Удалить выбранные
                </button>
              </div>

              {/* Cart Items */}
              <div className="divide-y">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-4">
                    <div className="flex items-start space-x-4">
                      <Checkbox defaultChecked className="mt-2" />

                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />

                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium text-gray-900 mb-1">
                              {item.title}
                            </h3>
                            <p className="text-sm text-gray-500">
                              Продавец: {item.seller}
                            </p>
                            {!item.inStock && (
                              <p className="text-sm text-red-500 mt-1">
                                Нет в наличии
                              </p>
                            )}
                          </div>

                          <button className="text-gray-400 hover:text-red-500">
                            <Icon name="Trash2" size={18} />
                          </button>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-3">
                            <button className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                              <Icon name="Minus" size={14} />
                            </button>
                            <span className="font-medium">{item.quantity}</span>
                            <button className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                              <Icon name="Plus" size={14} />
                            </button>
                          </div>

                          <div className="text-right">
                            <div className="font-bold text-lg">
                              {item.price.toLocaleString()} ₽
                            </div>
                            {item.oldPrice && (
                              <div className="text-sm text-gray-500 line-through">
                                {item.oldPrice.toLocaleString()} ₽
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <Icon name="Heart" size={16} />
                  <span>В избранное</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <Icon name="Share2" size={16} />
                  <span>Поделиться</span>
                </Button>
              </div>

              <Button
                variant="outline"
                className="text-red-500 border-red-200 hover:bg-red-50"
              >
                Очистить корзину
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-lg font-bold mb-4">Итого</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Товары ({totalItems})</span>
                  <span>{totalPrice.toLocaleString()} ₽</span>
                </div>
                <div className="flex justify-between">
                  <span>Скидка</span>
                  <span className="text-green-600">-2 000 ₽</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Доставка</span>
                  <span>Бесплатно</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>К оплате</span>
                    <span>{(totalPrice - 2000).toLocaleString()} ₽</span>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700 py-3 mb-4">
                Перейти к оформлению
              </Button>

              <div className="text-sm text-gray-500 text-center mb-4">
                Доступные способы и время доставки можно выбрать при оформлении
                заказа
              </div>

              {/* Promo Code */}
              <div className="border-t pt-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Промокод"
                    className="flex-1 px-3 py-2 border rounded-lg text-sm"
                  />
                  <Button variant="outline" size="sm">
                    Применить
                  </Button>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mt-6 pt-4 border-t">
                <p className="text-sm text-gray-600 mb-3">Способы оплаты:</p>
                <div className="flex space-x-2">
                  <div className="w-8 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                    VISA
                  </div>
                  <div className="w-8 h-6 bg-red-500 rounded text-white text-xs flex items-center justify-center font-bold">
                    MC
                  </div>
                  <div className="w-8 h-6 bg-gray-800 rounded text-white text-xs flex items-center justify-center">
                    <Icon name="Smartphone" size={12} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
