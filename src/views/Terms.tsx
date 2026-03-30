'use client'

import { useLanguage } from "@/hooks/useLanguage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const Terms = () => {
  const { language } = useLanguage();

  const content = {
    ru: {
      title: "Условия использования",
      lastUpdated: "Последнее обновление: 17 февраля 2026",
      sections: [
        {
          title: "1. Принятие условий",
          content: "Используя наш веб-сайт и услуги, вы соглашаетесь с настоящими условиями использования. Если вы не согласны с какой-либо частью условий, пожалуйста, не используйте наш сайт.",
        },
        {
          title: "2. Описание услуг",
          content: "WebNova предоставляет услуги разработки веб-сайтов, веб-приложений, интернет-магазинов, Telegram ботов и автоматизации бизнес-процессов.",
        },
        {
          title: "3. Интеллектуальная собственность",
          content: "Все права на разработанные проекты передаются клиенту после полной оплаты услуг, если иное не предусмотрено договором. Мы оставляем за собой право использовать проекты в портфолио.",
        },
        {
          title: "4. Оплата и возврат средств",
          content: "Оплата производится согласно договору. Возврат средств возможен только в случаях, предусмотренных договором и законодательством.",
        },
        {
          title: "5. Обязательства клиента",
          content: "Клиент обязуется предоставлять точную информацию, своевременно отвечать на запросы и предоставлять необходимые материалы для выполнения проекта.",
        },
        {
          title: "6. Ограничение ответственности",
          content: "WebNova не несет ответственности за убытки, возникшие в результате использования или невозможности использования наших услуг, за исключением случаев, предусмотренных законом.",
        },
        {
          title: "7. Изменение условий",
          content: "Мы оставляем за собой право изменять эти условия в любое время. Изменения вступают в силу после публикации на сайте.",
        },
      ],
    },
    uz: {
      title: "Foydalanish shartlari",
      lastUpdated: "Oxirgi yangilanish: 17 fevral 2026",
      sections: [
        {
          title: "1. Shartlarni qabul qilish",
          content: "Bizning veb-saytimiz va xizmatlarimizdan foydalanib, siz ushbu foydalanish shartlariga rozilik bildirasiz. Agar siz shartlarning biron bir qismiga rozi bo'lmasangiz, iltimos, saytimizdan foydalanmang.",
        },
        {
          title: "2. Xizmatlar tavsifi",
          content: "WebNova veb-saytlar, veb-ilovalar, onlayn do'konlar, Telegram botlar va biznes jarayonlarini avtomatlashtirish xizmatlarini taqdim etadi.",
        },
        {
          title: "3. Intellektual mulk",
          content: "Ishlab chiqilgan loyihalarga barcha huquqlar to'liq to'lovdan keyin mijozga o'tkaziladi, agar shartnomada boshqacha nazarda tutilmagan bo'lsa. Biz loyihalarni portfolioda ishlatish huquqini o'zida saqlab qolamiz.",
        },
        {
          title: "4. To'lov va pulni qaytarish",
          content: "To'lov shartnomaga muvofiq amalga oshiriladi. Pul qaytarish faqat shartnoma va qonun hujjatlarida nazarda tutilgan hollarda mumkin.",
        },
        {
          title: "5. Mijoz majburiyatlari",
          content: "Mijoz to'g'ri ma'lumot berishga, so'rovlarga o'z vaqtida javob berishga va loyihani bajarish uchun zarur materiallarni taqdim etishga majburdir.",
        },
        {
          title: "6. Javobgarlikni cheklash",
          content: "WebNova xizmatlarimizdan foydalanish yoki foydalana olmaslik natijasida yuzaga kelgan zararlar uchun, qonunda nazarda tutilgan hollar bundan mustasno, javobgar emas.",
        },
        {
          title: "7. Shartlarni o'zgartirish",
          content: "Biz bu shartlarni istalgan vaqtda o'zgartirish huquqini o'zimizda saqlab qolamiz. O'zgarishlar saytda e'lon qilingandan keyin kuchga kiradi.",
        },
      ],
    },
  };

  const data = content[language];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="container mx-auto px-6 py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary hover:brightness-110 transition-all mb-8"
        >
          <ArrowLeft size={20} />
          {language === 'ru' ? 'Назад на главную' : 'Bosh sahifaga qaytish'}
        </Link>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-display font-bold mb-4">
            {data.title}
          </h1>
          <p className="text-muted-foreground mb-12">{data.lastUpdated}</p>

          <div className="space-y-8">
            {data.sections.map((section, index) => (
              <div key={index} className="glass rounded-2xl p-8">
                <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
                <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Terms;
