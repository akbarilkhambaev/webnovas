import { useLanguage } from "@/hooks/useLanguage";
import { useInView } from "@/hooks/useInView";
import SectionHeader, { container } from "@/components/brand/SectionHeader";

const WorkProcess = () => {
  const { t } = useLanguage();
  const { ref, inView } = useInView({ threshold: 0.1 });

  const steps = [1, 2, 3, 4].map((n) => ({
    number: String(n),
    title: t(`workProcess.step${n}.title`),
    description: t(`workProcess.step${n}.description`),
  }));

  return (
    <section id="process" ref={ref} className={`${container} pt-[clamp(72px,9vw,128px)]`}>
      <div className={`scroll-reveal ${inView ? "active" : ""}`}>
        <SectionHeader index="03" label={t("home.labels.process")} title={t("home.process.heading")} />
      </div>

      <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <li
            key={step.number}
            className={`flex flex-col gap-4 border-t-2 pt-6 scroll-reveal ${i === 0 ? "border-secondary" : "border-input"} ${
              inView ? "active" : ""
            }`}
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <span aria-hidden="true" className="font-display text-[56px] leading-none text-secondary">
              {step.number}
            </span>
            <h3 className="font-display text-[22px] font-medium">{step.title}</h3>
            <p className="text-muted-foreground">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default WorkProcess;
