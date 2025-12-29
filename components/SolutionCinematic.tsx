import React, { useLayoutEffect, useRef, Suspense, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

// ============================================
// 3D DRONE MODELS
// ============================================

// Scout 3D Model (Quadcopter)
function ScoutModel({ isHovered }: { isHovered: boolean }) {
  const meshRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/quad-copter-drone/source/model.glb');

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
      // Subtle hover scale effect
      const targetScale = isHovered ? 2.3 : 2.0;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return <primitive ref={meshRef} object={scene} scale={2.0} rotation={[0.2, 0, 0]} position={[0, 0, 0]} />;
}

// Ranger 3D Model (Fixed-Wing)
function RangerModel({ isHovered }: { isHovered: boolean }) {
  const meshRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/80-followers-iranian-shahed-136-drone/source/scene.gltf');

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      meshRef.current.rotation.y -= 0.002;
      // Subtle hover scale effect
      const targetScale = isHovered ? 2.8 : 2.5;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return <primitive ref={meshRef} object={scene} scale={2.5} rotation={[0.2, Math.PI, 0]} position={[0, 0, 0]} />;
}

// ============================================
// FEATURES DATA
// ============================================

const FEATURES = [
  {
    tag: '01 // FUSION',
    title: 'ONE MAP.',
    description: 'See thermal, depth, and video in one live view.',
    icon: 'layers',
  },
  {
    tag: '02 // OFFLINE',
    title: 'NO CLOUD.',
    description: 'Works without internet. Drones talk to each other directly.',
    icon: 'cloud-off',
  },
  {
    tag: '03 // AUTONOMY',
    title: 'SWARM IQ.',
    description: 'Drones search on their own. You focus on the mission.',
    icon: 'brain',
  },
  {
    tag: '04 // HOT-SWAP',
    title: 'MODULAR PODS.',
    description: 'Swap sensors in seconds. One drone, many missions.',
    icon: 'puzzle',
  },
];

// ============================================
// DRONE INFO DATA
// ============================================

const DRONE_INFO = {
  ranger: {
    name: 'RANGER',
    type: 'Fixed-Wing UAV',
    specs: [
      '> Watches from above',
      '> Combines all data',
      '> Keeps drones connected',
      '> Long-range coverage',
    ],
  },
  scout: {
    name: 'SCOUT',
    type: 'Quadcopter UAV',
    specs: [
      '> Goes into buildings',
      '> Sees heat, video, and depth',
      '> Works without GPS',
      '> Tight-space navigation',
    ],
  },
};

// ============================================
// MAIN COMPONENT
// ============================================

const SolutionCinematic: React.FC = () => {
  const componentRef = useRef<HTMLDivElement>(null);

  // Scene refs
  const scene1Ref = useRef<HTMLDivElement>(null);
  const scene2Ref = useRef<HTMLDivElement>(null);
  const scene3Ref = useRef<HTMLDivElement>(null);
  const scene4Ref = useRef<HTMLDivElement>(null);
  const scene5Ref = useRef<HTMLDivElement>(null);
  const scene6Ref = useRef<HTMLDivElement>(null);
  const scene7Ref = useRef<HTMLDivElement>(null);

  // Hover states for drones
  const [hoveredDrone, setHoveredDrone] = useState<string | null>(null);
  const [activeDrone, setActiveDrone] = useState<string | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Main timeline - 900% scroll for 8+ scenes
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: componentRef.current,
          start: "top top",
          end: "+=900%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      });

      // ========================================
      // SCENE 1: "OUR SOLUTION?" (0 - 1.5)
      // ========================================

      // Initial blur-focus reveal
      tl.fromTo('.scene1-title',
        {
          filter: 'blur(40px)',
          scale: 0.85,
          opacity: 0,
        },
        {
          filter: 'blur(0px)',
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "expo.out",
        },
        0
      );

      // Question mark pulses with accent
      tl.fromTo('.scene1-question',
        { color: '#F0F0F0' },
        {
          color: '#FF2A00',
          duration: 0.4,
          ease: "power2.inOut",
        },
        0.8
      );

      // Hold then zoom past camera
      tl.to('.scene1-title', {
        scale: 15,
        opacity: 0,
        filter: 'blur(20px)',
        duration: 1.0,
        ease: "power2.in",
      }, 1.3);

      // Fade out scene 1
      tl.to(scene1Ref.current, {
        autoAlpha: 0,
        duration: 0.3,
      }, 1.5);

      // ========================================
      // SCENE 2: "AERIS ALPHA" (1.5 - 3.0)
      // ========================================

      // Scene 2 fades in
      tl.fromTo(scene2Ref.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.4 },
        1.5
      );

      // AERIS ALPHA kinetic reveal
      tl.fromTo('.scene2-title',
        {
          filter: 'blur(30px)',
          y: 80,
          opacity: 0,
        },
        {
          filter: 'blur(0px)',
          y: 0,
          opacity: 1,
          duration: 1.4,
          ease: "expo.out",
        },
        1.8
      );

      // Accent line draws
      tl.fromTo('.scene2-line',
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 0.8, ease: "expo.inOut" },
        2.2
      );

      // Tagline fades in
      tl.fromTo('.scene2-tagline',
        {
          opacity: 0,
          y: 30,
          filter: 'blur(4px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.0,
          ease: "expo.out",
        },
        2.4
      );

      // Hold then exit
      tl.to(scene2Ref.current, {
        scale: 1.05,
        filter: "blur(15px)",
        opacity: 0,
        duration: 0.8,
        ease: "expo.in",
      }, 3.2);

      // ========================================
      // SCENE 3: DRONE SHOWCASE (3.0 - 5.5)
      // ========================================

      // Scene 3 fades in
      tl.fromTo(scene3Ref.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.5 },
        3.2
      );

      // Technical grid appears
      tl.fromTo('.scene3-grid',
        { opacity: 0 },
        { opacity: 0.3, duration: 0.8, ease: "power2.out" },
        3.4
      );

      // "THE SYSTEM" header
      tl.fromTo('.scene3-header',
        {
          opacity: 0,
          y: -30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "expo.out",
        },
        3.5
      );

      // Ranger (top) flies in from above
      tl.fromTo('.drone-ranger',
        {
          opacity: 0,
          y: -100,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "expo.out",
        },
        3.8
      );

      // Scouts fly in from sides
      tl.fromTo('.drone-scout-left',
        {
          opacity: 0,
          x: -150,
          scale: 0.8,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.0,
          ease: "expo.out",
        },
        4.2
      );

      tl.fromTo('.drone-scout-right',
        {
          opacity: 0,
          x: 150,
          scale: 0.8,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.0,
          ease: "expo.out",
        },
        4.3
      );

      // Connection lines draw between drones
      tl.fromTo('.connection-line',
        { scaleY: 0, transformOrigin: "top" },
        { scaleY: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
        4.6
      );

      // Drone labels appear
      tl.fromTo('.drone-label',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "expo.out" },
        4.8
      );

      // Hold the showcase
      tl.to({}, { duration: 0.8 });

      // Scene 3 exits
      tl.to(scene3Ref.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.6,
        ease: "power2.in",
      }, 5.8);

      // ========================================
      // SCENES 4-7: FEATURES CASCADE (5.5 - 8.5)
      // ========================================

      // --- SCENE 4: ONE MAP ---
      tl.fromTo(scene4Ref.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.4 },
        5.8
      );

      tl.fromTo('.feature1-tag',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, ease: "expo.out" },
        6.0
      );

      tl.fromTo('.feature1-title',
        {
          filter: 'blur(20px)',
          scale: 0.9,
          opacity: 0,
        },
        {
          filter: 'blur(0px)',
          scale: 1,
          opacity: 1,
          duration: 1.0,
          ease: "expo.out",
        },
        6.1
      );

      tl.fromTo('.feature1-desc',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "expo.out" },
        6.4
      );

      tl.fromTo('.feature1-accent',
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 0.6, ease: "expo.inOut" },
        6.2
      );

      tl.to(scene4Ref.current, {
        x: '-100%',
        opacity: 0,
        duration: 0.6,
        ease: "power2.in",
      }, 6.8);

      // --- SCENE 5: NO CLOUD ---
      tl.fromTo(scene5Ref.current,
        { autoAlpha: 0, x: '50%' },
        { autoAlpha: 1, x: 0, duration: 0.6, ease: "expo.out" },
        6.8
      );

      tl.fromTo('.feature2-tag',
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.6, ease: "expo.out" },
        7.0
      );

      tl.fromTo('.feature2-title',
        {
          filter: 'blur(20px)',
          scale: 0.9,
          opacity: 0,
        },
        {
          filter: 'blur(0px)',
          scale: 1,
          opacity: 1,
          duration: 1.0,
          ease: "expo.out",
        },
        7.1
      );

      tl.fromTo('.feature2-desc',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "expo.out" },
        7.4
      );

      tl.to(scene5Ref.current, {
        scale: 1.1,
        filter: "blur(10px)",
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
      }, 7.6);

      // --- SCENE 6: SWARM IQ ---
      tl.fromTo(scene6Ref.current,
        { autoAlpha: 0, scale: 0.9 },
        { autoAlpha: 1, scale: 1, duration: 0.5, ease: "expo.out" },
        7.6
      );

      tl.fromTo('.feature3-tag',
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "expo.out" },
        7.8
      );

      tl.fromTo('.feature3-title',
        {
          filter: 'blur(20px)',
          scale: 0.9,
          opacity: 0,
        },
        {
          filter: 'blur(0px)',
          scale: 1,
          opacity: 1,
          duration: 1.0,
          ease: "expo.out",
        },
        7.9
      );

      tl.fromTo('.feature3-desc',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "expo.out" },
        8.2
      );

      tl.to(scene6Ref.current, {
        y: '-50%',
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
      }, 8.4);

      // --- SCENE 7: MODULAR PODS (Final, holds longer) ---
      tl.fromTo(scene7Ref.current,
        { autoAlpha: 0, y: '30%' },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "expo.out" },
        8.4
      );

      tl.fromTo('.feature4-tag',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, ease: "expo.out" },
        8.6
      );

      tl.fromTo('.feature4-title',
        {
          filter: 'blur(25px)',
          scale: 0.85,
          opacity: 0,
        },
        {
          filter: 'blur(0px)',
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "expo.out",
        },
        8.7
      );

      // Title color shift to accent for emphasis
      tl.to('.feature4-title', {
        color: '#FF2A00',
        duration: 0.4,
        ease: "power2.inOut",
      }, 9.2);

      tl.fromTo('.feature4-desc',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "expo.out" },
        9.0
      );

      tl.fromTo('.feature4-accent',
        { scaleY: 0, transformOrigin: "top" },
        { scaleY: 1, duration: 0.8, ease: "expo.inOut" },
        8.9
      );

      // Final hold
      tl.to({}, { duration: 0.5 });

    }, componentRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={componentRef} className="relative h-screen bg-brutal-bg text-brutal-fg overflow-hidden">

      {/* ========================================
          SCENE 1: OUR SOLUTION?
          ======================================== */}
      <div
        ref={scene1Ref}
        className="absolute inset-0 flex items-center justify-center z-40"
      >
        <h2 className="scene1-title font-sans font-black text-6xl md:text-8xl lg:text-[12vw] leading-none text-center tracking-tighter">
          OUR SOLUTION<span className="scene1-question">?</span>
        </h2>
      </div>

      {/* ========================================
          SCENE 2: AERIS ALPHA
          ======================================== */}
      <div
        ref={scene2Ref}
        className="absolute inset-0 flex flex-col items-center justify-center z-30 opacity-0 invisible"
      >
        <div className="text-center">
          <div className="scene2-line w-24 h-[2px] bg-brutal-accent mx-auto mb-8" />
          <h2 className="scene2-title font-sans font-black text-7xl md:text-9xl lg:text-[14vw] leading-none tracking-tighter mb-6">
            AERIS<br />
            <span className="text-brutal-accent">ALPHA</span>
          </h2>
          <p className="scene2-tagline font-mono text-lg md:text-xl text-gray-400 uppercase tracking-[0.3em]">
            Autonomous Drone Swarm System
          </p>
        </div>
      </div>

      {/* ========================================
          SCENE 3: DRONE SHOWCASE
          ======================================== */}
      <div
        ref={scene3Ref}
        className="absolute inset-0 z-20 opacity-0 invisible"
      >
        {/* Technical Grid Background */}
        <div className="scene3-grid absolute inset-0 opacity-0">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#333" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Header */}
        <div className="scene3-header absolute top-12 left-1/2 -translate-x-1/2 text-center z-20">
          <span className="font-mono text-xs text-brutal-accent uppercase tracking-[0.3em]">
            // SYSTEM ARCHITECTURE
          </span>
          <h3 className="font-sans font-black text-4xl md:text-5xl mt-2 tracking-tight">
            THE SWARM
          </h3>
        </div>

        {/* Drone Layout Container */}
        <div className="relative h-full flex flex-col items-center justify-center px-8 pt-24 pb-12">

          {/* RANGER (Top Center) */}
          <div
            className="drone-ranger relative w-full max-w-md h-48 md:h-64 cursor-pointer group"
            onMouseEnter={() => setHoveredDrone('ranger')}
            onMouseLeave={() => setHoveredDrone(null)}
            onClick={() => setActiveDrone(activeDrone === 'ranger' ? null : 'ranger')}
          >
            <div className={`absolute inset-0 transition-all duration-300 ${hoveredDrone === 'ranger' ? 'ring-2 ring-brutal-accent/50' : ''}`}>
              <Canvas camera={{ position: [0, 2, 7], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[-5, 10, -5]} intensity={2} />
                <spotLight position={[5, 5, 5]} intensity={1} color="#ff2a00" />
                <Environment preset="city" />
                <Suspense fallback={null}>
                  <RangerModel isHovered={hoveredDrone === 'ranger'} />
                </Suspense>
                <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
              </Canvas>
            </div>
            <div className="drone-label absolute -bottom-2 left-1/2 -translate-x-1/2 text-center">
              <span className="font-sans font-black text-2xl md:text-3xl tracking-tight">RANGER</span>
              <span className="block font-mono text-xs text-gray-500 mt-1">FIXED-WING</span>
            </div>
          </div>

          {/* Connection Lines */}
          <div className="relative w-full max-w-2xl h-12 flex items-center justify-center">
            <div className="connection-line absolute left-1/4 w-[2px] h-12 bg-brutal-accent/40" />
            <div className="connection-line absolute right-1/4 w-[2px] h-12 bg-brutal-accent/40" />
            <div className="absolute top-1/2 left-1/4 right-1/4 h-[2px] bg-brutal-accent/40" />
          </div>

          {/* SCOUTS (Bottom Row) */}
          <div className="flex gap-8 md:gap-16 w-full max-w-4xl justify-center">
            {/* Scout Left */}
            <div
              className="drone-scout-left relative w-40 md:w-56 h-40 md:h-48 cursor-pointer group"
              onMouseEnter={() => setHoveredDrone('scout-left')}
              onMouseLeave={() => setHoveredDrone(null)}
              onClick={() => setActiveDrone(activeDrone === 'scout-left' ? null : 'scout-left')}
            >
              <div className={`absolute inset-0 transition-all duration-300 ${hoveredDrone === 'scout-left' ? 'ring-2 ring-white/50' : ''}`}>
                <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[5, 10, 5]} intensity={2} />
                  <spotLight position={[-5, 5, 5]} intensity={1} color="#ffffff" />
                  <Environment preset="city" />
                  <Suspense fallback={null}>
                    <ScoutModel isHovered={hoveredDrone === 'scout-left'} />
                  </Suspense>
                  <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
                </Canvas>
              </div>
              <div className="drone-label absolute -bottom-2 left-1/2 -translate-x-1/2 text-center">
                <span className="font-sans font-black text-xl md:text-2xl tracking-tight">SCOUT</span>
                <span className="block font-mono text-xs text-gray-500 mt-1">QUADCOPTER</span>
              </div>
            </div>

            {/* Scout Right */}
            <div
              className="drone-scout-right relative w-40 md:w-56 h-40 md:h-48 cursor-pointer group"
              onMouseEnter={() => setHoveredDrone('scout-right')}
              onMouseLeave={() => setHoveredDrone(null)}
              onClick={() => setActiveDrone(activeDrone === 'scout-right' ? null : 'scout-right')}
            >
              <div className={`absolute inset-0 transition-all duration-300 ${hoveredDrone === 'scout-right' ? 'ring-2 ring-white/50' : ''}`}>
                <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[5, 10, 5]} intensity={2} />
                  <spotLight position={[-5, 5, 5]} intensity={1} color="#ffffff" />
                  <Environment preset="city" />
                  <Suspense fallback={null}>
                    <ScoutModel isHovered={hoveredDrone === 'scout-right'} />
                  </Suspense>
                  <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
                </Canvas>
              </div>
              <div className="drone-label absolute -bottom-2 left-1/2 -translate-x-1/2 text-center">
                <span className="font-sans font-black text-xl md:text-2xl tracking-tight">SCOUT</span>
                <span className="block font-mono text-xs text-gray-500 mt-1">QUADCOPTER</span>
              </div>
            </div>
          </div>

          {/* Info Panels (sides) */}
          <div className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 font-mono text-xs text-gray-500 space-y-2 hidden lg:block">
            <p className="text-brutal-accent">&gt; INTERACT</p>
            <p>&gt; Click to explore</p>
            <p>&gt; Drag to rotate</p>
          </div>
          <div className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 font-mono text-xs text-gray-500 space-y-2 text-right hidden lg:block">
            <p>&gt; Mesh Network</p>
            <p>&gt; 1:N Pilot Ratio</p>
            <p className="text-brutal-accent">&gt; SWARM READY</p>
          </div>
        </div>
      </div>

      {/* ========================================
          SCENE 4: ONE MAP
          ======================================== */}
      <div
        ref={scene4Ref}
        className="absolute inset-0 z-10 flex items-center opacity-0 invisible"
      >
        <div className="w-full px-8 md:px-16 lg:px-24">
          <div className="max-w-4xl">
            <div className="feature1-tag flex items-center gap-4 mb-6">
              <div className="feature1-accent w-12 h-[2px] bg-brutal-accent" />
              <span className="font-mono text-xs text-brutal-accent uppercase tracking-[0.2em]">
                {FEATURES[0].tag}
              </span>
            </div>
            <h2 className="feature1-title font-sans font-black text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tighter mb-6">
              {FEATURES[0].title}
            </h2>
            <p className="feature1-desc font-inter text-xl md:text-2xl text-gray-400 max-w-2xl">
              {FEATURES[0].description}
            </p>
          </div>
        </div>
      </div>

      {/* ========================================
          SCENE 5: NO CLOUD
          ======================================== */}
      <div
        ref={scene5Ref}
        className="absolute inset-0 z-10 flex items-center justify-end opacity-0 invisible"
      >
        <div className="w-full px-8 md:px-16 lg:px-24 text-right">
          <div className="max-w-4xl ml-auto">
            <div className="feature2-tag flex items-center justify-end gap-4 mb-6">
              <span className="font-mono text-xs text-brutal-accent uppercase tracking-[0.2em]">
                {FEATURES[1].tag}
              </span>
              <div className="w-12 h-[2px] bg-brutal-accent" />
            </div>
            <h2 className="feature2-title font-sans font-black text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tighter mb-6">
              {FEATURES[1].title}
            </h2>
            <p className="feature2-desc font-inter text-xl md:text-2xl text-gray-400 max-w-2xl ml-auto">
              {FEATURES[1].description}
            </p>
          </div>
        </div>
      </div>

      {/* ========================================
          SCENE 6: SWARM IQ
          ======================================== */}
      <div
        ref={scene6Ref}
        className="absolute inset-0 z-10 flex items-center justify-center opacity-0 invisible"
      >
        <div className="text-center px-8">
          <div className="feature3-tag flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-[2px] bg-brutal-accent" />
            <span className="font-mono text-xs text-brutal-accent uppercase tracking-[0.2em]">
              {FEATURES[2].tag}
            </span>
            <div className="w-8 h-[2px] bg-brutal-accent" />
          </div>
          <h2 className="feature3-title font-sans font-black text-6xl md:text-8xl lg:text-[10vw] leading-[0.9] tracking-tighter mb-6">
            {FEATURES[2].title}
          </h2>
          <p className="feature3-desc font-inter text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
            {FEATURES[2].description}
          </p>
        </div>
      </div>

      {/* ========================================
          SCENE 7: MODULAR PODS (Final)
          ======================================== */}
      <div
        ref={scene7Ref}
        className="absolute inset-0 z-10 flex items-center opacity-0 invisible"
      >
        <div className="w-full px-8 md:px-16 lg:px-24">
          <div className="max-w-4xl">
            <div className="flex items-start gap-6">
              <div className="feature4-accent w-[2px] h-32 bg-brutal-accent mt-2" />
              <div>
                <div className="feature4-tag mb-4">
                  <span className="font-mono text-xs text-brutal-accent uppercase tracking-[0.2em]">
                    {FEATURES[3].tag}
                  </span>
                </div>
                <h2 className="feature4-title font-sans font-black text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tighter mb-6 text-brutal-fg">
                  {FEATURES[3].title}
                </h2>
                <p className="feature4-desc font-inter text-xl md:text-2xl text-gray-400 max-w-2xl">
                  {FEATURES[3].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SolutionCinematic;
