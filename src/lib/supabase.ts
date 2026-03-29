import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY environment variables"
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
