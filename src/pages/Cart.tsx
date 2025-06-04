import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1583743814966-8936f37f8302?w=400&h=400&fit=crop",
      title: "Беспроводные наушники AirPods Pro",
      price: 24999,
      quantity: 2,
      seller: "Apple Store",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      title: "Смарт-часы Apple Watch Series 8",
      price: 45999,
      quantity: 1,
      seller: "Apple Store",
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
        <h1 className="text-2xl font-bold mb-8">Корзина</h1>

        {/* Секция профиля доставки */}
        <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-start space-x-3">
              <Icon name="MapPin" className="text-blue-600 mt-1" size={20} />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">
                  Профиль доставки
                </h3>
                <p className="text-gray-600 text-sm mb-1">
                  Россия, Нижегородская обл., г. Дзержинск, ул. Гайдара, д. 35
                </p>
                <p className="text-gray-500 text-sm">
                  Даниил Путин +79050129454
                </p>
              </div>
            </div>
            <button
              onClick={() =>
                (window.location.href = "/profile/deliveryProfiles")
              }
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Icon name="ChevronRight" size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-start space-x-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Продавец: {item.seller}
                        </p>
                      </div>
                      <button className="text-gray-400 hover:text-red-500">
                        <Icon name="X" size={20} />
                      </button>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center space-x-3">
                        <button className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                          <Icon name="Minus" size={14} />
                        </button>
                        <span className="font-medium min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
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

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-lg font-bold mb-6">Ваш заказ</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Товары ({totalItems})</span>
                  <span className="font-semibold">
                    {totalPrice.toLocaleString()} ₽
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Скидка</span>
                  <span className="text-green-600 font-semibold">-2 000 ₽</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Доставка</span>
                  <span className="font-semibold">Бесплатно</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Итого</span>
                    <span>{(totalPrice - 2000).toLocaleString()} ₽</span>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700 py-3 mb-6">
                Перейти к оформлению
              </Button>

              {/* Promo Code Section */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Промокод</h3>
                <div className="flex space-x-2">
                  <Input placeholder="Введите промокод" className="flex-1" />
                  <Button variant="outline">Применить</Button>
                </div>
              </div>

              {/* Comment Section */}
              <div>
                <h3 className="font-semibold mb-3">Комментарий для продавца</h3>
                <div className="flex items-center justify-between text-gray-500 text-sm p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                  <span>Оставить комментарий</span>
                  <Icon name="ChevronRight" size={16} />
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
