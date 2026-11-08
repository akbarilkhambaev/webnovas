import type { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'
import { SITE_URL as BASE_URL } from '@/lib/seo'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let newsRoutes: MetadataRoute.Sitemap = []

  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
      )
      const { data: articles } = await supabase
        .from('news_articles')
        .select('slug, updated_at')
        .eq('published', true)

      newsRoutes = (articles ?? []).map((article) => ({
        url: `${BASE_URL}/news/${article.slug}`,
        lastModified: new Date(article.updated_at),
        changeFrequency: 'weekly',
        priority: 0.7,
      }))
    } catch {
      // silently skip news routes if Supabase is unavailable
    }
  }

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/news`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    // /privacy и /terms закрыты от индексации (noindex), поэтому в карту сайта не входят
    ...newsRoutes,
  ]
}
