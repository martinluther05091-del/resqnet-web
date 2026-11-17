import React from 'react';
import { Cpu, Radio, Shield, Zap, HardDrive, Wifi } from 'lucide-react';
import { HARDWARE_SPECS } from '../data/simulationData';

export default function HardwareArchitecture() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* SECTION HEADER */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-resqblue-subtle text-resqblue font-semibold text-xs tracking-wider uppercase mb-3 border border-resqblue/20">
          <Cpu className="w-3.5 h-3.5" />
          <span>Physical Hardware Layer</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight mb-4">
          Built on Real, Field-Tested Embedded Hardware
        </h2>
        <p className="text-base sm:text-lg text-resqtext-secondary leading-relaxed">
          ResQNet’s offline network relies on commercial off-the-shelf microcontrollers and sub-GHz transceivers designed for low power and extreme range.
        </p>
      </div>

      {/* HARDWARE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {HARDWARE_SPECS.map((hw, i) => (
          <div key={i} className="card-clean rounded-2xl p-6 border border-surface-border flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <span className="w-8 h-8 rounded-lg bg-navy/5 text-navy font-black text-xs flex items-center justify-center">
                  0{i + 1}
                </span>
                <span className="text-[10px] uppercase font-bold text-resqblue bg-resqblue-subtle px-2 py-0.5 rounded">
                  Component
                </span>
              </div>

              <h3 className="text-lg font-bold text-navy mb-1">{hw.name}</h3>
              <p className="text-xs text-resqtext-secondary font-medium mb-4">{hw.role}</p>

              {/* Specs */}
              <div className="space-y-2.5 text-xs">
                {Object.entries(hw).map(([k, val]) => {
                  if (k === 'name' || k === 'role') return null;
                  return (
                    <div key={k} className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <span className="block font-bold text-navy uppercase text-[10px] tracking-wide text-slate-500 mb-0.5">
                        {k}
                      </span>
                      <span className="text-navy font-medium leading-tight block">{val}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-100 text-[11px] text-resqtext-muted flex items-center justify-between">
              <span>Standard: IEEE 802.15.4 / ISM</span>
              <span className="text-emerald-600 font-semibold">Active</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

