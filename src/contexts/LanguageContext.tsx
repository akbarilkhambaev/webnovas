import { createContext, useState, ReactNode } from 'react';

export type Language = 'ru' | 'uz';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

interface TranslationObject {
  [key: string]: string | TranslationObject;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('ru');

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: TranslationObject | string = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Translations
const translations: Record<Language, TranslationObject> = {
  ru: {
    nav: {
      home: 'Главная',
      services: 'Услуги',
      portfolio: 'Портфолио',
      about: 'О нас',
      contact: 'Контакты',
      faq: 'FAQ',
      calculator: 'Калькулятор',
    },
    hero: {
      badge: 'Цифровое агентство будущего',
      title: 'Мы создаем',
      titleHighlight: 'Цифровые',
      titleEnd: 'Решения',
      description: 'От потрясающих веб-сайтов до мощной автоматизации — мы создаем высокопроизводительные цифровые решения, которые стимулируют рост и выделяют вас.',
      startProject: 'Начать проект',
      viewWork: 'Наши работы',
    },
    services: {
      title: 'Что мы делаем',
      heading: 'Наши',
      headingHighlight: 'Услуги',
      website: {
        title: 'Веб-сайты',
        description: 'Современные, адаптивные сайты, которые увлекают вашу аудиторию и превращают посетителей в клиентов.',
      },
      ecommerce: {
        title: 'E-Commerce',
        description: 'Полнофункциональные интернет-магазины, созданные для производительности, безопасности и удобства пользователей.',
      },
      telegram: {
        title: 'Telegram боты',
        description: 'Умные боты, которые автоматизируют поддержку клиентов, продажи и взаимодействие 24/7.',
      },
      webapp: {
        title: 'Веб-приложения',
        description: 'Кастомные веб-приложения со сложной логикой, дашбордами и функциями реального времени.',
      },
      automation: {
        title: 'Автоматизация',
        description: 'Автоматизация рабочих процессов, которая устраняет ручные задачи и ускоряет бизнес-процессы.',
      },
    },
    whyChooseUs: {
      title: 'Почему выбирают нас',
      heading: 'Наши',
      headingHighlight: 'Преимущества',
      quality: {
        title: 'Качество',
        description: 'Высокие стандарты разработки и дизайна',
      },
      speed: {
        title: 'Скорость',
        description: 'Быстрая разработка без потери качества',
      },
      support: {
        title: 'Поддержка',
        description: 'Техподдержка 24/7 после запуска',
      },
      price: {
        title: 'Цена',
        description: 'Прозрачное ценообразование без скрытых платежей',
      },
    },
    workProcess: {
      title: 'Как мы работаем',
      heading: 'Процесс',
      headingHighlight: 'Работы',
      step1: {
        title: 'Анализ',
        description: 'Изучаем ваш бизнес и требования',
      },
      step2: {
        title: 'Дизайн',
        description: 'Создаем уникальный дизайн проекта',
      },
      step3: {
        title: 'Разработка',
        description: 'Разрабатываем с использованием передовых технологий',
      },
      step4: {
        title: 'Запуск',
        description: 'Тестируем и запускаем ваш проект',
      },
    },
    portfolio: {
      title: 'Наши работы',
      heading: 'Портфолио',
      headingHighlight: 'Проектов',
      viewProject: 'Смотреть проект',
    },
    testimonials: {
      title: 'Отзывы',
      heading: 'Что говорят',
      headingHighlight: 'Клиенты',
    },
    stats: {
      projects: 'Проектов',
      clients: 'Клиентов',
      years: 'Лет опыта',
      satisfaction: 'Довольных клиентов',
    },
    faq: {
      title: 'Частые вопросы',
      heading: 'FAQ',
      headingHighlight: 'Ответы на вопросы',
      q1: {
        question: 'Сколько стоит разработка сайта?',
        answer: 'Стоимость зависит от сложности проекта, функционала и сроков. Используйте наш калькулятор для предварительной оценки.',
      },
      q2: {
        question: 'Сколько времени займет разработка?',
        answer: 'Простой сайт - 1-2 недели, интернет-магазин - 3-4 недели, сложное веб-приложение - от 1 месяца.',
      },
      q3: {
        question: 'Предоставляете ли вы техподдержку?',
        answer: 'Да, мы предоставляем техническую поддержку и обслуживание после запуска проекта.',
      },
      q4: {
        question: 'Можно ли вносить изменения после запуска?',
        answer: 'Конечно! Мы можем вносить любые изменения и дополнения в проект после запуска.',
      },
      q5: {
        question: 'Работаете ли вы с клиентами из других стран?',
        answer: 'Да, мы работаем с клиентами по всему миру. Связь поддерживаем через Telegram, WhatsApp и email.',
      },
    },
    contact: {
      title: 'Связаться с нами',
      heading: 'Свяжитесь',
      headingHighlight: 'С нами',
      description: 'Готовы начать свой проект? Заполните форму, и мы свяжемся с вами в ближайшее время.',
      form: {
        name: 'Ваше имя',
        namePlaceholder: 'Иван Иванов',
        email: 'Email',
        emailPlaceholder: 'ivan@example.com',
        phone: 'Телефон',
        phonePlaceholder: '+998 90 123 45 67',
        service: 'Услуга',
        servicePlaceholder: 'Выберите услугу',
        message: 'Сообщение',
        messagePlaceholder: 'Расскажите о вашем проекте...',
        submit: 'Отправить заявку',
        sending: 'Отправка...',
      },
      info: {
        email: 'Email',
        phone: 'Телефон',
        address: 'Адрес',
        addressValue: 'Ташкент, Узбекистан',
      },
    },
    calculator: {
      title: 'Калькулятор стоимости',
      heading: 'Рассчитайте',
      headingHighlight: 'Стоимость',
      description: 'Получите предварительную оценку стоимости вашего проекта.',
      projectType: 'Тип проекта',
      features: 'Дополнительные функции',
      timeline: 'Сроки',
      budget: 'Бюджет',
      estimate: 'Предварительная стоимость',
      from: 'от',
      consultation: 'Получить консультацию',
    },
    techStack: {
      title: 'Наши технологии',
      heading: 'Технологический',
      headingHighlight: 'Стек',
    },
    cta: {
      heading: 'Готовы начать',
      headingHighlight: 'Ваш проект?',
      description: 'Давайте создадим что-то удивительное вместе',
      button: 'Начать сейчас',
    },
    footer: {
      description: 'Создаем цифровые решения, которые работают.',
      quickLinks: 'Быстрые ссылки',
      services: 'Услуги',
      legal: 'Документы',
      privacy: 'Политика конфиденциальности',
      terms: 'Условия использования',
      rights: 'Все права защищены.',
    },
    chat: {
      tooltip: 'Написать нам',
    },
    news: {
      label: 'Блог & Новости',
      heading: 'Последние',
      headingHighlight: 'Статьи',
      allArticles: 'Все статьи',
      readMore: 'Читать далее',
      backHome: 'На главную',
      backToNews: 'Все статьи',
      back: 'Назад',
      pageDescription: 'Полезные материалы о веб-разработке, дизайне, автоматизации и цифровом маркетинге.',
      searchPlaceholder: 'Поиск статей...',
      allCategories: 'Все',
      noResults: 'Статьи не найдены',
      share: 'Поделиться',
      relatedArticles: 'Похожие статьи',
      notFound: 'Статья не найдена',
    },
  },
  uz: {
    nav: {
      home: 'Bosh sahifa',
      services: 'Xizmatlar',
      portfolio: 'Portfolio',
      about: 'Biz haqimizda',
      contact: 'Aloqa',
      faq: 'Savollar',
      calculator: 'Kalkulyator',
    },
    hero: {
      badge: 'Kelajak raqamli agentligi',
      title: 'Biz yaratamiz',
      titleHighlight: 'Raqamli',
      titleEnd: 'Yechimlar',
      description: 'Ajoyib veb-saytlardan tortib kuchli avtomatlashtirishgacha - biz o\'sishni rag\'batlantiruvchi va sizni ajratib turadigan yuqori samarali raqamli yechimlarni yaratamiz.',
      startProject: 'Loyihani boshlash',
      viewWork: 'Bizning ishlar',
    },
    services: {
      title: 'Biz nima qilamiz',
      heading: 'Bizning',
      headingHighlight: 'Xizmatlar',
      website: {
        title: 'Veb-saytlar',
        description: 'Auditoriyangizni qiziqtiradigan va tashrif buyuruvchilarni mijozlarga aylantiradigan zamonaviy, moslashuvchan veb-saytlar.',
      },
      ecommerce: {
        title: 'Elektron tijorat',
        description: 'Ishlash, xavfsizlik va foydalanuvchi tajribasi uchun yaratilgan to\'liq funksional onlayn do\'konlar.',
      },
      telegram: {
        title: 'Telegram botlar',
        description: 'Mijozlarni qo\'llab-quvvatlash, sotish va aloqani 24/7 avtomatlashtiruvchi aqlli botlar.',
      },
      webapp: {
        title: 'Veb-ilovalar',
        description: 'Murakkab mantiq, boshqaruv panellari va real vaqt funksiyalari bilan maxsus veb-ilovalar.',
      },
      automation: {
        title: 'Avtomatlashtirish',
        description: 'Qo\'lda bajariluvchi vazifalarni yo\'q qiladigan va biznes jarayonlarini tezlashtiradigan ish jarayonlarini avtomatlashtirish.',
      },
    },
    whyChooseUs: {
      title: 'Nima uchun bizni tanlaydilar',
      heading: 'Bizning',
      headingHighlight: 'Afzalliklar',
      quality: {
        title: 'Sifat',
        description: 'Yuqori razrabotka va dizayn standartlari',
      },
      speed: {
        title: 'Tezlik',
        description: 'Sifatni yo\'qotmasdan tez ishlab chiqish',
      },
      support: {
        title: 'Qo\'llab-quvvatlash',
        description: 'Ishga tushirilgandan keyin 24/7 texnik yordam',
      },
      price: {
        title: 'Narx',
        description: 'Yashirin to\'lovlarsiz shaffof narxlar',
      },
    },
    workProcess: {
      title: 'Biz qanday ishlaymiz',
      heading: 'Ish',
      headingHighlight: 'Jarayoni',
      step1: {
        title: 'Tahlil',
        description: 'Biznesingiz va talablaringizni o\'rganamiz',
      },
      step2: {
        title: 'Dizayn',
        description: 'Loyihaning noyob dizaynini yaratamiz',
      },
      step3: {
        title: 'Ishlab chiqish',
        description: 'Ilg\'or texnologiyalardan foydalanib ishlab chiqamiz',
      },
      step4: {
        title: 'Ishga tushirish',
        description: 'Loyihangizni sinovdan o\'tkazamiz va ishga tushiramiz',
      },
    },
    portfolio: {
      title: 'Bizning ishlar',
      heading: 'Loyihalar',
      headingHighlight: 'Portfoliosi',
      viewProject: 'Loyihani ko\'rish',
    },
    testimonials: {
      title: 'Fikrlar',
      heading: 'Mijozlar',
      headingHighlight: 'Nima deyishadi',
    },
    stats: {
      projects: 'Loyihalar',
      clients: 'Mijozlar',
      years: 'Yillik tajriba',
      satisfaction: 'Mamnun mijozlar',
    },
    faq: {
      title: 'Ko\'p so\'raladigan savollar',
      heading: 'FAQ',
      headingHighlight: 'Savollarga javoblar',
      q1: {
        question: 'Veb-sayt ishlab chiqish qancha turadi?',
        answer: 'Narx loyihaning murakkabligi, funksionalligi va muddatlariga bog\'liq. Dastlabki baholash uchun kalkulyatorimizdan foydalaning.',
      },
      q2: {
        question: 'Ishlab chiqish qancha vaqt oladi?',
        answer: 'Oddiy veb-sayt - 1-2 hafta, onlayn do\'kon - 3-4 hafta, murakkab veb-ilova - 1 oydan.',
      },
      q3: {
        question: 'Texnik yordam taqdim etasizmi?',
        answer: 'Ha, biz loyiha ishga tushirilgandan keyin texnik yordam va xizmat ko\'rsatamiz.',
      },
      q4: {
        question: 'Ishga tushirilgandan keyin o\'zgartirishlar kiritish mumkinmi?',
        answer: 'Albatta! Biz ishga tushirilgandan keyin loyihaga har qanday o\'zgartirishlar va qo\'shimchalar kiritishimiz mumkin.',
      },
      q5: {
        question: 'Boshqa mamlakatlardan mijozlar bilan ishlaysizmi?',
        answer: 'Ha, biz butun dunyo bo\'ylab mijozlar bilan ishlaymiz. Telegram, WhatsApp va email orqali aloqada bo\'lamiz.',
      },
    },
    contact: {
      title: 'Biz bilan bog\'laning',
      heading: 'Biz bilan',
      headingHighlight: 'Bog\'laning',
      description: 'Loyihangizni boshlashga tayyormisiz? Formani to\'ldiring va biz tez orada siz bilan bog\'lanamiz.',
      form: {
        name: 'Ismingiz',
        namePlaceholder: 'Alisher Aliyev',
        email: 'Email',
        emailPlaceholder: 'alisher@example.com',
        phone: 'Telefon',
        phonePlaceholder: '+998 90 123 45 67',
        service: 'Xizmat',
        servicePlaceholder: 'Xizmatni tanlang',
        message: 'Xabar',
        messagePlaceholder: 'Loyihangiz haqida gapirib bering...',
        submit: 'So\'rov yuborish',
        sending: 'Yuborilmoqda...',
      },
      info: {
        email: 'Email',
        phone: 'Telefon',
        address: 'Manzil',
        addressValue: 'Toshkent, O\'zbekiston',
      },
    },
    calculator: {
      title: 'Narx kalkulyatori',
      heading: 'Hisoblang',
      headingHighlight: 'Narxi',
      description: 'Loyihangiz narxining dastlabki bahosini oling.',
      projectType: 'Loyiha turi',
      features: 'Qo\'shimcha funksiyalar',
      timeline: 'Muddatlar',
      budget: 'Byudjet',
      estimate: 'Dastlabki narx',
      from: 'dan',
      consultation: 'Konsultatsiya olish',
    },
    techStack: {
      title: 'Bizning texnologiyalar',
      heading: 'Texnologik',
      headingHighlight: 'Stack',
    },
    cta: {
      heading: 'Boshlashga tayyormisiz',
      headingHighlight: 'Loyihangizni?',
      description: 'Keling, birgalikda ajoyib narsalarni yarataylik',
      button: 'Hozir boshlash',
    },
    footer: {
      description: 'Ishlaydigan raqamli yechimlarni yaratamiz.',
      quickLinks: 'Tezkor havolalar',
      services: 'Xizmatlar',
      legal: 'Hujjatlar',
      privacy: 'Maxfiylik siyosati',
      terms: 'Foydalanish shartlari',
      rights: 'Barcha huquqlar himoyalangan.',
    },
    chat: {
      tooltip: 'Bizga yozing',
    },
    news: {
      label: 'Blog & Yangiliklar',
      heading: 'So\'nggi',
      headingHighlight: 'Maqolalar',
      allArticles: 'Barcha maqolalar',
      readMore: 'Batafsil o\'qish',
      backHome: 'Bosh sahifaga',
      backToNews: 'Barcha maqolalar',
      back: 'Orqaga',
      pageDescription: 'Veb-ishlab chiqish, dizayn, avtomatlashtirish va raqamli marketing bo\'yicha foydali materiallar.',
      searchPlaceholder: 'Maqolalarni qidirish...',
      allCategories: 'Hammasi',
      noResults: 'Maqolalar topilmadi',
      share: 'Ulashish',
      relatedArticles: 'O\'xshash maqolalar',
      notFound: 'Maqola topilmadi',
    },
  },
};
