import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Separator } from "@/components/ui/separator";
import ProductGrid from "@/components/ProductGrid";

const SellerPage = () => {
  const { sellerId } = useParams();

  // Mock seller data
  const seller = {
    id: 1,
    name: "ТехноМир",
    rating: 4.8,
    reviewsCount: 2847,
    joinDate: "Февраль 2020",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    isVerified: true,
    responseTime: "в течение часа",
    location: "Москва",
    description:
      "Официальный дилер электроники с гарантией качества. Продаем только оригинальную технику с официальной гарантией.",
    totalSales: 15420,
    safeDeals: 14890,
    completedOrders: 15200,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <span>Главная</span>
        <Icon name="ChevronRight" size={16} />
        <span>Продавцы</span>
        <Icon name="ChevronRight" size={16} />
        <span className="text-gray-900">{seller.name}</span>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Seller Profile Card */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <img
                    src={seller.avatar}
                    alt={seller.name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  {seller.isVerified && (
                    <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1.5">
                      <Icon name="Check" size={14} className="text-white" />
                    </div>
                  )}
                </div>
              </div>
              <CardTitle className="text-xl">{seller.name}</CardTitle>

              {/* Rating */}
              <div className="flex items-center justify-center space-x-2 mt-2">
                <div className="flex items-center">
                  <Icon
                    name="Star"
                    size={16}
                    className="text-yellow-400 fill-current mr-1"
                  />
                  <span className="font-semibold">{seller.rating}</span>
                </div>
                <span className="text-gray-500">•</span>
                <span className="text-sm text-gray-600">
                  {seller.reviewsCount} отзывов
                </span>
              </div>

              {/* Verification Badge */}
              <div className="flex justify-center mt-3">
                {seller.isVerified ? (
                  <Badge className="bg-green-100 text-green-700">
                    <Icon name="Shield" size={12} className="mr-1" />
                    Верифицирован
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="border-gray-300 text-gray-600"
                  >
                    <Icon name="AlertCircle" size={12} className="mr-1" />
                    Не верифицирован
                  </Badge>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Stats */}
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-gray-500 block">
                    Выполненных заказов:
                  </span>
                  <div className="font-bold text-lg">
                    {seller.completedOrders.toLocaleString()}
                  </div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <span className="text-gray-500 block">
                    Безопасных сделок:
                  </span>
                  <div className="font-bold text-lg text-green-600">
                    {seller.safeDeals.toLocaleString()}
                  </div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <span className="text-gray-500 block">Время ответа:</span>
                  <div className="font-medium">{seller.responseTime}</div>
                </div>
              </div>

              <Separator />

              {/* Additional Info */}
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-500">На сайте с:</span>
                  <div className="font-medium">{seller.joinDate}</div>
                </div>
                <div>
                  <span className="text-gray-500">Местоположение:</span>
                  <div className="font-medium">{seller.location}</div>
                </div>
              </div>

              <Separator />

              {/* Description */}
              <div>
                <h4 className="font-medium mb-2">О продавце</h4>
                <p className="text-sm text-gray-600">{seller.description}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <Button className="flex-1">
                  <Icon name="MessageCircle" size={16} className="mr-2" />
                  Написать
                </Button>
                <Button variant="outline">
                  <Icon name="UserPlus" size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products Section */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">
                Товары продавца
              </h1>
              <Badge variant="secondary">324 товара</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Сортировка:</span>
              <select className="text-sm border border-gray-300 rounded-md px-3 py-1">
                <option>По популярности</option>
                <option>По цене ↑</option>
                <option>По цене ↓</option>
                <option>По рейтингу</option>
                <option>По новизне</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <ProductGrid />
        </div>
      </div>
    </div>
  );
};

export default SellerPage;
