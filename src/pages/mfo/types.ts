export interface MfoOffer {
  id: number;
  name: string;
  logo: string;
  amount: string;
  rate: string;
  term: string;
  approval: string;
  features: string[];
  cpaLink: string;
  badge: string | null;
  badgeColor: string | null;
}

export interface MfoBenefit {
  icon: string;
  title: string;
  description: string;
}

export interface MfoStep {
  step: number;
  icon: string;
  title: string;
  description: string;
}

export interface MfoFaq {
  question: string;
  answer: string;
}

export interface MfoConfig {
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  site: {
    siteName: string;
    phone: string;
    email: string;
    workingHours: string;
  };
  hero: {
    title: string;
    subtitle: string;
    features: string[];
  };
  offers: MfoOffer[];
  benefits: MfoBenefit[];
  howItWorks: MfoStep[];
  faq: MfoFaq[];
  footer: {
    companyName: string;
    disclaimer: string;
    links: Array<{ title: string; url: string }>;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
}
