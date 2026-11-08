'use client'

import { useLanguage } from "@/hooks/useLanguage";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { container } from "@/components/brand/SectionHeader";

export const SOCIAL_LINKS = [
  { label: "Telegram", href: "https://t.me/webnova_uz" },
  { label: "Instagram", href: "https://instagram.com/webnova.uz" },
  { label: "Facebook", href: "https://facebook.com/webnova.uz" },
  { label: "LinkedIn", href: "https://linkedin.com/company/webnova" },
];

const Footer = () => {
  const { t } = useLanguage();
  const pathname = usePathname();
  const isHome = pathname === "/";

  // На внутренних страницах якоря ведут сначала на главную
  const resolveHref = (href: string) => (href.startsWith("#") && !isHome ? `/${href}` : href);

  const links = [
    { label: t("home.labels.services"), href: "#services" },
    { label: t("home.labels.work"), href: "#portfolio" },
    { label: t("home.labels.price"), href: "#calculator" },
    { label: t("home.labels.faq"), href: "#faq" },
    { label: t("home.labels.news"), href: "/news", isRoute: true },
    { label: t("home.labels.contact"), href: "#contact" },
  ];

  const linkClass = "text-muted-foreground transition-colors hover:text-foreground";

  return (
    <footer className="border-t border-border">
      <div className={`${container} flex flex-col gap-10 pb-10 pt-12`}>
        <div
          aria-hidden="true"
          className="select-none font-display text-[clamp(56px,13vw,190px)] font-bold leading-[0.9] tracking-[-0.04em] text-[#1A1E25]"
        >
          WebNova
        </div>

        <div className="flex flex-wrap justify-between gap-x-12 gap-y-8">
          <p className="max-w-[320px] text-muted-foreground">{t("footer.description")}</p>

          <nav aria-label="Нижнее меню" className="flex flex-wrap gap-x-6 gap-y-3 text-[15px]">
            {links.map((link) =>
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

          <div className="flex flex-wrap gap-x-6 gap-y-3 text-[15px]">
            {SOCIAL_LINKS.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {social.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-4 border-t border-border pt-6 text-sm text-[#8B919C]">
          <span>
            © {new Date().getFullYear()} WebNova · {t("contact.info.addressValue")}. {t("footer.rights")}
          </span>
          <div className="flex flex-wrap gap-6">
            <Link href="/privacy" className="transition-colors hover:text-foreground">
              {t("footer.privacy")}
            </Link>
            <Link href="/terms" className="transition-colors hover:text-foreground">
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
