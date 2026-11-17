import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Continuous Cinematic 3D Video Simulation
 * Backdrop: Storm-Ravaged Flooded Ruins
 * Features smooth continuous playback (0s - 24s):
 * - 3D Survivor figure with distress waving & celebration cheering
 * - 3D Rescue squad vehicle that dispatches and drives to save the survivor
 * - Smooth continuous packet gliding along 3D CatmullRom spline
 * - Radiating LoRa RF antenna wave rings
 * - Smooth camera transitions and celebration particles
 */
export default function Simulation3D({ 
  currentTime, 
  duration, 
  isPlaying, 
  onTimeUpdate, 
  onSeek,
  mode 
}) {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const animFrameId = useRef(null);

  // 3D Objects refs
  const packetMeshRef = useRef(null);
  const survivorRef = useRef(null);
  const rescueRoverRef = useRef(null);
  const signalRingsRef = useRef([]);
  const celebrationParticlesRef = useRef([]);
  const nodesRef = useRef({});
  const splineRef = useRef(null);

  // Camera control
  const isDragging = useRef(false);
  const prevMousePos = useRef({ x: 0, y: 0 });
  const cameraAngle = useRef({ theta: 0, phi: 0.15 });
  const userInteracted = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 480;

    // SCENE with transparent background so the disaster backdrop image shows through
    const scene = new THREE.Scene();
    scene.background = null;
    sceneRef.current = scene;

    // CAMERA - Grounded perspective aligned directly with the disaster road
    const aspect = width / height;
    const fov = aspect < 1.2 ? 56 : 40;
    const camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 1000);
    camera.position.set(0, 2.2, 25);
    camera.lookAt(0, -0.4, 0);
    cameraRef.current = camera;

    // RENDERER with transparent canvas and ACES Filmic tone mapping
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // HIGH-CONTRAST DISASTER LIGHTING (Vibrant key + fill + foreground device spotlight)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfffaed, 2.4);
    sunLight.position.set(16, 24, 18);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.bias = -0.0001;
    scene.add(sunLight);

    const skyFill = new THREE.DirectionalLight(0x93c5fd, 1.1);
    skyFill.position.set(-16, 12, -10);
    scene.add(skyFill);

    const frontLight = new THREE.DirectionalLight(0xffffff, 1.6);
    frontLight.position.set(0, 8, 22);
    scene.add(frontLight);

    // BUILD 3D ENVIRONMENT (Survivor, hardware nodes, rescue squad vehicle):
    build3DScene(scene);

    // CONTINUOUS 3D MOTION PATH (Spline hopping smoothly along road between hardware)
    const splinePoints = [
      new THREE.Vector3(-10.5, -0.4, 0),     // Phone
      new THREE.Vector3(-7.8, 1.1, 0),       // Bluetooth arc
      new THREE.Vector3(-5.2, -0.4, 0),      // Node 1
      new THREE.Vector3(-2.6, 1.3, 0),       // LoRa hop 1 arc
      new THREE.Vector3(0, -0.4, 0),         // Node 2
      new THREE.Vector3(2.6, 1.3, 0),        // LoRa hop 2 arc
      new THREE.Vector3(5.2, -0.4, 0),       // Node 3
      new THREE.Vector3(7.8, 0.9, 0),        // Wi-Fi link arc
      new THREE.Vector3(10.5, -0.4, 0)       // Laptop Screen
    ];
    splineRef.current = new THREE.CatmullRomCurve3(splinePoints);

    // GLOWING DISTRESS PACKET (High-intensity emergency plasma orb)
    const packetGeo = new THREE.SphereGeometry(0.44, 32, 32);
    const packetMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0xef4444,
      emissiveIntensity: 1.6,
      roughness: 0.1,
    });
    const packet = new THREE.Mesh(packetGeo, packetMat);
    scene.add(packet);
    packetMeshRef.current = packet;

    const haloGeo = new THREE.SphereGeometry(0.85, 24, 24);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xef4444,
      transparent: true,
      opacity: 0.65,
    });
    const packetHalo = new THREE.Mesh(haloGeo, haloMat);
    packet.add(packetHalo);

    // RF SIGNAL WAVE RINGS (Vivid neon cyan LoRa radar rings)
    signalRingsRef.current = [];
    for (let i = 0; i < 4; i++) {
      const ringGeo = new THREE.RingGeometry(0.25, 0.55, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      scene.add(ring);
      signalRingsRef.current.push({ mesh: ring, offset: i * 0.25 });
    }

    // CELEBRATION CONFETTI
    celebrationParticlesRef.current = [];
    const colors = [0x10b981, 0x00f0ff, 0xf59e0b, 0xf43f5e, 0x8b5cf6];
    for (let i = 0; i < 40; i++) {
      const pMesh = new THREE.Mesh(
        new THREE.DodecahedronGeometry(0.2),
        new THREE.MeshStandardMaterial({
          color: colors[i % colors.length],
          emissive: colors[i % colors.length],
          emissiveIntensity: 0.8,
          roughness: 0.1,
        })
      );
      pMesh.visible = false;
      scene.add(pMesh);
      celebrationParticlesRef.current.push({
        mesh: pMesh,
        vx: (Math.random() - 0.5) * 6,
        vy: 2.5 + Math.random() * 4.5,
        vz: (Math.random() - 0.5) * 5,
        rotSpeed: (Math.random() - 0.5) * 6,
      });
    }

    // CONTINUOUS ANIMATION LOOP
    let prevTime = performance.now();
    const startTime = performance.now();
    const animate = () => {
      animFrameId.current = requestAnimationFrame(animate);
      const now = performance.now();
      const delta = (now - prevTime) / 1000;
      prevTime = now;
      const time = (now - startTime) / 1000;

      // Camera positioning: Lower, cinematic angle anchored near the ground
      const radius = 25;
      const targetY = 4 * Math.sin(cameraAngle.current.phi);
      const targetDist = radius * Math.cos(cameraAngle.current.phi);
      
      if (!userInteracted.current) {
        camera.position.x = targetDist * Math.sin(cameraAngle.current.theta + Math.sin(time * 0.15) * 0.04);
        camera.position.z = targetDist * Math.cos(cameraAngle.current.theta + Math.sin(time * 0.15) * 0.04);
      } else {
        camera.position.x = targetDist * Math.sin(cameraAngle.current.theta);
        camera.position.z = targetDist * Math.cos(cameraAngle.current.theta);
      }
      camera.position.y = Math.max(0.6, targetY + 2.0);
      camera.lookAt(0, -0.4, 0);

      // Packet halo pulse
      if (packetMeshRef.current && packetMeshRef.current.visible) {
        packetHalo.scale.setScalar(1 + 0.25 * Math.sin(time * 8));
      }

      renderer.render(scene, camera);
    };

    animate();

    // RESIZE & INTERACTION
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 480;
      const asp = w / h;
      camera.aspect = asp;
      camera.fov = asp < 1.2 ? 56 : 40;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    const onMouseDown = (e) => {
      isDragging.current = true;
      userInteracted.current = true;
      prevMousePos.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseMove = (e) => {
      if (!isDragging.current) return;
      const dx = e.clientX - prevMousePos.current.x;
      const dy = e.clientY - prevMousePos.current.y;
      cameraAngle.current.theta -= dx * 0.006;
      cameraAngle.current.phi = Math.max(0.05, Math.min(1.1, cameraAngle.current.phi + dy * 0.006));
      prevMousePos.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseUp = () => {
      isDragging.current = false;
    };

    // Touch handlers for mobile
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging.current = true;
        userInteracted.current = true;
        prevMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchMove = (e) => {
      if (!isDragging.current || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - prevMousePos.current.x;
      const dy = e.touches[0].clientY - prevMousePos.current.y;
      cameraAngle.current.theta -= dx * 0.006;
      cameraAngle.current.phi = Math.max(0.05, Math.min(1.1, cameraAngle.current.phi + dy * 0.006));
      prevMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTouchEnd = () => {
      isDragging.current = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    domEl.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      window.removeEventListener('resize', handleResize);
      domEl.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domEl.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      cancelAnimationFrame(animFrameId.current);
      renderer.dispose();
    };
  }, [mode]);

  /**
   * CONTINUOUS TIME UPDATE (FRAME-BY-FRAME SMOOTH LERP)
   */
  useEffect(() => {
    if (!sceneRef.current || splineRef.current == null) return;

    const t = currentTime;
    const progress = Math.min(1, Math.max(0, t / (duration || 24)));

    const isDisaster = t < 4;
    const isSendingPacket = t >= 4 && t < 14;
    const isDashboardAlert = t >= 13 && t < 17;
    const isRescueDriving = t >= 16 && t < 20.5;
    const isSaved = t >= 20.0;

    // 1. SURVIVOR AVATAR ANIMATION
    if (survivorRef.current) {
      const { group, armL, armR, auraRing, checkIcon, flare } = survivorRef.current;
      
      if (isDisaster) {
        armL.rotation.z = Math.PI * 0.75 + Math.sin(t * 10) * 0.4;
        armR.rotation.z = -Math.PI * 0.75 - Math.sin(t * 10) * 0.4;
        auraRing.material.color.setHex(0xef4444);
        auraRing.visible = true;
        auraRing.scale.setScalar(1 + 0.3 * Math.sin(t * 8));
        checkIcon.visible = false;
        if (flare) flare.material.emissiveIntensity = 2.0 + Math.sin(t * 12);
        group.position.y = -1.8;
      } else if (isSaved) {
        armL.rotation.z = Math.PI * 0.85;
        armR.rotation.z = -Math.PI * 0.85;
        group.position.y = -1.8 + Math.sin(t * 6) * 0.22;
        auraRing.material.color.setHex(0x10b981);
        auraRing.visible = true;
        auraRing.scale.setScalar(1.2 + 0.2 * Math.sin(t * 4));
        checkIcon.visible = true;
        checkIcon.rotation.y = t * 2.5;
        if (flare) {
          flare.material.color.setHex(0x10b981);
          flare.material.emissive.setHex(0x10b981);
        }
      } else {
        armL.rotation.z = 0.2;
        armR.rotation.z = -0.2;
        group.position.y = -1.8;
        auraRing.visible = false;
        checkIcon.visible = false;
      }
    }

    // 2. CONTINUOUS PACKET GLIDE (4s to 14s)
    if (packetMeshRef.current) {
      const packet = packetMeshRef.current;
      if (isSendingPacket) {
        packet.visible = true;
        const packetT = Math.min(1, Math.max(0, (t - 4) / 10));
        const pos = splineRef.current.getPointAt(packetT);
        packet.position.copy(pos);
        // Smooth Color Shift: Red beacon -> Neon Cyan LoRa hops -> Emerald saved
        const packetColor = packetT < 0.2 ? 0xef4444 : packetT < 0.8 ? 0x00f0ff : 0x10b981;
        packet.material.color.setHex(packetColor);
        packet.material.emissive.setHex(packetColor);
        if (packet.children && packet.children[0]) {
          packet.children[0].material.color.setHex(packetColor);
        }
      } else {
        packet.visible = false;
      }
    }

    // 3. LORA RF SIGNAL WAVES (8s to 13s)
    const isLoRaActive = t >= 8 && t < 13;
    signalRingsRef.current.forEach((item, idx) => {
      item.mesh.visible = isLoRaActive;
      if (isLoRaActive) {
        const ringProg = ((t * 1.6 + item.offset) % 1);
        const centerPos = t < 10.5 ? -5.2 : 0;
        item.mesh.position.set(centerPos, 0.9, 0);
        const scale = 1 + ringProg * 9;
        item.mesh.scale.set(scale, scale, 1);
        item.mesh.material.opacity = Math.max(0, (1 - ringProg) * 0.9);
      }
    });

    // 4. RESCUE ROVER (16s to 24s)
    if (rescueRoverRef.current) {
      const rover = rescueRoverRef.current;
      rover.visible = t >= 13;

      if (isRescueDriving) {
        const driveProg = Math.min(1, (t - 16) / 4.5);
        const smoothProg = driveProg * driveProg * (3 - 2 * driveProg);
        rover.position.x = 13.5 + (-11.6 - 13.5) * smoothProg;
        rover.position.y = -1.8;
        rover.position.z = 0.5 + Math.sin(smoothProg * Math.PI) * 0.8;
        rover.rotation.y = Math.PI;
        rover.userData.siren.material.emissiveIntensity = 2.0 + Math.sin(t * 16);
      } else if (isSaved) {
        rover.position.x = -11.6;
        rover.position.y = -1.8;
        rover.position.z = 0.5;
        rover.rotation.y = Math.PI * 0.85;
        rover.userData.siren.material.color.setHex(0x10b981);
        rover.userData.siren.material.emissive.setHex(0x10b981);
      } else {
        rover.position.set(13.5, -1.8, 0.5);
        rover.rotation.y = -Math.PI / 2;
      }
    }

    // 5. CELEBRATION FIREWORKS / CONFETTI (20s to 24s)
    celebrationParticlesRef.current.forEach((p, idx) => {
      p.mesh.visible = isSaved;
      if (isSaved) {
        const timeInSave = t - 20;
        p.mesh.position.x = -13.5 + p.vx * Math.sin(timeInSave * 2 + idx);
        p.mesh.position.y = -1.5 + (p.vy * timeInSave) % 7.5;
        p.mesh.position.z = p.vz * Math.cos(timeInSave * 2 + idx);
        p.mesh.rotation.x += p.rotSpeed * 0.05;
        p.mesh.rotation.y += p.rotSpeed * 0.05;
      }
    });

    // 6. NODE HIGHLIGHTS & LIVE STATUS TELEMETRY
    Object.keys(nodesRef.current).forEach((nodeId) => {
      const node = nodesRef.current[nodeId];
      if (!node) return;
      let active = false;
      if (nodeId === 'phone' && (isDisaster || t < 8 || isSaved)) active = true;
      if (nodeId === 'node1' && t >= 4 && t < 10) active = true;
      if (nodeId === 'node2' && t >= 8 && t < 13) active = true;
      if (nodeId === 'node3' && t >= 11 && t < 16) active = true;
      if (nodeId === 'dashboard' && (isDashboardAlert || isRescueDriving || isSaved)) active = true;

      if (nodeId === 'phone') {
        if (node.statusLed) node.statusLed.material.color.setHex(active ? 0x10b981 : 0xef4444);
        if (node.sosRing) node.sosRing.scale.setScalar(1 + 0.25 * Math.sin(t * 8));
      } else if (nodeId === 'dashboard') {
        if (node.statusLed) {
          if (isSaved) {
            node.statusLed.material.color.setHex(0x10b981);
            node.statusLed.material.emissive.setHex(0x10b981);
            if (node.pinRing) node.pinRing.material.color.setHex(0x10b981);
          } else if (active) {
            node.statusLed.material.color.setHex(0xef4444);
            node.statusLed.material.emissive.setHex(0xff0000);
            if (node.pinRing) {
              node.pinRing.material.color.setHex(0xef4444);
              node.pinRing.scale.setScalar(1 + 0.35 * Math.sin(t * 10));
            }
          } else {
            node.statusLed.material.color.setHex(0x38bdf8);
            node.statusLed.material.emissive.setHex(0x0284c7);
          }
        }
      } else {
        if (node.statusLed) {
          if (isSaved) {
            node.statusLed.material.color.setHex(0x10b981);
            node.statusLed.material.emissive.setHex(0x10b981);
          } else if (active) {
            node.statusLed.material.color.setHex(0x00f0ff);
            node.statusLed.material.emissive.setHex(0x00f0ff);
            node.statusLed.material.emissiveIntensity = 2.2;
          } else {
            node.statusLed.material.color.setHex(0xf59e0b);
            node.statusLed.material.emissive.setHex(0xd97706);
            node.statusLed.material.emissiveIntensity = 0.8;
          }
        }
      }
    });

  }, [currentTime, duration]);

  /**
   * Builds the 3D scene with high-contrast, tactical SAR emergency hardware models
   */
  function build3DScene(scene) {
    // 1. SURVIVOR 3D MODEL (Search & Rescue High-Vis Weather Jacket + Reflective Bands)
    const survivorGroup = new THREE.Group();
    survivorGroup.position.set(-13.5, -1.8, 0);

    const torso = new THREE.Mesh(
      new THREE.CylinderGeometry(0.42, 0.48, 1.3, 16),
      new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.4 })
    );
    torso.position.y = 1.2;
    torso.castShadow = true;
    survivorGroup.add(torso);

    // Reflective Silver Safety Bands across chest
    const refBand1 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.45, 0.46, 0.12, 16),
      new THREE.MeshStandardMaterial({ color: 0xf8fafc, metalness: 0.9, roughness: 0.1 })
    );
    refBand1.position.y = 1.45;
    survivorGroup.add(refBand1);

    const refBand2 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.46, 0.47, 0.12, 16),
      new THREE.MeshStandardMaterial({ color: 0xf8fafc, metalness: 0.9, roughness: 0.1 })
    );
    refBand2.position.y = 1.1;
    survivorGroup.add(refBand2);

    // Head with Protective Weather Hood
    const hood = new THREE.Mesh(
      new THREE.SphereGeometry(0.38, 20, 20),
      new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.5 })
    );
    hood.position.y = 2.1;
    survivorGroup.add(hood);

    const face = new THREE.Mesh(
      new THREE.SphereGeometry(0.26, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0xfde68a, roughness: 0.3 })
    );
    face.position.set(0, 2.05, 0.16);
    survivorGroup.add(face);

    // Glowing Emergency Headlamp on forehead
    const headlamp = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.1, 0.12, 16),
      new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 2.5 })
    );
    headlamp.rotation.x = Math.PI / 2;
    headlamp.position.set(0, 2.25, 0.34);
    survivorGroup.add(headlamp);

    // Arms (Rescue orange with reflective cuffs)
    const armGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.8, 8);
    const armMat = new THREE.MeshStandardMaterial({ color: 0xf97316 });
    
    const armL = new THREE.Mesh(armGeo, armMat);
    armL.position.set(-0.55, 1.4, 0);
    survivorGroup.add(armL);

    const armR = new THREE.Mesh(armGeo, armMat);
    armR.position.set(0.55, 1.4, 0);
    survivorGroup.add(armR);

    // Glowing Distress Flare/Strobe in hand
    const flare = new THREE.Mesh(
      new THREE.SphereGeometry(0.18, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xef4444, emissiveIntensity: 2.2 })
    );
    flare.position.set(0.65, 1.9, 0.1);
    survivorGroup.add(flare);

    // Legs (Tactical dark slate trousers)
    const legGeo = new THREE.CylinderGeometry(0.16, 0.16, 1.0, 8);
    const legMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.7 });
    const legL = new THREE.Mesh(legGeo, legMat);
    legL.position.set(-0.22, 0.5, 0);
    survivorGroup.add(legL);
    const legR = new THREE.Mesh(legGeo, legMat);
    legR.position.set(0.22, 0.5, 0);
    survivorGroup.add(legR);

    // Rescue aura ring at ground level
    const ringGeo = new THREE.RingGeometry(0.9, 1.25, 32);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xef4444, side: THREE.DoubleSide, transparent: true, opacity: 0.8 });
    const auraRing = new THREE.Mesh(ringGeo, ringMat);
    auraRing.rotation.x = Math.PI / 2;
    auraRing.position.y = 0.05;
    survivorGroup.add(auraRing);

    // Success check icon
    const checkGroup = new THREE.Group();
    const checkMesh1 = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.65, 0.15), new THREE.MeshBasicMaterial({ color: 0x10b981 }));
    checkMesh1.rotation.z = -Math.PI / 4;
    const checkMesh2 = new THREE.Mesh(new THREE.BoxGeometry(0.22, 1.1, 0.15), new THREE.MeshBasicMaterial({ color: 0x10b981 }));
    checkMesh2.position.set(0.35, 0.18, 0);
    checkMesh2.rotation.z = Math.PI / 4;
    checkGroup.add(checkMesh1);
    checkGroup.add(checkMesh2);
    checkGroup.position.set(0, 3.0, 0);
    checkGroup.visible = false;
    survivorGroup.add(checkGroup);

    survivorRef.current = { group: survivorGroup, armL, armR, auraRing, checkIcon: checkGroup, flare };
    scene.add(survivorGroup);

    // 2. HARDWARE STAGE (Phone, 3 LoRa Nodes, Command Laptop)
    const phonePos = new THREE.Vector3(-10.5, -0.8, 0);
    const node1Pos = new THREE.Vector3(-5.2, -0.8, 0);
    const node2Pos = new THREE.Vector3(0, -0.8, 0);
    const node3Pos = new THREE.Vector3(5.2, -0.8, 0);
    const dashPos = new THREE.Vector3(10.5, -0.8, 0);

    const phone = createPhoneMesh(scene, phonePos);
    const node1 = createESP32Mesh(scene, node1Pos);
    const node2 = createESP32Mesh(scene, node2Pos);
    const node3 = createESP32Mesh(scene, node3Pos);
    const dash = createLaptopMesh(scene, dashPos);

    nodesRef.current['phone'] = phone;
    nodesRef.current['node1'] = node1;
    nodesRef.current['node2'] = node2;
    nodesRef.current['node3'] = node3;
    nodesRef.current['dashboard'] = dash;

    createGuideCurve(scene, phonePos, node1Pos);
    createGuideCurve(scene, node1Pos, node2Pos);
    createGuideCurve(scene, node2Pos, node3Pos);
    createGuideCurve(scene, node3Pos, dashPos);

    // 3. 3D RESCUE SQUAD ROVER (Tactical SAR All-Terrain Vehicle)
    const roverGroup = new THREE.Group();
    
    // Lower Chassis (Reinforced Dark Tactical Slate)
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(2.8, 0.9, 1.6),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.6, roughness: 0.4 })
    );
    body.position.y = 0.55;
    body.castShadow = true;
    roverGroup.add(body);

    // Upper Cabin (High-Vis SAR Rescue Orange & Alpine White)
    const cabin = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 0.75, 1.4),
      new THREE.MeshStandardMaterial({ color: 0xf97316, metalness: 0.2, roughness: 0.3 })
    );
    cabin.position.set(-0.25, 1.25, 0);
    roverGroup.add(cabin);

    // White Rescue Decal Panels on sides
    const sidePanelL = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.5), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    sidePanelL.position.set(-0.25, 1.25, 0.71);
    roverGroup.add(sidePanelL);
    const sidePanelR = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.5), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    sidePanelR.position.set(-0.25, 1.25, -0.71);
    sidePanelR.rotation.y = Math.PI;
    roverGroup.add(sidePanelR);

    // Emergency Red Crosses on sides
    const crossH = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.12, 0.05), new THREE.MeshBasicMaterial({ color: 0xdc2626 }));
    crossH.position.set(-0.25, 1.25, 0.72);
    roverGroup.add(crossH);
    const crossV = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.45, 0.05), new THREE.MeshBasicMaterial({ color: 0xdc2626 }));
    crossV.position.set(-0.25, 1.25, 0.72);
    roverGroup.add(crossV);

    // Front Searchlights (Warm High-Intensity LED)
    const lightL = new THREE.Mesh(
      new THREE.CylinderGeometry(0.16, 0.16, 0.15, 16),
      new THREE.MeshStandardMaterial({ color: 0xfffaed, emissive: 0xfffaed, emissiveIntensity: 2.5 })
    );
    lightL.rotation.z = Math.PI / 2;
    lightL.position.set(1.4, 0.55, 0.5);
    roverGroup.add(lightL);

    const lightR = new THREE.Mesh(
      new THREE.CylinderGeometry(0.16, 0.16, 0.15, 16),
      new THREE.MeshStandardMaterial({ color: 0xfffaed, emissive: 0xfffaed, emissiveIntensity: 2.5 })
    );
    lightR.rotation.z = Math.PI / 2;
    lightR.position.set(1.4, 0.55, -0.5);
    roverGroup.add(lightR);

    // Rooftop Emergency Lightbar (Dual flashing sapphire/ruby strobes)
    const lightbar = new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 0.18, 0.9),
      new THREE.MeshStandardMaterial({ color: 0x10b981, emissive: 0x10b981, emissiveIntensity: 1.8 })
    );
    lightbar.position.set(-0.25, 1.72, 0);
    roverGroup.add(lightbar);

    // Deep-Tread Mud Tires with Silver Lug Hubs
    const wheelGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.35, 20);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.9 });
    const hubGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.37, 12);
    const hubMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.9, roughness: 0.2 });

    const wheelPositions = [
      [-0.9, 0.15, 0.85], [0.9, 0.15, 0.85],
      [-0.9, 0.15, -0.85], [0.9, 0.15, -0.85]
    ];
    wheelPositions.forEach(([x, y, z]) => {
      const w = new THREE.Mesh(wheelGeo, wheelMat);
      w.rotation.x = Math.PI / 2;
      w.position.set(x, y, z);
      const hub = new THREE.Mesh(hubGeo, hubMat);
      hub.rotation.x = Math.PI / 2;
      hub.position.set(x, y, z);
      roverGroup.add(w);
      roverGroup.add(hub);
    });

    roverGroup.userData = { siren: lightbar };
    roverGroup.position.set(13.5, -1.8, 0.5);
    rescueRoverRef.current = roverGroup;
    scene.add(roverGroup);
  }

  function createPhoneMesh(scene, pos) {
    const group = new THREE.Group();
    group.position.copy(pos);

    // 1. Titanium Frame & Glass Body
    const phoneBody = new THREE.Mesh(
      new THREE.BoxGeometry(2.1, 4.2, 0.22),
      new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.9, roughness: 0.2 })
    );
    phoneBody.castShadow = true;
    group.add(phoneBody);

    const bezel = new THREE.Mesh(
      new THREE.BoxGeometry(1.96, 4.06, 0.24),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.5 })
    );
    group.add(bezel);

    // 2. AMOLED Emergency Screen
    const screen = new THREE.Mesh(
      new THREE.PlaneGeometry(1.88, 3.96),
      new THREE.MeshBasicMaterial({ color: 0x020617 })
    );
    screen.position.z = 0.13;
    group.add(screen);

    // 3. Top Header Status Bar
    const headerBar = new THREE.Mesh(
      new THREE.PlaneGeometry(1.6, 0.35),
      new THREE.MeshBasicMaterial({ color: 0x1e293b })
    );
    headerBar.position.set(0, 1.6, 0.135);
    group.add(headerBar);

    const netLed = new THREE.Mesh(
      new THREE.CircleGeometry(0.08, 16),
      new THREE.MeshBasicMaterial({ color: 0xef4444 })
    );
    netLed.position.set(-0.6, 1.6, 0.14);
    group.add(netLed);

    // 4. Glowing Red SOS Emergency Button
    const sosOuterRing = new THREE.Mesh(
      new THREE.RingGeometry(0.52, 0.64, 32),
      new THREE.MeshBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0.85 })
    );
    sosOuterRing.position.set(0, -0.3, 0.135);
    group.add(sosOuterRing);

    const sosBtn = new THREE.Mesh(
      new THREE.CircleGeometry(0.48, 32),
      new THREE.MeshStandardMaterial({ 
        color: 0xdc2626, 
        emissive: 0xb91c1c, 
        emissiveIntensity: 0.9,
        roughness: 0.2 
      })
    );
    sosBtn.position.set(0, -0.3, 0.14);
    group.add(sosBtn);

    // Cross icon on SOS button
    const crossH = new THREE.Mesh(new THREE.PlaneGeometry(0.35, 0.1), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    crossH.position.set(0, -0.3, 0.145);
    group.add(crossH);
    const crossV = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 0.35), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    crossV.position.set(0, -0.3, 0.145);
    group.add(crossV);

    scene.add(group);
    return { group, phoneBody, statusLed: netLed, sosBtn, sosRing: sosOuterRing };
  }

  function createESP32Mesh(scene, pos) {
    const group = new THREE.Group();
    group.position.copy(pos);

    // 1. Rugged Weatherproof IP67 Field Enclosure (High-Vis Tactical Rescue Orange)
    const enclosure = new THREE.Mesh(
      new THREE.BoxGeometry(2.4, 0.45, 3.5),
      new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.35, metalness: 0.15 })
    );
    enclosure.castShadow = true;
    group.add(enclosure);

    // 2. Rubberized Protective Bumper Base
    const bumper = new THREE.Mesh(
      new THREE.BoxGeometry(2.5, 0.2, 3.6),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.8 })
    );
    bumper.position.y = -0.15;
    group.add(bumper);

    // 3. Technical Recessed Faceplate
    const faceplate = new THREE.Mesh(
      new THREE.BoxGeometry(2.0, 0.08, 3.0),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4 })
    );
    faceplate.position.y = 0.22;
    group.add(faceplate);

    // 4. Polished Silver SX1278 LoRa RF Shield Can (Brushed Nickel)
    const loraCan = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 0.22, 1.2),
      new THREE.MeshStandardMaterial({ color: 0xf1f5f9, metalness: 0.95, roughness: 0.1 })
    );
    loraCan.position.set(0, 0.34, -0.6);
    group.add(loraCan);

    // 5. Glowing Cyan Mini OLED Telemetry Display
    const oled = new THREE.Mesh(
      new THREE.PlaneGeometry(1.4, 0.7),
      new THREE.MeshBasicMaterial({ color: 0x00f0ff })
    );
    oled.rotation.x = -Math.PI / 2;
    oled.position.set(0, 0.27, 0.6);
    group.add(oled);

    // 6. Gold/Brass RP-SMA Antenna Connector
    const smaNut = new THREE.Mesh(
      new THREE.CylinderGeometry(0.18, 0.18, 0.35, 8),
      new THREE.MeshStandardMaterial({ color: 0xeab308, metalness: 0.95, roughness: 0.2 })
    );
    smaNut.position.set(0.65, 0.4, 1.15);
    group.add(smaNut);

    // 7. Tactical High-Gain 433 MHz Rubber-Ducky Antenna
    const antenna = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.14, 2.8, 16),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.6 })
    );
    antenna.position.set(0.65, 1.8, 1.15);
    antenna.castShadow = true;
    group.add(antenna);

    const band = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.12, 0.2, 16),
      new THREE.MeshBasicMaterial({ color: 0xf97316 })
    );
    band.position.set(0.65, 0.95, 1.15);
    group.add(band);

    // 8. Live Activity LED (Dual color: Amber standby / Emerald flashing)
    const led = new THREE.Mesh(
      new THREE.SphereGeometry(0.14, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0x10b981, emissive: 0x10b981, emissiveIntensity: 1.2 })
    );
    led.position.set(-0.65, 0.32, -1.05);
    group.add(led);

    scene.add(group);
    return { group, enclosure, statusLed: led, oled };
  }

  function createLaptopMesh(scene, pos) {
    const group = new THREE.Group();
    group.position.copy(pos);

    // 1. Rugged Titanium & Carbon Base Chassis (Toughbook military style)
    const base = new THREE.Mesh(
      new THREE.BoxGeometry(3.6, 0.24, 2.6),
      new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8, roughness: 0.3 })
    );
    base.position.set(0, -0.12, 0.3);
    group.add(base);

    // 2. Reinforced Rubber Corner Bumpers
    const bumperCorners = [
      [-1.75, 1.25], [1.75, 1.25], [-1.75, -0.95], [1.75, -0.95]
    ];
    bumperCorners.forEach(([bx, bz]) => {
      const bCorner = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, 0.3, 0.3),
        new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.9 })
      );
      bCorner.position.set(bx, -0.12, bz + 0.3);
      group.add(bCorner);
    });

    // 3. Backlit Keyboard Panel (Cyan illuminated keys)
    const kbPanel = new THREE.Mesh(
      new THREE.PlaneGeometry(3.0, 1.5),
      new THREE.MeshStandardMaterial({ color: 0x0284c7, emissive: 0x0284c7, emissiveIntensity: 0.4, roughness: 0.5 })
    );
    kbPanel.rotation.x = -Math.PI / 2;
    kbPanel.position.set(0, 0.01, 0.45);
    group.add(kbPanel);

    // 4. Rugged Screen Lid Assembly
    const screenLid = new THREE.Group();
    screenLid.position.set(0, 0.0, -0.95);

    const lidBezel = new THREE.Mesh(
      new THREE.BoxGeometry(3.6, 2.5, 0.16),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.3 })
    );
    lidBezel.position.set(0, 1.25, 0);
    screenLid.add(lidBezel);

    // 5. Tactical GIS Rescue Map Screen
    const display = new THREE.Mesh(
      new THREE.PlaneGeometry(3.3, 2.2),
      new THREE.MeshBasicMaterial({ color: 0x071e3d })
    );
    display.position.set(0, 1.25, 0.09);
    screenLid.add(display);

    // Topographic Grid lines on screen
    const gridLineH = new THREE.Mesh(new THREE.PlaneGeometry(3.1, 0.03), new THREE.MeshBasicMaterial({ color: 0x0284c7 }));
    gridLineH.position.set(0, 1.25, 0.1);
    screenLid.add(gridLineH);
    const gridLineV = new THREE.Mesh(new THREE.PlaneGeometry(0.03, 2.0), new THREE.MeshBasicMaterial({ color: 0x0284c7 }));
    gridLineV.position.set(0, 1.25, 0.1);
    screenLid.add(gridLineV);

    // 6. Flashing Ruby-Red Survivor Distress GPS Pin
    const pinRing = new THREE.Mesh(
      new THREE.RingGeometry(0.28, 0.38, 24),
      new THREE.MeshBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0.9 })
    );
    pinRing.position.set(0.5, 1.35, 0.105);
    screenLid.add(pinRing);

    const pin = new THREE.Mesh(
      new THREE.CircleGeometry(0.22, 24),
      new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xff0000, emissiveIntensity: 1.8 })
    );
    pin.position.set(0.5, 1.35, 0.11);
    screenLid.add(pin);

    screenLid.rotation.x = 0.22;
    group.add(screenLid);

    scene.add(group);
    return { group, base, statusLed: pin, pinRing, display };
  }

  function createGuideCurve(scene, start, end) {
    const points = [
      new THREE.Vector3(start.x, start.y + 0.4, 0),
      new THREE.Vector3((start.x + end.x) / 2, start.y + 1.8, 0),
      new THREE.Vector3(end.x, end.y + 0.4, 0)
    ];
    const curve = new THREE.QuadraticBezierCurve3(points[0], points[1], points[2]);
    const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(24));
    const mat = new THREE.LineDashedMaterial({
      color: 0x00f0ff,
      dashSize: 0.5,
      gapSize: 0.25,
      transparent: true,
      opacity: 0.85,
    });
    const line = new THREE.Line(geo, mat);
    line.computeLineDistances();
    scene.add(line);
  }

  return (
    <div className="relative w-full h-[320px] xs:h-[370px] sm:h-[420px] md:h-[480px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-clean-lg border border-surface-border bg-slate-900 touch-pan-y">
      {/* 2D Disaster Background: Storm-Ravaged Flooded Ruins */}
      <img
        src="/assets/storm-ravaged-flooded-ruins.png"
        alt="Storm-Ravaged Flooded Ruins Disaster Backdrop"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none z-0 brightness-95 contrast-[1.05]"
      />

      {/* Atmospheric vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/20 pointer-events-none z-0" />

      {/* 3D WebGL Canvas */}
      <div ref={containerRef} className="relative w-full h-full cursor-grab active:cursor-grabbing z-10" />

      {/* Responsive Dynamic Status Badges in Light Theme */}
      <div className="absolute top-2.5 sm:top-4 inset-x-2.5 sm:inset-x-4 flex items-center justify-between gap-2 pointer-events-none select-none z-20">
        <div className="bg-white/90 backdrop-blur-md px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl shadow-sm border border-slate-200 text-[10px] sm:text-xs text-navy font-bold flex items-center space-x-1.5 sm:space-x-2.5 truncate max-w-[70%] sm:max-w-none">
          <span className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full flex-shrink-0 ${
            currentTime >= 20 ? 'bg-emerald-500 animate-bounce' : 'bg-resqblue animate-pulse'
          }`}></span>
          <span className="truncate">
            {currentTime < 4
              ? '⚠️ Catastrophic Outage • Cut Off'
              : currentTime < 14
              ? '📡 LoRa Sub-GHz Mesh In-Flight'
              : currentTime < 16
              ? '💻 Command Console Received SOS'
              : currentTime < 20
              ? '🚁 Rescue Squad En Route'
              : '🎉 SURVIVOR SAVED!'}
          </span>
        </div>

        {/* Disaster Zone Badge */}
        <div className="bg-white/85 backdrop-blur-md px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-slate-200 text-[9px] sm:text-[11px] font-bold text-navy flex items-center space-x-1 sm:space-x-1.5 shadow-sm flex-shrink-0">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emergency animate-pulse flex-shrink-0"></span>
          <span className="hidden xs:inline">Disaster Zone: Flooded Ruins</span>
          <span className="xs:hidden">Disaster Zone</span>
        </div>
      </div>

      {/* Floating 3D Hint */}
      <div className="absolute bottom-2.5 sm:bottom-4 right-2.5 sm:right-4 bg-white/85 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-slate-200 text-[10px] sm:text-[11px] text-resqtext-secondary flex items-center space-x-1.5 pointer-events-none select-none shadow-sm z-20">
        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-resqblue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" strokeDasharray="30" strokeLinecap="round" />
        </svg>
        <span>Drag to inspect 3D view</span>
      </div>
    </div>
  );
}
