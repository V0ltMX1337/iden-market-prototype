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
        <div className="max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Как сделать оптовый заказ
            </h1>
            <p className="text-lg text-gray-600">
              Пошаговое руководство по оформлению оптового заказа
            </p>
          </div>

          <div className="space-y-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-6">
                Шаги для оформления оптового заказа:
              </p>

              <div className="space-y-6">
                {[
                  {
                    step: "1",
                    content: (
                      <>
                        Выберите нужные товары и добавьте их в корзину.{" "}
                        <span className="font-semibold text-blue-600">
                          Обратите внимание
                        </span>
                        , что каждый оптовый продавец имеет{" "}
                        <span className="text-blue-600 underline cursor-pointer hover:text-blue-700">
                          минимальную сумму заказа
                        </span>
                        , которую необходимо превысить, чтобы сделать заказ.
                      </>
                    ),
                  },
                  {
                    step: "2",
                    content: (
                      <>
                        Перейдите в раздел{" "}
                        <span className="font-semibold bg-gray-100 px-2 py-1 rounded">
                          Корзина
                        </span>{" "}
                        и нажмите кнопку{" "}
                        <span className="font-semibold bg-blue-50 text-blue-700 px-2 py-1 rounded">
                          Перейти к оформлению
                        </span>
                        .
                      </>
                    ),
                  },
                  {
                    step: "3",
                    content: (
                      <>
                        Укажите свои данные. Если вы не авторизованы,
                        авторизуйтесь с помощью аккаунта в Telegram или адреса
                        электронной почты.
                      </>
                    ),
                  },
                  {
                    step: "4",
                    content:
                      "Выберите способ доставки и укажите адрес доставки.",
                  },
                  {
                    step: "5",
                    content: (
                      <>
                        Добавьте все ваши пожелания к заказу в поле{" "}
                        <span className="font-semibold bg-gray-100 px-2 py-1 rounded">
                          Комментарий к заказу
                        </span>
                        .
                      </>
                    ),
                  },
                  {
                    step: "6",
                    content: (
                      <>
                        Оформите заказ и ожидайте ответа от продавца. После
                        согласования заказа магазин выставит вам{" "}
                        <span className="text-blue-600 underline cursor-pointer hover:text-blue-700">
                          счет к оплате
                        </span>
                        .
                      </>
                    ),
                  },
                  {
                    step: "7",
                    content:
                      "Ваш заказ будет отправлен после оплаты. Если у продавца доступен самовывоз, оплату можно произвести на месте.",
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                      {item.step}
                    </div>
                    <div className="flex-1 text-gray-700 leading-relaxed">
                      {item.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Видеоинструкция
              </h3>
              <div className="bg-gray-100 rounded-xl overflow-hidden">
                <iframe
                  width="100%"
                  height="400"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Как сделать оптовый заказ"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-xl"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <Icon
            name="HelpCircle"
            size={64}
            className="text-gray-300 mx-auto mb-6"
          />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Выберите раздел помощи
          </h1>
          <p className="text-gray-600">
            Используйте меню слева для навигации по разделам помощи и найдите
            ответы на ваши вопросы.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-700 transition-colors"
          >
            Главная
          </Link>
          <Icon name="ChevronRight" size={16} />
          <span className="text-gray-700">Помощь</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 sticky top-8">
              <div className="p-6">
                <div className="mb-6">
                  <Input
                    placeholder="Поиск по разделам..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>

                <nav className="space-y-2">
                  {helpSections.map((section) => (
                    <div key={section.id} className="space-y-1">
                      <div className="font-semibold text-gray-900 px-3 py-2 text-sm border-b border-gray-100">
                        {section.id}. {section.title}
                      </div>

                      <div className="space-y-1 pb-2">
                        {section.items.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => setActiveSection(item.id)}
                            className={`w-full text-left px-3 py-2.5 text-sm rounded-lg transition-all duration-200 ${
                              activeSection === item.id
                                ? "bg-blue-50 text-blue-700 font-medium border-l-2 border-blue-500"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            }`}
                          >
                            <span className="text-xs text-gray-400 mr-2">
                              {item.id}
                            </span>
                            {item.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-8 lg:p-12">{renderContent()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
