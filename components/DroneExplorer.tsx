import React, { useRef, useState, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Html } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

// ============================================
// HOTSPOT DATA - Clickable points on models
// ============================================

interface Hotspot {
  id: string;
  position: [number, number, number];
  label: string;
  description: string;
  specs?: string[];
}

const RANGER_HOTSPOTS: Hotspot[] = [
  {
    id: 'vtol',
    position: [0, 0.8, 0],
    label: 'VTOL System',
    description: 'Vertical Take-Off and Landing capability allows operations without runways.',
    specs: ['Transition time: <3 seconds', 'Hover stability: GPS-denied capable', 'Wind resistance: Up to 25 knots'],
  },
  {
    id: 'wing',
    position: [1.5, 0.3, 0],
    label: 'Fixed Wing',
    description: 'High-efficiency wing design for extended range and endurance.',
    specs: ['Wingspan: 2.4m', 'Endurance: 90+ minutes', 'Cruise speed: 65 km/h'],
  },
  {
    id: 'payload',
    position: [0, -0.2, 0.8],
    label: 'Payload Bay',
    description: 'Modular payload bay for mission-specific equipment.',
    specs: ['Max payload: 1.2kg', 'Hot-swap capable', 'EO/IR/Thermal options'],
  },
  {
    id: 'comms',
    position: [-0.8, 0.5, -0.3],
    label: 'Mesh Radio',
    description: 'Long-range mesh networking for swarm coordination.',
    specs: ['Range: 15km+', 'Encryption: AES-256', 'Latency: <50ms'],
  },
  {
    id: 'motor',
    position: [-1.2, 0.2, 0.5],
    label: 'Propulsion',
    description: 'Efficient brushless motor system with redundancy.',
    specs: ['Motor: 800kv brushless', 'Redundant ESCs', 'Noise: <65dB'],
  },
];

const SCOUT_HOTSPOTS: Hotspot[] = [
  {
    id: 'rotor',
    position: [0.6, 0.4, 0.6],
    label: 'Quad Rotors',
    description: 'High-torque motors for agile indoor/outdoor flight.',
    specs: ['Response time: <10ms', 'Max thrust: 2.5kg', 'Obstacle avoidance'],
  },
  {
    id: 'camera',
    position: [0, -0.3, 0.5],
    label: 'Multi-Sensor Pod',
    description: 'Fused thermal, RGB, and depth sensing in one unit.',
    specs: ['4K RGB @ 60fps', 'Thermal: 640x512', 'Depth: 0.5-10m range'],
  },
  {
    id: 'body',
    position: [0, 0, 0],
    label: 'Central Hub',
    description: 'Ruggedized carbon fiber frame with onboard compute.',
    specs: ['AI processor: NVIDIA Orin', 'GPS-denied nav', 'IP54 rated'],
  },
  {
    id: 'battery',
    position: [0, 0.2, -0.4],
    label: 'Power System',
    description: 'Quick-swap battery for continuous operations.',
    specs: ['Capacity: 6000mAh', 'Flight time: 35 min', 'Swap time: <10s'],
  },
  {
    id: 'lights',
    position: [0.5, -0.1, -0.3],
    label: 'Position Lights',
    description: 'Programmable LEDs for visual identification and signaling.',
    specs: ['360° visibility', 'Night ops capable', 'Swarm sync patterns'],
  },
];

// ============================================
// 3D HOTSPOT COMPONENT
// ============================================

interface HotspotMarkerProps {
  hotspot: Hotspot;
  isActive: boolean;
  onClick: () => void;
}

function HotspotMarker({ hotspot, isActive, onClick }: HotspotMarkerProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={hotspot.position}>
      {/* Large invisible hit area - captures clicks */}
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Outer glow sphere - always visible */}
      <mesh scale={hovered || isActive ? 1.4 : 1.1}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshBasicMaterial
          color={'#FF2A00'}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Inner solid sphere - always visible red */}
      <mesh scale={hovered || isActive ? 1.2 : 1}>
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshBasicMaterial
          color={isActive ? '#ffffff' : '#FF2A00'}
        />
      </mesh>

      {/* Label on hover */}
      {(hovered || isActive) && (
        <Html
          position={[0.25, 0.2, 0]}
          style={{
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          <div className="bg-black/90 border border-brutal-accent px-3 py-1 font-mono text-xs text-white uppercase tracking-wider">
            {hotspot.label}
          </div>
        </Html>
      )}
    </group>
  );
}

// ============================================
// INTERACTIVE DRONE MODELS WITH HOTSPOTS
// ============================================

// Camera Controller - animates to hotspot position
function CameraController({ targetPosition }: { targetPosition: [number, number, number] | null }) {
  const { camera } = useThree();

  useEffect(() => {
    if (targetPosition) {
      // Animate camera to look at the hotspot
      const [x, y, z] = targetPosition;
      gsap.to(camera.position, {
        x: x + 2,
        y: y + 1,
        z: z + 3,
        duration: 1,
        ease: "power2.inOut",
      });
    }
  }, [targetPosition, camera]);

  return null;
}

interface InteractiveRangerProps {
  activeHotspot: string | null;
  onHotspotClick: (id: string) => void;
}

function InteractiveRanger({ activeHotspot, onHotspotClick }: InteractiveRangerProps) {
  const meshRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/80-followers-iranian-shahed-136-drone/source/scene.gltf');
  // Clone scene to avoid conflicts with SolutionCinematic
  const clonedScene = React.useMemo(() => scene.clone(), [scene]);

  // No spinning - model stays still so hotspots remain in place

  return (
    <group>
      <primitive
        ref={meshRef}
        object={clonedScene}
        scale={3.5}
        rotation={[0.1, Math.PI * 0.75, 0]}
        position={[0, 0, 0]}
      />
      {/* Hotspots */}
      {RANGER_HOTSPOTS.map((hotspot) => (
        <HotspotMarker
          key={hotspot.id}
          hotspot={hotspot}
          isActive={activeHotspot === hotspot.id}
          onClick={() => onHotspotClick(hotspot.id)}
        />
      ))}
    </group>
  );
}

interface InteractiveScoutProps {
  activeHotspot: string | null;
  onHotspotClick: (id: string) => void;
}

function InteractiveScout({ activeHotspot, onHotspotClick }: InteractiveScoutProps) {
  const meshRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/quad-copter-drone/source/model.glb');
  // Clone scene to avoid conflicts with SolutionCinematic
  const clonedScene = React.useMemo(() => scene.clone(), [scene]);

  // No spinning - model stays still so hotspots remain in place

  return (
    <group>
      <primitive
        ref={meshRef}
        object={clonedScene}
        scale={2.5}
        rotation={[0.2, Math.PI * 0.25, 0]}
        position={[0, 0, 0]}
      />
      {/* Hotspots */}
      {SCOUT_HOTSPOTS.map((hotspot) => (
        <HotspotMarker
          key={hotspot.id}
          hotspot={hotspot}
          isActive={activeHotspot === hotspot.id}
          onClick={() => onHotspotClick(hotspot.id)}
        />
      ))}
    </group>
  );
}

// ============================================
// MAIN DRONE EXPLORER MODAL
// ============================================

interface DroneExplorerProps {
  droneType: 'ranger' | 'scout';
  onClose: () => void;
}

const DRONE_META = {
  ranger: {
    name: 'RANGER',
    type: 'Fixed-Wing VTOL UAV',
    tagline: 'Long-range surveillance and mesh coordination platform',
    hotspots: RANGER_HOTSPOTS,
  },
  scout: {
    name: 'SCOUT',
    type: 'Quadcopter UAV',
    tagline: 'Agile indoor/outdoor reconnaissance and sensor fusion',
    hotspots: SCOUT_HOTSPOTS,
  },
};

export default function DroneExplorer({ droneType, onClose }: DroneExplorerProps) {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const meta = DRONE_META[droneType];
  const hotspots = droneType === 'ranger' ? RANGER_HOTSPOTS : SCOUT_HOTSPOTS;
  const activeHotspotData = hotspots.find(h => h.id === activeHotspot);

  // Get target position for camera when hotspot is selected
  const targetPosition = activeHotspotData?.position || null;

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-8" onClick={onClose}>

      <div
        className="relative w-full max-w-7xl h-[85vh] bg-brutal-bg border border-brutal-line flex flex-col md:flex-row shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Large X Close button - Top Right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center group bg-black/20 hover:bg-black/50 transition-colors backdrop-blur-md rounded-full"
          aria-label="Close"
        >
          <div className="relative w-6 h-6">
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white group-hover:bg-brutal-accent transition-colors rotate-45" />
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white group-hover:bg-brutal-accent transition-colors -rotate-45" />
          </div>
        </button>

        {/* Left Panel - Info */}
        <div className="w-full md:w-[400px] h-full bg-brutal-bg border-r border-brutal-line p-8 flex flex-col overflow-y-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-brutal-accent" />
              <span className="font-mono text-xs text-brutal-accent uppercase tracking-[0.2em]">
              // SYSTEM EXPLORER
              </span>
            </div>
            <h2 className="font-sans font-black text-5xl md:text-6xl tracking-tight mb-2">
              {meta.name}
            </h2>
            <p className="font-mono text-sm text-gray-500 uppercase tracking-wider">
              {meta.type}
            </p>
            <p className="font-inter text-base text-gray-400 mt-4">
              {meta.tagline}
            </p>
          </div>

          {/* Hotspot Info */}
          {activeHotspotData ? (
            <div className="flex-1">
              <div className="border-l-2 border-brutal-accent pl-4 mb-6">
                <h3 className="font-sans font-black text-2xl mb-2">
                  {activeHotspotData.label}
                </h3>
                <p className="font-inter text-gray-400 text-sm leading-relaxed">
                  {activeHotspotData.description}
                </p>
              </div>

              {activeHotspotData.specs && (
                <div className="space-y-3">
                  <span className="font-mono text-xs text-brutal-accent uppercase tracking-wider">
                    Specifications
                  </span>
                  {activeHotspotData.specs.map((spec, i) => (
                    <div
                      key={i}
                      className="font-mono text-sm text-gray-300 flex items-center gap-3"
                    >
                      <span className="text-brutal-accent">&gt;</span>
                      {spec}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-center">
              <div className="text-center text-gray-600">
                <div className="font-mono text-xs uppercase tracking-wider mb-4">
                  Click on a data point to explore
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-brutal-accent animate-pulse" />
                  <span className="font-mono text-xs text-gray-500">
                    {hotspots.length} points available
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Hotspot List */}
          <div className="mt-8 pt-6 border-t border-brutal-line">
            <span className="font-mono text-xs text-gray-600 uppercase tracking-wider block mb-4">
              Components
            </span>
            <div className="space-y-2">
              {hotspots.map((hotspot) => (
                <button
                  key={hotspot.id}
                  onClick={() => setActiveHotspot(activeHotspot === hotspot.id ? null : hotspot.id)}
                  className={`w-full text-left px-3 py-2 font-mono text-sm transition-all ${activeHotspot === hotspot.id
                    ? 'bg-brutal-accent text-black'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                  {hotspot.label}
                </button>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8 pt-6 border-t border-brutal-line">
            <div className="font-mono text-xs text-gray-600 space-y-2">
              <p><span className="text-brutal-accent">DRAG</span> to rotate model</p>
              <p><span className="text-brutal-accent">CLICK</span> on markers to explore</p>
            </div>
          </div>
        </div>

        {/* Right Panel - 3D Model */}
        <div className="flex-1 relative">
          {/* Technical grid overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="explorer-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FF2A00" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#explorer-grid)" />
            </svg>
          </div>

          {/* 3D Canvas */}
          <Canvas camera={{ position: [0, 1, 5], fov: 50 }}>
            <color attach="background" args={['#0a0a0a']} />
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 10, 5]} intensity={1.5} />
            <spotLight
              position={[-5, 5, 5]}
              intensity={1}
              color={droneType === 'ranger' ? '#ff2a00' : '#ffffff'}
            />
            <Environment preset="city" />

            {/* Camera controller for hotspot focus */}
            <CameraController targetPosition={targetPosition} />

            <Suspense fallback={null}>
              {droneType === 'ranger' ? (
                <InteractiveRanger
                  activeHotspot={activeHotspot}
                  onHotspotClick={(id) => setActiveHotspot(activeHotspot === id ? null : id)}
                />
              ) : (
                <InteractiveScout
                  activeHotspot={activeHotspot}
                  onHotspotClick={(id) => setActiveHotspot(activeHotspot === id ? null : id)}
                />
              )}
            </Suspense>

            <OrbitControls
              enableZoom={true}
              enablePan={false}
              minDistance={3}
              maxDistance={10}
              maxPolarAngle={Math.PI / 1.5}
              minPolarAngle={Math.PI / 4}
              autoRotate={false}
            />
          </Canvas>

          {/* Drone name overlay */}
          <div className="absolute bottom-8 right-8 text-right pointer-events-none">
            <h3
              className="font-sans font-black text-[15vw] leading-none tracking-tighter opacity-5"
              style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}
            >
              {meta.name}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
