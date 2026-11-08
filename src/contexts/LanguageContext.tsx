'use client'

import { createContext, useEffect, useState, ReactNode } from 'react';

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

  // Атрибут lang у <html> следует за выбранным языком: так текст верно читают скринридеры и переводчики
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

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
    home: {
      kicker: 'Разработка сайтов · Ташкент',
      titleStart: 'Сайты и системы, которые',
      titleHighlight: 'работают',
      titleEnd: 'на ваш бизнес',
      description: 'Проектируем и разрабатываем сайты, интернет-магазины, Telegram-боты и веб-приложения — от первой встречи до запуска.',
      cta: 'Обсудить проект',
      viewWork: 'Смотреть работы',
      factSite: 'Сайт',
      factBot: 'Telegram-бот',
      factLaunch: 'Запуск',
      factLaunchValue: 'от 1–2 недель',
      menu: 'Открыть меню',
      closeMenu: 'Закрыть меню',
      changeLanguage: 'Сменить язык',
      ornament: 'Восьмиконечная звезда — геометрический орнамент',
      labels: {
        services: 'Услуги',
        work: 'Работы',
        process: 'Процесс',
        price: 'Цены',
        faq: 'Вопросы',
        news: 'Блог',
        contact: 'Контакты',
      },
      services: {
        heading: 'Что мы делаем',
        sub: 'Пять направлений — от первого сайта компании до систем, которые снимают с команды ручную работу.',
      },
      work: {
        heading: 'Сайты, которые уже работают',
        sub: 'Каталоги и лендинги для компаний в Узбекистане и за рубежом. Каждый можно открыть и проверить.',
        visit: 'Открыть сайт',
      },
      process: {
        heading: 'Четыре шага до запуска',
      },
      calc: {
        heading: 'Посчитайте свой проект',
        type: 'Что нужно сделать',
        timeline: 'Срок',
        features: 'Дополнительно',
        estimate: 'Ориентировочно',
        rowProject: 'Проект',
        rowTimeline: 'Срок',
        rowOptions: 'Опции',
        none: 'нет',
        cta: 'Получить точный расчёт',
        note: 'Это стартовая цена без скрытых платежей. Точную сумму назовём после короткого брифа.',
        urgent: 'Срочно',
        urgentRange: '1–2 недели',
        standard: 'Стандарт',
        standardRange: '3–4 недели',
        flexible: 'Гибко',
        flexibleRange: '1–2 месяца',
        cms: 'Система управления (CMS)',
        multilang: 'Несколько языков',
        seo: 'SEO-оптимизация',
        analytics: 'Аналитика и отчёты',
        payment: 'Онлайн-оплата',
        mobile: 'Мобильное приложение',
      },
      faq: {
        heading: 'Частые вопросы',
      },
      contact: {
        heading: 'Обсудим ваш проект?',
        description: 'Расскажите о задаче — предложим решение, срок и цену.',
        consentPrefix: 'Нажимая кнопку, вы соглашаетесь с ',
        consentLink: 'политикой конфиденциальности',
        consentSuffix: '.',
        sent: 'Спасибо! Мы свяжемся с вами в ближайшее время.',
        errorTitle: 'Ошибка',
        error: 'Не удалось отправить заявку. Попробуйте позже.',
      },
    },
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
        title: 'Сайты',
        description: 'Лендинги, сайты компаний и каталоги продукции с формой заявки. Удобно открываются и с телефона, и с компьютера.',
      },
      ecommerce: {
        title: 'Интернет-магазины',
        description: 'Каталог с фильтрами и поиском, корзина, оформление заказа и панель для управления товарами. Онлайн-оплату подключаем отдельно.',
      },
      telegram: {
        title: 'Telegram-боты',
        description: 'Принимают заявки и заказы, записывают клиентов, отвечают на частые вопросы и делают рассылки — круглосуточно, без оператора.',
      },
      webapp: {
        title: 'Веб-приложения',
        description: 'Личные кабинеты, CRM и внутренние системы под процессы вашей компании: роли сотрудников, отчёты, связь с другими сервисами.',
      },
      automation: {
        title: 'Автоматизация',
        description: 'Связываем сайт, CRM, таблицы и мессенджеры, чтобы заявки, уведомления и отчёты появлялись без ручного переноса данных.',
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
        title: 'Бриф и оценка',
        description: 'Созваниваемся, разбираем задачу и называем точную цену и срок. После согласования — предоплата 50%.',
      },
      step2: {
        title: 'Дизайн',
        description: 'Показываем макет главных страниц, согласуем правки и только после этого переходим к разработке.',
      },
      step3: {
        title: 'Разработка',
        description: 'Верстаем и программируем по утверждённому макету, по ходу показываем промежуточные результаты.',
      },
      step4: {
        title: 'Запуск',
        description: 'Проверяем на телефонах и компьютерах и публикуем проект. Остальные 50% — после сдачи, дальше 3 месяца бесплатной поддержки.',
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
      description: 'Разработка сайтов, интернет-магазинов и Telegram-ботов в Ташкенте.',
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
    home: {
      kicker: "Sayt yaratish · Toshkent",
      titleStart: "Biznesingiz uchun",
      titleHighlight: "ishlaydigan",
      titleEnd: "saytlar va tizimlar",
      description: "Saytlar, onlayn do'konlar, Telegram-botlar va veb-ilovalarni loyihalaymiz va ishlab chiqamiz — birinchi uchrashuvdan ishga tushirishgacha.",
      cta: "Loyihani muhokama qilish",
      viewWork: "Ishlarni ko'rish",
      factSite: "Sayt",
      factBot: "Telegram-bot",
      factLaunch: "Ishga tushirish",
      factLaunchValue: "1–2 haftadan",
      menu: "Menyuni ochish",
      closeMenu: "Menyuni yopish",
      changeLanguage: "Tilni o'zgartirish",
      ornament: "Sakkiz qirrali yulduz — geometrik naqsh",
      labels: {
        services: "Xizmatlar",
        work: "Ishlar",
        process: "Jarayon",
        price: "Narxlar",
        faq: "Savollar",
        news: "Blog",
        contact: "Aloqa",
      },
      services: {
        heading: "Biz nima qilamiz",
        sub: "Beshta yo'nalish — kompaniyaning birinchi saytidan jamoani qo'l mehnatidan xalos qiladigan tizimlargacha.",
      },
      work: {
        heading: "Allaqachon ishlayotgan saytlar",
        sub: "O'zbekiston va xorijdagi kompaniyalar uchun katalog saytlar va lendinglar. Har birini ochib ko'rish mumkin.",
        visit: "Saytni ochish",
      },
      process: {
        heading: "Ishga tushirishgacha to'rt qadam",
      },
      calc: {
        heading: "Loyihangizni hisoblang",
        type: "Nima qilish kerak",
        timeline: "Muddat",
        features: "Qo'shimcha",
        estimate: "Taxminan",
        rowProject: "Loyiha",
        rowTimeline: "Muddat",
        rowOptions: "Opsiyalar",
        none: "yo'q",
        cta: "Aniq hisob-kitob olish",
        note: "Bu yashirin to'lovlarsiz boshlang'ich narx. Aniq summani qisqa brifdan keyin aytamiz.",
        urgent: "Shoshilinch",
        urgentRange: "1–2 hafta",
        standard: "Standart",
        standardRange: "3–4 hafta",
        flexible: "Moslashuvchan",
        flexibleRange: "1–2 oy",
        cms: "Boshqaruv tizimi (CMS)",
        multilang: "Bir nechta til",
        seo: "SEO optimallashtirish",
        analytics: "Analitika va hisobotlar",
        payment: "Onlayn to'lov",
        mobile: "Mobil ilova",
      },
      faq: {
        heading: "Ko'p so'raladigan savollar",
      },
      contact: {
        heading: "Loyihangizni muhokama qilamizmi?",
        description: "Vazifangiz haqida gapirib bering — yechim, muddat va narxni taklif qilamiz.",
        consentPrefix: "Tugmani bosib, siz ",
        consentLink: "maxfiylik siyosatiga",
        consentSuffix: " rozilik bildirasiz.",
        sent: "Rahmat! Tez orada siz bilan bog'lanamiz.",
        errorTitle: "Xatolik",
        error: "So'rovni yuborib bo'lmadi. Keyinroq urinib ko'ring.",
      },
    },
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
        title: 'Saytlar',
        description: 'Lendinglar, kompaniya saytlari va mahsulot kataloglari — ariza formasi bilan. Telefonda ham, kompyuterda ham qulay ochiladi.',
      },
      ecommerce: {
        title: 'Onlayn do\'konlar',
        description: 'Filtr va qidiruvli katalog, savat, buyurtma rasmiylashtirish va mahsulotlarni boshqarish paneli. Onlayn to\'lov alohida ulanadi.',
      },
      telegram: {
        title: 'Telegram-botlar',
        description: 'Ariza va buyurtmalarni qabul qiladi, mijozlarni yozib oladi, ko\'p beriladigan savollarga javob beradi va xabarnomalar yuboradi — kecha-kunduz, operatorsiz.',
      },
      webapp: {
        title: 'Veb-ilovalar',
        description: 'Shaxsiy kabinetlar, CRM va kompaniyangiz jarayonlariga mos ichki tizimlar: xodimlar rollari, hisobotlar, boshqa servislar bilan bog\'lanish.',
      },
      automation: {
        title: 'Avtomatlashtirish',
        description: 'Sayt, CRM, jadvallar va messenjerlarni bog\'laymiz — arizalar, bildirishnomalar va hisobotlar ma\'lumotlarni qo\'lda ko\'chirmasdan paydo bo\'ladi.',
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
        title: 'Brif va baholash',
        description: 'Qo\'ng\'iroq qilib, vazifani tahlil qilamiz va aniq narx hamda muddatni aytamiz. Kelishilgandan keyin — 50% oldindan to\'lov.',
      },
      step2: {
        title: 'Dizayn',
        description: 'Asosiy sahifalar maketini ko\'rsatamiz, tuzatishlarni kelishib olamiz va shundan keyingina ishlab chiqishga o\'tamiz.',
      },
      step3: {
        title: 'Ishlab chiqish',
        description: 'Tasdiqlangan maket asosida sahifalarni yig\'amiz va dasturlaymiz, oraliq natijalarni jarayon davomida ko\'rsatamiz.',
      },
      step4: {
        title: 'Ishga tushirish',
        description: 'Telefon va kompyuterlarda tekshiramiz va loyihani e\'lon qilamiz. Qolgan 50% — topshirilgandan keyin, so\'ng 3 oy bepul qo\'llab-quvvatlash.',
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
      description: 'Toshkentda saytlar, onlayn do\'konlar va Telegram-botlar yaratamiz.',
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
