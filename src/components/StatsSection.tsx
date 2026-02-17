import { useLanguage } from "@/hooks/useLanguage";
import { useEffect, useState } from "react";
import { Target, Users, Calendar, TrendingUp } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const StatsSection = () => {
  const { t } = useLanguage();
  const { ref, inView } = useInView({ threshold: 0.3 });
  const [counts, setCounts] = useState({ projects: 0, clients: 0, years: 0, satisfaction: 0 });

  const stats = [
    {
      icon: Target,
      value: 150,
      suffix: '+',
      label: t('stats.projects'),
      key: 'projects',
    },
    {
      icon: Users,
      value: 120,
      suffix: '+',
      label: t('stats.clients'),
      key: 'clients',
    },
    {
      icon: Calendar,
      value: 5,
      suffix: '+',
      label: t('stats.years'),
      key: 'years',
    },
    {
      icon: TrendingUp,
      value: 98,
      suffix: '%',
      label: t('stats.satisfaction'),
      key: 'satisfaction',
    },
  ];

  useEffect(() => {
    if (!inView) return;
    
    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;

      setCounts({
        projects: Math.floor(150 * progress),
        clients: Math.floor(120 * progress),
        years: Math.floor(5 * progress),
        satisfaction: Math.floor(98 * progress),
      });

      if (step >= steps) {
        clearInterval(timer);
        setCounts({ projects: 150, clients: 120, years: 5, satisfaction: 98 });
      }
    }, interval);

    return () => clearInterval(timer);
  }, [inView]);

  return (
    <section className="py-28 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center group scroll-reveal ${inView ? 'active' : ''}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:glow-cyan-sm group-hover:scale-110 transition-all duration-500 pulse-glow-animation">
                <stat.icon className="text-primary" size={32} />
              </div>
              <div className="text-4xl lg:text-5xl font-display font-bold gradient-text mb-2">
                {counts[stat.key as keyof typeof counts]}
                {stat.suffix}
              </div>
              <div className="text-muted-foreground text-sm lg:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
