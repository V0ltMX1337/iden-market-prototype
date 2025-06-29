import axios from "axios";
import type { User, Category, City, SystemSettings } from "../lib/types";

const API_BASE = "http://94.156.112.180:7000"; // или полный путь, если нужен: http://localhost:3000/api

export const storeApi = {
  // USERS
  async getUsers(): Promise<User[]> {
    const res = await axios.get(`${API_BASE}/users`, { withCredentials: true });
    return res.data;
  },

  async getUserByEmail(email: string): Promise<User | null> {
    const res = await axios.get(`${API_BASE}/users?email=${email}`, { withCredentials: true });
    return res.data || null;
  },

  async addUser(user: Omit<User, "id">): Promise<User> {
    const res = await axios.post(`${API_BASE}/users`, user, { withCredentials: true });
    return res.data;
  },

  async updateUser(id: string, updates: Partial<User>): Promise<boolean> {
    await axios.patch(`${API_BASE}/users/${id}`, updates, { withCredentials: true });
    return true;
  },

  async deleteUser(id: string): Promise<boolean> {
    await axios.delete(`${API_BASE}/users/${id}`, { withCredentials: true });
    return true;
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

  async addSubcategory(categoryId: string, subcategory: { name: string; items: string[] }) {
    await axios.post(`${API_BASE}/categories/${categoryId}/subcategories`, subcategory, {
      withCredentials: true,
    });
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
    const res = await axios.get(`${API_BASE}/settings`, { withCredentials: true });
    return res.data;
  },

  async updateSystemSettings(updates: Partial<SystemSettings>): Promise<void> {
    await axios.patch(`${API_BASE}/settings`, updates, { withCredentials: true });
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
