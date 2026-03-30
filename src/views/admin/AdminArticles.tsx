'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import { PlusCircle, Pencil, Trash2, Eye, EyeOff, ExternalLink, RefreshCw } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { NewsArticleRow } from "@/lib/supabase";
import AdminLayout from "@/components/admin/AdminLayout";

const AdminArticles = () => {
  const [articles, setArticles] = useState<NewsArticleRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const fetchArticles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("news_articles")
      .select("*")
      .order("date", { ascending: false });

    if (!error && data) setArticles(data as NewsArticleRow[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить статью? Это действие необратимо.")) return;
    setDeletingId(id);
    await supabase.from("news_articles").delete().eq("id", id);
    setArticles((prev) => prev.filter((a) => a.id !== id));
    setDeletingId(null);
  };

  const handleTogglePublish = async (article: NewsArticleRow) => {
    setTogglingId(article.id);
    const { error } = await supabase
      .from("news_articles")
      .update({ published: !article.published })
      .eq("id", article.id);
    if (!error) {
      setArticles((prev) =>
        prev.map((a) => (a.id === article.id ? { ...a, published: !a.published } : a))
      );
    }
    setTogglingId(null);
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display font-bold">Статьи</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {articles.length} {articles.length === 1 ? "статья" : "статей"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchArticles}
            className="p-2.5 rounded-xl glass border border-border/50 hover:border-primary/50 hover:text-primary transition-all"
            title="Обновить"
          >
            <RefreshCw size={16} />
          </button>
          <Link
            href="/admin/articles/new"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm glow-cyan-sm hover:brightness-110 transition-all"
          >
            <PlusCircle size={16} />
            Новая статья
          </Link>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : articles.length === 0 ? (
        <div className="glass rounded-2xl p-16 text-center border border-border/30">
          <p className="text-muted-foreground mb-4">Статей пока нет</p>
          <Link
            href="/admin/articles/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm"
          >
            <PlusCircle size={16} />
            Создать первую статью
          </Link>
        </div>
      ) : (
        <div className="glass rounded-2xl border border-border/30 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30 text-muted-foreground text-xs uppercase tracking-wider">
                <th className="text-left px-6 py-4 font-medium">Статья</th>
                <th className="text-left px-6 py-4 font-medium">Категория</th>
                <th className="text-left px-6 py-4 font-medium">Дата</th>
                <th className="text-left px-6 py-4 font-medium">Статус</th>
                <th className="px-6 py-4 font-medium text-right">Действия</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr
                  key={article.id}
                  className="border-b border-border/20 last:border-none hover:bg-muted/10 transition-colors"
                >
                  {/* Title */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={article.image_url}
                        alt=""
                        className="w-10 h-10 rounded-lg object-cover shrink-0 bg-muted"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                      <div>
                        <p className="font-medium line-clamp-1">{article.title_ru}</p>
                        <p className="text-muted-foreground text-xs mt-0.5 font-mono">
                          /{article.slug}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs bg-primary/10 border border-primary/20 text-primary">
                      {article.category_ru}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4 text-muted-foreground">
                    {new Date(article.date).toLocaleDateString("ru-RU")}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                        article.published
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                          : "bg-muted/30 border-border/50 text-muted-foreground"
                      }`}
                    >
                      {article.published ? "Опубликовано" : "Скрыто"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {/* Preview */}
                      <a
                        href={`/news/${article.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg glass border border-border/40 hover:border-primary/50 hover:text-primary transition-all"
                        title="Открыть статью"
                      >
                        <ExternalLink size={14} />
                      </a>

                      {/* Publish toggle */}
                      <button
                        onClick={() => handleTogglePublish(article)}
                        disabled={togglingId === article.id}
                        className="p-2 rounded-lg glass border border-border/40 hover:border-primary/50 hover:text-primary transition-all disabled:opacity-50"
                        title={article.published ? "Скрыть" : "Опубликовать"}
                      >
                        {togglingId === article.id ? (
                          <div className="w-3.5 h-3.5 border border-current border-t-transparent rounded-full animate-spin" />
                        ) : article.published ? (
                          <EyeOff size={14} />
                        ) : (
                          <Eye size={14} />
                        )}
                      </button>

                      {/* Edit */}
                      <Link
                        href={`/admin/articles/${article.id}/edit`}
                        className="p-2 rounded-lg glass border border-border/40 hover:border-primary/50 hover:text-primary transition-all"
                        title="Редактировать"
                      >
                        <Pencil size={14} />
                      </Link>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(article.id)}
                        disabled={deletingId === article.id}
                        className="p-2 rounded-lg glass border border-border/40 hover:border-destructive/50 hover:text-destructive transition-all disabled:opacity-50"
                        title="Удалить"
                      >
                        {deletingId === article.id ? (
                          <div className="w-3.5 h-3.5 border border-current border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Trash2 size={14} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminArticles;
