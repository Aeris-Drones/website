import React, { useLayoutEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../Navbar';

gsap.registerPlugin(ScrollTrigger);

const ModularPodsPage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Handle back to features navigation
  const handleBackToFeatures = () => {
    sessionStorage.setItem('returnToFeatures', 'true');
    navigate('/');
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Simple fade-in animations without vertical movement
      gsap.fromTo('.hero-title',
        { opacity: 0, filter: 'blur(10px)' },
        { opacity: 1, filter: 'blur(0px)', duration: 0.6, ease: 'power2.out', delay: 0.1 }
      );

      gsap.fromTo('.hero-tagline',
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.out', delay: 0.2 }
      );

      gsap.fromTo('.hero-line',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.5, ease: 'power2.inOut', delay: 0.3 }
      );

      gsap.fromTo('.scroll-indicator',
        { opacity: 0 },
        { opacity: 1, duration: 0.4, delay: 0.5 }
      );

      gsap.fromTo('.back-button',
        { opacity: 0 },
        { opacity: 1, duration: 0.4, delay: 0.2 }
      );

      // Content sections scroll animations
      const sections = gsap.utils.toArray('.content-section');
      sections.forEach((section: any) => {
        gsap.fromTo(section,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Pod types data
  const PODS = [
    {
      id: 'thermal',
      name: 'Thermal Imaging',
      desc: 'FLIR-grade thermal camera for heat signature detection in any conditions.',
      specs: ['640x512 resolution', '-40°C to 550°C range', 'Night vision capable'],
    },
    {
      id: 'lidar',
      name: 'LiDAR Scanner',
      desc: 'High-precision 3D mapping for structural analysis and terrain modeling.',
      specs: ['300m range', '0.5cm accuracy', 'Real-time point cloud'],
    },
    {
      id: 'multispectral',
      name: 'Multispectral',
      desc: 'Agricultural and environmental analysis across multiple wavelengths.',
      specs: ['5-band imaging', 'NDVI analysis', 'Vegetation health index'],
    },
    {
      id: 'comms',
      name: 'Comms Relay',
      desc: 'Extend mesh network range and provide emergency communication bridges.',
      specs: ['10km relay range', 'Multi-band support', 'Encrypted channels'],
    },
  ];

  return (
    <div ref={heroRef} className="bg-[#050505] text-[#F0F0F0] min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center border-b border-white/10 overflow-hidden">
        {/* Back Button - Top Left */}
        <button
          onClick={handleBackToFeatures}
          className="back-button absolute top-20 left-6 md:left-12 z-20 flex items-center gap-2 px-4 py-2 border border-white/20 font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:transform group-hover:-translate-x-1 transition-transform" />
          Back to Features
        </button>

        {/* Geometric Background */}
        <div className="absolute inset-0 opacity-[0.05]">
          <svg className="w-full h-full" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
            {/* Hexagonal pattern suggesting modularity */}
            {[...Array(12)].map((_, i) => {
              const x = 100 + (i % 4) * 200;
              const y = 100 + Math.floor(i / 4) * 200;
              return (
                <polygon
                  key={i}
                  points={`${x},${y - 40} ${x + 35},${y - 20} ${x + 35},${y + 20} ${x},${y + 40} ${x - 35},${y + 20} ${x - 35},${y - 20}`}
                  fill="none"
                  stroke="#FF2A00"
                  strokeWidth="1"
                />
              );
            })}
          </svg>
        </div>

        <div className="relative z-10 text-center px-6">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="hero-line w-12 h-[2px] bg-[#FF2A00] origin-left" />
            <span className="font-mono text-xs text-[#FF2A00] uppercase tracking-[0.3em]">
              // 04. HOT-SWAP
            </span>
            <div className="hero-line w-12 h-[2px] bg-[#FF2A00] origin-right" />
          </div>

          <h1 className="hero-title font-sans font-black text-[10vw] md:text-[12vw] lg:text-[14vw] leading-[0.85] tracking-tighter">
            MODULAR<br />
            <span className="text-[#FF2A00]">PODS.</span>
          </h1>

          <p className="hero-tagline font-mono text-lg md:text-xl text-white/60 uppercase tracking-[0.2em] mt-8">
            One drone. Infinite missions.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">Scroll</span>
          <motion.div
            className="w-[1px] h-8 bg-white/20"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </section>

      {/* Content Sections */}
      <div ref={contentRef}>

        {/* The Problem */}
        <section className="content-section border-b border-white/10 py-24 lg:py-32">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
              <div>
                <span className="font-mono text-xs text-[#FF2A00] uppercase tracking-[0.2em] mb-4 block">
                  // The Problem
                </span>
                <h2 className="font-sans font-black text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight">
                  Fixed<span className="text-[#FF2A00]">.</span><br />
                  Payloads<span className="text-[#FF2A00]">.</span>
                </h2>
              </div>
              <div className="flex flex-col justify-center">
                <p className="font-inter text-lg md:text-xl text-white/70 leading-relaxed mb-6">
                  Traditional drones are single-purpose machines. Need thermal? Buy a thermal drone. Need LiDAR? Buy another drone. Your fleet multiplies while your budget disappears.
                </p>
                <p className="font-inter text-lg md:text-xl text-white/70 leading-relaxed">
                  Different missions need different sensors. But maintaining specialized drones for every scenario is unsustainable.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="content-section border-b border-white/10 py-24 lg:py-32 bg-white/[0.02]">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <span className="font-mono text-xs text-[#FF2A00] uppercase tracking-[0.2em] mb-4 block">
              // The Solution
            </span>
            <h2 className="font-sans font-black text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight mb-12">
              Hot-Swap System<span className="text-[#FF2A00]">.</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="border border-white/10 p-8 hover:border-[#FF2A00]/30 hover:bg-white/[0.02] transition-all">
                <div className="font-mono text-[#FF2A00] text-sm mb-4">01</div>
                <h3 className="font-sans font-black text-xl uppercase mb-4">30-Second Swap</h3>
                <p className="font-inter text-white/60 leading-relaxed">
                  Magnetic quick-release mechanism. Pop off one pod, snap on another. Mission reconfiguration in under 30 seconds.
                </p>
              </div>

              <div className="border border-white/10 p-8 hover:border-[#FF2A00]/30 hover:bg-white/[0.02] transition-all">
                <div className="font-mono text-[#FF2A00] text-sm mb-4">02</div>
                <h3 className="font-sans font-black text-xl uppercase mb-4">Auto-Calibration</h3>
                <p className="font-inter text-white/60 leading-relaxed">
                  Each pod contains its calibration profile. Plug in and fly. No manual configuration, no technician required.
                </p>
              </div>

              <div className="border border-white/10 p-8 hover:border-[#FF2A00]/30 hover:bg-white/[0.02] transition-all">
                <div className="font-mono text-[#FF2A00] text-sm mb-4">03</div>
                <h3 className="font-sans font-black text-xl uppercase mb-4">Universal Interface</h3>
                <p className="font-inter text-white/60 leading-relaxed">
                  Standardized data and power connections. All pods work with all Scout drones. Mix and match as needed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pod Types */}
        <section className="content-section border-b border-white/10 py-24 lg:py-32">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <span className="font-mono text-xs text-[#FF2A00] uppercase tracking-[0.2em] mb-4 block">
              // Available Pods
            </span>
            <h2 className="font-sans font-black text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight mb-12">
              The Arsenal<span className="text-[#FF2A00]">.</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {PODS.map((pod, idx) => (
                <div
                  key={pod.id}
                  className="border border-white/10 p-8 hover:border-[#FF2A00]/30 hover:bg-white/[0.02] transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-sans font-black text-2xl uppercase">{pod.name}</h3>
                    <span className="font-mono text-[#FF2A00] text-sm">0{idx + 1}</span>
                  </div>
                  <p className="font-inter text-white/60 leading-relaxed mb-6">
                    {pod.desc}
                  </p>
                  <div className="border-t border-white/10 pt-4">
                    <div className="font-mono text-xs text-white/40 uppercase tracking-widest mb-3">Specifications</div>
                    <div className="flex flex-wrap gap-2">
                      {pod.specs.map((spec, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-white/[0.05] border border-white/10 font-mono text-xs text-white/70"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Specs */}
        <section className="content-section border-b border-white/10 py-24 lg:py-32 bg-white/[0.02]">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <span className="font-mono text-xs text-[#FF2A00] uppercase tracking-[0.2em] mb-4 block">
              // Technical Specifications
            </span>
            <h2 className="font-sans font-black text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight mb-12">
              The Numbers<span className="text-[#FF2A00]">.</span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="border-l-2 border-[#FF2A00]/30 pl-6">
                <div className="font-sans font-black text-5xl md:text-6xl text-[#FF2A00] mb-2">&lt;30</div>
                <div className="font-mono text-xs text-white/40 uppercase tracking-widest">Second Swap Time</div>
              </div>

              <div className="border-l-2 border-[#FF2A00]/30 pl-6">
                <div className="font-sans font-black text-5xl md:text-6xl text-[#FF2A00] mb-2">4+</div>
                <div className="font-mono text-xs text-white/40 uppercase tracking-widest">Pod Types</div>
              </div>

              <div className="border-l-2 border-[#FF2A00]/30 pl-6">
                <div className="font-sans font-black text-5xl md:text-6xl text-[#FF2A00] mb-2">0</div>
                <div className="font-mono text-xs text-white/40 uppercase tracking-widest">Tools Required</div>
              </div>

              <div className="border-l-2 border-[#FF2A00]/30 pl-6">
                <div className="font-sans font-black text-5xl md:text-6xl text-[#FF2A00] mb-2">100%</div>
                <div className="font-mono text-xs text-white/40 uppercase tracking-widest">Field Swappable</div>
              </div>
            </div>

            <div className="mt-16 p-8 border border-white/10">
              <h3 className="font-sans font-black text-xl uppercase mb-6">System Benefits</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <span className="text-[#FF2A00] mt-1">&#9632;</span>
                  <span className="font-inter text-white/70">Reduce fleet size by 75%</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#FF2A00] mt-1">&#9632;</span>
                  <span className="font-inter text-white/70">Lower training requirements</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#FF2A00] mt-1">&#9632;</span>
                  <span className="font-inter text-white/70">Simplified logistics</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#FF2A00] mt-1">&#9632;</span>
                  <span className="font-inter text-white/70">Future-proof investment</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="content-section py-24 lg:py-32">
          <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
            <h2 className="font-sans font-black text-3xl md:text-4xl lg:text-5xl uppercase tracking-tight mb-8">
              One platform<span className="text-[#FF2A00]">.</span><br />
              Every mission<span className="text-[#FF2A00]">.</span>
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleBackToFeatures}
                className="px-8 py-4 border border-white/20 font-mono text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
              >
                Back to Features
              </button>
              <Link
                to="/#contact"
                className="px-8 py-4 bg-[#FF2A00] text-black font-mono text-sm uppercase tracking-widest hover:bg-white transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default ModularPodsPage;
