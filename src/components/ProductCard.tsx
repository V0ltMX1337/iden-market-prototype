import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  seller: string;
  discount?: number;
  isDeliveryFree?: boolean;
}

const ProductCard = ({
  title,
  price,
  oldPrice,
  rating,
  reviewsCount,
  image,
  seller,
  discount,
  isDeliveryFree = false,
}: ProductCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200 cursor-pointer">
      <CardContent className="p-4">
        {/* Image */}
        <div className="relative mb-3">
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover rounded-md group-hover:scale-105 transition-transform duration-200"
          />
          {discount && (
            <Badge variant="destructive" className="absolute top-2 left-2">
              -{discount}%
            </Badge>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 hover:bg-white"
          >
            <Icon name="Heart" size={16} />
          </Button>
        </div>

        {/* Title */}
        <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Icon
                key={i}
                name={i < Math.floor(rating) ? "Star" : "Star"}
                size={12}
                className={
                  i < Math.floor(rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">
            {rating} ({reviewsCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-900">
                {price.toLocaleString()} ₽
              </span>
              {oldPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {oldPrice.toLocaleString()} ₽
                </span>
              )}
            </div>
            {isDeliveryFree && (
              <div className="flex items-center text-xs text-green-600 mt-1">
                <Icon name="Truck" size={12} className="mr-1" />
                Бесплатная доставка
              </div>
            )}
          </div>
        </div>

        {/* Seller */}
        <div className="text-xs text-gray-500 mb-3">от {seller}</div>

        {/* Actions */}
        <div className="flex space-x-2">
          <Button className="flex-1" size="sm">
            <Icon name="ShoppingCart" size={14} className="mr-1" />В корзину
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="Eye" size={14} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
