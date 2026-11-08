'use client'

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import WorkProcess from "@/components/WorkProcess";
import PricingCalculator from "@/components/PricingCalculator";
import FAQSection from "@/components/FAQSection";
import NewsSection from "@/components/NewsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingChatButton from "@/components/FloatingChatButton";
import SkyBackground from "@/components/brand/SkyBackground";

// Статистика, отзывы, «почему мы», стек и финальный CTA убраны с главной:
// в них были непроверяемые цифры и примерные отзывы. Файлы компонентов остались —
// их можно вернуть, когда появятся реальные данные.
const Index = () => {
  return (
    // isolate: небо с -z-10 рисуется поверх фона страницы, но под содержимым
    <div className="relative isolate min-h-screen overflow-x-clip bg-background text-foreground">
      <SkyBackground />
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <PortfolioSection />
        <WorkProcess />
        <PricingCalculator />
        <FAQSection />
        <NewsSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingChatButton />
    </div>
  );
};

export default Index;
