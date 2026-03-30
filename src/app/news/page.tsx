import type { Metadata } from 'next'
import { createClient } from '@supabase/supabase-js'
import NewsClient from '@/components/NewsClient'
import type { NewsArticleRow } from '@/lib/supabase'

// Revalidate every 60 seconds (ISR)
export const revalidate = 60

export const metadata: Metadata = {
  title: 'Новости и статьи',
  description:
    'Блог WebNova: актуальные статьи о веб-разработке, дизайне, SEO, Telegram ботах и цифровых технологиях в Узбекистане.',
  alternates: { canonical: 'https://webnovas.uz/news' },
  openGraph: {
    url: 'https://webnovas.uz/news',
    title: 'Новости и статьи | WebNova',
    description:
      'Блог WebNova: статьи о веб-разработке, дизайне, SEO и цифровых технологиях.',
  },
}

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export default async function NewsPage() {
  const { data } = await getSupabase()
    .from('news_articles')
    .select('*')
    .eq('published', true)
    .order('date', { ascending: false })

  const articles = (data ?? []) as NewsArticleRow[]

  return <NewsClient articles={articles} />
}
