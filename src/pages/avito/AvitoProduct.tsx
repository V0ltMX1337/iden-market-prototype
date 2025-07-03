import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import AvitoHeader from "@/components/avitomarket/AvitoHeader";
import AvitoFooter from "@/components/avitomarket/AvitoFooter";
import { storeApi } from "@/lib/store";
import { Star } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const AvitoProduct = () => {
  
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [ad, setAd] = useState<any>(null);
  const [author, setAuthor] = useState<any>(null);
  const [category, setCategory] = useState<any>(null);
  const [subcategoryName, setSubcategoryName] = useState<string | null>(null);
  const [userReviews, setUserReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [messageText, setMessageText] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);

  const questions = [
    "Где и когда можно посмотреть?",
    "Ещё продаёте?",
    "Торг уместен?",
    "Отправите Авито Доставкой?",
  ];

  const sendMessage = async (text?: string) => {
    const content = text ?? messageText;
    if (!content.trim()) return; // пустое сообщение не отправляем
    if (!user) {
      alert("Для отправки сообщения нужно войти в аккаунт");
      return;
    }
    try {
      if (!ad) return;
      await storeApi.sendMessage({
        adId: ad.id,
        senderId: user.id,
        receiverId: ad.userId,
        content: content.trim(),
      });
      alert("Сообщение отправлено");
      setMessageText(""); // очищаем поле
      setSelectedQuestion(null);
      navigate("/avito/chat");
    } catch (e) {
      alert("Ошибка при отправке сообщения");
    }
  };

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    storeApi
      .getAdById(id)
      .then(async (adData) => {
        setAd(adData);
        const [userData, categories] = await Promise.all([
          storeApi.getUserById(adData.userId),
          storeApi.getCategories(),
        ]);
        setAuthor(userData);
        const reviews = await storeApi.getReviewsByUserId(userData.id);
        setUserReviews(reviews);

        const foundCategory = categories.find((cat) => cat.id === adData.categoryId) || null;
        setCategory(foundCategory);

        if (foundCategory && adData.subcategorySlug) {
          const foundSubcategory = foundCategory.subcategories?.find(
            (sub: any) => sub.slug === adData.subcategorySlug
          );
          setSubcategoryName(foundSubcategory ? foundSubcategory.name : null);
        } else {
          setSubcategoryName(null);
        }
      })
      .catch(() => navigate("/avito"))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading)
    return (
      <div className="p-10 text-center text-gray-600 text-lg font-medium">
        Загрузка...
      </div>
    );

  if (!ad)
    return (
      <div className="p-10 text-center text-red-600 font-semibold">
        Объявление не найдено
      </div>
    );

  const product = {
    ...ad,
    seller: author,
    category: category && subcategoryName ? `${category.name} > ${subcategoryName}` : "",
  };

  // Вычисляем средний рейтинг пользователя
  const averageRating =
    userReviews.length > 0
      ? userReviews.reduce((acc, r) => acc + r.rating, 0) / userReviews.length
      : 0;

  // Отрисовка звезд (целых и половинных)
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<Star key={i} fill="gold" stroke="gold" />);
      } else if (rating >= i - 0.5) {
        stars.push(
          <Star
            key={i}
            fill="url(#half)"
            stroke="gold"
            style={{ clipPath: "inset(0 50% 0 0)" }}
          />
        );
      } else {
        stars.push(<Star key={i} stroke="gold" />);
      }
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50">
      <AvitoHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
          <button
            onClick={() => navigate("/avito")}
            className="hover:text-blue-600 transition-colors"
          >
            Главная
          </button>
          <Icon name="ChevronRight" size={16} />
          <span className="text-gray-900">{product.category}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Images and description */}
          <div className="lg:col-span-2">
            <Card className="h-fit">
              <CardContent className="p-4">
                <div className="aspect-[4/3] mb-4">
                  <img
                    src={product.links?.[currentImage] || ""}
                    alt={product.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div
                  className="flex gap-2 pb-2 overflow-x-auto scrollbar-none"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  <style>{`
                    div::-webkit-scrollbar {
                      display: none;
                    }
                  `}</style>
                  {product.images?.map((image: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        currentImage === index
                          ? "border-blue-500 scale-105"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6 h-fit">
              <CardContent className="p-4">
                <h2 className="text-xl font-bold mb-4">Описание</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{product.description}</p>
              </CardContent>
            </Card>
          </div>

          {/* Right: Product Info + Seller Info + Safety Tips */}
          <div className="space-y-6">
            {/* Product Info Card */}
            <Card className="bg-gradient-to-br from-white to-blue-50/50 border-purple-200 h-fit">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <Badge className="bg-green-100 text-green-800 mb-2">
                      {product.isUsed ? "Б/у" : "Новый"}
                    </Badge>
                    <h1 className="text-xl font-bold mb-2">{product.title}</h1>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 transition-colors">
                      <Icon name="MoreHorizontal" size={20} />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 transition-colors">
                      <Icon name="Heart" size={20} />
                    </Button>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-baseline space-x-3">
                    <p className="text-3xl font-bold text-gray-900">
                      {product.price?.toLocaleString()} ₽
                    </p>
                    <p className="text-lg text-gray-500 line-through">
                      {(product.price + 15000)?.toLocaleString()} ₽
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span className="flex items-center">
                    <Icon name="MapPin" size={16} className="mr-1" />
                    {product.location}
                  </span>
                  <span className="flex items-center">
                    <Icon name="Eye" size={16} className="mr-1" />
                    {product.views}
                  </span>
                  <span className="flex items-center">
                    <Icon name="Heart" size={16} className="mr-1" />
                    {product.favorites}
                  </span>
                </div>

                <div className="space-y-3">
                  <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 h-12 text-white font-semibold"
                    onClick={() => navigate("/avito/delivery")}
                  >
                    Запросить доставку
                  </Button>
                  <div className="text-sm text-gray-600 space-y-1 px-2">
                    <p>Trivo Доставка.</p>
                    <p>Гарантия возврата денег, если товар не подойдёт</p>
                    <button
                      className="text-blue-600 hover:underline transition-colors"
                      onClick={() => navigate("/avito/delivery-info")}
                    >
                      Об Trivo Доставке
                    </button>
                  </div>

                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 h-12"
                    onClick={() => navigate("/avito/chat")}
                  >
                    <Icon name="MessageCircle" size={18} className="mr-2" />
                    Написать продавцу
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full h-12 border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors"
                    onClick={() => navigate("/avito/phone")}
                  >
                    <Icon name="Phone" size={18} className="mr-2" />
                    Показать телефон
                  </Button>
                </div>

                <p className="text-sm text-gray-500 mt-4">
                  Размещено {product.publishedAt}
                </p>
              </CardContent>
            </Card>

            {/* Seller Info */}
            <Card className="mt-6 h-fit">
            <CardContent className="p-4">
              <h3 className="font-bold mb-3">Продавец</h3>
              <div className="flex items-start gap-4">
                <img
                  src={product.seller.avatar}
                  alt={`${product.seller.firstName} ${product.seller.lastName}`}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold">
                    {product.seller.firstName} {product.seller.lastName}
                  </h4>
                  <div className="text-sm text-gray-500">
                    • Пользователь с{" "}
                    {new Date(author.registrationDate).toLocaleDateString("ru-RU")}
                  </div>
                  {author.city.name}
                  <div className="flex items-center gap-1 mt-1 text-yellow-500">
                    {renderStars(averageRating)}
                    <span className="ml-2 text-gray-700 text-sm">
                      {averageRating.toFixed(1)} / 5 ({userReviews.length}) отзывов
                    </span>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full mt-3 h-10 hover:bg-gray-50 transition-colors"
                onClick={() => navigate(`/avito/seller/${product.seller.id}`)}
              >
                Все объявления продавца
              </Button>
            </CardContent>
          </Card>

            {/* Safety Tips */}
            <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50 mt-6 h-fit">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Icon name="Shield" size={20} className="text-orange-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-orange-800 mb-2">Безопасная сделка</h3>
                    <ul className="text-sm text-orange-700 space-y-1">
                      <li>• Встречайтесь в людных местах</li>
                      <li>• Проверяйте товар перед покупкой</li>
                      <li>• Не переводите деньги заранее</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Ask Seller Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Card className="bg-gradient-to-br from-white to-purple-50/30">
              <CardContent className="p-4">
                <h2 className="text-xl font-bold mb-4">Спросите у продавца</h2>
                <div className="space-y-3">
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Здравствуйте!"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          sendMessage();
                        }
                      }}
                    />
                    <Button
                      className="bg-purple-600 hover:bg-purple-700 px-4 py-2"
                      onClick={() => sendMessage()}
                      disabled={!messageText.trim()}
                    >
                      <Icon name="Send" size={16} />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {questions.map((question) => (
                      <Button
                        key={question}
                        variant={selectedQuestion === question ? "default" : "outline"}
                        size="sm"
                        className={`text-xs px-2 py-1 ${
                          selectedQuestion === question
                            ? "bg-purple-600 text-white"
                            : "bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100"
                        } transition-colors`}
                        onClick={() => {
                          setSelectedQuestion(question);
                          sendMessage(question);
                        }}
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

      {/* Similar Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          {/* Similar products cards */}
          {[{
            title: "Похожие объявления",
            items: [1, 2, 3],
            baseUrl: "/avito/product/",
            name: "iPhone 14 Pro Max",
            basePrice: 95000,
          }, {
            title: "Как новое, но дешевле",
            items: [1, 2, 3],
            baseUrl: "/avito/product/new-",
            name: "iPhone 14",
            priceOffset: [0, 5000, 10000],
            extraNameForFirst: "Pro",
            basePrice: 75000,
          }, {
            title: "Может быть интересно",
            items: [1, 2, 3],
            baseUrl: "/avito/product/samsung-",
            name: "Samsung Galaxy S23",
            basePrice: 60000,
            priceStep: 3000,
          }].map(({ title, items, baseUrl, name, basePrice, priceOffset = [], extraNameForFirst = "", priceStep }, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">{title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {items.map((item, idx) => (
                    <button
                      key={item}
                      className="border rounded-lg p-4 hover:shadow-lg transition-all duration-200 text-left"
                      onClick={() => navigate(`${baseUrl}${item}`)}
                    >
                      <div className="aspect-square bg-gray-200 rounded-lg mb-3"></div>
                      <h3 className="font-semibold mb-2">
                        {name} {extraNameForFirst && idx === 0 ? extraNameForFirst : ""}
                      </h3>
                      <p className="text-xl font-bold text-green-600 mb-1">
                        {priceOffset.length
                          ? (basePrice + priceOffset[idx])?.toLocaleString()
                          : priceStep
                          ? (basePrice + item * priceStep)?.toLocaleString()
                          : basePrice.toLocaleString()} ₽
                      </p>
                      <p className="text-sm text-gray-600">Москва</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <AvitoFooter />
    </div>
  );
};

export default AvitoProduct;
