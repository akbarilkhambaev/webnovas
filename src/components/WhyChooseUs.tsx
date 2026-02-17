import { Shield, Clock, TrendingUp, HeartHandshake } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useInView } from "@/hooks/useInView";

const WhyChooseUs = () => {
  const { t } = useLanguage();
  const { ref, inView } = useInView({ threshold: 0.1 });
  
  const reasons = [
    {
      icon: TrendingUp,
      title: t('whyChooseUs.quality.title'),
      description: t('whyChooseUs.quality.description'),
    },
    {
      icon: Clock,
      title: t('whyChooseUs.speed.title'),
      description: t('whyChooseUs.speed.description'),
    },
    {
      icon: Shield,
      title: t('whyChooseUs.support.title'),
      description: t('whyChooseUs.support.description'),
    },
    {
      icon: HeartHandshake,
      title: t('whyChooseUs.price.title'),
      description: t('whyChooseUs.price.description'),
    },
  ];

  return (
    <section id="why-us" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <div className={`scroll-reveal-left ${inView ? 'active' : ''}`}>
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">{t('whyChooseUs.title')}</span>
            <h2 className="text-4xl lg:text-5xl font-display font-bold mt-3 mb-6">
              {t('whyChooseUs.heading')}{" "}
              <span className="gradient-text">{t('whyChooseUs.headingHighlight')}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {reasons.map((reason, i) => (
              <div
                key={reason.title}
                className={`glass rounded-2xl p-6 hover-glow scroll-reveal ${inView ? 'active' : ''}`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                  <reason.icon size={24} className="text-secondary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">
                  {reason.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
