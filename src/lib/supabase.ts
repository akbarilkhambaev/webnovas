import { createClient } from "@supabase/supabase-js";

// Placeholder values allow module evaluation during static prerender without throwing.
// Real values must be set in Vercel env vars — calls will fail gracefully without them.
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co";
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "placeholder-anon-key";

export const supabase = createClient(supabaseUrl, supabaseKey);

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
