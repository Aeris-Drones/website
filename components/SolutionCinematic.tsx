import React, { useLayoutEffect, useRef, Suspense, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';
import DroneExplorer from './DroneExplorer';

gsap.registerPlugin(ScrollTrigger);

// ============================================
// 3D DRONE MODELS
// ============================================

// Scout 3D Model (Quadcopter)
function ScoutModel({ isHovered }: { isHovered: boolean }) {
  const meshRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/quad-copter-drone/source/model.glb');
  // Clone scene to avoid sharing with DroneExplorer
  const clonedScene = React.useMemo(() => scene.clone(), [scene]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
      // Subtle hover scale effect
      const targetScale = isHovered ? 1.8 : 1.5;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return <primitive ref={meshRef} object={clonedScene} scale={1.5} rotation={[0.2, 0, 0]} position={[0, 0, 0]} />;
}

// Ranger 3D Model (Fixed-Wing)
function RangerModel({ isHovered }: { isHovered: boolean }) {
  const meshRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/Rangeraahahah.gltf');
  // Clone scene to avoid sharing with DroneExplorer
  const clonedScene = React.useMemo(() => scene.clone(), [scene]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      meshRef.current.rotation.y -= 0.002;
      // Subtle hover scale effect
      const targetScale = isHovered ? 2.8 : 2.5;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return <primitive ref={meshRef} object={clonedScene} scale={2.5} rotation={[0.2, Math.PI, 0]} position={[0, 0, 0]} />;
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
  const scene4Ref = useRef<HTMLDivElement>(null); // Features grid scene

  // Hover states for drones
  const [hoveredDrone, setHoveredDrone] = useState<string | null>(null);
  const [activeDrone, setActiveDrone] = useState<string | null>(null);

  // Navigation
  const navigate = useNavigate();

  // Helper to save scroll position before navigating to feature pages
  const navigateToFeature = (path: string) => {
    sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    navigate(path);
  };

  // Custom cursor for drone hover
  const cursorRef = useRef<HTMLDivElement>(null);
  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);

  // Setup cursor movement
  useEffect(() => {
    if (!cursorRef.current) return;

    gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50 });
    xTo.current = gsap.quickTo(cursorRef.current, "x", { duration: 0.15, ease: "power2.out" });
    yTo.current = gsap.quickTo(cursorRef.current, "y", { duration: 0.15, ease: "power2.out" });

    const moveCursor = (e: MouseEvent) => {
      if (xTo.current && yTo.current) {
        xTo.current(e.clientX);
        yTo.current(e.clientY);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  // Handle cursor visibility
  useEffect(() => {
    if (!cursorRef.current) return;

    if (hoveredDrone) {
      gsap.to(cursorRef.current, { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" });
    } else {
      gsap.to(cursorRef.current, { opacity: 0, scale: 0.5, duration: 0.3, ease: "power2.out" });
    }
  }, [hoveredDrone]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Main timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: componentRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 3,
          invalidateOnRefresh: true,
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

      // Description fades in
      tl.fromTo('.scene2-desc',
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "expo.out",
        },
        2.8
      );

      // Hold for reading
      tl.to({}, { duration: 1.0 });

      // Hold then exit
      tl.to(scene2Ref.current, {
        scale: 1.05,
        filter: "blur(15px)",
        opacity: 0,
        duration: 0.8,
        ease: "expo.in",
      }, ">");

      // ========================================
      // SCENE 3: DRONE SHOWCASE (3.0 - 5.5)
      // ========================================

      // Scene 3 fades in after Scene 2 exits
      tl.fromTo(scene3Ref.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.5 },
        ">+0.2"
      );

      // Technical grid appears
      tl.fromTo('.scene3-grid',
        { opacity: 0 },
        { opacity: 0.3, duration: 0.8, ease: "power2.out" },
        "<+0.2"
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
        "<+0.1"
      );

      // Ranger flies in from left WITH its label
      tl.fromTo('.drone-ranger',
        {
          opacity: 0,
          x: -100,
          scale: 0.8,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.2,
          ease: "expo.out",
        },
        ">+0.3"
      );

      // Scout flies in from right
      tl.fromTo('.drone-scout-left',
        {
          opacity: 0,
          x: 100,
          scale: 0.8,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.2,
          ease: "expo.out",
        },
        "<+0.4"
      );

      // Drone labels appear AT THE SAME TIME as drones (not delayed)
      tl.fromTo('.drone-label',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.2, ease: "expo.out" },
        "<"
      );

      // Connection lines draw between drones
      tl.fromTo('.connection-line',
        { scaleY: 0, transformOrigin: "top" },
        { scaleY: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
        ">+0.2"
      );

      // Hold the showcase
      tl.to({}, { duration: 1.5 });

      // Scene 3 exits
      tl.to(scene3Ref.current, {
        autoAlpha: 0,
        scale: 0.95,
        duration: 0.6,
        ease: "power2.in",
      }, ">");

      // ========================================
      // SCENE 4: ALL FEATURES (Original Stacked Layout)
      // ========================================

      // Scene 4 fades in
      tl.fromTo(scene4Ref.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.4 },
        ">"
      );

      // All feature cards (including sidebar) animate in simultaneously with slight stagger
      tl.fromTo('.feature-card',
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "expo.out",
        },
        "<+0.1"
      );

      // Hold for reading - extra long since all content is visible
      tl.to({}, { duration: 2.5 });

    }, componentRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id="features" ref={componentRef} className="relative h-[750svh] md:h-[1300svh] bg-brutal-bg text-brutal-fg">
      <div className="sticky top-0 h-[100svh] overflow-hidden">

      {/* Custom cursor for drone hover - hidden on touch devices */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-28 h-28 bg-[#FF2A00] rounded-full z-[60] pointer-events-none flex items-center justify-center opacity-0 scale-50 hidden md:flex"
      >
        <div className="flex flex-col items-center justify-center gap-1 text-center">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2z" />
          </svg>
          <span className="text-white font-mono font-bold text-[10px] tracking-wider">EXPLORE</span>
        </div>
      </div>

      {/* ========================================
          SCENE 1: OUR SOLUTION?
          ======================================== */}
      <div
        ref={scene1Ref}
        className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none"
      >
        <h2 className="scene1-title font-sans font-black text-5xl md:text-8xl lg:text-[12vw] leading-none text-center tracking-tighter px-4">
          OUR SOLUTION<span className="scene1-question">?</span>
        </h2>
      </div>

      {/* ========================================
          SCENE 2: AERIS ALPHA
          ======================================== */}
      <div
        ref={scene2Ref}
        className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none"
        style={{ opacity: 0, visibility: 'hidden' }}
      >
        <div className="flex flex-col items-center px-4 md:px-8">
          <div className="scene2-line w-16 md:w-24 h-[2px] bg-brutal-accent mb-6 md:mb-8" />
          <h2 className="scene2-title font-sans font-black text-5xl md:text-9xl lg:text-[14vw] leading-none mb-4 md:mb-6">
            <div className="text-left">
              <span className="block tracking-[0.05em]">AERIS</span>
              <span className="block text-brutal-accent tracking-tighter">ALPHA</span>
            </div>
          </h2>
          <p className="scene2-tagline font-mono text-lg md:text-xl text-gray-400 uppercase tracking-[0.3em] mb-8 text-center">
            Autonomous Drone Swarm System
          </p>
          <p className="scene2-desc font-inter text-base md:text-lg text-gray-500 max-w-2xl leading-relaxed text-center">
            A coordinated drone swarm for rapid field operations. Scout and Ranger drones work together-fusing thermal and video feeds into a single live map, turning scattered footage into prioritized, actionable alerts.
          </p>
        </div>
      </div>

      {/* ========================================
          SCENE 3: DRONE SHOWCASE
          ======================================== */}
      <div
        ref={scene3Ref}
        className="absolute inset-0 z-20 pointer-events-auto"
        style={{ opacity: 0, visibility: 'hidden' }}
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
        <div className="scene3-header absolute top-16 md:top-20 left-0 right-0 flex flex-col items-center justify-center z-20 px-4">
          <span className="font-mono text-xs text-brutal-accent uppercase tracking-[0.3em]">
            // SYSTEM ARCHITECTURE
          </span>
          <h3 className="font-sans font-black text-4xl md:text-5xl mt-2 tracking-tight">
            THE SWARM
          </h3>
        </div>

        {/* Drone Layout Container */}
        <div className="relative h-full flex flex-col md:flex-row items-center justify-center px-4 md:px-16 lg:px-24 pt-28 md:pt-40 pb-8 md:pb-12 gap-4 md:gap-12 lg:gap-24">

          {/* RANGER (Left) */}
          <div
            className="drone-ranger relative w-full md:w-[45%] max-w-2xl h-48 md:h-80 lg:h-[550px] group cursor-pointer"
            onMouseEnter={() => setHoveredDrone('ranger')}
            onMouseLeave={() => setHoveredDrone(null)}
            onClick={() => setActiveDrone(activeDrone === 'ranger' ? null : 'ranger')}
          >
            <div className="absolute inset-0" style={{ pointerEvents: 'none' }}>
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
            <div className="drone-label absolute -bottom-8 left-1/2 -translate-x-1/2 text-center pointer-events-none">
              <span className="font-sans font-black text-3xl md:text-4xl tracking-tight">RANGER</span>
              <span className="block font-mono text-xs text-gray-500 mt-1">FIXED-WING</span>
            </div>
          </div>

          {/* Connection Line */}
          <div className="connection-line relative w-[2px] h-32 md:h-64 bg-brutal-accent/40 hidden md:block" />

          {/* SCOUT (Right) */}
          <div
            className="drone-scout-left relative w-full md:w-[45%] max-w-2xl h-48 md:h-80 lg:h-[550px] group cursor-pointer"
            onMouseEnter={() => setHoveredDrone('scout')}
            onMouseLeave={() => setHoveredDrone(null)}
            onClick={() => setActiveDrone(activeDrone === 'scout' ? null : 'scout')}
          >
            <div className="absolute inset-0" style={{ pointerEvents: 'none' }}>
              <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 10, 5]} intensity={2} />
                <spotLight position={[-5, 5, 5]} intensity={1} color="#ffffff" />
                <Environment preset="city" />
                <Suspense fallback={null}>
                  <ScoutModel isHovered={hoveredDrone === 'scout'} />
                </Suspense>
                <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
              </Canvas>
            </div>
            <div className="drone-label absolute -bottom-8 left-1/2 -translate-x-1/2 text-center pointer-events-none">
              <span className="font-sans font-black text-3xl md:text-4xl tracking-tight">SCOUT</span>
              <span className="block font-mono text-xs text-gray-500 mt-1">QUADCOPTER</span>
            </div>
          </div>


        </div>

      </div>

      {/* Full-screen Drone Explorer Modal */}
      {activeDrone && (
        <DroneExplorer
          droneType={activeDrone as 'ranger' | 'scout'}
          onClose={() => setActiveDrone(null)}
        />
      )}

      {/* ========================================
          SCENE 4: ALL FEATURES (Original Stacked Layout)
          ======================================== */}
      <div
        ref={scene4Ref}
        className="absolute inset-0 z-10 pointer-events-auto"
        style={{ opacity: 0, visibility: 'hidden' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 h-full w-full">
          {/* Sidebar Header Column */}
          <div className="feature-card col-span-1 lg:col-span-1 p-6 sm:p-8 md:p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-brutal-line flex flex-col justify-center bg-brutal-bg">
            <div className="w-full">
              <h3 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl uppercase tracking-tighter leading-tight sm:leading-none mb-4 sm:mb-6">
                Features<span className="text-brutal-accent">.</span>
              </h3>
              <p className="font-inter text-gray-400 text-sm sm:text-base leading-relaxed border-l-2 border-brutal-accent pl-3 sm:pl-4">
                Aeris gives you the full picture. All your drone feeds combined into one simple map.
              </p>
            </div>
          </div>

          {/* Features Column */}
          <div className="col-span-1 lg:col-span-3 relative flex flex-col h-full">
            {/* Feature 1: ONE MAP */}
            <button
              onClick={() => navigateToFeature('/one-map')}
              className="feature-card group border-b border-brutal-line flex-1 flex flex-col justify-center transition-colors cursor-pointer hover:bg-white hover:text-black relative text-left"
            >
              <div className="p-6 sm:p-8 lg:p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6 relative z-10">
                <h3 className="font-sans font-black text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl uppercase group-hover:text-black transition-colors">
                  {FEATURES[0].title}
                </h3>
                <div className="flex flex-col items-start md:items-end md:text-right opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="feature-accent font-mono text-xs uppercase tracking-widest mb-2 text-brutal-accent">{FEATURES[0].tag}</span>
                  <p className="font-inter text-sm sm:text-base max-w-md text-gray-400 group-hover:text-black transition-colors">
                    {FEATURES[0].description}
                  </p>
                </div>
              </div>
            </button>

            {/* Feature 2: NO CLOUD */}
            <button
              onClick={() => navigateToFeature('/no-cloud')}
              className="feature-card group border-b border-brutal-line flex-1 flex flex-col justify-center transition-colors cursor-pointer hover:bg-white hover:text-black relative text-left"
            >
              <div className="p-6 sm:p-8 lg:p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6 relative z-10">
                <h3 className="font-sans font-black text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl uppercase group-hover:text-black transition-colors">
                  {FEATURES[1].title}
                </h3>
                <div className="flex flex-col items-start md:items-end md:text-right opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="feature-accent font-mono text-xs uppercase tracking-widest mb-2 text-brutal-accent">{FEATURES[1].tag}</span>
                  <p className="font-inter text-sm sm:text-base max-w-md text-gray-400 group-hover:text-black transition-colors">
                    {FEATURES[1].description}
                  </p>
                </div>
              </div>
            </button>

            {/* Feature 3: SWARM IQ */}
            <button
              onClick={() => navigateToFeature('/swarm-iq')}
              className="feature-card group border-b border-brutal-line flex-1 flex flex-col justify-center transition-colors cursor-pointer hover:bg-white hover:text-black relative text-left"
            >
              <div className="p-6 sm:p-8 lg:p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6 relative z-10">
                <h3 className="font-sans font-black text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl uppercase group-hover:text-black transition-colors">
                  {FEATURES[2].title}
                </h3>
                <div className="flex flex-col items-start md:items-end md:text-right opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="feature-accent font-mono text-xs uppercase tracking-widest mb-2 text-brutal-accent">{FEATURES[2].tag}</span>
                  <p className="font-inter text-sm sm:text-base max-w-md text-gray-400 group-hover:text-black transition-colors">
                    {FEATURES[2].description}
                  </p>
                </div>
              </div>
            </button>

            {/* Feature 4: MODULAR PODS */}
            <button
              onClick={() => navigateToFeature('/modular-pods')}
              className="feature-card group flex-1 flex flex-col justify-center transition-colors cursor-pointer hover:bg-white hover:text-black relative text-left"
            >
              <div className="p-6 sm:p-8 lg:p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6 relative z-10">
                <h3 className="font-sans font-black text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl uppercase group-hover:text-black transition-colors">
                  {FEATURES[3].title}
                </h3>
                <div className="flex flex-col items-start md:items-end md:text-right opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="feature-accent font-mono text-xs uppercase tracking-widest mb-2 text-brutal-accent">{FEATURES[3].tag}</span>
                  <p className="font-inter text-sm sm:text-base max-w-md text-gray-400 group-hover:text-black transition-colors">
                    {FEATURES[3].description}
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      </div>
    </div>
  );
};

export default SolutionCinematic;
