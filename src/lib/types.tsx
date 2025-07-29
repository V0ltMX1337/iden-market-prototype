export interface User {
  id: string;
  login: string;
  email: string;
  phone: string;
  password: string;
  registrationDate: string;
  firstName: string;
  lastName: string;
  city: City;
  role: UserRole;
  status: UserStatus;
  photoUrl: string;
  balance: number;           // 💰 Доступный баланс пользователя
  reservedBalance: number;   // 🔒 Зарезервированные средства
  tgid: number;
  tgUrl: string;
  description?: string;      // 📝 Описание профиля пользователя
  bannerUrl?: string;        // 🖼️ Ссылка на баннер профиля
}

export enum UserRole {
  USER = "USER",
  MODERATOR = "MODERATOR",
  ADMINISTRATOR = "ADMINISTRATOR",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
}

export interface UserDisplayData {
  user: User;
  averageRating: number;
  reviewCount: number;
  joinDate: string;
  responseTime: string;
  deliveryCount: number;
  salesCount: number;
}

export interface AdWithStatus extends Ad {
  isDeliveryAvailable: boolean;
  isFavorite: boolean;
  formattedPrice: string;
  location: string;
  date: string;
  image: string;
} 

export interface AdFilter {
  filterId: string;
  value: string;
}


export interface FilterDefinition {
  options: any;
  id: string;
  name: string;
  values: string[];
  type: FilterType;
}

export enum FilterType {
  SELECT = "SELECT",
  CHECKBOX = "CHECKBOX",
  RANGE = "RANGE",
}

export interface FilterAssignment {
  filterId: string;
  required: boolean;
}


export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  items: string[];
  children?: Subcategory[];  // рекурсивные подкатегории
  filters: FilterAssignment[]; // ✅ привязанные фильтры
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  subcategories: Subcategory[];
}


export interface City {
  id: string;
  name: string;
  region: string;
}

export interface Ad {
  id: string;
  title: string;
  description: string;
  price: number;
  city: City;
  fullAdress: string;
  latitude: number;
  longitude: number;
  links: string[];
  views: number;
  favoritesCount: number;
  publishedAt: string;
  userId: string;
  adStatus: AdStatus;
  adSold: AdSold;
  categoryId: string;       // ✅ ID категории
  subcategoryId: string;  // ✅ id подкатегории
  filters: AdFilter[];
}

export enum AdStatus {
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
  SOLD = "SOLD",
  TIME_OUT = "TIME_OUT",
}

export enum AdSold {
  NEW = "NEW",
  OTLICHNOE = "OTLICHNOE",
  XOROSHEE = "XOROSHEE",
  YDVORITEL = "YDVORITEL",
}


export interface Review {
  id: string;
  fromUser: User;       // 👤 Кто оставил отзыв
  ad: Ad;               // 📌 К какому объявлению относится
  rating: number;       // 🌟 Рейтинг (например, от 1 до 5)
  comment: string;      // 💬 Текст отзыва
  createdAt: string;    // 🕒 Когда оставлен
}

export interface Message {
  id: string;
  adId: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  isRead?: boolean;
}

export interface ChatSummary {
  adId: string;
  otherUserId: string;        // собеседник в чате
  lastMessage: string;
  lastTimestamp: string;
}

export interface SystemSettings {
  siteName: string;
  siteDescription: string;
  seoTitle: string;
  seoDescription: string;

  adTitle: string;             // шаблон заголовка объявления
  userProfile: string;         // шаблон страницы пользователя
  categoryTitle: string;       // шаблон страницы категории

  mainPageTitle: string;

  authTitle: string;           // шаблон страницы входа
  registerTitle: string;       // шаблон страницы регистрации

  profileMain: string;         // шаблон: Главная (личный кабинет)
  profileAds: string;          // шаблон: Мои объявления
  profileMessages: string;     // шаблон: Сообщения
  profileFavorites: string;    // шаблон: Избранное
  profileGame: string;         // шаблон: Игра
  profileSettings: string;     // шаблон: Настройки
  profileNewAd: string;        // шаблон: Новое объявление

  commission: number;
}

export type Track = {
  id: string;
  title: string;
  musicUrl: string;
  coverUrl?: string;
  uploadTime: string;
  musicFilename: string;
};

export interface Video {
  id?: string; // если используешь UUID или другие ID
  title: string;
  videoUrl: string;
  videoFilename: string;
  uploadTime: string; // ISO-строка времени
  thumbnailUrl?: string; // если backend умеет сохранять обложку
  sourceUrl?: string; // если загружено по ссылке (YouTube/VK)
  duration?: number; // в секундах
  format?: string; // например, mp4
}