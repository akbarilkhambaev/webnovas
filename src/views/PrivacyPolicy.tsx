'use client'

import { useLanguage } from "@/hooks/useLanguage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const PrivacyPolicy = () => {
  const { language } = useLanguage();

  const content = {
    ru: {
      title: "Политика конфиденциальности",
      lastUpdated: "Последнее обновление: 17 февраля 2026",
      sections: [
        {
          title: "1. Сбор информации",
          content: "Мы собираем информацию, которую вы предоставляете при заполнении форм на нашем сайте, включая имя, email, телефон и детали проекта. Эта информация используется исключительно для связи с вами и предоставления наших услуг.",
        },
        {
          title: "2. Использование информации",
          content: "Ваши данные используются для: связи с вами по поводу ваших запросов, предоставления услуг, улучшения качества обслуживания, отправки важных обновлений о проектах.",
        },
        {
          title: "3. Защита данных",
          content: "Мы применяем современные технические и организационные меры для защиты ваших персональных данных от несанкционированного доступа, изменения или уничтожения.",
        },
        {
          title: "4. Передача третьим лицам",
          content: "Мы не продаем и не передаем ваши персональные данные третьим лицам без вашего согласия, за исключением случаев, предусмотренных законом.",
        },
        {
          title: "5. Файлы cookie",
          content: "Наш сайт использует cookie для улучшения пользовательского опыта. Вы можете настроить свой браузер для отклонения cookie.",
        },
        {
          title: "6. Ваши права",
          content: "Вы имеете право запросить доступ к своим данным, их исправление или удаление. Для этого свяжитесь с нами по email: info@webnova.uz",
        },
        {
          title: "7. Контакты",
          content: "Если у вас есть вопросы о нашей политике конфиденциальности, свяжитесь с нами:\nEmail: info@webnova.uz\nТелефон: +998 90 123 45 67",
        },
      ],
    },
    uz: {
      title: "Maxfiylik siyosati",
      lastUpdated: "Oxirgi yangilanish: 17 fevral 2026",
      sections: [
        {
          title: "1. Ma'lumotlarni yig'ish",
          content: "Biz saytimizda formalarni to'ldirishda taqdim etgan ma'lumotlaringizni, jumladan, ism, email, telefon va loyiha tafsilotlarini yig'amiz. Bu ma'lumotlar faqat siz bilan bog'lanish va xizmatlarimizni taqdim etish uchun ishlatiladi.",
        },
        {
          title: "2. Ma'lumotlardan foydalanish",
          content: "Sizning ma'lumotlaringiz quyidagilar uchun ishlatiladi: so'rovlaringiz bo'yicha siz bilan bog'lanish, xizmatlarni taqdim etish, xizmat sifatini yaxshilash, loyihalar bo'yicha muhim yangilanishlarni yuborish.",
        },
        {
          title: "3. Ma'lumotlarni himoya qilish",
          content: "Biz shaxsiy ma'lumotlaringizni ruxsatsiz kirish, o'zgartirish yoki yo'q qilishdan himoya qilish uchun zamonaviy texnik va tashkiliy choralarni qo'llaymiz.",
        },
        {
          title: "4. Uchinchi tomonlarga uzatish",
          content: "Biz sizning roziligingiz va qonunda nazarda tutilgan hollar bundan mustasno, shaxsiy ma'lumotlaringizni uchinchi tomonlarga sotmaymiz va uzatmaymiz.",
        },
        {
          title: "5. Cookie fayllari",
          content: "Bizning saytimiz foydalanuvchi tajribasini yaxshilash uchun cookie dan foydalanadi. Siz brauzeringizni cookie ni rad etish uchun sozlashingiz mumkin.",
        },
        {
          title: "6. Sizning huquqlaringiz",
          content: "Siz o'z ma'lumotlaringizga kirishni, ularni tuzatishni yoki o'chirishni so'rash huquqiga egasiz. Buning uchun biz bilan bog'laning: info@webnova.uz",
        },
        {
          title: "7. Kontaktlar",
          content: "Agar maxfiylik siyosatimiz haqida savollaringiz bo'lsa, biz bilan bog'laning:\nEmail: info@webnova.uz\nTelefon: +998 90 123 45 67",
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

export default PrivacyPolicy;
