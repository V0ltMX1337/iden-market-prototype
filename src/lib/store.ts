import axios from "axios";
import type { User, Category, City, SystemSettings, Subcategory, Ad, Review, Message, ChatSummary } from "../lib/types";

const API_BASE = "http://94.156.112.180:7000";

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

  // --- ADS BY USER ---
  async getUserAds(userId: string): Promise<Ad[]> {
    const res = await axios.get(`${API_BASE}/users/${userId}/ads`);
    return res.data;
  },

  async getUserAdById(userId: string, adId: string): Promise<Ad> {
    const res = await axios.get(`${API_BASE}/users/${userId}/ads/${adId}`);
    return res.data;
  },

  async countUserAds(userId: string): Promise<{ active: number; inactive: number }> {
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

  async getUserChats(userId: string): Promise<ChatSummary[]> {
    const res = await axios.get(`${API_BASE}/api/user-chats`, {
      params: { userId },
      withCredentials: true,
    });
    return res.data;
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

  // CATEGORIES
  async getCategories(): Promise<Category[]> {
    const res = await axios.get(`${API_BASE}/categories`, { withCredentials: true });
    return res.data;
  },

  async addCategory(category: Omit<Category, "id">): Promise<Category> {
    const res = await axios.post(`${API_BASE}/categories`, category, { withCredentials: true });
    return res.data;
  },

  async updateCategory(id: string, updates: Partial<Category>): Promise<boolean> {
    await axios.patch(`${API_BASE}/categories/${id}`, updates, { withCredentials: true });
    return true;
  },

  async deleteCategory(id: string): Promise<boolean> {
    await axios.delete(`${API_BASE}/categories/${id}`, { withCredentials: true });
    return true;
  },

  async addSubcategory(categoryId: string, subcategory: Subcategory): Promise<boolean> {
    await axios.post(`${API_BASE}/categories/${categoryId}/subcategories`, subcategory, {
      withCredentials: true,
    });
    return true;
  },

  async updateSubcategory(
    categoryId: string,
    subcategoryName: string,
    updates: Subcategory
  ): Promise<boolean> {
    await axios.put(
      `${API_BASE}/categories/${categoryId}/subcategories/${encodeURIComponent(subcategoryName)}`,
      updates,
      { withCredentials: true }
    );
    return true;
  },

  async deleteSubcategory(categoryId: string, subcategoryName: string): Promise<boolean> {
    await axios.delete(
      `${API_BASE}/categories/${categoryId}/subcategories/${encodeURIComponent(subcategoryName)}`,
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


  // STATS
  async getStats(): Promise<{
    totalUsers: number;
    activeUsers: number;
    totalCategories: number;
    totalCities: number;
    totalRevenue: number;
    monthlyRevenue: number;
  }> {
    const res = await axios.get(`${API_BASE}/stats`, { withCredentials: true });
    return res.data;
  },
};