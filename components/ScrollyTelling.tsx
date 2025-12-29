import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollyTelling: React.FC = () => {
  const componentRef = useRef<HTMLDivElement>(null);
  
  // Refs for animation targets
  const chaosRef = useRef<HTMLDivElement>(null);
  const problemRef = useRef<HTMLDivElement>(null);
  const consequenceRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: componentRef.current,
          start: "top top",
          end: "+=400%", // Scroll distance
          scrub: 1, // Smooth scrubbing
          pin: true, // Pin the container
          anticipatePin: 1,
        }
      });

      // SCENE 1 -> SCENE 2 TRANSITION
      // Chaos zooms in massive and fades
      tl.to(chaosRef.current, {
        scale: 15,
        opacity: 0,
        duration: 1.5,
        ease: "power2.inOut",
        pointerEvents: "none",
      })
      
      // Reveal PROBLEM (Slide in from bottom/fade)
      .fromTo(problemRef.current, 
        { autoAlpha: 0, y: 100 },
        { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" },
        "-=0.5"
      )
      
      // Hold Problem
      .to({}, { duration: 0.5 })
      
      // Hide PROBLEM (Slide up/fade out)
      .to(problemRef.current, {
        autoAlpha: 0,
        y: -100,
        duration: 1,
        ease: "power2.in"
      })

      // Reveal CONSEQUENCE (Slide in from bottom/fade)
      .fromTo(consequenceRef.current, 
        { autoAlpha: 0, y: 100 },
        { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" },
        "-=0.5"
      )

      // Hold Consequence
      .to({}, { duration: 1 });

    }, componentRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={componentRef} className="relative h-screen bg-brutal-bg text-brutal-fg overflow-hidden border-b border-brutal-line">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900/20 to-brutal-bg pointer-events-none"></div>

      {/* SCENE 1: THE HOOK */}
      <div 
        ref={chaosRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-30"
      >
        <h2 className="font-sans font-black text-6xl md:text-8xl lg:text-[10vw] leading-none text-center tracking-tighter mix-blend-difference">
          CHAOS IS<br />
          <span className="text-brutal-accent">THE ENEMY.</span>
        </h2>
      </div>

      {/* SCENE 2: THE PROBLEM (Split Layout: Text Left, Visual Right) */}
      <div 
        ref={problemRef}
        className="absolute inset-0 flex items-center justify-center z-20 opacity-0 invisible w-full h-full px-4 md:px-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-7xl h-[60vh] gap-8 md:gap-16 items-center">
            {/* Text Side */}
            <div className="flex flex-col justify-center text-left order-2 md:order-1">
                <span className="text-brutal-accent font-mono text-sm tracking-[0.2em] mb-6 block uppercase border-l-2 border-brutal-accent pl-4">
                    // 01. The Problem
                </span>
                <h3 className="font-sans font-bold text-5xl md:text-6xl lg:text-7xl mb-6 leading-[0.9] text-white">
                    DATA IN<br/>THE DARK.
                </h3>
                <p className="font-mono text-gray-400 text-sm md:text-lg leading-relaxed max-w-md">
                    In crisis, intelligence is fragmented. Decisions are made on incomplete feeds. You are flying blind when every second counts.
                </p>
            </div>

            {/* Visual Side */}
            <div className="relative w-full h-full border border-brutal-line bg-brutal-gray/20 rounded-sm overflow-hidden order-1 md:order-2 group">
                 <img 
                   src="/date_dark.jpg" 
                   alt="Data in the dark" 
                   className="w-full h-full object-cover"
                 />
            </div>
        </div>
      </div>

      {/* SCENE 3: THE CONSEQUENCE (Split Layout: Visual Left, Text Right) */}
      <div 
        ref={consequenceRef}
        className="absolute inset-0 flex items-center justify-center z-20 opacity-0 invisible w-full h-full px-4 md:px-12"
      >
         <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-7xl h-[60vh] gap-8 md:gap-16 items-center">
            {/* Visual Side */}
            <div className="relative w-full h-full border border-brutal-accent/30 bg-brutal-accent/5 rounded-sm overflow-hidden order-1">
                <img 
                  src="/mistake.jpg" 
                  alt="Mistakes" 
                  className="w-full h-full object-cover"
                />
            </div>

            {/* Text Side */}
            <div className="flex flex-col justify-center text-left order-2">
                <span className="text-brutal-accent font-mono text-sm tracking-[0.2em] mb-6 block uppercase border-l-2 border-brutal-accent pl-4">
                    // 02. The Consequence
                </span>
                <h3 className="font-sans font-bold text-5xl md:text-6xl lg:text-7xl mb-6 leading-[0.9] text-white">
                    PREVENTABLE<br/>FAILURE.
                </h3>
                <p className="font-mono text-gray-400 text-sm md:text-lg leading-relaxed max-w-md">
                    Slow response times. Missed objectives. The cost of chaos isn't just data—it is measured in lives and mission failure.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollyTelling;
