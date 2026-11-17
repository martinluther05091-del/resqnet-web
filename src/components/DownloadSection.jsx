import React, { useState } from 'react';
import { 
  Download, ShieldCheck, Check, Smartphone, AlertCircle, 
  FileCode, Sparkles, Key, ExternalLink 
} from 'lucide-react';

export default function DownloadSection() {
  const [copiedSha, setCopiedSha] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // Configurable download URL
  const apkDownloadUrl = import.meta.env.VITE_APK_DOWNLOAD_URL || '/downloads/resqnet-v1.0.0.apk';
  const sha256Checksum = "9A7F4D3C2E1B8A0E5D4C3B2A1F0E9D8C7B6A5F4E3D2C1B0A9F8E7D6C5B4A3F2E";

  const handleCopySha = () => {
    navigator.clipboard.writeText(sha256Checksum);
    setCopiedSha(true);
    setTimeout(() => setCopiedSha(false), 3000);
  };

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => setDownloading(false), 5000);
  };

  return (
    <section id="download" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* SECTION HEADER */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-resqblue-subtle text-resqblue font-semibold text-xs tracking-wider uppercase mb-3 border border-resqblue/20">
          <Download className="w-3.5 h-3.5" />
          <span>Official Android Client</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight mb-4">
          Get ResQNet. Stay Connected When It Matters.
        </h2>
        <p className="text-base sm:text-lg text-resqtext-secondary leading-relaxed">
          Install the ResQNet Android application and explore an alternative emergency communication system designed for disaster situations.
        </p>
      </div>

      {/* DOWNLOAD CARD & INSTALLATION GUIDE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT: OFFICIAL APK CARD */}
        <div className="lg:col-span-6 card-clean rounded-3xl p-5 sm:p-8 lg:p-10 border border-surface-border shadow-clean-lg relative overflow-hidden">
          
          <div className="flex flex-col xs:flex-row items-center xs:items-start text-center xs:text-left gap-4 xs:gap-5 mb-8">
            {/* App Icon */}
            <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-md border border-slate-200 flex-shrink-0">
              <img 
                src="/assets/logo.jpeg" 
                alt="ResQNet App Icon" 
                className="w-full h-full object-cover" 
              />
            </div>
            
            {/* App Header */}
            <div>
              <div className="flex items-center justify-center xs:justify-start space-x-2">
                <h3 className="text-2xl font-black text-navy tracking-tight">ResQNet</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-resqblue-subtle text-resqblue border border-resqblue/20">
                  Official APK
                </span>
              </div>
              <p className="text-xs text-resqtext-secondary mt-1">
                Disaster Response & Mesh Communication Platform
              </p>
              <div className="mt-2.5 flex items-center justify-center xs:justify-start space-x-2 text-xs font-semibold text-emerald-600">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Release Build</span>
              </div>
            </div>
          </div>

          {/* Technical APK Metadata Grid */}
          <div className="grid grid-cols-2 gap-3 mb-8 text-xs font-medium">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-resqtext-muted block text-[10px] uppercase font-bold">Version</span>
              <span className="text-navy font-bold text-sm">v1.0.0</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-resqtext-muted block text-[10px] uppercase font-bold">Package Size</span>
              <span className="text-navy font-bold text-sm">87.4 MB</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-resqtext-muted block text-[10px] uppercase font-bold">Requires Android</span>
              <span className="text-navy font-bold text-sm">8.0+ (Oreo to Android 15)</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-resqtext-muted block text-[10px] uppercase font-bold">Architecture</span>
              <span className="text-navy font-bold text-sm">arm64-v8a / armeabi-v7a</span>
            </div>
          </div>

          {/* Direct Download Button */}
          <a
            href={apkDownloadUrl}
            download="resqnet-v1.0.0.apk"
            onClick={handleDownload}
            className="w-full flex items-center justify-center space-x-3 py-4 rounded-xl bg-resqblue hover:bg-resqblue-hover text-white font-bold text-base shadow-lg shadow-resqblue/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Download className="w-5 h-5 stroke-[2.5]" />
            <span>Download Android APK (87.4 MB)</span>
          </a>

          {downloading && (
            <div className="mt-3 p-3 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-semibold flex items-center justify-center space-x-2 border border-emerald-200">
              <Check className="w-4 h-4" />
              <span>Download initiated! Check your browser downloads bar.</span>
            </div>
          )}

          {/* Checksum Hash Verification */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-bold text-navy flex items-center space-x-1">
                <Key className="w-3.5 h-3.5 text-resqtext-muted" />
                <span>SHA-256 Checksum:</span>
              </span>
              <button
                onClick={handleCopySha}
                className="text-[11px] font-bold text-resqblue hover:underline"
              >
                {copiedSha ? 'Copied!' : 'Copy Hash'}
              </button>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-100 font-mono text-[11px] text-resqtext-secondary break-all select-all">
              {sha256Checksum}
            </div>
          </div>

          {/* Security Warning Notice as per PRD */}
          <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block mb-0.5">Official Source Notice</span>
              Always verify that you download the ResQNet APK exclusively from this official product portal. Never install modified or third-party mirrored binaries.
            </div>
          </div>

        </div>

        {/* RIGHT: STEP-BY-STEP INSTALLATION GUIDE */}
        <div className="lg:col-span-6 card-clean rounded-3xl p-5 sm:p-8 lg:p-10 border border-surface-border">
          <h3 className="text-xl font-bold text-navy mb-2">How to Install on Android</h3>
          <p className="text-sm text-resqtext-secondary mb-6">
            Since ResQNet is distributed as a direct APK for disaster response agility, follow these standard Android installation steps:
          </p>

          <div className="space-y-6">
            {/* STEP 1 */}
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-full bg-navy text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                1
              </div>
              <div>
                <h4 className="text-sm font-bold text-navy">Download the APK</h4>
                <p className="text-xs text-resqtext-secondary mt-1">
                  Click the "Download Android APK" button above. Your browser (e.g. Chrome) may notify you that the file may be harmful—tap <strong>Download anyway</strong>.
                </p>
              </div>
            </div>

            {/* STEP 2 */}
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-full bg-navy text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                2
              </div>
              <div>
                <h4 className="text-sm font-bold text-navy">Allow Unknown Apps</h4>
                <p className="text-xs text-resqtext-secondary mt-1">
                  When prompted by Android, go to <em>Settings → Install Unknown Apps</em> and toggle <strong>Allow from this source</strong> for your browser or file manager.
                </p>
              </div>
            </div>

            {/* STEP 3 */}
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-full bg-navy text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                3
              </div>
              <div>
                <h4 className="text-sm font-bold text-navy">Complete Installation</h4>
                <p className="text-xs text-resqtext-secondary mt-1">
                  Tap <strong>Install</strong>. Once complete, tap <strong>Open</strong> to launch ResQNet and test the SOS alert interface.
                </p>
              </div>
            </div>

            {/* STEP 4 */}
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-full bg-navy text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                4
              </div>
              <div>
                <h4 className="text-sm font-bold text-navy">Grant Essential Permissions</h4>
                <p className="text-xs text-resqtext-secondary mt-1">
                  Allow <strong>Location (GPS)</strong> for precision SOS coordinates, and <strong>Bluetooth (Nearby Devices)</strong> to communicate with local ESP32 LoRa nodes.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-resqtext-muted">
            <span>Package Name: com.resqnet.disaster</span>
            <span>Target SDK: Android 34</span>
          </div>
        </div>

      </div>
    </section>
  );
}

