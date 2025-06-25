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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button
              variant="ghost"
              onClick={() => navigate("/avito")}
              className="flex items-center space-x-2"
            >
              <Icon name="ArrowLeft" size={20} />
              <span className="text-2xl font-bold text-blue-600">AVITO</span>
            </Button>
            <Button
              onClick={() => navigate("/avito/sell")}
              className="bg-green-600 hover:bg-green-700"
            >
              <Icon name="Plus" size={16} className="mr-2" />
              Подать объявление
            </Button>
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
            <Card>
              <CardContent className="p-6">
                <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
                <p className="text-3xl font-bold text-green-600 mb-4">
                  {product.price.toLocaleString()} ₽
                </p>

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
                  <Button className="w-full bg-green-600 hover:bg-green-700 h-12">
                    <Icon name="MessageCircle" size={18} className="mr-2" />
                    Написать продавцу
                  </Button>
                  <Button variant="outline" className="w-full h-12">
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
            <Card className="border-orange-200 bg-orange-50">
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
    </div>
  );
};

export default AvitoProduct;
