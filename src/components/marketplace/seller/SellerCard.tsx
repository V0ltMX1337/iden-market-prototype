import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface SellerCardProps {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewsCount: number;
  isVerified?: boolean;
  responseTime?: string;
}

const SellerCard = ({
  id,
  name,
  avatar,
  rating,
  reviewsCount,
  isVerified = false,
  responseTime = "в течение часа",
}: SellerCardProps) => {
  return (
    <Card className="bg-gray-50 border-0">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Продавец</h3>
            <Link to={`/seller/${id}`}>
              <Button variant="outline" size="sm">
                Профиль
              </Button>
            </Link>
          </div>

          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={avatar}
                alt={name}
                className="w-12 h-12 rounded-full object-cover"
              />
              {isVerified && (
                <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                  <Icon name="Check" size={10} className="text-white" />
                </div>
              )}
            </div>

            <div className="flex-1">
              <Link
                to={`/seller/${id}`}
                className="font-medium text-blue-600 hover:text-blue-700"
              >
                {name}
              </Link>
              <div className="flex items-center space-x-2 text-sm">
                <div className="flex items-center">
                  <Icon
                    name="Star"
                    size={12}
                    className="text-yellow-400 fill-current"
                  />
                  <span className="ml-1 font-medium">{rating}</span>
                </div>
                <span className="text-gray-500">({reviewsCount} отзывов)</span>
              </div>
              <div className="text-xs text-gray-600">
                Отвечает {responseTime}
              </div>
            </div>
          </div>

          {isVerified && (
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              <Icon name="Shield" size={12} className="mr-1" />
              Проверенный продавец
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SellerCard;
