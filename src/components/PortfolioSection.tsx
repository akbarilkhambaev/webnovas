import { useLanguage } from "@/hooks/useLanguage";
import { useInView } from "@/hooks/useInView";

const PortfolioSection = () => {
  const { language, t } = useLanguage();
  const { ref, inView } = useInView({ threshold: 0.1 });
  
  const projects = [
    {
      title: "FinTrack Dashboard",
      category: language === 'ru' ? 'Веб-приложение' : 'Veb-ilova',
      gradient: "from-neon-cyan/20 to-neon-violet/20",
    },
    {
      title: "ShopElite Store",
      category: language === 'ru' ? 'Интернет-магазин' : 'Onlayn do\'kon',
      gradient: "from-neon-violet/20 to-neon-cyan/20",
    },
    {
      title: "AutoFlow Bot",
      category: "Telegram Bot",
      gradient: "from-neon-cyan/20 to-primary/10",
    },
    {
      title: "CloudSync Platform",
      category: language === 'ru' ? 'Веб-платформа' : 'Veb platforma',
      gradient: "from-secondary/20 to-neon-cyan/20",
    },
  ];

  return (
    <section id="portfolio" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6 relative z-10">
        <div className={`text-center mb-20 scroll-reveal ${inView ? 'active' : ''}`}>
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">{t('portfolio.title')}</span>
          <h2 className="text-4xl lg:text-5xl font-display font-bold mt-3">
            {t('portfolio.heading')} <span className="gradient-text">{t('portfolio.headingHighlight')}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className={`group glass rounded-2xl overflow-hidden hover-glow cursor-pointer scroll-reveal-scale ${inView ? 'active' : ''}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className={`h-64 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative group-hover:scale-105 transition-transform duration-500`}>
                <div className="absolute inset-0 tech-grid opacity-50" />
                <span className="font-display text-2xl font-bold text-foreground/80 relative z-10">
                  {project.title}
                </span>
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold text-primary uppercase tracking-widest">
                  {project.category}
                </span>
                <h3 className="text-xl font-display font-semibold text-foreground mt-1">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
