export interface User {
  id: string;
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

export interface Subcategory {
  name: string;
  slug: string;
  items: string[];  // массив строк с элементами подкатегории
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;          // имя иконки, например "Package", "Box" и т.п.
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
  links: string[];
  views: number;
  favoritesCount: number;
  publishedAt: string;
  userId: string;
  active: boolean;
  categoryId: string;       // ✅ ID категории
  subcategorySlug: string;  // ✅ slug подкатегории
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
  supportEmail: string;
  maintenanceMode: boolean;
  commission: number;
}
