import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeatureHighlights from './components/FeatureHighlights';
import HowItWorksSimulation from './components/HowItWorksSimulation';
import AboutSection from './components/AboutSection';
import FeaturesSection from './components/FeaturesSection';
import HardwareArchitecture from './components/HardwareArchitecture';
import DownloadSection from './components/DownloadSection';
import Footer from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  // Intersection observer to track which section is currently active in the viewport
  useEffect(() => {
    const sectionIds = ['home', 'about', 'features', 'how-it-works', 'download'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen site-background relative text-resqtext-primary overflow-x-hidden w-full max-w-[100vw]">
      {/* Luminous clean white overlay to ensure perfect contrast and readability */}
      <div className="absolute inset-0 bg-white/80 pointer-events-none -z-10" />

      {/* STICKY TOP NAVBAR */}
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* MAIN CONTENT CONTAINER */}
      <main className="relative z-10 flex flex-col">
        {/* HERO SECTION MATCHING REFERENCE TEMPLATE */}
        <Hero onExploreClick={() => handleNavClick('how-it-works')} />

        {/* 4 FEATURE CARDS DIRECTLY BELOW HERO */}
        <FeatureHighlights />

        {/* SIGNATURE HOW IT WORKS 3D TECHNICAL SIMULATION */}
        <HowItWorksSimulation />

        {/* DETAILED FEATURES SPOTLIGHT */}
        <FeaturesSection />

        {/* HARDWARE ARCHITECTURE (ESP32 + LORA SX1278) */}
        <HardwareArchitecture />

        {/* ABOUT & MISSION */}
        <AboutSection />

        {/* OFFICIAL ANDROID APK DOWNLOAD PORTAL */}
        <DownloadSection />
      </main>

      {/* FOOTER */}
      <Footer onNavClick={handleNavClick} />
    </div>
  );
}

