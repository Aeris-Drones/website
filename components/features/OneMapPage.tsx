import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../Navbar';

gsap.registerPlugin(ScrollTrigger);

const OneMapPage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero title animation
      gsap.fromTo('.hero-title',
        { opacity: 0, y: 100, filter: 'blur(20px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'expo.out', delay: 0.3 }
      );

      gsap.fromTo('.hero-tagline',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'expo.out', delay: 0.6 }
      );

      gsap.fromTo('.hero-line',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: 'expo.inOut', delay: 0.8 }
      );

      gsap.fromTo('.scroll-indicator',
        { opacity: 0 },
        { opacity: 1, duration: 0.6, delay: 1.2 }
      );

      // Content sections scroll animations
      const sections = gsap.utils.toArray('.content-section');
      sections.forEach((section: any) => {
        gsap.fromTo(section,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="bg-[#050505] text-[#F0F0F0] min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center border-b border-white/10 overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#fff" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative z-10 text-center px-6">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="hero-line w-12 h-[2px] bg-[#FF2A00] origin-left" />
            <span className="font-mono text-xs text-[#FF2A00] uppercase tracking-[0.3em]">
              // 01. FUSION
            </span>
            <div className="hero-line w-12 h-[2px] bg-[#FF2A00] origin-right" />
          </div>

          <h1 className="hero-title font-sans font-black text-[15vw] md:text-[18vw] lg:text-[20vw] leading-[0.85] tracking-tighter">
            ONE<br />
            <span className="text-[#FF2A00]">MAP.</span>
          </h1>

          <p className="hero-tagline font-mono text-lg md:text-xl text-white/60 uppercase tracking-[0.2em] mt-8">
            See everything. At once.
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
                  Three Screens<span className="text-[#FF2A00]">.</span><br />
                  Three Blind Spots<span className="text-[#FF2A00]">.</span>
                </h2>
              </div>
              <div className="flex flex-col justify-center">
                <p className="font-inter text-lg md:text-xl text-white/70 leading-relaxed mb-6">
                  Thermal, video, and depth sensors each show part of the picture. Operators juggle three screens, three cognitive loads. Critical details slip through the gaps.
                </p>
                <p className="font-inter text-lg md:text-xl text-white/70 leading-relaxed">
                  In high-stakes situations, fragmented data costs lives. You need a unified view, not a puzzle.
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
              Fusion Engine<span className="text-[#FF2A00]">.</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="border border-white/10 p-8 hover:border-[#FF2A00]/30 hover:bg-white/[0.02] transition-all">
                <div className="font-mono text-[#FF2A00] text-sm mb-4">01</div>
                <h3 className="font-sans font-black text-xl uppercase mb-4">Multi-Modal Overlay</h3>
                <p className="font-inter text-white/60 leading-relaxed">
                  Thermal, RGB, and depth data fused into a single coherent view. See heat signatures, visual detail, and spatial depth simultaneously.
                </p>
              </div>

              <div className="border border-white/10 p-8 hover:border-[#FF2A00]/30 hover:bg-white/[0.02] transition-all">
                <div className="font-mono text-[#FF2A00] text-sm mb-4">02</div>
                <h3 className="font-sans font-black text-xl uppercase mb-4">Real-Time Composite</h3>
                <p className="font-inter text-white/60 leading-relaxed">
                  Sub-50ms latency ensures you see what's happening now, not what happened. No buffering, no delay, no compromise.
                </p>
              </div>

              <div className="border border-white/10 p-8 hover:border-[#FF2A00]/30 hover:bg-white/[0.02] transition-all">
                <div className="font-mono text-[#FF2A00] text-sm mb-4">03</div>
                <h3 className="font-sans font-black text-xl uppercase mb-4">Zero Lag Processing</h3>
                <p className="font-inter text-white/60 leading-relaxed">
                  Edge computing on each drone. Fusion happens where the data is, eliminating transmission bottlenecks entirely.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Specs */}
        <section className="content-section border-b border-white/10 py-24 lg:py-32">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <span className="font-mono text-xs text-[#FF2A00] uppercase tracking-[0.2em] mb-4 block">
              // Technical Specifications
            </span>
            <h2 className="font-sans font-black text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight mb-12">
              The Numbers<span className="text-[#FF2A00]">.</span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="border-l-2 border-[#FF2A00]/30 pl-6">
                <div className="font-sans font-black text-5xl md:text-6xl text-[#FF2A00] mb-2">&lt;50</div>
                <div className="font-mono text-xs text-white/40 uppercase tracking-widest">MS Fusion Latency</div>
              </div>

              <div className="border-l-2 border-[#FF2A00]/30 pl-6">
                <div className="font-sans font-black text-5xl md:text-6xl text-[#FF2A00] mb-2">3</div>
                <div className="font-mono text-xs text-white/40 uppercase tracking-widest">Sensor Modalities</div>
              </div>

              <div className="border-l-2 border-[#FF2A00]/30 pl-6">
                <div className="font-sans font-black text-5xl md:text-6xl text-[#FF2A00] mb-2">4K</div>
                <div className="font-mono text-xs text-white/40 uppercase tracking-widest">Output Resolution</div>
              </div>

              <div className="border-l-2 border-[#FF2A00]/30 pl-6">
                <div className="font-sans font-black text-5xl md:text-6xl text-[#FF2A00] mb-2">0</div>
                <div className="font-mono text-xs text-white/40 uppercase tracking-widest">Cloud Dependency</div>
              </div>
            </div>

            <div className="mt-16 p-8 border border-white/10 bg-white/[0.02]">
              <h3 className="font-sans font-black text-xl uppercase mb-6">Operational Capabilities</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <span className="text-[#FF2A00] mt-1">&#9632;</span>
                  <span className="font-inter text-white/70">Works in complete darkness</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#FF2A00] mt-1">&#9632;</span>
                  <span className="font-inter text-white/70">Penetrates smoke and dust</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#FF2A00] mt-1">&#9632;</span>
                  <span className="font-inter text-white/70">Automatic target highlighting</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#FF2A00] mt-1">&#9632;</span>
                  <span className="font-inter text-white/70">Exportable to standard formats</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="content-section py-24 lg:py-32">
          <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
            <h2 className="font-sans font-black text-3xl md:text-4xl lg:text-5xl uppercase tracking-tight mb-8">
              Ready to see the<br />
              <span className="text-[#FF2A00]">complete picture?</span>
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/"
                className="px-8 py-4 border border-white/20 font-mono text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
              >
                Back to Home
              </Link>
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

export default OneMapPage;
