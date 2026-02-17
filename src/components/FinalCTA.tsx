import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useInView } from "@/hooks/useInView";

const FinalCTA = () => {
  const { t } = useLanguage();
  const { ref, inView } = useInView({ threshold: 0.3 });
  
  return (
    <section className="py-32 relative" ref={ref}>
      <div className="absolute inset-0 tech-grid" />
      {/* Glow orbs */}
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-neon-cyan/8 rounded-full blur-[100px]" />
      <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-neon-violet/8 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className={`max-w-3xl mx-auto text-center glass rounded-3xl p-12 lg:p-16 hover-glow scroll-reveal-scale ${inView ? 'active' : ''}`}>
          <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6">
            {t('cta.heading')}{" "}
            <span className="gradient-text">{t('cta.headingHighlight')}</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            {t('cta.description')}
          </p>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg glow-cyan hover:brightness-110 hover:scale-105 transition-all duration-300"
          >
            {t('cta.button')}
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
