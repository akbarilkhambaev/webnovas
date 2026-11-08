'use client'

import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { container } from "@/components/brand/SectionHeader";
import { priceFrom } from "@/lib/price";
import { C } from "@/components/brand/StarMark";

const RAYS = [0, 45, 90, 135, 180, 225, 270, 315];

/** Восьмиконечная звезда: два вращающихся слоя, медленно и в разные стороны */
const Ornament = ({ label }: { label: string }) => (
  <svg
    viewBox="-210 -210 420 420"
    role="img"
    aria-label={label}
    className="block h-auto w-full max-w-[440px]"
  >
    <circle cx="0" cy="0" r="200" fill="none" stroke={C.border} strokeWidth="1" />
    <circle
      cx="0"
      cy="0"
      r="168"
      fill="none"
      stroke={C.gold}
      strokeWidth="1"
      strokeDasharray="2 8"
      opacity="0.7"
    />
    <g className="wn-spin">
      <rect x="-128" y="-128" width="256" height="256" fill="none" stroke={C.primary} strokeWidth="1.5" />
      <rect
        x="-128"
        y="-128"
        width="256"
        height="256"
        fill="none"
        stroke={C.primary}
        strokeWidth="1.5"
        transform="rotate(45)"
      />
      <g stroke={C.line} strokeWidth="1">
        {RAYS.map((angle) => (
          <line key={angle} x1="0" y1="-62" x2="0" y2="-181" transform={`rotate(${angle})`} />
        ))}
      </g>
    </g>
    <g className="wn-spin-rev">
      <rect
        x="-84"
        y="-84"
        width="168"
        height="168"
        fill="none"
        stroke={C.gold}
        strokeWidth="1.5"
        transform="rotate(22.5)"
      />
      <rect
        x="-84"
        y="-84"
        width="168"
        height="168"
        fill="none"
        stroke={C.gold}
        strokeWidth="1.5"
        transform="rotate(67.5)"
      />
    </g>
    <rect x="-40" y="-40" width="80" height="80" fill="rgba(63, 208, 212, 0.14)" stroke={C.primary} strokeWidth="1.5" />
    <rect
      x="-40"
      y="-40"
      width="80"
      height="80"
      fill="rgba(227, 176, 75, 0.14)"
      stroke={C.gold}
      strokeWidth="1.5"
      transform="rotate(45)"
    />
    <circle cx="0" cy="0" r="7" fill={C.ivory} />
  </svg>
);

const HeroSection = () => {
  const { t, language } = useLanguage();

  const facts = [
    { label: t("home.factSite"), value: priceFrom(500, language) },
    { label: t("home.factBot"), value: priceFrom(300, language) },
    { label: t("home.factLaunch"), value: t("home.factLaunchValue") },
  ];

  return (
    <section id="top" className="relative overflow-hidden border-b border-border">
      <div className="wn-tile pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className={`${container} relative pb-[clamp(48px,6vw,88px)] pt-[calc(72px_+_clamp(48px,7vw,112px))]`}>
        <div className="flex flex-wrap items-center gap-12">
          <div className="flex min-w-0 flex-[1_1_600px] flex-col gap-8">
            <p className="wn-label text-secondary opacity-0 animate-fade-up">{t("home.kicker")}</p>

            <h1
              className="font-display text-[clamp(34px,4.6vw,66px)] font-medium leading-[1.06] tracking-[-0.025em] opacity-0 animate-fade-up [text-wrap:balance]"
              style={{ animationDelay: "0.1s" }}
            >
              {t("home.titleStart")} <span className="text-primary">{t("home.titleHighlight")}</span>{" "}
              {t("home.titleEnd")}
            </h1>

            <p
              className="max-w-[560px] text-[clamp(17px,1.4vw,20px)] leading-relaxed text-muted-foreground opacity-0 animate-fade-up [text-wrap:pretty]"
              style={{ animationDelay: "0.2s" }}
            >
              {t("home.description")}
            </p>

            <div className="flex flex-wrap gap-3.5 opacity-0 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <a
                href="#contact"
                className="group inline-flex min-h-[56px] items-center gap-2.5 rounded-full bg-primary px-8 text-[17px] font-semibold text-primary-foreground transition hover:brightness-110"
              >
                {t("home.cta")}
                <ArrowRight size={18} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#portfolio"
                className="inline-flex min-h-[56px] items-center rounded-full border border-input px-8 text-[17px] font-medium text-foreground/80 transition-colors hover:border-foreground hover:text-foreground"
              >
                {t("home.viewWork")}
              </a>
            </div>
          </div>

          <div className="flex min-w-0 flex-[0_1_440px] justify-center opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Ornament label={t("home.ornament")} />
          </div>
        </div>

        <dl className="mt-[clamp(48px,6vw,80px)] grid grid-cols-1 border-t border-border sm:grid-cols-3">
          {facts.map((fact) => (
            <div key={fact.label} className="flex flex-col gap-1.5 pr-6 pt-6">
              <dt className="font-mono text-[13px] uppercase tracking-[0.06em] text-muted-foreground">{fact.label}</dt>
              <dd className="font-display text-[26px] font-medium">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default HeroSection;
