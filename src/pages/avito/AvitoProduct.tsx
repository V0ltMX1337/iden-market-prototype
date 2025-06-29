import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import AvitoHeader from "@/components/avitomarket/AvitoHeader";
import AvitoFooter from "@/components/avitomarket/AvitoFooter";

const AvitoProduct = () => {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);

  const product = {
    id: 1,
    title: "iPhone 14 Pro 128GB Space Black",
    price: 85000,
    location: "Москва, м. Тверская",
    category: "Электроника > Телефоны > Apple iPhone",
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50">
      <AvitoHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Breadcrumbs */}
        <div className="mb-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <button
              onClick={() => navigate("/avito")}
              className="hover:text-blue-600 transition-colors"
            >
              Главная
            </button>
            <Icon name="ChevronRight" size={16} />
            <span className="text-gray-900">{product.category}</span>
          </nav>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Product Images */}
          <div className="lg:col-span-2">
            <Card className="h-fit">
              <CardContent className="p-4">
                <div className="aspect-[4/3] mb-4">
                  <img
                    src={product.images[currentImage]}
                    alt={product.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div
                  className="flex gap-2 pb-2"
                  style={{
                    overflowX: "auto",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                >
                  <style jsx>{`
                    div::-webkit-scrollbar {
                      display: none;
                    }
                  `}</style>
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        currentImage === index
                          ? "border-blue-500 scale-105"
                          : "border-gray-200 hover:border-gray-300"
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
            <Card className="mt-6 h-fit">
              <CardContent className="p-4">
                <h2 className="text-xl font-bold mb-4">Описание</h2>
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Product Info & Actions */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-white to-blue-50/50 border-purple-200 h-fit">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <Badge className="bg-green-100 text-green-800 mb-2">
                      Б/у
                    </Badge>
                    <h1 className="text-xl font-bold mb-2">{product.title}</h1>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-500 hover:text-gray-700 transition-colors"
                      onClick={() => {
                        /* Меню действий */
                      }}
                    >
                      <Icon name="MoreHorizontal" size={20} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700 transition-colors"
                      onClick={() => {
                        /* Добавить в избранное */
                      }}
                    >
                      <Icon name="Heart" size={20} />
                    </Button>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-baseline space-x-3">
                    <p className="text-3xl font-bold text-gray-900">
                      {product.price.toLocaleString()} ₽
                    </p>
                    <p className="text-lg text-gray-500 line-through">
                      {(product.price + 15000).toLocaleString()} ₽
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
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
                  <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 h-12 text-white font-semibold"
                    onClick={() => navigate("/avito/delivery")}
                  >
                    Запросить доставку
                  </Button>
                  <div className="text-sm text-gray-600 space-y-1 px-2">
                    <p>Авито Доставка.</p>
                    <p>Гарантия возврата денег, если товар не подойдёт</p>
                    <button
                      className="text-blue-600 hover:underline transition-colors"
                      onClick={() => navigate("/avito/delivery-info")}
                    >
                      Об Авито Доставке
                    </button>
                  </div>

                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 h-12"
                    onClick={() => navigate("/avito/chat")}
                  >
                    <Icon name="MessageCircle" size={18} className="mr-2" />
                    Написать продавцу
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full h-12 border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors"
                    onClick={() => navigate("/avito/phone")}
                  >
                    <Icon name="Phone" size={18} className="mr-2" />
                    Показать телефон
                  </Button>
                </div>

                <p className="text-sm text-gray-500 mt-4">
                  Размещено {product.publishedAt}
                </p>
              </CardContent>
            </Card>

            {/* Seller Info */}
            <Card className="mt-6 h-fit">
              <CardContent className="p-4">
                <h3 className="font-bold mb-3">Продавец</h3>
                <div className="flex items-start gap-3">
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
                <Button
                  variant="outline"
                  className="w-full mt-3 h-10 hover:bg-gray-50 transition-colors"
                  onClick={() =>
                    navigate(`/avito/seller/${product.seller.name}`)
                  }
                >
                  Все объявления продавца
                </Button>
              </CardContent>
            </Card>

            {/* Safety Tips */}
            <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50 mt-6 h-fit">
              <CardContent className="p-4">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Card className="bg-gradient-to-br from-white to-purple-50/30">
          <CardContent className="p-4">
            <h2 className="text-xl font-bold mb-4">Спросите у продавца</h2>
            <div className="space-y-3">
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="Здравствуйте!"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                />
                <Button
                  className="bg-purple-600 hover:bg-purple-700 px-4 py-2"
                  onClick={() => navigate("/avito/chat")}
                >
                  <Icon name="Send" size={16} />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Где и когда можно посмотреть?",
                  "Ещё продаёте?",
                  "Торг уместен?",
                  "Отправите Авито Доставкой?",
                ].map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors text-xs px-2 py-1"
                    onClick={() => navigate("/avito/chat")}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Similar Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Похожие объявления</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((item) => (
                  <button
                    key={item}
                    className="border rounded-lg p-4 hover:shadow-lg transition-all duration-200 text-left"
                    onClick={() => navigate(`/avito/product/${item}`)}
                  >
                    <div className="aspect-square bg-gray-200 rounded-lg mb-3"></div>
                    <h3 className="font-semibold mb-2">iPhone 14 Pro Max</h3>
                    <p className="text-xl font-bold text-green-600 mb-1">
                      95 000 ₽
                    </p>
                    <p className="text-sm text-gray-600">Москва</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Как новое, но дешевле</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((item) => (
                  <button
                    key={item}
                    className="border rounded-lg p-4 hover:shadow-lg transition-all duration-200 text-left"
                    onClick={() => navigate(`/avito/product/new-${item}`)}
                  >
                    <div className="aspect-square bg-gray-200 rounded-lg mb-3"></div>
                    <h3 className="font-semibold mb-2">
                      iPhone 14 {item === 1 ? "Pro" : ""}
                    </h3>
                    <p className="text-xl font-bold text-green-600 mb-1">
                      {75000 + item * 5000} ₽
                    </p>
                    <p className="text-sm text-gray-600">Москва</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Может быть интересно</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((item) => (
                  <button
                    key={item}
                    className="border rounded-lg p-4 hover:shadow-lg transition-all duration-200 text-left"
                    onClick={() => navigate(`/avito/product/samsung-${item}`)}
                  >
                    <div className="aspect-square bg-gray-200 rounded-lg mb-3"></div>
                    <h3 className="font-semibold mb-2">Samsung Galaxy S23</h3>
                    <p className="text-xl font-bold text-green-600 mb-1">
                      {60000 + item * 3000} ₽
                    </p>
                    <p className="text-sm text-gray-600">Москва</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <AvitoFooter />
    </div>
  );
};

export default AvitoProduct;
