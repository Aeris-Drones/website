import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../Navbar';

gsap.registerPlugin(ScrollTrigger);

const SwarmIQPage: React.FC = () => {
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
        {/* Neural Network Background */}
        <div className="absolute inset-0 opacity-[0.08]">
          <svg className="w-full h-full" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
            {/* Network nodes */}
            {[...Array(15)].map((_, i) => {
              const x = 100 + (i % 5) * 150 + Math.random() * 50;
              const y = 100 + Math.floor(i / 5) * 180 + Math.random() * 50;
              return (
                <g key={i}>
                  <circle cx={x} cy={y} r="4" fill="#FF2A00" />
                  {/* Connections */}
                  {i < 10 && <line x1={x} y1={y} x2={x + 120 + Math.random() * 60} y2={y + 150 + Math.random() * 60} stroke="#FF2A00" strokeWidth="0.5" opacity="0.3" />}
                </g>
              );
            })}
          </svg>
        </div>

        <div className="relative z-10 text-center px-6">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="hero-line w-12 h-[2px] bg-[#FF2A00] origin-left" />
            <span className="font-mono text-xs text-[#FF2A00] uppercase tracking-[0.3em]">
              // 03. AUTONOMY
            </span>
            <div className="hero-line w-12 h-[2px] bg-[#FF2A00] origin-right" />
          </div>

          <h1 className="hero-title font-sans font-black text-[12vw] md:text-[15vw] lg:text-[17vw] leading-[0.85] tracking-tighter">
            SWARM<br />
            <span className="text-[#FF2A00]">IQ.</span>
          </h1>

          <p className="hero-tagline font-mono text-lg md:text-xl text-white/60 uppercase tracking-[0.2em] mt-8">
            Autonomous. Intelligent. Relentless.
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
                  Human<span className="text-[#FF2A00]">.</span><br />
                  Limitations<span className="text-[#FF2A00]">.</span>
                </h2>
              </div>
              <div className="flex flex-col justify-center">
                <p className="font-inter text-lg md:text-xl text-white/70 leading-relaxed mb-6">
                  Manual coverage means human limitations. Fatigue sets in. Bias creeps in. Blind spots multiply. One operator can only watch so many screens, track so many targets.
                </p>
                <p className="font-inter text-lg md:text-xl text-white/70 leading-relaxed">
                  In complex search operations, the math is simple: more area, less time, fewer people. Something has to give.
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
              Collective Intelligence<span className="text-[#FF2A00]">.</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="border border-white/10 p-8 hover:border-[#FF2A00]/30 hover:bg-white/[0.02] transition-all">
                <div className="font-mono text-[#FF2A00] text-sm mb-4">01</div>
                <h3 className="font-sans font-black text-xl uppercase mb-4">Multi-Agent Coordination</h3>
                <p className="font-inter text-white/60 leading-relaxed">
                  Drones communicate and coordinate in real-time. No overlap, no gaps. The swarm thinks as one while acting as many.
                </p>
              </div>

              <div className="border border-white/10 p-8 hover:border-[#FF2A00]/30 hover:bg-white/[0.02] transition-all">
                <div className="font-mono text-[#FF2A00] text-sm mb-4">02</div>
                <h3 className="font-sans font-black text-xl uppercase mb-4">Adaptive Path Planning</h3>
                <p className="font-inter text-white/60 leading-relaxed">
                  Algorithms continuously optimize coverage patterns. New information triggers instant replanning. The search evolves in real-time.
                </p>
              </div>

              <div className="border border-white/10 p-8 hover:border-[#FF2A00]/30 hover:bg-white/[0.02] transition-all">
                <div className="font-mono text-[#FF2A00] text-sm mb-4">03</div>
                <h3 className="font-sans font-black text-xl uppercase mb-4">Priority-Based Tasking</h3>
                <p className="font-inter text-white/60 leading-relaxed">
                  AI identifies high-value targets and dynamically reallocates resources. What matters most gets attention first.
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
                <div className="font-sans font-black text-5xl md:text-6xl text-[#FF2A00] mb-2">1:N</div>
                <div className="font-mono text-xs text-white/40 uppercase tracking-widest">Pilot to Swarm Ratio</div>
              </div>

              <div className="border-l-2 border-[#FF2A00]/30 pl-6">
                <div className="font-sans font-black text-5xl md:text-6xl text-[#FF2A00] mb-2">10x</div>
                <div className="font-mono text-xs text-white/40 uppercase tracking-widest">Coverage Speed</div>
              </div>

              <div className="border-l-2 border-[#FF2A00]/30 pl-6">
                <div className="font-sans font-black text-5xl md:text-6xl text-[#FF2A00] mb-2">0</div>
                <div className="font-mono text-xs text-white/40 uppercase tracking-widest">Coverage Gaps</div>
              </div>

              <div className="border-l-2 border-[#FF2A00]/30 pl-6">
                <div className="font-sans font-black text-5xl md:text-6xl text-[#FF2A00] mb-2">24/7</div>
                <div className="font-mono text-xs text-white/40 uppercase tracking-widest">Operational Endurance</div>
              </div>
            </div>

            <div className="mt-16 p-8 border border-white/10 bg-white/[0.02]">
              <h3 className="font-sans font-black text-xl uppercase mb-6">AI Capabilities</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <span className="text-[#FF2A00] mt-1">&#9632;</span>
                  <span className="font-inter text-white/70">Real-time target detection</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#FF2A00] mt-1">&#9632;</span>
                  <span className="font-inter text-white/70">Anomaly recognition</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#FF2A00] mt-1">&#9632;</span>
                  <span className="font-inter text-white/70">Predictive path optimization</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#FF2A00] mt-1">&#9632;</span>
                  <span className="font-inter text-white/70">Automatic threat escalation</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="content-section py-24 lg:py-32">
          <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
            <h2 className="font-sans font-black text-3xl md:text-4xl lg:text-5xl uppercase tracking-tight mb-8">
              Multiply your<br />
              <span className="text-[#FF2A00]">capabilities.</span>
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

export default SwarmIQPage;
