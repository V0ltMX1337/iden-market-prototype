import { useParams, useNavigate } from "react-router-dom";
import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import ProductDetails from "@/components/customcomponent/ProductDetails";
import ProductInfo from "@/components/customcomponent/ProductInfo";
import Breadcrumbs from "@/components/customcomponent/Breadcrumbs";
import { storeApi } from "@/lib/store";
import { useAuth } from "@/hooks/useAuth";
import AvitoHeader from "@/components/avitomarket/AvitoHeader";
import AvitoFooter from "@/components/avitomarket/AvitoFooter";
import { Helmet } from "react-helmet-async";
import {
  Ad,
  User,
  Category,
  Subcategory,
  Review,
} from "@/lib/types";
import { usePageTitle } from "@/hooks/usePageTitle";
import ProductFeatures from "@/components/customcomponent/ProductFeatures";

const SimilarProductsLazy = lazy(() => import("@/components/customcomponent/SimilarProducts"));
const AskSellerLazy = lazy(() => import("@/components/customcomponent/AskSeller"));
const SellerInfoLazy = lazy(() => import("@/components/customcomponent/SellerInfo"));
const SafetyTipsLazy = lazy(() => import("@/components/customcomponent/SafetyTips"));

interface CategoryPathItem {
  name: string;
  slug: string;
  fullSlug: string;
}

// Вынес статичные данные из компонента
const staticSimilarProducts = [
  { id: "101", title: "iPhone 14 Pro Max", price: 95000, location: "Москва", image: "/images/iphone14promax.jpg" },
  { id: "102", title: "iPhone 14 Pro", price: 90000, location: "Москва", image: "/images/iphone14pro.jpg" },
  { id: "103", title: "iPhone 14", price: 75000, location: "Москва", image: "/images/iphone14.jpg" },
];

const questions = [
  "Где и когда можно посмотреть?",
  "Ещё продаёте?",
  "Торг уместен?",
  "Отправите Trivo Доставкой?",
];

// Функция поиска пути по подкатегории
const findSubcategoryPath = (
  subs: Subcategory[],
  targetId: string,
  path: CategoryPathItem[] = [],
  slugs: string[] = []
): CategoryPathItem[] | null => {
  for (const sub of subs) {
    const currentSlugs = [...slugs, sub.slug];
    const currentPath = [...path, { name: sub.name, slug: sub.slug, fullSlug: currentSlugs.join("/") }];
    if (sub.id === targetId) return currentPath;
    if (sub.children?.length) {
      const result = findSubcategoryPath(sub.children, targetId, currentPath, currentSlugs);
      if (result) return result;
    }
  }
  return null;
};

const buildCategoryPath = async (categoryId: string, subcategoryId: string): Promise<CategoryPathItem[]> => {
  try {
    const categories: Category[] = await storeApi.getCategories();
    const category = categories.find(cat => cat.id === categoryId);
    if (!category) return [];

    const basePath = [{ name: category.name, slug: category.slug, fullSlug: category.slug }];
    const subPath = findSubcategoryPath(category.subcategories, subcategoryId);

    return subPath ? [...basePath, ...subPath] : basePath;
  } catch (err) {
    console.error("Ошибка при построении пути:", err);
    return [];
  }
};

const AvitoProduct = () => {
  const { slug, id } = useParams<{ slug: string; id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { getPageTitle, settings: systemSettings } = usePageTitle();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Ad | null>(null);
  const [seller, setSeller] = useState<User | null>(null);
  const [categoryPath, setCategoryPath] = useState<CategoryPathItem[]>([]);
  const [messageText, setMessageText] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [inCart, setInCart] = useState(false);

  const categoryFullSlug = useMemo(() => categoryPath.map(p => p.slug).join("/"), [categoryPath]);

useEffect(() => {
    if (!id) return;

    setLoading(true);

    const loadData = async () => {
      try {
        const adData = await storeApi.getAdById(id);
        // Увеличиваем просмотры в фоне
        storeApi.updateAd(id, { ...adData, views: (adData.views || 0) + 1 }).catch(console.error);
        setProduct(adData);

        const [userData, pathData, userAds] = await Promise.all([
          storeApi.getUserById(adData.userId),
          buildCategoryPath(adData.categoryId, adData.subcategoryId),
          storeApi.getUserAds(adData.userId),
        ]);
        setSeller(userData);
        setCategoryPath(pathData);

        // Получаем отзывы
        const reviewsArrays = await Promise.all(userAds.map(ad => storeApi.getReviewsByAdId(ad.id)));
        setReviews(reviewsArrays.flat());

        if (user) {
          const [favorites, cart] = await Promise.all([storeApi.getFavorites(user.id), storeApi.getCart(user.id)]);
          setIsFavorite(favorites.includes(id));
          setInCart(cart.includes(id));
        }
      } catch (error) {
        console.error("Ошибка загрузки:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, user]);

  const pageTitle =
    product && systemSettings && categoryPath.length
      ? getPageTitle("adTitle", {
          adtitle: product.title,
          adcity: product.city.name,
          categorytitle: categoryPath[categoryPath.length - 1].name,
        })
      : "";

  const toggleFavorite = useCallback(async () => {
    if (!user || !product) return alert("Войдите в аккаунт");
    try {
      if (isFavorite) {
        await storeApi.removeFavorite(user.id, product.id);
        setIsFavorite(false);
      } else {
        await storeApi.addFavorite(user.id, product.id);
        setIsFavorite(true);
      }
    } catch {
      alert("Ошибка при обновлении избранного");
    }
  }, [user, product, isFavorite]);

  const toggleCart = useCallback(async () => {
    if (!user || !product) return alert("Войдите в аккаунт");
    try {
      if (inCart) {
        await storeApi.removeFromCart(user.id, product.id);
        setInCart(false);
      } else {
        await storeApi.addToCart(user.id, product.id);
        setInCart(true);
      }
    } catch {
      alert("Ошибка при обновлении корзины");
    }
  }, [user, product, inCart]);

  const handleSendMessage = useCallback(
    async (message: string) => {
      if (!message.trim() || !user || !product) return;
      try {
        await storeApi.sendMessage({
          adId: product.id,
          senderId: user.id,
          receiverId: product.userId,
          content: message.trim(),
        });
        alert("Сообщение отправлено");
        setMessageText("");
        setSelectedQuestion(null);
        navigate("/profile/messages");
      } catch {
        alert("Ошибка при отправке сообщения");
      }
    },
    [user, product, navigate]
  );

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-600 text-lg font-medium">
        Загрузка...
      </div>
    );
  }

  if (!product || !seller) {
    return (
      <div className="p-10 text-center text-red-600 font-semibold">
        Объявление не найдено
      </div>
    );
  }

  return (
<div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 flex flex-col">
      <Helmet>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content={`${product.title} на Trivo в категории ${categoryPath[categoryPath.length - 1].name} в ${product.city.name}, ${product.city.region}. Цена: ${product.price.toLocaleString()}₽.`}
        />
        <link rel="canonical" href={`https://trivoads.ru/product/${product.slug}/${product.id}`} />
        {/* OpenGraph */}
        <meta property="og:title" content={`${product.title} - ${categoryPath[categoryPath.length - 1].name}`} />
        <meta
          property="og:description"
          content={`${product.title} продаётся в ${product.city.name}, ${product.city.region}. Цена ${product.price}₽. Подробнее на Trivo.`}
        />
        <meta property="og:url" content={`https://trivoads.ru/product/${product.slug}/${product.id}`} />
        {product.links?.[0] && <meta property="og:image" content={product.links[0]} />}
        <meta property="og:type" content="product" />
        <meta property="og:site_name" content="Trivo" />
        {/* Twitter card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${product.title} - ${categoryPath[categoryPath.length - 1].name}`} />
        <meta name="twitter:description" content={`Продажа: ${product.title} в ${product.city.name}. ${product.price}₽`} />
        {product.links?.[0] && <meta name="twitter:image" content={product.links[0]} />}
      </Helmet>

      <AvitoHeader />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs categoryPath={categoryPath} fullSlug={categoryFullSlug} />

        {/* Десктопная версия */}
        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
          <div className="lg:col-span-2 space-y-6">
            <ProductDetails
              title={product.title}
              description={product.description}
              images={product.links}
            />
            <ProductFeatures filters={product.filters} />

            <Suspense fallback={<div>Загрузка вопросов продавцу...</div>}>
              <AskSellerLazy
               messageText={messageText}
               setMessageText={setMessageText}
               selectedQuestion={selectedQuestion}
               setSelectedQuestion={setSelectedQuestion}
               questions={questions}
               onSendMessage={handleSendMessage}
               />
            </Suspense>

            <Suspense fallback={<div>Загрузка похожих товаров...</div>}>
              <SimilarProductsLazy products={staticSimilarProducts} onViewAllClick={() => navigate("/similar")} />
            </Suspense>
          </div>

          <div className="space-y-6">
            <ProductInfo
              title={product.title}
              adSold={product.adSold}
              price={product.price}
              city={product.city}
              views={product.views}
              favorites={product.favoritesCount}
              publishedAt={product.publishedAt}
              phone={seller.phone}
              latitude={product.latitude}
              longitude={product.longitude}
              fullAdress={product.fullAdress}
              onDeliveryClick={() => alert("Функция находится в разработке")}
              onChatClick={() => navigate("/profile/messages")}
              isFavorite={isFavorite}
              inCart={inCart}
              onToggleFavorite={toggleFavorite}
              onToggleCart={toggleCart}
            />

            <Suspense fallback={<div>Загрузка информации о продавце...</div>}>
              <SellerInfoLazy seller={seller} reviews={reviews} reviewCount={reviews.length} />
            </Suspense>
            
            <Suspense fallback={<div>Советы по безопасности...</div>}>
              <SafetyTipsLazy />
            </Suspense>
          </div>
        </div>

        {/* Мобильная версия */}
        <div className="lg:hidden space-y-6 mt-4">
          {/* Фото и описание */}
          <ProductDetails
            title={product.title}
            description={product.description}
            images={product.links}
          />
          
          {/* Характеристики */}
          <ProductFeatures filters={product.filters} />
          
          {/* Информация о товаре */}
          <ProductInfo
            title={product.title}
            adSold={product.adSold}
            price={product.price}
            city={product.city}
            views={product.views}
            favorites={product.favoritesCount}
            publishedAt={product.publishedAt}
            phone={seller.phone}
            latitude={product.latitude}
            longitude={product.longitude}
            fullAdress={product.fullAdress}
            onDeliveryClick={() => alert("Функция находится в разработке")}
            onChatClick={() => navigate("/profile/messages")}
            isFavorite={isFavorite}
            inCart={inCart}
            onToggleFavorite={toggleFavorite}
            onToggleCart={toggleCart}
          />
          
          {/* Продавец */}
          <Suspense fallback={<div>Загрузка информации о продавце...</div>}>
              <SellerInfoLazy seller={seller} reviews={reviews} reviewCount={reviews.length} />
            </Suspense>
          
          {/* Задать вопрос продавцу */}
          <Suspense fallback={<div>Загрузка вопросов продавцу...</div>}>
              <AskSellerLazy
               messageText={messageText}
               setMessageText={setMessageText}
               selectedQuestion={selectedQuestion}
               setSelectedQuestion={setSelectedQuestion}
               questions={questions}
               onSendMessage={handleSendMessage}
               />
            </Suspense>
          
          {/* Безопасная сделка */}
          <Suspense fallback={<div>Советы по безопасности...</div>}>
              <SafetyTipsLazy />
          </Suspense>
          
          {/* Похожие объявления */}
          <Suspense fallback={<div>Загрузка похожих товаров...</div>}>
              <SimilarProductsLazy products={staticSimilarProducts} onViewAllClick={() => navigate("/similar")} />
          </Suspense>
        </div>
      </main>

      <AvitoFooter />
    </div>
  );
};

export default AvitoProduct;