'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useInView } from "@/hooks/useInView";
import { supabase, isSupabaseConfigured, type NewsArticleRow } from "@/lib/supabase";
import { formatDate } from "@/data/news";

const NewsSection = () => {
  const { language, t } = useLanguage();
  const { ref, inView } = useInView({ threshold: 0.1 });
  const [articles, setArticles] = useState<NewsArticleRow[]>([]);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    supabase
      .from("news_articles")
      .select("id,slug,category_ru,category_uz,title_ru,title_uz,excerpt_ru,excerpt_uz,date,read_time_ru,read_time_uz,image_url")
      .eq("published", true)
      .order("date", { ascending: false })
      .limit(3)
      .then(({ data }) => {
        if (data) setArticles(data as NewsArticleRow[]);
      });
  }, []);

  return (
    <section id="news" className="py-32 relative" ref={ref}>
      {/* Glow decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-violet/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className={`flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6 scroll-reveal ${inView ? "active" : ""}`}>
          <div>
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">
              {t("news.label")}
            </span>
            <h2 className="text-4xl lg:text-5xl font-display font-bold mt-3">
              {t("news.heading")}{" "}
              <span className="gradient-text">{t("news.headingHighlight")}</span>
            </h2>
          </div>
          <Link
            href="/news"
            className="group flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300 self-start md:self-auto"
          >
            {t("news.allArticles")}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <Link
              href={`/news/${article.slug}`}
              key={article.id}
              className={`group glass rounded-2xl overflow-hidden hover-glow flex flex-col scroll-reveal-scale ${inView ? "active" : ""}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {/* Image */}
              <div className="h-48 overflow-hidden relative">
                <img
                  src={article.image_url}
                  alt={language === "ru" ? article.title_ru : article.title_uz}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                {/* Category badge */}
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/20 border border-primary/30 text-primary backdrop-blur-sm flex items-center gap-1.5">
                  <Tag size={10} />
                  {language === "ru" ? article.category_ru : article.category_uz}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  <span>{formatDate(article.date, language)}</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                  <span className="flex items-center gap-1">
                    <Clock size={11} />
                    {language === "ru" ? article.read_time_ru : article.read_time_uz}
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg leading-snug mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                  {language === "ru" ? article.title_ru : article.title_uz}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                  {language === "ru" ? article.excerpt_ru : article.excerpt_uz}
                </p>

                <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-primary">
                  {t("news.readMore")}
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
