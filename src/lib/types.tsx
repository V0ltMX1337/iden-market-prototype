export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: "Администратор" | "Модератор" | "Пользователь";
  status: "active" | "blocked";
}

export interface Subcategory {
  name: string;
  items: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories: Subcategory[];
}

export interface City {
  id: string;
  name: string;
  region: string;
}

export interface SystemSettings {
  siteTitle: string;
  supportEmail: string;
  maxUsers: number;
  maintenanceMode: boolean;
  commission: number;
}
