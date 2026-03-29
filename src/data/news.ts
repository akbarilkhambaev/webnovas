export interface NewsArticle {
  id: string;
  slug: string;
  category: { ru: string; uz: string };
  title: { ru: string; uz: string };
  excerpt: { ru: string; uz: string };
  content: { ru: string; uz: string };
  date: string;
  readTime: { ru: string; uz: string };
  image: string;
  tags: { ru: string[]; uz: string[] };
}

export const newsArticles: NewsArticle[] = [
  {
    id: "1",
    slug: "trends-web-development-2025",
    category: { ru: "Разработка", uz: "Ishlab chiqish" },
    title: {
      ru: "Тренды веб-разработки в 2025 году",
      uz: "2025-yilda veb-ishlab chiqish trendlari",
    },
    excerpt: {
      ru: "Рассказываем о ключевых технологиях, которые определят облик веб-разработки в ближайший год: AI-ассистенты, Edge Computing и новый стандарт WebAssembly.",
      uz: "Yaqin yil ichida veb-ishlab chiqish ko'rinishini belgilaydigan asosiy texnologiyalar haqida: AI-assistentlar, Edge Computing va yangi WebAssembly standarti.",
    },
    content: {
      ru: `## Тренды веб-разработки в 2025 году

Веб-разработка продолжает стремительно развиваться. В этой статье мы рассмотрим ключевые технологии и подходы, которые будут определять отрасль в 2025 году.

### 1. AI-ассистенты в разработке

Инструменты на основе искусственного интеллекта, такие как GitHub Copilot и Cursor, стали неотъемлемой частью рабочего процесса разработчиков. Они ускоряют написание кода, помогают находить ошибки и генерируют тесты автоматически.

### 2. Edge Computing

Перенос вычислений ближе к пользователю через Edge-платформы (Vercel Edge, Cloudflare Workers) значительно снижает задержки и улучшает опыт пользователей по всему миру.

### 3. WebAssembly 2.0

Новый стандарт WASM открывает возможности для запуска высокопроизводительного кода в браузере — от игр до видеоредакторов прямо в вебе.

### 4. Серверные компоненты React

React Server Components меняют архитектуру фронтенд-приложений, позволяя рендерить компоненты на сервере без отправки лишнего JavaScript клиенту.

### 5. CSS-контейнерные запросы

Container Queries позволяют компонентам адаптироваться под размер своего контейнера, а не экрана — настоящая революция в адаптивном дизайне.

---

Следите за нашим блогом, чтобы быть в курсе последних новостей мира веб-разработки!`,
      uz: `## 2025-yilda veb-ishlab chiqish trendlari

Veb-ishlab chiqish jadal rivojlanishda davom etmoqda. Ushbu maqolada biz 2025-yilda sohani belgilaydigan asosiy texnologiyalar va yondashuvlarni ko'rib chiqamiz.

### 1. Ishlab chiqishdagi AI-assistentlar

GitHub Copilot va Cursor kabi sun'iy intellektga asoslangan vositalar dasturchilar ish jarayonining ajralmas qismiga aylandi.

### 2. Edge Computing

Vercel Edge va Cloudflare Workers kabi platformalar orqali hisob-kitoblarni foydalanuvchiga yaqinlashtirish kechikishni sezilarli darajada kamaytiradi.

### 3. WebAssembly 2.0

Yangi WASM standarti brauzerda yuqori samarali kodni ishga tushirish imkoniyatlarini ochadi.

### 4. React Server Components

React Server Components frontend-ilovalar arxitekturasini o'zgartiradi.

### 5. CSS Container Queries

Container Queries komponentlarga ekran o'lchamiga emas, o'z konteynerining o'lchamiga moslashish imkonini beradi.`,
    },
    date: "2025-03-20",
    readTime: { ru: "5 мин", uz: "5 daqiqa" },
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
    tags: {
      ru: ["Разработка", "AI", "React", "WebAssembly"],
      uz: ["Ishlab chiqish", "AI", "React", "WebAssembly"],
    },
  },
  {
    id: "2",
    slug: "telegram-bot-business-automation",
    category: { ru: "Автоматизация", uz: "Avtomatlashtirish" },
    title: {
      ru: "Как Telegram-бот помог бизнесу сократить время на поддержку на 70%",
      uz: "Telegram-bot qanday qilib biznesga qo'llab-quvvatlash vaqtini 70% qisqartirishga yordam berdi",
    },
    excerpt: {
      ru: "Реальный кейс: мы разработали Telegram-бот для интернет-магазина, который автоматически обрабатывает заказы, отвечает на вопросы и уведомляет клиентов о статусе доставки.",
      uz: "Haqiqiy keys: biz onlayn-do'kon uchun Telegram-bot ishladik, u avtomatik ravishda buyurtmalarni qayta ishlaydi, savollarga javob beradi va mijozlarni yetkazib berish holati haqida xabardor qiladi.",
    },
    content: {
      ru: `## Как Telegram-бот помог бизнесу сократить время на поддержку на 70%

Один из наших клиентов — владелец интернет-магазина с ежедневным потоком в 150+ заказов — обратился к нам с проблемой: менеджеры тратили огромное количество времени на ответы на типовые вопросы.

### Проблема

- 80% обращений — стандартные вопросы о статусе заказа, доставке и возврате
- Менеджеры работали до 22:00, чтобы успеть ответить всем
- Клиенты ждали ответа по 2–4 часа

### Решение

Мы разработали Telegram-бот с интеграцией в CRM-систему клиента. Бот умеет:

- **Автоматически отвечать** на типовые вопросы (более 50 сценариев)
- **Проверять статус заказа** по номеру телефона или ID
- **Отправлять уведомления** о смене статуса доставки в реальном времени
- **Принимать заявки на возврат** и передавать их менеджеру

### Результат

Через 2 недели после запуска:
- Время ответа сократилось с 3 часов до **мгновенного**
- Нагрузка на менеджеров снизилась на **70%**
- Удовлетворённость клиентов выросла на **40%**

Хотите такой же результат? [Свяжитесь с нами](#contact)`,
      uz: `## Telegram-bot qanday qilib biznesga qo'llab-quvvatlash vaqtini 70% qisqartirishga yordam berdi

Bizning mijozlarimizdan biri — kuniga 150+ buyurtma oqimi bilan onlayn-do'kon egasi — muammo bilan murojaat qildi.

### Muammo

- Murojaatlarning 80% - standart savollar
- Menejerlar hamma savollarga javob berish uchun kech soatgacha ishlashdi
- Mijozlar javob uchun 2-4 soat kutishdi

### Yechim

Biz mijozning CRM tizimi bilan integratsiya qilingan Telegram-bot ishladik:

- **Standart savollarga avtomatik javob** berish (50+ stsenariy)
- **Buyurtma holatini tekshirish** telefon raqami yoki ID bo'yicha
- **Yetkazib berish holati o'zgarganda bildirishnomalar yuborish**
- **Qaytarish arizalarini qabul qilish**

### Natija

Ishga tushirilgandan 2 hafta o'tgach:
- Javob vaqti 3 soatdan **darhol**ga qisqardi
- Menejerlar yuki **70%** kamaydi
- Mijozlar mamnunligi **40%** oshdi`,
    },
    date: "2025-03-10",
    readTime: { ru: "4 мин", uz: "4 daqiqa" },
    image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800&q=80",
    tags: {
      ru: ["Telegram", "Автоматизация", "Кейс", "Бизнес"],
      uz: ["Telegram", "Avtomatlashtirish", "Keys", "Biznes"],
    },
  },
  {
    id: "3",
    slug: "why-your-website-needs-redesign",
    category: { ru: "Дизайн", uz: "Dizayn" },
    title: {
      ru: "5 признаков того, что вашему сайту нужен редизайн",
      uz: "Saytingizga qayta dizayn kerakligining 5 belgisi",
    },
    excerpt: {
      ru: "Устаревший дизайн, медленная загрузка, низкая конверсия — если хотя бы один из этих пунктов про вас, самое время задуматься об обновлении сайта.",
      uz: "Eskirgan dizayn, sekin yuklanish, past konversiya — agar bu fikrlardan biri sizga tegishli bo'lsa, saytni yangilash haqida o'ylashga vaqt keldi.",
    },
    content: {
      ru: `## 5 признаков того, что вашему сайту нужен редизайн

Веб-сайт — это лицо вашего бизнеса в интернете. Если он выглядит устаревшим или плохо работает, вы теряете клиентов. Вот 5 ключевых признаков.

### 1. Сайту больше 3 лет

Стандарты веб-дизайна меняются каждые 2–3 года. Если ваш сайт создавался до 2022 года, скорее всего, он уже не отвечает современным ожиданиям пользователей.

### 2. Плохая мобильная версия

Более 60% трафика сегодня — с мобильных устройств. Если ваш сайт неудобно использовать на телефоне, вы теряете больше половины потенциальных клиентов.

### 3. Медленная загрузка

Каждая секунда задержки загрузки снижает конверсию на 7%. Страница должна загружаться менее чем за 3 секунды.

### 4. Низкий процент конверсии

Если люди заходят на сайт, но не оставляют заявки — проблема в дизайне, UX или Call-to-Action элементах.

### 5. Сайт не отражает текущий бренд

Если ваша компания выросла, изменила позиционирование или расширила услуги, а сайт остался прежним — это разрыв между ожиданиями и реальностью.

---

**Хотите узнать, насколько ваш сайт актуален?** Свяжитесь с нами для бесплатного аудита.`,
      uz: `## Saytingizga qayta dizayn kerakligining 5 belgisi

Veb-sayt — internetdagi biznesingizning yuzidir. Agar u eskirgan bo'lsa yoki yomon ishlasa, mijozlarni yo'qotasiz.

### 1. Saytga 3 yildan ko'proq bo'lgan

Veb-dizayn standartlari har 2-3 yilda bir o'zgaradi.

### 2. Yomon mobil versiya

Bugungi trafikning 60% dan ko'prog'i mobil qurilmalardan. Agar saytingiz telefonda noqulay bo'lsa, potentsial mijozlarning yarmidan ko'prog'ini yo'qotasiz.

### 3. Sekin yuklanish

Yuklanishdagi har bir soniya kechikish konversiyani 7% kamaytiradi.

### 4. Past konversiya foizi

Agar odamlar saytga kirib, ariza qoldirmasalar — muammo dizayn, UX yoki Call-to-Action elementlarida.

### 5. Sayt joriy brendni aks ettirmayapti

Agar kompaniyangiz o'sgan, pozitsionlashuvini o'zgartirgan, lekin sayt o'sha bo'lib qolgan bo'lsa — bu kutilish va haqiqat o'rtasidagi nomuvofiqlikdir.`,
    },
    date: "2025-02-28",
    readTime: { ru: "3 мин", uz: "3 daqiqa" },
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    tags: {
      ru: ["Дизайн", "UX", "Редизайн", "Конверсия"],
      uz: ["Dizayn", "UX", "Qayta dizayn", "Konversiya"],
    },
  },
  {
    id: "4",
    slug: "ecommerce-performance-optimization",
    category: { ru: "E-Commerce", uz: "Elektron tijorat" },
    title: {
      ru: "Как ускорить интернет-магазин и увеличить продажи",
      uz: "Onlayn-do'konni qanday tezlashtirish va savdoni oshirish mumkin",
    },
    excerpt: {
      ru: "Оптимизация скорости загрузки — один из самых недооцениваемых инструментов роста продаж. Делимся проверенными методами ускорения e-commerce сайтов.",
      uz: "Yuklanish tezligini optimallashtirish — savdoni o'stirishning eng kam baholangan vositalaridan biri. Elektron tijorat saytlarini tezlashtirish bo'yicha sinovdan o'tgan usullarni baham ko'ramiz.",
    },
    content: {
      ru: `## Как ускорить интернет-магазин и увеличить продажи

По данным исследований, 53% пользователей покидают сайт, если он загружается более 3 секунд. Для интернет-магазина это прямые потери прибыли.

### Ключевые методы оптимизации

#### 1. Оптимизация изображений
Используйте формат WebP вместо JPEG/PNG — он на 25–34% легче при том же качестве. Внедрите lazy loading для изображений.

#### 2. CDN (Content Delivery Network)
Размещение статических файлов на серверах по всему миру сокращает время загрузки для пользователей из разных регионов.

#### 3. Кеширование
Настройте браузерное кеширование для статических ресурсов. Пользователи, посещающие сайт повторно, будут загружать его мгновенно.

#### 4. Минификация кода
Сжатие JavaScript, CSS и HTML файлов уменьшает их размер на 20–30%.

#### 5. Серверный рендеринг (SSR/SSG)
Для e-commerce отлично подходит статическая генерация страниц — сервер возвращает готовый HTML, что ускоряет первую загрузку.

### Результаты после оптимизации

На одном из наших проектов (интернет-магазин стройматериалов) после полной оптимизации:
- Время загрузки сократилось с **8.2 сек → 1.4 сек**
- Bounce rate снизился на **34%**
- Конверсия выросла на **28%**`,
      uz: `## Onlayn-do'konni qanday tezlashtirish va savdoni oshirish mumkin

Tadqiqotlarga ko'ra, foydalanuvchilarning 53% sayt 3 soniyadan ko'proq yuklanayotgan bo'lsa, uni tark etadi.

### Asosiy optimallashtirish usullari

#### 1. Rasmlarni optimallashtirish
Bir xil sifatda 25-34% yengilroq bo'lgan WebP formatidan foydalaning.

#### 2. CDN
Dunyo bo'ylab serverlarda statik fayllarni joylashtirish turli mintaqalardagi foydalanuvchilar uchun yuklanish vaqtini qisqartiradi.

#### 3. Keshlash
Statik resurslar uchun brauzer keshini sozlang.

#### 4. Kodni minifikatsiya qilish
JavaScript, CSS va HTML fayllarini siqish ularning hajmini 20-30% ga kamaytiradi.

#### 5. Server tomonda rendering (SSR/SSG)
Elektron tijorat uchun sahifalarni statik yaratish juda mos keladi.`,
    },
    date: "2025-02-15",
    readTime: { ru: "6 мин", uz: "6 daqiqa" },
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
    tags: {
      ru: ["E-Commerce", "Производительность", "SEO", "Оптимизация"],
      uz: ["Elektron tijorat", "Ishlash", "SEO", "Optimallashtirish"],
    },
  },
  {
    id: "5",
    slug: "webnova-launched-new-portfolio",
    category: { ru: "Новости", uz: "Yangiliklar" },
    title: {
      ru: "WebNova запустила обновлённый раздел портфолио",
      uz: "WebNova yangilangan portfolio bo'limini ishga tushirdi",
    },
    excerpt: {
      ru: "Мы обновили раздел наших работ: добавили новые проекты, улучшили галерею и теперь показываем результаты каждого проекта в цифрах.",
      uz: "Biz ishlarimiz bo'limini yangiladik: yangi loyihalar qo'shdik, galereyani yaxshiladik va endi har bir loyiha natijalarini raqamlarda ko'rsatamiz.",
    },
    content: {
      ru: `## WebNova запустила обновлённый раздел портфолио

Мы рады представить обновлённое портфолио WebNova! После нескольких месяцев работы мы значительно расширили и улучшили раздел наших проектов.

### Что нового

**Новые проекты**: добавили 6 свежих кейсов из разных отраслей — стройматериалы, агросектор, финансовые сервисы, медицина.

**Метрики результатов**: теперь каждый кейс сопровождается реальными цифрами — рост трафика, увеличение конверсии, экономия времени клиента.

**Улучшенная галерея**: добавили fullscreen-просмотр, мобильную версию и фильтрацию по типу проекта.

### Наши последние проекты

- **AKFA-COMFORT.UZ** — корпоративный сайт с каталогом продукции
- **AMUDAGRO.UZ** — платформа для агропромышленного сектора
- **DIVID.UZ** — финансовый сервис для инвесторов
- **GIJJA-STOP.UZ** — медицинский лендинг с высокой конверсией

Смотрите полное портфолио и свяжитесь с нами, чтобы обсудить ваш проект!`,
      uz: `## WebNova yangilangan portfolio bo'limini ishga tushirdi

Biz WebNova-ning yangilangan portfoliosini taqdim etishdan mamnunmiz!

### Nima yangi

**Yangi loyihalar**: qurilish materiallari, agrosanoat, moliyaviy xizmatlar, tibbiyot sohasidan 6 ta yangi keys qo'shildi.

**Natijalar metrikalari**: endi har bir keys haqiqiy raqamlar bilan birga keladi.

**Yaxshilangan galereya**: to'liq ekran ko'rinishi, mobil versiya va loyiha turi bo'yicha filtrlash qo'shildi.

### So'nggi loyihalarimiz

- **AKFA-COMFORT.UZ** — mahsulot katalogli korporativ sayt
- **AMUDAGRO.UZ** — agrosanoat platformasi
- **DIVID.UZ** — investorlar uchun moliyaviy xizmat
- **GIJJA-STOP.UZ** — yuqori konversiyali tibbiy landing`,
    },
    date: "2025-02-05",
    readTime: { ru: "2 мин", uz: "2 daqiqa" },
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
    tags: {
      ru: ["Новости", "Портфолио", "WebNova"],
      uz: ["Yangiliklar", "Portfolio", "WebNova"],
    },
  },
  {
    id: "6",
    slug: "seo-guide-for-small-business",
    category: { ru: "Маркетинг", uz: "Marketing" },
    title: {
      ru: "SEO для малого бизнеса: с чего начать в 2025 году",
      uz: "Kichik biznes uchun SEO: 2025-yilda qayerdan boshlash kerak",
    },
    excerpt: {
      ru: "Поисковая оптимизация не только для крупных компаний. Рассказываем о базовых шагах SEO, которые любой малый бизнес может сделать самостоятельно.",
      uz: "Qidiruv tizimlarini optimallashtirish faqat yirik kompaniyalar uchun emas. Har qanday kichik biznes mustaqil ravishda qila oladigan asosiy SEO qadamlarini aytib beramiz.",
    },
    content: {
      ru: `## SEO для малого бизнеса: с чего начать в 2025 году

SEO кажется сложным, но базовые шаги доступны каждому. Не нужно быть экспертом, чтобы улучшить позиции своего сайта в поиске.

### Шаг 1: Технические основы

- Убедитесь, что сайт **быстро загружается** (< 3 сек)
- Настройте **HTTPS** — без него Google занижает позиции
- Проверьте **мобильную версию** — Google использует Mobile-First индексирование

### Шаг 2: Ключевые слова

Используйте бесплатные инструменты: Google Keyword Planner, Yandex Wordstat. Найдите запросы, по которым ищут ваши услуги, и включите их в тексты страниц.

### Шаг 3: Контент

Регулярно публикуйте полезный контент — статьи, кейсы, ответы на вопросы. Контент-маркетинг — долгосрочная инвестиция в органический трафик.

### Шаг 4: Локальное SEO

Если у вас физическая локация — зарегистрируйтесь в **Google My Business** и **Яндекс.Справочник**. Это бесплатно и даёт хорошую видимость в локальном поиске.

### Шаг 5: Ссылки

Попросите партнёров, клиентов и каталоги поставить ссылку на ваш сайт. Качественные внешние ссылки (backlinks) значительно улучшают позиции.

---

Нужна помощь с SEO-оптимизацией вашего сайта? Мы предоставляем базовый SEO-аудит бесплатно.`,
      uz: `## Kichik biznes uchun SEO: 2025-yilda qayerdan boshlash kerak

SEO murakkab ko'rinadi, lekin asosiy qadamlar hamma uchun ochiq.

### 1-qadam: Texnik asoslar

- Sayt **tez yuklanishini** ta'minlang (< 3 soniya)
- **HTTPS** ni sozlang
- **Mobil versiyani** tekshiring

### 2-qadam: Kalit so'zlar

Bepul vositalardan foydalaning: Google Keyword Planner. Xizmatlaringizni qidiradigan so'rovlarni toping.

### 3-qadam: Kontent

Foydali kontentni muntazam nashr eting — maqolalar, keyslar, savollarga javoblar.

### 4-qadam: Mahalliy SEO

Agar jismoniy lokatsiyangiz bo'lsa — **Google My Business** da ro'yxatdan o'ting.

### 5-qadam: Havolalar

Hamkorlardan, mijozlardan saytingizga havola qo'yishlarini so'rang.`,
    },
    date: "2025-01-20",
    readTime: { ru: "7 мин", uz: "7 daqiqa" },
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&q=80",
    tags: {
      ru: ["SEO", "Маркетинг", "Малый бизнес", "Google"],
      uz: ["SEO", "Marketing", "Kichik biznes", "Google"],
    },
  },
];

export function getArticleBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find((a) => a.slug === slug);
}

export function getLatestArticles(count: number): NewsArticle[] {
  return [...newsArticles]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}

export function formatDate(dateStr: string, locale: "ru" | "uz"): string {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };
  const localeStr = locale === "ru" ? "ru-RU" : "uz-UZ";
  return date.toLocaleDateString(localeStr, options);
}
