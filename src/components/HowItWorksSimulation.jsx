import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, RotateCcw, FastForward, Rewind, 
  Wifi, Radio, Server, Laptop, Smartphone, AlertTriangle, 
  CheckCircle2, ShieldAlert, Cpu, Activity, Info,
  LifeBuoy, Sparkles, Navigation, HeartHandshake, Check,
  Volume2, VolumeX, Maximize2
} from 'lucide-react';
import Simulation3D from './Simulation3D';
import ErrorBoundary from './ErrorBoundary';
import { OFFLINE_STEPS } from '../data/simulationData';

const DURATION = 24.0; // 24 seconds total continuous cinematic video length

export default function HowItWorksSimulation() {
  const [currentTime, setCurrentTime] = useState(0.0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [showTelemetry, setShowTelemetry] = useState(true);

  const requestRef = useRef(null);
  const previousTimeRef = useRef(null);

  // Chapters on the video timeline
  const chapters = [
    { time: 0.0, label: 'Disaster Outage', icon: '⚠️', phase: 'disaster' },
    { time: 4.0, label: 'SOS Triggered', icon: '🚨', phase: 'sos' },
    { time: 8.0, label: 'LoRa 433MHz Mesh', icon: '📡', phase: 'mesh' },
    { time: 13.0, label: 'Command Alert', icon: '💻', phase: 'gateway' },
    { time: 16.0, label: 'Squad Dispatched', icon: '🚁', phase: 'dispatch' },
    { time: 20.0, label: 'Survivor Saved!', icon: '🎉', phase: 'saved' },
  ];

  // Determine current active chapter based on continuous time
  const currentChapter = chapters.slice().reverse().find(c => currentTime >= c.time) || chapters[0];

  // CONTINUOUS 60FPS PLAYBACK ANIMATION LOOP
  useEffect(() => {
    if (!isPlaying) {
      previousTimeRef.current = null;
      return;
    }

    const updatePlayhead = (now) => {
      if (previousTimeRef.current !== null) {
        const delta = (now - previousTimeRef.current) / 1000;
        setCurrentTime((prev) => {
          const next = prev + delta * playbackSpeed;
          if (next >= DURATION) {
            return 0.0; // loop smoothly or finish
          }
          return next;
        });
      }
      previousTimeRef.current = now;
      requestRef.current = requestAnimationFrame(updatePlayhead);
    };

    requestRef.current = requestAnimationFrame(updatePlayhead);
    return () => cancelAnimationFrame(requestRef.current);
  }, [isPlaying, playbackSpeed]);

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
  };

  const handleChapterClick = (time) => {
    setCurrentTime(time);
    setIsPlaying(true);
  };

  const handleRewind = () => {
    setCurrentTime((prev) => Math.max(0, prev - 5));
  };

  const handleForward = () => {
    setCurrentTime((prev) => Math.min(DURATION, prev + 5));
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* SECTION HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-resqblue-subtle text-resqblue font-semibold text-xs tracking-wider uppercase mb-3 border border-resqblue/20">
          <Activity className="w-3.5 h-3.5" />
          <span>Continuous 3D Narrative Video Demonstration</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight mb-4">
          See How ResQNet Connects When Networks Fail.
        </h2>
        <p className="text-base sm:text-lg text-resqtext-secondary leading-relaxed">
          Watch the continuous life-saving story: from the catastrophe blackout and distress beacon, through autonomous LoRa mesh propagation, to rescue team dispatch and safe extraction.
        </p>
      </div>

      {/* 3D VIDEO SIMULATION STAGE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT / CENTER: CONTINUOUS 3D CINEMATIC STAGE & VIDEO PLAYER */}
        <div className="lg:col-span-8 flex flex-col space-y-4">
          
          {/* 3D Render Window */}
          <ErrorBoundary>
            <Simulation3D 
              currentTime={currentTime}
              duration={DURATION}
              isPlaying={isPlaying}
              mode="offline"
            />
          </ErrorBoundary>

          {/* PROFESSIONAL VIDEO CONTROLLER DECK */}
          <div className="card-clean rounded-2xl p-5 border border-surface-border shadow-clean space-y-4">
            
            {/* CONTINUOUS VIDEO SCRUBBER SEEKBAR */}
            <div className="space-y-1.5">
              <div className="relative flex items-center">
                <input
                  type="range"
                  min="0"
                  max={DURATION}
                  step="0.05"
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-resqblue focus:outline-none"
                />
              </div>

              {/* TIMELINE CHAPTER MARKERS */}
              <div className="flex justify-between items-center text-[10px] sm:text-xs pt-1 px-1">
                {chapters.map((ch, idx) => {
                  const isCurrent = currentChapter.time === ch.time;
                  const isPast = currentTime >= ch.time;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleChapterClick(ch.time)}
                      className={`flex items-center space-x-1 font-bold transition ${
                        isCurrent
                          ? 'text-resqblue scale-105'
                          : isPast
                          ? 'text-emerald-700'
                          : 'text-resqtext-muted hover:text-navy'
                      }`}
                    >
                      <span>{ch.icon}</span>
                      <span className="hidden sm:inline">{ch.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* VIDEO PLAYER BUTTON BAR */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100">
              
              {/* Play / Rewind / FastForward */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-resqblue hover:bg-resqblue-hover text-white font-bold text-xs shadow-md shadow-resqblue/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                  <span>{isPlaying ? 'Pause' : 'Play Video'}</span>
                </button>

                <button
                  onClick={handleRewind}
                  className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-navy transition"
                  title="Rewind 5 seconds"
                >
                  <Rewind className="w-4 h-4" />
                </button>

                <button
                  onClick={handleForward}
                  className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-navy transition"
                  title="Forward 5 seconds"
                >
                  <FastForward className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setCurrentTime(0.0);
                    setIsPlaying(true);
                  }}
                  className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-navy transition"
                  title="Replay from start"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* TIMECODE COUNTER */}
              <div className="flex items-center space-x-2 text-xs font-mono font-bold text-navy bg-slate-100 px-3.5 py-2 rounded-xl">
                <span className="text-resqblue">{formatTime(currentTime)}</span>
                <span className="text-slate-400">/</span>
                <span>{formatTime(DURATION)}</span>
              </div>

              {/* SPEED CHIP & TELEMETRY TOGGLE */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl text-xs">
                  {[0.75, 1.0, 1.5, 2.0].map((spd) => (
                    <button
                      key={spd}
                      onClick={() => setPlaybackSpeed(spd)}
                      className={`px-2 py-1 rounded-lg text-[11px] font-bold transition ${
                        playbackSpeed === spd ? 'bg-white shadow text-resqblue' : 'text-resqtext-secondary'
                      }`}
                    >
                      {spd}x
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setShowTelemetry(!showTelemetry)}
                  className={`text-xs px-3 py-1.5 rounded-xl border transition ${
                    showTelemetry 
                      ? 'border-resqblue/30 bg-resqblue-subtle text-resqblue font-bold' 
                      : 'border-slate-200 text-resqtext-secondary'
                  }`}
                >
                  Telemetry
                </button>
              </div>

            </div>
          </div>

          {/* DYNAMIC STORY NARRATIVE BANNER (Continuous transitions) */}
          <div className={`card-clean rounded-2xl p-6 border-l-4 shadow-sm transition-all duration-300 ${
            currentTime >= 20.0
              ? 'border-l-emerald-500 bg-emerald-50/40'
              : currentTime >= 16.0
              ? 'border-l-amber-500 bg-amber-50/40'
              : currentTime < 4.0
              ? 'border-l-emergency bg-red-50/30'
              : 'border-l-resqblue'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div className="flex items-center space-x-2.5">
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider text-white ${
                  currentTime >= 20.0
                    ? 'bg-emerald-600'
                    : currentTime >= 16.0
                    ? 'bg-amber-600'
                    : currentTime < 4.0
                    ? 'bg-emergency'
                    : 'bg-navy'
                }`}>
                  {currentChapter.label}
                </span>
                <h3 className="text-xl font-extrabold text-navy tracking-tight">
                  {currentTime < 4.0
                    ? '1. Disaster Strikes: Catastrophic Blackout'
                    : currentTime < 8.0
                    ? '2. Survivor Sends SOS via Offline Bluetooth'
                    : currentTime < 13.0
                    ? '3. Sub-GHz LoRa Mesh Relays Across Debris'
                    : currentTime < 16.0
                    ? '4. Base Command Dashboard Rings Alarm'
                    : currentTime < 20.0
                    ? '5. Search & Rescue Squad En Route to Target'
                    : '6. Survivor Rescued & Safe! Everyone Celebrates 🎉'}
                </h3>
              </div>
            </div>

            <p className="text-sm text-resqtext-secondary leading-relaxed">
              {currentTime < 4.0
                ? 'Severe earthquake / flood collapses towers and power grids. Conventional mobile networks are dead. A stranded survivor with an Android phone has zero cellular bars, but satellite GNSS remains locked.'
                : currentTime < 8.0
                ? 'Survivor taps the red SOS button. The phone signs an emergency packet with exact coordinates and hands it off to portable Node 1 via Bluetooth Serial in milliseconds.'
                : currentTime < 13.0
                ? 'Node 1’s SX1278 transceiver blasts the distress packet at 433 MHz. LoRa Chirp Spread Spectrum modulation penetrates concrete and hills, hopping across Node 2 relay to base camp.'
                : currentTime < 16.0
                ? 'Node 3 Gateway validates the packet and serves it over local Wi-Fi. The command laptop immediately flashes an acoustic alarm with the victim’s exact coordinates and battery level.'
                : currentTime < 20.0
                ? 'Incident commander dispatches Rescue Squad Alpha (all-terrain rover & medics). The squad tracks live GPS vectors directly to the victim’s location.'
                : 'Responders reach the survivor at the exact coordinates! First aid is administered and the survivor is safely evacuated. Mission accomplished—everyone is safe!'}
            </p>

            {currentTime >= 20.0 && (
              <div className="mt-4 p-3.5 rounded-xl bg-emerald-100/90 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center space-x-2 animate-bounce">
                <HeartHandshake className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                <span>Life-Saving Mission Complete: Target safely extracted. ResQNet ensured zero communication barrier during blackout!</span>
              </div>
            )}
          </div>

        </div>

        {/* RIGHT SIDE: NETWORK STATE & RESCUE TELEMETRY */}
        <div className="lg:col-span-4 flex flex-col space-y-4">
          
          {/* SUBSYSTEM LIVE STATE HUD */}
          <div className="card-clean rounded-2xl p-6 border border-surface-border shadow-sm">
            <h4 className="text-xs font-bold text-resqtext-muted uppercase tracking-wider mb-4 flex items-center justify-between">
              <span>System Live States</span>
              <span className={`w-2.5 h-2.5 rounded-full ${
                currentTime >= 20 ? 'bg-emerald-500 animate-ping' : 'bg-resqblue animate-pulse'
              }`}></span>
            </h4>

            <div className="space-y-2 mb-4">
              <div className={`p-3 rounded-xl text-xs flex items-center justify-between transition ${
                currentTime < 8 || currentTime >= 20 ? 'bg-resqblue-subtle/80 border border-resqblue/30 font-bold text-navy' : 'bg-slate-50 text-resqtext-secondary'
              }`}>
                <div className="flex items-center space-x-2">
                  <Smartphone className="w-4 h-4 text-resqblue" />
                  <span>Survivor Phone</span>
                </div>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                  currentTime >= 20 ? 'bg-emerald-100 text-emerald-800' : currentTime < 4 ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {currentTime >= 20 ? 'RESCUED & SAFE 🎉' : currentTime < 4 ? 'NO SIGNAL (GPS OK)' : 'SOS BEACON ACTIVE'}
                </span>
              </div>

              <div className={`p-3 rounded-xl text-xs flex items-center justify-between transition ${
                currentTime >= 4 && currentTime < 10 ? 'bg-resqblue-subtle/80 border border-resqblue/30 font-bold text-navy' : 'bg-slate-50 text-resqtext-secondary'
              }`}>
                <div className="flex items-center space-x-2">
                  <Cpu className="w-4 h-4 text-resqblue" />
                  <span>Node 1 (ESP32)</span>
                </div>
                <span className="text-[10px] font-mono text-resqblue bg-blue-50 px-2 py-0.5 rounded font-bold">
                  {currentTime >= 4 && currentTime < 10 ? 'TRANSMITTING LORA' : 'STANDBY'}
                </span>
              </div>

              <div className={`p-3 rounded-xl text-xs flex items-center justify-between transition ${
                currentTime >= 8 && currentTime < 13 ? 'bg-resqblue-subtle/80 border border-resqblue/30 font-bold text-navy' : 'bg-slate-50 text-resqtext-secondary'
              }`}>
                <div className="flex items-center space-x-2">
                  <Radio className="w-4 h-4 text-resqblue" />
                  <span>Node 2 (LoRa Relay)</span>
                </div>
                <span className="text-[10px] font-mono text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded font-bold">
                  {currentTime >= 8 && currentTime < 13 ? 'MULTI-HOP REPEATING' : 'STANDBY'}
                </span>
              </div>

              <div className={`p-3 rounded-xl text-xs flex items-center justify-between transition ${
                currentTime >= 11 && currentTime < 16 ? 'bg-resqblue-subtle/80 border border-resqblue/30 font-bold text-navy' : 'bg-slate-50 text-resqtext-secondary'
              }`}>
                <div className="flex items-center space-x-2">
                  <Server className="w-4 h-4 text-resqblue" />
                  <span>Node 3 (Base Gateway)</span>
                </div>
                <span className="text-[10px] font-mono text-purple-800 bg-purple-50 px-2 py-0.5 rounded font-bold">
                  {currentTime >= 11 ? 'SERVING LOCAL WI-FI' : 'STANDBY'}
                </span>
              </div>

              <div className={`p-3 rounded-xl text-xs flex items-center justify-between transition ${
                currentTime >= 13 ? 'bg-emerald-100 border border-emerald-300 font-bold text-emerald-900' : 'bg-slate-50 text-resqtext-secondary'
              }`}>
                <div className="flex items-center space-x-2">
                  <Laptop className="w-4 h-4 text-navy" />
                  <span>Rescue Command Console</span>
                </div>
                <span className="text-[10px] font-mono font-bold">
                  {currentTime >= 20 ? 'TARGET SECURED' : currentTime >= 13 ? 'LIVE TRACKING' : 'READY'}
                </span>
              </div>
            </div>
          </div>

          {/* REAL-TIME DISTRESS TELEMETRY HUD */}
          {showTelemetry && (
            <div className="card-clean rounded-2xl p-6 border border-surface-border shadow-sm">
              <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2.5">
                <span className="text-xs font-bold text-navy flex items-center space-x-1.5">
                  <span className={`w-2 h-2 rounded-full ${currentTime >= 20 ? 'bg-emerald-500' : 'bg-resqblue'}`}></span>
                  <span>Distress Mission Log</span>
                </span>
                <span className="text-[11px] font-mono bg-slate-100 text-navy px-2 py-0.5 rounded font-bold">
                  {currentTime >= 20 ? 'MISSION-SUCCESS' : 'LORA-SOS-9812'}
                </span>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-resqtext-muted">Target Location:</span>
                  <span className="text-navy font-bold">34.0522° N, -118.2437° W</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-resqtext-muted">Radio Link:</span>
                  <span className="text-resqblue font-semibold">LoRa 433.175 MHz CSS</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-resqtext-muted">SAR Squad:</span>
                  <span className="text-amber-700 font-bold">
                    {currentTime >= 20 ? 'Arrived on Scene' : currentTime >= 16 ? 'Alpha-1 (In Transit)' : 'Staged at Base'}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-resqtext-muted">Operation State:</span>
                  <span className={`font-black uppercase ${
                    currentTime >= 20.0 ? 'text-emerald-700' : currentTime >= 16.0 ? 'text-amber-700' : 'text-emergency'
                  }`}>
                    {currentTime >= 20.0 ? 'SURVIVOR SAFE 🎉' : currentTime >= 16.0 ? 'EXTRACTION IN PROGRESS' : 'DISTRESS ACTIVE'}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-resqtext-muted">
                <span>Encryption: AES-128 GCM</span>
                <span className="text-emerald-600 font-bold">Payload Verified</span>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
