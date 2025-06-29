import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const AvitoProduct = () => {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);

  const product = {
    id: 1,
    title: "iPhone 14 Pro 128GB Space Black",
    price: 85000,
    location: "Москва, м. Тверская",
    description:
      "Продаю iPhone 14 Pro 128GB в отличном состоянии. Покупал в официальном магазине, есть чек. Комплект полный: коробка, кабель, документы. Без царапин и сколов, всегда использовал с чехлом и защитным стеклом.",
    images: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&h=400&fit=crop",
    ],
    seller: {
      name: "Иван Петров",
      rating: 4.8,
      reviewsCount: 12,
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
      onSiteFor: "2 года",
    },
    views: 247,
    favorites: 18,
    publishedAt: "2 дня назад",
    specifications: [
      { label: "Состояние", value: "Отличное" },
      { label: "Память", value: "128 ГБ" },
      { label: "Цвет", value: "Space Black" },
      { label: "Гарантия", value: "Есть" },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button
              variant="ghost"
              onClick={() => navigate("/avito")}
              className="flex items-center space-x-2 text-white hover:bg-white/20"
            >
              <Icon name="ArrowLeft" size={20} />
              <span className="text-2xl font-bold">AVITO</span>
            </Button>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-white hover:bg-white/20">
                <Icon name="Heart" size={18} className="mr-2" />
                Избранное
              </Button>
              <Button variant="ghost" className="text-white hover:bg-white/20">
                <Icon name="User" size={18} className="mr-2" />
                Профиль
              </Button>
              <Button
                onClick={() => navigate("/avito/sell")}
                className="bg-white text-purple-600 hover:bg-gray-100 font-semibold"
              >
                <Icon name="Plus" size={16} className="mr-2" />
                Подать объявление
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Images */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="aspect-[4/3] mb-4">
                  <img
                    src={product.images[currentImage]}
                    alt={product.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        currentImage === index
                          ? "border-blue-500"
                          : "border-gray-200"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card className="mt-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Описание</h2>
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </CardContent>
            </Card>

            {/* Specifications */}
            <Card className="mt-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Характеристики</h2>
                <div className="space-y-3">
                  {product.specifications.map((spec, index) => (
                    <div
                      key={index}
                      className="flex justify-between py-2 border-b border-gray-100 last:border-b-0"
                    >
                      <span className="text-gray-600">{spec.label}</span>
                      <span className="font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Info & Actions */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-white to-blue-50/50 border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <Badge className="bg-green-100 text-green-800 mb-2">
                      Б/у
                    </Badge>
                    <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="text-gray-500">
                      <Icon name="MoreHorizontal" size={20} />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500">
                      <Icon name="Heart" size={20} />
                    </Button>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-baseline space-x-2">
                    <p className="text-3xl font-bold text-gray-900">
                      {product.price.toLocaleString()} ₽
                    </p>
                    <p className="text-lg text-gray-500 line-through">
                      {(product.price + 15000).toLocaleString()} ₽
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                  <span className="flex items-center">
                    <Icon name="MapPin" size={16} className="mr-1" />
                    {product.location}
                  </span>
                  <span className="flex items-center">
                    <Icon name="Eye" size={16} className="mr-1" />
                    {product.views}
                  </span>
                  <span className="flex items-center">
                    <Icon name="Heart" size={16} className="mr-1" />
                    {product.favorites}
                  </span>
                </div>

                <div className="space-y-3">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 h-12 text-white font-semibold">
                    Запросить доставку
                  </Button>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Авито Доставка.</p>
                    <p>Гарантия возврата денег, если товар не подойдёт</p>
                    <a href="#" className="text-blue-600 hover:underline">
                      Об Авито Доставке
                    </a>
                  </div>

                  <Button className="w-full bg-green-600 hover:bg-green-700 h-12">
                    <Icon name="MessageCircle" size={18} className="mr-2" />
                    Написать продавцу
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full h-12 border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    <Icon name="Phone" size={18} className="mr-2" />
                    Показать телефон
                  </Button>
                  <Button variant="outline" className="w-full h-12">
                    <Icon name="Heart" size={18} className="mr-2" />В избранное
                  </Button>
                </div>

                <p className="text-sm text-gray-500 mt-4">
                  Размещено {product.publishedAt}
                </p>
              </CardContent>
            </Card>

            {/* Seller Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold mb-4">Продавец</h3>
                <div className="flex items-start gap-4">
                  <img
                    src={product.seller.avatar}
                    alt={product.seller.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold">{product.seller.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            size={12}
                            className={
                              i < Math.floor(product.seller.rating)
                                ? "fill-current"
                                : ""
                            }
                          />
                        ))}
                      </div>
                      <span>{product.seller.rating}</span>
                      <span>({product.seller.reviewsCount} отзывов)</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      На сайте {product.seller.onSiteFor}
                    </p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Все объявления продавца
                </Button>
              </CardContent>
            </Card>

            {/* Safety Tips */}
            <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Icon
                    name="Shield"
                    size={20}
                    className="text-orange-600 mt-1"
                  />
                  <div>
                    <h3 className="font-semibold text-orange-800 mb-2">
                      Безопасная сделка
                    </h3>
                    <ul className="text-sm text-orange-700 space-y-1">
                      <li>• Встречайтесь в людных местах</li>
                      <li>• Проверяйте товар перед покупкой</li>
                      <li>• Не переводите деньги заранее</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Ask Seller Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="bg-gradient-to-br from-white to-purple-50/30">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Спросите у продавца</h2>
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Здравствуйте!"
                className="w-full p-3 border border-gray-300 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Button
                size="sm"
                className="absolute right-2 top-2 bg-purple-600 hover:bg-purple-700"
              >
                <Icon name="Send" size={16} />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="rounded-full">
                Где и когда можно посмотреть?
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                Ещё продаёте?
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                Торг уместен?
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                Отправите Авито Доставкой?
              </Button>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <p>
                № {product.id}736350794 • 14 июня в 17:15 • 74 просмотра (+19
                сегодня)
              </p>
            </div>
            <Button
              variant="outline"
              className="mt-4 text-blue-600 border-blue-600 hover:bg-blue-50"
            >
              Пожаловаться на объявление
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Similar Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Похожие объявления</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-square bg-gray-200 rounded-lg mb-3"></div>
                    <h3 className="font-semibold mb-2">iPhone 14 Pro Max</h3>
                    <p className="text-lg font-bold text-green-600 mb-1">
                      95 000 ₽
                    </p>
                    <p className="text-sm text-gray-600">Москва</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Как новое, но дешевле</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-square bg-gray-200 rounded-lg mb-3"></div>
                    <h3 className="font-semibold mb-2">
                      iPhone 14 {item === 1 ? "Pro" : ""}
                    </h3>
                    <p className="text-lg font-bold text-green-600 mb-1">
                      {75000 + item * 5000} ₽
                    </p>
                    <p className="text-sm text-gray-600">Москва</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Может быть интересно</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-square bg-gray-200 rounded-lg mb-3"></div>
                    <h3 className="font-semibold mb-2">Samsung Galaxy S23</h3>
                    <p className="text-lg font-bold text-green-600 mb-1">
                      {60000 + item * 3000} ₽
                    </p>
                    <p className="text-sm text-gray-600">Москва</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AvitoProduct;
