import { useParams } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";

const ProductPage = () => {
  const { productId } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("Серый");
  const [quantity, setQuantity] = useState(1);

  // Mock data - в реальном приложении загружать по productId
  const product = {
    id: productId,
    title: "Наушники Buds3 Pro (беспроводная зарядка)",
    sku: "WVP-43436208298",
    rating: 5.0,
    reviewsCount: 17,
    price: 890,
    oldPrice: 1200,
    discount: 26,
    seller: "OnShop",
    sellerRating: 5.0,
    images: [
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400",
      "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=400",
    ],
    variants: [
      { name: "Серый", price: 890, stock: 34 },
      { name: "Белый", price: 890, stock: 25 },
    ],
    description:
      "Беспроводные внутриканальные наушники в полностью переработанном дизайне. Легкие, удобные и эргономичные.",
    features: [
      "Возврат денег",
      "Способы оплаты",
      "Условия доставки",
      "Возврат товаров",
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center text-sm text-gray-600 space-x-2">
            <span>Главная</span>
            <Icon name="ChevronRight" size={14} />
            <span>Электроника</span>
            <Icon name="ChevronRight" size={14} />
            <span>Аудиотехника</span>
            <Icon name="ChevronRight" size={14} />
            <span className="text-gray-900">Наушники и гарнитура</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-16 h-16 rounded-md overflow-hidden border-2 ${
                    selectedImage === index
                      ? "border-primary"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {product.title}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>Артикул: {product.sku}</span>
                <span>Продано: 625</span>
                <span>Склад: Москва</span>
              </div>
              <div className="flex items-center mt-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={16}
                      className="text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm font-medium">
                  {product.rating}
                </span>
                <span className="ml-1 text-sm text-gray-500">
                  {product.reviewsCount} отзывов
                </span>
                <Button
                  variant="link"
                  size="sm"
                  className="text-blue-600 p-0 ml-2"
                >
                  В избранное
                </Button>
              </div>
            </div>

            {/* Price */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-3xl font-bold text-gray-900">
                  {product.price} ₽
                </span>
                {product.oldPrice && (
                  <>
                    <span className="text-lg text-gray-500 line-through">
                      {product.oldPrice} ₽
                    </span>
                    <Badge variant="destructive">-{product.discount}%</Badge>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-600">Без скидки</p>
            </div>

            {/* Variants */}
            <div>
              <h3 className="font-medium mb-3">{selectedColor} (wireless)</h3>
              <div className="flex space-x-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.name}
                    onClick={() => setSelectedColor(variant.name)}
                    className={`px-4 py-2 rounded-md border ${
                      selectedColor === variant.name
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {variant.name}
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Осталось:{" "}
                {product.variants.find((v) => v.name === selectedColor)?.stock}
                шт
              </p>
            </div>

            {/* Quantity */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-100"
                >
                  <Icon name="Minus" size={16} />
                </button>
                <span className="px-4 py-2 min-w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-100"
                >
                  <Icon name="Plus" size={16} />
                </button>
              </div>
              <Button className="flex-1" size="lg">
                В корзину
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-4 gap-2">
              {product.features.map((feature) => (
                <Button
                  key={feature}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  {feature}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Seller Info */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">On</span>
                </div>
                <div>
                  <h3 className="font-medium">{product.seller}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Icon
                      name="Star"
                      size={12}
                      className="text-yellow-400 fill-current"
                    />
                    <span>{product.sellerRating}</span>
                    <span>3719 отзывов</span>
                  </div>
                </div>
              </div>
              <div className="text-right text-sm">
                <div className="text-gray-600">962 товаров</div>
                <div className="text-gray-600">7000+ продаж</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">О товаре</h2>
            <h3 className="font-medium mb-2">Наушники Galaxyy Buds3 Pro</h3>
            <p className="text-gray-700">{product.description}</p>

            <Separator className="my-6" />

            <h2 className="text-xl font-bold mb-4">Гарантии</h2>
            <p className="text-gray-700">
              Мы предоставляем гарантию 30 дней с момента получения вами товара.
              Гарантия распространяется на заводской брак!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductPage;
