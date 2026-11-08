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

// Статистика, отзывы, «почему мы», стек и финальный CTA убраны с главной:
// в них были непроверяемые цифры и примерные отзывы. Файлы компонентов остались —
// их можно вернуть, когда появятся реальные данные.
const Index = () => {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
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
