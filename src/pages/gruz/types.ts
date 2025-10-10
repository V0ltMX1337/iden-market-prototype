export interface GruzService {
  id: number;
  name: string;
  capacity: string;
  volume: string;
  price: string;
  dimensions: string;
  description: string;
  icon: string;
  popular: boolean;
}

export interface GruzAdditionalService {
  name: string;
  price: string;
  icon: string;
  description: string;
}

export interface GruzBenefit {
  icon: string;
  title: string;
  description: string;
}

export interface GruzStep {
  step: number;
  icon: string;
  title: string;
  description: string;
}

export interface GruzFaq {
  question: string;
  answer: string;
}

export interface GruzTestimonial {
  id: number;
  name: string;
  rating: number;
  text: string;
  date: string;
  service: string;
}

export interface GruzPricing {
  withinMKAD: {
    name: string;
    description: string;
    gazelle: string;
    gazelleXL: string;
    truck3t: string;
    truck5t: string;
    minTime: string;
  };
  outOfMKAD: {
    name: string;
    description: string;
    basePrice: string;
    minDistance: string;
  };
  intercity: {
    name: string;
    description: string;
    calculation: string;
    discount: string;
  };
}

export interface GruzConfig {
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  site: {
    companyName: string;
    tagline: string;
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    workingHours: string;
    inn: string;
    ogrn: string;
  };
  hero: {
    title: string;
    subtitle: string;
    buttonText: string;
    features: string[];
  };
  services: GruzService[];
  additionalServices: GruzAdditionalService[];
  benefits: GruzBenefit[];
  howItWorks: GruzStep[];
  pricing: GruzPricing;
  faq: GruzFaq[];
  testimonials: GruzTestimonial[];
  contacts: {
    phone: string;
    whatsapp: string;
    telegram: string;
    email: string;
    vk: string;
    instagram: string;
  };
  footer: {
    copyright: string;
    links: Array<{ title: string; url: string }>;
  };
  calculator: {
    enabled: boolean;
    defaultService: string;
    defaultHours: number;
    defaultLoaders: number;
    loadersPrice: number;
  };
  editor: {
    enabled: boolean;
    password: string;
    editableFields: string[];
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
}

export interface CalculatorState {
  service: string;
  hours: number;
  loaders: number;
  distance: number;
  additional: string[];
}
