import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import '@/index.css'
import Providers from '@/components/Providers'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'WebNova',
  url: 'https://webnovas.uz',
  description: 'Цифровое агентство в Ташкенте. Разрабатываем сайты, веб-приложения, интернет-магазины и Telegram боты.',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+998-90-123-45-67',
    contactType: 'customer service',
    availableLanguage: ['Russian', 'Uzbek'],
  },
  sameAs: [
    'https://instagram.com/webnova.uz',
    'https://t.me/webnova_uz',
    'https://facebook.com/webnova.uz',
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL('https://webnovas.uz'),
  title: {
    default: 'WebNova — Разработка сайтов в Ташкенте',
    template: '%s | WebNova',
  },
  description:
    'WebNova — цифровое агентство в Ташкенте. Разрабатываем сайты, веб-приложения, интернет-магазины и Telegram боты. Более 50 реализованных проектов.',
  keywords: [
    'веб-разработка',
    'сайты Ташкент',
    'WebNova',
    'Telegram боты',
    'веб-агентство Узбекистан',
    'интернет-магазин',
    'веб-приложения',
  ],
  alternates: { canonical: 'https://webnovas.uz' },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://webnovas.uz',
    siteName: 'WebNova',
    title: 'WebNova — Разработка сайтов в Ташкенте',
    description:
      'WebNova — цифровое агентство. Разрабатываем сайты, приложения и Telegram боты в Ташкенте.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'WebNova' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WebNova — Разработка сайтов в Ташкенте',
    description: 'WebNova — цифровое агентство в Ташкенте.',
  },
  robots: { index: true, follow: true },
  // Verification codes — fill in after registering in GSC / Yandex Webmaster
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? '',
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION ?? '',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
