import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import WorkProcess from "@/components/WorkProcess";
import StatsSection from "@/components/StatsSection";
import PortfolioSection from "@/components/PortfolioSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import TechStack from "@/components/TechStack";
import PricingCalculator from "@/components/PricingCalculator";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import FloatingChatButton from "@/components/FloatingChatButton";
import AnimatedBackground from "@/components/AnimatedBackground";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <AnimatedBackground />
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <StatsSection />
      <WhyChooseUs />
      <WorkProcess />
      <PortfolioSection />
      <TestimonialsSection />
      <TechStack />
      <PricingCalculator />
      <FAQSection />
      <ContactSection />
      <FinalCTA />
      <Footer />
      <FloatingChatButton />
    </div>
  );
};

export default Index;
