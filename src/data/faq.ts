import type { Language } from "@/contexts/LanguageContext";
import { formatUsd, priceFrom } from "@/lib/price";
import { FEATURE_PRICE, PRICE, TIMELINE_MULTIPLIER } from "@/data/pricing";

/**
 * Вопросы и ответы для секции FAQ и для разметки FAQPage (JSON-LD).
 * Файл без 'use client', поэтому его читает и серверная страница.
 * Цены подставляются из data/pricing.ts.
 */
export interface FaqItem {
  question: string;
  answer: string;
}

const urgentPercent = Math.round((TIMELINE_MULTIPLIER.urgent - 1) * 100);
const flexiblePercent = Math.round((1 - TIMELINE_MULTIPLIER.flexible) * 100);

const ru = (key: keyof typeof PRICE) => priceFrom(PRICE[key], "ru");
const uz = (key: keyof typeof PRICE) => priceFrom(PRICE[key], "uz");

export const FAQ: Record<Language, FaqItem[]> = {
  ru: [
    {
      question: "Сколько стоит разработка сайта?",
      answer: `Стартовые цены: сайт — ${ru("website")}, интернет-магазин — ${ru("ecommerce")}, Telegram-бот — ${ru("telegram")}, веб-приложение — ${ru("webapp")}, автоматизация — ${ru("automation")}. Предварительную сумму можно посчитать в калькуляторе выше. Точную цену называем после короткого брифа, до начала работ и без скрытых платежей.`,
    },
    {
      question: "Сколько времени занимает разработка?",
      answer: `Лендинг или сайт компании — 1–2 недели, интернет-магазин — 3–4 недели, веб-приложение — от месяца. Если срок горит, работу можно ускорить: это +${urgentPercent}% к стоимости. Если сроки гибкие, 1–2 месяца, — скидка ${flexiblePercent}%.`,
    },
    {
      question: "Как проходит оплата?",
      answer:
        "В два этапа: 50% — предоплата перед началом работ, оставшиеся 50% — после сдачи проекта, когда вы проверили результат.",
    },
    {
      question: "Что нужно от меня, чтобы начать?",
      answer:
        "Опишите задачу в форме ниже или напишите нам в Telegram. Созвонимся, уточним детали и назовём цену и срок. Логотип, тексты и фотографии понадобятся к этапу дизайна — если чего-то пока нет, обсудим это на созвоне.",
    },
    {
      question: "Смогу ли я сам менять тексты и цены на сайте?",
      answer: `Да, если подключить систему управления (CMS) — это +${formatUsd(FEATURE_PRICE.cms)}. Через неё вы сами меняете тексты, фотографии, цены и товары, без программиста.`,
    },
    {
      question: "Что входит в поддержку после запуска?",
      answer:
        "Первые 3 месяца поддержка бесплатная: исправляем ошибки, если что-то работает не так, и отвечаем на вопросы по управлению сайтом. Новые разделы и функции оцениваем отдельно.",
    },
    {
      question: "Можно сделать сайт на русском и узбекском?",
      answer: `Да. Дополнительные языковые версии — опция «Несколько языков», +${formatUsd(FEATURE_PRICE.multilang)}. Делаем сайты на русском, узбекском и английском.`,
    },
    {
      question: "Работаете ли вы с клиентами не из Ташкента?",
      answer:
        "Да, с клиентами из других городов Узбекистана и из-за рубежа — например, melbournemasterworks.com из нашего портфолио. Встречаться лично не обязательно: созваниваемся и переписываемся в Telegram, WhatsApp или по почте.",
    },
  ],
  uz: [
    {
      question: "Sayt yaratish qancha turadi?",
      answer: `Boshlang'ich narxlar: sayt — ${uz("website")}, onlayn do'kon — ${uz("ecommerce")}, Telegram-bot — ${uz("telegram")}, veb-ilova — ${uz("webapp")}, avtomatlashtirish — ${uz("automation")}. Taxminiy summani yuqoridagi kalkulyatorda hisoblash mumkin. Aniq narxni qisqa brifdan keyin, ish boshlanishidan oldin aytamiz — yashirin to'lovlarsiz.`,
    },
    {
      question: "Ishlab chiqish qancha vaqt oladi?",
      answer: `Lending yoki kompaniya sayti — 1–2 hafta, onlayn do'kon — 3–4 hafta, veb-ilova — bir oydan. Muddat shoshilinch bo'lsa, ishni tezlashtirish mumkin: bu narxga +${urgentPercent}%. Muddat moslashuvchan bo'lsa (1–2 oy) — ${flexiblePercent}% chegirma.`,
    },
    {
      question: "To'lov qanday amalga oshiriladi?",
      answer:
        "Ikki bosqichda: 50% — ish boshlanishidan oldin oldindan to'lov, qolgan 50% — loyiha topshirilib, natijani tekshirganingizdan keyin.",
    },
    {
      question: "Boshlash uchun mendan nima kerak?",
      answer:
        "Vazifani quyidagi formada tasvirlab bering yoki bizga Telegramda yozing. Qo'ng'iroq qilib, tafsilotlarni aniqlaymiz va narx hamda muddatni aytamiz. Logotip, matnlar va rasmlar dizayn bosqichida kerak bo'ladi — agar hozircha biror narsa bo'lmasa, buni qo'ng'iroqda muhokama qilamiz.",
    },
    {
      question: "Saytdagi matn va narxlarni o'zim o'zgartira olamanmi?",
      answer: `Ha, agar boshqaruv tizimi (CMS) ulansa — bu +${formatUsd(FEATURE_PRICE.cms)}. U orqali matnlar, rasmlar, narxlar va mahsulotlarni dasturchisiz o'zingiz o'zgartirasiz.`,
    },
    {
      question: "Ishga tushirilgandan keyingi qo'llab-quvvatlashga nima kiradi?",
      answer:
        "Dastlabki 3 oy qo'llab-quvvatlash bepul: biror narsa noto'g'ri ishlasa, xatolarni tuzatamiz va saytni boshqarish bo'yicha savollarga javob beramiz. Yangi bo'limlar va funksiyalar alohida baholanadi.",
    },
    {
      question: "Saytni rus va o'zbek tillarida qilsa bo'ladimi?",
      answer: `Ha. Qo'shimcha til versiyalari — «Bir nechta til» opsiyasi, +${formatUsd(FEATURE_PRICE.multilang)}. Saytlarni rus, o'zbek va ingliz tillarida qilamiz.`,
    },
    {
      question: "Toshkentdan tashqaridagi mijozlar bilan ishlaysizmi?",
      answer:
        "Ha, O'zbekistonning boshqa shaharlari va xorijdagi mijozlar bilan ishlaymiz — masalan, portfoliomizdagi melbournemasterworks.com. Shaxsan uchrashish shart emas: qo'ng'iroq qilamiz va Telegram, WhatsApp yoki pochta orqali yozishamiz.",
    },
  ],
};
