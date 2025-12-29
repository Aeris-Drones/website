import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProblemHumaan: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. THE MASK REVEAL (Hero Text -> Video Window)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 1,
        }
      });

      // Expand the mask to reveal full video
      tl.to(maskRef.current, {
        clipPath: "inset(0% 0% 0% 0%)", // Open fully
        scale: 1,
        duration: 1.5,
        ease: "power2.inOut"
      });

      // Text scales up and fades out (like flying through it)
      tl.to(textRef.current, {
        scale: 1.5,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in"
      }, 0);

      // 2. PARALLAX IMAGES (Float up)
      imageRefs.current.forEach((img, i) => {
        gsap.to(img, {
          y: -150 * (i + 1), // Different speeds
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          }
        });
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-white text-black min-h-screen relative overflow-hidden flex flex-col items-center justify-center font-sans py-24">
      <div className="absolute top-8 right-8 text-xs border border-black px-2 py-1 z-50 bg-white">VAR_04: HUMAAN_STYLE</div>

      {/* BACKGROUND VIDEO (Placeholder) */}
      {/* TODO: Replace src with a chaotic, high-energy video (e.g., storm, static, blur) */}
      <div 
        ref={maskRef}
        className="absolute inset-0 w-full h-full z-0 bg-black flex items-center justify-center"
        style={{ clipPath: "inset(15% 30% 15% 30%)" }} // Initial small window
      >
        <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none"></div>
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover opacity-60"
        >
          {/* Placeholder: Using a color gradient until video is added */}
          <source src="" type="video/mp4" /> 
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80"></div>
        
        {/* Fallback visual if no video */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
            <span className="text-white/20 font-mono text-sm uppercase">[VIDEO: CHAOS_LOOP.mp4]</span>
        </div>
      </div>

      {/* FOREGROUND CONTENT */}
      <div className="relative z-10 w-full max-w-7xl px-6 h-screen flex flex-col items-center justify-center pointer-events-none">
         
         {/* THE MASK TEXT */}
         <h2 ref={textRef} className="text-[12vw] font-black uppercase leading-none text-white mix-blend-difference text-center">
            CHAOS<br/>REIGNS
         </h2>
      </div>

      {/* FLOATING CONTENT CARDS (Parallax) */}
      <div className="absolute bottom-0 w-full max-w-7xl px-6 flex justify-between items-end pointer-events-auto pb-24">
         
         {/* Card 1: The Problem */}
         <div 
           ref={el => imageRefs.current[0] = el}
           className="w-1/3 bg-white p-8 shadow-2xl border border-gray-100 transform translate-y-[200px]"
         >
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest mb-4 block">/// THE DISCONNECT</span>
            <h3 className="text-3xl font-bold mb-4">Fragmented Feeds.</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
               You have 10 drones and 10 different screens. The data is there, but the intelligence is missing.
            </p>
         </div>

         {/* Card 2: The Consequence */}
         <div 
           ref={el => imageRefs.current[1] = el}
           className="w-1/3 bg-black text-white p-8 shadow-2xl transform translate-y-[400px]"
         >
             {/* TODO: Add an image here of a "Missed Target" or "Failed Inspection" */}
            <div className="h-48 bg-gray-800 mb-6 flex items-center justify-center border border-gray-700">
               <span className="text-gray-500 font-mono text-xs">[IMG: FAILED_MISSION.jpg]</span>
            </div>
            <h3 className="text-3xl font-bold mb-4">Preventable Failure.</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
               When you can't see the full picture, you miss the critical detail.
            </p>
         </div>

      </div>

    </section>
  );
};

export default ProblemHumaan;
