import React, { useLayoutEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../Navbar';

gsap.registerPlugin(ScrollTrigger);

const NoCloudPage: React.FC = () => {
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

        {/* Animated Background Pattern */}
        <div className="absolute inset-0 overflow-hidden opacity-[0.05]">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-6">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="hero-line w-12 h-[2px] bg-[#FF2A00] origin-left" />
            <span className="font-mono text-xs text-[#FF2A00] uppercase tracking-[0.3em]">
              // 02. OFFLINE
            </span>
            <div className="hero-line w-12 h-[2px] bg-[#FF2A00] origin-right" />
          </div>

          <h1 className="hero-title font-sans font-black text-[15vw] md:text-[18vw] lg:text-[20vw] leading-[0.85] tracking-tighter">
            NO<br />
            <span className="text-[#FF2A00]">CLOUD.</span>
          </h1>

          <p className="hero-tagline font-mono text-lg md:text-xl text-white/60 uppercase tracking-[0.2em] mt-8">
            Your data. Your control.
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
                  Single Point<span className="text-[#FF2A00]">.</span><br />
                  Of Failure<span className="text-[#FF2A00]">.</span>
                </h2>
              </div>
              <div className="flex flex-col justify-center">
                <p className="font-inter text-lg md:text-xl text-white/70 leading-relaxed mb-6">
                  Cloud dependency is the Achilles heel of modern drone systems. In disaster zones, connectivity dies first. Your mission-critical data becomes hostage to infrastructure that's already failed.
                </p>
                <p className="font-inter text-lg md:text-xl text-white/70 leading-relaxed">
                  When towers fall and servers go dark, you need systems that keep working. Period.
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
              Mesh Network<span className="text-[#FF2A00]">.</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="border border-white/10 p-8 hover:border-[#FF2A00]/30 hover:bg-white/[0.02] transition-all">
                <div className="font-mono text-[#FF2A00] text-sm mb-4">01</div>
                <h3 className="font-sans font-black text-xl uppercase mb-4">Zero Internet Required</h3>
                <p className="font-inter text-white/60 leading-relaxed">
                  Drones create their own local network. No cell towers, no satellites, no cloud servers. True operational independence.
                </p>
              </div>

              <div className="border border-white/10 p-8 hover:border-[#FF2A00]/30 hover:bg-white/[0.02] transition-all">
                <div className="font-mono text-[#FF2A00] text-sm mb-4">02</div>
                <h3 className="font-sans font-black text-xl uppercase mb-4">Self-Healing Network</h3>
                <p className="font-inter text-white/60 leading-relaxed">
                  If one node drops, the mesh automatically reconfigures. Data routes around obstacles. Resilience is built into the architecture.
                </p>
              </div>

              <div className="border border-white/10 p-8 hover:border-[#FF2A00]/30 hover:bg-white/[0.02] transition-all">
                <div className="font-mono text-[#FF2A00] text-sm mb-4">03</div>
                <h3 className="font-sans font-black text-xl uppercase mb-4">End-to-End Encrypted</h3>
                <p className="font-inter text-white/60 leading-relaxed">
                  Military-grade encryption on all communications. Your data never touches third-party infrastructure. Complete sovereignty.
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
                <div className="font-sans font-black text-5xl md:text-6xl text-[#FF2A00] mb-2">0</div>
                <div className="font-mono text-xs text-white/40 uppercase tracking-widest">Internet Required</div>
              </div>

              <div className="border-l-2 border-[#FF2A00]/30 pl-6">
                <div className="font-sans font-black text-5xl md:text-6xl text-[#FF2A00] mb-2">5km</div>
                <div className="font-mono text-xs text-white/40 uppercase tracking-widest">Mesh Range</div>
              </div>

              <div className="border-l-2 border-[#FF2A00]/30 pl-6">
                <div className="font-sans font-black text-5xl md:text-6xl text-[#FF2A00] mb-2">256</div>
                <div className="font-mono text-xs text-white/40 uppercase tracking-widest">Bit Encryption</div>
              </div>

              <div className="border-l-2 border-[#FF2A00]/30 pl-6">
                <div className="font-sans font-black text-5xl md:text-6xl text-[#FF2A00] mb-2">&lt;1s</div>
                <div className="font-mono text-xs text-white/40 uppercase tracking-widest">Failover Time</div>
              </div>
            </div>

            <div className="mt-16 p-8 border border-white/10 bg-white/[0.02]">
              <h3 className="font-sans font-black text-xl uppercase mb-6">Security Features</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <span className="text-[#FF2A00] mt-1">&#9632;</span>
                  <span className="font-inter text-white/70">AES-256 encryption standard</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#FF2A00] mt-1">&#9632;</span>
                  <span className="font-inter text-white/70">Zero data transmitted externally</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#FF2A00] mt-1">&#9632;</span>
                  <span className="font-inter text-white/70">Automatic key rotation</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#FF2A00] mt-1">&#9632;</span>
                  <span className="font-inter text-white/70">Tamper-resistant hardware</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="content-section py-24 lg:py-32">
          <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
            <h2 className="font-sans font-black text-3xl md:text-4xl lg:text-5xl uppercase tracking-tight mb-8">
              Take back<br />
              <span className="text-[#FF2A00]">control.</span>
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

export default NoCloudPage;
