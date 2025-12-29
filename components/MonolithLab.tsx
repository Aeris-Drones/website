import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- SHARED DATA ---
const MISSION = {
  headline: ["DECISIONS", "FASTER", "SAFER", "SMARTER"],
  sub: "When seconds matter and infrastructure fails.",
  principles: [
    { id: "01", title: "RELIABILITY > NOVELTY", desc: "WORKS WHEN THE INTERNET IS DEAD." },
    { id: "02", title: "OPERATOR-FIRST", desc: "ONE MAP. PRIORITIZED ALERTS." },
    { id: "03", title: "SAFETY BY DESIGN", desc: "REDUCE HUMAN EXPOSURE." },
    { id: "04", title: "EDGE-NATIVE", desc: "THE SWARM IS THE SERVER." },
    { id: "05", title: "REPEATABLE", desc: "STANDARDIZED SURVEYS." }
  ]
};

// --- VARIATION A: THE KINETIC GRID (Scroll-Pinned, Reveal Effects) ---
const VariationKinetic: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 0.8,
        }
      });

      // 1. Staggered Text Reveal
      tl.fromTo(textRefs.current, 
        { y: 150, opacity: 0, rotateX: 20 },
        { y: 0, opacity: 1, rotateX: 0, stagger: 0.1, duration: 1, ease: "power4.out" }
      );

      // 2. Grid Lines Drawing In
      tl.fromTo(lineRefs.current,
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, stagger: 0.1, duration: 0.8, ease: "expo.out" },
        "<0.5"
      );

      // 3. Highlight Colors Shift
      tl.to(".kinetic-highlight", {
        color: "#FF2A00", // brutal accent
        stagger: 0.2,
        duration: 0.1
      }, "-=0.5");

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-[#EAEAEA] text-black min-h-screen relative overflow-hidden flex flex-col justify-center py-24">
      <div className="absolute top-8 right-8 font-mono text-xs border border-black px-2 py-1">VAR_A: KINETIC_GRID</div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {MISSION.headline.map((word, i) => (
          <div key={i} className="relative">
            <div ref={el => lineRefs.current[i] = el} className="h-[2px] bg-black w-full absolute top-0 left-0"></div>
            <div className="overflow-hidden py-2 md:py-4">
               <h2 
                 ref={el => textRefs.current[i] = el} 
                 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none kinetic-highlight origin-bottom-left will-change-transform"
               >
                 {word}
               </h2>
            </div>
          </div>
        ))}
        <div ref={el => lineRefs.current[MISSION.headline.length] = el} className="h-[2px] bg-black w-full"></div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
           <p className="font-mono text-sm md:text-lg max-w-md uppercase tracking-wide">
             {MISSION.sub}
           </p>
           <div className="flex justify-end">
              <div className="w-16 h-16 bg-black animate-spin-slow flex items-center justify-center">
                 <div className="w-2 h-2 bg-[#EAEAEA] rounded-full"></div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};


// --- VARIATION B: THE SCRAMBLE STREAM (Text Decoding, Hover Distortion) ---
const ScrambleText: React.FC<{ text: string; className?: string }> = ({ text, className }) => {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  
  const scramble = () => {
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplay(
        text.split("").map((letter, index) => {
          if (index < iterations) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );
      if (iterations >= text.length) clearInterval(interval);
      iterations += 1 / 3;
    }, 30);
  };

  return (
    <span 
      onMouseEnter={scramble} 
      className={`cursor-pointer inline-block ${className}`}
    >
      {display}
    </span>
  );
};

const VariationScramble: React.FC = () => {
  const sectionRef = useRef(null);

  return (
    <section ref={sectionRef} className="bg-black text-white min-h-screen font-sans py-32 relative border-t border-gray-800">
      <div className="absolute top-8 right-8 font-mono text-xs border border-white px-2 py-1">VAR_B: DATA_STREAM</div>

      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Col - Sticky Header */}
        <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit">
           <h3 className="font-mono text-brutal-accent text-sm mb-6 uppercase tracking-[0.2em]">/// Protocol_01</h3>
           <h2 className="text-5xl md:text-7xl font-bold uppercase leading-[0.9] mb-12">
             <ScrambleText text="Mission" /> <br/>
             <span className="text-gray-500">Critical</span> <br/>
             <ScrambleText text="Intelligence" />
           </h2>
           <p className="font-mono text-sm text-gray-400 max-w-xs border-l border-white/20 pl-4">
             Field operations require absolute certainty. We replace chaos with clarity.
           </p>
        </div>

        {/* Right Col - Interactive List */}
        <div className="lg:col-span-7 flex flex-col gap-px bg-gray-900 border border-gray-800">
           {MISSION.principles.map((p, i) => (
             <div key={i} className="group relative bg-black p-8 md:p-12 hover:bg-white hover:text-black transition-colors duration-500 overflow-hidden">
                {/* Background scanning line */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-brutal-accent -translate-x-full group-hover:translate-x-[200%] transition-transform duration-[1.5s] ease-linear"></div>
                
                <div className="flex justify-between items-baseline relative z-10">
                   <h4 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
                      {p.title}
                   </h4>
                   <span className="font-mono text-xs opacity-50">/{p.id}</span>
                </div>
                <p className="font-mono text-sm mt-4 text-gray-500 group-hover:text-gray-800 transition-colors">
                   {p.desc}
                </p>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};


// --- VARIATION C: DIMENSIONAL SHIFT (Parallax Cards, 3D Transforms) ---
const VariationDimensional: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Cards parallax effect
      cardsRef.current.forEach((card, i) => {
        gsap.to(card, {
          y: -100 * (i + 1), // Move faster based on index
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-[#F0F0F0] text-black min-h-[150vh] relative py-32 overflow-hidden">
      <div className="absolute top-8 right-8 font-mono text-xs border border-black px-2 py-1 bg-white z-20">VAR_C: DIMENSIONAL</div>
      
      {/* Background massive text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-5">
         <h1 className="text-[20vw] font-black leading-none uppercase">AERIS</h1>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-32">
           <h2 className="text-4xl md:text-6xl font-bold uppercase leading-tight">
             "A world where no operator works without <span className="bg-black text-white px-2">real-time</span> awareness."
           </h2>
        </div>

        {/* Floating Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 perspective-[1000px]">
           {[0, 1, 2].map((colIndex) => (
             <div key={colIndex} className="flex flex-col gap-8 md:gap-24 pt-[10vh]">
                {MISSION.principles
                  .filter((_, i) => i % 3 === colIndex)
                  .map((p, i) => (
                    <div 
                      key={p.id}
                      ref={el => { if (el) cardsRef.current.push(el); }}
                      className="bg-white border-2 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
                    >
                       <div className="w-8 h-8 bg-brutal-accent mb-6 rounded-full"></div>
                       <h3 className="font-black text-2xl uppercase mb-4">{p.title}</h3>
                       <p className="font-mono text-sm leading-relaxed text-gray-600">{p.desc}</p>
                    </div>
                ))}
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};


const MonolithLab: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50 bg-brutal-accent text-black font-mono text-xs font-bold text-center py-2 uppercase tracking-widest">
         Monolith Lab /// Experimental Build
      </div>
      
      <VariationKinetic />
      <VariationScramble />
      <VariationDimensional />

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-full shadow-2xl z-50 flex gap-4 font-mono text-xs">
         <span>SCROLL TO EXPLORE INTERACTIONS</span>
      </div>
    </div>
  );
};

export default MonolithLab;
