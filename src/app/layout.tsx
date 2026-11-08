import type { Metadata } from 'next'
import { Unbounded, Onest, JetBrains_Mono } from 'next/font/google'
import '@/index.css'
import Providers from '@/components/Providers'
import { SERVICES, type ServiceKey } from '@/data/pricing'
import { baseOpenGraph, CONTACTS, HOME_DESCRIPTION, HOME_TITLE, jsonLdString, SITE_URL } from '@/lib/seo'

// Все три шрифта поддерживают кириллицу и узбекскую латиницу
const display = Unbounded({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-display',
  display: 'swap',
})

const body = Onest({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-body',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-mono',
  display: 'swap',
})

const SERVICE_NAMES: Record<ServiceKey, string> = {
  website: 'Разработка сайтов',
  ecommerce: 'Разработка интернет-магазинов',
  telegram: 'Разработка Telegram-ботов',
  webapp: 'Разработка веб-приложений',
  automation: 'Автоматизация бизнес-процессов',
}

// Сведения о компании для поисковиков: контакты, город, услуги и стартовые цены
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#organization`,
  name: 'WebNova',
  url: SITE_URL,
  description: 'Разработка сайтов, интернет-магазинов, Telegram-ботов и веб-приложений в Ташкенте.',
  telephone: CONTACTS.phone,
  email: CONTACTS.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Ташкент',
    addressCountry: 'UZ',
  },
  areaServed: { '@type': 'Country', name: 'Узбекистан' },
  knowsLanguage: ['ru', 'uz', 'en'],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: CONTACTS.phone,
    email: CONTACTS.email,
    contactType: 'customer service',
    availableLanguage: ['Russian', 'Uzbek'],
  },
  sameAs: [CONTACTS.telegram, 'https://instagram.com/webnova.uz', 'https://facebook.com/webnova.uz'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Услуги WebNova',
    itemListElement: SERVICES.map((service) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: SERVICE_NAMES[service.key] },
      priceSpecification: {
        '@type': 'PriceSpecification',
        minPrice: service.price,
        priceCurrency: 'USD',
      },
    })),
  },
}

// Коды подтверждения Google Search Console и Яндекс.Вебмастера — из переменных окружения.
// Пустые значения не выводим, чтобы не было пустых <meta>.
const verification: Metadata['verification'] = {
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  }),
  ...(process.env.NEXT_PUBLIC_YANDEX_VERIFICATION && {
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
  }),
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_TITLE,
    template: '%s | WebNova',
  },
  description: HOME_DESCRIPTION,
  applicationName: 'WebNova',
  keywords: [
    'разработка сайтов Ташкент',
    'создание сайтов Ташкент',
    'заказать сайт Ташкент',
    'интернет-магазин под ключ',
    'Telegram-бот для бизнеса',
    'веб-студия Ташкент',
    'sayt yaratish Toshkent',
  ],
  openGraph: {
    ...baseOpenGraph,
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
  robots: { index: true, follow: true },
  verification,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(organizationJsonLd) }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
