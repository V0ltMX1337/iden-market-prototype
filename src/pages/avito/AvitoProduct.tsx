import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductDetails from "@/components/customcomponent/ProductDetails";
import ProductInfo from "@/components/customcomponent/ProductInfo";
import SellerInfo from "@/components/customcomponent/SellerInfo";
import SafetyTips from "@/components/customcomponent/SafetyTips";
import AskSeller from "@/components/customcomponent/AskSeller";
import SimilarProducts from "@/components/customcomponent/SimilarProducts";
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
  SystemSettings,
  AdSold,
} from "@/lib/types";
import { usePageTitle } from "@/hooks/usePageTitle";

interface CategoryPathItem {
  name: string;
  slug: string;
  fullSlug: string;
}

const AvitoProduct = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Ad | null>(null);
  const [seller, setSeller] = useState<User | null>(null);
  const [categoryPath, setCategoryPath] = useState<CategoryPathItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [messageText, setMessageText] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [categoryFullSlug, setCategoryFullSlug] = useState("");

  const { getPageTitle, settings: systemSettings } = usePageTitle();

  const staticSimilarProducts = [
    {
      id: "101",
      title: "iPhone 14 Pro Max",
      price: 95000,
      location: "Москва",
      image: "/images/iphone14promax.jpg",
    },
    {
      id: "102",
      title: "iPhone 14 Pro",
      price: 90000,
      location: "Москва",
      image: "/images/iphone14pro.jpg",
    },
    {
      id: "103",
      title: "iPhone 14",
      price: 75000,
      location: "Москва",
      image: "/images/iphone14.jpg",
    },
  ];

  const questions = [
    "Где и когда можно посмотреть?",
    "Ещё продаёте?",
    "Торг уместен?",
    "Отправите Авито Доставкой?",
  ];

  const buildCategoryPath = async (
    categoryId: string,
    subcategoryId: string
  ): Promise<CategoryPathItem[]> => {
    try {
      const categories: Category[] = await storeApi.getCategories();
      const category = categories.find((cat) => cat.id === categoryId);
      if (!category) return [];

      const basePath: CategoryPathItem[] = [
        {
          name: category.name,
          slug: category.slug,
          fullSlug: category.slug,
        },
      ];

      const findSubcategoryPath = (
        subs: Subcategory[],
        targetId: string,
        path: CategoryPathItem[] = [],
        slugs: string[] = []
      ): CategoryPathItem[] | null => {
        for (const sub of subs) {
          const currentSlugs = [...slugs, sub.slug];
          const currentPath = [
            ...path,
            {
              name: sub.name,
              slug: sub.slug,
              fullSlug: currentSlugs.join("/"),
            },
          ];

          if (sub.id === targetId) return currentPath;

          if (sub.children?.length) {
            const result = findSubcategoryPath(
              sub.children,
              targetId,
              currentPath,
              currentSlugs
            );
            if (result) return result;
          }
        }
        return null;
      };

      const subPath = findSubcategoryPath(category.subcategories, subcategoryId);

      return subPath ? [...basePath, ...subPath] : basePath;
    } catch (err) {
      console.error("Ошибка при построении пути:", err);
      return [];
    }
  };

  useEffect(() => {
    if (!id) return;
    setLoading(true);

    storeApi
      .getAdById(id)
      .then(async (adData: Ad) => {
        const updatedAd = { ...adData, views: (adData.views || 0) + 1 };
        storeApi.updateAd(id, updatedAd).catch(console.error);
        setProduct(updatedAd);

        const [userData, pathData] = await Promise.all([
          storeApi.getUserById(updatedAd.userId),
          buildCategoryPath(updatedAd.categoryId, updatedAd.subcategoryId),
        ]);

        setSeller(userData);
        setCategoryPath(pathData);

        const fullSlugPath = pathData.map((p) => p.slug).join("/");
        setCategoryFullSlug(fullSlugPath);

        if (user) {
          const [favorites, cart] = await Promise.all([
            storeApi.getFavorites(user.id),
            storeApi.getCart(user.id),
          ]);
          setIsFavorite(favorites.includes(id));
          setInCart(cart.includes(id));
        }
      })
      .catch((err) => console.error("Ошибка загрузки:", err))
      .finally(() => setLoading(false));
  }, [id, user]);

  // Формируем заголовок
  const pageTitle =
    product && systemSettings && categoryPath.length
      ? getPageTitle("adTitle", {
          adtitle: product.title,
          adcity: product.city.name,
          categorytitle: categoryPath[categoryPath.length - 1].name,
        })
      : "";

  const toggleFavorite = async () => {
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
  };

  const toggleCart = async () => {
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
  };

  const handleSendMessage = async (message: string) => {
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
      navigate("/profile/chat");
    } catch {
      alert("Ошибка при отправке сообщения");
    }
  };

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
          content={`${product.title} в ${product.city.name}. Подробнее на Trivo.`}
        />
      </Helmet>

      <AvitoHeader />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs categoryPath={categoryPath} fullSlug={categoryFullSlug} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
          <div className="lg:col-span-2 space-y-6">
            <ProductDetails
              title={product.title}
              description={product.description}
              images={product.links}
            />
            <AskSeller
              messageText={messageText}
              setMessageText={setMessageText}
              selectedQuestion={selectedQuestion}
              setSelectedQuestion={setSelectedQuestion}
              questions={questions}
              onSendMessage={handleSendMessage}
            />
            <SimilarProducts
              products={staticSimilarProducts}
              onViewAllClick={() => navigate("/similar")}
            />
          </div>

          <div className="space-y-6">
            <ProductInfo
              title={product.title}
              isUsed={product.adSold !== AdSold.NEW}
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
              onDeliveryClick={() => navigate("/delivery")}
              onChatClick={() => navigate("/profile/chat")}
              onShowPhoneClick={() => navigate("/phone")}
              isFavorite={isFavorite}
              inCart={inCart}
              onToggleFavorite={toggleFavorite}
              onToggleCart={toggleCart}
            />
            <SellerInfo seller={seller} averageRating={0} />
            <SafetyTips />
          </div>
        </div>
      </main>

      <AvitoFooter />
    </div>
  );
};

export default AvitoProduct;
