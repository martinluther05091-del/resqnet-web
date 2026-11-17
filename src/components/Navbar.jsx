import React, { useState, useEffect } from 'react';
import { Menu, X, Download, Shield, Radio } from 'lucide-react';

export default function Navbar({ activeSection, setActiveSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'features', label: 'Features' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'download', label: 'Download' },
  ];

  const handleNavClick = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-surface-border/70 py-3' 
        : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* BRAND LOGO */}
          <a 
            href="#home" 
            onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
            className="flex items-center space-x-3 group"
          >
            {/* Logo Image */}
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm border border-navy/10 flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
              <img 
                src="/assets/logo.jpeg" 
                alt="ResQNet Logo" 
                className="w-full h-full object-cover" 
              />
            </div>
            
            {/* Brand Text */}
            <div className="flex flex-col">
              <div className="flex items-center tracking-tight text-2xl font-black italic text-navy leading-none">
                <span>Res</span>
                <span className="text-emergency">Q</span>
                <span>Net</span>
              </div>
              <span className="text-[9px] uppercase tracking-wider font-bold text-resqtext-secondary mt-0.5">
                Disaster Response Network
              </span>
            </div>
          </a>

          {/* DESKTOP NAVIGATION PILLS */}
          <nav className="hidden md:flex items-center space-x-1 sm:space-x-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-5 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-resqblue text-white shadow-sm'
                      : 'text-resqtext-primary hover:text-navy hover:bg-slate-100/70'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* MOBILE MENU TOGGLE */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-navy hover:bg-slate-100 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU ACCORDION */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 pb-4 px-2 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-surface-border space-y-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                    isActive
                      ? 'bg-resqblue text-white'
                      : 'text-resqtext-primary hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <div className="pt-2">
              <a
                href="/downloads/resqnet-v1.0.0.apk"
                download="resqnet-v1.0.0.apk"
                className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-navy text-white text-sm font-bold shadow"
              >
                <Download className="w-4 h-4" />
                <span>Download APK (87.4 MB)</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

