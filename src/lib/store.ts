import axios from "axios";
import type { User, Category, City, SystemSettings, Subcategory, Ad, Review, Message, ChatSummary, Track, Video, FilterDefinition } from "../lib/types";

const API_BASE = "http://178.215.236.168:7001";

export const storeApi = {
  // USERS
  async getUsers(): Promise<User[]> {
    const res = await axios.get(`${API_BASE}/users`, { withCredentials: true });
    return res.data;
  },

  async getUserById(id: string): Promise<User> {
    const res = await axios.get(`${API_BASE}/users/${id}`, { withCredentials: true });
    return res.data;
  },

  async getUserByEmail(email: string): Promise<User | null> {
    // Здесь не видно, что у тебя есть фильтр по email, можно убрать или добавить отдельный метод на сервере
    const res = await axios.get(`${API_BASE}/users?email=${email}`, { withCredentials: true });
    return res.data || null;
  },

  async addUser(user: Omit<User, "id">): Promise<User> {
    const res = await axios.post(`${API_BASE}/users`, user, { withCredentials: true });
    return res.data;
  },

  async updateUser(id: string, updates: Partial<User>): Promise<boolean> {
    await axios.put(`${API_BASE}/users/${id}`, updates, { withCredentials: true });
    return true;
  },

  async deleteUser(id: string): Promise<boolean> {
    await axios.delete(`${API_BASE}/users/${id}`, { withCredentials: true });
    return true;
  },

  async changeUserPassword(id: string, currentPassword: string, newPassword: string): Promise<void> {
    await axios.put(
      `${API_BASE}/users/${id}/changepassword`,
      { currentPassword, newPassword },
      { withCredentials: true }
    );
  },


  // --- ADS BY USER ---
  async getUserAds(userId: string): Promise<Ad[]> {
    const res = await axios.get(`${API_BASE}/users/${userId}/ads`);
    return res.data;
  },

  async getUserAdById(userId: string, adId: string): Promise<Ad> {
    const res = await axios.get(`${API_BASE}/users/${userId}/ads/${adId}`);
    return res.data;
  },

  async countUserAds(userId: string): Promise<{ active: number; blocked: number, sold: number, time_out: number }> {
    const res = await axios.get(`${API_BASE}/users/${userId}/adscount`);
    return res.data;
  },

  // --- ADS ---
  async getAds(): Promise<Ad[]> {
    const res = await axios.get(`${API_BASE}/ads`);
    return res.data;
  },

  async getAdById(id: string): Promise<Ad> {
    const res = await axios.get(`${API_BASE}/ads/${id}`);
    return res.data;
  },

  async addAd(ad: Omit<Ad, "id">): Promise<Ad> {
    const res = await axios.post(`${API_BASE}/ads`, ad);
    return res.data;
  },

  async updateAd(id: string, ad: Omit<Ad, "id">): Promise<void> {
    await axios.put(`${API_BASE}/ads/${id}`, ad);
  },

  // Получить список id избранных объявлений
  async getFavorites(userId: string): Promise<string[]> {
    const res = await axios.get<string[]>(`${API_BASE}/users/${userId}/favorites`, { withCredentials: true });
    return res.data;
  },

  // Получить список id объявлений в корзине
  async getCart(userId: string): Promise<string[]> {
    const res = await axios.get<string[]>(`${API_BASE}/users/${userId}/cart`, { withCredentials: true });
    return res.data;
  },

  // По массиву id получить массив объявлений с типом Ad
  async getAdsByIds(ids: string[]): Promise<Ad[]> {
    // Асинхронно забираем каждое объявление
    const ads = await Promise.all(ids.map(id => this.getAdById(id)));
    return ads;
  },

  // Добавление и удаление из избранного и корзины — по твоему коду без изменений
  async addFavorite(userId: string, adId: string): Promise<void> {
    await axios.post(`${API_BASE}/users/${userId}/favorites/${adId}`, null, { withCredentials: true });
  },

  async removeFavorite(userId: string, adId: string): Promise<void> {
    await axios.delete(`${API_BASE}/users/${userId}/favorites/${adId}`, { withCredentials: true });
  },

  async addToCart(userId: string, adId: string): Promise<void> {
    await axios.post(`${API_BASE}/users/${userId}/cart/${adId}`, null, { withCredentials: true });
  },

  async removeFromCart(userId: string, adId: string): Promise<void> {
    await axios.delete(`${API_BASE}/users/${userId}/cart/${adId}`, { withCredentials: true });
  },

  // --- MESSAGES AND CHARTS ---
  async sendMessage(message: Omit<Message, "id" | "timestamp">): Promise<Message> {
    const res = await axios.post(`${API_BASE}/api/messages`, message);
    return res.data;
  },

  async getMessages(adId: string, user1: string, user2: string): Promise<Message[]> {
    const res = await axios.get(`${API_BASE}/api/messages`, {
      params: { adId, user1, user2 }
    });
    return res.data;
  },

  async getMessagesByUserId(userId: string): Promise<{ unreadCount: number }> {
    const res = await axios.get(`${API_BASE}/api/messages/unread-count`, {
      params: { userId },
    });
    return res.data; // { unreadCount: number }
  },

  async getUserChats(userId: string): Promise<ChatSummary[]> {
    const res = await axios.get(`${API_BASE}/api/user-chats`, {
      params: { userId },
      withCredentials: true,
    });
    return res.data;
  },

  async markMessageAsRead(messageId: string): Promise<void> {
    await axios.put(`${API_BASE}/api/messages/read`, null, {
      params: { messageId },
    });
  },

  // --- REVIEWS ---
  async getReviews(): Promise<Review[]> {
    const res = await axios.get(`${API_BASE}/reviews`);
    return res.data;
  },

  async addReview(review: Omit<Review, "id">): Promise<Review> {
    const res = await axios.post(`${API_BASE}/reviews`, review);
    return res.data;
  },

  async getReviewsByAdId(adId: string): Promise<Review[]> {
    const res = await axios.get(`${API_BASE}/ads/${adId}/reviews`);
    return res.data;
  },

  async getReviewsByUserId(userId: string): Promise<Review[]> {
    const res = await axios.get(`${API_BASE}/users/${userId}/reviews`);
    return res.data;
  },

  // --- FILTERS ---
  async getFilters(): Promise<FilterDefinition[]> {
    const res = await axios.get(`${API_BASE}/filters`, { withCredentials: true });
    return res.data;
  },
  
  async getFilterById(id: string): Promise<FilterDefinition> {
    const res = await axios.get(`${API_BASE}/filters/${id}`, { withCredentials: true });
    return res.data;
  },
  
  async addFilter(filter: Omit<FilterDefinition, "id">): Promise<FilterDefinition> {
    const res = await axios.post(`${API_BASE}/filters`, filter, { withCredentials: true });
    return res.data;
  },
  
  async updateFilter(id: string, updates: Partial<FilterDefinition>): Promise<boolean> {
    await axios.put(`${API_BASE}/filters/${id}`, updates, { withCredentials: true });
    return true;
  },
  
  async deleteFilter(id: string): Promise<boolean> {
    await axios.delete(`${API_BASE}/filters/${id}`, { withCredentials: true });
    return true;
  },


  // --- CATEGORIES ---
  async getCategories(): Promise<Category[]> {
    const res = await axios.get(`${API_BASE}/categories`, { withCredentials: true });
    return res.data;
  },

  async getCategoryById(id: string): Promise<Category | undefined> {
    const res = await axios.get(`${API_BASE}/categories/${id}`, { withCredentials: true });
    return res.data;
  },

  async addCategory(category: Omit<Category, "id">): Promise<Category> {
    const res = await axios.post(`${API_BASE}/categories`, category, { withCredentials: true });
    return res.data;
  },

  async updateCategory(id: string, updates: Partial<Category>): Promise<boolean> {
    await axios.put(`${API_BASE}/categories/${id}`, updates, { withCredentials: true });
    return true;
  },

  async deleteCategory(id: string): Promise<boolean> {
    await axios.delete(`${API_BASE}/categories/${id}`, { withCredentials: true });
    return true;
  },

  // --- SUBCATEGORIES (by ID) ---

  /**
   * Получить подкатегории, вложенные в parentSubcategoryId (или корневые, если null)
   */
  async getSubcategoriesById(categoryId: string, parentSubcategoryId: string | null): Promise<Subcategory[]> {
    const res = await axios.post(
      `${API_BASE}/categories/${categoryId}/subcategories/resolve`,
      { parentSubcategoryId },
      { withCredentials: true }
    );
    return res.data;
  },

  /**
   * Добавить подкатегорию внутрь родителя (если parentSubcategoryId = null, то в корень)
   */
  async addSubcategoryById(categoryId: string, parentSubcategoryId: string | null, subcategory: Subcategory): Promise<boolean> {
    await axios.post(
      `${API_BASE}/categories/${categoryId}/subcategories`,
      { parentSubcategoryId, subcategory },
      { withCredentials: true }
    );
    return true;
  },

  /**
   * Обновить подкатегорию по её ID
   */
  async updateSubcategoryById(categoryId: string, subcategoryId: string, updated: Subcategory): Promise<boolean> {
    await axios.put(
      `${API_BASE}/categories/${categoryId}/subcategories/${subcategoryId}`,
      updated,
      { withCredentials: true }
    );
    return true;
  },

  /**
   * Удалить подкатегорию по её ID
   */
  async deleteSubcategoryById(categoryId: string, subcategoryId: string): Promise<boolean> {
    await axios.delete(
      `${API_BASE}/categories/${categoryId}/subcategories/${subcategoryId}`,
      { withCredentials: true }
    );
    return true;
  },


  // CITIES
  async getCities(): Promise<City[]> {
    const res = await axios.get(`${API_BASE}/cities`, { withCredentials: true });
    return res.data;
  },

  async addCity(city: Omit<City, "id">): Promise<City> {
    const res = await axios.post(`${API_BASE}/cities`, city, { withCredentials: true });
    return res.data;
  },

  async deleteCity(id: string): Promise<boolean> {
    await axios.delete(`${API_BASE}/cities/${id}`, { withCredentials: true });
    return true;
  },

  // SETTINGS
  async getSystemSettings(): Promise<SystemSettings> {
    const res = await axios.get(`${API_BASE}/systemSettings`, { withCredentials: true });
    return res.data;
  },

  async updateSystemSettings(updates: Partial<SystemSettings>): Promise<void> {
    await axios.put(`${API_BASE}/systemSettings`, updates, { withCredentials: true });
  },

    // FILE UPLOADS
  async uploadPhoto(folder: string, file: File): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append("folder", folder);
    formData.append("file", file);
  
    const res = await axios.post(`${API_BASE}/api/uploadphoto`, formData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });
  
    return res.data;
  },
  
  async uploadPhotos(folder: string, files: File[]): Promise<{ urls: string[] }> {
    const formData = new FormData();
    formData.append("folder", folder);
    files.forEach(file => formData.append("files", file));
  
    const res = await axios.post(`${API_BASE}/api/uploadphotos`, formData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });
  
    return res.data;
  },

  async getMusic(): Promise<Track[]> {
    return axios.get(`${API_BASE}/api/music`, {
      withCredentials: true
    }).then(res => res.data);
  },

  async uploadMusic(formData: FormData): Promise<any> {
    const res = await axios.post(`${API_BASE}/api/uploadmusic`, formData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  async deleteMusic(filename: string): Promise<void> {
    await axios.delete(`${API_BASE}/api/music/${encodeURIComponent(filename)}`, {
      withCredentials: true,
    });
  },

  async getVideo(): Promise<Video[]> {
    return axios.get(`${API_BASE}/api/video`, {
      withCredentials: true
    }).then(res => res.data);
  },
  
  async uploadVideo(formData: FormData): Promise<any> {
    const res = await axios.post(`${API_BASE}/api/uploadvideo`, formData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },
  
  async deleteVideo(filename: string): Promise<void> {
    await axios.delete(`${API_BASE}/api/video/${encodeURIComponent(filename)}`, {
      withCredentials: true,
    });
  },

  async fetchVideoFromUrl(url: string): Promise<any> {
    if (!url || url.trim() === "") {
      throw new Error("URL is required");
    }

    const data = new URLSearchParams();
    data.append("url", url.trim());

    const res = await axios.post(`${API_BASE}/api/fetchvideo`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return res.data;
  },


  async getVideoDownloadProgress(taskId: string): Promise<{ progress: number }> {
    const res = await axios.get(`${API_BASE}/api/fetchvideo/progress`, {
      params: { id: taskId },
      withCredentials: true,
    });
    return res.data;
  },


  // STATS
async getStats(): Promise<{
  totalIncome: number;
  monthlyIncome: number;
  averageCheck: number;
  totalUsers: number;
  newUsersThisMonth: number;
  averageBalance: number;
  totalAds: number;
  activeAds: number;
  top5ExpensiveAds: Array<{
    id: string;
    title: string;
    price: number;
    [key: string]: any; // другие возможные поля объявления
  }>;
  usersByCity: Record<string, number>;
  userGrowthLast30Days: Record<string, number>;
  adsByCategory: Record<string, number>;
  top5UsersByAds: Array<{
    userId: string;
    count: number;
  }>;
  avgAdLifetimeDays: number;
}> {
  const res = await axios.get(`${API_BASE}/api/admin/stats`, { withCredentials: true });
  return res.data;
}

};