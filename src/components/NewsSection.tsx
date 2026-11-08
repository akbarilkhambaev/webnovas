'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useInView } from "@/hooks/useInView";
import { supabase, isSupabaseConfigured, type NewsArticleRow } from "@/lib/supabase";
import { formatDate } from "@/data/news";
import SectionHeader, { container } from "@/components/brand/SectionHeader";

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
    <section
      id="news"
      ref={ref}
      className={articles.length > 0 ? `${container} pt-[clamp(72px,9vw,128px)]` : undefined}
    >
      {/* Пока статей нет, секция не занимает место на странице */}
      {articles.length > 0 && (
        <>
          <div className={`flex flex-wrap items-end justify-between gap-6 scroll-reveal ${inView ? "active" : ""}`}>
            <SectionHeader
              label={t("home.labels.news")}
              title={`${t("news.heading")} ${t("news.headingHighlight").toLowerCase()}`}
            />
            <Link
              href="/news"
              className="group mb-12 inline-flex min-h-[44px] items-center gap-2 font-semibold text-primary"
            >
              {t("news.allArticles")}
              <ArrowRight size={18} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {articles.map((article, i) => {
              const title = language === "ru" ? article.title_ru : article.title_uz;
              return (
                <Link
                  href={`/news/${article.slug}`}
                  key={article.id}
                  className={`group flex flex-col overflow-hidden rounded-[18px] border border-border bg-card transition-colors hover:border-primary/45 scroll-reveal ${
                    inView ? "active" : ""
                  }`}
                  style={{ transitionDelay: `${i * 0.08}s` }}
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={article.image_url}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <div className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.04em] text-muted-foreground">
                      <span className="text-secondary">
                        {language === "ru" ? article.category_ru : article.category_uz}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{formatDate(article.date, language)}</span>
                      <span aria-hidden="true">·</span>
                      <span>{language === "ru" ? article.read_time_ru : article.read_time_uz}</span>
                    </div>
                    <h3 className="font-display text-lg font-medium leading-snug transition-colors group-hover:text-primary line-clamp-2">
                      {title}
                    </h3>
                    <p className="flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                      {language === "ru" ? article.excerpt_ru : article.excerpt_uz}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                      {t("news.readMore")}
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
};

export default NewsSection;
