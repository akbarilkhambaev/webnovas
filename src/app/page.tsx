import type { Metadata } from 'next'
import IndexPage from '@/views/Index'
import { FAQ } from '@/data/faq'
import { baseOpenGraph, HOME_DESCRIPTION, HOME_TITLE, jsonLdString } from '@/lib/seo'

// Заголовок и описание берутся из layout (title.default и description)
export const metadata: Metadata = {
  alternates: { canonical: '/' },
  openGraph: {
    ...baseOpenGraph,
    url: '/',
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
}

// Вопросы и ответы — те же, что в секции FAQ на русской версии страницы
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.ru.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(faqJsonLd) }} />
      <IndexPage />
    </>
  )
}
