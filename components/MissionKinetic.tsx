import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- DATA ---
const MISSION = {
  headline: ["DECISIONS", "FASTER", "SAFER", "SMARTER"],
  sub: "When seconds matter and infrastructure fails.",
};

const MissionKinetic: React.FC = () => {
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
    <section id="about" ref={containerRef} className="bg-white text-black min-h-screen relative overflow-hidden flex flex-col justify-center py-24">

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

export default MissionKinetic;
