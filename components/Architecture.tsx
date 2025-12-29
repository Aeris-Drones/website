import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Scout 3D Model (Quadcopter)
function ScoutModel() {
  const meshRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/quad-copter-drone/source/model.glb');

  useFrame((state) => {
    if (meshRef.current) {
      // Just rotation, no floating
      meshRef.current.rotation.y += 0.002;
    }
  });

  return <primitive ref={meshRef} object={scene} scale={2.0} rotation={[0.2, 0, 0]} position={[0, 0, 0]} />;
}

// Ranger 3D Model (Shahed-136)
function RangerModel() {
  const meshRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/80-followers-iranian-shahed-136-drone/source/scene.gltf');

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
      meshRef.current.rotation.y -= 0.002;
    }
  });

  return <primitive ref={meshRef} object={scene} scale={2.5} rotation={[0.2, Math.PI, 0]} position={[0, 0, 0]} />;
}

const Architecture: React.FC = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 border-b border-brutal-line h-screen max-h-[900px]">
      {/* Scout Panel */}
      <div className="relative border-b lg:border-b-0 lg:border-r border-brutal-line flex flex-col justify-between group overflow-hidden bg-black">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900/50 to-black z-0 pointer-events-none"></div>

        {/* 3D Model Background */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 2, 6], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 10, 5]} intensity={2} />
            <spotLight position={[-5, 5, 5]} intensity={1} color="#ffffff" />
            <Environment preset="city" />
            <Suspense fallback={null}>
              <ScoutModel />
            </Suspense>
            <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
          </Canvas>
        </div>

        {/* Text Overlay */}
        <div className="relative z-10 p-12 h-full flex flex-col justify-between pointer-events-none">
          <div>
            <h3 className="font-sans font-black text-6xl outline-text text-transparent stroke-white" style={{ WebkitTextStroke: '1px white' }}>SCOUT</h3>
            <div className="font-mono text-xs mt-4 space-y-2 text-white/80">
              <p>&gt; Goes into buildings</p>
              <p>&gt; Sees heat, video, and depth</p>
              <p>&gt; Works without GPS</p>
            </div>
          </div>

          <div className="w-full h-px bg-white/20"></div>
        </div>
      </div>

      {/* Ranger Panel */}
      <div className="relative flex flex-col justify-between group overflow-hidden bg-black">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900/50 to-black z-0 pointer-events-none"></div>

        {/* 3D Model Background */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 2, 7], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[-5, 10, -5]} intensity={2} />
            <spotLight position={[5, 5, 5]} intensity={1} color="#ff2a00" />
            <Environment preset="city" />
            <Suspense fallback={null}>
              <RangerModel />
            </Suspense>
            <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
          </Canvas>
        </div>

        {/* Text Overlay */}
        <div className="relative z-10 p-12 h-full flex flex-col justify-between pointer-events-none">
          <div className="text-right">
            <h3 className="font-sans font-black text-6xl text-white">RANGER</h3>
            <div className="font-mono text-xs mt-4 space-y-2 ml-auto inline-block text-left text-white/80">
              <p>&gt; Watches from above</p>
              <p>&gt; Combines all data</p>
              <p>&gt; Keeps drones connected</p>
            </div>
          </div>

          <div className="w-full h-px bg-white/20"></div>
        </div>
      </div>
    </section>
  );
};

export default Architecture;