'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Tag, Share2, Calendar, ExternalLink, Eye } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import { supabase, type NewsArticleRow } from "@/lib/supabase";
import { formatDate } from "@/data/news";

// ─── Embed helpers ─────────────────────────────────────────────────────────────

const BARE_URL_RE = /^https?:\/\/\S+$/;
const YOUTUBE_RE = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
const INSTAGRAM_RE = /^https?:\/\/(www\.)?instagram\.com\/(p|reel)\/([^/?#]+)/;

function YouTubeEmbed({ videoId }: { videoId: string }) {
  return (
    <div className="rounded-xl overflow-hidden my-6 aspect-video w-full">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        className="w-full h-full"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        title="YouTube video"
      />
    </div>
  );
}

function InstagramEmbed({ url }: { url: string }) {
  useEffect(() => {
    const win = window as Window & { instgrm?: { Embeds: { process: () => void } } };
    if (win.instgrm) {
      win.instgrm.Embeds.process();
    } else {
      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [url]);

  return (
    <div className="my-6 flex justify-center">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{ maxWidth: 540, width: "100%", minWidth: 280 }}
      />
    </div>
  );
}

function LinkCard({ url }: { url: string }) {
  let hostname = url;
  try { hostname = new URL(url).hostname.replace(/^www\./, ""); } catch { /* noop */ }
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 glass border border-border/50 rounded-xl px-4 py-3 my-4 hover:border-primary/50 hover:text-primary transition-colors group"
    >
      <ExternalLink size={16} className="text-primary shrink-0" />
      <div className="min-w-0">
        <div className="text-xs text-muted-foreground mb-0.5">{hostname}</div>
        <div className="text-sm truncate group-hover:underline">{url}</div>
      </div>
    </a>
  );
}

// ─── Content renderer ─────────────────────────────────────────────────────────

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="text-foreground font-semibold">{part.slice(2, -2)}</strong>;
    }
    const linkMatch = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch) {
      const before = part.slice(0, part.indexOf("["));
      const after = part.slice(part.indexOf(")") + 1);
      return (
        <span key={i}>
          {before}
          <a href={linkMatch[2]} className="text-primary hover:underline">{linkMatch[1]}</a>
          {after}
        </span>
      );
    }
    return part;
  });
}

function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: JSX.Element[] = [];
  let key = 0;

  for (const line of lines) {
    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={key++} className="text-3xl font-display font-bold mt-10 mb-5 gradient-text">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={key++} className="text-xl font-display font-bold mt-8 mb-3 text-foreground">
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith("#### ")) {
      elements.push(
        <h4 key={key++} className="text-base font-semibold mt-6 mb-2 text-primary">
          {line.slice(5)}
        </h4>
      );
    } else if (line.startsWith("- ")) {
      elements.push(
        <li key={key++} className="ml-6 mb-1 text-muted-foreground list-disc marker:text-primary">
          {renderInline(line.slice(2))}
        </li>
      );
    } else if (line.startsWith("---")) {
      elements.push(<hr key={key++} className="border-border/30 my-8" />);
    } else if (line.trim() === "") {
      elements.push(<div key={key++} className="h-2" />);
    } else if (BARE_URL_RE.test(line.trim())) {
      const url = line.trim();
      const ytMatch = url.match(YOUTUBE_RE);
      const igMatch = url.match(INSTAGRAM_RE);
      if (ytMatch) {
        elements.push(<YouTubeEmbed key={key++} videoId={ytMatch[1]} />);
      } else if (igMatch) {
        elements.push(<InstagramEmbed key={key++} url={url} />);
      } else {
        elements.push(<LinkCard key={key++} url={url} />);
      }
    } else {
      elements.push(
        <p key={key++} className="text-muted-foreground leading-relaxed mb-1">
          {renderInline(line)}
        </p>
      );
    }
  }

  return elements;
}

// ─── Main component ────────────────────────────────────────────────────────────

interface Props {
  article: NewsArticleRow;
  related: NewsArticleRow[];
  slug: string;
}

export default function NewsDetailClient({ article, related, slug }: Props) {
  const { language, t } = useLanguage();
  const router = useRouter();

  // Increment view counter once after hydration (client-only)
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (supabase.rpc as any)("increment_article_views", { article_slug: slug });
  }, [slug]);

  const title = language === "ru" ? article.title_ru : article.title_uz;
  const excerpt = language === "ru" ? article.excerpt_ru : article.excerpt_uz;
  const content = language === "ru" ? article.content_ru : article.content_uz;
  const category = language === "ru" ? article.category_ru : article.category_uz;
  const readTime = language === "ru" ? article.read_time_ru : article.read_time_uz;
  const tags = language === "ru" ? article.tags_ru : article.tags_uz;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title, text: excerpt, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <AnimatedBackground />
      <Navbar />

      <main className="pt-28 pb-32">
        <div className="container mx-auto px-6">

          {/* Back navigation */}
          <div className="mb-8 animate-fade-up opacity-0" style={{ animationFillMode: "forwards" }}>
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft size={16} />
              {t("news.back")}
            </button>
          </div>

          <div className="max-w-3xl mx-auto">
            {/* Category + meta */}
            <div
              className="flex flex-wrap items-center gap-3 mb-6 animate-fade-up opacity-0"
              style={{ animationDelay: "0.05s", animationFillMode: "forwards" }}
            >
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 border border-primary/30 text-primary flex items-center gap-1.5">
                <Tag size={11} />
                {category}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar size={13} />
                {formatDate(article.date, language)}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock size={13} />
                {readTime}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Eye size={13} />
                {article.views}
              </span>
              <button
                onClick={handleShare}
                className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                <Share2 size={13} />
                {t("news.share")}
              </button>
            </div>

            {/* Title */}
            <h1
              className="text-3xl lg:text-5xl font-display font-bold leading-tight mb-8 animate-fade-up opacity-0"
              style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
            >
              {title}
            </h1>

            {/* Cover image */}
            <div
              className="rounded-2xl overflow-hidden mb-10 animate-fade-up opacity-0"
              style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
            >
              <img
                src={article.image_url}
                alt={title}
                className="w-full h-72 lg:h-96 object-cover"
              />
            </div>

            {/* Excerpt highlight */}
            <blockquote
              className="border-l-4 border-primary pl-5 py-1 mb-10 text-lg text-muted-foreground italic animate-fade-up opacity-0"
              style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
            >
              {excerpt}
            </blockquote>

            {/* Article body */}
            <div
              className="prose-custom animate-fade-up opacity-0"
              style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
            >
              {renderContent(content)}
            </div>

            {/* Tags */}
            <div
              className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border/30 animate-fade-up opacity-0"
              style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
            >
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs glass border border-border/50 text-muted-foreground"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Related articles */}
          {related.length > 0 && (
            <div
              className="max-w-3xl mx-auto mt-20 animate-fade-up opacity-0"
              style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
            >
              <h3 className="text-xl font-display font-bold mb-8">
                {t("news.relatedArticles")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {related.map((rel) => (
                  <Link
                    href={`/news/${rel.slug}`}
                    key={rel.id}
                    className="group glass rounded-2xl overflow-hidden hover-glow flex flex-col"
                  >
                    <div className="h-36 overflow-hidden">
                      <img
                        src={rel.image_url}
                        alt={language === "ru" ? rel.title_ru : rel.title_uz}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-5">
                      <span className="text-xs text-primary font-semibold">
                        {language === "ru" ? rel.category_ru : rel.category_uz}
                      </span>
                      <h4 className="font-bold leading-snug mt-1.5 group-hover:text-primary transition-colors line-clamp-2">
                        {language === "ru" ? rel.title_ru : rel.title_uz}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Back to news */}
          <div className="max-w-3xl mx-auto mt-12 text-center">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-border/50 hover:border-primary/50 hover:text-primary transition-all duration-300 font-semibold"
            >
              <ArrowLeft size={16} />
              {t("news.backToNews")}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
