# ResQNet — Premium Product Website
## Product Requirements Document (PRD)

**Project:** ResQNet — Disaster Response Network  
**Product:** Official product website and Android APK download portal  
**Primary objective:** Explain the ResQNet application, demonstrate its online and offline communication architecture through interactive 3D animations, and allow users to download the Android APK.

---

# 1. Product Vision

Build a premium, production-quality website for ResQNet, an emergency communication application designed to help people communicate and share SOS alerts during disasters, including situations where internet or mobile networks are unavailable.

The website must communicate three things immediately:

1. What ResQNet does.
2. How its online and offline communication systems work.
3. How visitors can download the Android application.

The website must look like the official website of a serious emergency technology company.

### Design philosophy

- Premium and professional.
- Minimal, clean, and structured.
- White and light-blue visual foundation.
- Navy-blue typography and primary elements.
- Controlled red accents for emergency and SOS elements.
- Realistic hardware visualizations.
- Smooth, meaningful animations.
- No unnecessary decorative elements.

**Avoid:** Excessive gradients, neon effects, random floating elements, oversized rounded cards, cartoon illustrations, excessive glassmorphism, and generic AI-generated website layouts.

---

# 2. Brand Identity and Design System

Use the supplied ResQNet logo as the official brand identity.

### Color palette

| Purpose | Color |
|---|---|
| Primary navy | #092C50 |
| Deep navy | #061B35 |
| Primary blue | #0874C9 |
| Secondary blue | #42A5E8 |
| Emergency red | #E53935 |
| Background | #F7FAFE |
| White | #FFFFFF |
| Primary text | #10243B |
| Secondary text | #62748A |
| Borders | #DFE8F1 |

### Typography

Use a modern professional sans-serif font.

Recommended:
- Inter
- Manrope
- Plus Jakarta Sans

Use a strong typographic hierarchy. Headings should be confident and clean, with readable body text.

### Supplied visual assets

Use the provided assets rather than recreating them unnecessarily:

1. Official ResQNet logo.
2. Isolated smartphone mockup showing the ResQNet application.
3. Light-blue mountain and diagonal-blue background image.

Use the mountain background in the hero section, with responsive positioning and suitable overlays.

The smartphone mockup should have a transparent background. If its supplied file has a dark background, remove that background properly before using it as a transparent asset.

---

# 3. Website Architecture

Create the following pages:

1. Home
2. About
3. Features
4. How It Works
5. Download

The main navigation should contain:

**Logo | Home | About | Features | How It Works | Download App**

The Download App button should be visually prominent but not oversized.

The navigation should be sticky, lightweight, and responsive.

---

# 4. Home Page — Premium Landing Experience

## Hero Section

Create a high-quality hero section inspired by the supplied website reference.

### Left side

Small label:

DISASTER RESPONSE NETWORK

Main heading:

**ResQNet**

Subheading:

Emergency Communication App

Description:

"A resilient emergency communication platform designed to help people send SOS alerts, share locations, and stay connected during disasters — even when conventional networks are unavailable."

Primary CTA:

**Download Android App**

Secondary CTA:

**Explore How It Works**

Under the buttons:

Android App | APK | Version [actual version] | [actual file size]

Only display version and file size when verified from the actual APK.

### Right side

Display the isolated ResQNet smartphone mockup.

- Large but balanced.
- Natural shadows.
- Slight depth and perspective.
- Subtle entrance animation.
- No excessive rotation.
- Responsive on smaller screens.

Use the supplied mountain background across the hero section.

## Feature Highlights

Below the hero, create four compact feature highlights:

**Works Offline**
Emergency communication through the LoRa-based network when internet connectivity is unavailable.

**Location Sharing**
Share GPS coordinates with the rescue network.

**Mesh Communication**
Multi-hop communication through interconnected ESP32 and LoRa nodes.

**Rescue Coordination**
Make emergency alerts and location information available to the rescue team.

Use clean icons, subtle dividers, and restrained hover effects.

Do not make these look like generic oversized dashboard cards.

---

# 5. About Page

Explain the purpose of ResQNet.

### Heading

Communication Should Never Be a Barrier During a Disaster.

### Content

During natural disasters and other emergencies, conventional communication infrastructure may become unavailable or unreliable.

ResQNet aims to provide an alternative communication pathway that combines mobile application technology, Bluetooth, LoRa communication, and an online backend.

Its architecture supports both internet-connected communication and a proposed offline communication pathway.

### Sections

- The problem.
- Why conventional networks may fail.
- Our approach.
- Online and offline communication architecture.
- The role of rescue teams.

Use real project photographs and actual hardware photographs wherever available.

Do not invent field deployments, rescue statistics, certifications, or performance claims.

---

# 6. Features Page

Present the application's capabilities using professional sections with real application screenshots.

### Feature 1 — SOS Emergency Alerts

- Emergency alert initiation.
- User identification.
- GPS coordinate transmission.
- Alert status.

### Feature 2 — GPS Location Sharing

- Capture device location.
- Include coordinates in emergency messages.
- Display available location information to responders.

### Feature 3 — Offline Communication

- Bluetooth communication between the Android application and Node 1.
- LoRa communication between ESP32 nodes.
- Multi-hop message forwarding through the relay network.
- Local gateway access when internet is unavailable.

### Feature 4 — Online Communication

- Internet-connected backend.
- Firebase integration.
- Live alert availability on the web dashboard.

### Feature 5 — Rescue Dashboard

- Emergency alert information.
- GPS coordinates.
- Alert details.
- Map visualization when map connectivity or offline map data is available.

Every feature should be backed by actual application functionality. Mark planned or experimental functionality clearly.

---

# 7. How It Works — Main Interactive Experience

**This is the most important section of the website.**

Build an immersive, interactive technical demonstration showing how ResQNet transmits an emergency alert.

This must not be a static flowchart.

The user should be able to interact with the system and watch the communication process in a realistic animated environment.

## Section introduction

Heading:

**See How ResQNet Connects When Networks Fail.**

Description:

"Explore how an emergency alert travels through ResQNet, from a mobile device to the rescue dashboard, using either internet connectivity or an offline LoRa communication network."

## Mode Switcher

Create two clear interactive modes:

- ONLINE MODE
- OFFLINE MODE

Switching modes must change the complete animation, network connections, packet movement, hardware states, and explanation panel.

The two modes must not be visually identical.

---

## 7A. Online Mode — Animated Network Flow

### Communication architecture

Flutter Mobile App → Internet → Firebase Backend → React Rescue Dashboard

### Visual environment

Create a realistic 3D technical visualization containing:

1. Android smartphone displaying the ResQNet application.
2. Wi-Fi/mobile internet communication symbol.
3. Cloud/backend server representation.
4. Firebase backend representation.
5. Rescue dashboard monitor.

Use recognizable, realistic 3D hardware and infrastructure models.

### Animation sequence

**Step 1 — Emergency Initiated**

Show the ResQNet smartphone.

The user presses the SOS button.

- SOS button animates.
- A small emergency packet appears.
- GPS coordinates become part of the packet.
- A subtle red emergency indicator activates.

**Step 2 — Internet Transmission**

Show a packet moving from the phone towards the internet.

- Blue transmission path activates.
- Packet moves along the path.
- Network status indicates Connected.

**Step 3 — Backend Processing**

Show the backend server receiving the packet.

- Server lights activate.
- Packet enters the backend.
- A small data-processing animation appears.

**Step 4 — Dashboard Reception**

Show the rescue dashboard.

- New SOS alert appears.
- Location information becomes visible.
- A map marker appears if map data is available.
- A subtle notification indicator activates.

### Online mode information panel

Show:

- Connection: Online
- Transport: Internet
- Backend: Firebase
- Destination: Rescue Dashboard
- Status: Received (only after the simulated or actual event completes)

---

## 7B. Offline Mode — 3D LoRa Hardware Communication

This is the signature demonstration of ResQNet.

The visualization must represent the actual project hardware, not generic cloud icons.

### Required 3D components

Create realistic 3D representations of:

**1. Android Smartphone**
- ResQNet application screen.
- SOS button.
- GPS information.
- Bluetooth indicator.

**2. Node 1 — ESP32 + LoRa SX1278**
- ESP32 development board.
- SX1278 RA-02 LoRa module.
- Antenna.
- Visible board components and pin layout.

**3. Node 2 — LoRa Relay**
- ESP32 development board.
- LoRa module.
- Antenna.
- Relay node label.

**4. Node 3 — Gateway**
- ESP32 development board.
- LoRa module.
- Antenna.
- Local Wi-Fi gateway representation.
- Gateway status indicator.

**5. Rescue Dashboard**
- Laptop/monitor.
- ResQNet rescue interface.
- Received emergency alert.

Use accurate component references and realistic models. Do not use imaginary hardware designs.

### Offline communication architecture

Flutter Application
↓ Bluetooth Classic
Node 1 — ESP32 + SX1278
↓ LoRa 433 MHz
Node 2 — ESP32 + SX1278 Relay
↓ LoRa 433 MHz
Node 3 — ESP32 + SX1278 Gateway
↓ Local Wi-Fi
React Rescue Dashboard

### Animation sequence

**Step 1 — SOS Created**

Display the mobile application.

User presses SOS.

Show:
- Emergency alert generated.
- GPS coordinates included.
- Packet ID created.
- Internet connection unavailable.

**Step 2 — Bluetooth Transmission**

Show the phone and Node 1.

- Bluetooth connection line activates.
- Animated data packets move from the smartphone to Node 1.
- Node 1 receives the packet.
- Node status changes to Received.

**Step 3 — LoRa Transmission to Node 2**

Show Node 1 transmitting to Node 2.

- LoRa antenna activates.
- Signal wave animation travels between the nodes.
- Data packet travels along the communication path.
- Node 2 receives the packet.
- RSSI information may be displayed if actual data is available.

**Step 4 — Node 2 Relay**

Show Node 2 forwarding the packet.

- Packet is received.
- Relay indicator activates.
- New LoRa transmission begins.
- Node 3 receives the packet.

**Step 5 — Node 3 Gateway**

Show Node 3 receiving the emergency packet.

- Gateway indicator activates.
- Packet is validated.
- Alert is stored locally.
- Local Wi-Fi access point becomes available.

**Step 6 — Local Dashboard**

Show a laptop connected to the Node 3 Wi-Fi network.

- Dashboard requests data from the local gateway API.
- Node 3 responds with alert information.
- New SOS alert appears.
- GPS coordinates are displayed.
- Map marker appears only if the dashboard has the required map data.

### Offline mode information panel

Display:

- Internet: Unavailable
- Bluetooth: Connected
- LoRa: Active
- Relay: Node 2
- Gateway: Node 3
- Local Wi-Fi: Active
- Dashboard: Connected
- Alert: Received

These statuses should be driven by the simulation state or actual hardware telemetry, not permanently hardcoded.

---

## 7C. Interactive Controls

Provide the following controls:

- Start Demonstration
- Pause
- Replay
- Reset
- Switch Online/Offline
- Step-by-Step Mode

During animation, show the current step and a short explanation.

Example:

**CURRENT STEP: NODE 2 RELAY**

"Node 2 receives the emergency packet from Node 1 and forwards it to Node 3 through LoRa."

The animation must be synchronized with the explanation.

Add an optional packet inspection panel showing:

- Packet ID
- Source node
- Destination node
- GPS latitude
- GPS longitude
- Message type
- Transmission stage

Use clearly marked sample data during the demonstration. Never present simulated packet values as real field telemetry.

---

# 8. 3D Animation and Technical Implementation

The 3D demonstration must look like a premium technical product visualization.

### Preferred technology

- React
- Three.js
- React Three Fiber
- Drei
- Framer Motion
- GSAP where useful

### 3D requirements

- Realistic smartphone model.
- Accurate ESP32 DevKit representation.
- Accurate SX1278 RA-02 module representation.
- Realistic LoRa antenna.
- Realistic server and monitor models.
- Animated communication paths.
- Moving packet indicators.
- Animated antenna signal waves.
- Dynamic node status indicators.
- Smooth camera movement.

### Animation style

Use restrained technical animation.

- Blue packets for normal communication.
- Red for emergency alerts.
- Green for successful reception.
- Amber for pending or retry states.
- Subtle signal rings around active antennas.
- Smooth movement along communication paths.
- Soft lighting and realistic shadows.

Avoid:
- Cartoon hardware.
- Excessive particle explosions.
- Neon cyberpunk effects.
- Constant spinning objects.
- Distracting camera movement.

### Performance

- Lazy-load 3D components.
- Use optimized GLB/GLTF assets.
- Use compressed textures.
- Limit particle count.
- Avoid unnecessary real-time rendering.
- Provide a simplified 2D fallback on mobile and low-powered devices.
- Respect reduced-motion accessibility settings.
- Maintain responsive layouts.

The animation should remain smooth without making the rest of the website slow.

---

# 9. Download Page

The main objective of the website is to make downloading the Android application simple.

### Heading

**Get ResQNet. Stay Connected When It Matters.**

Description:

"Install the ResQNet Android application and explore an alternative emergency communication system designed for disaster situations."

### Download card

Display:

- Official ResQNet logo.
- App name.
- Actual application icon.
- Actual APK version.
- Actual file size.
- Android compatibility information.
- Download APK button.

### Download button behavior

The button must download the actual APK file.

Use a configurable download URL:

`VITE_APK_DOWNLOAD_URL`

Do not create a fake download button or placeholder file.

If the APK is hosted on GitHub Releases, use the actual release asset URL.

### Additional information

Include:

- Installation instructions.
- How to allow installation from the browser or file manager when Android requests permission.
- Minimum supported Android version, verified from the application.
- Application version and release date.

Include a clear warning that users should download the APK only from the official ResQNet website or verified release source.

---

# 10. Optional Live Demonstration Mode

Keep the architecture ready for a future live hardware demonstration.

If a live demonstration endpoint is configured, allow visitors to see actual Node 3 gateway data.

Possible integration:

- Local gateway API: `/api/alerts`
- Gateway address configurable.
- Actual node status.
- Actual received alert information.

However, do not make the public website attempt to access a private local ESP32 address automatically.

Live hardware demonstration should be an explicitly enabled feature, separate from the default simulated demonstration.

The default How It Works experience must work without hardware connected.

---

# 11. Footer

Include:

- ResQNet logo.
- Short product description.
- Home.
- About.
- Features.
- How It Works.
- Download.
- GitHub repository, if public.
- Contact information, if supplied.
- Copyright information.

Use a simple navy footer with restrained styling.

Do not invent organization details or contact information.

---

# 12. Technology Stack

Use the following architecture:

**Frontend**
- React
- Vite
- JavaScript or TypeScript
- Tailwind CSS

**Animations**
- Three.js
- React Three Fiber
- Drei
- Framer Motion
- GSAP, where required

**Icons**
- Lucide React

**Deployment**
- Vercel or Netlify

**APK Hosting**
- GitHub Releases or a verified direct-download hosting service

The website must remain independent of the mobile app's Firebase configuration unless a specific live integration is required.

---

# 13. Suggested Project Structure

```text
resqnet-website/
│
├── public/
│   ├── assets/
│   │   ├── resqnet-logo.png
│   │   ├── hero-background.png
│   │   ├── app-mockup.png
│   │   └── hardware/
│   │       ├── esp32.glb
│   │       ├── sx1278.glb
│   │       ├── smartphone.glb
│   │       └── laptop.glb
│   │
│   └── screenshots/
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── FeatureHighlights.jsx
│   │   ├── DownloadButton.jsx
│   │   └── SectionHeading.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Features.jsx
│   │   ├── HowItWorks.jsx
│   │   └── Download.jsx
│   │
│   ├── simulation/
│   │   ├── SimulationCanvas.jsx
│   │   ├── OnlineSimulation.jsx
│   │   ├── OfflineSimulation.jsx
│   │   ├── SmartphoneModel.jsx
│   │   ├── ESP32Node.jsx
│   │   ├── LoRaModule.jsx
│   │   ├── GatewayNode.jsx
│   │   ├── PacketAnimation.jsx
│   │   ├── SignalAnimation.jsx
│   │   └── SimulationControls.jsx
│   │
│   ├── config/
│   │   └── siteConfig.js
│   │
│   ├── styles/
│   │   └── global.css
│   │
│   └── App.jsx
│
├── .env
├── package.json
└── README.md
```

---

# 14. Functional Requirements

The completed website must satisfy the following:

1. Responsive on desktop, tablet, and mobile.
2. Working navigation.
3. Working APK download.
4. Working online/offline mode switcher.
5. Complete online communication simulation.
6. Complete offline communication simulation.
7. Accurate hardware representations.
8. Animated packet transmission.
9. Synchronized explanation panels.
10. Working pause, replay, and reset controls.
11. Working mobile fallback for 3D visualization.
12. SEO-friendly page titles and descriptions.
13. Optimized loading and image assets.
14. No broken links.
15. No fake download links or fake live telemetry.

---

# 15. Accuracy and Engineering Constraints

The website is a product explanation and demonstration, not a substitute for a verified engineering test.

Follow these rules:

- Clearly distinguish simulated animation from actual hardware communication.
- Do not claim that LoRa provides internet access.
- Do not show Node 3 sending data to Firebase when internet is unavailable.
- In offline mode, the dashboard receives alerts through the local gateway network.
- The laptop or another compatible device must connect to Node 3's local Wi-Fi to access the local dashboard.
- The gateway must be powered on.
- Bluetooth and LoRa should be shown as separate communication stages.
- Use the actual project configuration for frequency and radio parameters.
- Do not claim guaranteed delivery unless acknowledgement and retry mechanisms have been implemented and tested.
- Do not invent transmission range, speed, latency, or reliability statistics.

---

# 16. Acceptance Criteria

The website is ready for final presentation when:

- The homepage looks polished and professional.
- The supplied logo and visual assets are integrated correctly.
- The application mockup is displayed cleanly.
- Visitors can download the actual Android APK.
- The How It Works section provides a complete online simulation.
- The How It Works section provides a complete offline simulation.
- Offline mode accurately shows Bluetooth → Node 1 → Node 2 → Node 3 → Local Wi-Fi → Dashboard.
- Online mode accurately shows the internet/backend route.
- Every animation control works.
- The website works on mobile and desktop.
- All text is readable and technically accurate.
- There are no placeholder sections or broken interactions.

---

# 17. Final Development Instruction

Build the complete ResQNet website as a production-quality product website, not a static design mockup.

Prioritize the quality of the How It Works interactive simulation.

Use realistic 3D hardware models, accurate communication paths, moving data packets, synchronized step explanations, and a premium technical presentation.

Use the supplied logo, smartphone mockup, and mountain background as the design foundation.

Keep the overall website minimal, white, navy, and blue, with controlled red emergency accents.

The website should communicate technical credibility, clarity, reliability, and professionalism.

Do not sacrifice usability or technical accuracy for visual effects.

First inspect the existing project assets and actual APK details. Then implement the complete website, test all routes and interactions, verify the APK download, optimize performance, and prepare the final deployable build.