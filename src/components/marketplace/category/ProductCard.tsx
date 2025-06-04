import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  oldPrice?: number | null;
  rating: number;
  reviewsCount: number;
  image: string;
  seller: string;
  sellerRating?: number;
  isVerifiedSeller?: boolean;
  isSafeTransaction?: boolean;
  discount?: number | null;
  isDeliveryFree?: boolean;
  features?: string[];
  specs?: {
    screen?: string;
    technology?: string;
    memory?: string;
    camera?: string;
  };
}

const ProductCard = ({
  id,
  title,
  price,
  oldPrice,
  rating,
  reviewsCount,
  image,
  seller,
  sellerRating = 4.5,
  isVerifiedSeller = false,
  isSafeTransaction = false,
  discount,
  isDeliveryFree = false,
  features = [],
  specs = {},
}: ProductCardProps) => {
  const colors = [
    { name: "Синий", color: "bg-blue-600" },
    { name: "Белый", color: "bg-gray-100 border border-gray-300" },
  ];

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex gap-6">
          {/* Product Image */}
          <div className="flex-shrink-0">
            <div className="relative">
              <img
                src={image}
                alt={title}
                className="w-32 h-40 object-contain rounded-lg"
              />
              {discount && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2"
                >
                  -{discount}%
                </Badge>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            {/* Price */}
            <div className="mb-3">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-2xl font-bold text-gray-900">
                  {price.toLocaleString()} ₽
                </span>
                {oldPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    {oldPrice.toLocaleString()} ₽
                  </span>
                )}
              </div>
              {isDeliveryFree && (
                <div className="flex items-center text-sm text-green-600">
                  <Icon name="Truck" size={14} className="mr-1" />
                  Бесплатная доставка
                </div>
              )}
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary cursor-pointer transition-colors">
              {title}
            </h3>

            {/* Color Options */}
            <div className="flex items-center space-x-2 mb-3">
              {colors.map((color, index) => (
                <button
                  key={index}
                  className={`w-6 h-6 rounded-full ${color.color} ${
                    index === 0 ? "ring-2 ring-blue-500 ring-offset-2" : ""
                  }`}
                  title={color.name}
                />
              ))}
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-2 mb-3">
              {features.map((feature, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {feature}
                </Badge>
              ))}
            </div>

            {/* Specifications */}
            <div className="text-sm text-gray-600 space-y-1 mb-4">
              {specs.screen && <div>Экран: {specs.screen}</div>}
              {specs.technology && (
                <div>Технология экрана: {specs.technology}</div>
              )}
              {specs.memory && (
                <div>Встроенная память (ROM): {specs.memory}</div>
              )}
              {specs.camera && <div>Основная камера МПикс: {specs.camera}</div>}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button className="px-6">В корзину</Button>
                <Button variant="outline" size="icon">
                  <Icon name="Heart" size={16} />
                </Button>
              </div>

              {/* Rating */}
              <div className="flex items-center">
                <div className="flex items-center mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={14}
                      className={
                        i < Math.floor(rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {rating} ({reviewsCount})
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
