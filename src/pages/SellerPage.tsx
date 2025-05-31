import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SellerPage = () => {
  const { sellerId } = useParams();

  const isVerified = sellerId === "1";

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
    <div className="min-h-screen bg-gray-50 font-roboto">
      <Header />

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-primary to-purple-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Магазин {seller.name}</h2>
              <p className="text-lg opacity-90">
                Официальный продавец электроники
              </p>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 rounded-lg px-4 py-2">
              <Icon
                name="Star"
                size={20}
                className="text-yellow-400 fill-current"
              />
              <span className="font-medium">{seller.rating}</span>
              <span className="opacity-90">
                ({seller.reviewsCount} отзывов)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          <a href="/" className="hover:text-primary">
            Главная
          </a>
          <Icon name="ChevronRight" size={16} />
          <a href="/marketplace" className="hover:text-primary">
            Маркетплейс
          </a>
          <Icon name="ChevronRight" size={16} />
          <span className="text-gray-900">Продавец {seller.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Seller Info */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">On</span>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold">{seller.name}</h1>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div
                            className={`flex items-center justify-center w-6 h-6 rounded-full ${
                              isVerified ? "bg-green-100" : "bg-red-100"
                            }`}
                          >
                            <Icon
                              name={isVerified ? "Check" : "X"}
                              size={14}
                              className={
                                isVerified ? "text-green-600" : "text-red-600"
                              }
                            />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            {isVerified
                              ? "Верифицированный продавец IdenMarket"
                              : "Продавец не верифицирован"}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="flex items-center space-x-4 text-gray-600 mb-2">
                    <span>На площадке с {seller.joinDate}</span>
                    <span>•</span>
                    <span>{seller.totalProducts} товаров</span>
                    <span>•</span>
                    <span>{seller.totalSales}+ продаж</span>
                  </div>
                  <p className="text-gray-700 max-w-2xl">
                    {seller.description}
                  </p>
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
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Товары продавца</h2>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Icon name="Filter" size={16} className="mr-2" />
                Фильтры
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="ArrowUpDown" size={16} className="mr-2" />
                Сортировка
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card
                key={product.id}
                className="group hover:shadow-lg transition-all duration-200 border-gray-200 hover:border-primary/20"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {product.title}
                  </h3>

                  <div className="flex items-center mb-3">
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
                    <span className="ml-2 text-xs text-gray-500">
                      ({product.reviews})
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-gray-900">
                        {product.price.toLocaleString()} ₽
                      </span>
                      {product.oldPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          {product.oldPrice.toLocaleString()} ₽
                        </span>
                      )}
                    </div>

                    <Button className="w-full" size="sm">
                      В корзину
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Icon name="MessageCircle" size={20} className="mr-2" />
              Связаться с продавцом
            </CardTitle>
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
