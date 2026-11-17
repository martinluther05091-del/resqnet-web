# ResQNet — Offline Disaster Response Mesh Network

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel)](https://vercel.com)
[![React 19](https://img.shields.io/badge/React-19.0-blue?logo=react)](https://react.dev)
[![Three.js](https://img.shields.io/badge/Three.js-3D%20Simulation-black?logo=three.js)](https://threejs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS%203.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)

> **Life-Saving Connectivity When Infrastructure Collapses.**  
> ResQNet combines an offline Android mesh app with embedded ESP32 LoRa hardware transceivers (433 MHz ISM band) to route emergency SOS distress packets across disaster zones without cell towers, internet, or power grids.

---

## 🌟 Highlights & Key Features

- **Continuous 3D Disaster Simulation (0s - 24s)**:
  - Frame-accurate video demonstration showcasing the full disaster cycle: Catastrophic Outage -> SOS Activated -> LoRa Sub-GHz Mesh In-Flight -> Command Alert Received -> Search & Rescue Squad Dispatched -> Survivor Rescued!
  - Tactical SAR (Search & Rescue) hardware rendering with glowing emergency AMOLED beacons, IP67 waterproof orange LoRa repeater enclosures, mini OLED telemetry, and rugged Toughbook command terminal.
  - Set against a dramatic storm-ravaged flooded ruins disaster backdrop.
- **Interactive Scrubber & Video Deck**:
  - Play, pause, rewind, fast-forward, timecode tracker, chapter navigation, and playback speed controls.
- **Hardware Architecture Layer**:
  - Detailed commercial off-the-shelf component specs: ESP32-WROOM-32, Semtech SX1278 LoRa transceivers (433 MHz, +20 dBm, -148 dBm sensitivity), high-gain dipole antennas, and power management.
- **Official APK Download Portal**:
  - Direct download access to the production Android client APK (`resqnet-v1.0.0.apk`) with SHA-256 verification and Bluetooth LE pairing instructions.

---

## 🚀 Quick Start & Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/martinluther05091-del/resqnet-web.git
cd resqnet-web

# Install dependencies
npm install

# Start local dev server
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 🌐 Deploying to Vercel

1. Push this repository to GitHub.
2. Sign in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import `resqnet-web`.
4. Vercel automatically detects **Vite**:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**!

---

## 📄 License & Attribution
Designed and built for ResQNet Disaster Response Network. All rights reserved.
