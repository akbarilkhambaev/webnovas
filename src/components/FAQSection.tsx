import { Plus } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useInView } from "@/hooks/useInView";
import SectionHeader, { container } from "@/components/brand/SectionHeader";
import { FAQ } from "@/data/faq";

/*
 * Нативные <details>: ответы всегда есть в HTML (их видят поисковики),
 * раскрытие работает без JavaScript, а общий name="faq" оставляет открытым один пункт.
 */
const FAQSection = () => {
  const { t, language } = useLanguage();
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section id="faq" ref={ref} className={`${container} pt-[clamp(72px,9vw,128px)]`}>
      <div className="flex flex-wrap gap-10">
        <div className={`flex-[1_1_320px] scroll-reveal ${inView ? "active" : ""}`}>
          <SectionHeader index="05" label={t("home.labels.faq")} title={t("home.faq.heading")} className="mb-0" />
        </div>

        <div className={`min-w-0 flex-[999_1_560px] border-b border-border scroll-reveal ${inView ? "active" : ""}`}>
          {FAQ[language].map((faq, index) => (
            <details key={index} name="faq" open={index === 0} className="wn-faq group border-t border-border">
              <summary className="flex min-h-[72px] cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-[19px] font-medium transition-colors hover:text-primary [&::-webkit-details-marker]:hidden">
                {faq.question}
                <Plus
                  size={22}
                  aria-hidden="true"
                  className="shrink-0 text-primary transition-transform duration-300 group-open:rotate-45"
                />
              </summary>
              <p className="max-w-[720px] pb-6 leading-relaxed text-muted-foreground">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
