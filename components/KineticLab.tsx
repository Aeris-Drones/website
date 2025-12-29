import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HEADLINES = ["DECISIONS", "FASTER", "SAFER", "SMARTER"];

// --- VARIATION 1: BLUEPRINT (Technical, Architectural, Precision) ---
const VariationBlueprint: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const markerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
        }
      });

      // 1. Grid Lines Expand (Scale from center)
      tl.fromTo(lineRefs.current, 
        { scaleX: 0 },
        { scaleX: 1, stagger: 0.1, duration: 1, ease: "expo.inOut" }
      );

      // 2. Text Reveal (Unmasking + Decoding)
      tl.fromTo(textRefs.current,
        { clipPath: "polygon(0 0, 0 100%, 0 100%, 0 0)", x: -20 },
        { clipPath: "polygon(0 0, 0 100%, 100% 100%, 100% 0)", x: 0, stagger: 0.15, duration: 0.8 },
        "<0.2"
      );

      // 3. Technical Markers Pop In
      tl.fromTo(markerRefs.current,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, stagger: 0.1, duration: 0.3 },
        "<0.5"
      );

      // 4. Final Polish (Color Fill)
      tl.to(textRefs.current, {
        color: "#000000", // Fill to black
        textShadow: "none",
        duration: 0.5
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-white text-black min-h-screen relative overflow-hidden flex flex-col justify-center py-24 font-mono">
      <div className="absolute top-8 right-8 text-xs border border-black px-2 py-1">STYLE_01: BLUEPRINT_ARCHITECT</div>
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {HEADLINES.map((word, i) => (
          <div key={i} className="relative group">
             {/* Horizontal Line */}
            <div ref={el => lineRefs.current[i] = el} className="h-[1px] bg-black w-full absolute top-0 left-0 origin-left"></div>
            
            {/* Measuring Marker (Right) */}
            <div ref={el => markerRefs.current[i] = el} className="absolute top-0 right-0 -translate-y-1/2 flex items-center gap-2">
                <span className="text-[10px] bg-black text-white px-1">Y-{100 + (i * 240)}</span>
                <div className="w-2 h-2 border border-black rounded-full"></div>
            </div>

            <div className="py-2 md:py-6 pl-4 md:pl-12 border-l border-black/10">
               <h2 
                 ref={el => textRefs.current[i] = el} 
                 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter leading-none text-transparent stroke-black"
                 style={{ WebkitTextStroke: '2px black' }}
               >
                 {word}
               </h2>
               <p className="font-mono text-xs text-gray-400 mt-2 absolute right-0 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  /// REF_GRID_{i}
               </p>
            </div>
          </div>
        ))}
        <div ref={el => lineRefs.current[HEADLINES.length] = el} className="h-[1px] bg-black w-full origin-left"></div>
      </div>
    </section>
  );
};


// --- VARIATION 2: VELOCITY (Momentum, Skew, Physics) ---
const VariationVelocity: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 0.5, // Less scrub lag for tighter control
        }
      });

      // Rows slide in from alternating sides with heavy skew
      rowRefs.current.forEach((row, i) => {
        const isEven = i % 2 === 0;
        const xStart = isEven ? -100 : 100; // Percent
        
        tl.fromTo(row, 
          { xPercent: xStart, autoAlpha: 0, skewX: isEven ? -45 : 45 },
          { xPercent: 0, autoAlpha: 1, skewX: 0, duration: 1, ease: "power2.out" },
          i * 0.15 // Overlap
        );
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-[#111] text-white min-h-screen relative overflow-hidden flex flex-col justify-center">
      <div className="absolute top-8 right-8 font-mono text-xs border border-white px-2 py-1">STYLE_02: VELOCITY_SKEW</div>
      
      {/* Decorative Speed Lines */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
         <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-white to-transparent"></div>
         <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-white to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 overflow-hidden">
        {HEADLINES.map((word, i) => (
          <div key={i} ref={el => rowRefs.current[i] = el} className="py-2 flex justify-center will-change-transform">
             <h2 className="text-7xl md:text-[10vw] font-black italic uppercase tracking-tighter leading-[0.85] text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-white">
               {word}
             </h2>
          </div>
        ))}
      </div>
    </section>
  );
};


// --- VARIATION 3: ECLIPSE (Light, Shadow, Cinematic) ---
const VariationEclipse: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
        }
      });

      // 1. Reveal Text from Darkness
      tl.fromTo(".eclipse-word",
        { opacity: 0.1, scale: 0.9, filter: "blur(10px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", stagger: 0.2, duration: 2, ease: "power2.out" }
      );

      // 2. Light Sweep Effect
      tl.fromTo(".light-sweep",
        { x: "-100%" },
        { x: "200%", duration: 2.5, ease: "power1.inOut" },
        "<"
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-black text-white min-h-screen relative overflow-hidden flex flex-col justify-center items-center">
      <div className="absolute top-8 right-8 font-mono text-xs border border-white/20 text-gray-500 px-2 py-1">STYLE_03: ECLIPSE_LIGHT</div>

      {/* Ambient Background Light */}
      <div className="absolute inset-0 bg-radial-gradient from-gray-900 to-black opacity-50 pointer-events-none"></div>

      <div className="relative z-10 text-center mix-blend-screen">
        <div ref={textRef} className="flex flex-col items-center relative overflow-hidden p-8">
            
            {/* The Light Sweep Overlay */}
            <div className="light-sweep absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] pointer-events-none z-20 w-1/2 h-full blur-xl"></div>

            {HEADLINES.map((word, i) => (
                <h2 key={i} className="eclipse-word text-6xl md:text-9xl font-black uppercase leading-none tracking-tighter text-white/90 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                {word}
                </h2>
            ))}
        </div>
      </div>

      <div className="absolute bottom-12 text-center">
         <p className="font-mono text-xs text-gray-600 uppercase tracking-[0.3em] animate-pulse">
            System Online /// Illuminating
         </p>
      </div>
    </section>
  );
};


const KineticLab: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50 bg-brutal-accent text-black font-mono text-xs font-bold text-center py-2 uppercase tracking-widest">
         KINETIC LAB /// ITERATION CYCLE 02
      </div>
      
      <VariationBlueprint />
      <VariationVelocity />
      <VariationEclipse />

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-full shadow-2xl z-50 flex gap-4 font-mono text-xs">
         <span>SCROLL TO COMPARE STYLES</span>
      </div>
    </div>
  );
};

export default KineticLab;
