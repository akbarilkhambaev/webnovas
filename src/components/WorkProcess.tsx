import { useLanguage } from "@/hooks/useLanguage";
import { useInView } from "@/hooks/useInView";

const WorkProcess = () => {
  const { t } = useLanguage();
  const { ref, inView } = useInView({ threshold: 0.1 });
  
  const steps = [
    {
      number: "01",
      title: t('workProcess.step1.title'),
      description: t('workProcess.step1.description'),
    },
    {
      number: "02",
      title: t('workProcess.step2.title'),
      description: t('workProcess.step2.description'),
    },
    {
      number: "03",
      title: t('workProcess.step3.title'),
      description: t('workProcess.step3.description'),
    },
    {
      number: "04",
      title: t('workProcess.step4.title'),
      description: t('workProcess.step4.description'),
    },
  ];

  return (
    <section id="process" className="py-32 relative" ref={ref}>
      <div className="absolute inset-0 tech-grid" />
      <div className="container mx-auto px-6 relative z-10">
        <div className={`text-center mb-20 scroll-reveal ${inView ? 'active' : ''}`}>
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">{t('workProcess.title')}</span>
          <h2 className="text-4xl lg:text-5xl font-display font-bold mt-3">
            {t('workProcess.heading')} <span className="gradient-text">{t('workProcess.headingHighlight')}</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-transparent hidden md:block" />

          <div className="space-y-12">
            {steps.map((step, i) => (
              <div key={step.number} className={`flex gap-8 items-start group scroll-reveal ${inView ? 'active' : ''}`} style={{ transitionDelay: `${i * 0.15}s` }}>
                {/* Number dot */}
                <div className="hidden md:flex flex-shrink-0 w-16 h-16 rounded-2xl bg-muted border border-border items-center justify-center font-display font-bold text-xl text-primary group-hover:glow-cyan-sm transition-all duration-500">
                  {step.number}
                </div>

                <div className="glass rounded-2xl p-8 flex-1 hover-glow">
                  <span className="md:hidden text-primary font-display font-bold text-sm">{step.number}</span>
                  <h3 className="text-2xl font-display font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;
