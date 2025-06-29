interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "Пользователь" | "Модератор" | "Администратор";
  registrationDate: string;
  status: "active" | "blocked";
}

interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories: Array<{
    name: string;
    items: string[];
  }>;
}

interface City {
  id: string;
  name: string;
  region: string;
}

interface SystemSettings {
  siteName: string;
  siteDescription: string;
  seoTitle: string;
  seoDescription: string;
  commission: number;
}

interface StoreData {
  users: User[];
  categories: Category[];
  cities: City[];
  systemSettings: SystemSettings;
}

// Начальные данные
const initialData: StoreData = {
  users: [
    {
      id: "1",
      name: "Иван Петров",
      email: "admin@trivo.ru",
      password: "admin123",
      role: "Администратор",
      registrationDate: "2024-01-15",
      status: "active",
    },
    {
      id: "2",
      name: "Мария Сидорова",
      email: "maria@example.com",
      password: "password123",
      role: "Модератор",
      registrationDate: "2024-02-20",
      status: "active",
    },
    {
      id: "3",
      name: "Алексей Иванов",
      email: "alex@example.com",
      password: "password123",
      role: "Пользователь",
      registrationDate: "2024-03-10",
      status: "blocked",
    },
  ],
  categories: [
    {
      id: "1",
      name: "Авто",
      icon: "Car",
      subcategories: [
        {
          name: "Легковые автомобили",
          items: [
            "С пробегом",
            "Новые",
            "BMW",
            "Mercedes",
            "Toyota",
            "Volkswagen",
          ],
        },
        {
          name: "Грузовики и спецтехника",
          items: ["Грузовики", "Автобусы", "Прицепы", "Спецтехника"],
        },
      ],
    },
    {
      id: "2",
      name: "Недвижимость",
      icon: "Home",
      subcategories: [
        {
          name: "Квартиры",
          items: ["Продажа", "Аренда", "1-комнатные", "2-комнатные"],
        },
      ],
    },
    {
      id: "3",
      name: "Работа",
      icon: "Briefcase",
      subcategories: [],
    },
    {
      id: "4",
      name: "Электроника",
      icon: "Smartphone",
      subcategories: [],
    },
  ],
  cities: [
    { id: "1", name: "Москва", region: "Московская область" },
    { id: "2", name: "Санкт-Петербург", region: "Ленинградская область" },
    { id: "3", name: "Екатеринбург", region: "Свердловская область" },
  ],
  systemSettings: {
    siteName: "TRIVO",
    siteDescription: "Крупнейшая площадка объявлений в России",
    seoTitle: "TRIVO - Объявления России",
    seoDescription: "Купить и продать товары на TRIVO - безопасно и выгодно",
    commission: 5,
  },
};

class Store {
  private data: StoreData;
  private readonly STORAGE_KEY = "trivo_store";

  constructor() {
    this.data = this.loadFromStorage();
  }

  private loadFromStorage(): StoreData {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : initialData;
    } catch {
      return initialData;
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
    } catch (error) {
      console.error("Ошибка сохранения данных:", error);
    }
  }

  // Пользователи
  getUsers(): User[] {
    return this.data.users;
  }

  getUserByEmail(email: string): User | null {
    return this.data.users.find((user) => user.email === email) || null;
  }

  addUser(user: Omit<User, "id">): User {
    const newUser = {
      ...user,
      id: Date.now().toString(),
    };
    this.data.users.push(newUser);
    this.saveToStorage();
    return newUser;
  }

  updateUser(id: string, updates: Partial<User>): boolean {
    const index = this.data.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.data.users[index] = { ...this.data.users[index], ...updates };
      this.saveToStorage();
      return true;
    }
    return false;
  }

  deleteUser(id: string): boolean {
    const index = this.data.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.data.users.splice(index, 1);
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // Категории
  getCategories(): Category[] {
    return this.data.categories;
  }

  addCategory(category: Omit<Category, "id">): Category {
    const newCategory = {
      ...category,
      id: Date.now().toString(),
    };
    this.data.categories.push(newCategory);
    this.saveToStorage();
    return newCategory;
  }

  updateCategory(id: string, updates: Partial<Category>): boolean {
    const index = this.data.categories.findIndex((cat) => cat.id === id);
    if (index !== -1) {
      this.data.categories[index] = {
        ...this.data.categories[index],
        ...updates,
      };
      this.saveToStorage();
      return true;
    }
    return false;
  }

  deleteCategory(id: string): boolean {
    const index = this.data.categories.findIndex((cat) => cat.id === id);
    if (index !== -1) {
      this.data.categories.splice(index, 1);
      this.saveToStorage();
      return true;
    }
    return false;
  }

  addSubcategory(
    categoryId: string,
    subcategory: { name: string; items: string[] },
  ): boolean {
    const category = this.data.categories.find((cat) => cat.id === categoryId);
    if (category) {
      category.subcategories.push(subcategory);
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // Города
  getCities(): City[] {
    return this.data.cities;
  }

  addCity(city: Omit<City, "id">): City {
    const newCity = {
      ...city,
      id: Date.now().toString(),
    };
    this.data.cities.push(newCity);
    this.saveToStorage();
    return newCity;
  }

  deleteCity(id: string): boolean {
    const index = this.data.cities.findIndex((city) => city.id === id);
    if (index !== -1) {
      this.data.cities.splice(index, 1);
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // Настройки системы
  getSystemSettings(): SystemSettings {
    return this.data.systemSettings;
  }

  updateSystemSettings(updates: Partial<SystemSettings>): void {
    this.data.systemSettings = { ...this.data.systemSettings, ...updates };
    this.saveToStorage();
  }

  // Статистика
  getStats() {
    const users = this.getUsers();
    return {
      totalUsers: users.length,
      activeUsers: users.filter((u) => u.status === "active").length,
      totalCategories: this.data.categories.length,
      totalCities: this.data.cities.length,
      totalRevenue: 125430,
      monthlyRevenue: 15670,
    };
  }
}

export const store = new Store();
export type { User, Category, City, SystemSettings };
