import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import Header from "@/components/marketplace/Header";
import Footer from "@/components/marketplace/Footer";
import ProductCard from "@/components/marketplace/category/ProductCard";
import SellerCard from "@/components/marketplace/seller/SellerCard";
import ReviewsSection from "@/components/marketplace/product/ReviewsSection";

const ProductPage = () => {
  const { productId } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("Черный");
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const product = {
    id: productId,
    title: "Умная колонка Яндекс Станция Миди с Алисой на YandexGPT, черный, Zigbee",
    sku: "WVP-43436208298",
    rating: 4.8,
    reviewsCount: 1,
    price: 13256,
    oldPrice: 13900,
    discount: 1,
    seller: "Яндекс",
    sellerRating: 4.9,
    images: [
      "https://avatars.mds.yandex.net/get-mpic/12022975/img_id7796576580293210593.jpeg/optimize",
      "https://avatars.mds.yandex.net/get-mpic/11375994/img_id2766794769389617093.jpeg/optimize",
      "https://avatars.mds.yandex.net/get-mpic/11396163/img_id6929256959829280646.jpeg/optimize",
      "https://avatars.mds.yandex.net/get-mpic/11375994/img_id3226931699529867472.jpeg/optimize",
      "https://avatars.mds.yandex.net/get-mpic/11722550/img_id1179285727551659135.jpeg/optimize",
      "https://avatars.mds.yandex.net/get-mpic/11368570/img_id698259707709021025.jpeg/optimize",
    ],
    variants: [
      { name: "Черный", price: 13256, stock: 12 },
      { name: "Белый", price: 13256, stock: 8 },
    ],
    description:
      "Яндекс Станция Миди — новая умная колонка с виртуальным ассистентом Алисой. Мощное звучание 24 Вт в таком компактном корпусе. Благодаря переходу на нейронный процессор Станция Миди быстрее обрабатывает ваши запросы. А значит, Алиса лучше откликается на команды и точнее узнаёт людей по голосу. LED-дисплей, который показывает время, погоду и реакции Алисы, а также активная контурная LED-подсветка. Встроенный хаб управления Zigbee™¹ и голосовое управление умным домом даже без интернета². Беспроводная связь Wi-Fi (2,4–5 ГГц) и Bluetooth 5.0. Новый размер и узнаваемый дизайн — Станция Миди впишется в любое пространство вашего дома.Теперь Алиса работает с нейросетью YandexGPT, которая позволила улучшить сценарии работы виртуального ассистента №1*.\nПомогает вам придумывать идеи, объясняет сложное простыми словами, общается как интересный собеседник - теперь Алиса лучше удерживает контекст разговора и задаёт вопросы, когда хочет что-то уточнить.\nМощный звук с выраженными басами",
    features: ["Алиса живёт здесь", "Умная колонка", "Вес 2.7 кг"],
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Breadcrumbs */}
      <div className="border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center text-sm text-gray-600 space-x-2">
            <Link to="/marketplace/category/auto" className="hover:text-primary">
              Каталог
            </Link>
            <Icon name="ChevronRight" size={14} />
            <Link to="/marketplace/category/auto">
              <span className="text-gray-900">Электроника</span>
            </Link>
            <Icon name="ChevronRight" size={14} />
            <Link to="/marketplace/category/auto">
              <span className="text-gray-900">Умные колонки</span>
            </Link>
            <Icon name="ChevronRight" size={14} />
            <Link to="/marketplace/category/auto">
              <span className="text-gray-900">Умные колонки Яндекс</span>
            </Link>
            <Icon name="ChevronRight" size={14} />
            <Link to="/marketplace/category/auto">
              <span className="text-blue-600">Яндекс</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
            <SellerCard
              id="1"
              name="ООО Августина Прекрасная"
              avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
              rating={4.9}
              reviewsCount={1247}
              isVerified={true}
              responseTime="в течение часа"
            />
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-100 p-1 rounded-xl">
              <TabsTrigger value="description" className="rounded-lg">
                Описание
              </TabsTrigger>
              <TabsTrigger value="specs" className="rounded-lg">
                Характеристики
              </TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-lg">
                Отзывы
              </TabsTrigger>
              <TabsTrigger value="similar" className="rounded-lg">
                Похожие товары
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="prose max-w-none">
                    <p className="text-gray-700 text-lg leading-relaxed mb-6">
                      {product.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold text-lg mb-3">
                          Особенности
                        </h3>
                        <ul className="space-y-2 text-gray-700">
                          <li>• Голосовой помощник Алиса</li>
                          <li>• Мощный звук 65 Вт</li>
                          <li>• Поддержка Zigbee для умного дома</li>
                          <li>• Встроенный хаб для управления устройствами</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specs" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-lg mb-4">
                        Основные характеристики
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                          <span className="text-gray-600">Размеры</span>
                          <span className="font-medium">23×23×11 см</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                          <span className="text-gray-600">Вес</span>
                          <span className="font-medium">2.7 кг</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                          <span className="text-gray-600">Мощность звука</span>
                          <span className="font-medium">65 Вт</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                          <span className="text-gray-600">Подключение</span>
                          <span className="font-medium">Wi-Fi, Bluetooth</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Питание</span>
                          <span className="font-medium">от сети 220В</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <ReviewsSection
                totalReviews={314}
                averageRating={4.9}
                ratingDistribution={[
                  { stars: 5, count: 306 },
                  { stars: 4, count: 3 },
                  { stars: 3, count: 1 },
                  { stars: 2, count: 2 },
                  { stars: 1, count: 2 },
                ]}
              />
            </TabsContent>

            <TabsContent value="similar" className="mt-6">
              <div>
                <h2 className="text-xl font-bold mb-6">Похожие товары</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {similarProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

// Similar products data
const similarProducts = [
  {
    id: "2",
    title: "Умная колонка VK Капсула Мини",
    price: 8990,
    oldPrice: 12990,
    discount: 31,
    rating: 4.6,
    reviewsCount: 892,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    seller: "VK",
    sellerRating: 4.8,
    features: ["Голосовой помощник", "Компактная", "Bluetooth"],
  },
  {
    id: "3",
    title: "Умная колонка Sber SberBox",
    price: 11990,
    oldPrice: 14990,
    discount: 20,
    rating: 4.4,
    reviewsCount: 634,
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400",
    seller: "Сбер",
    sellerRating: 4.7,
    features: ["Салют", "4K видео", "Голосовые команды"],
  },
  {
    id: "4",
    title: "Умная колонка Яндекс.Станция Лайт",
    price: 6990,
    oldPrice: 8990,
    discount: 22,
    rating: 4.7,
    reviewsCount: 1156,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    seller: "Яндекс",
    sellerRating: 4.9,
    features: ["Алиса", "Компактная", "LED-подсветка"],
  },
  {
    id: "5",
    title: "Умная колонка Mail.ru Капсула",
    price: 9990,
    oldPrice: 13990,
    discount: 29,
    rating: 4.3,
    reviewsCount: 521,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400",
    seller: "Mail.ru",
    sellerRating: 4.5,
    features: ["Маруся", "Умный дом", "Стриминг"],
  },
];

export default ProductPage;
