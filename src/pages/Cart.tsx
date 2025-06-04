import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Icon from "@/components/ui/icon";
import Header from "@/components/marketplace/Header";

const Cart = () => {
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

        <div className="flex justify-between items-start mb-8">
          <h1 className="text-2xl font-bold">Корзина</h1>

          {/* Checkout Button - Top Right */}
          <div className="bg-white rounded-lg shadow-sm p-6 w-80">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 py-3 mb-4">
              Перейти к оформлению
            </Button>
            <p className="text-sm text-gray-500 text-center">
              Доступные способы и время доставки можно выбрать при оформлении
              заказа
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              {/* Select All Header */}
              <div className="p-4 border-b flex items-center space-x-4">
                <Checkbox id="select-all" defaultChecked />
                <label htmlFor="select-all" className="font-medium">
                  Выбрать все
                </label>
                <button className="text-red-500 text-sm hover:underline">
                  Удалить выбранные
                </button>
              </div>

              {/* Seller Section */}
              <div className="border-b">
                <div className="p-4 flex items-center space-x-3">
                  <Checkbox defaultChecked />
                  <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">V</span>
                  </div>
                  <span className="font-medium">VTAСНКU</span>
                  <Icon name="ChevronUp" size={16} />
                </div>

                {/* Product Item */}
                <div className="p-4">
                  <div className="flex items-center space-x-4">
                    <Checkbox defaultChecked />
                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src="https://cdn.poehali.dev/files/32323beb-1a16-4857-8cce-5062e34ce3bc.png"
                        alt="Твитеры пищалки Alpine DDT-S30"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">
                        Твитеры пищалки Alpine DDT-S30
                      </h3>
                      <p className="text-sm text-gray-500 mb-3">
                        Пищалки DDT-S30 - TWEETER DDT-S30
                      </p>
                    </div>

                    {/* Quantity and Price Controls */}
                    <div className="flex items-center space-x-8">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 rounded-full"
                        >
                          <Icon name="Minus" size={14} />
                        </Button>
                        <span className="font-medium w-8 text-center">1</span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 rounded-full bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                        >
                          <Icon name="Plus" size={14} />
                        </Button>
                      </div>

                      <div className="flex items-center space-x-4">
                        <span className="font-semibold text-lg">1 000 ₽</span>
                        <Button variant="ghost" size="sm" className="p-1">
                          <Icon
                            name="Trash2"
                            size={16}
                            className="text-gray-400"
                          />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">V</span>
                </div>
                <span className="font-medium">VTAСНКU</span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Товары (1)</span>
                  <span>1 000 ₽</span>
                </div>

                <div className="flex justify-between font-medium">
                  <span>Итого:</span>
                  <span>1 000 ₽</span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold">Общая стоимость</span>
                    <span className="font-bold text-xl">1 000 ₽</span>
                  </div>
                  <p className="text-sm text-blue-600">Без учёта Доставки</p>
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
