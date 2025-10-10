import { MfoConfig } from './types';

// В production окружении этот файл генерируется из config.yml
// Для разработки используем хардкод конфига

export const mfoConfig: MfoConfig = {
  seo: {
    title: "Моментальные займы онлайн - Деньги за 5 минут без отказа",
    description: "Получите деньги на карту за 5 минут! Займы от 1000₽ до 100000₽. Без проверки кредитной истории. Одобрение 98%. Первый займ под 0%!",
    keywords: "займ онлайн, деньги на карту, микрозайм, быстрый займ, займ без отказа"
  },
  site: {
    siteName: "Моментальные Займы",
    phone: "+7 (800) 555-35-35",
    email: "info@займы-онлайн.рф",
    workingHours: "Круглосуточно, без выходных"
  },
  hero: {
    title: "Деньги на карту за 5 минут",
    subtitle: "Займы от 1000₽ до 100000₽ без проверки кредитной истории",
    features: [
      "Одобрение 98%",
      "Первый займ 0%",
      "Без справок",
      "Круглосуточно"
    ]
  },
  offers: [
    {
      id: 1,
      name: "МигКредит",
      logo: "https://via.placeholder.com/120x60/FF6B6B/FFFFFF?text=MigCredit",
      amount: "до 100 000 ₽",
      rate: "от 0%",
      term: "до 365 дней",
      approval: "98%",
      features: [
        "Первый займ под 0%",
        "Без проверки КИ",
        "Деньги за 5 минут"
      ],
      cpaLink: "https://your-affiliate-link-1.com",
      badge: "Топ выбор",
      badgeColor: "bg-gradient-to-r from-yellow-400 to-orange-500"
    },
    {
      id: 2,
      name: "Быстроденьги",
      logo: "https://via.placeholder.com/120x60/4ECDC4/FFFFFF?text=FastMoney",
      amount: "до 70 000 ₽",
      rate: "от 0%",
      term: "до 180 дней",
      approval: "95%",
      features: [
        "0% для новых клиентов",
        "Одобрение за 3 минуты",
        "Без звонков"
      ],
      cpaLink: "https://your-affiliate-link-2.com",
      badge: "Популярное",
      badgeColor: "bg-gradient-to-r from-blue-400 to-cyan-500"
    },
    {
      id: 3,
      name: "ЗаймГо",
      logo: "https://via.placeholder.com/120x60/95E1D3/333333?text=ZaimGo",
      amount: "до 50 000 ₽",
      rate: "от 0%",
      term: "до 90 дней",
      approval: "92%",
      features: [
        "Без отказа",
        "Плохая КИ не проблема",
        "Моментальное решение"
      ],
      cpaLink: "https://your-affiliate-link-3.com",
      badge: null,
      badgeColor: null
    },
    {
      id: 4,
      name: "Crediton",
      logo: "https://via.placeholder.com/120x60/A8E6CF/333333?text=Crediton",
      amount: "до 80 000 ₽",
      rate: "от 0%",
      term: "до 270 дней",
      approval: "96%",
      features: [
        "Акция: первый займ бесплатно",
        "Онлайн за 5 минут",
        "Без посещения офиса"
      ],
      cpaLink: "https://your-affiliate-link-4.com",
      badge: "Акция",
      badgeColor: "bg-gradient-to-r from-purple-400 to-pink-500"
    }
  ],
  benefits: [
    {
      icon: "Zap",
      title: "Быстрое решение",
      description: "Рассмотрение заявки за 5 минут, деньги на карту моментально"
    },
    {
      icon: "Shield",
      title: "Надежно и безопасно",
      description: "Все МФО имеют лицензию ЦБ РФ, ваши данные под защитой"
    },
    {
      icon: "TrendingUp",
      title: "Гибкие условия",
      description: "Выберите сумму и срок займа под ваши возможности"
    },
    {
      icon: "CheckCircle",
      title: "Без отказа",
      description: "Одобрение до 98%, даже с плохой кредитной историей"
    }
  ],
  howItWorks: [
    {
      step: 1,
      icon: "FileText",
      title: "Выберите предложение",
      description: "Сравните условия и выберите подходящий займ"
    },
    {
      step: 2,
      icon: "Edit",
      title: "Заполните заявку",
      description: "Укажите паспортные данные и контакты"
    },
    {
      step: 3,
      icon: "Clock",
      title: "Получите решение",
      description: "Ответ приходит за 5 минут"
    },
    {
      step: 4,
      icon: "CreditCard",
      title: "Получите деньги",
      description: "Средства поступят на вашу карту"
    }
  ],
  faq: [
    {
      question: "Как быстро я получу деньги?",
      answer: "После одобрения заявки деньги поступают на карту в течение 5-15 минут. В некоторых случаях перевод может занять до 1 часа."
    },
    {
      question: "Можно ли получить займ с плохой кредитной историей?",
      answer: "Да! Многие МФО одобряют займы даже клиентам с негативной КИ. Процент одобрения составляет до 98%."
    },
    {
      question: "Какие документы нужны для займа?",
      answer: "Нужен только паспорт РФ и номер телефона. Никаких справок о доходах не требуется."
    },
    {
      question: "Что такое займ под 0%?",
      answer: "Это акция для новых клиентов - вы берете деньги и возвращаете ровно ту же сумму без процентов при условии возврата в срок."
    },
    {
      question: "Безопасно ли оформлять займ онлайн?",
      answer: "Да, все представленные МФО имеют лицензию ЦБ РФ и используют защищенное соединение для передачи данных."
    }
  ],
  footer: {
    companyName: "© 2025 Моментальные Займы",
    disclaimer: "Информация на сайте не является публичной офертой. Условия займов уточняйте на сайтах МФО. Сервис является информационным агрегатором.",
    links: [
      { title: "Политика конфиденциальности", url: "/privacy" },
      { title: "Пользовательское соглашение", url: "/terms" }
    ]
  },
  colors: {
    primary: "#10B981",
    secondary: "#3B82F6",
    accent: "#F59E0B",
    background: "#F9FAFB",
    text: "#111827"
  }
};
