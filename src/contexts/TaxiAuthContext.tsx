import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'client' | 'driver' | 'manager' | 'admin';

export interface TaxiUser {
  id: string;
  email: string;
  phone: string;
  name: string;
  role: UserRole;
  avatar?: string;
  isActive: boolean;
  createdAt: Date;
  
  // Дополнительные поля для водителей
  carModel?: string;
  carNumber?: string;
  carColor?: string;
  driverLicense?: string;
  rating?: number;
  
  // Дополнительные поля для клиентов
  favoriteAddresses?: Array<{
    id: string;
    name: string;
    address: string;
    coordinates: [number, number];
  }>;
  
  // Платежные карты
  paymentCards?: Array<{
    id: string;
    lastFour: string;
    type: 'visa' | 'mastercard' | 'mir';
    isDefault: boolean;
  }>;
}

export interface TaxiOrder {
  id: string;
  clientId: string;
  driverId?: string;
  type: 'taxi' | 'food' | 'truck';
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  
  // Маршрут
  fromAddress: string;
  fromCoordinates: [number, number];
  toAddress: string;
  toCoordinates: [number, number];
  waypoints?: Array<{
    address: string;
    coordinates: [number, number];
  }>;
  
  // Стоимость
  baseCost: number; // А - базовая ставка
  distanceCost: number; // Б - за км
  nightSurcharge: number; // В - ночная надбавка
  holidaySurcharge: number; // Г - праздничная надбавка
  totalCost: number;
  distance: number; // в км
  
  // Время
  createdAt: Date;
  scheduledAt?: Date;
  acceptedAt?: Date;
  completedAt?: Date;
  
  // Дополнительные параметры
  passengerCount: number;
  comment?: string;
  paymentMethod: 'cash' | 'card';
  rating?: number;
  review?: string;
}

interface TaxiAuthContextType {
  user: TaxiUser | null;
  orders: TaxiOrder[];
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<TaxiUser>) => Promise<void>;
  createOrder: (orderData: CreateOrderData) => Promise<TaxiOrder>;
  getOrderHistory: (userId: string) => Promise<TaxiOrder[]>;
  addPaymentCard: (cardData: PaymentCardData) => Promise<void>;
  removePaymentCard: (cardId: string) => Promise<void>;
  calculateCost: (params: CostCalculationParams) => number;
}

interface RegisterData {
  email: string;
  password: string;
  phone: string;
  name: string;
  role: UserRole;
  carModel?: string;
  carNumber?: string;
  carColor?: string;
}

interface CreateOrderData {
  type: 'taxi' | 'food' | 'truck';
  fromAddress: string;
  fromCoordinates: [number, number];
  toAddress: string;
  toCoordinates: [number, number];
  waypoints?: Array<{
    address: string;
    coordinates: [number, number];
  }>;
  scheduledAt?: Date;
  passengerCount: number;
  comment?: string;
  paymentMethod: 'cash' | 'card';
}

interface PaymentCardData {
  number: string;
  expiry: string;
  cvv: string;
  holderName: string;
}

interface CostCalculationParams {
  city: 'dzerzhinsk' | 'nizhny';
  distance: number;
  isNight: boolean;
  isHoliday: boolean;
}

const TaxiAuthContext = createContext<TaxiAuthContextType | null>(null);

export const useTaxiAuth = () => {
  const context = useContext(TaxiAuthContext);
  if (!context) {
    throw new Error('useTaxiAuth must be used within TaxiAuthProvider');
  }
  return context;
};

interface TaxiAuthProviderProps {
  children: ReactNode;
}

export const TaxiAuthProvider: React.FC<TaxiAuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<TaxiUser | null>(null);
  const [orders, setOrders] = useState<TaxiOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Проверка токена при загрузке
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('taxi_token');
        if (token) {
          // В будущем здесь будет запрос к API для проверки токена
          const savedUser = localStorage.getItem('taxi_user');
          if (savedUser) {
            setUser(JSON.parse(savedUser));
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
        localStorage.removeItem('taxi_token');
        localStorage.removeItem('taxi_user');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Расчет стоимости поездки
  const calculateCost = (params: CostCalculationParams): number => {
    const { city, distance, isNight, isHoliday } = params;
    
    // А - базовая ставка
    const baseCost = city === 'dzerzhinsk' ? 200 : 250;
    
    // Б - стоимость за километраж
    const distanceCost = distance * 20;
    
    // В - ночная надбавка (15%)
    const nightSurcharge = isNight ? (baseCost + distanceCost) * 0.15 : 0;
    
    // Г - праздничная надбавка (5%)
    const holidaySurcharge = isHoliday ? (baseCost + distanceCost) * 0.05 : 0;
    
    return Math.round(baseCost + distanceCost + nightSurcharge + holidaySurcharge);
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Временная заглушка для демонстрации
      // В будущем здесь будет реальный запрос к API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userRole = email.includes('admin') ? 'admin' : 
                    email.includes('driver') ? 'driver' :
                    email.includes('manager') ? 'manager' : 'client';
      
      const mockUser: TaxiUser = {
        id: '1',
        email,
        phone: '+7 (900) 123-45-67',
        name: 'Иван Иванов',
        role: userRole,
        isActive: true,
        createdAt: new Date(),
        rating: 4.8,
        carModel: userRole === 'driver' ? 'Toyota Camry' : undefined,
        carNumber: userRole === 'driver' ? 'А123ВС52' : undefined,
        carColor: userRole === 'driver' ? 'Белый' : undefined,
        driverLicense: userRole === 'driver' ? '1234567890' : undefined,
        favoriteAddresses: [
          {
            id: '1',
            name: 'Дом',
            address: 'ул. Ленина, 1',
            coordinates: [56.2431, 43.8346]
          }
        ],
        paymentCards: [
          {
            id: '1',
            lastFour: '1234',
            type: 'visa',
            isDefault: true
          }
        ]
      };

      setUser(mockUser);
      localStorage.setItem('taxi_token', 'mock_token_' + Date.now());
      localStorage.setItem('taxi_user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Неверный email или пароль');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    setIsLoading(true);
    try {
      // Временная заглушка
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: TaxiUser = {
        id: Date.now().toString(),
        ...userData,
        isActive: userData.role === 'client',
        createdAt: new Date(),
        favoriteAddresses: [],
        paymentCards: []
      };

      setUser(newUser);
      localStorage.setItem('taxi_token', 'mock_token_' + Date.now());
      localStorage.setItem('taxi_user', JSON.stringify(newUser));
    } catch (error) {
      throw new Error('Ошибка регистрации');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setOrders([]);
    localStorage.removeItem('taxi_token');
    localStorage.removeItem('taxi_user');
  };

  const updateProfile = async (data: Partial<TaxiUser>) => {
    if (!user) throw new Error('Пользователь не авторизован');
    
    try {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('taxi_user', JSON.stringify(updatedUser));
    } catch (error) {
      throw new Error('Ошибка обновления профиля');
    }
  };

  const createOrder = async (orderData: CreateOrderData): Promise<TaxiOrder> => {
    if (!user) throw new Error('Пользователь не авторизован');
    
    try {
      // Рассчитываем расстояние (заглушка)
      const distance = Math.random() * 20 + 1; // 1-21 км
      
      // Определяем время для расчета надбавок
      const now = new Date();
      const isNight = now.getHours() >= 23 || now.getHours() < 6;
      const isHoliday = now.getDay() === 0 || now.getDay() === 6; // выходные как праздники
      
      // Рассчитываем стоимость
      const city = 'nizhny'; // по умолчанию
      const baseCost = city === 'dzerzhinsk' ? 200 : 250;
      const distanceCost = distance * 20;
      const nightSurcharge = isNight ? (baseCost + distanceCost) * 0.15 : 0;
      const holidaySurcharge = isHoliday ? (baseCost + distanceCost) * 0.05 : 0;
      const totalCost = calculateCost({ city, distance, isNight, isHoliday });

      const newOrder: TaxiOrder = {
        id: Date.now().toString(),
        clientId: user.id,
        ...orderData,
        status: 'pending',
        baseCost,
        distanceCost,
        nightSurcharge,
        holidaySurcharge,
        totalCost,
        distance: Math.round(distance * 100) / 100,
        createdAt: new Date()
      };

      setOrders(prev => [newOrder, ...prev]);
      return newOrder;
    } catch (error) {
      throw new Error('Ошибка создания заказа');
    }
  };

  const getOrderHistory = async (userId: string): Promise<TaxiOrder[]> => {
    try {
      // Заглушка для истории заказов
      const mockOrders: TaxiOrder[] = [
        {
          id: '1',
          clientId: userId,
          driverId: '2',
          type: 'taxi',
          status: 'completed',
          fromAddress: 'Красная площадь, 1',
          fromCoordinates: [56.2431, 43.8346],
          toAddress: 'ул. Большая Покровская, 15',
          toCoordinates: [56.2965, 44.0048],
          baseCost: 250,
          distanceCost: 120,
          nightSurcharge: 0,
          holidaySurcharge: 0,
          totalCost: 370,
          distance: 6,
          createdAt: new Date(Date.now() - 86400000),
          completedAt: new Date(Date.now() - 86400000 + 1200000),
          passengerCount: 1,
          paymentMethod: 'card',
          rating: 5,
          review: 'Отличная поездка!'
        }
      ];
      
      setOrders(mockOrders);
      return mockOrders;
    } catch (error) {
      throw new Error('Ошибка загрузки истории заказов');
    }
  };

  const addPaymentCard = async (cardData: PaymentCardData) => {
    if (!user) throw new Error('Пользователь не авторизован');
    
    try {
      const newCard = {
        id: Date.now().toString(),
        lastFour: cardData.number.slice(-4),
        type: cardData.number.startsWith('4') ? 'visa' : 
              cardData.number.startsWith('5') ? 'mastercard' : 'mir' as const,
        isDefault: !user.paymentCards?.length
      };

      const updatedUser = {
        ...user,
        paymentCards: [...(user.paymentCards || []), newCard]
      };

      setUser(updatedUser);
      localStorage.setItem('taxi_user', JSON.stringify(updatedUser));
    } catch (error) {
      throw new Error('Ошибка добавления карты');
    }
  };

  const removePaymentCard = async (cardId: string) => {
    if (!user) throw new Error('Пользователь не авторизован');
    
    try {
      const updatedUser = {
        ...user,
        paymentCards: user.paymentCards?.filter(card => card.id !== cardId) || []
      };

      setUser(updatedUser);
      localStorage.setItem('taxi_user', JSON.stringify(updatedUser));
    } catch (error) {
      throw new Error('Ошибка удаления карты');
    }
  };

  const contextValue: TaxiAuthContextType = {
    user,
    orders,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    createOrder,
    getOrderHistory,
    addPaymentCard,
    removePaymentCard,
    calculateCost
  };

  return (
    <TaxiAuthContext.Provider value={contextValue}>
      {children}
    </TaxiAuthContext.Provider>
  );
};

export default TaxiAuthContext;