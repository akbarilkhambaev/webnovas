import type { Metadata } from 'next'
import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import NewsDetailClient from '@/components/NewsDetailClient'
import type { NewsArticleRow } from '@/lib/supabase'

// Revalidate every 60 seconds (ISR)
export const revalidate = 60

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://placeholder.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'placeholder-anon-key'
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const { data } = await getSupabase()
    .from('news_articles')
    .select('title_ru, excerpt_ru, image_url')
    .eq('slug', slug)
    .single()

  if (!data) {
    return { title: 'Статья не найдена' }
  }

  return {
    title: data.title_ru,
    description: data.excerpt_ru,
    alternates: { canonical: `https://webnovas.uz/news/${slug}` },
    openGraph: {
      url: `https://webnovas.uz/news/${slug}`,
      title: data.title_ru,
      description: data.excerpt_ru,
      images: data.image_url ? [{ url: data.image_url }] : [],
    },
  }
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = getSupabase()

  const { data: articleData } = await supabase
    .from('news_articles')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (!articleData) notFound()

  const article = articleData as NewsArticleRow

  const { data: relatedData } = await supabase
    .from('news_articles')
    .select('id,slug,category_ru,category_uz,title_ru,title_uz,image_url')
    .eq('published', true)
    .eq('category_ru', article.category_ru)
    .neq('slug', slug)
    .limit(2)

  const related = (relatedData ?? []) as NewsArticleRow[]

  return <NewsDetailClient article={article} related={related} slug={slug} />
}
