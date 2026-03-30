'use client'

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Save, ArrowLeft, Eye, EyeOff, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { NewsArticleRow, NewsArticleInsert } from "@/lib/supabase";
import AdminLayout from "@/components/admin/AdminLayout";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function toSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/[а-яё]/g, (c) => {
      const map: Record<string, string> = {
        а:"a",б:"b",в:"v",г:"g",д:"d",е:"e",ё:"yo",ж:"zh",з:"z",и:"i",й:"y",
        к:"k",л:"l",м:"m",н:"n",о:"o",п:"p",р:"r",с:"s",т:"t",у:"u",ф:"f",
        х:"kh",ц:"ts",ч:"ch",ш:"sh",щ:"shch",ъ:"",ы:"y",ь:"",э:"e",ю:"yu",я:"ya",
      };
      return map[c] ?? c;
    })
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ─── Default form state ───────────────────────────────────────────────────────

const defaultForm = (): NewsArticleInsert => ({
  slug: "",
  category_ru: "",
  category_uz: "",
  title_ru: "",
  title_uz: "",
  excerpt_ru: "",
  excerpt_uz: "",
  content_ru: "",
  content_uz: "",
  date: new Date().toISOString().slice(0, 10),
  read_time_ru: "5 мин",
  read_time_uz: "5 daqiqa",
  image_url: "",
  tags_ru: [],
  tags_uz: [],
  published: true,
  views: 0,
});

// ─── Field component ─────────────────────────────────────────────────────────

const Field = ({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) => (
  <div>
    <label className="block text-sm font-medium mb-1.5 text-muted-foreground">{label}</label>
    {children}
    {hint && <p className="text-xs text-muted-foreground mt-1">{hint}</p>}
  </div>
);

const inputCls =
  "w-full px-4 py-2.5 rounded-xl glass border border-border/50 bg-transparent text-sm focus:outline-none focus:border-primary/60 transition-colors";

const textareaCls =
  "w-full px-4 py-3 rounded-xl glass border border-border/50 bg-transparent text-sm focus:outline-none focus:border-primary/60 transition-colors resize-y font-mono";

// ─── Component ───────────────────────────────────────────────────────────────

const ArticleForm = () => {
  const params = useParams();
  const id = params?.id as string | undefined;
  const router = useRouter();
  const isEdit = Boolean(id);

  const [form, setForm] = useState<NewsArticleInsert>(defaultForm());
  const [tagsRuInput, setTagsRuInput] = useState("");
  const [tagsUzInput, setTagsUzInput] = useState("");
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [slugEdited, setSlugEdited] = useState(false);
  const [previewTab, setPreviewTab] = useState<"ru" | "uz">("ru");

  // Load existing article when editing
  useEffect(() => {
    if (!isEdit) return;
    supabase
      .from("news_articles")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data, error }) => {
        if (error || !data) {
          router.push("/admin/articles");
          return;
        }
        const a = data as NewsArticleRow;
        setForm({
          slug: a.slug,
          category_ru: a.category_ru,
          category_uz: a.category_uz,
          title_ru: a.title_ru,
          title_uz: a.title_uz,
          excerpt_ru: a.excerpt_ru,
          excerpt_uz: a.excerpt_uz,
          content_ru: a.content_ru,
          content_uz: a.content_uz,
          date: a.date,
          read_time_ru: a.read_time_ru,
          read_time_uz: a.read_time_uz,
          image_url: a.image_url,
          tags_ru: a.tags_ru,
          tags_uz: a.tags_uz,
          published: a.published,
          views: a.views,
        });
        setTagsRuInput(a.tags_ru.join(", "));
        setTagsUzInput(a.tags_uz.join(", "));
        setSlugEdited(true);
        setLoading(false);
      });
  }, [id, isEdit, router]);

  const set = (key: keyof NewsArticleInsert, value: unknown) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  // Auto-generate slug from RU title
  const handleTitleRuChange = (val: string) => {
    set("title_ru", val);
    if (!slugEdited) set("slug", toSlug(val));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const payload: NewsArticleInsert = {
      ...form,
      tags_ru: tagsRuInput.split(",").map((t) => t.trim()).filter(Boolean),
      tags_uz: tagsUzInput.split(",").map((t) => t.trim()).filter(Boolean),
    };

    let err;
    if (isEdit) {
      ({ error: err } = await supabase
        .from("news_articles")
        .update(payload)
        .eq("id", id));
    } else {
      ({ error: err } = await supabase.from("news_articles").insert(payload));
    }

    setSaving(false);
    if (err) {
      setError(err.message);
    } else {
      router.push("/admin/articles");
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit}>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/articles"
              className="p-2 rounded-xl glass border border-border/40 hover:border-primary/50 hover:text-primary transition-all"
            >
              <ArrowLeft size={16} />
            </Link>
            <div>
              <h1 className="text-2xl font-display font-bold">
                {isEdit ? "Редактировать статью" : "Новая статья"}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => set("published", !form.published)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                form.published
                  ? "border-emerald-500/40 text-emerald-400 bg-emerald-500/10"
                  : "border-border/50 text-muted-foreground glass"
              }`}
            >
              {form.published ? <Eye size={15} /> : <EyeOff size={15} />}
              {form.published ? "Опубликовано" : "Скрыто"}
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm glow-cyan-sm hover:brightness-110 transition-all disabled:opacity-60"
            >
              {saving ? (
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save size={15} />
              )}
              {saving ? "Сохранение..." : "Сохранить"}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 px-4 py-3 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-sm flex items-center gap-2">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left — main fields */}
          <div className="xl:col-span-2 space-y-6">

            {/* Titles */}
            <div className="glass rounded-2xl p-6 border border-border/30 space-y-5">
              <h2 className="font-semibold text-sm uppercase tracking-widest text-muted-foreground">
                Заголовки
              </h2>

              <Field label="Заголовок (RU)">
                <input
                  type="text"
                  value={form.title_ru}
                  onChange={(e) => handleTitleRuChange(e.target.value)}
                  required
                  placeholder="Тренды веб-разработки в 2025 году"
                  className={inputCls}
                />
              </Field>

              <Field label="Заголовок (UZ)">
                <input
                  type="text"
                  value={form.title_uz}
                  onChange={(e) => set("title_uz", e.target.value)}
                  required
                  placeholder="2025-yilda veb-ishlab chiqish trendlari"
                  className={inputCls}
                />
              </Field>

              <Field label="Slug (URL)" hint="Генерируется автоматически из RU заголовка">
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => {
                    setSlugEdited(true);
                    set("slug", e.target.value);
                  }}
                  required
                  placeholder="trends-web-development-2025"
                  className={`${inputCls} font-mono`}
                />
              </Field>
            </div>

            {/* Excerpts */}
            <div className="glass rounded-2xl p-6 border border-border/30 space-y-5">
              <h2 className="font-semibold text-sm uppercase tracking-widest text-muted-foreground">
                Краткое описание
              </h2>
              <Field label="Описание (RU)">
                <textarea
                  value={form.excerpt_ru}
                  onChange={(e) => set("excerpt_ru", e.target.value)}
                  required
                  rows={3}
                  placeholder="Рассказываем о ключевых технологиях..."
                  className={textareaCls}
                />
              </Field>
              <Field label="Описание (UZ)">
                <textarea
                  value={form.excerpt_uz}
                  onChange={(e) => set("excerpt_uz", e.target.value)}
                  required
                  rows={3}
                  placeholder="Asosiy texnologiyalar haqida..."
                  className={textareaCls}
                />
              </Field>
            </div>

            {/* Content */}
            <div className="glass rounded-2xl p-6 border border-border/30 space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-sm uppercase tracking-widest text-muted-foreground">
                  Контент (Markdown)
                </h2>
                <div className="flex gap-1 p-1 glass rounded-lg border border-border/30">
                  {(["ru", "uz"] as const).map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setPreviewTab(lang)}
                      className={`px-3 py-1 rounded-md text-xs font-semibold uppercase transition-all ${
                        previewTab === lang
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              {previewTab === "ru" ? (
                <Field
                  label="Контент (RU)"
                  hint="Поддерживается Markdown: ## заголовок, ### подзаголовок, **жирный**, - список, --- разделитель"
                >
                  <textarea
                    value={form.content_ru}
                    onChange={(e) => set("content_ru", e.target.value)}
                    required
                    rows={20}
                    placeholder="## Заголовок статьи&#10;&#10;Текст статьи..."
                    className={textareaCls}
                  />
                </Field>
              ) : (
                <Field label="Контент (UZ)">
                  <textarea
                    value={form.content_uz}
                    onChange={(e) => set("content_uz", e.target.value)}
                    required
                    rows={20}
                    placeholder="## Maqola sarlavhasi&#10;&#10;Maqola matni..."
                    className={textareaCls}
                  />
                </Field>
              )}
            </div>
          </div>

          {/* Right — meta */}
          <div className="space-y-6">
            {/* Image */}
            <div className="glass rounded-2xl p-6 border border-border/30 space-y-4">
              <h2 className="font-semibold text-sm uppercase tracking-widest text-muted-foreground">
                Обложка
              </h2>
              <Field label="URL изображения">
                <input
                  type="url"
                  value={form.image_url}
                  onChange={(e) => set("image_url", e.target.value)}
                  required
                  placeholder="https://images.unsplash.com/..."
                  className={inputCls}
                />
              </Field>
              {form.image_url && (
                <div className="rounded-xl overflow-hidden aspect-video">
                  <img
                    src={form.image_url}
                    alt="preview"
                    className="w-full h-full object-cover"
                    onError={(e) => ((e.target as HTMLImageElement).style.opacity = "0.3")}
                  />
                </div>
              )}
            </div>

            {/* Meta */}
            <div className="glass rounded-2xl p-6 border border-border/30 space-y-4">
              <h2 className="font-semibold text-sm uppercase tracking-widest text-muted-foreground">
                Мета-данные
              </h2>

              <Field label="Категория (RU)">
                <input
                  type="text"
                  value={form.category_ru}
                  onChange={(e) => set("category_ru", e.target.value)}
                  required
                  placeholder="Разработка"
                  className={inputCls}
                />
              </Field>

              <Field label="Категория (UZ)">
                <input
                  type="text"
                  value={form.category_uz}
                  onChange={(e) => set("category_uz", e.target.value)}
                  required
                  placeholder="Ishlab chiqish"
                  className={inputCls}
                />
              </Field>

              <Field label="Дата публикации">
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => set("date", e.target.value)}
                  required
                  className={inputCls}
                />
              </Field>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Время чтения (RU)">
                  <input
                    type="text"
                    value={form.read_time_ru}
                    onChange={(e) => set("read_time_ru", e.target.value)}
                    placeholder="5 мин"
                    className={inputCls}
                  />
                </Field>
                <Field label="Время чтения (UZ)">
                  <input
                    type="text"
                    value={form.read_time_uz}
                    onChange={(e) => set("read_time_uz", e.target.value)}
                    placeholder="5 daqiqa"
                    className={inputCls}
                  />
                </Field>
              </div>
            </div>

            {/* Tags */}
            <div className="glass rounded-2xl p-6 border border-border/30 space-y-4">
              <h2 className="font-semibold text-sm uppercase tracking-widest text-muted-foreground">
                Теги
              </h2>
              <Field label="Теги (RU)" hint="Через запятую">
                <input
                  type="text"
                  value={tagsRuInput}
                  onChange={(e) => setTagsRuInput(e.target.value)}
                  placeholder="Разработка, React, AI"
                  className={inputCls}
                />
              </Field>
              <Field label="Теги (UZ)">
                <input
                  type="text"
                  value={tagsUzInput}
                  onChange={(e) => setTagsUzInput(e.target.value)}
                  placeholder="Ishlab chiqish, React, AI"
                  className={inputCls}
                />
              </Field>
            </div>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
};

export default ArticleForm;
