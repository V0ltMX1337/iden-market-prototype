import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const SellerPage = () => {
  const { sellerId } = useParams();

  const seller = {
    id: sellerId,
    name: "OnShop",
    rating: 5.0,
    reviewsCount: 3719,
    totalProducts: 962,
    totalSales: 7000,
    joinDate: "2019",
    description:
      "Официальный магазин электроники и аксессуаров. Гарантия качества на все товары.",
    features: [
      "Быстрая доставка",
      "Официальная гарантия",
      "Качественная упаковка",
      "Поддержка 24/7",
    ],
  };

  const products = [
    {
      id: "1",
      title: "Наушники Buds3 Pro",
      price: 890,
      oldPrice: 1200,
      image:
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=300",
      rating: 5.0,
      reviews: 17,
    },
    {
      id: "2",
      title: "Смартфон Galaxy S24",
      price: 45900,
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300",
      rating: 4.8,
      reviews: 89,
    },
    {
      id: "3",
      title: "Планшет iPad Air",
      price: 32990,
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300",
      rating: 4.9,
      reviews: 45,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Store" size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold">Поехали</span>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Icon name="Heart" size={18} className="mr-2" />
                Избранное
              </Button>
              <Button variant="ghost" size="sm">
                <Icon name="ShoppingCart" size={18} className="mr-2" />
                Корзина
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Seller Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">On</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-2">{seller.name}</h1>
                  <div className="flex items-center space-x-4 text-gray-600 mb-2">
                    <div className="flex items-center">
                      <Icon
                        name="Star"
                        size={16}
                        className="text-yellow-400 fill-current mr-1"
                      />
                      <span className="font-medium">{seller.rating}</span>
                      <span className="ml-1">
                        ({seller.reviewsCount} отзывов)
                      </span>
                    </div>
                    <span>•</span>
                    <span>На площадке с {seller.joinDate}</span>
                  </div>
                  <p className="text-gray-700 max-w-2xl">
                    {seller.description}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="space-y-2 text-sm text-gray-600">
                  <div>{seller.totalProducts} товаров</div>
                  <div>{seller.totalSales}+ продаж</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {seller.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm">
                  <Icon name="Check" size={14} className="text-green-600" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Products Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Товары продавца</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card
                key={product.id}
                className="group hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2 group-hover:text-primary transition-colors">
                    {product.title}
                  </h3>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={12}
                          className={`${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-1 text-xs text-gray-500">
                      ({product.reviews})
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold">{product.price} ₽</span>
                    {product.oldPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {product.oldPrice} ₽
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <Card>
          <CardHeader>
            <CardTitle>Связаться с продавцом</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button className="w-full">
                <Icon name="MessageCircle" size={16} className="mr-2" />
                Написать сообщение
              </Button>
              <Button variant="outline" className="w-full">
                <Icon name="Phone" size={16} className="mr-2" />
                Позвонить
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SellerPage;
