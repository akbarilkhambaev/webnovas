import { createClient } from "@supabase/supabase-js";

// Lazy singleton — don't throw at module evaluation time so static pages
// (/_not-found, etc.) can be prerendered even without env vars at build time.
let _supabase: ReturnType<typeof createClient> | null = null;

function getClient() {
  if (_supabase) return _supabase;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables"
    );
  }
  _supabase = createClient(url, key);
  return _supabase;
}

export const supabase = new Proxy({} as ReturnType<typeof createClient>, {
  get(_target, prop) {
    return (getClient() as never)[prop];
  },
});

// ─── Types ────────────────────────────────────────────────────────────────────

export interface NewsArticleRow {
  id: string;
  slug: string;
  category_ru: string;
  category_uz: string;
  title_ru: string;
  title_uz: string;
  excerpt_ru: string;
  excerpt_uz: string;
  content_ru: string;
  content_uz: string;
  date: string;
  read_time_ru: string;
  read_time_uz: string;
  image_url: string;
  tags_ru: string[];
  tags_uz: string[];
  published: boolean;
  views: number;
  created_at: string;
  updated_at: string;
}

export type NewsArticleInsert = Omit<NewsArticleRow, "id" | "created_at" | "updated_at">;
