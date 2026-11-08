import type { ReactNode } from "react";

interface SectionHeaderProps {
  index?: string;
  label: string;
  title: ReactNode;
  sub?: ReactNode;
  className?: string;
}

/** Заголовок секции: «01 / УСЛУГИ» + крупный заголовок + необязательный подзаголовок справа */
const SectionHeader = ({ index, label, title, sub, className = "" }: SectionHeaderProps) => (
  <div className={`mb-12 flex flex-wrap items-end justify-between gap-6 ${className}`}>
    <div className="flex flex-col gap-4">
      <span className="wn-label text-primary">
        {index ? `${index} / ${label}` : label}
      </span>
      <h2 className="font-display text-[clamp(30px,4vw,54px)] font-medium leading-[1.08] tracking-[-0.02em] [text-wrap:balance]">
        {title}
      </h2>
    </div>
    {sub ? <p className="max-w-[420px] text-muted-foreground">{sub}</p> : null}
  </div>
);

export default SectionHeader;

/** Общий контейнер страницы */
export const container = "mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-14";
