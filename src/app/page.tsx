import type { Metadata } from 'next'
import IndexPage from '@/views/Index'

export const metadata: Metadata = {
  title: 'WebNova — Разработка сайтов в Ташкенте',
  description:
    'WebNova — цифровое агентство в Ташкенте. Создаём профессиональные сайты, веб-приложения, интернет-магазины и Telegram боты. Более 50 проектов. Гарантия качества.',
  alternates: { canonical: 'https://webnovas.uz' },
  openGraph: {
    url: 'https://webnovas.uz',
    title: 'WebNova — Разработка сайтов в Ташкенте',
    description:
      'WebNova — цифровое агентство. Создаём сайты, веб-приложения, интернет-магазины и Telegram боты в Ташкенте.',
  },
}

export default function Home() {
  return <IndexPage />
}
