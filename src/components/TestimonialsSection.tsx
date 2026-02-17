import { useLanguage } from "@/hooks/useLanguage";
import { Star, Quote } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const TestimonialsSection = () => {
  const { t, language } = useLanguage();
  const { ref, inView } = useInView({ threshold: 0.1 });

  const testimonials = [
    {
      name: language === 'ru' ? 'Алексей Петров' : 'Aleksey Petrov',
      position: language === 'ru' ? 'Директор, ТехноМаркет' : 'Direktor, TechnoMarket',
      avatar: 'AP',
      rating: 5,
      text: language === 'ru' 
        ? 'WebNova создали для нас потрясающий интернет-магазин. Продажи выросли на 300% за первые 3 месяца. Профессионалы своего дела!'
        : 'WebNova bizning uchun ajoyib onlayn do\'kon yaratdi. Sotuv birinchi 3 oyda 300% ga oshdi. O\'z ishining professionallar!',
    },
    {
      name: language === 'ru' ? 'Мария Иванова' : 'Mariya Ivanova',
      position: language === 'ru' ? 'Основатель, Beauty Studio' : 'Asoschisi, Beauty Studio',
      avatar: 'МИ',
      rating: 5,
      text: language === 'ru'
        ? 'Отличная команда! Сделали сайт быстро и качественно. Особенно понравилась система онлайн-записи и Telegram-бот для клиентов.'
        : 'Ajoyib jamoa! Saytni tez va sifatli qilishdi. Ayniqsa onlayn yozilish tizimi va mijozlar uchun Telegram-bot yoqdi.',
    },
    {
      name: language === 'ru' ? 'Джамшид Каримов' : 'Jamshid Karimov',
      avatar: 'ДК',
      position: language === 'ru' ? 'CEO, Express Logistics' : 'CEO, Express Logistics',
      rating: 5,
      text: language === 'ru'
        ? 'Автоматизация процессов, которую внедрила WebNova, сэкономила нам огромное количество времени. Теперь все работает как часы!'
        : 'WebNova amalga oshirgan jarayonlarni avtomatlashtirish bizga juda ko\'p vaqtni tejadi. Endi hamma narsa soat kabi ishlaydi!',
    },
    {
      name: language === 'ru' ? 'Сергей Николаев' : 'Sergey Nikolaev',
      position: language === 'ru' ? 'Владелец, Фитнес-клуб "Атлант"' : 'Egasi, Fitnes klub "Atlant"',
      avatar: 'СН',
      rating: 5,
      text: language === 'ru'
        ? 'Сайт получился современным и удобным. Клиенты часто отмечают, насколько легко записаться на тренировку и оплатить абонемент онлайн.'
        : 'Sayt zamonaviy va qulay bo\'ldi. Mijozlar ko\'pincha mashg\'ulotga yozilish va onlayn to\'lashning qanchalik oson ekanligini ta\'kidlaydilar.',
    },
  ];

  return (
    <section id="testimonials" className="py-32 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 tech-grid opacity-20" />
      
      {/* Glow effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-neon-violet/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className={`text-center mb-20 scroll-reveal ${inView ? 'active' : ''}`}>
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            {t('testimonials.title')}
          </span>
          <h2 className="text-4xl lg:text-5xl font-display font-bold mt-3">
            {t('testimonials.heading')}{" "}
            <span className="gradient-text">{t('testimonials.headingHighlight')}</span>
          </h2>
        </div>

        <div className="max-w-5xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                  <div className="glass rounded-2xl p-8 h-full relative hover-glow">
                    <Quote className="absolute top-6 right-6 text-primary/20" size={48} />
                    
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="text-yellow-500 fill-yellow-500" size={18} />
                      ))}
                    </div>

                    <p className="text-muted-foreground mb-6 relative z-10">
                      "{testimonial.text}"
                    </p>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
