import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/hooks/useLanguage";
import { useInView } from "@/hooks/useInView";
import SectionHeader, { container } from "@/components/brand/SectionHeader";

const MUTED_NUMBER = "#2C313B";

const WorkProcess = () => {
  const { t } = useLanguage();
  const { ref, inView } = useInView({ threshold: 0.1 });
  const listRef = useRef<HTMLOListElement>(null);

  const steps = [1, 2, 3, 4].map((n) => ({
    number: String(n),
    title: t(`workProcess.step${n}.title`),
    description: t(`workProcess.step${n}.description`),
  }));

  // Золотая линия идёт по шагам вслед за прокруткой; номер загорается, когда линия до него дошла.
  // Без JS и при «уменьшении движения» линия сразу заполнена, номера золотые.
  useEffect(() => {
    const list = listRef.current;
    if (!list || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const bars = gsap.utils.toArray<HTMLElement>(".wn-step-bar");
      const numbers = gsap.utils.toArray<HTMLElement>(".wn-step-number");
      gsap.set(bars, { scaleX: 0 });
      gsap.set(numbers, { color: MUTED_NUMBER });

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: list, start: "top 78%", end: "bottom 60%", scrub: 0.6 },
      });
      bars.forEach((bar, i) => {
        timeline.to(numbers[i], { color: "#E3B04B", duration: 0.15 }, i);
        timeline.to(bar, { scaleX: 1, duration: 1 }, i);
      });
    }, list);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={ref} className={`${container} pt-[clamp(72px,9vw,128px)]`}>
      <div className={`scroll-reveal ${inView ? "active" : ""}`}>
        <SectionHeader index="03" label={t("home.labels.process")} title={t("home.process.heading")} />
      </div>

      <ol ref={listRef} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <li
            key={step.number}
            className={`relative flex flex-col gap-4 border-t-2 border-input pt-6 scroll-reveal ${inView ? "active" : ""}`}
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <span
              aria-hidden="true"
              className="wn-step-bar absolute -top-[2px] left-0 h-[2px] w-full origin-left bg-secondary"
            />
            <span aria-hidden="true" className="wn-step-number font-display text-[56px] leading-none text-secondary">
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
