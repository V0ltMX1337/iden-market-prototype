import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import Header from "@/components/marketplace/Header";
import { Link } from "react-router-dom";

const Help = () => {
  const [activeSection, setActiveSection] = useState("1.1");
  const [searchQuery, setSearchQuery] = useState("");

  const helpSections = [
    {
      id: "1",
      title: "Мой заказ",
      items: [
        { id: "1.1", title: "Как сделать оптовый заказ", active: true },
        { id: "1.2", title: "Как сделать дропшиппинговый заказ" },
        { id: "1.3", title: "Как оформить розничный заказ" },
        { id: "1.4", title: "Как узнать статус заказа" },
        { id: "1.5", title: "Заказ у нескольких продавцов" },
        { id: "1.6", title: "Почему мой заказ был отменен" },
        { id: "1.7", title: "Как изменить заказ" },
        { id: "1.8", title: "Как отменить заказ" },
        { id: "1.9", title: "Нет ответа на заказ от продавца" },
        { id: "1.10", title: "Минимальная сумма заказа" },
        { id: "1.11", title: "Заказ оплачен, но не отправлен" },
        { id: "1.12", title: "Заказ не приходит или идет слишком долго" },
      ],
    },
    {
      id: "2",
      title: "Оплата",
      items: [{ id: "2.1", title: "Как происходит оплата" }],
    },
    {
      id: "3",
      title: "Гарантия и возврат",
      items: [
        { id: "3.1", title: "Проверка продавца" },
        { id: "3.2", title: "Условия и сроки возврата товара" },
        { id: "3.3", title: "Гарантия площадки" },
      ],
    },
    {
      id: "4",
      title: "Доставка",
      items: [{ id: "4.1", title: "Способы доставки" }],
    },
  ];

  const renderContent = () => {
    if (activeSection === "1.1") {
      return (
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Как сделать оптовый заказ
          </h1>

          <div className="space-y-4">
            <p className="text-gray-700">
              Шаги для оформления оптового заказа:
            </p>

            <div className="space-y-3">
              <div className="space-y-2">
                <p>
                  <span className="font-medium">1.</span> Выберите нужные товары
                  и добавьте их в корзину.{" "}
                  <span className="font-medium text-blue-600">
                    Обратите внимание
                  </span>
                  , что каждый оптовый продавец имеет{" "}
                  <span className="text-blue-600 underline cursor-pointer">
                    минимальную сумму заказа
                  </span>
                  , которую необходимо превысить, чтобы сделать заказ.
                </p>
              </div>

              <div className="space-y-2">
                <p>
                  <span className="font-medium">2.</span> Перейдите в раздел{" "}
                  <span className="font-medium">Корзина</span> и нажмите кнопку{" "}
                  <span className="font-medium">Перейти к оформлению</span>.
                </p>
              </div>

              <div className="space-y-2">
                <p>
                  <span className="font-medium">3.</span> Укажите свои данные.
                  Если вы не авторизованы, авторизуйтесь с помощью аккаунта в
                  Telegram или адреса электронной почты.
                </p>
              </div>

              <div className="space-y-2">
                <p>
                  <span className="font-medium">4.</span> Выберите способ
                  доставки и укажите адрес доставки.
                </p>
              </div>

              <div className="space-y-2">
                <p>
                  <span className="font-medium">5.</span> Добавьте все ваши
                  пожелания к заказу в поле{" "}
                  <span className="font-medium">Комментарий к заказу</span>.
                </p>
              </div>

              <div className="space-y-2">
                <p>
                  <span className="font-medium">6.</span> Оформите заказ и
                  ожидайте ответа от продавца. После согласования заказа магазин
                  выставит вам{" "}
                  <span className="text-blue-600 underline cursor-pointer">
                    счет к оплате
                  </span>
                  .
                </p>
              </div>

              <div className="space-y-2">
                <p>
                  <span className="font-medium">7.</span> Ваш заказ будет
                  отправлен после оплаты. Если у продавца доступен самовывоз,
                  оплату можно произвести на месте.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="bg-gray-100 rounded-lg p-4">
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Выберите раздел помощи
        </h1>
        <p className="text-gray-600">
          Используйте меню слева для навигации по разделам помощи.
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link to="/" className="text-blue-600 hover:underline">
            Главная
          </Link>
          <Icon name="ChevronRight" size={16} />
          <span>Помощь</span>
        </nav>

        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-80 bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6">
              <Input
                placeholder="Поиск..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>

            <nav className="space-y-1">
              {helpSections.map((section) => (
                <div key={section.id} className="space-y-1">
                  <div className="font-medium text-gray-900 py-2">
                    {section.id}. {section.title}
                  </div>

                  {section.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                        activeSection === item.id
                          ? "bg-blue-100 text-blue-700 font-medium"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      {item.id} {item.title}
                    </button>
                  ))}
                </div>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white rounded-lg shadow-sm p-8">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
