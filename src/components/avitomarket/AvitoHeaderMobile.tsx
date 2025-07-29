import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { storeApi } from "@/lib/store";
import { useAuth } from "@/hooks/useAuth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { AvitoCategoryMenu } from "../customcomponent/AvitoCategoryMenu";
import Icon from "@/components/ui/icon";
import FancyText from "@carefully-coded/react-text-gradient";
import { Category, Ad } from "@/lib/types";

const AvitoHeaderMobile = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [allAds, setAllAds] = useState<Ad[]>([]);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAds, setFilteredAds] = useState<Ad[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoriesData, adsData] = await Promise.all([
          storeApi.getCategories(),
          storeApi.getAds(),
        ]);
        setCategories(categoriesData);
        setAllAds(adsData);
      } catch (e) {
        console.error("Ошибка загрузки данных:", e);
      }
    };
    loadData();
  }, []);

  // Поиск по title с первой буквы
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredAds([]);
      setShowSearchResults(false);
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    const filtered = allAds
      .filter(ad => ad.title.toLowerCase().includes(query))
      .slice(0, 5);
    
    setFilteredAds(filtered);
    setShowSearchResults(true);
  }, [searchQuery, allAds]);

  // Закрытие результатов поиска при клике вне
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAdClick = (ad: Ad) => {
    setShowSearchResults(false);
    setSearchQuery("");
    setSearchVisible(false);
    navigate(`/product/${ad.id}`);
  };

  const handleSearchFocus = () => {
    if (searchQuery.trim() && filteredAds.length > 0) {
      setShowSearchResults(true);
    }
  };

  const handleSearchToggle = () => {
    const newVisible = !searchVisible;
    setSearchVisible(newVisible);
    
    if (newVisible && !searchQuery.trim()) {
      // Показываем 5 рекомендованных объявлений
      const recommended = allAds.slice(0, 5);
      setFilteredAds(recommended);
      setShowSearchResults(true);
    } else if (!newVisible) {
      setShowSearchResults(false);
    }
  };

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
            onClick={handleSearchToggle}
            className="p-2 rounded-md hover:bg-white/20 text-white"
          >
            <Icon name={searchVisible ? "X" : "Search"} size={20} />
          </button>
        </div>

        {/* Поле поиска появляется по клику */}
        {searchVisible && (
          <div className="px-4 pb-4" ref={searchRef}>
            <div className="relative">
              <input
                type="text"
                autoFocus
                placeholder="Поиск по объявлениям..."
                className="w-full px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleSearchFocus}
              />

              {/* Результаты поиска */}
              {showSearchResults && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-72 overflow-y-auto z-50">
                  {filteredAds.length > 0 ? (
                    <div className="py-2">
                      {!searchQuery.trim() && (
                        <div className="px-4 py-2 text-sm font-medium text-gray-500 border-b">
                          🔥 Рекомендуемые объявления
                        </div>
                      )}
                      {filteredAds.map((ad) => (
                        <div
                          key={ad.id}
                          className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3 border-b border-gray-100 last:border-0"
                          onClick={() => handleAdClick(ad)}
                        >
                          {ad.links?.[0] && (
                            <img
                              src={ad.links[0]}
                              alt={ad.title}
                              className="w-10 h-10 object-cover rounded-lg flex-shrink-0"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 truncate">{ad.title}</h4>
                            <p className="text-xs text-gray-500">{ad.city.name}</p>
                            <p className="text-sm font-semibold text-blue-600">{ad.price.toLocaleString()} ₽</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 py-6 text-center text-gray-500">
                      <Icon name="Search" size={20} className="mx-auto mb-2 text-gray-400" />
                      <p className="text-sm">Объявления не найдены</p>
                      <p className="text-xs mt-1">Попробуйте изменить запрос</p>
                    </div>
                  )}
                </div>
              )}
            </div>
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