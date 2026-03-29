import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Clock, Tag, Search } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import { supabase, type NewsArticleRow } from "@/lib/supabase";
import { formatDate } from "@/data/news";

const ARTICLES_PER_PAGE = 6;

const News = () => {
  const { language, t } = useLanguage();
  const [articles, setArticles] = useState<NewsArticleRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [page, setPage] = useState(1);

  useEffect(() => {
    supabase
      .from("news_articles")
      .select("*")
      .eq("published", true)
      .order("date", { ascending: false })
      .then(({ data }) => {
        if (data) setArticles(data as NewsArticleRow[]);
        setLoading(false);
      });
  }, []);

  const categories = useMemo(
    () => [
      "all",
      ...Array.from(
        new Set(articles.map((a) => (language === "ru" ? a.category_ru : a.category_uz)))
      ),
    ],
    [articles, language]
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return articles.filter((a) => {
      const title = language === "ru" ? a.title_ru : a.title_uz;
      const excerpt = language === "ru" ? a.excerpt_ru : a.excerpt_uz;
      const category = language === "ru" ? a.category_ru : a.category_uz;
      const matchSearch = !q || title.toLowerCase().includes(q) || excerpt.toLowerCase().includes(q);
      const matchCat = activeCategory === "all" || category === activeCategory;
      return matchSearch && matchCat;
    });
  }, [articles, search, activeCategory, language]);

  const totalPages = Math.ceil(filtered.length / ARTICLES_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ARTICLES_PER_PAGE, page * ARTICLES_PER_PAGE);

  const handleCategoryChange = (cat: string) => { setActiveCategory(cat); setPage(1); };
  const handleSearch = (value: string) => { setSearch(value); setPage(1); };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <AnimatedBackground />
      <Navbar />

      <main className="pt-28 pb-32">
        <div className="container mx-auto px-6">

          {/* Page header */}
          <div className="text-center mb-16 animate-fade-up opacity-0" style={{ animationFillMode: "forwards" }}>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft size={16} />
              {t("news.backHome")}
            </Link>
            <br />
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">
              {t("news.label")}
            </span>
            <h1 className="text-4xl lg:text-6xl font-display font-bold mt-3 mb-4">
              {t("news.heading")}{" "}
              <span className="gradient-text">{t("news.headingHighlight")}</span>
            </h1>
            <p className="max-w-xl mx-auto text-muted-foreground">
              {t("news.pageDescription")}
            </p>
          </div>

          {/* Search + filter bar */}
          <div
            className="flex flex-col md:flex-row gap-4 mb-12 animate-fade-up opacity-0"
            style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
          >
            <div className="relative flex-1 max-w-sm">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder={t("news.searchPlaceholder")}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl glass border border-border/50 bg-transparent text-sm focus:outline-none focus:border-primary/60 transition-colors"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground border-primary glow-cyan-sm"
                      : "glass border-border/50 text-muted-foreground hover:border-primary/50 hover:text-primary"
                  }`}
                >
                  {cat === "all" ? t("news.allCategories") : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : paginated.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              {t("news.noResults")}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginated.map((article, i) => {
                const title = language === "ru" ? article.title_ru : article.title_uz;
                const excerpt = language === "ru" ? article.excerpt_ru : article.excerpt_uz;
                const category = language === "ru" ? article.category_ru : article.category_uz;
                const tags = language === "ru" ? article.tags_ru : article.tags_uz;
                const readTime = language === "ru" ? article.read_time_ru : article.read_time_uz;
                return (
                  <Link
                    to={`/news/${article.slug}`}
                    key={article.id}
                    className="group glass rounded-2xl overflow-hidden hover-glow flex flex-col animate-fade-up opacity-0"
                    style={{ animationDelay: `${0.2 + i * 0.08}s`, animationFillMode: "forwards" }}
                  >
                    <div className="h-48 overflow-hidden relative">
                      <img
                        src={article.image_url}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/20 border border-primary/30 text-primary backdrop-blur-sm flex items-center gap-1.5">
                        <Tag size={10} />
                        {category}
                      </span>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                        <span>{formatDate(article.date, language)}</span>
                        <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                        <span className="flex items-center gap-1">
                          <Clock size={11} />
                          {readTime}
                        </span>
                      </div>
                      <h2 className="font-display font-bold text-lg leading-snug mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        {title}
                      </h2>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                        {excerpt}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-4 mb-4">
                        {tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="px-2 py-0.5 rounded text-xs bg-muted/40 text-muted-foreground border border-border/50">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-1.5 text-sm font-semibold text-primary">
                        {t("news.readMore")}
                        <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-16">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2.5 rounded-xl glass border border-border/50 disabled:opacity-40 hover:border-primary/50 hover:text-primary transition-all"
              >
                <ArrowLeft size={16} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                    n === page
                      ? "bg-primary text-primary-foreground border-primary glow-cyan-sm"
                      : "glass border-border/50 hover:border-primary/50 hover:text-primary"
                  }`}
                >
                  {n}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2.5 rounded-xl glass border border-border/50 disabled:opacity-40 hover:border-primary/50 hover:text-primary transition-all"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default News;
