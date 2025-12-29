import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- SHARED DATA ---
const CONTENT = {
  hook: "CHAOS IS THE ENEMY",
  p1_title: "DATA IN THE DARK",
  p1_desc: "In crisis, intelligence is fragmented. Decisions are made on incomplete feeds. You are flying blind.",
  p2_title: "PREVENTABLE FAILURE",
  p2_desc: "Slow response. Missed objectives. The cost is measured in lives.",
};

// --- VARIATION 1: THE SIGNAL (Glitch, Noise, Distortion) ---
const VariationSignal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=250%",
          pin: true,
          scrub: 0.5,
        }
      });

      // 1. Hook Distorts
      tl.to(".signal-hook", {
        scale: 5,
        opacity: 0,
        filter: "blur(20px)",
        letterSpacing: "50px",
        duration: 1,
        ease: "power2.inOut"
      });

      // 2. Static Noise Flash (simulated)
      tl.fromTo(".signal-noise",
        { opacity: 0 },
        { opacity: 0.2, duration: 0.1, repeat: 5, yoyo: true },
        "-=0.5"
      );

      // 3. Problem Text Glitches In
      tl.fromTo(".signal-p1",
        { opacity: 0, x: -100, skewX: -20 },
        { opacity: 1, x: 0, skewX: 0, duration: 0.5 },
        "-=0.2"
      );

      // 4. Transition to Consequence
      tl.to(".signal-p1", { opacity: 0, x: 100, skewX: 20, duration: 0.5, delay: 0.5 });
      tl.fromTo(".signal-p2",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5 }
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-black text-white h-screen relative overflow-hidden flex flex-col justify-center items-center font-mono">
      <div className="absolute top-8 right-8 text-xs border border-white px-2 py-1 text-green-500 border-green-900">VAR_01: SIGNAL_LOSS</div>

      {/* Background Noise (CSS Pattern) */}
      <div className="absolute inset-0 opacity-10 signal-noise pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

      <div className="relative z-10 w-full max-w-5xl px-6 text-center">
        {/* Hook */}
        <h2 className="signal-hook text-6xl md:text-9xl font-black uppercase leading-none tracking-tighter text-transparent stroke-white" style={{ WebkitTextStroke: '1px white' }}>
          {CONTENT.hook}
        </h2>

        {/* Problem Stage */}
        <div className="signal-p1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full opacity-0">
          <h3 className="text-5xl md:text-7xl font-bold bg-white text-black inline-block px-4 py-2 mb-6 transform -rotate-2">
            {CONTENT.p1_title}
          </h3>
          <p className="text-xl md:text-2xl text-red-500 font-bold max-w-2xl mx-auto border-l-4 border-red-500 pl-4">
            {CONTENT.p1_desc}
          </p>
        </div>

        {/* Consequence Stage */}
        <div className="signal-p2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full opacity-0">
          <h3 className="text-5xl md:text-8xl font-black text-red-600 mb-6 tracking-widest uppercase">
            {CONTENT.p2_title}
          </h3>
          <div className="flex justify-center gap-4">
            <span className="bg-red-900 text-red-100 px-2 py-1 text-xs">CRITICAL FAILURE</span>
            <span className="bg-red-900 text-red-100 px-2 py-1 text-xs">OFFLINE</span>
          </div>
        </div>
      </div>
    </section>
  );
};


// --- VARIATION 2: THE FRAGMENT (Collage, Split, Brutalist) ---
const VariationFragment: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftCol = useRef(null);
  const rightCol = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 0,
        }
      });

      // Split Open
      tl.to(leftCol.current, { x: "-100%", ease: "none" }, 0);
      tl.to(rightCol.current, { x: "100%", ease: "none" }, 0);

      // Reveal Center Content
      tl.fromTo(".fragment-center",
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5 },
        0
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-[#E5E5E5] text-black h-screen relative overflow-hidden flex items-center justify-center font-sans">
      <div className="absolute top-8 right-8 text-xs border border-black px-2 py-1 z-50">VAR_02: FRAGMENTED</div>

      {/* The Reveal (Center) */}
      <div className="fragment-center text-center max-w-4xl px-6 relative z-0">
        <h2 className="text-7xl font-black uppercase mb-8 leading-[0.8] tracking-tighter">
          System <br /><span className="text-brutal-accent">Failure</span>
        </h2>
        <div className="grid grid-cols-2 gap-12 text-left">
          <div>
            <h4 className="font-bold border-b-2 border-black mb-2">01. BLIND SPOTS</h4>
            <p className="text-sm">Operators cannot see the full picture. Feeds are isolated. Context is lost.</p>
          </div>
          <div>
            <h4 className="font-bold border-b-2 border-black mb-2">02. LATENCY</h4>
            <p className="text-sm">Information moves too slow. By the time you see it, the window has closed.</p>
          </div>
        </div>
      </div>

      {/* The Cover (Left) */}
      <div ref={leftCol} className="absolute left-0 top-0 w-1/2 h-full bg-black text-white flex items-center justify-end pr-4 z-10 border-r border-white/20">
        <h2 className="text-[10vw] font-black leading-none translate-x-[2vw]">CHAOS</h2>
      </div>

      {/* The Cover (Right) */}
      <div ref={rightCol} className="absolute right-0 top-0 w-1/2 h-full bg-black text-white flex items-center justify-start pl-4 z-10 border-l border-white/20">
        <h2 className="text-[10vw] font-black leading-none -translate-x-[2vw]">REIGNS</h2>
      </div>
    </section>
  );
};


// --- VARIATION 3: THE VOID (Minimal, Typographic, Dark) ---
const VariationVoid: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1,
        }
      });

      // 1. Text fades in line by line
      tl.fromTo(".void-line",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.5, duration: 2, ease: "power4.out" }
      );

      // 2. Turns Red
      tl.to(".void-text", { color: "#FF0000", duration: 1 });

      // 3. Glitch/Shake Effect
      tl.to(".void-content", { x: 5, yoyo: true, repeat: 10, duration: 0.05 });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-[#050505] text-gray-500 h-screen relative overflow-hidden flex flex-col justify-center items-center font-sans">
      <div className="absolute top-8 right-8 text-xs border border-gray-800 px-2 py-1">VAR_03: THE_VOID</div>

      <div className="void-content max-w-5xl px-6">
        <div className="void-text text-5xl md:text-7xl lg:text-8xl font-bold uppercase leading-tight tracking-tight text-center">
          <div className="void-line">You are</div>
          <div className="void-line text-white">Flying Blind.</div>
          <div className="void-line mt-12 text-2xl md:text-4xl font-mono font-normal normal-case max-w-2xl mx-auto text-gray-400">
            "We send humans into the dark because our machines aren't smart enough to go first."
          </div>
        </div>
      </div>
    </section>
  );
};


import ProblemHumaan from './ProblemHumaan';
import ProblemMonolith from './ProblemMonolith';
import ProblemVault from './ProblemVault';

const ProblemLab: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50 bg-brutal-accent text-black font-mono text-xs font-bold text-center py-2 uppercase tracking-widest">
        PROBLEM LAB /// DEFINING THE ENEMY
      </div>

      {/* NEW: The Vault - Humaan Style Light Blueprint */}
      <ProblemVault />

      {/* Variation: The Monolith - Premium cinematic version */}
      <ProblemMonolith />

      <VariationSignal />
      <VariationFragment />
      <VariationVoid />
      <ProblemHumaan />

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-full shadow-2xl z-50 flex gap-4 font-mono text-xs">
        <span>SCROLL TO EXPLORE CONCEPTS</span>
      </div>
    </div>
  );
};

export default ProblemLab;

