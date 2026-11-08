import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import type { Language } from "@/contexts/LanguageContext";
import { useLanguage } from "@/hooks/useLanguage";
import { useInView } from "@/hooks/useInView";
import SectionHeader, { container } from "@/components/brand/SectionHeader";
import { formatUsd, priceFrom } from "@/lib/price";
import { FEATURES as FEATURE_LIST, SERVICES, TIMELINES as TIMELINE_LIST } from "@/data/pricing";

// Р¦РµРЅС‹ Рё РјРЅРѕР¶РёС‚РµР»Рё вЂ” РІ data/pricing.ts
const PROJECT_TYPES = SERVICES.map((s) => ({ id: s.key, basePrice: s.price }));
const FEATURES = FEATURE_LIST.map((f) => ({ id: f.key, price: f.price }));
const TIMELINES = TIMELINE_LIST.map((t) => ({ id: t.key, multiplier: t.multiplier }));

/** РС‚РѕРіРѕРІР°СЏ СЃСѓРјРјР°: РїСЂРё РёР·РјРµРЅРµРЅРёРё РїР»Р°РІРЅРѕ РґРѕСЃС‡РёС‚С‹РІР°РµС‚ РґРѕ РЅРѕРІРѕРіРѕ Р·РЅР°С‡РµРЅРёСЏ.
 *  РЎРєСЂРёРЅСЂРёРґРµСЂ РїРѕР»СѓС‡Р°РµС‚ С‚РѕР»СЊРєРѕ РёС‚РѕРіРѕРІРѕРµ С‡РёСЃР»Рѕ, Р±РµР· РїСЂРѕРјРµР¶СѓС‚РѕС‡РЅС‹С…. */
const AnimatedPrice = ({ value, language }: { value: number; language: Language }) => {
  const [shown, setShown] = useState(value);
  const current = useRef(value);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      current.current = value;
      setShown(value);
      return;
    }
    const counter = { v: current.current };
    const tween = gsap.to(counter, {
      v: value,
      duration: 0.6,
      ease: "power3.out",
      onUpdate: () => {
        current.current = counter.v;
        setShown(Math.round(counter.v));
      },
    });
    return () => {
      tween.kill();
    };
  }, [value]);

  return (
    <>
      <span aria-hidden="true">{priceFrom(shown, language)}</span>
      <span className="sr-only">{priceFrom(value, language)}</span>
    </>
  );
};

const legendClass = "mb-4 font-mono text-[13px] uppercase tracking-[0.06em] text-muted-foreground";

const PricingCalculator = () => {
  const { t, language } = useLanguage();
  const { ref, inView } = useInView({ threshold: 0.1 });
  const [projectType, setProjectType] = useState("website");
  const [features, setFeatures] = useState<string[]>([]);
  const [timeline, setTimeline] = useState("standard");

  const type = PROJECT_TYPES.find((p) => p.id === projectType) ?? PROJECT_TYPES[0];
  const time = TIMELINES.find((p) => p.id === timeline) ?? TIMELINES[1];
  const featuresPrice = FEATURES.filter((f) => features.includes(f.id)).reduce((sum, f) => sum + f.price, 0);
  const total = Math.round((type.basePrice + featuresPrice) * time.multiplier);

  const toggleFeature = (id: string) =>
    setFeatures((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));

  return (
    <section id="calculator" ref={ref} className={`${container} pt-[clamp(72px,9vw,128px)]`}>
      <div className={`scroll-reveal ${inView ? "active" : ""}`}>
        <SectionHeader index="04" label={t("home.labels.price")} title={t("home.calc.heading")} />
      </div>

      <div className={`flex flex-wrap items-start gap-10 scroll-reveal ${inView ? "active" : ""}`}>
        <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-10">
          {/* РўРёРї РїСЂРѕРµРєС‚Р° */}
          <fieldset>
            <legend className={legendClass}>{t("home.calc.type")}</legend>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {PROJECT_TYPES.map((p) => (
                <label key={p.id} className="cursor-pointer">
                  <input
                    type="radio"
                    name="projectType"
                    value={p.id}
                    checked={projectType === p.id}
                    onChange={() => setProjectType(p.id)}
                    className="peer sr-only"
                  />
                  <span className="flex min-h-[84px] flex-col gap-1.5 rounded-[14px] border border-input bg-card px-[18px] py-4 transition-colors hover:border-muted-foreground peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-secondary">
                    <span className="text-[17px] font-semibold">{t(`services.${p.id}.title`)}</span>
                    <span className="font-mono text-sm opacity-80">{priceFrom(p.basePrice, language)}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* РЎСЂРѕРє */}
          <fieldset>
            <legend className={legendClass}>{t("home.calc.timeline")}</legend>
            <div className="flex flex-wrap gap-3">
              {TIMELINES.map((p) => (
                <label key={p.id} className="cursor-pointer">
                  <input
                    type="radio"
                    name="timeline"
                    value={p.id}
                    checked={timeline === p.id}
                    onChange={() => setTimeline(p.id)}
                    className="peer sr-only"
                  />
                  <span className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-input px-5 font-semibold transition-colors hover:border-muted-foreground peer-checked:border-secondary peer-checked:bg-secondary peer-checked:text-secondary-foreground peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary">
                    {t(`home.calc.${p.id}`)}
                    <span className="font-normal opacity-75">В· {t(`home.calc.${p.id}Range`)}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Р”РѕРїРѕР»РЅРёС‚РµР»СЊРЅРѕ */}
          <fieldset>
            <legend className={legendClass}>{t("home.calc.features")}</legend>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {FEATURES.map((f) => (
                <label
                  key={f.id}
                  className="flex min-h-[56px] cursor-pointer items-center gap-3.5 rounded-[14px] border border-input bg-card px-[18px] py-3 transition-colors hover:border-muted-foreground has-[:checked]:border-primary"
                >
                  <input
                    type="checkbox"
                    checked={features.includes(f.id)}
                    onChange={() => toggleFeature(f.id)}
                    className="h-5 w-5 shrink-0 cursor-pointer accent-[#3FD0D4]"
                  />
                  <span className="flex-1">{t(`home.calc.${f.id}`)}</span>
                  <span className="font-mono text-sm text-muted-foreground">+{formatUsd(f.price)}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        {/* РС‚РѕРі */}
        <aside
          aria-live="polite"
          className="flex min-w-0 flex-[1_1_340px] flex-col gap-6 rounded-[20px] bg-foreground p-8 text-background lg:sticky lg:top-24"
        >
          <span className="font-mono text-[13px] uppercase tracking-[0.06em] text-[#4A4F58]">
            {t("home.calc.estimate")}
          </span>
          <div className="font-display text-[clamp(40px,4.4vw,64px)] font-medium leading-none tracking-[-0.03em] tabular-nums">
            <AnimatedPrice value={total} language={language} />
          </div>
          <dl className="border-t border-[#C9C5BB]">
            <div className="flex justify-between gap-4 border-b border-[#C9C5BB] py-3.5">
              <dt className="text-[#4A4F58]">{t("home.calc.rowProject")}</dt>
              <dd className="text-right font-semibold">{t(`services.${type.id}.title`)}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-[#C9C5BB] py-3.5">
              <dt className="text-[#4A4F58]">{t("home.calc.rowTimeline")}</dt>
              <dd className="text-right font-semibold">
                {t(`home.calc.${time.id}`)}, {t(`home.calc.${time.id}Range`)}
              </dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-[#C9C5BB] py-3.5">
              <dt className="text-[#4A4F58]">{t("home.calc.rowOptions")}</dt>
              <dd className="text-right font-semibold">
                {features.length === 0 ? t("home.calc.none") : features.length}
              </dd>
            </div>
          </dl>
          <a
            href="#contact"
            className="inline-flex min-h-[56px] items-center justify-center rounded-full bg-background font-semibold text-foreground transition hover:brightness-125"
          >
            {t("home.calc.cta")}
          </a>
          <p className="text-sm leading-normal text-[#4A4F58]">{t("home.calc.note")}</p>
        </aside>
      </div>
    </section>
  );
};

export default PricingCalculator;
