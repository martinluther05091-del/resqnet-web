import React, { useState } from 'react';
import { Download, Info, Check, ShieldCheck, AlertCircle } from 'lucide-react';

export default function Hero({ onExploreClick }) {
  const [downloadStarted, setDownloadStarted] = useState(false);

  const handleDownload = () => {
    setDownloadStarted(true);
    setTimeout(() => setDownloadStarted(false), 5000);
  };

  return (
    <section id="home" className="relative pt-6 pb-16 lg:pt-12 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* LEFT COLUMN: HERO CONTENT */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">

            {/* Tag / Category Badge */}
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-resqblue-subtle/90 border border-resqblue/20 mb-6">
              <span className="text-xs sm:text-sm font-bold text-resqblue tracking-wide">
                Disaster Response Network
              </span>
            </div>

            {/* Main Brand & App Title */}
            <h1 className="text-4xl xs:text-5xl sm:text-6xl lg:text-7xl font-black italic text-navy tracking-tight leading-none mb-3">
              Res<span className="text-emergency">Q</span>Net
            </h1>

            <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold text-navy tracking-tight mb-4 sm:mb-6">
              Emergency Communication App
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base lg:text-lg text-resqtext-secondary leading-relaxed max-w-2xl mb-6 sm:mb-8">
              A resilient, offline-first communication system for disaster situations,
              ensuring SOS alerts and location sharing even without internet or mobile networks.
            </p>

            {/* Action Buttons Matching Reference Template */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-4 w-full sm:w-auto">
              {/* Primary Download Button */}
              <a
                href="/downloads/resqnet-v1.0.0.apk"
                download="resqnet-v1.0.0.apk"
                onClick={handleDownload}
                className="inline-flex items-center justify-center space-x-2.5 px-6 sm:px-7 py-3.5 rounded-xl bg-resqblue hover:bg-resqblue-hover text-white font-bold text-base shadow-lg shadow-resqblue/25 hover:shadow-xl hover:shadow-resqblue/30 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 text-center"
              >
                <Download className="w-5 h-5 stroke-[2.5]" />
                <span>Download App (APK)</span>
              </a>

              {/* Secondary Learn More Button */}
              <a
                href="#how-it-works"
                onClick={(e) => {
                  e.preventDefault();
                  if (onExploreClick) onExploreClick();
                  else {
                    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center justify-center space-x-2.5 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-navy font-bold text-base border border-slate-300 shadow-sm hover:border-navy/30 transition-all duration-200 text-center"
              >
                <Info className="w-5 h-5 text-navy stroke-[2.2]" />
                <span>Learn More</span>
              </a>
            </div>

            {/* Micro Metadata Line */}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold text-resqtext-secondary">
              <span>Android</span>
              <span className="text-slate-300">•</span>
              <span>v1.0.0</span>
              <span className="text-slate-300">•</span>
              <span>87.4 MB</span>
              {downloadStarted && (
                <span className="inline-flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 animate-fade-in">
                  <Check className="w-3.5 h-3.5 mr-1" />
                  APK Downloading...
                </span>
              )}
            </div>

            {/* Security Guarantee Pill */}
            <div className="mt-4 sm:mt-6 flex items-center space-x-2 text-xs text-resqtext-muted">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span className="truncate">Official Release • VirusTotal Clean • SHA-256 Verified</span>
            </div>

          </div>

          {/* RIGHT COLUMN: SMARTPHONE MOCKUP MATCHING TEMPLATE */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end items-center relative mt-6 lg:mt-0">

            {/* Subtle glow behind phone */}
            <div className="absolute w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-resqblue/15 filter blur-3xl -z-10 pointer-events-none"></div>

            {/* Phone Image Container */}
            <div className="relative group max-w-[280px] xs:max-w-[320px] sm:max-w-[360px] lg:max-w-[380px] transition-transform duration-500 ease-out hover:scale-[1.02]">

              <img
                src="/assets/landing-page-image-transparent.png"
                alt="ResQNet Emergency Application on Android Smartphone"
                className="w-full h-auto drop-shadow-2xl select-none"
              />

              {/* Floating Emergency Beacon Tag */}
              <div className="absolute top-8 sm:top-12 -left-2 sm:-left-8 bg-white/95 backdrop-blur-md px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl shadow-lg border border-slate-200 flex items-center space-x-2 animate-bounce select-none z-10">
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emergency animate-ping flex-shrink-0"></span>
                <div className="text-left">
                  <div className="text-[9px] sm:text-[10px] font-bold text-navy uppercase tracking-wider">Live SOS Mode</div>
                  <div className="text-[10px] sm:text-[11px] font-semibold text-emergency">Offline LoRa Mesh Active</div>
                </div>
              </div>

              {/* Floating GPS Location Tag */}
              <div className="absolute bottom-10 sm:bottom-16 -right-2 sm:-right-6 bg-white/95 backdrop-blur-md px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl shadow-lg border border-slate-200 flex items-center space-x-2 select-none z-10">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-resqblue-subtle flex items-center justify-center text-resqblue flex-shrink-0">
                  <span className="font-bold text-[10px] sm:text-xs">GPS</span>
                </div>
                <div className="text-left">
                  <div className="text-[9px] sm:text-[10px] font-bold text-navy">High-Accuracy Fix</div>
                  <div className="text-[10px] sm:text-[11px] font-mono text-resqtext-secondary">34.0522°N, -118.2436°W</div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

