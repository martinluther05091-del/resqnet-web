import React, { useState } from 'react';
import { 
  BellRing, MapPin, Radio, Wifi, LayoutDashboard, 
  Check, ArrowRight, ShieldCheck, Cpu, HardDrive
} from 'lucide-react';

export default function FeaturesSection() {
  const [activeTab, setActiveTab] = useState(0);

  const features = [
    {
      id: 'sos',
      icon: BellRing,
      tag: 'Core Capability',
      title: 'SOS Emergency Alerts',
      headline: 'One-Tap Distress Beaconing with Guaranteed Priority',
      description: 'The moment a user triggers the primary SOS button, ResQNet bundles the victim ID, timestamp, and real-time sensor metrics into an immutable distress packet. If the phone is offline, it repeatedly attempts local Bluetooth beaconing until an ESP32 node confirms receipt.',
      bullets: [
        'Single-tap emergency activation designed for panic scenarios',
        'Automatic retry algorithm with exponential backoff',
        'Haptic vibration and visual confirmation of transmitted beacon',
        'Payload size optimized for low-bandwidth LoRa packets (<120 bytes)'
      ],
      badgeColor: 'bg-emergency-light text-emergency border-emergency/20',
      activeBorder: 'border-emergency',
    },
    {
      id: 'gps',
      icon: MapPin,
      tag: 'Precision Geolocation',
      title: 'GPS Location Sharing',
      headline: 'Sub-Meter Coordinate Bundling Without Data Connection',
      description: 'ResQNet interfaces directly with the Android device GPS/GNSS receiver chip, which operates purely via satellite signals and requires zero cellular data or Wi-Fi. Real-time latitude, longitude, and elevation are encoded into every outbound packet.',
      bullets: [
        'Pure satellite GNSS capture (GPS, GLONASS, Galileo)',
        'Accuracy radius calculated and transmitted in metadata',
        'Cached offline tile support for survivor route preview',
        'Auto-updates coordinates if the survivor moves or evacuates'
      ],
      badgeColor: 'bg-resqblue-subtle text-resqblue border-resqblue/20',
      activeBorder: 'border-resqblue',
    },
    {
      id: 'mesh',
      icon: Radio,
      tag: 'Hardware Mesh',
      title: 'Offline LoRa Multi-Hop Mesh',
      headline: 'Autonomous Radio Relaying Through Disconnected Terrain',
      description: 'Using Semtech SX1278 transceivers at 433 MHz, ResQNet nodes form an ad-hoc multi-hop mesh network. A packet transmitted by Node 1 hops across Node 2 and beyond until it safely lands at the base camp gateway.',
      bullets: [
        'Chirp Spread Spectrum (CSS) modulation resists noise and jamming',
        'Hop-count tracking prevents network broadcast storms',
        'Tested across dense foliage, concrete walls, and open valleys',
        'Compatible with portable, solar-powered field relay enclosures'
      ],
      badgeColor: 'bg-blue-50 text-resqblue border-blue-200',
      activeBorder: 'border-resqblue',
    },
    {
      id: 'online',
      icon: Wifi,
      tag: 'Cloud Synchronization',
      title: 'Online Cloud Failover',
      headline: 'Instant Firebase Realtime Ingestion When Service Returns',
      description: 'Whenever cellular towers or Wi-Fi networks are operational, ResQNet operates as a cloud-native platform. Alerts are pushed instantly to Google Cloud and Firebase Realtime Database with end-to-end TLS 1.3 encryption.',
      bullets: [
        'Bi-directional WebSocket streaming for sub-second sync',
        'Automated webhook triggers for government & NGO emergency desks',
        'Graceful automatic transition between online and offline modes',
        'Encrypted database storage with timestamp auditing'
      ],
      badgeColor: 'bg-indigo-50 text-indigo-600 border-indigo-200',
      activeBorder: 'border-indigo-500',
    },
    {
      id: 'dashboard',
      icon: LayoutDashboard,
      tag: 'Command & Control',
      title: 'Rescue Command Dashboard',
      headline: 'Centralized Field Incident Console for Search & Rescue',
      description: 'Whether connected to the central cloud or to Node 3’s local field Wi-Fi network, search and rescue teams view an intuitive interface showing victim coordinates, timestamps, battery levels, and responder dispatch statuses.',
      bullets: [
        'Interactive OpenStreetMap coordinate plotting',
        'Triage sorting: Critical, Medically Injured, Evacuation Needed',
        'Export incident reports to GPX / GeoJSON format',
        'Runs in any standard mobile or desktop web browser without installation'
      ],
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      activeBorder: 'border-emerald-500',
    },
  ];

  const current = features[activeTab];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* SECTION HEADER */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-resqblue-subtle text-resqblue font-semibold text-xs tracking-wider uppercase mb-3 border border-resqblue/20">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Full Capability Breakdown</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight mb-4">
          Engineered for Extreme Disaster Resilience
        </h2>
        <p className="text-base sm:text-lg text-resqtext-secondary leading-relaxed">
          Every feature in ResQNet is designed to preserve life by guaranteeing communication when traditional infrastructure is completely wiped out.
        </p>
      </div>

      {/* FEATURE TAB SELECTORS */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
        {features.map((feat, index) => {
          const IconComp = feat.icon;
          const isSelected = activeTab === index;
          return (
            <button
              key={feat.id}
              onClick={() => setActiveTab(index)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                isSelected
                  ? 'bg-navy text-white shadow-md shadow-navy/20 scale-105'
                  : 'card-clean text-resqtext-secondary hover:text-navy hover:bg-slate-50'
              }`}
            >
              <IconComp className={`w-4 h-4 ${isSelected ? 'text-resqblue-light' : 'text-resqtext-muted'}`} />
              <span>{feat.title}</span>
            </button>
          );
        })}
      </div>

      {/* ACTIVE FEATURE SPOTLIGHT CARD */}
      <div className="card-clean rounded-3xl p-8 sm:p-12 border border-surface-border shadow-clean-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* TEXT DETAILS */}
        <div className="lg:col-span-7 flex flex-col items-start">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border mb-4 ${current.badgeColor}`}>
            <span>{current.tag}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight mb-2">
            {current.headline}
          </h3>

          <p className="text-base text-resqtext-secondary leading-relaxed mb-6">
            {current.description}
          </p>

          <div className="w-full space-y-3 mb-8">
            {current.bullets.map((b, i) => (
              <div key={i} className="flex items-start space-x-3 text-sm text-navy">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span>{b}</span>
              </div>
            ))}
          </div>

          <a
            href="#how-it-works"
            className="inline-flex items-center space-x-2 text-sm font-bold text-resqblue hover:text-navy transition"
          >
            <span>See live simulation of this feature</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* VISUAL PREVIEW / APP SCREEN CARD */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-sm rounded-2xl p-6 bg-gradient-to-b from-slate-900 to-[#06182e] text-white shadow-2xl border border-white/10">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-[11px] font-mono text-slate-400">ResQNet OS • v1.0.0</span>
            </div>

            {/* Embedded Live Status Preview */}
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Subsystem Status</div>
                <div className="text-sm font-bold text-emerald-400 mt-0.5 flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>{current.title} Ready</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-400">Active Mode:</span>
                  <span className="text-resqblue-light">Auto-Failover</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Hardware Link:</span>
                  <span className="text-white">ESP32 + SX1278</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Frequency:</span>
                  <span className="text-white">433.175 MHz ISM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">GNSS Accuracy:</span>
                  <span className="text-emerald-400 font-bold">±3.8 meters</span>
                </div>
              </div>

              <div className="pt-2 text-center">
                <span className="text-[11px] text-slate-400">
                  Direct hardware telemetry integrated with ResQNet client
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

