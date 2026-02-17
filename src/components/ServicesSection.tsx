import { Globe, ShoppingCart, Bot, Layers, Zap } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useInView } from "@/hooks/useInView";

const ServicesSection = () => {
  const { t } = useLanguage();
  const { ref, inView } = useInView({ threshold: 0.1 });
  
  const services = [
    {
      icon: Globe,
      title: t('services.website.title'),
      description: t('services.website.description'),
    },
    {
      icon: ShoppingCart,
      title: t('services.ecommerce.title'),
      description: t('services.ecommerce.description'),
    },
    {
      icon: Bot,
      title: t('services.telegram.title'),
      description: t('services.telegram.description'),
    },
    {
      icon: Layers,
      title: t('services.webapp.title'),
      description: t('services.webapp.description'),
    },
    {
      icon: Zap,
      title: t('services.automation.title'),
      description: t('services.automation.description'),
    },
  ];
  
  return (
    <section id="services" className="py-32 relative" ref={ref}>
      <div className="absolute inset-0 tech-grid" />
      <div className="container mx-auto px-6 relative z-10">
        <div className={`text-center mb-20 scroll-reveal ${inView ? 'active' : ''}`}>
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">{t('services.title')}</span>
          <h2 className="text-4xl lg:text-5xl font-display font-bold mt-3">
            {t('services.heading')} <span className="gradient-text">{t('services.headingHighlight')}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`group glass rounded-2xl p-8 hover-glow cursor-default scroll-reveal ${inView ? 'active' : ''}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:glow-cyan-sm group-hover:scale-110 transition-all duration-500 float-animation">
                <service.icon size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3 text-foreground">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
