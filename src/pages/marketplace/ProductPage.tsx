import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";
import Header from "@/components/marketplace/Header";
import Footer from "@/components/marketplace/Footer";

const ProductPage = () => {
  const { productId } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("Черный");
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const product = {
    id: productId,
    title: "Умная колонка Яндекс.Станция Макс",
    sku: "WVP-43436208298",
    rating: 4.8,
    reviewsCount: 1247,
    price: 15990,
    oldPrice: 18990,
    discount: 16,
    seller: "Яндекс",
    sellerRating: 4.9,
    images: [
      "https://cdn.poehali.dev/files/f9d8bc50-e27b-49e6-90c7-af9d4dff96f4.png",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400",
      "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=400",
    ],
    variants: [
      { name: "Черный", price: 15990, stock: 12 },
      { name: "Белый", price: 15990, stock: 8 },
    ],
    description:
      "Умная колонка с Алисой, мощным звуком и поддержкой всех популярных стриминговых сервисов.",
    features: ["Алиса живёт здесь", "Умная колонка", "Вес 2.7 кг"],
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Breadcrumbs */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center text-sm text-gray-600 space-x-2">
            <Link to="/marketplace" className="hover:text-primary">
              Каталог
            </Link>
            <Icon name="ChevronRight" size={14} />
            <span className="text-blue-600">Умная для дома</span>
            <Icon name="ChevronRight" size={14} />
            <span className="text-gray-900">Умная колонка</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-contain p-8"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? "border-blue-500 shadow-lg"
                      : "border-gray-200 hover:border-gray-300"
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

            {/* Features Tags */}
            <div className="flex flex-wrap gap-2 pt-4">
              {product.features.map((feature, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-3 py-1 rounded-full"
                >
                  {feature}
                </Badge>
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={16}
                      className={
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }
                    />
                  ))}
                  <span className="ml-2 font-medium">{product.rating}</span>
                  <span className="ml-1 text-gray-500">
                    ({product.reviewsCount} отзывов)
                  </span>
                </div>
              </div>
            </div>

            {/* Color Selection */}
            <div className="space-y-3">
              <div className="flex items-center space-x-4">
                {product.variants.map((variant) => (
                  <button
                    key={variant.name}
                    onClick={() => setSelectedColor(variant.name)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === variant.name
                        ? "border-blue-500 shadow-lg"
                        : "border-gray-300"
                    } ${variant.name === "Черный" ? "bg-gray-900" : "bg-white"}`}
                  />
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="space-y-4">
              <div className="flex items-baseline space-x-3">
                <span className="text-4xl font-bold text-gray-900">
                  {product.price.toLocaleString()} ₽
                </span>
                {product.oldPrice && (
                  <span className="text-xl text-gray-400 line-through">
                    {product.oldPrice.toLocaleString()} ₽
                  </span>
                )}
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex space-x-3">
              <Button
                size="lg"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-medium rounded-xl"
              >
                Добавить в корзину
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsFavorite(!isFavorite)}
                className="p-4 rounded-xl border-2"
              >
                <Icon
                  name="Heart"
                  size={20}
                  className={
                    isFavorite ? "text-red-500 fill-current" : "text-gray-400"
                  }
                />
              </Button>
            </div>

            {/* Installment */}
            <Card className="bg-gray-50 border-0">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">
                    Рассрочка и кредит
                  </h3>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-gray-600">Кредит от</span>
                    <span className="font-semibold">0 756 ₽/мес</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-gray-600">Рассрочка от</span>
                    <span className="font-semibold">0 756 ₽/мес</span>
                    <Badge variant="outline" className="text-xs">
                      Мокка
                    </Badge>
                    <span className="text-xs text-gray-500">
                      | оплата авансом
                    </span>
                    <Icon name="Info" size={14} className="text-gray-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery */}
            <Card className="bg-gray-50 border-0">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">
                    Способ получения заказа
                  </h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center space-x-2">
                      <Icon name="MapPin" size={16} className="text-blue-600" />
                      <span>Самовывоз из 4 точек в Санкт-Петербург</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Truck" size={16} className="text-green-600" />
                      <span>Доставка курьером • 24.04 от 390 ₽</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Seller */}
            <Card className="bg-gray-50 border-0">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">Продавец</h3>
                  <div className="space-y-1 text-sm">
                    <div className="font-medium text-blue-600">
                      ООО "Августина Прекрасная"
                    </div>
                    <div className="text-gray-600">ОГРН 345414823533450</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Description */}
        <Card className="mt-12">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6">Описание товара</h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {product.description}
              </p>

              <Separator className="my-6" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Особенности</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Голосовой помощник Алиса</li>
                    <li>• Мощный звук 65 Вт</li>
                    <li>• Поддержка Zigbee для умного дома</li>
                    <li>• Встроенный хаб для управления устройствами</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">
                    Технические характеристики
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Размеры: 23×23×11 см</li>
                    <li>• Вес: 2.7 кг</li>
                    <li>• Подключение: Wi-Fi, Bluetooth</li>
                    <li>• Питание: от сети 220В</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default ProductPage;
