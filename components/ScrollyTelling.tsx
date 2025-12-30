import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * SCROLLYTELLING - PREMIUM PROBLEM SECTION
 * 
 * Animation Techniques:
 * - Split text character animations
 * - Horizontal text reveals with masks
 * - Parallax depth layering
 * - Kinetic typography
 * - Stats cascade
 */

// Stats data
const STATS = [
  { value: '47%', label: 'of critical intel never reaches decision makers' },
  { value: '23min', label: 'average delay in field-to-command data' },
  { value: '∞', label: 'cost of one wrong decision' },
];

const ScrollyTelling: React.FC = () => {
  const componentRef = useRef<HTMLDivElement>(null);

  // Refs for animation targets
  const chaosRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const problemRef = useRef<HTMLDivElement>(null);
  const consequenceRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Use matchMedia to set different scroll lengths for mobile vs desktop
      const mm = gsap.matchMedia();
      let scrollEnd = "+=800%";

      // Reduce scroll length on mobile for snappier experience
      mm.add("(max-width: 768px)", () => {
        scrollEnd = "+=500%";
      });
      mm.add("(min-width: 769px)", () => {
        scrollEnd = "+=800%";
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: componentRef.current,
          start: "top top",
          end: scrollEnd,
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
        }
      });

      // ========================================
      // SCENE 1: CHAOS ZOOMS IN AND FADES
      // ========================================
      tl.to(chaosRef.current, {
        scale: 15,
        opacity: 0,
        duration: 1.5,
        ease: "power2.inOut",
        pointerEvents: "none",
      });

      // ========================================
      // SCENE 2: STATS CASCADE
      // ========================================

      tl.fromTo(statsRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.4 },
        1.5
      );

      // Stats slide up with blur clear - premium reveal
      tl.fromTo('.stat-item',
        {
          y: 100,
          opacity: 0,
          filter: 'blur(8px)',
        },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          stagger: 0.2,
          duration: 1.2,
          ease: "expo.out"
        },
        1.6
      );

      // Stats value color transition - smooth
      tl.fromTo('.stat-value',
        { color: '#FFFFFF' },
        {
          color: '#FF2A00',
          stagger: 0.15,
          duration: 0.6,
          ease: "power2.inOut"
        },
        2.2
      );

      // Hold stats
      tl.to({}, { duration: 0.6 });

      // ========================================
      // STATS → PROBLEM: CINEMATIC SPLIT REVEAL
      // ========================================

      // Left half slides left - slow and smooth
      tl.to('.stats-left', {
        x: '-110%',
        duration: 1.2,
        ease: "expo.inOut",
      }, 3.0);

      // Right half slides right - slow and smooth
      tl.to('.stats-right', {
        x: '110%',
        duration: 1.2,
        ease: "expo.inOut",
      }, 3.0);

      // ========================================
      // SCENE 3: "DATA IN THE DARK" - THE PROBLEM
      // Premium Cinematic Animation
      // ========================================

      // Problem scene becomes visible BEFORE split starts (sits behind stats)
      tl.fromTo(problemRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.4 },
        2.8
      );

      // Title: Premium focus reveal - smooth blur clear with scale
      tl.fromTo('.problem-title',
        {
          filter: 'blur(30px)',
          scale: 0.92,
          opacity: 0,
        },
        {
          filter: 'blur(0px)',
          scale: 1,
          opacity: 1,
          duration: 1.8,
          ease: "expo.out",
        },
        3.6
      );

      // Description: Smooth fade with gentle rise
      tl.fromTo('.problem-desc',
        {
          opacity: 0,
          y: 50,
          filter: 'blur(4px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.4,
          ease: "expo.out",
        },
        4.0
      );

      // Tag slides in smoothly
      tl.fromTo('.problem-tag',
        { y: -40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "expo.out" },
        3.8
      );

      // Accent bar draws in with precision
      tl.fromTo('.problem-accent-bar',
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 1.2, ease: "expo.inOut" },
        4.2
      );

      // Hold
      tl.to({}, { duration: 1 });

      // Problem scene exits with smooth blur
      tl.to(problemRef.current, {
        scale: 1.05,
        filter: "blur(15px)",
        opacity: 0,
        duration: 1,
        ease: "expo.in",
      }, 5.5);

      // ========================================
      // SCENE 4: "PREVENTABLE FAILURE" - THE CONSEQUENCE
      // Premium Cinematic Animation
      // ========================================

      tl.fromTo(consequenceRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.6 },
        5.8
      );

      // Title: Premium focus reveal
      tl.fromTo('.consequence-title',
        {
          filter: 'blur(30px)',
          scale: 0.92,
          opacity: 0,
        },
        {
          filter: 'blur(0px)',
          scale: 1,
          opacity: 1,
          duration: 1.8,
          ease: "expo.out",
        },
        6.0
      );

      // Description: Smooth fade with gentle rise
      tl.fromTo('.consequence-desc',
        {
          opacity: 0,
          y: 50,
          filter: 'blur(4px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.4,
          ease: "expo.out",
        },
        6.4
      );

      // Tag slides in smoothly
      tl.fromTo('.consequence-tag',
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: "expo.out" },
        6.2
      );

      // Accent bar draws in with precision
      tl.fromTo('.consequence-accent',
        { scaleY: 0, transformOrigin: "top" },
        { scaleY: 1, duration: 1.2, ease: "expo.inOut" },
        6.6
      );


      // Final hold
      tl.to({}, { duration: 1 });

    }, componentRef);

    return () => ctx.revert();
  }, []);

  // Helper to split text into character spans
  const splitChars = (text: string, className: string) => {
    return text.split('').map((char, i) => (
      <span
        key={i}
        className={`${className} inline-block`}
        style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
      >
        {char}
      </span>
    ));
  };

  // Helper to split text into word spans
  const splitWords = (text: string, className: string) => {
    return text.split(' ').map((word, i) => (
      <span key={i} className={`${className} inline-block mr-[0.3em]`}>
        {word}
      </span>
    ));
  };

  return (
    <div ref={componentRef} className="relative h-screen bg-brutal-bg text-brutal-fg overflow-hidden">

      {/* ========================================
          SCENE 1: CHAOS IS THE ENEMY
          ======================================== */}
      <div
        ref={chaosRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-30"
      >
        <h2 className="font-sans font-black text-6xl md:text-8xl lg:text-[10vw] leading-none text-center tracking-tighter mix-blend-difference">
          CHAOS IS<br />
          <span className="text-brutal-accent">THE ENEMY.</span>
        </h2>
      </div>

      {/* ========================================
          SCENE 2: STATS (Split into two halves for reveal)
          ======================================== */}
      <div
        ref={statsRef}
        className="absolute inset-0 z-30 flex items-center justify-center opacity-0 invisible"
      >
        {/* Mobile: Single column layout */}
        <div className="md:hidden stats-left absolute inset-0 bg-brutal-bg flex flex-col items-center justify-center px-6 gap-8">
          {STATS.map((stat, i) => (
            <div key={i} className="stat-item text-center">
              <div className="stat-value font-sans font-black text-5xl leading-none mb-2 tracking-tight">
                {stat.value}
              </div>
              <div className="font-mono text-xs text-gray-400 uppercase tracking-wide border-t border-brutal-line/50 pt-2 max-w-[200px]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Split halves */}
        {/* Left Half */}
        <div className="stats-left hidden md:flex absolute left-0 top-0 w-1/2 h-full bg-brutal-bg items-center justify-end pr-8 md:pr-16">
          <div className="text-right">
            <div className="stat-item mb-12">
              <div className="stat-value font-sans font-black text-6xl md:text-8xl leading-none mb-4 tracking-tight">
                {STATS[0].value}
              </div>
              <div className="font-mono text-sm md:text-base text-gray-400 uppercase tracking-wide border-t border-brutal-line/50 pt-4 max-w-xs ml-auto">
                {STATS[0].label}
              </div>
            </div>
          </div>
        </div>

        {/* Right Half */}
        <div className="stats-right hidden md:flex absolute right-0 top-0 w-1/2 h-full bg-brutal-bg items-center justify-start pl-8 md:pl-16">
          <div className="text-left">
            <div className="stat-item mb-12">
              <div className="stat-value font-sans font-black text-6xl md:text-8xl leading-none mb-4 tracking-tight">
                {STATS[1].value}
              </div>
              <div className="font-mono text-sm md:text-base text-gray-400 uppercase tracking-wide border-t border-brutal-line/50 pt-4 max-w-xs">
                {STATS[1].label}
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-value font-sans font-black text-6xl md:text-8xl leading-none mb-4 tracking-tight">
                {STATS[2].value}
              </div>
              <div className="font-mono text-sm md:text-base text-gray-400 uppercase tracking-wide border-t border-brutal-line/50 pt-4 max-w-xs">
                {STATS[2].label}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================
          SCENE 3: DATA IN THE DARK
          ======================================== */}
      <div
        ref={problemRef}
        className="absolute inset-0 z-10 opacity-0 invisible"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/date_dark.jpg"
            alt="Data in the dark"
            className="w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
          {/* Image Source */}
          <div className="absolute bottom-4 right-4 font-mono text-[10px] text-gray-500 uppercase tracking-wider">
            Image: Japan Times
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-16 lg:px-24">
          <div className="max-w-5xl">
            {/* Tag */}
            <div className="problem-tag flex items-center gap-3 md:gap-4 mb-4 md:mb-8">
              <div className="problem-accent-bar w-8 md:w-12 h-[2px] bg-brutal-accent" />
              <span className="font-mono text-[10px] md:text-xs text-brutal-accent uppercase tracking-[0.2em] md:tracking-[0.3em]">
                // 01. THE PROBLEM
              </span>
            </div>

            {/* Title - Focus Reveal */}
            <h2 className="problem-title font-sans font-black text-5xl sm:text-6xl md:text-8xl lg:text-9xl leading-[0.85] tracking-tighter mb-4 md:mb-8">
              <span className="block">DATA IN</span>
              <span className="block text-brutal-accent">THE DARK.</span>
            </h2>

            {/* Description - Animates as whole unit */}
            <p className="problem-desc font-inter text-base md:text-xl lg:text-2xl text-gray-300 max-w-3xl leading-relaxed">
              In crisis, intelligence is fragmented. Decisions are made on incomplete feeds. You are flying blind when every second counts.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================
          SCENE 4: PREVENTABLE FAILURE
          ======================================== */}
      <div
        ref={consequenceRef}
        className="absolute inset-0 z-20 opacity-0 invisible"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/mistake.jpg"
            alt="Preventable failure"
            className="w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black/40" />
          {/* Image Source */}
          <div className="absolute bottom-4 left-4 font-mono text-[10px] text-gray-500 uppercase tracking-wider">
            Image: Vox
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-end px-6 md:px-16 lg:px-24 text-right">
          <div className="max-w-5xl w-full">
            {/* Tag */}
            <div className="consequence-tag flex items-center justify-end gap-3 md:gap-4 mb-4 md:mb-8">
              <span className="font-mono text-[10px] md:text-xs text-brutal-accent uppercase tracking-[0.2em] md:tracking-[0.3em]">
                // 02. THE CONSEQUENCE
              </span>
              <div className="consequence-accent w-[2px] h-8 md:h-12 bg-brutal-accent" />
            </div>

            {/* Title - Focus Reveal */}
            <h2 className="consequence-title font-sans font-black text-5xl sm:text-6xl md:text-8xl lg:text-9xl leading-[0.85] tracking-tighter mb-4 md:mb-8">
              <span className="block">AVOIDABLE</span>
              <span className="block text-brutal-accent">FAILURE.</span>
            </h2>

            {/* Description - Animates as whole unit */}
            <p className="consequence-desc font-inter text-base md:text-xl lg:text-2xl text-gray-300 max-w-3xl leading-relaxed ml-auto">
              Slow response times. Missed objectives. The cost of chaos isn't just data. It is measured in lives and mission failure.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ScrollyTelling;
