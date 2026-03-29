import { useState, useEffect } from "react";
import { Menu, X, Languages } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import type { Language } from "@/contexts/LanguageContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // On non-home pages, hash links get "/#hash" so they navigate home first
  const resolveHref = (href: string) =>
    href.startsWith("#") && !isHome ? `/${href}` : href;

  const navLinks = [
    { label: t('nav.services'), href: "#services" },
    { label: t('nav.portfolio'), href: "#portfolio" },
    { label: t('nav.faq'), href: "#faq" },
    { label: t('nav.calculator'), href: "#calculator" },
    { label: t('news.label'), href: "/news", isRoute: true },
    { label: t('nav.contact'), href: "#contact" },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'ru' ? 'uz' : 'ru');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'glass border-b border-border/50 shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-display font-bold tracking-tight hover:scale-105 transition-transform duration-300">
          <span className="gradient-text">WEB</span>
          <span className="text-foreground">NOVA</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.isRoute ? (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={resolveHref(link.href)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                {link.label}
              </a>
            )
          )}
          
          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-300"
            aria-label="Change language"
          >
            <Languages size={18} />
            <span className="font-semibold uppercase">{language}</span>
          </button>

          <a
            href={resolveHref("#contact")}
            className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold glow-cyan-sm hover:brightness-110 hover:scale-105 transition-all duration-300"
          >
            {t('hero.startProject')}
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-foreground"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass border-t border-border/30 animate-fade-up">
          <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) =>
              link.isRoute ? (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={resolveHref(link.href)}
                  onClick={() => setOpen(false)}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              )
            )}
            
            {/* Mobile Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Languages size={18} />
              <span className="font-semibold uppercase">{language}</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
