'use client'

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/hooks/useLanguage";
import StarMark from "@/components/brand/StarMark";
import { container } from "@/components/brand/SectionHeader";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // На внутренних страницах якоря ведут сначала на главную
  const resolveHref = (href: string) =>
    href.startsWith("#") && !isHome ? `/${href}` : href;

  const navLinks = [
    { label: t("home.labels.services"), href: "#services" },
    { label: t("home.labels.work"), href: "#portfolio" },
    { label: t("home.labels.price"), href: "#calculator" },
    { label: t("home.labels.faq"), href: "#faq" },
    { label: t("home.labels.news"), href: "/news", isRoute: true },
    { label: t("home.labels.contact"), href: "#contact" },
  ];

  const languageSwitch = (className = "") => (
    <div
      role="group"
      aria-label={t("home.changeLanguage")}
      className={`flex items-center rounded-full border border-border p-1 font-mono text-xs ${className}`}
    >
      {(["ru", "uz"] as const).map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => setLanguage(lang)}
          aria-pressed={language === lang}
          className={`min-h-[32px] rounded-full px-3 uppercase transition-colors ${
            language === lang
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {lang}
        </button>
      ))}
    </div>
  );

  const linkClass = "text-[15px] text-muted-foreground transition-colors hover:text-foreground";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open
          ? "border-border bg-background/90 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className={`${container} flex h-[72px] items-center justify-between gap-6`}>
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <StarMark size={30} />
          <span className="font-display text-xl font-medium tracking-[-0.01em]">WebNova</span>
        </Link>

        <nav aria-label="Основное меню" className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) =>
            link.isRoute ? (
              <Link key={link.href} href={link.href} className={linkClass}>
                {link.label}
              </Link>
            ) : (
              <a key={link.href} href={resolveHref(link.href)} className={linkClass}>
                {link.label}
              </a>
            )
          )}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          {languageSwitch()}
          <a
            href={resolveHref("#contact")}
            className="inline-flex min-h-[44px] items-center rounded-full bg-primary px-5 text-[15px] font-semibold text-primary-foreground transition hover:brightness-110"
          >
            {t("home.cta")}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? t("home.closeMenu") : t("home.menu")}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border lg:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border lg:hidden">
          <nav aria-label="Мобильное меню" className={`${container} flex flex-col py-4`}>
            {navLinks.map((link) =>
              link.isRoute ? (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-border py-4 font-display text-xl"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={resolveHref(link.href)}
                  onClick={() => setOpen(false)}
                  className="border-b border-border py-4 font-display text-xl"
                >
                  {link.label}
                </a>
              )
            )}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6">
              {languageSwitch()}
              <a
                href={resolveHref("#contact")}
                onClick={() => setOpen(false)}
                className="inline-flex min-h-[48px] items-center rounded-full bg-primary px-6 font-semibold text-primary-foreground"
              >
                {t("home.cta")}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
