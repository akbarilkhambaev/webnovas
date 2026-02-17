import { useLanguage } from "@/hooks/useLanguage";
import { useInView } from "@/hooks/useInView";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const FAQSection = () => {
  const { t } = useLanguage();
  const { ref, inView } = useInView({ threshold: 0.1 });

  const faqs = [
    {
      question: t('faq.q1.question'),
      answer: t('faq.q1.answer'),
    },
    {
      question: t('faq.q2.question'),
      answer: t('faq.q2.answer'),
    },
    {
      question: t('faq.q3.question'),
      answer: t('faq.q3.answer'),
    },
    {
      question: t('faq.q4.question'),
      answer: t('faq.q4.answer'),
    },
    {
      question: t('faq.q5.question'),
      answer: t('faq.q5.answer'),
    },
  ];

  return (
    <section id="faq" className="py-32 relative" ref={ref}>
      <div className="absolute inset-0 tech-grid opacity-20" />

      <div className="container mx-auto px-6 relative z-10">
        <div className={`text-center mb-20 scroll-reveal ${inView ? 'active' : ''}`}>
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            {t('faq.title')}
          </span>
          <h2 className="text-4xl lg:text-5xl font-display font-bold mt-3">
            {t('faq.heading')} <span className="gradient-text">{t('faq.headingHighlight')}</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className={`glass rounded-xl px-6 border-none hover-glow scroll-reveal ${inView ? 'active' : ''}`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <AccordionTrigger className="text-left hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
