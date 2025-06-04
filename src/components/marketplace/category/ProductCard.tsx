import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useCart } from "@/hooks/useCart";

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
  const { state, dispatch } = useCart();

  const cartItem = state.items.find((item) => item.id === id);
  const isFavorite = state.favorites.includes(id);

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { id, title, price, image },
    });
  };

  const handleUpdateQuantity = (newQuantity: number) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id, quantity: newQuantity },
    });
  };

  const handleToggleFavorite = () => {
    dispatch({
      type: "TOGGLE_FAVORITE",
      payload: id,
    });
  };

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
            {/* Title */}
            <h3 className="text-xl font-semibold text-gray-900 mb-3 hover:text-blue-600 cursor-pointer transition-colors line-clamp-2">
              {title}
            </h3>

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

            {/* Price and Actions */}
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {price.toLocaleString()} ₽
                  </span>
                  {oldPrice && (
                    <span className="text-lg text-gray-400 line-through">
                      {oldPrice.toLocaleString()} ₽
                    </span>
                  )}
                </div>
                {isDeliveryFree && (
                  <div className="flex items-center text-sm text-green-600 font-medium">
                    <Icon name="Truck" size={14} className="mr-1" />
                    Бесплатная доставка
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  className={`rounded-full hover:bg-red-50 hover:border-red-200 ${
                    isFavorite ? "bg-red-50 border-red-200" : ""
                  }`}
                  onClick={handleToggleFavorite}
                >
                  <Icon
                    name="Heart"
                    size={18}
                    className={`transition-colors ${
                      isFavorite
                        ? "text-red-500 fill-current"
                        : "hover:text-red-500"
                    }`}
                  />
                </Button>

                {cartItem ? (
                  <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-white"
                      onClick={() =>
                        handleUpdateQuantity(cartItem.quantity - 1)
                      }
                    >
                      <Icon name="Minus" size={14} />
                    </Button>
                    <span className="font-semibold text-sm min-w-[20px] text-center">
                      {cartItem.quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-white"
                      onClick={() =>
                        handleUpdateQuantity(cartItem.quantity + 1)
                      }
                    >
                      <Icon name="Plus" size={14} />
                    </Button>
                  </div>
                ) : (
                  <Button
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold"
                    onClick={handleAddToCart}
                  >
                    В корзину
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
