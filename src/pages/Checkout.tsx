import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import Header from "@/components/marketplace/Header";

const Checkout = () => {
  const orderItem = {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    title: "Твитеры пищалки Alpine DDT-S30",
    subtitle: "Пищалки DDT-S30 - TWEETER DDT-S30",
    price: 1000,
    quantity: 1,
    seller: "VTACHKU",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <span>Главная</span>
          <Icon name="ChevronRight" size={16} />
          <span>Корзина</span>
          <Icon name="ChevronRight" size={16} />
          <span className="text-blue-600">Оформление заказа</span>
        </div>

        <h1 className="text-2xl font-bold mb-8">Оформление заказа</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Profile */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Профиль доставки</h2>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon name="MapPin" size={20} className="text-blue-600" />
                  <div>
                    <div className="font-medium">
                      Россия, Нижегородская обл., г. Дзержинск, ул. Гайдара, д.
                      35
                    </div>
                    <div className="text-sm text-gray-500">
                      Даниил Путин +79050129454
                    </div>
                  </div>
                </div>
                <Icon name="ChevronRight" size={20} className="text-gray-400" />
              </div>
            </div>

            {/* Product */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">V</span>
                  </div>
                  <span className="font-semibold">{orderItem.seller}</span>
                </div>
                <div className="text-lg font-bold">{orderItem.price} ₽</div>
              </div>

              <div className="flex items-center space-x-4">
                <img
                  src={orderItem.image}
                  alt={orderItem.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-medium mb-1">{orderItem.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {orderItem.subtitle}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm">x{orderItem.quantity}</span>
                  </div>
                  <div className="font-bold">{orderItem.price} ₽</div>
                  <div className="text-sm text-gray-500">
                    {orderItem.price} ₽
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Method */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Способ доставки</h2>

              <div className="space-y-3">
                <div className="flex items-center p-3 border border-green-200 rounded-lg bg-green-50">
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="w-6 h-6 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">
                      C
                    </div>
                    <span className="font-medium">СDEK</span>
                  </div>
                </div>

                <div className="space-y-2 ml-8">
                  <div>
                    <div className="font-medium">Самовывоз</div>
                    <button className="text-blue-600 text-sm hover:underline">
                      Указать адрес ПВЗ
                    </button>
                  </div>

                  <div>
                    <div className="font-medium">Курьером</div>
                    <button className="text-blue-600 text-sm hover:underline">
                      Указать адрес ПВЗ
                    </button>
                  </div>

                  <div>
                    <div className="font-medium">DPD</div>
                    <button className="text-blue-600 text-sm hover:underline">
                      Указать адрес ПВЗ
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-lg font-semibold mb-4">Подробности</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Товары</span>
                  <span>{orderItem.price} ₽</span>
                </div>
                <div className="text-sm text-gray-500 mb-4">
                  <span className="text-blue-600">
                    Оплата - на реквизиты продавца.
                  </span>
                  <br />
                  Магазин свяжется с вами, после совершения заказа.
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold mb-1">
                    <span>Итого:</span>
                    <span>{orderItem.price} ₽</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Без учёта <span className="text-blue-600">Доставки</span>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700 py-3 mb-4">
                Оформить заказ
              </Button>

              <div className="text-xs text-gray-500 text-center">
                После оформления заказа магазин рассчитает стоимость доставки
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
