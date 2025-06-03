import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Separator } from "@/components/ui/separator";

interface SellerProfileProps {
  id: number;
  name: string;
  rating: number;
  reviewsCount: number;
  joinDate: string;
  avatar: string;
  isVerified: boolean;
  responseTime: string;
  location: string;
  description: string;
  totalSales: number;
}

const SellerProfile = ({
  name,
  rating,
  reviewsCount,
  joinDate,
  avatar,
  isVerified,
  responseTime,
  location,
  description,
  totalSales,
}: SellerProfileProps) => {
  return (
    <Card className="max-w-md">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <img
              src={avatar}
              alt={name}
              className="w-20 h-20 rounded-full object-cover"
            />
            {isVerified && (
              <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                <Icon name="Check" size={12} className="text-white" />
              </div>
            )}
          </div>
        </div>
        <CardTitle className="text-xl">{name}</CardTitle>
        <div className="flex items-center justify-center space-x-2 mt-2">
          <div className="flex items-center">
            <Icon
              name="Star"
              size={16}
              className="text-yellow-400 fill-current mr-1"
            />
            <span className="font-semibold">{rating}</span>
          </div>
          <span className="text-gray-500">•</span>
          <span className="text-sm text-gray-600">{reviewsCount} отзывов</span>
        </div>
        <div className="flex justify-center space-x-2 mt-3">
          {isVerified && (
            <Badge className="bg-green-100 text-green-700">
              <Icon name="Shield" size={12} className="mr-1" />
              Проверенный продавец
            </Badge>
          )}
          <Badge variant="outline" className="border-blue-200 text-blue-600">
            <Icon name="Lock" size={12} className="mr-1" />
            Безопасная сделка
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">На сайте с:</span>
            <div className="font-medium">{joinDate}</div>
          </div>
          <div>
            <span className="text-gray-500">Время ответа:</span>
            <div className="font-medium">{responseTime}</div>
          </div>
          <div>
            <span className="text-gray-500">Местоположение:</span>
            <div className="font-medium">{location}</div>
          </div>
          <div>
            <span className="text-gray-500">Продаж:</span>
            <div className="font-medium">{totalSales}</div>
          </div>
        </div>

        <Separator />

        <div>
          <h4 className="font-medium mb-2">О продавце</h4>
          <p className="text-sm text-gray-600">{description}</p>
        </div>

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
  );
};

export default SellerProfile;
