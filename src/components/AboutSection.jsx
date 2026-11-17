import React from 'react';
import { Shield, AlertTriangle, Radio, Network, LifeBuoy, CheckCircle2 } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* SECTION HEADER */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-resqblue-subtle text-resqblue font-semibold text-xs tracking-wider uppercase mb-3 border border-resqblue/20">
          <Shield className="w-3.5 h-3.5" />
          <span>Mission & Architecture</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight mb-4 leading-tight">
          Communication Should Never Be a Barrier During a Disaster.
        </h2>
        <p className="text-base sm:text-lg text-resqtext-secondary leading-relaxed">
          During natural disasters and other emergencies, conventional communication infrastructure 
          may become unavailable or unreliable. ResQNet establishes an alternative, resilient bridge.
        </p>
      </div>

      {/* CORE 3-PILLAR GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        
        {/* PILLAR 1: THE PROBLEM */}
        <div className="card-clean rounded-2xl p-8 border border-surface-border flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-emergency-light text-emergency flex items-center justify-center mb-6">
              <AlertTriangle className="w-6 h-6 stroke-[2.2]" />
            </div>
            <h3 className="text-xl font-bold text-navy mb-3">Why Conventional Networks Fail</h3>
            <p className="text-sm text-resqtext-secondary leading-relaxed mb-4">
              Hurricanes, earthquakes, and flash floods knock out terrestrial cell towers and underground fiber optic lines. Severe grid power blackouts shut down cellular base transceiver stations (BTS), leaving victims cut off from emergency responders.
            </p>
          </div>
          <div className="pt-4 border-t border-slate-100 text-xs font-semibold text-emergency flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emergency"></span>
            <span>Zero signal, zero SMS, zero 911 calls</span>
          </div>
        </div>

        {/* PILLAR 2: OUR APPROACH */}
        <div className="card-clean rounded-2xl p-8 border border-surface-border flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-resqblue-subtle text-resqblue flex items-center justify-center mb-6">
              <Radio className="w-6 h-6 stroke-[2.2]" />
            </div>
            <h3 className="text-xl font-bold text-navy mb-3">The ResQNet Approach</h3>
            <p className="text-sm text-resqtext-secondary leading-relaxed mb-4">
              ResQNet bridges this critical gap through a dual-channel paradigm. When cellular networks or Wi-Fi are active, it synchronizes via Firebase. When internet connectivity collapses, it seamlessly falls back to local Bluetooth and long-range LoRa 433 MHz radio mesh.
            </p>
          </div>
          <div className="pt-4 border-t border-slate-100 text-xs font-semibold text-resqblue flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-resqblue"></span>
            <span>Sub-GHz radio waves penetrate debris & terrain</span>
          </div>
        </div>

        {/* PILLAR 3: THE RESCUE TEAM ROLE */}
        <div className="card-clean rounded-2xl p-8 border border-surface-border flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
              <LifeBuoy className="w-6 h-6 stroke-[2.2]" />
            </div>
            <h3 className="text-xl font-bold text-navy mb-3">Empowering Responders</h3>
            <p className="text-sm text-resqtext-secondary leading-relaxed mb-4">
              First responders deploy lightweight battery-powered LoRa relay and gateway nodes. The gateway hosts an isolated local Wi-Fi captive network. Without any internet connection, rescue teams view live victim coordinates on their local browser dashboard.
            </p>
          </div>
          <div className="pt-4 border-t border-slate-100 text-xs font-semibold text-emerald-700 flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            <span>Target pinpointed on field map</span>
          </div>
        </div>

      </div>

      {/* DUAL ARCHITECTURE COMPARISON TABLE */}
      <div className="card-clean rounded-2xl p-6 sm:p-8 border border-surface-border">
        <h3 className="text-xl font-bold text-navy mb-2">Architectural Comparison</h3>
        <p className="text-sm text-resqtext-secondary mb-6">
          How ResQNet adapts between standard connectivity and catastrophic blackout conditions.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-surface-border text-xs uppercase tracking-wider text-resqtext-muted">
                <th className="py-3 px-4">Architecture Layer</th>
                <th className="py-3 px-4">Online Mode (Normal Operations)</th>
                <th className="py-3 px-4">Offline Mode (Infrastructure Outage)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-resqtext-primary">
              <tr>
                <td className="py-3.5 px-4 font-bold text-navy">Victim Interface</td>
                <td className="py-3.5 px-4">ResQNet Flutter Application</td>
                <td className="py-3.5 px-4">ResQNet Flutter Application</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-navy">First-Hop Link</td>
                <td className="py-3.5 px-4">Cellular Data (4G/5G) / Commercial Wi-Fi</td>
                <td className="py-3.5 px-4 text-resqblue font-semibold">Bluetooth Classic (SPP) to Node 1</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-navy">Propagation Transport</td>
                <td className="py-3.5 px-4">Standard Internet Routing Backbone</td>
                <td className="py-3.5 px-4 text-resqblue font-semibold">LoRa 433 MHz CSS Multi-hop Mesh</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-navy">Backend / Ingress</td>
                <td className="py-3.5 px-4">Firebase Realtime DB / Cloud Functions</td>
                <td className="py-3.5 px-4 text-resqblue font-semibold">ESP32 Node 3 Embedded Gateway (RAM/Flash)</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-navy">Rescue Access Point</td>
                <td className="py-3.5 px-4">Central Headquarters Web Portal (HTTPS)</td>
                <td className="py-3.5 px-4 text-emerald-600 font-semibold">Field Gateway Local Wi-Fi (192.168.4.1)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

