import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useState } from "react";

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
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  const colors = [
    { name: "Синий", color: "bg-blue-600" },
    { name: "Белый", color: "bg-gray-100 border border-gray-300" },
  ];

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white rounded-2xl overflow-hidden">
      <CardContent className="p-0">
        <div className="flex">
          {/* Product Image */}
          <div className="flex-shrink-0 p-6 bg-gray-50">
            <div className="relative">
              <img
                src={image}
                alt={title}
                className="w-40 h-48 object-contain rounded-xl"
              />
              {discount && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold"
                >
                  -{discount}%
                </Badge>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex-1 p-6">
            {/* Title and Price in one row */}
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 cursor-pointer transition-colors line-clamp-2 flex-1 mr-4">
                {title}
              </h3>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  {price.toLocaleString()} ₽
                </div>
                {oldPrice && (
                  <div className="text-sm text-gray-400 line-through">
                    {oldPrice.toLocaleString()} ₽
                  </div>
                )}
              </div>
            </div>

            {/* Cart and Favorite buttons */}
            <div className="flex items-center space-x-3 mb-4">
              {/* Quantity controls or Add to Cart */}
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={decreaseQuantity}
                  className="px-3 py-2 h-10 hover:bg-gray-100"
                >
                  <Icon name="Minus" size={16} />
                </Button>
                <div className="px-4 py-2 text-center min-w-[3rem] border-x border-gray-200 bg-white">
                  {quantity}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={increaseQuantity}
                  className="px-3 py-2 h-10 hover:bg-gray-100"
                >
                  <Icon name="Plus" size={16} />
                </Button>
              </div>

              {/* Add to Cart Button */}
              <Button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold h-10">
                <Icon name="ShoppingCart" size={16} className="mr-2" />
              </Button>

              {/* Favorite Button */}
              <Button
                variant="outline"
                size="icon"
                className="rounded-lg hover:bg-red-50 hover:border-red-200 h-10 w-10"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Icon
                  name="Heart"
                  size={16}
                  className={`transition-colors ${
                    isFavorite
                      ? "text-red-500 fill-current"
                      : "hover:text-red-500"
                  }`}
                />
              </Button>
            </div>

            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-3">
                {[...Array(5)].map((_, i) => (
                  <Icon
                    key={i}
                    name="Star"
                    size={16}
                    className={
                      i < Math.floor(rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 font-medium">
                {rating} • {reviewsCount} отзывов
              </span>
            </div>

            {/* Color Options */}
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-sm text-gray-600 mr-2">Цвет:</span>
              {colors.map((color, index) => (
                <button
                  key={index}
                  className={`w-7 h-7 rounded-full ${color.color} ${
                    index === 0 ? "ring-2 ring-blue-500 ring-offset-2" : ""
                  } hover:scale-110 transition-transform`}
                  title={color.name}
                />
              ))}
            </div>

            {/* Specifications */}
            <div className="text-sm text-gray-600 space-y-1 mb-6">
              {specs.screen && <div>• Экран: {specs.screen}</div>}
              {specs.technology && <div>• Технология: {specs.technology}</div>}
              {specs.memory && <div>• Память: {specs.memory}</div>}
              {specs.camera && <div>• Камера: {specs.camera}</div>}
            </div>

            {/* Delivery info */}
            <div className="flex items-center justify-between">
              {isDeliveryFree && (
                <div className="flex items-center text-sm text-green-600 font-medium">
                  <Icon name="Truck" size={14} className="mr-1" />
                  Бесплатная доставка
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
