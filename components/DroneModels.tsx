import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Scout model component (quadcopter)
function ScoutModel() {
    const meshRef = useRef<THREE.Group>(null);
    const { scene } = useGLTF('/quad-copter-drone/source/model.glb');

    // Auto-rotate
    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.005;
        }
    });

    return <primitive ref={meshRef} object={scene} scale={0.5} />;
}

// Ranger model placeholder (we'll need to add the actual model)
function RangerModel() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.005;
        }
    });

    // Placeholder for now - a simple fixed-wing shape
    return (
        <mesh ref={meshRef} scale={2}>
            <boxGeometry args={[2, 0.2, 0.5]} />
            <meshStandardMaterial color="#ff2a00" metalness={0.8} roughness={0.2} />
        </mesh>
    );
}

const DroneModels: React.FC = () => {
    const [selectedDrone, setSelectedDrone] = useState<'scout' | 'ranger'>('scout');

    return (
        <section className="min-h-screen bg-brutal-bg border-b border-brutal-line">
            <div className="container mx-auto px-6 md:px-12 py-24">
                {/* Header */}
                <div className="mb-12">
                    <h2 className="font-sans font-black text-5xl md:text-7xl uppercase tracking-tight mb-4">
                        PLATFORM<span className="text-brutal-accent">.</span>
                    </h2>
                    <p className="font-mono text-sm md:text-base text-gray-400 uppercase tracking-wide">
                        Interactive 3D Models
                    </p>
                </div>

                {/* Drone Selector */}
                <div className="flex gap-4 mb-8">
                    <button
                        onClick={() => setSelectedDrone('scout')}
                        className={`px-6 py-3 font-mono text-sm uppercase tracking-wide transition-all ${selectedDrone === 'scout'
                                ? 'bg-brutal-accent text-black'
                                : 'bg-transparent border border-brutal-line text-brutal-fg hover:border-brutal-accent'
                            }`}
                    >
                        Scout (Quad)
                    </button>
                    <button
                        onClick={() => setSelectedDrone('ranger')}
                        className={`px-6 py-3 font-mono text-sm uppercase tracking-wide transition-all ${selectedDrone === 'ranger'
                                ? 'bg-brutal-accent text-black'
                                : 'bg-transparent border border-brutal-line text-brutal-fg hover:border-brutal-accent'
                            }`}
                    >
                        Ranger (Fixed-Wing)
                    </button>
                </div>

                {/* 3D Viewer */}
                <div className="relative h-[600px] bg-black border border-brutal-line">
                    <Canvas>
                        <PerspectiveCamera makeDefault position={[5, 3, 5]} />
                        <OrbitControls
                            enablePan={false}
                            minDistance={3}
                            maxDistance={10}
                        />

                        {/* Lighting */}
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[10, 10, 5]} intensity={1} />
                        <spotLight position={[-10, 10, -5]} intensity={0.5} />

                        {/* Environment */}
                        <Environment preset="warehouse" />

                        {/* Models */}
                        <Suspense fallback={null}>
                            {selectedDrone === 'scout' && <ScoutModel />}
                            {selectedDrone === 'ranger' && <RangerModel />}
                        </Suspense>

                        {/* Grid */}
                        <gridHelper args={[20, 20, '#333333', '#222222']} />
                    </Canvas>

                    {/* Controls hint */}
                    <div className="absolute bottom-4 left-4 font-mono text-xs text-gray-500 uppercase">
                        Click + Drag to Rotate | Scroll to Zoom
                    </div>
                </div>

                {/* Specs */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="border border-brutal-line p-6">
                        <h3 className="font-sans font-bold text-2xl uppercase mb-4">
                            {selectedDrone === 'scout' ? 'Scout' : 'Ranger'} Specs
                        </h3>
                        {selectedDrone === 'scout' ? (
                            <ul className="space-y-2 font-mono text-sm text-gray-400">
                                <li>• Type: Quadcopter</li>
                                <li>• Flight Time: 30 min</li>
                                <li>• Range: 5 km</li>
                                <li>• Payload: HD Camera</li>
                            </ul>
                        ) : (
                            <ul className="space-y-2 font-mono text-sm text-gray-400">
                                <li>• Type: Fixed-Wing</li>
                                <li>• Flight Time: 90 min</li>
                                <li>• Range: 20 km</li>
                                <li>• Payload: Multispectral</li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DroneModels;
