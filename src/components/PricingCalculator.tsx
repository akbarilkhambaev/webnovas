import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Calculator } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const PricingCalculator = () => {
  const { t, language } = useLanguage();
  const { ref, inView } = useInView({ threshold: 0.1 });
  const [projectType, setProjectType] = useState("website");
  const [features, setFeatures] = useState<string[]>([]);
  const [timeline, setTimeline] = useState("standard");

  const projectTypes = [
    { id: "website", label: t('services.website.title'), basePrice: 500 },
    { id: "ecommerce", label: t('services.ecommerce.title'), basePrice: 1500 },
    { id: "telegram", label: t('services.telegram.title'), basePrice: 300 },
    { id: "webapp", label: t('services.webapp.title'), basePrice: 2000 },
    { id: "automation", label: t('services.automation.title'), basePrice: 800 },
  ];

  const additionalFeatures = [
    { 
      id: "cms", 
      label: language === 'ru' ? 'Система управления контентом (CMS)' : 'Kontent boshqaruv tizimi (CMS)', 
      price: 300 
    },
    { 
      id: "multilang", 
      label: language === 'ru' ? 'Мультиязычность' : 'Ko\'p tillilik', 
      price: 200 
    },
    { 
      id: "seo", 
      label: language === 'ru' ? 'SEO оптимизация' : 'SEO optimallashtirish', 
      price: 250 
    },
    { 
      id: "analytics", 
      label: language === 'ru' ? 'Аналитика и отчеты' : 'Analitika va hisobotlar', 
      price: 150 
    },
    { 
      id: "payment", 
      label: language === 'ru' ? 'Интеграция платежных систем' : 'To\'lov tizimlarini integratsiya', 
      price: 400 
    },
    { 
      id: "mobile", 
      label: language === 'ru' ? 'Мобильное приложение' : 'Mobil ilova', 
      price: 1000 
    },
  ];

  const timelines = [
    { 
      id: "urgent", 
      label: language === 'ru' ? 'Срочно (1-2 недели)' : 'Shoshilinch (1-2 hafta)', 
      multiplier: 1.5 
    },
    { 
      id: "standard", 
      label: language === 'ru' ? 'Стандарт (3-4 недели)' : 'Standart (3-4 hafta)', 
      multiplier: 1 
    },
    { 
      id: "flexible", 
      label: language === 'ru' ? 'Гибкий график (1-2 месяца)' : 'Moslashuvchan jadval (1-2 oy)', 
      multiplier: 0.85 
    },
  ];

  const calculatePrice = () => {
    const basePrice = projectTypes.find((p) => p.id === projectType)?.basePrice || 0;
    const featuresPrice = features.reduce((sum, featureId) => {
      const feature = additionalFeatures.find((f) => f.id === featureId);
      return sum + (feature?.price || 0);
    }, 0);
    const timelineMultiplier = timelines.find((t) => t.id === timeline)?.multiplier || 1;

    return Math.round((basePrice + featuresPrice) * timelineMultiplier);
  };

  const toggleFeature = (featureId: string) => {
    setFeatures((prev) =>
      prev.includes(featureId)
        ? prev.filter((id) => id !== featureId)
        : [...prev, featureId]
    );
  };

  return (
    <section id="calculator" className="py-32 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 tech-grid opacity-20" />
      
      {/* Glow effects */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-neon-cyan/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className={`text-center mb-20 scroll-reveal ${inView ? 'active' : ''}`}>
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            {t('calculator.title')}
          </span>
          <h2 className="text-4xl lg:text-5xl font-display font-bold mt-3">
            {t('calculator.heading')}{" "}
            <span className="gradient-text">{t('calculator.headingHighlight')}</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            {t('calculator.description')}
          </p>
        </div>

        <div className={`max-w-4xl mx-auto glass rounded-2xl p-8 scroll-reveal-scale ${inView ? 'active' : ''}`}>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Options */}
            <div className="space-y-8">
              {/* Project Type */}
              <div>
                <h3 className="text-lg font-semibold mb-4">{t('calculator.projectType')}</h3>
                <RadioGroup value={projectType} onValueChange={setProjectType}>
                  <div className="space-y-3">
                    {projectTypes.map((type) => (
                      <div key={type.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={type.id} id={type.id} />
                        <Label htmlFor={type.id} className="cursor-pointer">
                          {type.label} (${type.basePrice})
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Timeline */}
              <div>
                <h3 className="text-lg font-semibold mb-4">{t('calculator.timeline')}</h3>
                <RadioGroup value={timeline} onValueChange={setTimeline}>
                  <div className="space-y-3">
                    {timelines.map((time) => (
                      <div key={time.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={time.id} id={time.id} />
                        <Label htmlFor={time.id} className="cursor-pointer">
                          {time.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Right Column - Features & Price */}
            <div className="space-y-8">
              {/* Additional Features */}
              <div>
                <h3 className="text-lg font-semibold mb-4">{t('calculator.features')}</h3>
                <div className="space-y-3">
                  {additionalFeatures.map((feature) => (
                    <div key={feature.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={feature.id}
                        checked={features.includes(feature.id)}
                        onCheckedChange={() => toggleFeature(feature.id)}
                      />
                      <Label htmlFor={feature.id} className="cursor-pointer">
                        {feature.label} (+${feature.price})
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Display */}
              <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                <div className="flex items-center gap-3 mb-2">
                  <Calculator className="text-primary" size={24} />
                  <h3 className="text-lg font-semibold">{t('calculator.estimate')}</h3>
                </div>
                <div className="text-4xl font-display font-bold gradient-text">
                  {t('calculator.from')} ${calculatePrice().toLocaleString()}
                </div>
              </div>

              {/* CTA Button */}
              <Button
                className="w-full bg-primary text-primary-foreground glow-cyan hover:brightness-110"
                size="lg"
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {t('calculator.consultation')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingCalculator;
