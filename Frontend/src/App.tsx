import { useState, useEffect } from "react";
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import HealthcareJourney from "@/components/HealthcareJourney";
import Platforms from "@/components/Platforms";
import Multilingual from "@/components/Multilingual";
import AboutUs from "@/components/AboutUs";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 2400);
    return () => clearTimeout(t);
  }, []);

  return (
    <LanguageProvider>
      {!loaded && <LoadingScreen />}
      <div className="min-h-screen bg-[#070907] text-[#f2f4f1] font-sans">
        <Navbar />
        <main>
          <Hero />
          <Features />
          <HowItWorks />
          <HealthcareJourney />
          <Platforms />
          <Multilingual />
          <AboutUs />
          <CTASection />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
