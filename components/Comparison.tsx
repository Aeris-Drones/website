import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Comparison: React.FC = () => {
  const componentRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: Pin the section
      mm.add("(min-width: 1024px)", () => {
        ScrollTrigger.create({
          trigger: componentRef.current,
          start: "top top",
          end: "+=50%", // Hold for 50% of viewport height
          pin: true,
          pinSpacing: true,
        });
      });

    }, componentRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={componentRef} className="lg:min-h-screen p-6 md:p-12 lg:p-24 border-b border-brutal-line bg-brutal-bg flex flex-col justify-center">
      <h2 className="font-sans font-black text-3xl md:text-4xl mb-8 md:mb-12 uppercase">The Stark Reality</h2>

      <div className="relative w-full">
        {/* Mobile Scroll Hint */}
        <div className="md:hidden absolute -top-6 right-0 font-mono text-[10px] text-gray-500 uppercase tracking-widest animate-pulse">
          &lt;&lt; Swipe &gt;&gt;
        </div>

        <div className="overflow-x-auto w-full pb-4 -mx-6 px-6 md:mx-0 md:px-0">
          <table className="w-full font-mono text-xs md:text-sm text-left border-collapse min-w-[600px] lg:min-w-full">
            <thead>
              <tr className="border-b border-brutal-line text-gray-500">
                <th className="py-4 uppercase font-normal w-1/4">Metric</th>
                <th className="py-4 uppercase font-normal text-brutal-accent w-1/4">AERIS ALPHA</th>
                <th className="py-4 uppercase font-normal w-1/4">Competitors</th>
                <th className="py-4 uppercase font-normal w-1/4">Consumer Drones</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-800">
                <td className="py-4 md:py-6 font-bold">Autonomy</td>
                <td className="py-4 md:py-6 text-brutal-accent">TRUE SWARM INTELLIGENCE</td>
                <td className="py-4 md:py-6 text-gray-500">Single-Drone Autonomy</td>
                <td className="py-4 md:py-6 text-gray-500">Manual Control</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-4 md:py-6 font-bold">Connectivity</td>
                <td className="py-4 md:py-6 text-brutal-accent">100% OFFLINE MESH</td>
                <td className="py-4 md:py-6 text-gray-500">Enterprise Cloud</td>
                <td className="py-4 md:py-6 text-gray-500">Direct Radio Link</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-4 md:py-6 font-bold">Pilot Ratio</td>
                <td className="py-4 md:py-6 text-brutal-accent">1 : SWARM</td>
                <td className="py-4 md:py-6 text-gray-500">1 : Multi-Drone</td>
                <td className="py-4 md:py-6 text-gray-500">1 : 1</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-4 md:py-6 font-bold">GPS Dependency</td>
                <td className="py-4 md:py-6 text-brutal-accent">GPS-DENIED CAPABLE</td>
                <td className="py-4 md:py-6 text-gray-500">GPS-Denied Capable</td>
                <td className="py-4 md:py-6 text-gray-500">GPS-Dependent</td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Comparison;