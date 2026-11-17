import React from 'react';
import { Shield, ArrowUp, Radio, Code2 } from 'lucide-react';

export default function Footer({ onNavClick }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-navy-dark text-white pt-16 pb-12 border-t border-navy-light/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* BRAND COLUMN */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/20">
                <img 
                  src="/assets/logo.jpeg" 
                  alt="ResQNet" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="flex flex-col">
                <div className="text-2xl font-black italic tracking-tight leading-none">
                  <span>Res</span>
                  <span className="text-emergency">Q</span>
                  <span>Net</span>
                </div>
                <span className="text-[10px] font-bold text-resqblue-light uppercase tracking-wider mt-0.5">
                  Disaster Response Network
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed max-w-sm mb-6">
              A resilient emergency communication platform designed to transmit SOS alerts and precision GPS locations during blackouts and disasters through hybrid cloud and LoRa radio mesh technology.
            </p>

            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <Radio className="w-4 h-4 text-resqblue-light" />
              <span>Operating on 433 MHz ISM Band & Bluetooth Classic</span>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="md:col-span-4 grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                Navigation
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <button onClick={() => onNavClick('home')} className="text-slate-300 hover:text-white transition">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavClick('about')} className="text-slate-300 hover:text-white transition">
                    About ResQNet
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavClick('features')} className="text-slate-300 hover:text-white transition">
                    Features
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavClick('how-it-works')} className="text-slate-300 hover:text-white transition">
                    How It Works
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                Resources
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <button onClick={() => onNavClick('download')} className="text-slate-300 hover:text-white transition">
                    Download APK
                  </button>
                </li>
                <li>
                  <a href="#how-it-works" className="text-slate-300 hover:text-white transition">
                    3D LoRa Simulator
                  </a>
                </li>
                <li>
                  <a href="/downloads/resqnet-v1.0.0.apk" download className="text-slate-300 hover:text-white transition">
                    Latest Build (v1.0.0)
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* PROJECT STATUS & REPO */}
          <div className="md:col-span-3 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                Engineering Status
              </h4>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Firmware:</span>
                  <span className="text-emerald-400 font-mono">ESP-IDF / Arduino</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Client:</span>
                  <span className="text-white font-mono">Flutter / Android</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Telemetry:</span>
                  <span className="text-white font-mono">LoRa CSS 433MHz</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-300 hover:text-white transition"
              >
                <ArrowUp className="w-4 h-4" />
                <span>Back to top</span>
              </button>
            </div>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} ResQNet Project. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Disaster Emergency Communication Network Architecture.
          </p>
        </div>
      </div>
    </footer>
  );
}
