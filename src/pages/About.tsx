
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { AboutContent } from "@/components/about/AboutContent";
import { CertificatesSection } from "@/components/about/CertificatesSection";
import { TimelineSection } from "@/components/about/TimelineSection";
import { ContactModule } from "@/components/about/ContactModule";
import StickyQuoteBar from "@/components/ctas/StickyQuoteBar";
import FloatingActionButton from "@/components/ctas/FloatingActionButton";

const About = () => {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = `${t('nav.about')} | Makpas`;
  }, [t]);

  return (
    <div className="min-h-screen bg-pattern-waves section-bg-pattern pt-16">
      <StickyQuoteBar />
      <FloatingActionButton />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary dark:text-white font-space-grotesk mb-4">
            {t('nav.about')}
          </h1>
        </div>
        
        <div className="space-y-16">
          <AboutContent />
          <CertificatesSection />
          <TimelineSection />
          <ContactModule />
        </div>
      </div>
    </div>
  );
};

export default About;
