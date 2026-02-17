import { useLanguage } from "@/hooks/useLanguage";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Mail, Send } from "lucide-react";

const Footer = () => {
  const { t } = useLanguage();

  const socialLinks = [
    { icon: Send, href: "https://t.me/webnova_uz", label: "Telegram" },
    { icon: Instagram, href: "https://instagram.com/webnova.uz", label: "Instagram" },
    { icon: Facebook, href: "https://facebook.com/webnova.uz", label: "Facebook" },
    { icon: Linkedin, href: "https://linkedin.com/company/webnova", label: "LinkedIn" },
  ];

  const quickLinks = [
    { label: t('nav.services'), href: "#services" },
    { label: t('nav.portfolio'), href: "#portfolio" },
    { label: t('nav.faq'), href: "#faq" },
    { label: t('nav.contact'), href: "#contact" },
  ];

  const serviceLinks = [
    { label: t('services.website.title'), href: "#services" },
    { label: t('services.ecommerce.title'), href: "#services" },
    { label: t('services.telegram.title'), href: "#services" },
    { label: t('services.webapp.title'), href: "#services" },
  ];

  return (
    <footer className="border-t border-border/30 pt-16 pb-8 relative">
      <div className="absolute inset-0 tech-grid opacity-10" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <a href="#" className="text-2xl font-display font-bold inline-block mb-4">
              <span className="gradient-text">WEB</span>
              <span className="text-foreground">NOVA</span>
            </a>
            <p className="text-muted-foreground mb-6">
              {t('footer.description')}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:glow-cyan-sm transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('footer.services')}</h3>
            <ul className="space-y-2">
              {serviceLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('footer.legal')}</h3>
            <ul className="space-y-2 mb-6">
              <li>
                <Link
                  to="/privacy"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('footer.terms')}
                </Link>
              </li>
            </ul>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail size={18} />
              <a href="mailto:info@webnova.uz" className="hover:text-primary transition-colors">
                info@webnova.uz
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/30 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} WEBNOVA. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
