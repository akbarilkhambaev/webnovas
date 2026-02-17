import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useInView } from "@/hooks/useInView";

const ContactSection = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { ref, inView } = useInView({ threshold: 0.1 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Check if we're in development mode without Vercel
      const isDevelopment = import.meta.env.DEV;
      
      const response = await fetch('/api/send-telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Handle development mode when API is not available
      if (!response.ok && isDevelopment) {
        console.log('📧 Форма отправлена (DEV режим):', formData);
        toast({
          title: "✅ Форма отправлена (DEV режим)",
          description: "В продакшене заявка будет отправлена в Telegram. Данные в консоли.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });
        setIsSubmitting(false);
        return;
      }

      const data = await response.json();

      if (response.ok) {
        toast({
          title: t('contact.form.submit'),
          description: data.message || "Спасибо! Мы свяжемся с вами в ближайшее время.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });
      } else {
        toast({
          title: "Ошибка",
          description: "Не удалось отправить заявку. Попробуйте позже.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // In development, show success even if API fails
      if (import.meta.env.DEV) {
        console.log('📧 Форма отправлена (DEV режим):', formData);
        toast({
          title: "✅ Форма отправлена (DEV режим)",
          description: "В продакшене заявка будет отправлена в Telegram. Данные в консоли.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });
      } else {
        toast({
          title: "Ошибка",
          description: "Произошла ошибка при отправке заявки.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: Mail,
      label: t('contact.info.email'),
      value: "info@webnova.uz",
      href: "mailto:info@webnova.uz",
    },
    {
      icon: Phone,
      label: t('contact.info.phone'),
      value: "+998 90 123 45 67",
      href: "tel:+998901234567",
    },
    {
      icon: MapPin,
      label: t('contact.info.address'),
      value: t('contact.info.addressValue'),
      href: "#",
    },
  ];

  return (
    <section id="contact" className="py-32 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 tech-grid opacity-30" />
      
      {/* Glow effects */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-neon-cyan/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-neon-violet/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className={`text-center mb-20 scroll-reveal ${inView ? 'active' : ''}`}>
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            {t('contact.title')}
          </span>
          <h2 className="text-4xl lg:text-5xl font-display font-bold mt-3">
            {t('contact.heading')}{" "}
            <span className="gradient-text">{t('contact.headingHighlight')}</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            {t('contact.description')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            {contactInfo.map((info, i) => (
              <a
                key={i}
                href={info.href}
                className={`group glass rounded-2xl p-6 hover-glow flex items-start gap-4 transition-all duration-300 scroll-reveal-left ${inView ? 'active' : ''}`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:glow-cyan-sm transition-all duration-500 flex-shrink-0">
                  <info.icon className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{info.label}</h3>
                  <p className="text-muted-foreground">{info.value}</p>
                </div>
              </a>
            ))}

            {/* Map placeholder */}
            <div className="glass rounded-2xl p-6 h-64 flex items-center justify-center">
              <p className="text-muted-foreground">Карта расположения</p>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className={`glass rounded-2xl p-8 scroll-reveal-right ${inView ? 'active' : ''}`}>
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  {t('contact.form.name')}
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder={t('contact.form.namePlaceholder')}
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                  className="bg-surface/50"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    {t('contact.form.email')}
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t('contact.form.emailPlaceholder')}
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                    className="bg-surface/50"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    {t('contact.form.phone')}
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder={t('contact.form.phonePlaceholder')}
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    required
                    className="bg-surface/50"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium mb-2">
                  {t('contact.form.service')}
                </label>
                <Select value={formData.service} onValueChange={(value) => handleChange("service", value)}>
                  <SelectTrigger className="bg-surface/50">
                    <SelectValue placeholder={t('contact.form.servicePlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="website">{t('services.website.title')}</SelectItem>
                    <SelectItem value="ecommerce">{t('services.ecommerce.title')}</SelectItem>
                    <SelectItem value="telegram">{t('services.telegram.title')}</SelectItem>
                    <SelectItem value="webapp">{t('services.webapp.title')}</SelectItem>
                    <SelectItem value="automation">{t('services.automation.title')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  {t('contact.form.message')}
                </label>
                <Textarea
                  id="message"
                  placeholder={t('contact.form.messagePlaceholder')}
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  required
                  rows={5}
                  className="bg-surface/50 resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground glow-cyan hover:brightness-110 transition-all duration-300"
              >
                {isSubmitting ? (
                  t('contact.form.sending')
                ) : (
                  <>
                    <Send size={18} className="mr-2" />
                    {t('contact.form.submit')}
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
