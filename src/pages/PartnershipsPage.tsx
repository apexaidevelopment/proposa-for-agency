import { CurrencyProvider } from '../context/CurrencyContext';
import Navbar from '../components/partnerships/Navbar';
import HeroSection from '../components/partnerships/HeroSection';
import HowWeThinkSection from '../components/partnerships/HowWeThinkSection';
import ComparisonSection from '../components/partnerships/ComparisonSection';
import GapSection from '../components/partnerships/CaseSection';
import ShiftSection from '../components/partnerships/DisruptionSection';
import ServicesSection from '../components/partnerships/ServicesSection';
import PartnershipSection from '../components/partnerships/WhyReferralSection';
import After5Section from '../components/partnerships/After5Section';
import ProcessSection from '../components/partnerships/ProcessSection';
import FinalCtaSection from '../components/partnerships/FinalCtaSection';
import FaqSection from '../components/partnerships/FaqSection';
import Footer from '../components/partnerships/Footer';

const openCalendly = () => {
  if ((window as any).Calendly) {
    (window as any).Calendly.initPopupWidget({
      url: 'https://calendly.com/_apexai/partnerships-call?hide_gdpr_banner=1&primary_color=0152ff',
    });
  } else {
    window.open('https://calendly.com/_apexai/partnerships-call', '_blank');
  }
};

export default function PartnershipsPage() {
  return (
    <CurrencyProvider>
      <div className="min-h-screen bg-[#0a0f1e]">
        <Navbar onBookCall={openCalendly} />
        <HeroSection onBookCall={openCalendly} />
        <HowWeThinkSection />
        <ComparisonSection />
        <GapSection />
        <ShiftSection />
        <ServicesSection />
        <PartnershipSection />
        <After5Section />
        <ProcessSection />
        <FinalCtaSection onBookCall={openCalendly} />
        <FaqSection />
        <Footer />
      </div>
    </CurrencyProvider>
  );
}
