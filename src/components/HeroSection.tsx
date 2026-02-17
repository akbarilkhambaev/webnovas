import heroBg from "@/assets/hero-bg.jpg";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const HeroSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 tech-grid" />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[120px] animate-glow-pulse float-animation" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-violet/10 rounded-full blur-[120px] animate-glow-pulse float-animation" style={{ animationDelay: "1.5s" }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary/30 text-primary text-sm font-medium opacity-0 animate-fade-up hover:glow-cyan-sm transition-all duration-300">
          {t('hero.badge')}
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-8xl font-display font-bold leading-tight mb-6 opacity-0 animate-fade-up" style={{ animationDelay: "0.15s" }}>
          {t('hero.title')}{" "}
          <span className="gradient-text text-glow-cyan animate-pulse">{t('hero.titleHighlight')}</span>
          <br />
          {t('hero.titleEnd')}
        </h1>

        <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-10 opacity-0 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          {t('hero.description')}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-up" style={{ animationDelay: "0.45s" }}>
          <a
            href="#contact"
            className="group px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg glow-cyan hover:brightness-110 hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            {t('hero.startProject')}
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#portfolio"
            className="px-8 py-4 rounded-xl border border-border text-foreground font-semibold text-lg hover-glow hover:border-primary/50"
          >
            {t('hero.viewWork')}
          </a>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
