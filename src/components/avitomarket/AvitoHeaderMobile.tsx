import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { storeApi } from "@/lib/store";
import { useAuth } from "@/hooks/useAuth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { AvitoCategoryMenu } from "../customcomponent/AvitoCategoryMenu";
import Icon from "@/components/ui/icon";
import FancyText from "@carefully-coded/react-text-gradient";
import { Category } from "@/lib/types";

const AvitoHeaderMobile = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await storeApi.getCategories();
        setCategories(data);
      } catch (e) {
        console.error("Ошибка загрузки категорий:", e);
      }
    };
    loadCategories();
  }, []);

  if (isLoading) {
    return <div className="h-16 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600" />;
  }

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 shadow-lg sm:hidden"
        style={{ paddingBottom: "12px" }} // небольшой внутренний отступ снизу в самом хедере
      >
        <div className="flex items-center justify-between h-16 px-4">
          {/* Меню категорий (бургер) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                aria-label="Категории"
                className="p-2 rounded-md hover:bg-white/20 text-white"
              >
                <Icon name="Grid3X3" size={20} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              sideOffset={8}
              className="w-64 bg-white/95 backdrop-blur-sm border border-gray-200 shadow-xl rounded-lg p-0"
            >
              <div className="px-4 py-2 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent border-b border-gray-100">
                ✨ Категории
              </div>
              <AvitoCategoryMenu categories={categories} />
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Логотип */}
          <h1
            className="text-xl font-extrabold text-white cursor-pointer select-none"
            onClick={() => navigate("/")}
          >
            <FancyText
              gradient={{ from: "#ffffff", to: "#f0f9ff", type: "linear" }}
              animateTo={{ from: "#dbeafe", to: "#ffffff" }}
              animateDuration={2000}
            >
              TRIVO
            </FancyText>
          </h1>

          {/* Иконка поиска */}
          <button
            aria-label="Поиск"
            onClick={() => setSearchVisible((v) => !v)}
            className="p-2 rounded-md hover:bg-white/20 text-white"
          >
            <Icon name="Search" size={20} />
          </button>
        </div>

        {/* Поле поиска появляется по клику */}
        {searchVisible && (
          <div className="px-4 pb-4">
            <input
              type="text"
              autoFocus
              placeholder="Поиск по объявлениям..."
              className="w-full px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}

        {/* Нижняя панель вкладок (упрощённая) */}
        <nav className="flex justify-around bg-blue-700/90 py-2">
          <button
            onClick={() => navigate("/")}
            className="flex flex-col items-center text-white text-xs"
            aria-label="Главная"
          >
            <Icon name="Home" size={20} />
            Главная
          </button>

          {user && (
            <>
              <button
                onClick={() => navigate("/profile")}
                className="flex flex-col items-center text-white text-xs"
                aria-label="Профиль"
              >
                <Icon name="UserCircle" size={20} />
                Профиль
              </button>

              <button
                onClick={() => navigate("/profile/ads")}
                className="flex flex-col items-center text-white text-xs"
                aria-label="Мои объявления"
              >
                <Icon name="Package" size={20} />
                Объявления
              </button>

              <button
                onClick={() => navigate("/profile/favorites")}
                className="flex flex-col items-center text-white text-xs"
                aria-label="Избранное"
              >
                <Icon name="Heart" size={20} />
                Избранное
              </button>
            </>
          )}

          {!user && (
            <>
              <button
                onClick={() => navigate("/login")}
                className="flex flex-col items-center text-white text-xs"
                aria-label="Войти"
              >
                <Icon name="LogIn" size={20} />
                Войти
              </button>

              <button
                onClick={() => navigate("/register")}
                className="flex flex-col items-center text-white text-xs"
                aria-label="Регистрация"
              >
                <Icon name="UserPlus" size={20} />
                Регистрация
              </button>
            </>
          )}
        </nav>
      </header>

      {/* Отступ для основного контента, чтобы он не скрывался под фиксированным хедером */}
      <div style={{ height: "64px" }} />
    </>
  );
};

export default AvitoHeaderMobile;
