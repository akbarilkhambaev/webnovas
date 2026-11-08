import { useLanguage } from "@/hooks/useLanguage";
import { useInView } from "@/hooks/useInView";
import SectionHeader, { container } from "@/components/brand/SectionHeader";
import { priceFrom } from "@/lib/price";

const ServicesSection = () => {
  const { t, language } = useLanguage();
  const { ref, inView } = useInView({ threshold: 0.1 });

  const services = [
    { key: "website", price: 500 },
    { key: "ecommerce", price: 1500 },
    { key: "telegram", price: 300 },
    { key: "webapp", price: 2000 },
    { key: "automation", price: 800 },
  ];

  return (
    <section id="services" ref={ref} className={`${container} pt-[clamp(72px,9vw,128px)]`}>
      <div className={`scroll-reveal ${inView ? "active" : ""}`}>
        <SectionHeader
          index="01"
          label={t("home.labels.services")}
          title={t("home.services.heading")}
          sub={t("home.services.sub")}
        />
      </div>

      <ul className="border-b border-border">
        {services.map((service, i) => (
          <li
            key={service.key}
            className={`wn-row flex flex-wrap items-baseline gap-x-10 gap-y-3 border-t border-border px-3 py-8 scroll-reveal ${
              inView ? "active" : ""
            }`}
            style={{ transitionDelay: `${i * 0.06}s` }}
          >
            <span className="w-10 font-mono text-sm text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="flex-[1_1_280px] font-display text-[clamp(22px,2.6vw,36px)] font-medium tracking-[-0.015em]">
              {t(`services.${service.key}.title`)}
            </h3>
            <p className="flex-[1_1_340px] text-muted-foreground">{t(`services.${service.key}.description`)}</p>
            <span className="flex-[0_0_150px] font-display text-xl text-secondary sm:text-right">
              {priceFrom(service.price, language)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ServicesSection;
