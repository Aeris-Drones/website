import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * PROBLEM MONOLITH
 * A premium, cinematic problem statement section.
 * 
 * Flow:
 * 1. Giant "CHAOS" text splits/shatters revealing the void
 * 2. Statistics cascade in with brutal precision
 * 3. Problem cards materialize with parallax depth
 * 4. Ends with a powerful transition statement
 */

// Data representing the harsh reality
const STATS = [
  { value: '47%', label: 'of critical intel never reaches decision makers' },
  { value: '23min', label: 'average delay in field-to-command data' },
  { value: '∞', label: 'cost of one wrong decision' },
];

const PROBLEMS = [
  {
    id: '01',
    title: 'FRAGMENTED FEEDS',
    description: 'Ten drones. Ten screens. Zero cohesion. Your operators are drowning in data while starving for intelligence.',
    visual: 'SIGNAL_LOSS.ERR',
  },
  {
    id: '02', 
    title: 'INFRASTRUCTURE DEAD',
    description: 'When cell towers fall and satellites lag, your mission doesn\'t wait. But your current systems do.',
    visual: 'OFFLINE_MODE.FAIL',
  },
  {
    id: '03',
    title: 'SECONDS = LIVES',
    description: 'In crisis, every second of latency has a cost. Traditional systems weren\'t built for life-or-death decisions.',
    visual: 'LATENCY_CRITICAL',
  },
];

const ProblemMonolith: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Refs for animation groups
  const chaosTextRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const problemsRef = useRef<HTMLDivElement>(null);
  const problemCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const transitionRef = useRef<HTMLDivElement>(null);
  const gridLinesRef = useRef<(HTMLDivElement | null)[]>([]);
  const scanlineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Create master timeline
      const master = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=400%',
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      // PHASE 1: THE HOOK - "CHAOS" SHATTERS
      // =====================================
      
      // Grid lines draw in
      master.fromTo(
        gridLinesRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, stagger: 0.05, duration: 0.3, ease: 'power2.out' },
        0
      );

      // Scanline starts
      master.fromTo(
        scanlineRef.current,
        { top: '-5%', opacity: 0.5 },
        { top: '105%', opacity: 0, duration: 0.8, ease: 'none' },
        0
      );

      // "CHAOS" text - glitches then explodes
      master.to(chaosTextRef.current, {
        duration: 0.1,
        x: '+=5',
        yoyo: true,
        repeat: 4,
        ease: 'none',
      }, 0);

      master.to('.chaos-letter', {
        scale: 3,
        opacity: 0,
        stagger: {
          each: 0.03,
          from: 'center',
        },
        duration: 0.5,
        ease: 'power4.in',
      }, 0.3);

      // PHASE 2: THE STATS - CASCADE IN
      // ================================
      
      master.fromTo(
        statsRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 },
        0.6
      );

      statItemRefs.current.forEach((stat, i) => {
        master.fromTo(
          stat,
          { y: 100, opacity: 0, rotateX: -15 },
          { y: 0, opacity: 1, rotateX: 0, duration: 0.4, ease: 'power3.out' },
          0.6 + i * 0.1
        );
      });

      // Stats pulse red then settle
      master.to('.stat-value', {
        color: '#FF2A00',
        duration: 0.2,
        stagger: 0.1,
      }, 1.1);

      master.to('.stat-value', {
        color: '#FFFFFF',
        duration: 0.3,
        stagger: 0.1,
      }, 1.4);

      // Fade stats out
      master.to(statsRef.current, {
        opacity: 0,
        y: -50,
        duration: 0.3,
      }, 1.8);

      // PHASE 3: THE PROBLEMS - MATERIALIZE WITH DEPTH
      // ===============================================

      master.fromTo(
        problemsRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.2 },
        2.0
      );

      problemCardRefs.current.forEach((card, i) => {
        // Each card slides in from different directions
        const xOffset = i % 2 === 0 ? -150 : 150;
        
        master.fromTo(
          card,
          { 
            x: xOffset, 
            y: 80, 
            opacity: 0,
            scale: 0.9,
          },
          { 
            x: 0, 
            y: 0, 
            opacity: 1,
            scale: 1,
            duration: 0.4, 
            ease: 'power3.out',
          },
          2.1 + i * 0.15
        );

        // Add subtle parallax to cards
        gsap.to(card, {
          y: -50 * (i + 1) * 0.3,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=400%',
            scrub: 1.2,
          },
        });
      });

      // Problem ID numbers flash
      master.to('.problem-id', {
        textShadow: '0 0 40px #FF2A00',
        duration: 0.2,
        stagger: 0.15,
      }, 2.5);

      // PHASE 4: TRANSITION STATEMENT
      // =============================

      master.to(problemsRef.current, {
        opacity: 0.15,
        scale: 0.95,
        filter: 'blur(4px)',
        duration: 0.3,
      }, 3.2);

      master.fromTo(
        transitionRef.current,
        { opacity: 0, y: 60, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power2.out' },
        3.3
      );

      // Final accent animation
      master.fromTo(
        '.transition-accent',
        { width: 0 },
        { width: '100%', duration: 0.4, ease: 'power2.inOut' },
        3.5
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-brutal-bg text-brutal-fg overflow-hidden"
    >
      {/* DECORATIVE: Animated Grid Lines */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            ref={(el) => (gridLinesRef.current[i] = el)}
            className="absolute left-0 w-full h-[1px] bg-brutal-line/40"
            style={{ top: `${15 + i * 14}%` }}
          />
        ))}
      </div>

      {/* DECORATIVE: Scanline */}
      <div
        ref={scanlineRef}
        className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brutal-accent to-transparent pointer-events-none z-50"
        style={{ top: '-5%' }}
      />

      {/* DECORATIVE: Corner Brackets */}
      <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-brutal-line/50" />
      <div className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-brutal-line/50" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-brutal-line/50" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-brutal-line/50" />

      {/* TACTICAL LABEL */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 font-mono text-xs tracking-[0.3em] text-brutal-line uppercase">
        // SITUATION ANALYSIS
      </div>

      {/* ============================================ */}
      {/* CHAOS TEXT - THE HOOK                        */}
      {/* ============================================ */}
      <div
        ref={chaosTextRef}
        className="absolute inset-0 flex items-center justify-center z-30"
      >
        <h2 className="font-sans font-black text-[18vw] md:text-[16vw] leading-none tracking-tighter text-center select-none">
          {'CHAOS'.split('').map((letter, i) => (
            <span
              key={i}
              className="chaos-letter inline-block"
              style={{
                textShadow: '0 0 100px rgba(255, 42, 0, 0.3)',
              }}
            >
              {letter}
            </span>
          ))}
        </h2>
      </div>

      {/* ============================================ */}
      {/* STATS - THE BRUTAL REALITY                   */}
      {/* ============================================ */}
      <div
        ref={statsRef}
        className="absolute inset-0 flex items-center justify-center z-20 opacity-0"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 max-w-6xl px-6">
          {STATS.map((stat, i) => (
            <div
              key={i}
              ref={(el) => (statItemRefs.current[i] = el)}
              className="text-center md:text-left"
            >
              <div className="stat-value font-sans font-black text-6xl md:text-8xl leading-none mb-4 tracking-tight">
                {stat.value}
              </div>
              <div className="font-mono text-sm md:text-base text-gray-400 uppercase tracking-wide border-t border-brutal-line/50 pt-4">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================ */}
      {/* PROBLEMS - THE BREAKDOWN                     */}
      {/* ============================================ */}
      <div
        ref={problemsRef}
        className="absolute inset-0 flex items-center justify-center z-20 opacity-0 py-24"
      >
        <div className="w-full max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {PROBLEMS.map((problem, i) => (
              <div
                key={problem.id}
                ref={(el) => (problemCardRefs.current[i] = el)}
                className="group relative bg-brutal-gray/50 border border-brutal-line hover:border-brutal-accent transition-colors duration-300"
              >
                {/* Card Header */}
                <div className="border-b border-brutal-line p-6 flex items-center justify-between">
                  <span className="problem-id font-mono text-4xl font-bold text-brutal-accent">
                    {problem.id}
                  </span>
                  <span className="font-mono text-[10px] text-brutal-line uppercase tracking-wider">
                    {problem.visual}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-6 md:p-8">
                  <h3 className="font-sans font-black text-2xl md:text-3xl uppercase tracking-tight mb-4 group-hover:text-brutal-accent transition-colors">
                    {problem.title}
                  </h3>
                  <p className="font-mono text-sm text-gray-400 leading-relaxed">
                    {problem.description}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-brutal-line overflow-hidden">
                  <div className="h-full bg-brutal-accent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ============================================ */}
      {/* TRANSITION STATEMENT                          */}
      {/* ============================================ */}
      <div
        ref={transitionRef}
        className="absolute inset-0 flex items-center justify-center z-40 opacity-0"
      >
        <div className="text-center max-w-4xl px-6">
          <div className="mb-8 overflow-hidden">
            <div className="transition-accent h-[2px] bg-brutal-accent mx-auto" />
          </div>
          <h2 className="font-sans font-black text-4xl md:text-6xl lg:text-7xl uppercase leading-[0.9] tracking-tight mb-8">
            THE COST OF
            <span className="block text-brutal-accent">CHAOS</span>
            ISN'T DATA.
          </h2>
          <p className="font-mono text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            It's measured in seconds. In missed objectives.
            <span className="text-brutal-accent font-bold"> In lives.</span>
          </p>
          <div className="mt-12 font-mono text-xs uppercase tracking-[0.3em] text-brutal-line">
            // THERE IS ANOTHER WAY ↓
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemMonolith;
