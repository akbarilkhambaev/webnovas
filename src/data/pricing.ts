/**
 * Цены WebNova в долларах — единственный источник.
 * Отсюда берут цифры первый экран, услуги, калькулятор, FAQ,
 * мета-описание главной и разметка JSON-LD. Меняйте цены только здесь.
 */

/** Стартовые цены услуг */
export const SERVICES = [
  { key: "website", price: 500 },
  { key: "ecommerce", price: 1500 },
  { key: "telegram", price: 300 },
  { key: "webapp", price: 2000 },
  { key: "automation", price: 800 },
] as const;

/** Дополнительные опции в калькуляторе */
export const FEATURES = [
  { key: "cms", price: 300 },
  { key: "multilang", price: 200 },
  { key: "seo", price: 250 },
  { key: "analytics", price: 150 },
  { key: "payment", price: 400 },
  { key: "mobile", price: 1000 },
] as const;

/** Множители цены в зависимости от срока */
export const TIMELINES = [
  { key: "urgent", multiplier: 1.5 },
  { key: "standard", multiplier: 1 },
  { key: "flexible", multiplier: 0.85 },
] as const;

export type ServiceKey = (typeof SERVICES)[number]["key"];
export type FeatureKey = (typeof FEATURES)[number]["key"];
export type TimelineKey = (typeof TIMELINES)[number]["key"];

export const PRICE = Object.fromEntries(SERVICES.map((s) => [s.key, s.price])) as Record<ServiceKey, number>;

export const FEATURE_PRICE = Object.fromEntries(FEATURES.map((f) => [f.key, f.price])) as Record<FeatureKey, number>;

export const TIMELINE_MULTIPLIER = Object.fromEntries(TIMELINES.map((t) => [t.key, t.multiplier])) as Record<
  TimelineKey,
  number
>;
