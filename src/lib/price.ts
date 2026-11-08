import type { Language } from "@/contexts/LanguageContext";

/** $1500 → "$1 500" (неразрывный пробел между разрядами) */
export const formatUsd = (value: number) =>
  "$" + Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

/** «от $500» по-русски, «$500 dan» по-узбекски */
export const priceFrom = (value: number, language: Language) =>
  language === "uz" ? `${formatUsd(value)} dan` : `от ${formatUsd(value)}`;
