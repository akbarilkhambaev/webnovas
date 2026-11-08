import type { Metadata } from "next";
import { priceFrom } from "@/lib/price";
import { PRICE } from "@/data/pricing";

export const SITE_URL = "https://webnovas.uz";

export const CONTACTS = {
  phone: "+998778774604",
  email: "info@webnovas.uz",
  telegram: "https://t.me/webnovauz",
} as const;

export const HOME_TITLE = "Разработка сайтов и Telegram-ботов в Ташкенте — WebNova";

export const HOME_DESCRIPTION =
  `Создаём сайты ${priceFrom(PRICE.website, "ru")}, интернет-магазины ${priceFrom(PRICE.ecommerce, "ru")} ` +
  `и Telegram-боты ${priceFrom(PRICE.telegram, "ru")}. Сайт — за 1–2 недели, оплата 50/50, ` +
  `3 месяца бесплатной поддержки.`;

/**
 * Общие поля Open Graph. Next.js не сливает openGraph родителя и страницы,
 * а заменяет целиком, поэтому страницы разворачивают этот объект и дописывают свои поля.
 */
export const baseOpenGraph = {
  type: "website" as const,
  siteName: "WebNova",
  locale: "ru_RU",
  alternateLocale: ["uz_UZ"],
  // Картинку генерирует app/opengraph-image.tsx. Указываем её явно: страница,
  // у которой свой openGraph, не наследует картинку из корня.
  images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "WebNova — разработка сайтов в Ташкенте" }],
} satisfies Metadata["openGraph"];

/** JSON для <script type="application/ld+json"> с экранированием «<», как советует документация Next.js */
export const jsonLdString = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");
