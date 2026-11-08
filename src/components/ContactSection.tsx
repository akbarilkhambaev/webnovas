'use client'

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useToast } from "@/hooks/use-toast";
import { useInView } from "@/hooks/useInView";
import { container } from "@/components/brand/SectionHeader";
import { SOCIAL_LINKS } from "@/components/Footer";

const EMPTY_FORM = { name: "", email: "", phone: "", service: "", message: "" };

const fieldLabel = "font-mono text-[13px] uppercase tracking-[0.06em] text-muted-foreground";
const fieldInput =
  "min-h-[52px] w-full rounded-xl border border-input bg-background px-4 text-foreground placeholder:text-[#8B919C] transition-colors focus:border-primary focus:outline-none";

const ContactSection = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { ref, inView } = useInView({ threshold: 0.1 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(EMPTY_FORM);

  const handleChange = (field: keyof typeof EMPTY_FORM, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const isDevelopment = process.env.NODE_ENV === "development";

    try {
      const response = await fetch("/api/send-telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok || isDevelopment) {
        if (!response.ok) console.log("Форма отправлена (DEV режим):", formData);
        toast({ title: t("contact.form.submit"), description: t("home.contact.sent") });
        setFormData(EMPTY_FORM);
      } else {
        toast({ title: t("home.contact.errorTitle"), description: t("home.contact.error"), variant: "destructive" });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      if (isDevelopment) {
        toast({ title: t("contact.form.submit"), description: t("home.contact.sent") });
        setFormData(EMPTY_FORM);
      } else {
        toast({ title: t("home.contact.errorTitle"), description: t("home.contact.error"), variant: "destructive" });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={ref} className={`${container} py-[clamp(72px,9vw,128px)]`}>
      <div
        className={`flex flex-wrap gap-14 rounded-[28px] border border-border bg-card p-[clamp(24px,5vw,64px)] scroll-reveal ${
          inView ? "active" : ""
        }`}
      >
        {/* Контакты */}
        <div className="flex min-w-0 flex-[1_1_360px] flex-col gap-7">
          <span className="wn-label text-primary">06 / {t("home.labels.contact")}</span>
          <h2 className="font-display text-[clamp(30px,4vw,54px)] font-medium leading-[1.08] tracking-[-0.02em] [text-wrap:balance]">
            {t("home.contact.heading")}
          </h2>
          <p className="max-w-[440px] text-muted-foreground">{t("home.contact.description")}</p>

          <div className="mt-2 flex flex-col gap-3.5">
            <a href="tel:+998778774604" className="font-display text-[clamp(20px,2vw,26px)] transition-colors hover:text-primary">
              +998 77 877 46 04
            </a>
            <a href="mailto:info@webnovas.uz" className="text-lg text-foreground/80 transition-colors hover:text-primary">
              info@webnovas.uz
            </a>
            <span className="text-muted-foreground">{t("contact.info.addressValue")}</span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center rounded-full border border-input px-[18px] text-[15px] text-foreground/80 transition-colors hover:border-foreground hover:text-foreground"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        {/* Форма */}
        <form onSubmit={handleSubmit} className="flex min-w-0 flex-[1_1_420px] flex-col gap-[18px]">
          <label className="flex flex-col gap-2">
            <span className={fieldLabel}>{t("contact.form.name")}</span>
            <input
              type="text"
              name="name"
              autoComplete="name"
              placeholder={t("contact.form.namePlaceholder")}
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
              className={fieldInput}
            />
          </label>

          <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className={fieldLabel}>{t("contact.form.phone")}</span>
              <input
                type="tel"
                name="phone"
                autoComplete="tel"
                placeholder={t("contact.form.phonePlaceholder")}
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                required
                className={fieldInput}
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className={fieldLabel}>{t("contact.form.email")}</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder={t("contact.form.emailPlaceholder")}
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
                className={fieldInput}
              />
            </label>
          </div>

          <div className="flex flex-col gap-2">
            <span id="service-label" className={fieldLabel}>
              {t("contact.form.service")}
            </span>
            <Select value={formData.service} onValueChange={(value) => handleChange("service", value)}>
              <SelectTrigger aria-labelledby="service-label" className={`${fieldInput} h-auto`}>
                <SelectValue placeholder={t("contact.form.servicePlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="website">{t("services.website.title")}</SelectItem>
                <SelectItem value="ecommerce">{t("services.ecommerce.title")}</SelectItem>
                <SelectItem value="telegram">{t("services.telegram.title")}</SelectItem>
                <SelectItem value="webapp">{t("services.webapp.title")}</SelectItem>
                <SelectItem value="automation">{t("services.automation.title")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <label className="flex flex-col gap-2">
            <span className={fieldLabel}>{t("contact.form.message")}</span>
            <textarea
              name="message"
              rows={4}
              placeholder={t("contact.form.messagePlaceholder")}
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
              required
              className={`${fieldInput} resize-y py-3.5`}
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="min-h-[56px] rounded-full bg-primary text-[17px] font-semibold text-primary-foreground transition hover:brightness-110 disabled:opacity-60"
          >
            {isSubmitting ? t("contact.form.sending") : t("contact.form.submit")}
          </button>

          <p className="text-sm text-[#8B919C]">
            {t("home.contact.consentPrefix")}
            <Link href="/privacy" className="text-foreground/80 underline underline-offset-4 hover:text-primary">
              {t("home.contact.consentLink")}
            </Link>
            {t("home.contact.consentSuffix")}
          </p>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
