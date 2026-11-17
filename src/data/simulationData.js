export const OFFLINE_STEPS = [
  {
    step: 1,
    phase: "disaster",
    title: "1. Disaster Strikes: Networks Collapse",
    shortDesc: "Earthquake/Flood knocks down towers • Survivor trapped",
    storyHeadline: "Catastrophic Infrastructure Blackout",
    storyText: "A massive disaster hits the region. Fiber lines are severed and cellular towers lose power. Conventional 911, cell calls, and mobile data are completely dead. A survivor with their smartphone is cut off with zero cell service.",
    activeNodes: ['phone'],
    connectionActive: null,
    packetPos: 0,
    packetData: {
      id: "ALERT-PENDING",
      situation: "Earthquake / Debris Collapse",
      cellTowerStatus: "OFFLINE (No Carrier)",
      internetAccess: "DISCONNECTED (0.0 Kbps)",
      victimStatus: "Stranded • Battery 78%",
      locationMode: "GNSS Satellite Lock Active",
      lat: "34.05223° N",
      lng: "-118.24368° W",
      accuracy: "±3.2 meters",
      urgency: "CRITICAL DANGER",
      timestamp: "2026-11-16 20:47:10"
    },
    nodeStatuses: {
      phone: { status: "Cell Service Lost • GPS Acquired", state: "emergency" },
      node1: { status: "LoRa / BLE Beaconing", state: "idle" },
      node2: { status: "Repeater Standby", state: "idle" },
      node3: { status: "Base Gateway Active", state: "idle" },
      dashboard: { status: "Monitoring Grid", state: "idle" }
    }
  },
  {
    step: 2,
    phase: "sos",
    title: "2. SOS Triggered & Bluetooth Handoff",
    shortDesc: "Survivor taps SOS • Phone connects to nearby Node 1",
    storyHeadline: "Emergency Distress Beacon Generated",
    storyText: "The survivor presses the prominent red SOS button on ResQNet. The app generates an encrypted distress payload with exact satellite GPS coordinates and automatically discovers portable Node 1 via Bluetooth Serial, transferring the alert instantly.",
    activeNodes: ['phone', 'node1'],
    connectionActive: 'phone-node1',
    packetPos: 0.2,
    packetData: {
      id: "LORA-SOS-9812",
      situation: "Distress Beacon Transmitted",
      protocol: "Bluetooth SPP (Classic)",
      source: "Survivor Phone (ID: #USER-442)",
      destination: "Node 1 — ESP32 Field Transmitter",
      lat: "34.05223° N",
      lng: "-118.24368° W",
      frequency: "2.4 GHz (Bluetooth Link)",
      rssi: "-52 dBm (Excellent)",
      hopCount: 1,
      urgency: "LIFE-SAFETY IMMEDIATE",
      timestamp: "2026-11-16 20:47:12"
    },
    nodeStatuses: {
      phone: { status: "SOS Sent • BT Handed Off", state: "warning" },
      node1: { status: "Packet Ingested • Staging TX", state: "active" },
      node2: { status: "LoRa Listening (433MHz)", state: "idle" },
      node3: { status: "Base Gateway Active", state: "idle" },
      dashboard: { status: "Monitoring Grid", state: "idle" }
    }
  },
  {
    step: 3,
    phase: "mesh",
    title: "3. LoRa Radio Mesh Relay Across Debris",
    shortDesc: "433 MHz RF signal propagates over hills to Node 2 Relay",
    storyHeadline: "Sub-GHz Radio Penetrates Terrain",
    storyText: "Node 1's Semtech SX1278 transceiver blasts the packet at 433.175 MHz using Chirp Spread Spectrum modulation. Even through collapsed concrete and dense foliage, the signal reaches solar-powered Relay Node 2 positioned on high ground.",
    activeNodes: ['node1', 'node2'],
    connectionActive: 'node1-node2',
    packetPos: 0.45,
    packetData: {
      id: "LORA-SOS-9812",
      situation: "In-Flight LoRa Hop 1",
      protocol: "LoRa CSS (433.175 MHz)",
      source: "Node 1 (Transmitter)",
      destination: "Node 2 (High-Elevation Relay)",
      lat: "34.05223° N",
      lng: "-118.24368° W",
      frequency: "433.175 MHz (BW 125kHz, SF12)",
      rssi: "-86 dBm",
      snr: "9.4 dB",
      hopCount: 2,
      urgency: "LIFE-SAFETY IMMEDIATE",
      timestamp: "2026-11-16 20:47:14"
    },
    nodeStatuses: {
      phone: { status: "Waiting for LoRa ACK", state: "warning" },
      node1: { status: "TX Broadcast Successful", state: "success" },
      node2: { status: "RX Packet Verified (CRC OK)", state: "active" },
      node3: { status: "Base Gateway Active", state: "idle" },
      dashboard: { status: "Monitoring Grid", state: "idle" }
    }
  },
  {
    step: 4,
    phase: "gateway",
    title: "4. Rescue Dashboard Receives SOS Alert!",
    shortDesc: "Gateway validates alert • Incident command rings alarm",
    storyHeadline: "Victim Pinpointed on Command Map",
    storyText: "Node 2 repeats the signal to Node 3 at base camp. The local gateway commits the packet into memory and serves it over local Wi-Fi. The search & rescue laptop immediately flashes red and sounds an acoustic alarm: 'CRITICAL SOS: SURVIVOR AT SECTOR 4'!",
    activeNodes: ['node2', 'node3', 'dashboard'],
    connectionActive: 'node2-node3',
    packetPos: 0.85,
    packetData: {
      id: "LORA-SOS-9812",
      situation: "Alert Delivered to Rescue Team",
      protocol: "Local Gateway Wi-Fi (192.168.4.1)",
      source: "Node 3 Gateway Base",
      destination: "Search & Rescue Incident Console",
      lat: "34.05223° N",
      lng: "-118.24368° W",
      targetName: "Survivor #442 (Male, 28)",
      medicalStatus: "Injured • Needs Evacuation",
      hopCount: 3,
      urgency: "TARGET IDENTIFIED",
      timestamp: "2026-11-16 20:47:16"
    },
    nodeStatuses: {
      phone: { status: "LoRa ACK Received!", state: "success" },
      node1: { status: "Standby", state: "idle" },
      node2: { status: "Relay Complete", state: "success" },
      node3: { status: "Gateway Serving Data", state: "success" },
      dashboard: { status: "SOS RECEIVED! Alarm Triggered", state: "emergency" }
    }
  },
  {
    step: 5,
    phase: "dispatch",
    title: "5. Search & Rescue Team Dispatched!",
    shortDesc: "Rescue squad Alpha deployed with turn-by-turn GPS vector",
    storyHeadline: "Responders En Route to Coordinates",
    storyText: "The incident commander dispatches Rescue Squad Alpha (vehicle & drone support) directly to coordinates 34.05223° N, -118.24368° W. Responders carry medical kits and portable LoRa beacons to maintain live tracking as they navigate through the disaster zone.",
    activeNodes: ['dashboard'],
    connectionActive: null,
    packetPos: 0.95,
    packetData: {
      id: "LORA-SOS-9812",
      situation: "Rescue Team Dispatched",
      unitAssigned: "SAR Squad Alpha-1",
      eta: "3 Minutes",
      heading: "Bearing 042° NE",
      equipment: "First Aid • Thermal Imager • Stretcher",
      lat: "34.05223° N",
      lng: "-118.24368° W",
      distance: "1.2 km from Base Camp",
      urgency: "RESCUE OPERATION IN PROGRESS",
      timestamp: "2026-11-16 20:47:20"
    },
    nodeStatuses: {
      phone: { status: "Responders En Route! ETA 3m", state: "success" },
      node1: { status: "Mesh Router Active", state: "idle" },
      node2: { status: "Mesh Router Active", state: "idle" },
      node3: { status: "Tracking Squad Alpha", state: "active" },
      dashboard: { status: "Squad Dispatched • Live Tracking", state: "active" }
    }
  },
  {
    step: 6,
    phase: "saved",
    title: "6. Survivor Safely Rescued! Everyone Safe 🎉",
    shortDesc: "First responders reach the survivor • Mission Accomplished!",
    storyHeadline: "Survivor Located & Evacuated Safely",
    storyText: "Rescue Squad Alpha arrives on scene at the exact coordinates! First responders extract the survivor safely, administer first aid, and transmit a 'MISSION SUCCESS - SURVIVOR SAFE' confirmation back to the command dashboard. Everyone is safe and happy!",
    activeNodes: ['phone', 'dashboard'],
    connectionActive: null,
    packetPos: 1,
    packetData: {
      id: "LORA-SOS-9812",
      situation: "MISSION SUCCESS • RESCUED",
      finalStatus: "SAFE & EXTRACTED",
      outcome: "Survivor in Stable Condition",
      firstAid: "Administered on site",
      evacuationTransport: "En route to Field Medical Unit",
      lat: "34.05223° N",
      lng: "-118.24368° W",
      totalMissionDuration: "6 Minutes 14 Seconds",
      urgency: "ALL CLEAR • COMPLETED",
      timestamp: "2026-11-16 20:53:24"
    },
    nodeStatuses: {
      phone: { status: "RESCUED & SAFE! 🎉", state: "saved" },
      node1: { status: "Mesh Ready", state: "success" },
      node2: { status: "Mesh Ready", state: "success" },
      node3: { status: "Mission Log Archived", state: "success" },
      dashboard: { status: "SURVIVOR SECURED • ALL CLEAR", state: "saved" }
    }
  }
];

export const ONLINE_STEPS = [
  {
    step: 1,
    phase: "disaster",
    title: "1. Emergency Triggered Online",
    shortDesc: "User taps SOS • High-priority encrypted payload staged",
    storyHeadline: "Emergency Incident Registered",
    storyText: "Under cellular or Wi-Fi coverage, the victim triggers the SOS alert. The smartphone immediately queries the device's high-precision GNSS receiver, bundling coordinates into an HTTPS payload.",
    activeNodes: ['phone'],
    connectionActive: null,
    packetPos: 0,
    packetData: {
      id: "EMG-2026-9041",
      protocol: "HTTPS / TLS 1.3",
      source: "Android Client (ID: #USR-782)",
      destination: "Firebase Cloud Gateway",
      lat: "34.05223° N",
      lng: "-118.24368° W",
      accuracy: "±3.2 meters",
      urgency: "CRITICAL_LEVEL_1",
      network: "Cellular / 4G LTE",
      hopCount: 0,
      timestamp: "2026-11-16 20:45:12 UTC"
    },
    nodeStatuses: {
      phone: { status: "SOS Active", state: "emergency" },
      cloud: { status: "Standby", state: "idle" },
      dashboard: { status: "Awaiting Data", state: "idle" }
    }
  },
  {
    step: 2,
    phase: "sos",
    title: "2. Cloud Stream Ingestion",
    shortDesc: "Packet transmitted securely through mobile internet",
    storyHeadline: "High-Priority Cloud Uplink",
    storyText: "The emergency payload travels through cellular 4G/5G tower to regional Google Cloud infrastructure with top-tier QoS guarantees.",
    activeNodes: ['phone', 'cloud'],
    connectionActive: 'phone-cloud',
    packetPos: 0.5,
    packetData: {
      id: "EMG-2026-9041",
      protocol: "WSS / REST API",
      source: "Cell Tower #418-North",
      destination: "Google Cloud Region us-central1",
      lat: "34.05223° N",
      lng: "-118.24368° W",
      accuracy: "±3.2 meters",
      urgency: "CRITICAL_LEVEL_1",
      network: "Cloud Ingress Router",
      hopCount: 1,
      timestamp: "2026-11-16 20:45:13 UTC"
    },
    nodeStatuses: {
      phone: { status: "Uplink Active", state: "active" },
      cloud: { status: "Ingesting Stream", state: "active" },
      dashboard: { status: "Listening", state: "idle" }
    }
  },
  {
    step: 3,
    phase: "gateway",
    title: "3. Command Center Receives SOS!",
    shortDesc: "Firebase Realtime DB syncs • Dashboard triggers alarm",
    storyHeadline: "Live Victim Alert on Dashboard",
    storyText: "The cloud cluster broadcasts the alert to all connected rescue dispatch monitors. The map instantly pins the victim's location and triggers siren notifications.",
    activeNodes: ['cloud', 'dashboard'],
    connectionActive: 'cloud-dashboard',
    packetPos: 0.8,
    packetData: {
      id: "EMG-2026-9041",
      protocol: "Firebase Realtime DB Sync",
      source: "resqnet-cluster-production",
      destination: "Rescue Operations Room",
      lat: "34.05223° N",
      lng: "-118.24368° W",
      accuracy: "±3.2 meters",
      urgency: "DISPATCH READY",
      network: "Fiber Backbone",
      hopCount: 2,
      timestamp: "2026-11-16 20:45:14 UTC"
    },
    nodeStatuses: {
      phone: { status: "Sent Confirmed", state: "success" },
      cloud: { status: "Alert Broadcasted", state: "success" },
      dashboard: { status: "Incoming Notification", state: "emergency" }
    }
  },
  {
    step: 4,
    phase: "saved",
    title: "4. Rapid Response & Rescue Success 🎉",
    shortDesc: "Emergency team dispatches & secures victim • Mission Accomplished!",
    storyHeadline: "Target Located & Rescued Safely",
    storyText: "Emergency responders reach the victim in record time, provide medical assistance, and log the incident as safely completed. Everyone is safe!",
    activeNodes: ['dashboard', 'phone'],
    connectionActive: null,
    packetPos: 1,
    packetData: {
      id: "EMG-2026-9041",
      situation: "MISSION SUCCESS • ALL SAFE",
      destination: "Rescue Command Console #1",
      lat: "34.05223° N",
      lng: "-118.24368° W",
      accuracy: "±3.2 meters",
      urgency: "RESCUED & SAFE",
      network: "Command Center LAN",
      hopCount: 3,
      timestamp: "2026-11-16 20:45:15 UTC"
    },
    nodeStatuses: {
      phone: { status: "RESCUED & SAFE! 🎉", state: "saved" },
      cloud: { status: "Mission Completed", state: "success" },
      dashboard: { status: "Target Safe • Mission Closed", state: "saved" }
    }
  }
];

export const HARDWARE_SPECS = [
  {
    name: "ESP32 DevKit V1",
    role: "Core Computation & Network Controller",
    frequency: "240 MHz Dual Core Xtensa® 32-bit LX6",
    connectivity: "Wi-Fi 802.11 b/g/n + Bluetooth v4.2 BR/EDR & BLE",
    power: "Ultra-low power deep sleep (<10 µA), 3.3V operating voltage",
    storage: "520 KB SRAM, 4 MB SPI Flash for local offline alert buffer"
  },
  {
    name: "Semtech SX1278 (RA-02)",
    role: "Long-Range Sub-GHz Radio Transceiver",
    frequency: "433 MHz ISM Band (license-free)",
    modulation: "LoRa® Chirp Spread Spectrum (CSS) + FSK / GFSK",
    sensitivity: "Up to -148 dBm receiving sensitivity",
    powerOutput: "+20 dBm (100 mW) stable RF power output"
  },
  {
    name: "Spring / Dipole SMA Antenna",
    role: "Omnidirectional RF Propagation",
    gain: "2.15 dBi - 3 dBi tuned for 433 MHz resonance",
    range: "Line of sight up to 5-10 km; dense terrain 1-3 km",
    impedance: "50 Ohm matched impedance for maximum radiated power"
  },
  {
    name: "ResQNet Mobile Client",
    role: "User SOS Generation & Field Handoff",
    platform: "Android 8.0+ (Oreo to Android 15)",
    gpsMode: "High-accuracy GNSS positioning with GPS/GLONASS/Galileo",
    failover: "Automatic cloud-to-bluetooth failover when offline"
  }
];
