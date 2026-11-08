import type { Metadata } from 'next'
import { createClient } from '@supabase/supabase-js'
import NewsClient from '@/components/NewsClient'
import type { NewsArticleRow } from '@/lib/supabase'
import { baseOpenGraph } from '@/lib/seo'

// Revalidate every 60 seconds (ISR)
export const revalidate = 60

export const metadata: Metadata = {
  title: 'Новости и статьи',
  description:
    'Блог WebNova: статьи о разработке сайтов, интернет-магазинов и Telegram-ботов, о дизайне и SEO для бизнеса в Узбекистане.',
  alternates: { canonical: '/news' },
  openGraph: {
    ...baseOpenGraph,
    url: '/news',
    title: 'Новости и статьи | WebNova',
    description:
      'Статьи о разработке сайтов, интернет-магазинов и Telegram-ботов, о дизайне и SEO.',
  },
}

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://placeholder.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'placeholder-anon-key'
  )
}

export default async function NewsPage() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return <NewsClient articles={[]} />
  }

  const { data } = await getSupabase()
    .from('news_articles')
    .select('*')
    .eq('published', true)
    .order('date', { ascending: false })

  const articles = (data ?? []) as NewsArticleRow[]

  return <NewsClient articles={articles} />
}
