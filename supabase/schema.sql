-- ============================================================
-- WebNova — News Articles table
-- Run this in your Supabase project: SQL Editor → New Query
-- ============================================================

-- 1. Create the table
CREATE TABLE IF NOT EXISTS public.news_articles (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  slug         TEXT        UNIQUE NOT NULL,
  category_ru  TEXT        NOT NULL,
  category_uz  TEXT        NOT NULL,
  title_ru     TEXT        NOT NULL,
  title_uz     TEXT        NOT NULL,
  excerpt_ru   TEXT        NOT NULL,
  excerpt_uz   TEXT        NOT NULL,
  content_ru   TEXT        NOT NULL,
  content_uz   TEXT        NOT NULL,
  date         DATE        NOT NULL DEFAULT CURRENT_DATE,
  read_time_ru TEXT        NOT NULL DEFAULT '5 мин',
  read_time_uz TEXT        NOT NULL DEFAULT '5 daqiqa',
  image_url    TEXT        NOT NULL,
  tags_ru      TEXT[]      NOT NULL DEFAULT '{}',
  tags_uz      TEXT[]      NOT NULL DEFAULT '{}',
  published    BOOLEAN     NOT NULL DEFAULT TRUE,
  views        BIGINT      NOT NULL DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Function to safely increment views (bypasses RLS, no auth needed)
CREATE OR REPLACE FUNCTION public.increment_article_views(article_slug TEXT)
RETURNS VOID LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  UPDATE public.news_articles SET views = views + 1 WHERE slug = article_slug AND published = TRUE;
END;
$$;

-- 2. Auto-update updated_at on every row change
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER news_articles_updated_at
  BEFORE UPDATE ON public.news_articles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 3. Row Level Security
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;

-- Anyone can read published articles (public site)
CREATE POLICY "Public can view published articles"
  ON public.news_articles FOR SELECT
  USING (published = TRUE);

-- Only authenticated users (you) can do everything
CREATE POLICY "Authenticated users have full access"
  ON public.news_articles FOR ALL
  TO authenticated
  USING (TRUE)
  WITH CHECK (TRUE);

-- 4. Index for fast slug lookups
CREATE INDEX IF NOT EXISTS news_articles_slug_idx ON public.news_articles (slug);
CREATE INDEX IF NOT EXISTS news_articles_date_idx  ON public.news_articles (date DESC);
