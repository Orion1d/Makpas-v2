
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { AboutContent } from "@/components/about/AboutContent";
import { CertificatesSection } from "@/components/about/CertificatesSection";
import { TimelineSection } from "@/components/about/TimelineSection";
import { ContactModule } from "@/components/about/ContactModule";
import { MinimalCoreValues } from "@/components/about/MinimalCoreValues";
import { StatsCounter } from "@/components/about/StatsCounter";
import StickyQuoteBar from "@/components/ctas/StickyQuoteBar";
import FloatingActionButton from "@/components/ctas/FloatingActionButton";

const About = () => {
  const { t, language } = useLanguage();

  useEffect(() => {
    document.title = `${t('nav.about')} | Makpas`;
  }, [t]);

  // Company information sentences based on language
  const aboutSentences = language === 'tr' ? [
    "Makpas, 1998 yılından bu yana endüstriyel imalat sektöründe güvenilir bir partner olarak hizmet vermektedir.",
    "25 yılı aşkın deneyimimizle, CNC torna, freze ve hassas işleme alanlarında uzmanlaşmış bir firmayız.",
    "Amerika'dan Uzak Doğu'ya kadar geniş bir coğrafyada ithalat ve ihracat faaliyetleri yürütmekteyiz.",
    "ISO 9001:2015 ve ISO 14001:2015 sertifikalarına sahip olan firmamız, kalite standartlarından asla ödün vermez.",
    "Modern CNC makinelerimiz ve deneyimli ekibimizle, müşterilerimizin en karmaşık gereksinimlerini karşılıyoruz.",
    "Sürekli gelişim anlayışımızla, sektördeki yenilikleri yakından takip ediyor ve teknolojiye yatırım yapıyoruz."
  ] : [
    "Makpas has been serving as a reliable partner in the industrial manufacturing sector since 1998.",
    "With over 25 years of experience, we are a company specialized in CNC turning, milling and precision machining.",
    "We carry out import and export activities in a wide geography from America to the Far East.",
    "Our company, which has ISO 9001:2015 and ISO 14001:2015 certificates, never compromises on quality standards.",
    "With our modern CNC machines and experienced team, we meet the most complex requirements of our customers.",
    "With our continuous improvement approach, we closely follow innovations in the sector and invest in technology."
  ];

  // Mock certificate data for demonstration
  const mockCertificate = {
    name: "ISO Certificate",
    photo_url: "/lovable-uploads/f0a5c15e-55bd-4add-8fd4-ec202e3bbbe1.png"
  };

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
          <AboutContent sentences={aboutSentences} />
          
          {/* Stats Section with Background */}
          <div className="relative py-20 bg-gradient-to-r from-primary to-secondary rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-pattern-circuits opacity-10"></div>
            <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-3xl font-bold text-white mb-12 text-center font-rubik">
                {language === 'tr' ? 'Rakamlarla Makpas' : 'Makpas in Numbers'}
              </h2>
              <StatsCounter />
            </div>
          </div>
          
          <MinimalCoreValues />
          <CertificatesSection isoCertificate={mockCertificate} />
          <TimelineSection />
          <ContactModule />
        </div>
      </div>
    </div>
  );
};

export default About;
