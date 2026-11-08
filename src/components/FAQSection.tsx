import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useInView } from "@/hooks/useInView";
import SectionHeader, { container } from "@/components/brand/SectionHeader";

const FAQSection = () => {
  const { t } = useLanguage();
  const { ref, inView } = useInView({ threshold: 0.1 });

  const faqs = [1, 2, 3, 4, 5].map((n) => ({
    question: t(`faq.q${n}.question`),
    answer: t(`faq.q${n}.answer`),
  }));

  return (
    <section id="faq" ref={ref} className={`${container} pt-[clamp(72px,9vw,128px)]`}>
      <div className="flex flex-wrap gap-10">
        <div className={`flex-[1_1_320px] scroll-reveal ${inView ? "active" : ""}`}>
          <SectionHeader index="05" label={t("home.labels.faq")} title={t("home.faq.heading")} className="mb-0" />
        </div>

        <AccordionPrimitive.Root
          type="single"
          collapsible
          defaultValue="item-0"
          className={`min-w-0 flex-[999_1_560px] border-b border-border scroll-reveal ${inView ? "active" : ""}`}
        >
          {faqs.map((faq, index) => (
            <AccordionPrimitive.Item key={index} value={`item-${index}`} className="border-t border-border">
              <AccordionPrimitive.Header>
                <AccordionPrimitive.Trigger className="group flex min-h-[72px] w-full items-center justify-between gap-6 py-5 text-left text-[19px] font-medium transition-colors hover:text-primary">
                  {faq.question}
                  <Plus
                    size={22}
                    aria-hidden="true"
                    className="shrink-0 text-primary transition-transform duration-300 group-data-[state=open]:rotate-45"
                  />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <p className="max-w-[720px] pb-6 leading-relaxed text-muted-foreground">{faq.answer}</p>
              </AccordionPrimitive.Content>
            </AccordionPrimitive.Item>
          ))}
        </AccordionPrimitive.Root>
      </div>
    </section>
  );
};

export default FAQSection;
